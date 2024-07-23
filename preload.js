const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    scanCustomLevels: () => ipcRenderer.invoke("scanCustomLevels")
});