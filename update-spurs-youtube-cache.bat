@echo off
cd /d "%~dp0"

where node >nul 2>nul
if %errorlevel%==0 (
  node update-spurs-youtube-cache.js
) else (
  "%LOCALAPPDATA%\OpenAI\Codex\bin\node.exe" update-spurs-youtube-cache.js
)

pause
