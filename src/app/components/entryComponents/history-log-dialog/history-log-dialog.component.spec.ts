import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryLogDialogComponent } from './history-log-dialog.component';

describe('HistoryLogDialogComponent', () => {
  let component: HistoryLogDialogComponent;
  let fixture: ComponentFixture<HistoryLogDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryLogDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryLogDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
