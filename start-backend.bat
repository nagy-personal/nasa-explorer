@echo off
echo Starting NASA Explorer Backend Server...
echo.
cd backend
echo Installing dependencies...
yarn install
echo.
echo Starting server on port 5000...
yarn dev
pause 