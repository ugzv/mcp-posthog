// Test script to verify the server starts correctly
const { spawn } = require('child_process');
const path = require('path');

console.log('Testing PostHog MCP Server...\n');

// Set test environment variables
const env = {
  ...process.env,
  POSTHOG_HOST: 'https://posthog.myteam.network',
  POSTHOG_API_KEY: 'test_key_for_startup_check',
  POSTHOG_PROJECT_ID: '1'
};

const serverPath = path.join(__dirname, 'dist', 'index.js');
console.log(`Starting server from: ${serverPath}\n`);

const server = spawn('node', [serverPath], {
  env,
  stdio: ['pipe', 'pipe', 'pipe']
});

let timeout;

server.stderr.on('data', (data) => {
  const output = data.toString();
  console.log('Server output:', output);
  
  if (output.includes('Started successfully')) {
    console.log('\n✅ Server started successfully!');
    clearTimeout(timeout);
    
    // Send a test message to verify MCP protocol
    const testMessage = JSON.stringify({
      jsonrpc: '2.0',
      method: 'tools/list',
      params: {},
      id: 1
    }) + '\n';
    
    console.log('\nSending test request for tools list...');
    server.stdin.write(testMessage);
    
    // Wait for response
    setTimeout(() => {
      console.log('\n✅ Test completed. Shutting down server...');
      server.kill();
      process.exit(0);
    }, 2000);
  }
  
  if (output.includes('Error') || output.includes('Failed')) {
    console.error('\n❌ Server error detected');
    clearTimeout(timeout);
    server.kill();
    process.exit(1);
  }
});

server.stdout.on('data', (data) => {
  const output = data.toString();
  console.log('Server response:', output.substring(0, 200) + '...');
});

server.on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

server.on('close', (code) => {
  if (code !== 0 && code !== null) {
    console.error(`Server exited with code ${code}`);
    process.exit(1);
  }
});

// Timeout after 10 seconds
timeout = setTimeout(() => {
  console.error('\n❌ Server startup timeout');
  server.kill();
  process.exit(1);
}, 10000);

console.log('Waiting for server to start...\n');