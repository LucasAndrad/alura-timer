const { app, BrowserWindow } = require('electron');

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