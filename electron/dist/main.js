"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var win;
var filePath = __dirname + "\\..\\..\\src\\assets\\data\\data.json";
var fs = require('fs');
electron_1.app.on('ready', createWindow);
electron_1.app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});
// Backend file system
electron_1.ipcMain.on('write', function (event, data) {
    // console.log(data.data);
    fs.writeFile(filePath, data.data, function (err) {
        if (err) {
            console.log("An error occured when writing: " + err.message);
        }
        console.log("The file has saved successfully");
    });
    // console.log(data);
    // console.log(__dirname + "\\..\\..\\src\\assets\\data\\data.json");
    // const files = fs.readdirSync(__dirname)
    // win.webContents.send('getFilesResponse', files)
});
electron_1.ipcMain.on('read', function (event) {
    fs.readFile(filePath, 'utf-8', function (err, data) {
        if (err) {
            console.log("An error occured when reading: " + err.message);
        }
        event.sender.send("readResponse", data);
    });
});
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 1600,
        minHeight: 900,
        center: true,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, "/../../dist/manager-app/index.html"),
        protocol: 'file:',
        slashes: true
    }));
    win.removeMenu();
    win.webContents.openDevTools();
    win.on('closed', function () {
        win = null;
    });
}
//# sourceMappingURL=main.js.map