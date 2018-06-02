const { ipcRenderer, shell } = require('electron');
const process = require('process');

let linkClose = document.querySelector('#linkClose');
let linkGithub = document.querySelector('#linkGithub')
let electronVersion = document.querySelector('#electronVersion');

linkClose.addEventListener('click', function() {
  ipcRenderer.send('close-about-windown');
});

linkGithub.addEventListener('click', () => {
  shell.openExternal("https://github.com/lucasandrad");
});

window.onload = function() {
  electronVersion.textContent = process.versions.electron;
}
