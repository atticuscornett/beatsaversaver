const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    scanCustomLevels: () => ipcRenderer.invoke("scanCustomLevels"),
    downloadCustomLevel: (id) => ipcRenderer.invoke("downloadCustomLevel", id),
    onNotify: (callback) => ipcRenderer.on("notify", callback),
    removeCustomLevel: (folder, name) => ipcRenderer.invoke("removeCustomLevel", folder, name)
});