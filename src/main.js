const {app, BrowserWindow, ipcMain} = require('electron');
const { autoUpdater } = require('electron-updater');

let projTitle = 'GINS';

const electronReload = require('electron-reload');
electronReload(__dirname);
// renderer.js
if (module.hot) {
  module.hot.accept();
}

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    fullscreen: false, 
    autoHideMenuBar: true,      // console is CTRL+SHIFT+i, show menu is ALT
    title: projTitle,
    icon: 'resources/gins.ico',
  })
  mainWindow.loadFile('src/GUI/index.html'),

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  //for MACOS projects
  app.quit();
});

// -- IPC LISTENERS -- \\
ipcMain.on('app-version', (event) =>{ //reads app version specified in package.json and sends to main window
  event.sender.send('app-version', {version: app.getVersion() });
});

autoUpdater.on('update-available', () =>{ //if update is available send a signal over to the web side
  mainWindow.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () =>{  //if update is downloaded send a signal over to the web side
  mainWindow.webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => { // Restart and install the app
  autoUpdater.quitAndInstall();
});
