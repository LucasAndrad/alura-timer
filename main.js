const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const data = require('./data');

let tray = null;

app.on('ready', () => {
  let homeWindown = new BrowserWindow({
    width: 600,
    height: 400
  });
  tray = new Tray(__dirname + '/app/img/icon.png');
  homeWindown.loadFile('app/index.html');

  let trayMenu = Menu.buildFromTemplate([
    {label: 'Cursos'},
    {label: '', type: 'separator'},
    {label: 'JavaScript', type: 'radio'},
    {label: 'Java', type: 'radio'},
    {label: 'Photoshop', type: 'radio'}
  ]);
  tray.setToolTip('Timer Application');
  tray.setContextMenu(trayMenu)
});

app.on('window-all-closed', () => {
  app.quit();
});

let aboutWindow = null;
ipcMain.on('open-about-window', () => {
  if(aboutWindow == null) {
    aboutWindow = new BrowserWindow({
      width: 350,
      height: 300,
      alwaysOnTop: true
    });
    aboutWindow.on('closed', () => {
      aboutWindow = null;
    });
  }

  aboutWindow.loadFile('app/about.html');
  aboutWindow.setAlwaysOnTop(true, 'screen');
});

ipcMain.on('close-about-windown', () => {
  aboutWindow.close();
});

ipcMain.on('curso-parado', (event, curso, tempoEstudado) => {
  console.log(`O curso ${curso} foi estudado por ${tempoEstudado}`);
  data.salvaDados(curso, tempoEstudado);
})