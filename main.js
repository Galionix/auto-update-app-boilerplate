const {
    app,
    BrowserWindow,
    ipcMain
} = require("electron");
const {
    autoUpdater
} = require("electron-updater");

let mainWindow;

let updating = false;


function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    mainWindow.loadFile("src/index.html");
    mainWindow.on("closed", function () {
        mainWindow = null;
    });

    mainWindow.once('ready-to-show', () => {
        setInterval(() => {
            if(!updating)
           autoUpdater.checkForUpdatesAndNotify(); 
        }, 20000);
        
      });
}

app.on("ready", () => {
    createWindow();
});

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on("app_version", (event) => {
    event.sender.send("app_version", {
        version: app.getVersion()
    });
});

autoUpdater.on('update-available', () => {
    updating=true;
    mainWindow.webContents.send('update_available');
  });
  autoUpdater.on('update-downloaded', () => {
    updating=true;
    mainWindow.webContents.send('update_downloaded');
  });


  ipcMain.on('restart_app', () => {
    autoUpdater.quitAndInstall();
  });