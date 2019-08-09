import { Rejection } from './Rejection';

export class Task {
    name:string;
    description: string;
    dateCreated: Date;
    dueDate: Date;
    priority: number;    
    started: boolean;
    completed: boolean;
    rejections: Rejection[];
    owner: string|null;
    
}