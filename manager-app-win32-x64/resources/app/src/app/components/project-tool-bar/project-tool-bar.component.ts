import { Component, OnInit, Output, EventEmitter, ViewChild, ChangeDetectorRef, NgZone} from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Project } from '../../models/Project';
import { Task } from '../../models/Task';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskDialogComponent } from '../entryComponents/add-task-dialog/add-task-dialog.component';
import { ManageProjectDialogComponent } from '../entryComponents/manage-project-dialog/manage-project-dialog.component';
import { FileService } from '../../services/file.service';
import { GraphDialogComponent } from '../entryComponents/graph-dialog/graph-dialog.component';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-project-tool-bar',
  templateUrl: './project-tool-bar.component.html',
  styleUrls: ['./project-tool-bar.component.scss']
})
export class ProjectToolBarComponent implements OnInit {
  @Output() selectProjectEvent:EventEmitter<Project> = new EventEmitter<Project>();
  @Output() filterEvent:EventEmitter<string> = new EventEmitter<string>();
  @Output() addTaskEvent:EventEmitter<Task> = new EventEmitter<Task>();
  @Output() allProjectsEvent:EventEmitter<Project[]> = new EventEmitter<Project[]>();
  @Output() clearViewEvent:EventEmitter<null> = new EventEmitter<null>();
  @Output() writeToFileEvent:EventEmitter<null> = new EventEmitter<null>();
  @ViewChild('projectSelect', {static:false}) projectSelect;
  projects:Project[] = [];
  currentProject:Project = null;  

  constructor(private dashboardService:DashboardService, public dialog:MatDialog, private fileService:FileService,
     private cdr:ChangeDetectorRef, private ngZone:NgZone, private excelService:ExcelService) {
    fileService.changeEmitted$.subscribe( changeFlag => {
      this.writeToFile();
      this.allProjectsEvent.emit()
      // this.selectProjectEvent.emit(this.currentProject);
      // this.selectProjectTrigger(this.currentProject);
    });
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    // This will initiate the application
    this.getProjects();
  }

  addProject(newProject:Project):void {
    this.projects.push(newProject);

    // Select the value here programatically in order to update everything else with new project
    this.selectProjectTrigger(newProject.name);

    // Send out event to allow other components to access the list of projects
    // this.allProjectsEvent.emit(this.projects);

    this.fileService.emitChange(true);
  }

  // This is the entry point for the application
  // This feels like it should be in app.component.ts but for now it stays
  getProjects():void {
    // This function will retrieve the data and use the callback function below
    this.fileService.readFile(this);
    
    // TESTING
    // this.projects = this.dashboardService.getProjects();
    // this.allProjectsEvent.emit(this.projects);
    // this.initDashboard();
  }

  getProjectsCallback(data:string):void {
    let parsedObject:Project[]
    try {
      parsedObject = JSON.parse(data, this.dateTimeReviver);
    } catch (e) {
      // If it errors out, reset projects to empty list
      console.log(e);
      parsedObject = [];

      console.log("Recovering file state with a new file...");
      this.fileService.recoverCorruptFile();
    }
    
    this.projects = parsedObject;

    // Send out an event to allow other components to access the list of projects
    this.allProjectsEvent.emit(this.projects);

    this.initDashboard();

    // this.cdr.detectChanges();
  }

  deleteCurrentProject():void {
    let currentProjectIndex:number;

    for(let i = 0; i < this.projects.length; i++) {
      if (this.projects[i].name === this.currentProject.name) {
        this.projects.splice(i, 1);
      }
    }

    this.currentProject = null;
    this.initDashboard();
    this.fileService.emitChange(true)
  }

  initDashboard():void {
    // console.log(this.projects.length);
    if (this.projects.length > 0) {
      // console.log("triggering");
      this.selectProjectTrigger(this.projects[0].name);
    }
    else {
      // console.log("clearing view");
      this.clearViewEvent.emit(null);
    }
  }

  // Changes the current project according to value(name of project) and updates components
  selectProjectTrigger(value: any):void {
    if(value === null) {
      return;
    }

    for(let i = 0; i < this.projects.length; i++) {
      if (this.projects[i].name === value) {
        this.currentProject = this.projects[i];

        // This is required to update the value display in the project dropdown
        // This is the only thing that I found to work
        this.ngZone.run(() => {
          this.projectSelect.value = this.currentProject.name;
        })

        // Send event to parent component to update header and dash
        this.selectProjectEvent.emit(this.projects[i]);
        return;
      }
    }
  }

  applyFilter(value:string) {
    if(this.currentProject !== null) {
      this.filterEvent.emit(value);
    }    
  }

  openAddTaskDialog():void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      data: {fields:{name:"", description:"", dateCreated: new Date(), dueDate:"", priority:1, completed: false, completionDate: null, rejections: []}, project: this.currentProject}
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined) {
        this.addTaskEvent.emit(result);
      }      
    })
  }

  openManageProjectDialog():void {
    let projectClone:Project = Object.create(this.currentProject);

    const dialogRef = this.dialog.open(ManageProjectDialogComponent, {
      data: {fields:projectClone, allProjects: this.projects}
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined) {
        if (result === "Delete") {
          this.deleteCurrentProject();    
          return;
        }

        this.currentProject.name = result.name;
        this.currentProject.description = result.description;
        this.currentProject.priority = result.priority;
        this.currentProject.dueDate = result.dueDate;

        this.fileService.emitChange(true);
      }      
    })
  }

  openGraphDialog():void {
    // console.log(this.currentProject);
    const dialogRef = this.dialog.open(GraphDialogComponent, {
      data: this.currentProject
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        // console.log("graph callback");
      }
    })
  }

  // This function is so that json date string can be caught and converted back to a date object
  dateTimeReviver = function (key, value) {
    var reDateDetect = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;
    if (typeof value == 'string' && (reDateDetect.exec(value))) {
      // console.log("hit conversion");
      return new Date(value);
    }
    return value;
  }

  writeToFile():void {
    // console.log(this.projects);
    let jsonData:string = JSON.stringify(this.projects);
    // console.log(jsonData);    
    this.fileService.writeToFile(jsonData);
  }

  exportToExcel():void {
    this.excelService.exportProjectsAsExcel(this.projects);
  }

}
