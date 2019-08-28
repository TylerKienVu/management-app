import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Task } from '../../models/Task';
import { DashboardService } from '../../services/dashboard.service';
import { Project } from '../../components/../models/Project';
import { Rejection } from '../../models/Rejection';
import { ContentComponent } from '../../util/interfaces/ContentComponent';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../entryComponents/edit-task-dialog/edit-task-dialog.component';
import { RejectionDialogComponent } from '../entryComponents/rejection-dialog/rejection-dialog.component';
import { HistoryLogDialogComponent } from '../entryComponents/history-log-dialog/history-log-dialog.component';
import { ConfirmationDialogComponent } from '../entryComponents/confirmation-dialog/confirmation-dialog.component';
import { FileService } from 'src/app/services/file.service';
import { Router } from '@angular/router';

// TODO: Put limit on amount of text that shows for name and description

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, ContentComponent {
  displayedColumns: string[] = ['name', 'description', 'owner', 'priority', 'creationAge', 'dueDate', 'overdueAge', 'rejectedCount','status', 'actions'];
  currentProject:Project = null;
  currentTasks:Task[] = null;
  dataSource:any;
  
  // This is used to cache the row that is currently being used.
  // When the user clicks on the task options, the name of the task
  // will be cached here for future modification based on action chosen.
  cachedTaskName:string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dashboardService:DashboardService, public dialog:MatDialog, private cdr:ChangeDetectorRef, private fileService:FileService) {}

  ngOnInit() {
  }

  initSort() {
    this.dataSource.sort = this.sort;

    // Teaches the sorting algorithm for specific headers
    this.dataSource.sortingDataAccessor = (item,property) => {
      if (property === 'creationAge') {
        let ageString:string =  this.getCreationAge(item.dateCreated);
        return this.extractDays(ageString);
      }
      else if (property === 'overdueAge') {
        let ageString:string =  this.getOverdueAge(item.dueDate, item.completed);
        return this.extractDays(ageString);
      }
      else if (property === 'status') {
        return this.getStatusValue(item);
      }
      else {
        return item[property];
      }
    }
  }

  transferState():Project {
    return this.currentProject;
  }

  recieveState(project:Project) {
    this.setState(project, project.tasks);
  }

  setState(project:Project, tasks:Task[]):void {
    this.currentProject = project;
    this.currentTasks = tasks;
    this.dataSource = new MatTableDataSource(this.currentTasks);

    // Had to add this line because on initial app load, the view doesn't update properly
    // This probably is due to the getProjectCallback() in project-tool-bar component.
    // I believe that this component loads before the callback is called.

    // THIS LINE IS BREAKING THE POPUP DIALOGS
    // this.cdr.detectChanges();

    // Have to re init sort to keep sorting working with new dataset
    this.initSort();
  }

  refresh():void {
    if(this.currentProject != undefined && this.currentTasks != undefined) {
      this.setState(this.currentProject, this.currentTasks);
    }    
  }

  // The JSON file is being updated in app.component.ts so a change event isn't needed here
  addTask(task:Task):void {
    this.currentTasks.push(task);

    // Refreshes the list
    this.refresh();
  }

  removeTask(task:Task):void {
    const index = this.currentTasks.indexOf(task, 0);
    if (index > -1) {
      // Removes the element in place
      this.currentTasks.splice(index, 1);
    }

    // Send a change event to the shared file service so that it can update the json file
    this.fileService.emitChange(true);

    // Refreshes the list
    this.refresh();
  }

  updateTask(modalResult:Task, taskToUpdate:Task):void {
    taskToUpdate.name = modalResult.name;
    taskToUpdate.description = modalResult.description;
    taskToUpdate.priority = modalResult.priority;
    taskToUpdate.dueDate = modalResult.dueDate;

    this.fileService.emitChange(true);

    this.refresh();
  }

  applyFilter(value:string) {
    console.log(value);
    this.dataSource.filter = value.trim().toLowerCase();
  } 

  getOverdueAge(dueDate:Date, completed:Boolean):string {
    if(completed) return "0 days";
    
    let currDate:Date = new Date();

    var diff = currDate.getTime() - dueDate.getTime();
    if (diff < 0) {
      return "0 days"
    }

    var diffDays = Math.ceil(Math.abs(diff) / (1000 * 3600 * 24));
    return diffDays + " days";
  }

  getCreationAge(creationDate:Date):string {
    let currDate:Date = new Date();

    var diff = Math.abs(creationDate.getTime() - currDate.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
    return diffDays + " days";
  }

  isOverDue(dueDate:Date):boolean {
    let currDate = new Date();

    return dueDate < currDate;
  }

  shortenDescription(description:string):string {
    if (description.length > 100) {
      return description.substring(0,100) + "...";
    }
    return description;
  }

  // Returns a number for the header to sort by
  getStatusValue(task:Task):number {
    if (task.completed === true) {
      return 1;
    }
    else if (this.isOverDue(task.dueDate)) {
      return 2;
    }
    else {
      return 3;
    }
  }

  getTask(name:string):Task {
    for(let i = 0; i < this.currentTasks.length; i++) {
      if (name === this.currentTasks[i].name) {
        return this.currentTasks[i];
      }
    }
    return null;
  }

  onComplete(event:any):void {
    if (this.cachedTaskName != undefined) {
      let targetTask:Task = this.getTask(this.cachedTaskName);
      targetTask.completed = true;
      targetTask.completionDate = new Date();
      this.fileService.emitChange(true);
    }
  }

  onUndoComplete(event:any):void {
    if (this.cachedTaskName != undefined) {
      let targetTask:Task = this.getTask(this.cachedTaskName);
      targetTask.completed = false;
      targetTask.completionDate = null;
      this.fileService.emitChange(true);
    }
  }

  onStart(event:any):void {
    if (this.cachedTaskName != undefined) {
      this.getTask(this.cachedTaskName).started = true;
      this.fileService.emitChange(true);
    }
  }

  onUndoStart(event:any):void {
    if (this.cachedTaskName != undefined) {
      this.getTask(this.cachedTaskName).started = false;
      this.fileService.emitChange(true);
    }
  }

  onEdit(event:any):void {
    if (this.cachedTaskName != undefined) {
      let targetTask:Task = this.getTask(this.cachedTaskName)
      let cloneTask:Task = Object.create(targetTask);

      const dialogRef = this.dialog.open(EditTaskDialogComponent, {
        data: {fields:cloneTask, project:this.currentProject}
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result != undefined) {
          this.updateTask(result, targetTask);
          this.fileService.emitChange(true);
        }      
      })
    }  
  }

  onDelete(event:any):void {
    if (this.cachedTaskName != undefined) {
      let targetTask:Task = this.getTask(this.cachedTaskName)

      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: targetTask.name
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result != undefined) {          
          this.removeTask(targetTask);
          this.fileService.emitChange(true);
        }      
      })
    }
  }

  onReject(event:any):void {
    if (this.cachedTaskName != undefined) {
      let targetTask:Task = this.getTask(this.cachedTaskName)  

      const dialogRef = this.dialog.open(RejectionDialogComponent, {
        data: {reason:"", creationDate:new Date(), assignedTask: targetTask}
      })

      dialogRef.afterClosed().subscribe(result => {
        if(result != undefined) {
          targetTask.rejections.push(result);
          this.fileService.emitChange(true);
        }
      })
    }
  }

  onView(event:any):void {
    if (this.cachedTaskName != undefined) {
      let targetTask:Task = this.getTask(this.cachedTaskName); 

      // Make a copy of rejections so that changes do not take effect until subscription is hit
      let rejectionsCopy:Rejection[] = Object.create(targetTask.rejections);

      const dialogRef = this.dialog.open(HistoryLogDialogComponent, {
        data: {rejections:rejectionsCopy, taskName: targetTask.name}
      })

      dialogRef.afterClosed().subscribe(result => {
        if(result != undefined) {
          targetTask.rejections = result.rejections;
          this.fileService.emitChange(true);
        }
      })
    }
  }

  saveRow(event:any):void {
    let target:any;

    // Sometimes the click event will return the inner icon as the src element so
    // have to check for that case.
    if(event.srcElement.className === "fas fa-ellipsis-v") {
      target = event.srcElement.parentElement.parentElement;
    }
    else {
      target = event.srcElement
    }

    this.cachedTaskName = target.parentElement.parentElement.children[0].innerHTML;
  }

  clearView():void {
    this.recieveState(null);
  }

  extractDays(dayString:string):number {
    let ageString:string =  dayString;
    let indexSlice:number = ageString.indexOf(" days");
    let days:number = Number.parseInt(ageString.slice(0, indexSlice));
    return days;
  }
}
