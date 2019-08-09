import { Task } from './Task';

export class Project {
    name: string;
    dateCreated: Date;
    description: string;
    dueDate: Date | null;
    priority: number | null;
    tasks: Task[];
}