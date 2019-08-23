import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import * as url from 'url'

let win: BrowserWindow;
const filePath:string = __dirname + "\\..\\..\\data.json";
// const filePath:string = __dirname + "\\..\\..\\src\\assets\\data\\data.json";
const fs = require('fs');

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

        console.log("The file has saved successfully");
    })

    // console.log(data);
    // console.log(__dirname + "\\..\\..\\src\\assets\\data\\data.json");
    // const files = fs.readdirSync(__dirname)
    // win.webContents.send('getFilesResponse', files)
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