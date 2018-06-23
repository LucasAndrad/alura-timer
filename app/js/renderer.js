const { ipcRenderer } = require('electron');
const timer = require('./timer');
const data = require('../../data');

// old require type
// const path = require('path');
// const timer = require(filePath('js/timer'));

// function filePath(file) {
//   return path.resolve(__dirname, file);
// }

let linkAbout = document.querySelector('#link-about');
let tempo = document.querySelector('.tempo');
let curso = document.querySelector('.curso');
let botaoAdicionar = document.querySelector('.botao-adicionar');
let campoAdicionar = document.querySelector('.campo-adicionar');

window.onload = () => {
  data.pegaDados(curso.textContent)
  .then((dados) => {
    tempo.textContent = dados.tempo;
  }).catch((err) => {
    console.log(err);
    tempo.textContent = "00:00:00";
  });
}

linkAbout.addEventListener('click', function (){
  ipcRenderer.send('open-about-window');
});

let button = document.querySelector('.botao-play');
let imgs = ['img/play-button.svg', 'img/stop-button.svg'];
let play = false;
button.addEventListener('click', () => {
  imgs = imgs.reverse();
  button.src = imgs[0];
  playStop();
});

function playStop() {
  if(play) {
    timer.parar(curso.textContent);
    play = false;
  }
  else {
    timer.iniciar(tempo);
    play = true;
  }
}

ipcRenderer.on('curso-trocado', (event, nomeCurso)=> {
  data.pegaDados(nomeCurso)
    .then((dados)=> {
      tempo.textContent = dados.tempo;
    });
  curso.textContent = nomeCurso;
});

botaoAdicionar.addEventListener('click', () => {
  let novoCurso = campoAdicionar.value;
  curso.textContent = novoCurso;
  tempo.textContent = '00:00:00';
  campoAdicionar.value = '';
});