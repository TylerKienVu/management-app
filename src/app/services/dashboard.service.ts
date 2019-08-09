import { Injectable } from '@angular/core';
import { Task } from '../models/Task';
import { Project } from '../models/Project';
import { Rejection } from '../models/Rejection';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    
    constructor() {

    }

    //These two functions are used soley for dummy data
    /* --------------------------------------------------------------------- */
    randomIntFromInterval(min,max) {
        return Math.floor((Math.random() * (max-min+1) + min));
    }

    generateRandomTask(project:Project):Task {
        let taskName:string = "ATP 77000-003-201-" + this.randomIntFromInterval(1,999);
        let taskDescription:string = "Design, Develop, and Test " + taskName; 
        let taskCompleted: number = this.randomIntFromInterval(0,1);
        let taskRejections: Rejection[];

        

        let resultTask:Task =  {
            name: taskName,
            description: taskDescription,
            dateCreated: new Date("2019-" + this.randomIntFromInterval(1,5) + "-" + this.randomIntFromInterval(1,29)),
            dueDate: new Date("2019-" + this.randomIntFromInterval(1,12) + "-" + this.randomIntFromInterval(1,29)),        
            priority: this.randomIntFromInterval(1,3),
            started: this.randomIntFromInterval(1,3) === 1 ? false : true,
            completed: taskCompleted == 1 ? true : false,
            rejections: [],
            owner: "Abdo"
        }
        
        // Link Rejections
        for(let i = 0; i < this.randomIntFromInterval(0,5); i++) {
            resultTask.rejections.push({reason:"This is the reason for rejection.", creationDate:new Date()})
        }

        return resultTask;
    }

    generateRandomProject():Project {
        let projName:string = "Project " + this.randomIntFromInterval(77000,77300) + "-" + this.randomIntFromInterval(100,999);
        let projDateCreated:Date = new Date("2019-" + this.randomIntFromInterval(1,12) + "-" + this.randomIntFromInterval(1,29));
        let projDescription:string = "Deliverables for " + projName;
        let projDueDate:Date = new Date(projDateCreated.getDate() + this.randomIntFromInterval(1,50));
        let projPriority:number = this.randomIntFromInterval(1,3);

        let resultProject: Project = {
            name: projName,
            dateCreated: projDateCreated,
            description: projDescription,
            dueDate: projDueDate,
            priority: projPriority,
            tasks: []
        }

        for(let i = 0; i < this.randomIntFromInterval(10,30); i++) {
            let taskToPush:Task = this.generateRandomTask(resultProject);
            resultProject.tasks.push(taskToPush);
        }
        return resultProject;
    }

    /* --------------------------------------------------------------------- */

    //TODO: Make these functions query the database

    getTasks(project:Project):Task[] {
        return project.tasks;
    }

    getProjects():Project[] {
        let projectList:Project[] = [];
        for(let i:number = 0; i < this.randomIntFromInterval(2,8); i++) {
            projectList.push(this.generateRandomProject());
        }
        return projectList;
    }
}