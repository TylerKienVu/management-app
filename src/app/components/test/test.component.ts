import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  elements = [
    "Element 1",
    "Element 2",
    "Element 3",
    "Element 4",
    "Element 5",
    "Element 6",
    "Element 7",
    "Element 8",
    "Element 9",
    "Element 10"
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.elements, event.previousIndex, event.currentIndex);
  }
}
