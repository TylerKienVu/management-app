import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../../../models/Project';
import { Task } from '../../../models/Task';
import { Rejection } from '../../../models/Rejection';
import { Dict } from '../../../util/interfaces/Dict';

@Component({
  selector: 'app-graph-dialog',
  templateUrl: './graph-dialog.component.html',
  styleUrls: ['./graph-dialog.component.scss']
})
export class GraphDialogComponent implements OnInit {
  dataSource:Object;
  dataFormat:string = "json";
  type:string = "mscombi2d";
  width:number = 800;
  height:number = 600;
  validYears:any = [];
  currentYear:number;
  rejectionDict: Dict = {"Jan": 0, "Feb": 0, "Mar": 0, "Apr": 0, "May": 0, "Jun": 0, "Jul": 0, "Aug": 0, "Sep": 0, "Oct": 0, "Nov": 0, "Dec": 0};
  completionDict: Dict = {"Jan": 0, "Feb": 0, "Mar": 0, "Apr": 0, "May": 0, "Jun": 0, "Jul": 0, "Aug": 0, "Sep": 0, "Oct": 0, "Nov": 0, "Dec": 0};

  constructor(public dialogRef: MatDialogRef<GraphDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project) {}

  ngOnInit() {
    this.initValidYears()

    if(this.validYears.length != 0) {
      this.prepareData(this.validYears[0]);
    }    

    this.initChart(this.validYears[0]);
  }

  initValidYears():void {
    let taskList:Task[] = this.data.tasks;
    for(let task of taskList) {
      if(task.completionDate !== null) {
        this.appendYearIfMissing(task.completionDate.getFullYear());
      }      
      for(let rejection of task.rejections) {
        this.appendYearIfMissing(rejection.creationDate.getFullYear());
      }
    }
  }

  prepareData(targetYear:number):void {
    this.clearData();
    this.currentYear = targetYear;

    let taskList:Task[] = this.data.tasks;
    for(let i:number = 0; i < taskList.length; i++) {
      this.addRejectionsForTask(taskList[i].rejections, targetYear);
      this.addCompletionForTask(taskList[i].completionDate, targetYear);
    }
  }

  clearData():void {
    this.rejectionDict = {"Jan": 0, "Feb": 0, "Mar": 0, "Apr": 0, "May": 0, "Jun": 0, "Jul": 0, "Aug": 0, "Sep": 0, "Oct": 0, "Nov": 0, "Dec": 0};
    this.completionDict = {"Jan": 0, "Feb": 0, "Mar": 0, "Apr": 0, "May": 0, "Jun": 0, "Jul": 0, "Aug": 0, "Sep": 0, "Oct": 0, "Nov": 0, "Dec": 0};
  }

  addRejectionsForTask(rejectionsList: Rejection[], targetYear:number) {
    for(let i:number = 0; i < rejectionsList.length; i++) {
      this.addRejectionData(rejectionsList[i], targetYear);
    }
  }

  addRejectionData(rejection: Rejection, targetYear:number) {
    if(rejection.creationDate.getFullYear() !== targetYear) {
      return;
    }

    let monthKeys:string[] = Object.keys(this.rejectionDict);
    let targetMonth:string = monthKeys[rejection.creationDate.getMonth()];

    this.rejectionDict[targetMonth]++;
  }

  addCompletionForTask(completionDate:Date|null, targetYear:number) {
    if (completionDate === null || completionDate.getFullYear() !== targetYear) {
      return;
    }

    let monthKeys:string[] = Object.keys(this.completionDict);
    let targetMonth:string = monthKeys[completionDate.getMonth()];

    this.completionDict[targetMonth]++;
  }

  appendYearIfMissing(targetYear:number):void {
    for(let year of this.validYears) {
      if (year === targetYear) {
        return
      }
    }
    this.validYears.push(targetYear);
  }

  onSelectionChange(year:any) {
    this.prepareData(year);
    this.initChart(year);
  }

  initChart(year):void {
    this.dataSource = {
      chart: {
        caption: 'Rejections/Completion Chart (' + year + ')',
        subCaption: 'Safran',
        xAxisName: 'Month',
        yAxisName: 'Count',
        theme: 'fusion',
        exportEnabled: 1,
        exportFormats: "PNG|PDF|JPG|SVG"
      },
      categories: [
        {
          category: [
            {
              label: "Jan"
            },
            {
              label: "Feb"
            },
            {
              label: "Mar"
            },
            {
              label: "Apr"
            },
            {
              label: "May"
            },
            {
              label: "Jun"
            },
            {
              label: "Jul"
            },
            {
              label: "Aug"
            },
            {
              label: "Sep"
            },
            {
              label: "Oct"
            },
            {
              label: "Nov"
            },
            {
              label: "Dec"
            }
          ]
        }
      ],
      dataset: [
        {
          seriesname: "Number of Tasks Rejected",
          data: [
            {
              value: this.rejectionDict["Jan"]
            },
            {
              value: this.rejectionDict["Feb"]
            },
            {
              value: this.rejectionDict["Mar"]
            },
            {
              value: this.rejectionDict["Apr"]
            },
            {
              value: this.rejectionDict["May"]
            },
            {
              value: this.rejectionDict["Jun"]
            },
            {
              value: this.rejectionDict["Jul"]
            },
            {
              value: this.rejectionDict["Aug"]
            },
            {
              value: this.rejectionDict["Sep"]
            },
            {
              value: this.rejectionDict["Oct"]
            },
            {
              value: this.rejectionDict["Nov"]
            },
            {
              value: this.rejectionDict["Dec"]
            }
          ]
        },
        {
          seriesname: "Number of Tasks Completed",
          data: [
            {
              value: this.completionDict["Jan"]
            },
            {
              value: this.completionDict["Feb"]
            },
            {
              value: this.completionDict["Mar"]
            },
            {
              value: this.completionDict["Apr"]
            },
            {
              value: this.completionDict["May"]
            },
            {
              value: this.completionDict["Jun"]
            },
            {
              value: this.completionDict["Jul"]
            },
            {
              value: this.completionDict["Aug"]
            },
            {
              value: this.completionDict["Sep"]
            },
            {
              value: this.completionDict["Oct"]
            },
            {
              value: this.completionDict["Nov"]
            },
            {
              value: this.completionDict["Dec"]
            }
          ]
        },
        {
          seriesname: "Rejection Count Line",
          renderas: "line",
          data: [
            {
              value: this.rejectionDict["Jan"]
            },
            {
              value: this.rejectionDict["Feb"]
            },
            {
              value: this.rejectionDict["Mar"]
            },
            {
              value: this.rejectionDict["Apr"]
            },
            {
              value: this.rejectionDict["May"]
            },
            {
              value: this.rejectionDict["Jun"]
            },
            {
              value: this.rejectionDict["Jul"]
            },
            {
              value: this.rejectionDict["Aug"]
            },
            {
              value: this.rejectionDict["Sep"]
            },
            {
              value: this.rejectionDict["Oct"]
            },
            {
              value: this.rejectionDict["Nov"]
            },
            {
              value: this.rejectionDict["Dec"]
            }
          ]
        }
      ]
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
