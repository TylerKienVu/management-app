import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { Project } from '../models/Project';

@Injectable({
    providedIn: 'root'
})
export class ExcelService {
    constructor() {

    }

    static toExportFileName(excelFileName: string): string {
        return `${excelFileName}_export_${new Date().getTime()}.xlsx`;
    }

    // Formats the projects into an exportable format
    public exportProjectsAsExcel(projects: Project[]):void {
        const workbook: XLSX.WorkBook = XLSX.utils.book_new();

        for(let project of projects) {
            let preparedProject = this.prepareProjectForExport(project);
            let worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(preparedProject);
            XLSX.utils.book_append_sheet(workbook, worksheet, project.name);
        }
        XLSX.writeFile(workbook, ExcelService.toExportFileName("projects"));
    }

    private prepareProjectForExport(project:Project):any {
        let result = [];
        let tasks = project.tasks;
        for(let task of tasks) {
            let object = {
                name: task.name,
                description: task.description,
                dateCreated: task.dateCreated,
                dueDate: task.dueDate,
                priority: task.priority,
                started: task.started,
                completed: task.completed,
                completionDate: task.completionDate,
                owner: task.owner,
                numberOfRejections: task.rejections.length
            }
            result.push(object);
        }
        return result;
    }
}