import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import * as url from 'url'

let win: BrowserWindow;
const filePath:string = __dirname + "\\..\\..\\data.json";
const exportPath:string = __dirname + "\\..\\..\\export.xlsx";
// const filePath:string = __dirname + "\\..\\..\\src\\assets\\data\\data.json";
const fs = require('fs');
const json2xls = require('json2xls');

app.on('ready', createWindow);

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

// Backend file system
ipcMain.on('write', (event, data) => {    
    // console.log(data.data);

    fs.writeFile(filePath, data.data, (err) => {
        if(err){
            console.log("An error occured when writing: " + err.message);
        }
        else{
            console.log("The file has saved successfully");
        }        
    })
})

ipcMain.on('export', (event, data) => {
    var xls = json2xls(data.data);
    fs.writeFile(exportPath, xls, (err) => {
        if(err){
            console.log("An error occured when writing: " + err.message);
        }
        else {
            console.log("The file has exported successfully")
        }
    })
})

ipcMain.on('read', (event) => {
    fs.readFile(filePath, 'utf-8', (err,data) => {
        if(err){
            console.log("An error occured when reading: " + err.message);
        }

        event.sender.send("readResponse", data);
    })
})

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 1600,
        minHeight: 900,
        center: true,
        webPreferences: {
            nodeIntegration: true
        } 
    })

    win.loadURL(url.format({
        pathname: path.join(__dirname, "/../../angular_build/index.html"),
        protocol: 'file:',
        slashes: true
    }))

    win.removeMenu();

    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null
    })
}