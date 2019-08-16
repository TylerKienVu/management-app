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
  rejectionDict: Dict = {"Jan": 0, "Feb": 0, "Mar": 0, "Apr": 0, "May": 0, "Jun": 0, "Jul": 0, "Aug": 0, "Sep": 0, "Oct": 0, "Nov": 0, "Dec": 0};

  constructor(public dialogRef: MatDialogRef<GraphDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project) {}

  ngOnInit() {
    this.prepareData()
    this.initChart()
  }

  prepareData():void {
    let taskList:Task[] = this.data.tasks;
    for(let i:number = 0; i < taskList.length; i++) {
      this.addRejectionsForTask(taskList[i].rejections);
    }
  }

  addRejectionsForTask(rejectionsList: Rejection[]) {
    for(let i:number = 0; i < rejectionsList.length; i++) {
      this.addRejectionData(rejectionsList[i]);
    }
  }

  addRejectionData(rejection: Rejection) {
    let monthKeys:string[] = Object.keys(this.rejectionDict);
    let targetMonth:string = monthKeys[rejection.creationDate.getMonth()];
    this.rejectionDict[targetMonth]++;
  }

  initChart():void {
    this.dataSource = {
      chart: {
        caption: 'Rejections Chart',
        subCaption: 'Safran',
        xAxisName: 'Month',
        yAxisName: 'Rejection Count',
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
