const {
    app,
    BrowserWindow,
    ipcMain
} = require("electron");
const {
    autoUpdater
} = require("electron-updater");
const Store = require('./src/include/store.js');

let mainWindow;

let updating = false;
try {
    require("electron-reloader")(module);
  } catch (error) {
    console.log('Eror: ' + error.message);
    
  }

  const store = new Store({
    // We'll call our data file 'user-preferences'
    configName: 'user-preferences',
    defaults: {
      // 800x600 is the default size of our window
      windowBounds: { width: 600, height: 600 }
    }
  });

function createWindow() {

    let {x,y, width, height } = store.get('windowBounds');

    mainWindow = new BrowserWindow({x,y,
        width, height,
        minWidth: 250,
        minHeight: 400,
        titleBarStyle: 'customButtonsOnHover',
        transparent: true, 
        frame: false,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    mainWindow.setAlwaysOnTop(true,"normal")
    mainWindow.loadFile("src/index.html");

    mainWindow.on('resize', () => {
        // The event doesn't pass us the window size, so we call the `getBounds` method which returns an object with
        // the height, width, and x and y coordinates.
        let { x,y,width, height } = mainWindow.getBounds();
        // Now that we have them, save them using the `set` method.
        store.set('windowBounds', {x,y, width, height });
      });

    mainWindow.on("closed", function () {
        mainWindow = null;
    });
    mainWindow.removeMenu();
    // mainWindow.webContents.openDevTools();
    // mainWindow.webContents.openDevTools({mode:'undocked'})

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

app.on('activate', () => { win.show() })

ipcMain.on("app_version", (event) => {
    event.sender.send("app_version", {
        version: app.getVersion()
    });
});



autoUpdater.on('update-available', () => {
    updating=true;
    mainWindow.webContents.send('update_available');
  });
autoUpdater.on('app-restart', () => {
  app.relaunch();
  app.exit(0);
  });



  autoUpdater.on('update-downloaded', () => {
    updating=true;
    mainWindow.webContents.send('update_downloaded');
  });


 

  ipcMain.on("app-restart", (event) => {

    app.relaunch();
    app.exit(0);
});