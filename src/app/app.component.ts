import { Component, ChangeDetectorRef, ViewChild, NgZone } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListComponent } from './components/list/list.component';
import { Project } from './models/Project';
import { Router} from '@angular/router';
import { DashboardService } from './services/dashboard.service';
import { Task } from './models/Task';
import { ProjectToolBarComponent } from './components/project-tool-bar/project-tool-bar.component';
import { NavComponent } from './components/nav/nav.component';
import { FileService } from './services/file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(ProjectToolBarComponent, {static:false}) projectToolbar:ProjectToolBarComponent;
  @ViewChild(NavComponent, {static:false}) navSidebar:NavComponent;

  constructor(private cdr: ChangeDetectorRef, private router:Router, private dashboardService:DashboardService, private fileService:FileService, private ngZone:NgZone) {}

  title = 'manager-app';
  currentProject:Project;
  currentProjectName = "No Project Selected";
  activeRouterComponent:DashboardComponent|ListComponent;
  projects:Project[];

  updateHeaderAndDashboard(project:Project):void {
    // Updates the header
    // There is a separate variable for the name because it needs a default value
    this.currentProjectName = project.name;

    // Updates the current project so that we can pull tasks from it
    this.currentProject = project;
    
    // Call a change detection cycle because currentProjectName is hooked to header
    this.cdr.detectChanges();

    // Check if it is undefined because this event happens before onRouterOutletActivate
    if(this.activeRouterComponent !== undefined) {
      this.activeRouterComponent.recieveState(project);

      // This is a hacky workaround to make the change detection trigger.
      // Using the change detection ref to detectChanges() doesn't work because
      // it breaks the material dropdown components. This feels very awkward to use but
      // it works.
      // this.router.navigate(['/dashboard']);
      // this.router.navigate(['/list']);
      this.ngZone.run(console.log);
    }    
  }

  // This will hit on page load
  onRouterOutletActivate(component: any):void {
    let previousComponent = this.activeRouterComponent;
    this.activeRouterComponent = component;

    // If transfering content views, transfer the state
    if(previousComponent !== undefined) {
      this.activeRouterComponent = component;
      this.activeRouterComponent.recieveState(previousComponent.transferState());    
      return;
    }
  }

  applyFilter(value:string):void {
    this.activeRouterComponent.applyFilter(value);
  }

  // Creates the task object and then adds it to the active component
  addTask(newTask:Task):void {
    this.activeRouterComponent.addTask(newTask)
    this.writeToFile();
  }

  addProject(newProject:Project):void {
    this.projectToolbar.addProject(newProject);
    this.writeToFile();
  }

  // This is to pass the projects to the components
  saveProjects(projects:Project[]):void {
    this.projects = projects;
  }

  clearView():void {
    this.activeRouterComponent.clearView();
    this.currentProject = null;
    this.currentProjectName = "No Project Selected";
  }

  // This will save all of the projects to the json file
  writeToFile():void {
    let jsonData:string = JSON.stringify(this.projects);
    this.fileService.writeToFile(jsonData);
  }

}
