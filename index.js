const { app, BrowserWindow, ipcMain } = require('electron')
const path = require("path");
const fs = require("fs");
const AdmZip = require("adm-zip");
const {get} = require("https");
let customLevelFolder = "C:\\Program Files\\Oculus\\Software\\Software\\hyperbolic-magnetism-beat-saber\\Beat Saber_Data\\CustomLevels";
let win;

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

function notify(message){
    win.webContents.send('notify', {'message': message});
}

function downloadCustomLevel(id){
    console.log("Downloading level with id: " + id);

    if (id.includes("/")){
        notify("Invalid level id. (id: " + id + ", code: 1)");
        return false;
    }

    console.log("Requesting level zip from BeatSaver API");
    fetch("https://api.beatsaver.com/maps/id/" + id)
        .then(response => response.json())
        .then((data) => {
            try {
                let fileUrl = data.versions[0].downloadURL;
                const destination = 'beat-saber-' + id + '.zip';

                console.log("Downloading level from " + fileUrl + " as " + destination);

                const file = fs.createWriteStream(destination);

                get(fileUrl, (response) => {
                    response.pipe(file);
                    file.on('finish', () => {
                        file.close(() => {
                            console.log('File downloaded successfully');
                            installCustomLevel(destination, data);
                        });
                    });
                }).on('error', (err) => {
                    fs.unlink(destination, () => {
                        console.error('Error downloading file:', err);
                        notify("Error downloading level. (id: " + id + ", code: 2)");
                    });
                });
            }
            catch (e) {
                console.error("Error downloading level: " + e);
                notify("Error downloading level. (id: " + id + ", code: 3)");
            }
        })

    return true;
}

function installCustomLevel(levelFile, levelData){
    try {
        let zip = new AdmZip(levelFile);
        let levelId = levelData.id;
        let levelAuthorName = levelData.metadata.levelAuthorName;
        let levelName = levelData.metadata.songName;
        let levelFolder = path.join(customLevelFolder, levelId + " (" + levelName + " - " + levelAuthorName + ")");

        console.log("Extracting " + levelFile + " to " + levelFolder);

        zip.extractAllTo(levelFolder, true);

        console.log("Level extracted to " + levelFolder);

        notify("Download finished: " + levelName + "(" + levelId + ")");
    }
    catch (e) {
        console.error("Error extracting level: " + e);
        notify("Error installing level. (id: " + levelData.id + ", code: 4)");
    }
    try {
        fs.rmSync(levelFile);
    }
    catch (e) {
        console.error("Error deleting level zip: " + e);
        notify("Error cleaning up downloads. (id: " + levelData.id + ", code: 5)");
    }
}

ipcMain.handle("scanCustomLevels", (event, args) => {
    return scanCustomLevels();
});

ipcMain.handle("downloadCustomLevel", (event, args) => {
    downloadCustomLevel(args);
});


const createWindow = () => {
    win = new BrowserWindow({
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
