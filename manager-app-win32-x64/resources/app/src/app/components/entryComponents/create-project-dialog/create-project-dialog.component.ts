import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../../../models/Project';

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.scss']
})
export class CreateProjectDialogComponent implements OnInit {
  // Import the projects so that when creating a new project, it can check that names do not conflict
  allProjects:any;

  constructor(public dialogRef: MatDialogRef<CreateProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {fields:Project, allProjects:Project[]}) {
      this.allProjects = data.allProjects;
  }

  ngOnInit() {
  
  }

  checkForDuplicateName(name:any):boolean {
    for(let i = 0; i < this.allProjects.length; i++) {
      if (name === this.allProjects[i].name) {
        return true
      }      
    }
    return false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // TODO: Make the create tasks multi select loop through each selection and create a task in the save file for the project
}
