import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Project } from '../../../models/Project';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-manage-project-dialog',
  templateUrl: './manage-project-dialog.component.html',
  styleUrls: ['./manage-project-dialog.component.scss']
})
export class ManageProjectDialogComponent implements OnInit {
  // Import the projects so that when creating a new project, it can check that names do not conflict
  allProjects:any;
  originalName:string;

  constructor(public dialogRef: MatDialogRef<ManageProjectDialogComponent>, public dialog:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {fields:Project, allProjects:Project[]}) {
      this.allProjects = data.allProjects;
      this.originalName = data.fields.name;
    }

  ngOnInit() {
  
  }

  checkForDuplicateName(name:any):boolean {
    if(this.originalName === name) {
      return false;
    }

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

  onDeleteClick():void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: this.originalName
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined) {        
        // Closes the dialog and sends the delete result to signal a delete event  
        this.dialogRef.close("Delete");
      }      
    })
  }
}
