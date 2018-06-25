const data = require('../../data');
const { ipcMain } = require('electron');

module.exports = {

  templateInicial: null,
  geraTrayTemplate(win) {
    let template = [
      { 'label': 'Cursos' },
      { type: 'separator' }
    ];
    
    let cursos = data.pegaNomeDosCursos();
    cursos.forEach(curso => {
      let menuItem = {
        label: curso,
        type: 'radio',
        click: () => {
          win.send('curso-trocado', curso);
        }
      }
      template.push(menuItem);
    });
    this.templateInicial = template;
    return template;
  },
  adicionaCursoNoTray(curso, win) {
    this.templateInicial.push({
      label: curso,
      type: 'radio',
      click: () => {
        win.send('curso-trocado', curso);
      }
    });
    return this.templateInicial;
  },
  geraMenuPricipalTemplate(app) {
    let templateMenu = [
      {
        label: 'Sobre',
        submenu: [
          {
            label: 'Sobre o Timer',
            click: () => {
              ipcMain.emit('open-about-window');
            }
          }
        ]
      }
    ]
    return templateMenu;
  }
}