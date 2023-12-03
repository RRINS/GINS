const {ipcRenderer} = require('electron');

const version = document.getElementById('version');

const notification = document.getElementById('notification');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart-button');


ipcRenderer.send('app-version');
ipcRenderer.on('app-version', (event, arg) => {
  ipcRenderer.removeAllListeners('app-version');
  version.innerText = `GINS v${arg.version}`;
});

ipcRenderer.on('update_available', () => {
  ipcRenderer.removeAllListeners('update-available');
  message.innerText = 'A new update is available. Downloading now...';
  notification.classList.remove('hidden');
});

ipcRenderer.on('update_downloaded', () =>{
  ipcRenderer.removeAllListeners('update_downloaded');
  message.innerText = 'Update downloaded. It will be installed on restart. Restart now?';
  restartButton.classList.remove('hidden');
  notification.classList.remove('hidden');
});

function closeNotification(){
  notification.classList.add('hidden');
}

function restartApp(){
  ipcRenderer.send('restart_app');
}