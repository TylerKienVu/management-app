import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rejection } from '../../../models/Rejection';

@Component({
  selector: 'app-rejection-dialog',
  templateUrl: './rejection-dialog.component.html',
  styleUrls: ['./rejection-dialog.component.scss']
})
export class RejectionDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RejectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Rejection) {}

  ngOnInit() {
  
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
