# Deployment Guide for MCP PostHog on Cloudflare Workers

## Quick Start

### Prerequisites
- A Cloudflare account (free at cloudflare.com)
- Node.js and pnpm installed locally

### Method 1: Direct CLI Deployment (Recommended)

1. **Clone and navigate to the repository:**
```bash
git clone https://github.com/ugzv/mcp-posthog.git
cd mcp-posthog
```

2. **Install dependencies:**
```bash
pnpm install
```

3. **Login to Cloudflare:**
```bash
pnpm wrangler login
```
This opens your browser for authentication.

4. **Deploy:**
```bash
pnpm run deploy
```

After deployment, you'll get a URL like: `https://mcp-posthog.<your-subdomain>.workers.dev`

### Method 2: GitHub Actions (Automated Deployments)

1. **Fork the repository to your GitHub account**

2. **Get Cloudflare credentials:**
   - **API Token:** 
     - Go to https://dash.cloudflare.com/profile/api-tokens
     - Create Token → Use "Edit Cloudflare Workers" template
   - **Account ID:**
     - Visit your Cloudflare dashboard
     - Find it in the right sidebar of any domain

3. **Add GitHub secrets:**
   - Go to your repo → Settings → Secrets → Actions
   - Add `CLOUDFLARE_API_TOKEN` (your API token)
   - Add `CLOUDFLARE_ACCOUNT_ID` (your account ID)

4. **Push to main branch** - it will auto-deploy!

### Method 3: Cloudflare Dashboard

1. Go to https://dash.cloudflare.com/ → Workers & Pages
2. Create → Workers → Connect to Git
3. Select your GitHub repository
4. Use these settings:
   - Build command: `pnpm install`
   - Build output: `/`

## Configuration

### Adding Environment Variables

**Via CLI:**
```bash
pnpm wrangler secret put VARIABLE_NAME
```

**Via Dashboard:**
1. Workers & Pages → Your worker → Settings → Variables
2. Add your environment variables

**Via wrangler.toml (non-sensitive only):**
```toml
[vars]
MY_VARIABLE = "value"
```

### Custom Domain

1. Go to your worker in Cloudflare dashboard
2. Settings → Triggers → Custom Domains
3. Add your domain (must be on Cloudflare)

## Usage with MCP Clients

Once deployed, use your worker URL with MCP clients:

```json
{
  "mcpServers": {
    "posthog": {
      "url": "https://mcp-posthog.<your-subdomain>.workers.dev/mcp",
      "headers": {
        "Authorization": "Bearer phx_your_posthog_api_key"
      }
    }
  }
}
```

## Monitoring

- View logs: Cloudflare Dashboard → Workers → Your worker → Logs
- View metrics: Same location → Analytics tab

## Troubleshooting

**Build fails:**
- Ensure you're using Node.js 18+ and pnpm 9+
- Check `wrangler.jsonc` for syntax errors

**Authentication errors:**
- Verify your PostHog API key starts with `phx_`
- Check the Authorization header format: `Bearer phx_...`

**Durable Object errors:**
- First deployment creates migrations
- May need to run `pnpm wrangler deploy --dry-run` first

## Costs

- Free tier: 100,000 requests/day
- Durable Objects: First 1M requests free
- See https://developers.cloudflare.com/workers/pricing/

## Support

- Issues: https://github.com/ugzv/mcp-posthog/issues
- PostHog docs: https://posthog.com/docs
- Cloudflare Workers docs: https://developers.cloudflare.com/workers/