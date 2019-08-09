import { Task } from '../../models/Task';
import { Project } from '../../models/Project';

export interface ContentComponent {
    currentProject:Project;
    currentTasks:Task[];

    // getTasks(project:Project):void;
    transferState():Project;
    recieveState(project:Project):void;
    applyFilter(value:string):void;
    addTask(task:Task):void;
    removeTask(task:Task):void;
    updateTask(modalResult:Task, taskToUpdate:Task):void;
}