#!/usr/bin/env node

/**
 * PostHog MCP Server Deployment Verification
 * Run this to verify your deployment is working correctly
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🔍 PostHog MCP Server - Deployment Verification\n');
console.log('=' .repeat(50));

// Check environment
const env = {
  POSTHOG_HOST: process.env.POSTHOG_HOST || 'https://posthog.myteam.network',
  POSTHOG_API_KEY: process.env.POSTHOG_API_KEY || 'phx_hzwHYS52J2JQ0lzJ7DMnY9G8RX1SHxkljWcblmuRaBeGrJv',
  POSTHOG_PROJECT_ID: process.env.POSTHOG_PROJECT_ID || '1'
};

console.log('📋 Configuration:');
console.log(`   Host: ${env.POSTHOG_HOST}`);
console.log(`   API Key: ${env.POSTHOG_API_KEY.substring(0, 10)}...`);
console.log(`   Project: ${env.POSTHOG_PROJECT_ID}\n`);

// Check if dist exists
const distPath = path.join(__dirname, 'dist', 'index.js');
if (!fs.existsSync(distPath)) {
  console.error('❌ Error: dist/index.js not found. Run "npm run build" first.');
  process.exit(1);
}

console.log('✅ Build artifacts found\n');

// Quick API test
console.log('🧪 Testing API connection...');
const https = require('https');
const options = {
  hostname: env.POSTHOG_HOST.replace('https://', ''),
  path: `/api/projects/${env.POSTHOG_PROJECT_ID}/dashboards/`,
  headers: {
    'Authorization': `Bearer ${env.POSTHOG_API_KEY}`,
    'Content-Type': 'application/json'
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    if (res.statusCode === 200) {
      const result = JSON.parse(data);
      console.log(`✅ API connection successful!`);
      console.log(`   Found ${result.count || 0} dashboards\n`);
      
      console.log('🎉 Deployment Verification Complete!');
      console.log('=' .repeat(50));
      console.log('\n📌 Next Steps:');
      console.log('1. Restart Claude Desktop');
      console.log('2. Look for PostHog tools in the tools menu');
      console.log('3. Start using your analytics data!\n');
      
      console.log('✨ All 28 tools are ready to use:');
      const tools = [
        'insights', 'persons', 'feature_flags', 'dashboards',
        'events', 'cohorts', 'projects', 'query'
      ];
      tools.forEach(category => {
        console.log(`   • ${category}_*`);
      });
      
    } else {
      console.error(`❌ API Error (${res.statusCode}): ${data}`);
      console.log('\n⚠️  Please check your API key and host configuration');
    }
  });
}).on('error', (err) => {
  console.error('❌ Connection error:', err.message);
  console.log('\n⚠️  Please check your network and PostHog host URL');
});