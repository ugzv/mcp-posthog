#!/usr/bin/env node

const { spawn } = require('child_process');
const readline = require('readline');

// Test script to validate JSON Schema format
async function testSchemaFormat() {
  console.log('🧪 Testing JSON Schema format...\n');
  
  const env = {
    ...process.env,
    POSTHOG_HOST: 'https://posthog.myteam.network',
    POSTHOG_API_KEY: 'phc_NrW0IWTc9rjxadmim7LuUs2UYeLo4Si96gurxL1pc8o',
    POSTHOG_PROJECT_ID: '1'
  };

  const mcpServer = spawn('node', ['dist/index.js'], {
    env,
    stdio: ['pipe', 'pipe', 'pipe']
  });

  const rl = readline.createInterface({
    input: mcpServer.stdout,
    terminal: false
  });

  let serverStarted = false;

  mcpServer.stderr.on('data', (data) => {
    const message = data.toString();
    if (message.includes('Started successfully')) {
      serverStarted = true;
      sendInitializeRequest();
    }
  });

  rl.on('line', (line) => {
    try {
      const response = JSON.parse(line);
      
      if (response.id === 1) {
        sendListToolsRequest();
      } else if (response.id === 2) {
        validateSchemas(response);
        mcpServer.kill();
        process.exit(0);
      }
    } catch (e) {
      // Not JSON
    }
  });

  function sendInitializeRequest() {
    const initRequest = {
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: {
        protocolVersion: '2025-06-18',
        capabilities: {},
        clientInfo: {
          name: 'schema-test',
          version: '1.0.0'
        }
      }
    };
    mcpServer.stdin.write(JSON.stringify(initRequest) + '\n');
  }

  function sendListToolsRequest() {
    const listToolsRequest = {
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/list',
      params: {}
    };
    mcpServer.stdin.write(JSON.stringify(listToolsRequest) + '\n');
  }

  function validateSchemas(response) {
    console.log('📋 Checking schema format...\n');
    
    const tools = response.result.tools;
    const firstTool = tools[0];
    
    console.log(`Example tool: ${firstTool.name}`);
    console.log('Schema structure:');
    console.log(JSON.stringify(firstTool.inputSchema, null, 2).substring(0, 500));
    
    // Check if it's proper JSON Schema
    const hasType = firstTool.inputSchema.type !== undefined;
    const hasProperties = firstTool.inputSchema.properties !== undefined || 
                         firstTool.inputSchema.$schema !== undefined;
    
    if (hasType || hasProperties) {
      console.log('\n✅ Schema is in proper JSON Schema format!');
    } else {
      console.log('\n❌ Schema is NOT in JSON Schema format');
      console.log('   This may cause issues with Claude Desktop');
    }
    
    // Check a few tools
    console.log('\nValidating first 3 tools:');
    for (let i = 0; i < Math.min(3, tools.length); i++) {
      const tool = tools[i];
      const schema = tool.inputSchema;
      const isValid = schema.type === 'object' && schema.properties !== undefined;
      console.log(`  ${tool.name}: ${isValid ? '✅' : '❌'}`);
    }
  }

  setTimeout(() => {
    if (!serverStarted) {
      console.error('Server failed to start');
      mcpServer.kill();
      process.exit(1);
    }
  }, 5000);
}

testSchemaFormat().catch(console.error);