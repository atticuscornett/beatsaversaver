const { app, BrowserWindow, ipcMain } = require('electron')
const path = require("path");
const fs = require("fs");
let customLevelFolder = "C:\\Program Files\\Oculus\\Software\\Software\\hyperbolic-magnetism-beat-saber\\Beat Saber_Data\\CustomLevels";

function scanCustomLevels(){
    let folders = fs.readdirSync(customLevelFolder)
        .map(file => path.join(customLevelFolder, file))
        .filter(path => fs.statSync(path).isDirectory());

    let levels = [];
    for (let i = 0; i < folders.length; i++) {
        let dataFile = path.join(folders[i], "Info.dat");
        let level = JSON.parse(fs.readFileSync(dataFile, "utf8"));
        level.folder = folders[i];
        level.fullImagePath = path.join(folders[i], level._coverImageFilename);
        levels.push(level);
    }
    return levels;
}

ipcMain.handle("scanCustomLevels", (event, args) => {
    return scanCustomLevels();
});

console.log(JSON.stringify(scanCustomLevels()));


const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    })

    win.loadFile(path.join(__dirname, "public/index.html"))
}

app.whenReady().then(() => {
    createWindow()
})
