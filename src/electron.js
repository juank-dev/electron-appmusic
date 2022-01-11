const {app, BrowserWindow} = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');
// Usando require



let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 900, height: 680});
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

    installExtension(REACT_DEVELOPER_TOOLS).then((name) => {
        console.log(`Extensión agregada:  ${name}`);
    })
    .catch((err) => {
        console.log('Ha ocurrido un error: ', err);
    });
    mainWindow.webContents.openDevTools();
    require("electron-reload")(__dirname, {
      electron: path.join(__dirname, "../node_modules", ".bin", "electron")
    })
  }
  mainWindow.on('closed', () => mainWindow = null);
 
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});