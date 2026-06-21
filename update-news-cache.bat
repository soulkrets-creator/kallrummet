@echo off
cd /d "%~dp0"

where node >nul 2>nul
if %errorlevel%==0 (
  node update-news-cache.js
) else (
  "%LOCALAPPDATA%\OpenAI\Codex\bin\node.exe" update-news-cache.js
)

pause
