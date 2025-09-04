@echo off
echo.
echo PostHog MCP Server - Claude Desktop Deployment Script
echo ======================================================
echo.

REM Get the current directory
set CURRENT_DIR=%CD%

REM Build the project
echo [1/4] Building the server...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo Error: Build failed
    exit /b 1
)
echo Build completed successfully!
echo.

REM Get Claude Desktop config path
set CLAUDE_CONFIG=%APPDATA%\Claude\claude_desktop_config.json

REM Check if Claude Desktop is installed
if not exist "%APPDATA%\Claude\" (
    echo Error: Claude Desktop configuration directory not found
    echo Please ensure Claude Desktop is installed
    exit /b 1
)

echo [2/4] Claude Desktop configuration found at:
echo %CLAUDE_CONFIG%
echo.

REM Prompt for PostHog credentials
echo [3/4] Enter your PostHog credentials:
echo.
set /p POSTHOG_HOST="PostHog Host (e.g., https://posthog.myteam.network): "
set /p POSTHOG_API_KEY="PostHog API Key (starts with phx_): "
set /p POSTHOG_PROJECT_ID="PostHog Project ID (press Enter for default '1'): "

if "%POSTHOG_PROJECT_ID%"=="" set POSTHOG_PROJECT_ID=1

REM Create the configuration snippet
echo.
echo [4/4] Add this configuration to your Claude Desktop config:
echo.
echo {
echo   "mcpServers": {
echo     "posthog": {
echo       "command": "node",
echo       "args": ["%CURRENT_DIR%\dist\index.js"],
echo       "env": {
echo         "POSTHOG_HOST": "%POSTHOG_HOST%",
echo         "POSTHOG_API_KEY": "%POSTHOG_API_KEY%",
echo         "POSTHOG_PROJECT_ID": "%POSTHOG_PROJECT_ID%"
echo       }
echo     }
echo   }
echo }
echo.
echo ======================================================
echo.
echo IMPORTANT STEPS:
echo 1. Open %CLAUDE_CONFIG%
echo 2. Add the above configuration to the file
echo 3. Save the file
echo 4. Restart Claude Desktop
echo.
echo After restarting, test by asking Claude:
echo "Can you list my PostHog projects?"
echo.
pause