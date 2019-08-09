import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../../models/Task';
import { Project } from '../../../models/Project';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss']
})
export class AddTaskDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {fields:Task, project:Project}) {}

  ngOnInit() {
  
  }

  checkForDuplicateName(name:any):boolean {
    let projectTasks:Task[] = this.data.project.tasks;
    for(let i = 0; i < projectTasks.length; i++) {
      if (name === projectTasks[i].name) {
        return true
      }      
    }
    return false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
