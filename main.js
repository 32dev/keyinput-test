const { app, BrowserWindow } = require('electron');
const path = require('path');
const { GlobalKeyboardListener } = require('node-global-key-listener');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 80,
        frame: false, // Disable the default window frame
        transparent: true,  // Make the window background transparent
        webPreferences: {
            preload: path.join(__dirname, 'renderer.js'),
            contextIsolation: true,
        },
    });

    mainWindow.loadFile('index.html');

    const keyboardListener = new GlobalKeyboardListener();
    // Global key listener setup
    keyboardListener.addListener((event) => {
        console.log(event);  // Log the event to see the raw data
        if (event.state === 'DOWN') {
            mainWindow.webContents.send('key-down', event);
        } else if (event.state === 'UP') {
            mainWindow.webContents.send('key-up', event);
        }
    });
});

app.on('window-all-closed', () => {
    app.quit();
});
