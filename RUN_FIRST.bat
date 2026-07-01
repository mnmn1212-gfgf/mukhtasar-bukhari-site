@echo off
echo Fixing npm registry/proxy/cache...
npm config set registry https://registry.npmjs.org/
npm config delete proxy
npm config delete https-proxy
npm cache clean --force
echo.
echo Installing dependencies...
npm install
echo.
echo Starting website...
npm run dev
pause
