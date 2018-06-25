const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const templateGenerator = require('./app/js/template');
const data = require('./data');

let tray = null;
let homeWindow = null;

app.on('ready', () => {
  homeWindow = new BrowserWindow({
    width: 700,
    height: 450
  });
  homeWindow.openDevTools();
  tray = new Tray(__dirname + '/app/img/icon.png');
  homeWindow.loadFile('app/index.html');

  let template = templateGenerator.geraTrayTemplate(homeWindow);

  let trayMenu = Menu.buildFromTemplate(template);
  tray.setContextMenu(trayMenu)

  let templateMenu = templateGenerator.geraMenuPricipalTemplate();
  let menuPrincipal = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(menuPrincipal);

  homeWindow.loadURL(`file://${__dirname}/app/index.html`);
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
});

ipcMain.on('curso-adicionado', (event, novoCurso) => {
  let novoTemplate = templateGenerator.adicionaCursoNoTray(novoCurso, homeWindow);
  let novoTrayMenu = Menu.buildFromTemplate(novoTemplate);
  tray.setContextMenu(novoTrayMenu);
});

