#!/usr/bin/env node

const { spawn } = require('child_process');
const readline = require('readline');

// Test script to validate MCP server connection
async function testMCPServer() {
  console.log('🧪 Testing PostHog MCP Server...\n');
  
  // Set environment variables from .env
  const env = {
    ...process.env,
    POSTHOG_HOST: 'https://posthog.myteam.network',
    POSTHOG_API_KEY: 'phc_NrW0IWTc9rjxadmim7LuUs2UYeLo4Si96gurxL1pc8o',
    POSTHOG_PROJECT_ID: '1'
  };

  // Spawn the MCP server
  const mcpServer = spawn('node', ['dist/index.js'], {
    env,
    stdio: ['pipe', 'pipe', 'pipe']
  });

  // Create interface for stdin/stdout
  const rl = readline.createInterface({
    input: mcpServer.stdout,
    output: process.stdout,
    terminal: false
  });

  // Track server output
  let serverStarted = false;
  let initResponse = null;
  let toolsResponse = null;

  // Listen to stderr for server status messages
  mcpServer.stderr.on('data', (data) => {
    const message = data.toString();
    console.log('Server: ' + message.trim());
    if (message.includes('Started successfully')) {
      serverStarted = true;
      // Send initialize request
      sendInitializeRequest();
    }
  });

  // Handle stdout (JSON-RPC responses)
  rl.on('line', (line) => {
    try {
      const response = JSON.parse(line);
      console.log('\n📥 Received response:', JSON.stringify(response, null, 2));
      
      if (response.id === 1) {
        initResponse = response;
        // After initialization, request tools list
        sendListToolsRequest();
      } else if (response.id === 2) {
        toolsResponse = response;
        validateTools(response);
        // Test complete
        mcpServer.kill();
        process.exit(0);
      }
    } catch (e) {
      // Not JSON, ignore
    }
  });

  // Handle errors
  mcpServer.on('error', (error) => {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  });

  function sendInitializeRequest() {
    console.log('\n📤 Sending initialize request...');
    const initRequest = {
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: {
        protocolVersion: '2025-06-18',
        capabilities: {},
        clientInfo: {
          name: 'mcp-test-client',
          version: '1.0.0'
        }
      }
    };
    mcpServer.stdin.write(JSON.stringify(initRequest) + '\n');
  }

  function sendListToolsRequest() {
    console.log('\n📤 Sending tools/list request...');
    const listToolsRequest = {
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/list',
      params: {}
    };
    mcpServer.stdin.write(JSON.stringify(listToolsRequest) + '\n');
  }

  function validateTools(response) {
    console.log('\n🔍 Validating tools...');
    
    if (response.error) {
      console.error('❌ Error response:', response.error);
      return;
    }

    if (!response.result || !response.result.tools) {
      console.error('❌ No tools found in response');
      return;
    }

    const tools = response.result.tools;
    console.log(`\n✅ Found ${tools.length} tools:`);
    
    // Group tools by category
    const categories = {};
    tools.forEach(tool => {
      const category = tool.name.split('_')[0];
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(tool.name);
    });

    // Display tools by category
    Object.entries(categories).forEach(([category, toolNames]) => {
      console.log(`\n  ${category}:`);
      toolNames.forEach(name => {
        console.log(`    - ${name}`);
      });
    });

    console.log('\n✅ MCP Server is working correctly!');
    console.log('   Tools are properly registered and available.');
  }

  // Timeout after 10 seconds
  setTimeout(() => {
    if (!serverStarted) {
      console.error('\n❌ Server failed to start within 10 seconds');
      mcpServer.kill();
      process.exit(1);
    }
  }, 10000);
}

// Run the test
testMCPServer().catch(error => {
  console.error('Test failed:', error);
  process.exit(1);
});