const { ipcRenderer } = require('electron');
const moment = require('moment');
let segundos;
let timer;
let tempo;

module.exports = {
  iniciar(el){
    tempo = moment.duration(el.textContent);
    segundos = tempo.asSeconds();
    clearInterval(timer);
    timer = setInterval(()=> {
      segundos++;
      el.textContent = this.segundosParaTempo(segundos);
    }, 1000);
  },
  parar(curso) {
    clearInterval(timer);
    ipcRenderer.send('curso-parado', curso, this.segundosParaTempo(segundos));
  },
  segundosParaTempo(segundos) {
    return moment().startOf('day').seconds(segundos).format('HH:mm:ss');
  }
}