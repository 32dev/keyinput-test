const { contextBridge, ipcRenderer } = require('electron');

// Set up key event handlers
contextBridge.exposeInMainWorld('electron', {
    onKeyDown: (callback) => ipcRenderer.on('key-down', (event, data) => {
        console.log('Key Down Event:', data);  // Log the event data

        callback(data);
    }),
    onKeyUp: (callback) => ipcRenderer.on('key-up', (event, data) => {
        console.log('Key Up Event:', data);
        callback(data);
    })
});
