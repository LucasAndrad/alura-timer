const { ipcRenderer } = require('electron');

let linkAbout = document.querySelector('#link-about');

linkAbout.addEventListener('click', function (){
  ipcRenderer.send('open-about-window');
});

let button = document.querySelector('.botao-play');
let imgs = ['img/play-button.svg', 'img/stop-button.svg'];
button.addEventListener('click', () => {
  imgs = imgs.reverse();
  button.src = imgs[0];
});