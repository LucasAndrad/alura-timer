const { app, BrowserWindow } = require('electron');

app.on('ready', () => {
  console.log('Hello World');
  let homeWindown = new BrowserWindow({
    width: 600,
    height: 400
  });
});