const esbuild = require('esbuild');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function build() {
  console.log('Building PostHog MCP Server...');

  // Clean dist directory
  const distPath = path.join(__dirname, 'dist');
  if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, { recursive: true, force: true });
  }
  fs.mkdirSync(distPath);

  // Build with esbuild
  await esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    platform: 'node',
    target: 'node18',
    outfile: 'dist/index.js',
    external: [
      '@modelcontextprotocol/sdk',
      'axios',
      'zod',
      'dotenv'
    ],
    sourcemap: true,
    minify: false, // Keep readable for debugging
    banner: {
      js: '#!/usr/bin/env node'
    }
  });

  // Make the output file executable
  if (process.platform !== 'win32') {
    execSync('chmod +x dist/index.js');
  }

  console.log('Build completed successfully!');
}

build().catch((error) => {
  console.error('Build failed:', error);
  process.exit(1);
});