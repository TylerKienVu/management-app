"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var win;
var filePath = __dirname + "\\..\\..\\data.json";
var exportPath = __dirname + "\\..\\..\\export.xlsx";
// const filePath:string = __dirname + "\\..\\..\\src\\assets\\data\\data.json";
var fs = require('fs');
var json2xls = require('json2xls');
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
        else {
            console.log("The file has saved successfully");
        }
    });
});
electron_1.ipcMain.on('export', function (event, data) {
    var xls = json2xls(data.data);
    fs.writeFile(exportPath, xls, function (err) {
        if (err) {
            console.log("An error occured when writing: " + err.message);
        }
        else {
            console.log("The file has exported successfully");
        }
    });
});
electron_1.ipcMain.on('read', function (event) {
    fs.readFile(filePath, 'utf-8', function (err, data) {
        if (err) {
            console.log("An error occured when reading: " + err.message);
            console.log("Creating new empty file to recover...");
            fs.writeFile(filePath, "[]", function (err) {
                if (err) {
                    console.log("An error occured when writing: " + err.message);
                }
                else {
                    console.log("The file was created successfully");
                }
            });
            event.sender.send("readResponse", "[]");
            return;
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
        pathname: path.join(__dirname, "/../../angular_build/index.html"),
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