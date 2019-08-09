import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RemoveWrapperDirective } from './directives/remove-wrapper.directive';
import { TestComponent } from './components/test/test.component';
import { ProjectToolBarComponent } from './components/project-tool-bar/project-tool-bar.component';
import { ListComponent } from './components/list/list.component';
import { AddTaskDialogComponent } from './components/entryComponents/add-task-dialog/add-task-dialog.component';
import { ManageProjectDialogComponent } from './components/entryComponents/manage-project-dialog/manage-project-dialog.component';
import { CreateProjectDialogComponent } from './components/entryComponents/create-project-dialog/create-project-dialog.component';
import { EditTaskDialogComponent } from './components/entryComponents/edit-task-dialog/edit-task-dialog.component';
import { RejectionDialogComponent } from './components/entryComponents/rejection-dialog/rejection-dialog.component';
import { HistoryLogDialogComponent } from './components/entryComponents/history-log-dialog/history-log-dialog.component';
import { ConfirmationDialogComponent } from './components/entryComponents/confirmation-dialog/confirmation-dialog.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'list', component: ListComponent },
  { path: '',
    redirectTo: '/list',
    pathMatch: 'full'
  },
  { path: '**',
    redirectTo: '/list'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    DashboardComponent,
    RemoveWrapperDirective,
    TestComponent,
    ProjectToolBarComponent,
    ListComponent,
    AddTaskDialogComponent,
    ManageProjectDialogComponent,
    CreateProjectDialogComponent,
    EditTaskDialogComponent,
    RejectionDialogComponent,
    HistoryLogDialogComponent,
    ConfirmationDialogComponent
  ],
  entryComponents: [
    AddTaskDialogComponent,
    ManageProjectDialogComponent,
    CreateProjectDialogComponent,
    EditTaskDialogComponent,
    RejectionDialogComponent,
    HistoryLogDialogComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    DragDropModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    RouterModule.forRoot(appRoutes),
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
