import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Project } from '../../models/Project';
import { CreateProjectDialogComponent } from '../entryComponents/create-project-dialog/create-project-dialog.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Output() createProjectEvent:EventEmitter<Project> = new EventEmitter<Project>();
  @Input() projects:Project[];

  constructor(public dialog:MatDialog) { }

  ngOnInit() {
  }

  openCreateProjectDialog(event:any):void {
    if (this.projects === undefined) {
      this.projects = []
    }
    // the data injected is {Project, Project[]}
    // We pass in all of the current projects so that the name of the newly created project can be checked
    // This is to ensure that there is no duplicate project names
    const dialogRef = this.dialog.open(CreateProjectDialogComponent, {
      data: {fields:{name:"", dateCreated:"", description:"", dueDate:null, priority:null, tasks:[]}, allProjects:this.projects},
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined) {
        this.createProjectEvent.emit(result);
      }      
    })
  }
}
