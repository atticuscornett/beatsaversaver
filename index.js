const { app, BrowserWindow, ipcMain } = require('electron')
const path = require("path");
const fs = require("fs");
const {get} = require("https");
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

function downloadCustomLevel(id){
    if (id.includes("/")){
        return;
    }
    fetch("https://api.beatsaver.com/maps/id/" + id)
        .then(response => response.json())
        .then((data) => {
            let fileUrl = data.versions[0].downloadURL;
            const destination = 'beat-saber-' + id + '.zip';

            const file = fs.createWriteStream(destination);

            get(fileUrl, (response) => {
                response.pipe(file);
                file.on('finish', () => {
                    file.close(() => {
                        console.log('File downloaded successfully');
                    });
                });
            }).on('error', (err) => {
                fs.unlink(destination, () => {
                    console.error('Error downloading file:', err);
                });
            });
        })
}

ipcMain.handle("scanCustomLevels", (event, args) => {
    return scanCustomLevels();
});

ipcMain.handle("downloadCustomLevel", (event, args) => {
    downloadCustomLevel(args);
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
