const { app, BrowserWindow, ipcMain } = require('electron');

app.on('ready', () => {
  console.log('Hello World');
  let homeWindown = new BrowserWindow({
    width: 600,
    height: 400
  });

  homeWindown.loadFile('app/index.html');
});

app.on('window-all-closed', () => {
  app.quit();
});

ipcMain.on('open-about-window', () => {
  let aboutWindow = new BrowserWindow({
    width: 350,
    height: 300
  });
  
  aboutWindow.loadFile('app/about.html');
});