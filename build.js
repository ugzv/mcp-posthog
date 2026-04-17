const esbuild = require('esbuild');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function build() {
  const distPath = path.join(__dirname, 'dist');
  if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, { recursive: true, force: true });
  }
  fs.mkdirSync(distPath);

  await esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    platform: 'node',
    target: 'node18',
    outfile: 'dist/index.js',
    external: ['@modelcontextprotocol/sdk', 'axios', 'zod', 'dotenv'],
    banner: { js: '#!/usr/bin/env node' },
    sourcemap: true,
    minify: false,
  });

  if (process.platform !== 'win32') {
    execSync('chmod +x dist/index.js');
  }

  console.log('Build complete');
}

build().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
