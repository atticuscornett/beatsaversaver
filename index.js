const { app, BrowserWindow } = require('electron')
const path = require("path");

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    win.loadFile(path.join(__dirname, "public/index.html"))
}

app.whenReady().then(() => {
    createWindow()
})

//C:\Program Files\Oculus\Software\Software\hyperbolic-magnetism-beat-saber\Beat Saber_Data\CustomLevels