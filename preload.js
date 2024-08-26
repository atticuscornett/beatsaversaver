const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    scanCustomLevels: () => ipcRenderer.invoke("scanCustomLevels"),
    downloadCustomLevel: (id) => ipcRenderer.invoke("downloadCustomLevel", id),
    onNotify: (callback) => ipcRenderer.on("notify", callback),
    removeCustomLevel: (folder, name) => ipcRenderer.invoke("removeCustomLevel", folder, name),
    setCustomLevelFolder: (folder) => ipcRenderer.invoke("setCustomLevelFolder", folder),
    getCustomLevelFolder: () => ipcRenderer.invoke("getCustomLevelFolder"),
    selectFolder: () => ipcRenderer.invoke("selectFolder"),
    getSettings: () => ipcRenderer.invoke("getSettings"),
    setSettings: (settings) => ipcRenderer.invoke("setSettings", settings)
});