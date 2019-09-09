import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../../models/Task';
import { Project } from '../../../models/Project';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss']
})
export class EditTaskDialogComponent implements OnInit {
  originalName:string;

  constructor(public dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {fields:Task, project:Project}) {
      this.originalName = data.fields.name;
  }


  ngOnInit() {    
    
  }

  checkForDuplicateName(name:any):boolean {
    // Check so that it doesn't throw error for same name
    if (name === this.originalName) {
      return false;
    }

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
