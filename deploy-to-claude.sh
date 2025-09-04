#!/bin/bash

echo ""
echo "PostHog MCP Server - Claude Desktop Deployment Script"
echo "======================================================"
echo ""

# Get the current directory
CURRENT_DIR=$(pwd)

# Build the project
echo "[1/4] Building the server..."
npm run build
if [ $? -ne 0 ]; then
    echo "Error: Build failed"
    exit 1
fi
echo "Build completed successfully!"
echo ""

# Detect OS and set Claude config path
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    CLAUDE_CONFIG="$HOME/Library/Application Support/Claude/claude_desktop_config.json"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    CLAUDE_CONFIG="$HOME/.config/Claude/claude_desktop_config.json"
else
    echo "Error: Unsupported operating system"
    exit 1
fi

# Check if Claude Desktop is installed
CLAUDE_DIR=$(dirname "$CLAUDE_CONFIG")
if [ ! -d "$CLAUDE_DIR" ]; then
    echo "Error: Claude Desktop configuration directory not found"
    echo "Please ensure Claude Desktop is installed"
    exit 1
fi

echo "[2/4] Claude Desktop configuration found at:"
echo "$CLAUDE_CONFIG"
echo ""

# Prompt for PostHog credentials
echo "[3/4] Enter your PostHog credentials:"
echo ""
read -p "PostHog Host (e.g., https://posthog.myteam.network): " POSTHOG_HOST
read -p "PostHog API Key (starts with phx_): " POSTHOG_API_KEY
read -p "PostHog Project ID (press Enter for default '1'): " POSTHOG_PROJECT_ID

if [ -z "$POSTHOG_PROJECT_ID" ]; then
    POSTHOG_PROJECT_ID="1"
fi

# Create the configuration snippet
echo ""
echo "[4/4] Add this configuration to your Claude Desktop config:"
echo ""
cat << EOF
{
  "mcpServers": {
    "posthog": {
      "command": "node",
      "args": ["$CURRENT_DIR/dist/index.js"],
      "env": {
        "POSTHOG_HOST": "$POSTHOG_HOST",
        "POSTHOG_API_KEY": "$POSTHOG_API_KEY",
        "POSTHOG_PROJECT_ID": "$POSTHOG_PROJECT_ID"
      }
    }
  }
}
EOF
echo ""
echo "======================================================"
echo ""
echo "IMPORTANT STEPS:"
echo "1. Open $CLAUDE_CONFIG"
echo "2. Add the above configuration to the file"
echo "3. Save the file"
echo "4. Restart Claude Desktop"
echo ""
echo "After restarting, test by asking Claude:"
echo '"Can you list my PostHog projects?"'
echo ""
read -p "Press Enter to continue..."