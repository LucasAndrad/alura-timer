const { ipcRenderer } = require('electron');

let linkClose = document.querySelector('#linkClose');

linkClose.addEventListener('click', function() {
  ipcRenderer.send('close-about-windown');
});
