import { Component, OnInit, Output} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { DashboardService } from '../../services/dashboard.service';
import { Task } from '../../models/Task';
import { Project } from '../../models/Project';
import { Rejection } from '../../models/Rejection';
import { ContentComponent } from '../../util/interfaces/ContentComponent';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskDialogComponent } from '../entryComponents/add-task-dialog/add-task-dialog.component';
import { EditTaskDialogComponent } from '../entryComponents/edit-task-dialog/edit-task-dialog.component';
import { RejectionDialogComponent } from '../entryComponents/rejection-dialog/rejection-dialog.component';
import { HistoryLogDialogComponent } from '../entryComponents/history-log-dialog/history-log-dialog.component';
import { FileService } from 'src/app/services/file.service';

// TODO: Add limit to text overflow for cards
// TODO: Add a not started indicator

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, ContentComponent {
  currentProject:Project;
  currentTasks:Task[];

  notStartedTasks:Task[] = [];
  inProgressTasks:Task[] = [];
  completedTasks:Task[] = [];

  filteredNotStarted:Task[] = [];
  filteredInProgress:Task[] = [];
  filteredCompleted:Task[] = [];

  cachedTaskName:string;

  constructor(private dashboardService:DashboardService, public dialog:MatDialog, private fileService:FileService) {}

  ngOnInit() {
  }

  transferState():Project {
    return this.currentProject;
  }

  recieveState(project:Project) {
    this.clearTasks();
    this.currentProject = project;

    if(project !== null) {
      this.currentTasks = project.tasks;
    }
    
    this.initDashboard();
  }

  addTask(task:Task):void {
    this.currentTasks.push(task);    
    this.initDashboard();
  }

  removeTask(task:Task):void {
    const index = this.currentTasks.indexOf(task, 0);
    if (index > -1) {
      this.currentTasks.splice(index, 1);
    }

    this.initDashboard();
  }

  updateTask(modalResult:Task, taskToUpdate:Task):void {
    taskToUpdate.name = modalResult.name;
    taskToUpdate.description = modalResult.description;
    taskToUpdate.priority = modalResult.priority;
    taskToUpdate.dueDate = modalResult.dueDate;

    this.initDashboard();
  }

  // This is a wrapper function to match function names with the list refresh()
  refresh():void {
    this.initDashboard();
  }

  // Processes and udpates the dashboard
  initDashboard():void {
    this.categorizeTasks();
    this.initFilters();
  }

  applyFilter(filter:string):void {
    this.filteredInProgress = this.inProgressTasks.filter(this.isFiltered(filter));
    this.filteredNotStarted = this.notStartedTasks.filter(this.isFiltered(filter));
    this.filteredCompleted = this.completedTasks.filter(this.isFiltered(filter));
  }

  clearTasks():void {
    this.currentTasks = [];
    this.inProgressTasks = [];
    this.notStartedTasks = [];
    this.completedTasks = [];
    this.filteredInProgress = [];
    this.filteredNotStarted = [];
    this.filteredCompleted = [];
  }

  categorizeTasks():void {
    let currDate:Date = new Date();

    this.completedTasks = [];
    this.notStartedTasks = [];
    this.inProgressTasks = [];

    for (let task of this.currentTasks) {
      if (task.completed === true) {
        this.completedTasks.push(task);
      }
      else if (task.started === true) {
        this.inProgressTasks.push(task)
      }
      else {
        this.notStartedTasks.push(task);
      }
    }
  }

  initFilters():void {
    this.filteredInProgress = this.inProgressTasks;
    this.filteredNotStarted = this.notStartedTasks;
    this.filteredCompleted = this.completedTasks;
  }

  drop(event: CdkDragDrop<string[]>):void {
    // If moving in the same list
    if (event.previousContainer === event.container) {
      // console.log(event.container.data);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    // Else, moving to a different list
    else {
      // Get the task being moved
      let nameOfTask:string = event.item.element.nativeElement.innerText.split("\n")[1];
      let targetTask = this.getTask(nameOfTask);

      // Change state of the task depending on where it is dropped
      if (event.container.id === "completed-list") {
        targetTask.completed = true;
        targetTask.started = true;
      } 
      else if (event.container.id === "in-progress-list") {
        targetTask.completed = false;
        targetTask.started = true;
      }
      else {
        targetTask.completed = false;
        targetTask.started = false;
      }

      // targetTask.completed = event.container.id === "completed-list" ? true : false;

      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex); 

      this.fileService.emitChange(true);
    }    
  }

  isOverDue(dueDate:Date):boolean {
    let currDate = new Date();

    return dueDate < currDate;
  }

  isFiltered(filter:string) {
    return function(task:Task) {
      if (task.name.indexOf(filter) != -1 || task.description.indexOf(filter) != -1) {
        return true;
      }
    }
  }

  sortPriority(event:any):void {
    let btnName = event.srcElement.id;
    if (btnName === "progress-high-to-low-btn") {
      this.filteredInProgress = this.filteredInProgress.sort(this.highToLow);
    }
    else if (btnName === "progress-low-to-high-btn") {
      this.filteredInProgress = this.filteredInProgress.sort(this.lowToHigh);
    }
    else if (btnName === "not-started-high-to-low-btn") {
      this.filteredNotStarted = this.filteredNotStarted.sort(this.highToLow);
    }
    else if (btnName === "overdue-low-to-high-btn") {
      this.filteredNotStarted = this.filteredNotStarted.sort(this.lowToHigh);
    }
    else if (btnName === "completed-high-to-low-btn") {
      this.filteredCompleted = this.filteredCompleted.sort(this.highToLow);
    }
    else if (btnName === "completed-low-to-high-btn") {
      this.filteredCompleted = this.filteredCompleted.sort(this.lowToHigh);
    }
  }

  lowToHigh(first:Task, second:Task):number {
    if (first.priority < second.priority) {
      return -1;
    }
    else if (first.priority > second.priority) {
      return 1;
    }
    return 0;
  }

  highToLow(first:Task, second:Task):number {
    if (first.priority < second.priority) {
      return 1;
    }
    else if (first.priority > second.priority) {
      return -1;
    }
    return 0;
  }

  saveTask(event:any):void {
    let target:any;

    // Sometimes the click event will return the inner icon as the src element so
    // have to check for that case.
    if(event.srcElement.className === "section-menu-img") {
      target = event.srcElement.parentElement.parentElement.parentElement;
    }
    else {
      target = event.srcElement
    }

    this.cachedTaskName = target.parentElement.parentElement.children[1].innerText.split("\n")[0];
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
      this.getTask(this.cachedTaskName).completed = true;
    }
    this.fileService.emitChange(true);
    this.initDashboard();
  }

  onUndo(event:any):void {
    if (this.cachedTaskName != undefined) {
      this.getTask(this.cachedTaskName).completed = false;
    }
    this.fileService.emitChange(true);
    this.initDashboard();
  }

  onDelete(event:any):void {
    if (this.cachedTaskName != undefined) {
      this.removeTask(this.getTask(this.cachedTaskName));
      this.fileService.emitChange(true);
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

  onView(event:any) {
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

  onEdit(event:any):void {
    if (this.cachedTaskName != undefined) {
      let targetTask:Task = this.getTask(this.cachedTaskName)
      
      // Clone the task to avoid livetime modification during dialog
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

  clearView():void {
    this.recieveState(null);
  }
}
