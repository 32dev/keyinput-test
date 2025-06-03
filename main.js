const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const { GlobalKeyboardListener } = require('node-global-key-listener');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 900,
        frame: false, // Disable the default window frame
        transparent: true,  // Make the window background transparent
        webPreferences: {
            preload: path.join(__dirname, 'renderer.js'),
            contextIsolation: true,
            nodeIntegration: true
        },
        alwaysOnTop: true
    });
    const contextMenu = Menu.buildFromTemplate([
        // { label: '옵션 1', click: () => console.log('옵션 1 클릭') },
        // { label: '옵션 2', click: () => console.log('옵션 2 클릭') },
        // { type: 'separator' },
        { label: '닫기', click: () => console.log('MENU CLOSE') }
    ]);
    // 우클릭 시 메뉴 열기
    mainWindow.webContents.on('context-menu', (e, params) => {
        contextMenu.popup({
            window: mainWindow,
            x: params.x,
            y: params.y,
            callback: () => {
                mainWindow.close();
            }
        });
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
