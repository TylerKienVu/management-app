import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectToolBarComponent } from './project-tool-bar.component';

describe('ProjectToolBarComponent', () => {
  let component: ProjectToolBarComponent;
  let fixture: ComponentFixture<ProjectToolBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectToolBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
