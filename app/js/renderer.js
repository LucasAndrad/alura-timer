const { ipcRenderer } = require('electron');
const path = require('path');
const timer = require(filePath('js/timer'));

function filePath(file) {
  return path.resolve(__dirname, file);
}

let linkAbout = document.querySelector('#link-about');
let tempo = document.querySelector('.tempo');

linkAbout.addEventListener('click', function (){
  ipcRenderer.send('open-about-window');
});

let button = document.querySelector('.botao-play');
let imgs = ['img/play-button.svg', 'img/stop-button.svg'];
button.addEventListener('click', () => {
  imgs = imgs.reverse();
  button.src = imgs[0];
  timer.iniciar(tempo);
});