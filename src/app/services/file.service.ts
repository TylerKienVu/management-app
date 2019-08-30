import { Injectable } from '@angular/core'
import { IpcRenderer } from 'electron'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private ipc: IpcRenderer
  // Observable string sources
  private emitChangeSource = new Subject<boolean>();
  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();

  constructor() {
    // This block is error checking so that it can still run in browser
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer        
      } catch (error) {
        throw error
      }
    } else {
      console.warn('Could not load electron ipc')
    }
  }

  writeToFile(jsonData:string):void {
    this.ipc.send("write", {data:jsonData})
  }

  exportToExcel(jsonData:any, component:any):void {
    // this.ipc.send("export", {data:jsonData})

    // this.ipc.on('exportResponse', function (event, data) {
    //   component.downloadFile(data);
    // })
    
  }

  // Gets the data from the file and uses the component ref to callback a function once data is retrieved
  readFile(component:any):void {
    this.ipc.send("read");

    this.ipc.on('readResponse', function (event, data) {      
      component.getProjectsCallback(data);
    })
  }

  emitChange(needToUpdate:boolean) {
    this.emitChangeSource.next(needToUpdate);
  }

  exportToCsv(filename: string, rows: object[]) {
    if (!rows || !rows.length) {
      return;
    }
    const separator = ',';
    const keys = Object.keys(rows[0]);
    const csvContent =
      keys.join(separator) +
      '\n' +
      rows.map(row => {
        return keys.map(k => {
          let cell = row[k] === null || row[k] === undefined ? '' : row[k];
          cell = cell instanceof Date
            ? cell.toLocaleString()
            : cell.toString().replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(separator);
      }).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
}