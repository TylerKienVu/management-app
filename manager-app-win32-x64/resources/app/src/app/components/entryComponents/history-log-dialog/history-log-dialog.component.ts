import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../../models/Task';
import { Rejection } from '../../../models/Rejection';

@Component({
  selector: 'app-history-log-dialog',
  templateUrl: './history-log-dialog.component.html',
  styleUrls: ['./history-log-dialog.component.scss']
})
export class HistoryLogDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<HistoryLogDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {rejections:Rejection[], taskName:string}) {}

  ngOnInit() {
  
  }

  // TODO: Finish this function
  onTrashClick(event:any):void {
    // console.log(this.getIndexOfCard(event));
    this.data.rejections.splice(this.getIndexOfCard(event), 1);
  }

  getIndexOfCard(event:any):number {
    let siblingChainCount:number = 0;

    // -1 to account for 0 index scale
    let rejectionsLength:number = this.data.rejections.length - 1;
    let currentCard:any = event.srcElement.parentElement.parentElement;

    while(currentCard.nextSibling !== null) {
      currentCard = currentCard.nextSibling;
      siblingChainCount++;
    }

    return rejectionsLength - siblingChainCount;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
