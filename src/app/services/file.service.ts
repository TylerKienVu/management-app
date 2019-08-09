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
}