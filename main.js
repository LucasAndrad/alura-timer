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

let aboutWindow = null;
ipcMain.on('open-about-window', () => {
  if(aboutWindow == null) {
    aboutWindow = new BrowserWindow({
      width: 350,
      height: 300
    });
    aboutWindow.on('closed', () => {
      aboutWindow = null;
    });
  }

  aboutWindow.loadFile('app/about.html');
});