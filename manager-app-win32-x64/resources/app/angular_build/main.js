(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!**************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/app.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"main-container\" class=\"container-fluid\">\n  <div class=\"row fill-container\">\n    <div id=\"sidebar\" class=\"col fill-container\">\n      <app-nav\n      [projects]=\"projects\"\n      (createProjectEvent)=\"addProject($event)\"></app-nav>\n    </div>\n    <div class=\"col\" style=\"padding:0;\">\n      <div class=\"container-fluid fill-container\">\n        <div id=\"header\" class=\"row fill-container\">\n          <app-header class=\"fill-container\"\n            [projectName]=\"currentProjectName\">\n          </app-header>\n        </div>\n        <div id=\"project-toolbar\" class=\"row fill-container\">\n          <app-project-tool-bar class=\"fill-container\" \n            (selectProjectEvent)=\"updateHeaderAndDashboard($event)\"\n            (filterEvent)=\"applyFilter($event)\"\n            (addTaskEvent)=\"addTask($event)\"\n            (allProjectsEvent)=\"saveProjects($event)\"\n            (clearViewEvent)=\"clearView()\"\n            (writeToFile)=\"writeToFile()\">\n          </app-project-tool-bar>\n        </div>\n        <div id=\"content\" class=\"row fill-container\">\n          <router-outlet \n            (activate)=\"onRouterOutletActivate($event)\"></router-outlet>\n        </div>\n      </div>      \n    </div>\n  </div>\n\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/dashboard/dashboard.component.html":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/dashboard/dashboard.component.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-template #nextPriority let-task=\"task\">\n  <ng-container\n    [ngTemplateOutlet]=\"task.priority === 2 ? med : high\"\n    [ngTemplateOutletContext]=\"{task:task}\">\n  </ng-container> \n</ng-template>\n\n<ng-template #low>\n    <span class=\"priority-text\">Low-Priority</span>\n</ng-template>\n<ng-template #med>\n    <span class=\"priority-text\">Med-Priority</span>\n</ng-template>\n<ng-template #high>\n    <span class=\"priority-text\">High-Priority</span>\n</ng-template>\n\n<div id=\"main-content-container\">\n  <div id=\"content-container\" class=\"container-fluid\">\n      <div id=\"cards-container\" class=\"row m-0\">\n        <div class=\"col-sm-4 p-0\">\n          <div id=\"not-started-container\" class=\"section-container\">\n            <div class=\"section-header\">\n              <span class=\"section-title\">Not Started</span>\n              <button mat-button [matMenuTriggerFor]=\"notStartedMenu\" class=\"float-right section-menu\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"Not Started Options\">\n                <span>\n                  <img class=\"section-menu-img\" src=\"./assets/imgs/hamburger-menu.png\">  \n                </span>\n              </button>\n              <mat-menu #notStartedMenu=\"matMenu\">\n                <!-- <button mat-menu-item (click)=\"openAddTaskDialog()\">Add Task</button> -->\n\n                <button mat-menu-item [matMenuTriggerFor]=\"prioritySortMenuNotStarted\">Sort By Priority</button>\n                <mat-menu #prioritySortMenuNotStarted>\n                  <button id=\"not-started-high-to-low-btn\" mat-menu-item (click)=\"sortPriority($event)\">High to Low</button>\n                  <button id=\"not-started-low-to-high-btn\" mat-menu-item (click)=\"sortPriority($event)\">Low to High</button>\n                </mat-menu>\n\n                <!-- <button mat-menu-item>Clear Tasks in List</button> -->\n              </mat-menu>\n            </div>\n            <div id=\"not-started-list\" class=\"drop-list\"\n              cdkDropList\n              (cdkDropListDropped)=\"drop($event)\"\n              #notStarted=\"cdkDropList\"              \n              [cdkDropListData]=\"notStartedTasks\"\n              [cdkDropListConnectedTo]=\"[inProgress, completed]\">\n              <mat-card class=\"drag-card\" \n                *ngFor=\"let task of filteredNotStarted\"\n                cdkDrag>\n                <div class=\"card-toolbar d-flex\">\n                  <div class=\"priority-header\" \n                  [ngClass]=\"{'low-priority': task.priority == 1,\n                              'med-priority': task.priority == 2,\n                              'high-priority': task.priority == 3}\">\n                    <ng-container\n                      [ngTemplateOutlet]=\"task.priority === 1 ? low : nextPriority\"\n                      [ngTemplateOutletContext]=\"{task:task}\">\n                    </ng-container>                \n                  </div>\n                  <i *ngIf=\"isOverDue(task.dueDate)\" class=\"far fa-clock ml-2 mb-2\" style=\"color:red; font-size: 30px\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Overdue\"></i>\n                  <button mat-button [matMenuTriggerFor]=\"taskMenu\" class=\"ml-auto mb-2 section-menu\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"Task Options\" (click)=\"saveTask($event)\">\n                    <span>\n                      <img class=\"section-menu-img\" src=\"./assets/imgs/menu.png\">  \n                    </span>\n                  </button>\n                  <mat-menu #taskMenu=\"matMenu\">\n                    <button mat-menu-item (click)=\"onComplete($event)\">Complete</button>\n                    <button mat-menu-item (click)=\"onReject($event)\">Add Rejection</button>\n                    <button mat-menu-item (click)=\"onView($event)\">View Rejections</button>\n                    <button mat-menu-item (click)=\"onEdit($event)\">Edit</button>\n                    <button mat-menu-item (click)=\"onDelete($event)\">Delete</button>\n                  </mat-menu>\n                </div>                \n                <mat-card-header>                                  \n                  <mat-card-title class=\"card-title\">{{task.name}}</mat-card-title>\n                  <mat-card-subtitle class=\"card-subtitle\">Due: {{task.dueDate.toLocaleDateString()}}</mat-card-subtitle>\n                  <!-- <mat-card-subtitle class=\"card-subtitle\">Due: {{getDueDate(task.dueDate)}}</mat-card-subtitle> -->\n                  <mat-card-subtitle class=\"card-subtitle\">Rejections: {{task.rejections.length}} </mat-card-subtitle>\n                </mat-card-header>\n                <mat-card-content>\n                  <p class=\"card-content\">\n                    {{task.description}}\n                  </p>\n                </mat-card-content>\n              </mat-card>\n            </div>\n          </div>          \n        </div>\n\n\n        <div class=\"col-sm-4 p-0\">\n          <div id=\"in-progress-container\" class=\"section-container\">\n            <div class=\"section-header\">\n              <span class=\"section-title\">In Progress</span>\n              <button mat-button [matMenuTriggerFor]=\"progressMenu\" class=\"float-right section-menu\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"In Progress Options\">\n                <span>\n                  <img class=\"section-menu-img\" src=\"./assets/imgs/hamburger-menu.png\">  \n                </span>\n              </button>\n              <mat-menu #progressMenu=\"matMenu\">\n                <!-- <button mat-menu-item (click)=\"openAddTaskDialog()\">Add Task</button> -->\n\n                <button mat-menu-item [matMenuTriggerFor]=\"prioritySortMenuInProgress\">Sort By Priority</button>\n                <mat-menu #prioritySortMenuInProgress>\n                  <button id=\"in-progress-high-to-low-btn\" mat-menu-item (click)=\"sortPriority($event)\">High to Low</button>\n                  <button id=\"in-progress-low-to-high-btn\" mat-menu-item (click)=\"sortPriority($event)\">Low to High</button>\n                </mat-menu>\n\n                <!-- <button mat-menu-item>Clear Tasks in List</button> -->\n              </mat-menu>\n            </div>\n            <div id=\"in-progress-list\" class=\"drop-list\"\n              cdkDropList\n              (cdkDropListDropped)=\"drop($event)\"\n              #inProgress=\"cdkDropList\"\n              [cdkDropListData]=\"inProgressTasks\"\n              [cdkDropListConnectedTo]=\"[notStarted, completed]\">\n\n              <mat-card class=\"drag-card\" *ngFor=\"let task of filteredInProgress\" cdkDrag>\n                <div class=\"card-toolbar d-flex\">\n                  <div class=\"priority-header\" \n                  [ngClass]=\"{'low-priority': task.priority == 1,\n                              'med-priority': task.priority == 2,\n                              'high-priority': task.priority == 3}\">\n                    <ng-container\n                      [ngTemplateOutlet]=\"task.priority === 1 ? low : nextPriority\"\n                      [ngTemplateOutletContext]=\"{task:task}\">\n                    </ng-container>                \n                  </div>\n                  <i *ngIf=\"isOverDue(task.dueDate)\" class=\"far fa-clock ml-2 mb-2\" style=\"color:red; font-size: 30px\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Overdue\"></i>\n                  <button mat-button [matMenuTriggerFor]=\"taskMenu\" class=\"ml-auto mb-2 section-menu\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"Task Options\" (click)=\"saveTask($event)\">\n                    <span>\n                      <img class=\"section-menu-img\" src=\"./assets/imgs/menu.png\">  \n                    </span>\n                  </button>\n                  <mat-menu #taskMenu=\"matMenu\">\n                    <button mat-menu-item (click)=\"onComplete($event)\">Complete</button>\n                    <button mat-menu-item (click)=\"onReject($event)\">Add Rejection</button>\n                    <button mat-menu-item (click)=\"onView($event)\">View Rejections</button>\n                    <button mat-menu-item (click)=\"onEdit($event)\">Edit</button>\n                    <button mat-menu-item (click)=\"onDelete($event)\">Delete</button>\n                  </mat-menu>\n                </div>                \n                <mat-card-header>                                  \n                  <mat-card-title class=\"card-title\">{{task.name}}</mat-card-title>\n                  <mat-card-subtitle class=\"card-subtitle\">Due: {{task.dueDate.toLocaleDateString()}}</mat-card-subtitle>\n                  <!-- <mat-card-subtitle class=\"card-subtitle\">Due: {{getDueDate(task.dueDate)}}</mat-card-subtitle> -->\n                  <mat-card-subtitle class=\"card-subtitle\">Rejections: {{task.rejections.length}} </mat-card-subtitle>\n                </mat-card-header>\n                <mat-card-content>\n                  <p class=\"card-content\">\n                    {{task.description}}\n                  </p>\n                </mat-card-content>\n              </mat-card>\n\n            </div>\n          </div> \n        </div>\n\n\n        <div class=\"col-sm-4 p-0\">\n          <div id=\"completed-container\" class=\"section-container\">\n            <div class=\"section-header\">\n              <span class=\"section-title\">Completed</span>\n              <button mat-button [matMenuTriggerFor]=\"completedMenu\" class=\"float-right section-menu\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"Completed Options\">\n                <span>\n                  <img class=\"section-menu-img\" src=\"./assets/imgs/hamburger-menu.png\">  \n                </span>\n              </button>\n              <mat-menu #completedMenu=\"matMenu\">\n                <!-- <button mat-menu-item (click)=\"openAddTaskDialog()\">Add Task</button> -->\n                \n                <button mat-menu-item [matMenuTriggerFor]=\"prioritySortMenuCompleted\">Sort By Priority</button>\n                <mat-menu #prioritySortMenuCompleted>\n                  <button id=\"completed-high-to-low-btn\" mat-menu-item (click)=\"sortPriority($event)\">High to Low</button>\n                  <button id=\"completed-low-to-high-btn\" mat-menu-item (click)=\"sortPriority($event)\">Low to High</button>\n                </mat-menu>\n\n                <!-- <button mat-menu-item>Clear Tasks in List</button> -->\n              </mat-menu>\n            </div>\n            <div id=\"completed-list\" class=\"drop-list\"\n              cdkDropList\n              (cdkDropListDropped)=\"drop($event)\"\n              #completed=\"cdkDropList\"\n              [cdkDropListData]=\"completedTasks\"\n              [cdkDropListConnectedTo]=\"[notStarted, inProgress]\">\n\n              <mat-card class=\"drag-card\" *ngFor=\"let task of filteredCompleted\" cdkDrag>\n                <div class=\"card-toolbar\">\n                  <div class=\"priority-header\" \n                  [ngClass]=\"{'low-priority': task.priority == 1,\n                              'med-priority': task.priority == 2,\n                              'high-priority': task.priority == 3}\">\n                    <ng-container\n                      [ngTemplateOutlet]=\"task.priority === 1 ? low : nextPriority\"\n                      [ngTemplateOutletContext]=\"{task:task}\">\n                    </ng-container>\n                  </div>\n                  <button mat-button [matMenuTriggerFor]=\"taskMenu\" class=\"float-right section-menu\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"Task Options\" (click)=\"saveTask($event)\">\n                    <span>\n                      <img class=\"section-menu-img\" src=\"./assets/imgs/menu.png\">  \n                    </span>\n                  </button>\n                  <mat-menu #taskMenu=\"matMenu\">\n                    <button mat-menu-item (click)=\"onUndo($event)\">Undo Complete</button>\n                    <button mat-menu-item (click)=\"onReject($event)\">Add Rejection</button>\n                    <button mat-menu-item (click)=\"onView($event)\">View Rejections</button>\n                    <button mat-menu-item (click)=\"onEdit($event)\">Edit</button>\n                    <button mat-menu-item (click)=\"onDelete($event)\">Delete</button>\n                  </mat-menu>\n                </div>                \n                <mat-card-header>                                  \n                  <mat-card-title class=\"card-title\">{{task.name}}</mat-card-title>\n                  <mat-card-subtitle class=\"card-subtitle\">Due: {{task.dueDate.toLocaleDateString()}}</mat-card-subtitle>\n                  <!-- <mat-card-subtitle class=\"card-subtitle\">Due: {{getDueDate(task.dueDate)}}</mat-card-subtitle> -->\n                  <mat-card-subtitle class=\"card-subtitle\">Rejections: {{task.rejections.length}} </mat-card-subtitle>\n                </mat-card-header>\n                <mat-card-content>\n                  <p class=\"card-content\">\n                    {{task.description}}\n                  </p>\n                </mat-card-content>\n              </mat-card>\n\n            </div>\n          </div> \n        </div>\n      </div>\n    </div>\n</div>\n\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/entryComponents/add-task-dialog/add-task-dialog.component.html":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/entryComponents/add-task-dialog/add-task-dialog.component.html ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>Add Task to Project: {{data.project.name}}</h1>\n<div mat-dialog-content>  \n  <form id=\"task-form\" #taskForm=\"ngForm\">    \n    <mat-error class=\"mt-1 mb-2\" *ngIf=\"checkForDuplicateName(data.fields.name)\">That name is taken.</mat-error>\n    <mat-form-field class=\"full-width\">      \n      <input matInput placeholder=\"Task Name\" required cdkFocusInitial [(ngModel)]=\"data.fields.name\" #name=\"ngModel\" name=\"taskName\">\n      <mat-error *ngIf=\"(name.invalid && name.errors.required)\">Name is required.</mat-error>      \n    </mat-form-field>\n    <mat-form-field class=\"full-width\">\n      <textarea matInput placeholder=\"Task Description\" [(ngModel)]=\"data.fields.description\" name=\"taskDescription\"></textarea>\n    </mat-form-field>\n    <mat-form-field class=\"half-width\">\n      <input matInput placeholder=\"Task Owner\" [(ngModel)]=\"data.fields.owner\" name=\"taskOwner\">\n    </mat-form-field>\n    <mat-form-field class=\"half-width\">\n      <mat-label>Priority Level</mat-label>\n      <mat-select panelClass=\"selectClass\" required [(ngModel)]=\"data.fields.priority\" #priority=\"ngModel\" name=\"taskPriority\">\n        <mat-option [value]=\"1\">Low Priority</mat-option>\n        <mat-option [value]=\"2\">Medium Priority</mat-option>\n        <mat-option [value]=\"3\">High Priority</mat-option>\n      </mat-select>\n      <mat-error *ngIf=\"priority.invalid && priority.errors.required\">Priority is required.</mat-error>\n    </mat-form-field>\n    <mat-form-field class=\"half-width\">\n      <input matInput [matDatepicker]=\"picker\" placeholder=\"Choose a Due Date\" required [(ngModel)]=\"data.fields.dueDate\" #date=\"ngModel\" name=\"taskDate\">\n      <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n      <mat-datepicker #picker></mat-datepicker>\n      <mat-error *ngIf=\"date.invalid && date.errors.required\">Due Date is required.</mat-error>\n    </mat-form-field>\n  </form>\n</div>\n<div mat-dialog-actions>  \n  <button mat-button [mat-dialog-close]=\"data.fields\" class=\"ml-auto\" color=\"primary\" [disabled]=\"taskForm.form.invalid || checkForDuplicateName(data.name)\">Create</button>  \n  <button mat-button (click)=\"onNoClick()\">Cancel</button>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/entryComponents/confirmation-dialog/confirmation-dialog.component.html":
/*!*****************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/entryComponents/confirmation-dialog/confirmation-dialog.component.html ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title class=\"m-4\">Are you sure you want to delete <strong>{{data}}</strong>?</h1>\n<div mat-dialog-actions class=\"d-flex justify-content-center mb-1\">  \n  <button mat-button color=\"warn\" [mat-dialog-close]=\"data\" cdkFocusInitial>Delete</button>\n  <button mat-button (click)=\"onNoClick()\">Cancel</button>\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/entryComponents/create-project-dialog/create-project-dialog.component.html":
/*!*********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/entryComponents/create-project-dialog/create-project-dialog.component.html ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>Create New Project</h1>\n<div mat-dialog-content>  \n  <form id=\"task-form\" #taskForm=\"ngForm\">\n    <mat-error class=\"mt-1 mb-2\" *ngIf=\"checkForDuplicateName(data.fields.name)\">That name is taken.</mat-error>\n    <mat-form-field class=\"full-width\">\n      <input matInput placeholder=\"Project Name\" required cdkFocusInitial [(ngModel)]=\"data.fields.name\" #name=\"ngModel\" name=\"projectName\">\n      <mat-error *ngIf=\"name.invalid && name.errors.required\">Name is required.</mat-error>\n    </mat-form-field>\n    <mat-form-field class=\"full-width\">\n      <textarea matInput placeholder=\"Project Description\" [(ngModel)]=\"data.fields.description\" name=\"taskDescription\"></textarea>\n    </mat-form-field>\n    <mat-form-field class=\"half-width\">\n      <mat-label>Priority Level</mat-label>\n      <mat-select panelClass=\"selectClass\" [(ngModel)]=\"data.fields.priority\" #priority=\"ngModel\" name=\"projectPriority\">\n        <mat-option [value]=\"null\">None</mat-option>\n        <mat-option [value]=\"1\">Low Priority</mat-option>\n        <mat-option [value]=\"2\">Medium Priority</mat-option>\n        <mat-option [value]=\"3\">High Priority</mat-option>\n      </mat-select>\n      <!-- <mat-error *ngIf=\"priority.invalid && priority.errors.required\">Priority is required.</mat-error> -->\n    </mat-form-field>\n    <mat-form-field class=\"half-width\">\n      <input matInput [matDatepicker]=\"picker\" placeholder=\"Choose a Due Date\" [(ngModel)]=\"data.fields.dueDate\" #date=\"ngModel\" name=\"projectDate\">\n      <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n      <mat-datepicker #picker></mat-datepicker>\n      <!-- <mat-error *ngIf=\"date.invalid && date.errors.required\">Due Date is required.</mat-error> -->\n    </mat-form-field>\n    <!-- <mat-form-field class=\"half-width\">\n      <mat-label>Create Tasks</mat-label>\n      <mat-select multiple>\n        <mat-option >Acceptance Test Procedure (ATP)</mat-option>\n        <mat-option >Documentation</mat-option>\n        <mat-option >Qualification</mat-option>\n        <mat-option >Verification</mat-option>\n        <mat-option >Validation</mat-option>\n        <mat-option >Functional Testing</mat-option>\n      </mat-select>\n    </mat-form-field> -->\n  </form>\n</div>\n<div mat-dialog-actions>  \n  <button mat-button [mat-dialog-close]=\"data.fields\" class=\"ml-auto\" color=\"primary\" [disabled]=\"taskForm.form.invalid || checkForDuplicateName(data.fields.name)\">Create</button>\n  <button mat-button (click)=\"onNoClick()\">Cancel</button>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/entryComponents/edit-task-dialog/edit-task-dialog.component.html":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/entryComponents/edit-task-dialog/edit-task-dialog.component.html ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>Edit Task in Project: {{data.project.name}}</h1>\n<div mat-dialog-content>  \n  <form id=\"task-form\" #taskForm=\"ngForm\">\n    <mat-error class=\"mt-1 mb-2\" *ngIf=\"checkForDuplicateName(data.name)\">That name is taken.</mat-error>\n    <mat-form-field class=\"full-width\">\n      <input matInput placeholder=\"Task Name\" required cdkFocusInitial [(ngModel)]=\"data.fields.name\" #name=\"ngModel\" name=\"taskName\">\n      <mat-error *ngIf=\"name.invalid && name.errors.required\">Name is required.</mat-error>\n    </mat-form-field>\n    <mat-form-field class=\"full-width\">\n      <textarea matInput placeholder=\"Task Description\" [(ngModel)]=\"data.fields.description\" name=\"taskDescription\"></textarea>\n    </mat-form-field>\n    <mat-form-field class=\"half-width\">\n      <input matInput placeholder=\"Task Owner\" [(ngModel)]=\"data.fields.owner\" name=\"taskOwner\">\n    </mat-form-field>\n    <mat-form-field class=\"half-width\">\n      <mat-label>Priority Level</mat-label>\n      <mat-select panelClass=\"selectClass\" required [(ngModel)]=\"data.fields.priority\" #priority=\"ngModel\" name=\"taskPriority\">\n        <mat-option [value]=\"1\">Low Priority</mat-option>\n        <mat-option [value]=\"2\">Medium Priority</mat-option>\n        <mat-option [value]=\"3\">High Priority</mat-option>\n      </mat-select>\n      <mat-error *ngIf=\"priority.invalid && priority.errors.required\">Priority is required.</mat-error>\n    </mat-form-field>\n    <mat-form-field class=\"half-width\">\n      <input matInput [matDatepicker]=\"picker\" placeholder=\"Choose a Due Date\" required [(ngModel)]=\"data.fields.dueDate\" #date=\"ngModel\" name=\"taskDate\">\n      <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n      <mat-datepicker #picker></mat-datepicker>\n      <mat-error *ngIf=\"date.invalid && date.errors.required\">Due Date is required.</mat-error>\n    </mat-form-field>\n  </form>\n</div>\n<div mat-dialog-actions>  \n  <button mat-button [mat-dialog-close]=\"data.fields\" class=\"ml-auto\" color=\"primary\" [disabled]=\"taskForm.form.invalid\">Save</button>\n  <button mat-button (click)=\"onNoClick()\">Cancel</button>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/entryComponents/graph-dialog/graph-dialog.component.html":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/entryComponents/graph-dialog/graph-dialog.component.html ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div mat-dialog-content>  \n  <mat-form-field>\n    <mat-label>\n      Graph Year\n    </mat-label>\n    <mat-select (selectionChange)=\"onSelectionChange($event.value)\" [(ngModel)]=\"currentYear\">\n      <mat-option *ngFor=\"let year of validYears\" [value]=\"year\">\n        {{year}}\n      </mat-option>\n    </mat-select>\n  </mat-form-field>\n  <fusioncharts \n    [width]=\"width\"\n    [height]=\"height\"\n    [type]=\"type\"\n    [dataFormat]=\"dataFormat\"\n    [dataSource]=\"dataSource\">\n  </fusioncharts>\n</div>\n<div mat-dialog-actions>  \n  <!-- <button mat-button [mat-dialog-close]=\"data.fields\" class=\"ml-auto\" color=\"primary\" [disabled]=\"taskForm.form.invalid || checkForDuplicateName(data.name)\">Create</button>   -->\n  <button mat-button class=\"ml-auto\" (click)=\"onNoClick()\">Close</button>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/entryComponents/history-log-dialog/history-log-dialog.component.html":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/entryComponents/history-log-dialog/history-log-dialog.component.html ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>History Log for Task: {{data.taskName}}</h1>\n<div mat-dialog-content>  \n  <div id=\"scroll-container\">\n    <mat-card class=\"drag-card\" \n      *ngFor=\"let rejection of data.rejections\">              \n      <mat-card-header>                                  \n        <mat-card-title class=\"card-title\">{{rejection.creationDate.toLocaleDateString()}}</mat-card-title>        \n        <i class=\"fas fa-trash trash-icon ml-auto mr-3 d-flex align-items-center hvr hvr-grow\"\n        (click)=\"onTrashClick($event)\"></i>\n      </mat-card-header>\n      <mat-card-content>\n        <p class=\"card-content\">\n          {{rejection.reason}}\n        </p>\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>\n<div mat-dialog-actions>  \n  <button mat-button [mat-dialog-close]=\"data\" color=\"primary\" class=\"ml-auto\">Save</button>  \n  <button mat-button (click)=\"onNoClick()\">Cancel</button>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/entryComponents/manage-project-dialog/manage-project-dialog.component.html":
/*!*********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/entryComponents/manage-project-dialog/manage-project-dialog.component.html ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>Manage Project: {{originalName}}</h1>\n<div mat-dialog-content>  \n  <form id=\"task-form\" #taskForm=\"ngForm\">\n    <mat-error class=\"mt-1 mb-2\" *ngIf=\"checkForDuplicateName(data.fields.name)\">That name is taken.</mat-error>\n    <mat-form-field class=\"full-width\">\n      <input matInput placeholder=\"Project Name\" required cdkFocusInitial [(ngModel)]=\"data.fields.name\" #name=\"ngModel\" name=\"projectName\">\n      <mat-error *ngIf=\"name.invalid && name.errors.required\">Name is required.</mat-error>\n    </mat-form-field>\n    <mat-form-field class=\"full-width\">\n      <textarea matInput placeholder=\"Project Description\" [(ngModel)]=\"data.fields.description\" name=\"taskDescription\"></textarea>\n    </mat-form-field>\n    <mat-form-field class=\"half-width\">\n      <mat-label>Priority Level</mat-label>\n      <mat-select panelClass=\"selectClass\" [(ngModel)]=\"data.fields.priority\" #priority=\"ngModel\" name=\"projectPriority\">\n        <mat-option [value]=\"null\">None</mat-option>\n        <mat-option [value]=\"1\">Low Priority</mat-option>\n        <mat-option [value]=\"2\">Medium Priority</mat-option>\n        <mat-option [value]=\"3\">High Priority</mat-option>\n      </mat-select>\n    </mat-form-field>\n    <mat-form-field class=\"half-width\">\n      <input matInput [matDatepicker]=\"picker\" placeholder=\"Choose a Due Date\" [(ngModel)]=\"data.fields.dueDate\" #date=\"ngModel\" name=\"projectDate\">\n      <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n      <mat-datepicker #picker></mat-datepicker>\n    </mat-form-field>\n  </form>\n</div>\n<div mat-dialog-actions>  \n  <button mat-button [mat-dialog-close]=\"data.fields\" class=\"ml-auto\" color=\"primary\" [disabled]=\"taskForm.form.invalid || checkForDuplicateName(data.fields.name)\">Save</button>\n  <button mat-button color=\"warn\" (click)=\"onDeleteClick()\">Delete</button>\n  <button mat-button (click)=\"onNoClick()\">Cancel</button>\n</div>\n\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/entryComponents/rejection-dialog/rejection-dialog.component.html":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/entryComponents/rejection-dialog/rejection-dialog.component.html ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>Create Rejection for Task: {{data.assignedTask.name}}</h1>\n<div mat-dialog-content>  \n  <form id=\"task-form\" #taskForm=\"ngForm\">\n    <mat-form-field class=\"full-width\">\n      <input matInput placeholder=\"Reason\" required cdkFocusInitial [(ngModel)]=\"data.reason\" #reason=\"ngModel\" name=\"reason\">\n      <mat-error *ngIf=\"reason.invalid && reason.errors.required\">Reason is required.</mat-error>\n    </mat-form-field>\n  </form>\n</div>\n<div mat-dialog-actions>  \n  <button mat-button [mat-dialog-close]=\"data\" class=\"ml-auto\" color=\"primary\" [disabled]=\"taskForm.form.invalid\">Create</button>\n  <button mat-button (click)=\"onNoClick()\">Cancel</button>\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/header/header.component.html":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/header/header.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav id=\"header\" class=\"navbar navbar-expand-lg navbar-light bg-light\">\n  <!-- <div id=\"search-form\">\n    <i id=\"search-icon\" class=\"fas fa-search\"></i>\n    <input id=\"search\" class=\"form-control\" type=\"search\" placeholder=\"Serach for tasks...\" aria-label=\"Filter\">\n  </div>   -->\n  <div id=\"project-name-container\" class=\"mx-auto\">\n    <span id=\"project-name\">Current Project: {{projectName}}</span>\n  </div>\n  <!-- <ul class=\"navbar-nav ml-auto mr-4\">\n    <li class=\"nav-item d-flex align-items-center\">\n        <span id=\"profile-name\">Tyler Vu</span>\n    </li>\n    <li class=\"nav-item\">\n      <button mat-button [matMenuTriggerFor]=\"profileMenu\" class=\"float-right section-menu\">\n        <span>\n          <img id=\"profile-img\" src=\"../../../assets/imgs/profile-placeholder.jfif\">  \n        </span>\n      </button>\n      <mat-menu #profileMenu=\"matMenu\">\n        <button mat-menu-item>Settings</button>\n        <button mat-menu-item>Log Out</button>\n      </mat-menu>\n    </li>\n  </ul> -->\n</nav>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/list/list.component.html":
/*!*******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/list/list.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-template #nextPriority let-task=\"task\">\n  <ng-container\n    [ngTemplateOutlet]=\"task.priority === 2 ? med : high\"\n    [ngTemplateOutletContext]=\"{task:task}\">\n  </ng-container> \n</ng-template>\n\n<ng-template #low>\n    <span class=\"priority-text\">Low-Priority</span>\n</ng-template>\n<ng-template #med>\n    <span class=\"priority-text\">Med-Priority</span>\n</ng-template>\n<ng-template #high>\n    <span class=\"priority-text\">High-Priority</span>\n</ng-template>\n\n<div id=\"main-content-container\">\n  <div id=\"table-container\" class=\"mx-auto\">\n    <table id=\"data-table\" mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\" matSort>\n        <ng-container matColumnDef=\"name\">\n          <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>\n          <td mat-cell *matCellDef=\"let task\" id=\"name-cell\">{{task.name}}</td>\n        </ng-container>\n\n        <ng-container matColumnDef=\"description\">\n          <th mat-header-cell *matHeaderCellDef class=\"description\" mat-sort-header>Description</th>\n          <td mat-cell *matCellDef=\"let task\" class=\"description\">{{shortenDescription(task.description)}}</td>\n        </ng-container>\n\n        <ng-container matColumnDef=\"owner\">\n            <th mat-header-cell *matHeaderCellDef mat-sort-header>Owner</th>\n            <td mat-cell *matCellDef=\"let task\">{{task.owner}}</td>\n          </ng-container>\n\n        <ng-container matColumnDef=\"creationAge\">\n          <th mat-header-cell *matHeaderCellDef mat-sort-header>Age (Creation)</th>\n          <td mat-cell *matCellDef=\"let task\" >{{getCreationAge(task.dateCreated)}}</td>\n        </ng-container>    \n    \n        <ng-container matColumnDef=\"dueDate\">\n          <th mat-header-cell *matHeaderCellDef mat-sort-header>Due Date</th>\n          <td mat-cell *matCellDef=\"let task\">{{task.dueDate.toLocaleDateString()}}</td>\n        </ng-container>\n    \n        <ng-container matColumnDef=\"overdueAge\">\n          <th mat-header-cell *matHeaderCellDef mat-sort-header>Age (Since Due)</th>\n          <td mat-cell *matCellDef=\"let task\" >{{getOverdueAge(task.dueDate, task.completed)}}</td>\n        </ng-container>    \n    \n        <ng-container matColumnDef=\"priority\">\n          <th mat-header-cell *matHeaderCellDef mat-sort-header>Priority</th>\n          <td mat-cell *matCellDef=\"let task\" >\n            <div class=\"priority-header\" \n            [ngClass]=\"{'low-priority': task.priority == 1,\n                        'med-priority': task.priority == 2,\n                        'high-priority': task.priority == 3}\">\n              <ng-container\n                [ngTemplateOutlet]=\"task.priority === 1 ? low : nextPriority\"\n                [ngTemplateOutletContext]=\"{task:task}\">\n              </ng-container>                \n            </div>\n          </td>\n        </ng-container>\n    \n        <ng-container matColumnDef=\"rejectedCount\">\n          <th mat-header-cell *matHeaderCellDef mat-sort-header>Rejected Count</th>\n          <td mat-cell *matCellDef=\"let task\" >{{task.rejections.length}}</td>\n        </ng-container>\n    \n        <ng-container matColumnDef=\"status\">\n          <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>\n          <td mat-cell *matCellDef=\"let task\">\n            <ng-container\n              [ngTemplateOutlet]=\"task.completed === true ? completed : otherStatuses\"\n              [ngTemplateOutletContext]=\"{task:task}\">\n            </ng-container>\n\n            <ng-template #completed>\n              <i class=\"fas fa-check\" style=\"color:green; font-size: 20px\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Completed\"></i>\n            </ng-template>\n\n            <ng-template #otherStatuses let-task=\"task\">\n                <i class=\"fas fa-spinner mx-1\" style=\"color:orange; font-size: 20px\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"In Progress\"\n                *ngIf=\"task.started === true\"></i>\n                <i class=\"fas fa-times mx-1\" style=\"color:red; font-size: 20px\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Not Started\"\n                *ngIf=\"task.started === false\"></i>\n                <i class=\"far fa-clock mx-1\" style=\"color:red; font-size: 20px\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Overdue\"\n                *ngIf=\"isOverDue(task.dueDate)\"></i>\n            </ng-template>\n          </td>\n        </ng-container>\n\n        <ng-container matColumnDef=\"actions\">\n          <th mat-header-cell *matHeaderCellDef class=\"centered\" mat-sort-header></th>\n          <td mat-cell *matCellDef=\"let task\" class=\"centered\">\n            <button mat-button [matMenuTriggerFor]=\"taskMenu\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Task Options\" (click)=\"saveRow($event)\">\n              <i class=\"fas fa-ellipsis-v\"></i>\n            </button>     \n            <mat-menu #taskMenu=\"matMenu\">\n              <ng-container\n                [ngTemplateOutlet]=\"task.completed === true ? undoOption : completeOption\">\n              </ng-container>\n\n              <ng-template #completeOption>\n                <button mat-menu-item (click)=\"onComplete($event)\">Complete</button>\n                <ng-container\n                  [ngTemplateOutlet]=\"task.started === true ? unstart : start\">\n                </ng-container>\n                <ng-template #start>\n                  <button mat-menu-item (click)=\"onStart($event)\">Mark as Started</button>\n                </ng-template>     \n                <ng-template #unstart>\n                  <button mat-menu-item (click)=\"onUndoStart($event)\">Mark as Not Started</button>\n                </ng-template> \n              </ng-template>    \n\n              <ng-template #undoOption>\n                <button mat-menu-item (click)=\"onUndoComplete($event)\">Undo Complete</button>\n              </ng-template>         \n\n              <button mat-menu-item (click)=\"onReject($event)\">Add Rejection</button>\n              <button mat-menu-item (click)=\"onView($event)\">View Rejections</button>           \n              <button mat-menu-item (click)=\"onEdit($event)\">Edit</button>\n              <button mat-menu-item (click)=\"onDelete($event)\">Delete</button>\n            </mat-menu>       \n          </td>\n        </ng-container>\n    \n        <tr mat-header-row *matHeaderRowDef=\"displayedColumns; sticky: true\"></tr>\n        <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n      </table>\n  </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/nav/nav.component.html":
/*!*****************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/nav/nav.component.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"sidebar\" class=\"container-fluid\">\n  <div id=\"brand\" class=\"row nav-img-container\">\n    <div class=\"col-sm-12 d-flex\">\n      <img id=\"safran-logo-img\" class=\"nav-img\" src=\"./assets/imgs/safran-trans.png\">\n    </div>\n  </div>\n  <div class=\"row nav-img-container\">\n    <div class=\"col-sm-12 d-flex justify-content-center\">\n      <a routerLink=\"/dashboard\">\n        <i class=\"fas fa-columns nav-icon hvr-grow\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Dashboard View\"></i>\n      </a>\n    </div>\n  </div>\n  <div class=\"row nav-img-container\">\n    <div class=\"col-sm-12 d-flex justify-content-center\">\n      <a routerLink=\"/list\">\n        <i class=\"fas fa-list-ul nav-icon hvr-grow\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"List View\"></i>\n      </a>\n    </div>\n  </div>\n  <div class=\"row nav-img-container\">\n    <div class=\"col-sm-12 d-flex justify-content-center\">\n      <i class=\"far fa-plus-square nav-icon hvr-grow\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Create Project\" (click)=\"openCreateProjectDialog($event)\"></i>\n    </div>\n  </div>  \n  <!-- <div class=\"row nav-img-container\">\n    <div class=\"col-sm-12 d-flex justify-content-center\">\n      <a routerLink=\"\">\n        <i class=\"fas fa-cog nav-icon hvr-grow\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Settings\"></i>\n      </a>\n    </div>\n  </div> -->\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/project-tool-bar/project-tool-bar.component.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/project-tool-bar/project-tool-bar.component.html ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"toolbar-container\" class=\"container-fluid\">\n  <div class=\"row m-0\">\n    <div class=\"col-sm-12 pl-0\" id=\"project-select-container\">\n      <mat-form-field id=\"project-select\">\n          <mat-label>Select Project</mat-label>\n          <mat-select panelClass=\"selectClass\" (selectionChange)=\"selectProjectTrigger($event.value)\" #projectSelect>\n          <!-- <mat-select panelClass=\"selectClass\" (selectionChange)=\"selectProjectTrigger($event.value)\" [(ngModel)]=\"currentProject.name\"> -->\n            <mat-option *ngIf=\"projects.length === 0\">No Projects Available</mat-option>\n            <mat-option *ngFor=\"let project of projects\" [value]=\"project.name\">\n              {{project.name}}\n            </mat-option>\n          </mat-select>\n        </mat-form-field>\n        <button class=\"btn ml-5 toolbar-btn hvr-grow\" [disabled]=\"currentProject == null || currentProject == undefined\" (click)=openAddTaskDialog()>\n          <div class=\"d-flex align-items-center\">\n              <i class=\"fas fa-plus mr-2 button-icon\"></i>Add Task\n          </div>          \n        </button>\n        <button class=\"btn ml-4 toolbar-btn hvr-grow\" [disabled]=\"currentProject == null || currentProject == undefined\" (click)=\"openManageProjectDialog()\">\n          <div class=\"d-flex align-items-center\">\n              <i class=\"fas fa-cog mr-2 button-icon\"></i>Manage Project\n          </div>                    \n        </button>\n        <!-- <button class=\"btn ml-4 toolbar-btn hvr-grow\" (click)=\"openGraphDialog()\"> -->\n        <button [matMenuTriggerFor]=\"exportMenu\" class=\"btn ml-4 toolbar-btn hvr-grow\" [disabled]=\"currentProject == null || currentProject == undefined\"\n         data-toggle=\"tooltip\" data-placement=\"left\" title=\"Export Options\">\n          <div class=\"d-flex align-items-center\">\n              <i class=\"fas fa-chart-bar mr-2 button-icon\"></i>Export\n          </div>            \n        </button>\n        <mat-menu #exportMenu=\"matMenu\">\n          <button mat-menu-item (click)=\"openGraphDialog()\">Generate Graph</button>\n          <button mat-menu-item (click)=\"exportToExcel()\">Export to Excel</button>\n        </mat-menu>\n        <!-- <button mat-flat-button color=\"primary\" class=\"ml-5 toolbar-btn hvr-grow\">Add Task</button> -->\n        <!-- <button mat-flat-button color=\"primary\" class=\"ml-2 toolbar-btn hvr-grow\">Manage Project</button> -->\n        <i class=\"fas fa-search ml-5\"></i>\n        <mat-form-field id=\"filter-form\" class=\"ml-1\">          \n          <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Search for a task...\">\n        </mat-form-field>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/test/test.component.html":
/*!*******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/test/test.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n"

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".fill-container {\n  height: 100%;\n  width: 100%;\n  padding: 0;\n  margin: 0;\n}\n\n#main-container {\n  padding: 0;\n  height: 90vh;\n  width: 100vw;\n}\n\n#project-toolbar {\n  width: 100%;\n  height: 10vh;\n}\n\n#sidebar {\n  max-width: 60px;\n}\n\n#header {\n  height: 60px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvQzpcXFVzZXJzXFx0eWxlclxcRG9jdW1lbnRzXFxNeSBTdHVmZlxcUGVyc29uYWxcXENvZGVcXFNhZnJhblxcbWFuYWdlci1hcHAvc3JjXFxhcHBcXGFwcC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBQTtFQUNBLFdBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtBQ0NKOztBREVBO0VBQ0ksVUFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0FDQ0o7O0FERUE7RUFDSSxXQUFBO0VBQ0EsWUFBQTtBQ0NKOztBREVBO0VBQ0ksZUFBQTtBQ0NKOztBREVBO0VBQ0ksWUFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZpbGwtY29udGFpbmVye1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gICAgbWFyZ2luOiAwO1xyXG59XHJcblxyXG4jbWFpbi1jb250YWluZXIge1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIGhlaWdodDogOTB2aDtcclxuICAgIHdpZHRoOiAxMDB2dztcclxufVxyXG5cclxuI3Byb2plY3QtdG9vbGJhciB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMTB2aDtcclxufVxyXG5cclxuI3NpZGViYXIge1xyXG4gICAgbWF4LXdpZHRoOiA2MHB4O1xyXG59XHJcblxyXG4jaGVhZGVyIHtcclxuICAgIGhlaWdodDogNjBweDtcclxufVxyXG4iLCIuZmlsbC1jb250YWluZXIge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDA7XG59XG5cbiNtYWluLWNvbnRhaW5lciB7XG4gIHBhZGRpbmc6IDA7XG4gIGhlaWdodDogOTB2aDtcbiAgd2lkdGg6IDEwMHZ3O1xufVxuXG4jcHJvamVjdC10b29sYmFyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTB2aDtcbn1cblxuI3NpZGViYXIge1xuICBtYXgtd2lkdGg6IDYwcHg7XG59XG5cbiNoZWFkZXIge1xuICBoZWlnaHQ6IDYwcHg7XG59Il19 */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_dashboard_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/dashboard.service */ "./src/app/services/dashboard.service.ts");
/* harmony import */ var _components_project_tool_bar_project_tool_bar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/project-tool-bar/project-tool-bar.component */ "./src/app/components/project-tool-bar/project-tool-bar.component.ts");
/* harmony import */ var _components_nav_nav_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/nav/nav.component */ "./src/app/components/nav/nav.component.ts");
/* harmony import */ var _services_file_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/file.service */ "./src/app/services/file.service.ts");







var AppComponent = /** @class */ (function () {
    function AppComponent(cdr, router, dashboardService, fileService, ngZone) {
        this.cdr = cdr;
        this.router = router;
        this.dashboardService = dashboardService;
        this.fileService = fileService;
        this.ngZone = ngZone;
        this.title = 'manager-app';
        this.currentProjectName = "No Project Selected";
        this.projects = [];
    }
    AppComponent.prototype.updateHeaderAndDashboard = function (project) {
        // Updates the header
        // There is a separate variable for the name because it needs a default value
        this.currentProjectName = project.name;
        // Updates the current project so that we can pull tasks from it
        this.currentProject = project;
        // Call a change detection cycle because currentProjectName is hooked to header
        this.cdr.detectChanges();
        // Check if it is undefined because this event happens before onRouterOutletActivate
        if (this.activeRouterComponent !== undefined) {
            this.activeRouterComponent.recieveState(project);
            // This is a hacky workaround to make the change detection trigger.
            // Using the change detection ref to detectChanges() doesn't work because
            // it breaks the material dropdown components. This feels very awkward to use but
            // it works.
            // this.router.navigate(['/dashboard']);
            // this.router.navigate(['/list']);
            // If this isn't run, then the dashboard/list will not update
            this.ngZone.run(console.log);
        }
    };
    // This will hit on page load
    AppComponent.prototype.onRouterOutletActivate = function (component) {
        var previousComponent = this.activeRouterComponent;
        this.activeRouterComponent = component;
        // If transfering content views, transfer the state
        if (previousComponent !== undefined) {
            this.activeRouterComponent = component;
            this.activeRouterComponent.recieveState(previousComponent.transferState());
            return;
        }
    };
    AppComponent.prototype.applyFilter = function (value) {
        this.activeRouterComponent.applyFilter(value);
    };
    // Creates the task object and then adds it to the active component
    AppComponent.prototype.addTask = function (newTask) {
        this.activeRouterComponent.addTask(newTask);
        this.projectToolbar.writeToFile();
    };
    AppComponent.prototype.addProject = function (newProject) {
        this.projectToolbar.addProject(newProject);
    };
    // This is to pass the projects to the components
    AppComponent.prototype.saveProjects = function (projects) {
        this.projects = projects;
    };
    AppComponent.prototype.clearView = function () {
        this.activeRouterComponent.clearView();
        this.currentProject = null;
        this.currentProjectName = "No Project Selected";
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_components_project_tool_bar_project_tool_bar_component__WEBPACK_IMPORTED_MODULE_4__["ProjectToolBarComponent"], { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _components_project_tool_bar_project_tool_bar_component__WEBPACK_IMPORTED_MODULE_4__["ProjectToolBarComponent"])
    ], AppComponent.prototype, "projectToolbar", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_components_nav_nav_component__WEBPACK_IMPORTED_MODULE_5__["NavComponent"], { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _components_nav_nav_component__WEBPACK_IMPORTED_MODULE_5__["NavComponent"])
    ], AppComponent.prototype, "navSidebar", void 0);
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/index.js!./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _services_dashboard_service__WEBPACK_IMPORTED_MODULE_3__["DashboardService"], _services_file_service__WEBPACK_IMPORTED_MODULE_6__["FileService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/esm5/select.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/drag-drop */ "./node_modules/@angular/cdk/esm5/drag-drop.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/menu */ "./node_modules/@angular/material/esm5/menu.es5.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/esm5/table.es5.js");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/sort */ "./node_modules/@angular/material/esm5/sort.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/esm5/datepicker.es5.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var angular_fusioncharts__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! angular-fusioncharts */ "./node_modules/angular-fusioncharts/index.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _components_header_header_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/header/header.component */ "./src/app/components/header/header.component.ts");
/* harmony import */ var _components_nav_nav_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components/nav/nav.component */ "./src/app/components/nav/nav.component.ts");
/* harmony import */ var _components_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/dashboard/dashboard.component */ "./src/app/components/dashboard/dashboard.component.ts");
/* harmony import */ var _directives_remove_wrapper_directive__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./directives/remove-wrapper.directive */ "./src/app/directives/remove-wrapper.directive.ts");
/* harmony import */ var _components_test_test_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./components/test/test.component */ "./src/app/components/test/test.component.ts");
/* harmony import */ var _components_project_tool_bar_project_tool_bar_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./components/project-tool-bar/project-tool-bar.component */ "./src/app/components/project-tool-bar/project-tool-bar.component.ts");
/* harmony import */ var _components_list_list_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./components/list/list.component */ "./src/app/components/list/list.component.ts");
/* harmony import */ var _components_entryComponents_add_task_dialog_add_task_dialog_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./components/entryComponents/add-task-dialog/add-task-dialog.component */ "./src/app/components/entryComponents/add-task-dialog/add-task-dialog.component.ts");
/* harmony import */ var _components_entryComponents_manage_project_dialog_manage_project_dialog_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./components/entryComponents/manage-project-dialog/manage-project-dialog.component */ "./src/app/components/entryComponents/manage-project-dialog/manage-project-dialog.component.ts");
/* harmony import */ var _components_entryComponents_create_project_dialog_create_project_dialog_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./components/entryComponents/create-project-dialog/create-project-dialog.component */ "./src/app/components/entryComponents/create-project-dialog/create-project-dialog.component.ts");
/* harmony import */ var _components_entryComponents_edit_task_dialog_edit_task_dialog_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./components/entryComponents/edit-task-dialog/edit-task-dialog.component */ "./src/app/components/entryComponents/edit-task-dialog/edit-task-dialog.component.ts");
/* harmony import */ var _components_entryComponents_rejection_dialog_rejection_dialog_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./components/entryComponents/rejection-dialog/rejection-dialog.component */ "./src/app/components/entryComponents/rejection-dialog/rejection-dialog.component.ts");
/* harmony import */ var _components_entryComponents_history_log_dialog_history_log_dialog_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./components/entryComponents/history-log-dialog/history-log-dialog.component */ "./src/app/components/entryComponents/history-log-dialog/history-log-dialog.component.ts");
/* harmony import */ var _components_entryComponents_confirmation_dialog_confirmation_dialog_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./components/entryComponents/confirmation-dialog/confirmation-dialog.component */ "./src/app/components/entryComponents/confirmation-dialog/confirmation-dialog.component.ts");
/* harmony import */ var _components_entryComponents_graph_dialog_graph_dialog_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./components/entryComponents/graph-dialog/graph-dialog.component */ "./src/app/components/entryComponents/graph-dialog/graph-dialog.component.ts");
/* harmony import */ var fusioncharts__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! fusioncharts */ "./node_modules/fusioncharts/fusioncharts.js");
/* harmony import */ var fusioncharts__WEBPACK_IMPORTED_MODULE_34___default = /*#__PURE__*/__webpack_require__.n(fusioncharts__WEBPACK_IMPORTED_MODULE_34__);
/* harmony import */ var fusioncharts_fusioncharts_charts__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! fusioncharts/fusioncharts.charts */ "./node_modules/fusioncharts/fusioncharts.charts.js");
/* harmony import */ var fusioncharts_fusioncharts_charts__WEBPACK_IMPORTED_MODULE_35___default = /*#__PURE__*/__webpack_require__.n(fusioncharts_fusioncharts_charts__WEBPACK_IMPORTED_MODULE_35__);
/* harmony import */ var fusioncharts_themes_fusioncharts_theme_fusion__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! fusioncharts/themes/fusioncharts.theme.fusion */ "./node_modules/fusioncharts/themes/fusioncharts.theme.fusion.js");
/* harmony import */ var fusioncharts_themes_fusioncharts_theme_fusion__WEBPACK_IMPORTED_MODULE_36___default = /*#__PURE__*/__webpack_require__.n(fusioncharts_themes_fusioncharts_theme_fusion__WEBPACK_IMPORTED_MODULE_36__);





































angular_fusioncharts__WEBPACK_IMPORTED_MODULE_17__["FusionChartsModule"].fcRoot(fusioncharts__WEBPACK_IMPORTED_MODULE_34__, fusioncharts_fusioncharts_charts__WEBPACK_IMPORTED_MODULE_35__, fusioncharts_themes_fusioncharts_theme_fusion__WEBPACK_IMPORTED_MODULE_36__);
var appRoutes = [
    { path: 'dashboard', component: _components_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_21__["DashboardComponent"] },
    { path: 'list', component: _components_list_list_component__WEBPACK_IMPORTED_MODULE_25__["ListComponent"] },
    { path: '',
        redirectTo: '/list',
        pathMatch: 'full'
    },
    { path: '**',
        redirectTo: '/list'
    }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_18__["AppComponent"],
                _components_header_header_component__WEBPACK_IMPORTED_MODULE_19__["HeaderComponent"],
                _components_nav_nav_component__WEBPACK_IMPORTED_MODULE_20__["NavComponent"],
                _components_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_21__["DashboardComponent"],
                _directives_remove_wrapper_directive__WEBPACK_IMPORTED_MODULE_22__["RemoveWrapperDirective"],
                _components_test_test_component__WEBPACK_IMPORTED_MODULE_23__["TestComponent"],
                _components_project_tool_bar_project_tool_bar_component__WEBPACK_IMPORTED_MODULE_24__["ProjectToolBarComponent"],
                _components_list_list_component__WEBPACK_IMPORTED_MODULE_25__["ListComponent"],
                _components_entryComponents_add_task_dialog_add_task_dialog_component__WEBPACK_IMPORTED_MODULE_26__["AddTaskDialogComponent"],
                _components_entryComponents_manage_project_dialog_manage_project_dialog_component__WEBPACK_IMPORTED_MODULE_27__["ManageProjectDialogComponent"],
                _components_entryComponents_create_project_dialog_create_project_dialog_component__WEBPACK_IMPORTED_MODULE_28__["CreateProjectDialogComponent"],
                _components_entryComponents_edit_task_dialog_edit_task_dialog_component__WEBPACK_IMPORTED_MODULE_29__["EditTaskDialogComponent"],
                _components_entryComponents_rejection_dialog_rejection_dialog_component__WEBPACK_IMPORTED_MODULE_30__["RejectionDialogComponent"],
                _components_entryComponents_history_log_dialog_history_log_dialog_component__WEBPACK_IMPORTED_MODULE_31__["HistoryLogDialogComponent"],
                _components_entryComponents_confirmation_dialog_confirmation_dialog_component__WEBPACK_IMPORTED_MODULE_32__["ConfirmationDialogComponent"],
                _components_entryComponents_graph_dialog_graph_dialog_component__WEBPACK_IMPORTED_MODULE_33__["GraphDialogComponent"]
            ],
            entryComponents: [
                _components_entryComponents_add_task_dialog_add_task_dialog_component__WEBPACK_IMPORTED_MODULE_26__["AddTaskDialogComponent"],
                _components_entryComponents_manage_project_dialog_manage_project_dialog_component__WEBPACK_IMPORTED_MODULE_27__["ManageProjectDialogComponent"],
                _components_entryComponents_create_project_dialog_create_project_dialog_component__WEBPACK_IMPORTED_MODULE_28__["CreateProjectDialogComponent"],
                _components_entryComponents_edit_task_dialog_edit_task_dialog_component__WEBPACK_IMPORTED_MODULE_29__["EditTaskDialogComponent"],
                _components_entryComponents_rejection_dialog_rejection_dialog_component__WEBPACK_IMPORTED_MODULE_30__["RejectionDialogComponent"],
                _components_entryComponents_history_log_dialog_history_log_dialog_component__WEBPACK_IMPORTED_MODULE_31__["HistoryLogDialogComponent"],
                _components_entryComponents_confirmation_dialog_confirmation_dialog_component__WEBPACK_IMPORTED_MODULE_32__["ConfirmationDialogComponent"],
                _components_entryComponents_graph_dialog_graph_dialog_component__WEBPACK_IMPORTED_MODULE_33__["GraphDialogComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"],
                _angular_material_select__WEBPACK_IMPORTED_MODULE_4__["MatSelectModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_6__["MatInputModule"],
                _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_7__["DragDropModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_8__["MatCardModule"],
                _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__["MatMenuModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButtonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_material_table__WEBPACK_IMPORTED_MODULE_11__["MatTableModule"],
                _angular_material_sort__WEBPACK_IMPORTED_MODULE_12__["MatSortModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_13__["RouterModule"].forRoot(appRoutes),
                _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__["MatDialogModule"],
                _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_15__["MatDatepickerModule"],
                _angular_material_core__WEBPACK_IMPORTED_MODULE_16__["MatNativeDateModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                angular_fusioncharts__WEBPACK_IMPORTED_MODULE_17__["FusionChartsModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_18__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/components/dashboard/dashboard.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/components/dashboard/dashboard.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".fill-container {\n  height: 100%;\n  width: 100%;\n  padding: 0;\n  margin: 0;\n}\n\n.drop-list {\n  overflow-y: auto;\n  max-height: 70vh;\n  min-height: 10vh;\n  padding-right: 1em;\n}\n\n.drag-card {\n  cursor: move;\n  margin-top: 15px;\n  margin-bottom: 15px;\n}\n\n.card-toolbar {\n  width: 100%;\n}\n\n.priority-header {\n  display: inline-block;\n  padding: 1em;\n  height: 20px;\n  width: 10em;\n  color: white;\n  font-weight: bold;\n  margin-bottom: 1em;\n  margin-right: 0;\n  text-align: center;\n}\n\n.priority-text {\n  display: block;\n  position: relative;\n  bottom: 10px;\n}\n\n.low-priority {\n  background-color: limegreen;\n}\n\n.med-priority {\n  background-color: darkorange;\n}\n\n.high-priority {\n  background-color: red;\n}\n\n.card-title {\n  font-size: 25px;\n  font-weight: bold;\n  overflow-wrap: normal;\n}\n\n.card-subtitle {\n  font-size: 18px;\n  font-weight: bold;\n  overflow-wrap: normal;\n}\n\n.card-content {\n  font-size: 18px;\n  font-weight: bold;\n}\n\n.section-menu-img {\n  max-height: 30px;\n}\n\n.card-menu-img {\n  max-height: 20px;\n}\n\n.section-menu {\n  padding: 0;\n}\n\n.section-header {\n  display: inline-block;\n  margin-bottom: 0.5em;\n  width: 100%;\n}\n\n.section-title {\n  font-weight: 400;\n  font-size: 2em;\n}\n\n.section-container {\n  margin-left: 1em;\n  margin-right: 1em;\n  padding: 1em;\n  background-color: #fafafa;\n}\n\n#dashboard-toolbar {\n  height: 10%;\n}\n\n#not-started-container {\n  border-top: 7px solid;\n  border-image-source: linear-gradient(to right, red, salmon);\n  border-image-slice: 1;\n}\n\n#in-progress-container {\n  border-top: 7px solid;\n  border-image-source: linear-gradient(to right, darkorange, gold);\n  border-image-slice: 1;\n}\n\n#completed-container {\n  border-top: 7px solid;\n  border-image-source: linear-gradient(to right, limegreen, lime);\n  border-image-slice: 1;\n}\n\n#main-content-container {\n  background-color: #eeeeee;\n  width: 100%;\n  height: 100%;\n}\n\n#content-container {\n  height: 100%;\n  width: 95%;\n  padding: 0;\n}\n\n#project-select {\n  margin-left: 1em;\n  margin-top: 0.5em;\n}\n\n#cards-container {\n  width: 100%;\n  height: 100%;\n}\n\n/*Drag and drop styling*/\n\n.cdk-drag-preview {\n  box-sizing: border-box;\n  border-radius: 4px;\n  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);\n}\n\n.cdk-drag-placeholder {\n  opacity: 0;\n}\n\n.cdk-drag-animating {\n  transition: -webkit-transform 250ms cubic-bezier(0, 0, 0.2, 1);\n  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);\n  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1), -webkit-transform 250ms cubic-bezier(0, 0, 0.2, 1);\n}\n\n.drag-card:last-child {\n  border: none;\n}\n\n.drop-list.cdk-drop-list-dragging .drag-card:not(.cdk-drag-placeholder) {\n  transition: -webkit-transform 250ms cubic-bezier(0, 0, 0.2, 1);\n  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);\n  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1), -webkit-transform 250ms cubic-bezier(0, 0, 0.2, 1);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvQzpcXFVzZXJzXFx0eWxlclxcRG9jdW1lbnRzXFxNeSBTdHVmZlxcUGVyc29uYWxcXENvZGVcXFNhZnJhblxcbWFuYWdlci1hcHAvc3JjXFxhcHBcXGNvbXBvbmVudHNcXGRhc2hib2FyZFxcZGFzaGJvYXJkLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxZQUFBO0VBQ0EsV0FBQTtFQUNBLFVBQUE7RUFDQSxTQUFBO0FDQ0o7O0FERUE7RUFDSSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQ0NKOztBREVBO0VBQ0ksWUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUNDSjs7QURFQTtFQUNJLFdBQUE7QUNDSjs7QURFQTtFQUNJLHFCQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QUNDSjs7QURFQTtFQUNJLGNBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7QUNDSjs7QURFQTtFQUNJLDJCQUFBO0FDQ0o7O0FERUE7RUFDSSw0QkFBQTtBQ0NKOztBREVBO0VBQ0kscUJBQUE7QUNDSjs7QURFQTtFQUNJLGVBQUE7RUFDQSxpQkFBQTtFQUNBLHFCQUFBO0FDQ0o7O0FERUE7RUFDSSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxxQkFBQTtBQ0NKOztBREVBO0VBQ0ksZUFBQTtFQUNBLGlCQUFBO0FDQ0o7O0FETUE7RUFDSSxnQkFBQTtBQ0hKOztBRE1BO0VBQ0ksZ0JBQUE7QUNISjs7QURNQTtFQUNJLFVBQUE7QUNISjs7QURNQTtFQUNJLHFCQUFBO0VBQ0Esb0JBQUE7RUFDQSxXQUFBO0FDSEo7O0FETUE7RUFDSSxnQkFBQTtFQUNBLGNBQUE7QUNISjs7QURNQTtFQUNJLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0VBQ0EseUJBQUE7QUNISjs7QURNQTtFQUNJLFdBQUE7QUNISjs7QURNQTtFQUNJLHFCQUFBO0VBQ0EsMkRBQUE7RUFDQSxxQkFBQTtBQ0hKOztBRE1BO0VBQ0kscUJBQUE7RUFDQSxnRUFBQTtFQUNBLHFCQUFBO0FDSEo7O0FETUE7RUFDSSxxQkFBQTtFQUNBLCtEQUFBO0VBQ0EscUJBQUE7QUNISjs7QURNQTtFQUNJLHlCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUNISjs7QURNQTtFQUNJLFlBQUE7RUFDQSxVQUFBO0VBQ0EsVUFBQTtBQ0hKOztBRE1BO0VBQ0ksZ0JBQUE7RUFDQSxpQkFBQTtBQ0hKOztBRE9BO0VBQ0ksV0FBQTtFQUNBLFlBQUE7QUNKSjs7QURPQSx3QkFBQTs7QUFFQTtFQUNJLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxxSEFBQTtBQ0xKOztBRFVBO0VBQ0ksVUFBQTtBQ1BKOztBRFVBO0VBQ0ksOERBQUE7RUFBQSxzREFBQTtFQUFBLDBHQUFBO0FDUEo7O0FEVUE7RUFDSSxZQUFBO0FDUEo7O0FEVUE7RUFDSSw4REFBQTtFQUFBLHNEQUFBO0VBQUEsMEdBQUE7QUNQSiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5maWxsLWNvbnRhaW5lcntcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIG1hcmdpbjogMDtcclxufVxyXG5cclxuLmRyb3AtbGlzdCB7XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gICAgbWF4LWhlaWdodDogNzB2aDtcclxuICAgIG1pbi1oZWlnaHQ6IDEwdmg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAxZW07XHJcbn1cclxuXHJcbi5kcmFnLWNhcmQge1xyXG4gICAgY3Vyc29yOiBtb3ZlO1xyXG4gICAgbWFyZ2luLXRvcDogMTVweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbn1cclxuXHJcbi5jYXJkLXRvb2xiYXIge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbi5wcmlvcml0eS1oZWFkZXIge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgcGFkZGluZzogMWVtO1xyXG4gICAgaGVpZ2h0OiAyMHB4O1xyXG4gICAgd2lkdGg6IDEwZW07XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIG1hcmdpbi1ib3R0b206IDFlbTtcclxuICAgIG1hcmdpbi1yaWdodDogMDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLnByaW9yaXR5LXRleHQge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBib3R0b206IDEwcHg7XHJcbn1cclxuXHJcbi5sb3ctcHJpb3JpdHkge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbGltZWdyZWVuO1xyXG59XHJcblxyXG4ubWVkLXByaW9yaXR5IHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IGRhcmtvcmFuZ2U7XHJcbn1cclxuXHJcbi5oaWdoLXByaW9yaXR5IHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcclxufVxyXG5cclxuLmNhcmQtdGl0bGUge1xyXG4gICAgZm9udC1zaXplOiAyNXB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBvdmVyZmxvdy13cmFwOiBub3JtYWw7XHJcbn1cclxuXHJcbi5jYXJkLXN1YnRpdGxlIHtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgb3ZlcmZsb3ctd3JhcDogbm9ybWFsO1xyXG59XHJcblxyXG4uY2FyZC1jb250ZW50IHtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcblxyXG4vLyAudGFzay1tZW51LWltZyB7XHJcbi8vICAgICBmb250LXNpemU6IDRlbTtcclxuLy8gfVxyXG5cclxuLnNlY3Rpb24tbWVudS1pbWcge1xyXG4gICAgbWF4LWhlaWdodDogMzBweDtcclxufVxyXG5cclxuLmNhcmQtbWVudS1pbWcge1xyXG4gICAgbWF4LWhlaWdodDogMjBweDtcclxufVxyXG5cclxuLnNlY3Rpb24tbWVudSB7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG59XHJcblxyXG4uc2VjdGlvbi1oZWFkZXIge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMC41ZW07XHJcbiAgICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuLnNlY3Rpb24tdGl0bGUgeyAgICBcclxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgICBmb250LXNpemU6IDJlbTsgICAgXHJcbn1cclxuXHJcbi5zZWN0aW9uLWNvbnRhaW5lciB7XHJcbiAgICBtYXJnaW4tbGVmdDogMWVtO1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAxZW07XHJcbiAgICBwYWRkaW5nOiAxZW07XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjUwLDI1MCwyNTApO1xyXG59XHJcblxyXG4jZGFzaGJvYXJkLXRvb2xiYXIge1xyXG4gICAgaGVpZ2h0OiAxMCU7XHJcbn1cclxuXHJcbiNub3Qtc3RhcnRlZC1jb250YWluZXIge1xyXG4gICAgYm9yZGVyLXRvcDogN3B4IHNvbGlkO1xyXG4gICAgYm9yZGVyLWltYWdlLXNvdXJjZTogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCByZWQsIHNhbG1vbik7XHJcbiAgICBib3JkZXItaW1hZ2Utc2xpY2U6IDE7XHJcbn1cclxuXHJcbiNpbi1wcm9ncmVzcy1jb250YWluZXIge1xyXG4gICAgYm9yZGVyLXRvcDogN3B4IHNvbGlkO1xyXG4gICAgYm9yZGVyLWltYWdlLXNvdXJjZTogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCBkYXJrb3JhbmdlLCBnb2xkKTtcclxuICAgIGJvcmRlci1pbWFnZS1zbGljZTogMTtcclxufVxyXG5cclxuI2NvbXBsZXRlZC1jb250YWluZXIge1xyXG4gICAgYm9yZGVyLXRvcDogN3B4IHNvbGlkO1xyXG4gICAgYm9yZGVyLWltYWdlLXNvdXJjZTogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCBsaW1lZ3JlZW4sIGxpbWUpO1xyXG4gICAgYm9yZGVyLWltYWdlLXNsaWNlOiAxO1xyXG59XHJcblxyXG4jbWFpbi1jb250ZW50LWNvbnRhaW5lciB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjM4LDIzOCwyMzgpO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuXHJcbiNjb250ZW50LWNvbnRhaW5lciB7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICB3aWR0aDogOTUlO1xyXG4gICAgcGFkZGluZzogMDtcclxufVxyXG5cclxuI3Byb2plY3Qtc2VsZWN0IHtcclxuICAgIG1hcmdpbi1sZWZ0OiAxZW07XHJcbiAgICBtYXJnaW4tdG9wOiAwLjVlbTtcclxuICAgIC8vIG1hcmdpbi1ib3R0b206IDJlbTtcclxufVxyXG5cclxuI2NhcmRzLWNvbnRhaW5lciB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMTAwJTtcclxufVxyXG5cclxuLypEcmFnIGFuZCBkcm9wIHN0eWxpbmcqL1xyXG5cclxuLmNkay1kcmFnLXByZXZpZXcge1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICAgIGJveC1zaGFkb3c6IDAgNXB4IDVweCAtM3B4IHJnYmEoMCwgMCwgMCwgMC4yKSxcclxuICAgICAgICAgICAgICAwIDhweCAxMHB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMTQpLFxyXG4gICAgICAgICAgICAgIDAgM3B4IDE0cHggMnB4IHJnYmEoMCwgMCwgMCwgMC4xMik7XHJcbn1cclxuXHJcbi5jZGstZHJhZy1wbGFjZWhvbGRlciB7XHJcbiAgICBvcGFjaXR5OiAwO1xyXG59XHJcblxyXG4uY2RrLWRyYWctYW5pbWF0aW5nIHtcclxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAyNTBtcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKTtcclxufVxyXG5cclxuLmRyYWctY2FyZDpsYXN0LWNoaWxkIHtcclxuICAgIGJvcmRlcjogbm9uZTtcclxufVxyXG5cclxuLmRyb3AtbGlzdC5jZGstZHJvcC1saXN0LWRyYWdnaW5nIC5kcmFnLWNhcmQ6bm90KCAuY2RrLWRyYWctcGxhY2Vob2xkZXIpIHtcclxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAyNTBtcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKTtcclxufSIsIi5maWxsLWNvbnRhaW5lciB7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbn1cblxuLmRyb3AtbGlzdCB7XG4gIG92ZXJmbG93LXk6IGF1dG87XG4gIG1heC1oZWlnaHQ6IDcwdmg7XG4gIG1pbi1oZWlnaHQ6IDEwdmg7XG4gIHBhZGRpbmctcmlnaHQ6IDFlbTtcbn1cblxuLmRyYWctY2FyZCB7XG4gIGN1cnNvcjogbW92ZTtcbiAgbWFyZ2luLXRvcDogMTVweDtcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcbn1cblxuLmNhcmQtdG9vbGJhciB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4ucHJpb3JpdHktaGVhZGVyIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBwYWRkaW5nOiAxZW07XG4gIGhlaWdodDogMjBweDtcbiAgd2lkdGg6IDEwZW07XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIG1hcmdpbi1ib3R0b206IDFlbTtcbiAgbWFyZ2luLXJpZ2h0OiAwO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5wcmlvcml0eS10ZXh0IHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYm90dG9tOiAxMHB4O1xufVxuXG4ubG93LXByaW9yaXR5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogbGltZWdyZWVuO1xufVxuXG4ubWVkLXByaW9yaXR5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogZGFya29yYW5nZTtcbn1cblxuLmhpZ2gtcHJpb3JpdHkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG59XG5cbi5jYXJkLXRpdGxlIHtcbiAgZm9udC1zaXplOiAyNXB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgb3ZlcmZsb3ctd3JhcDogbm9ybWFsO1xufVxuXG4uY2FyZC1zdWJ0aXRsZSB7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIG92ZXJmbG93LXdyYXA6IG5vcm1hbDtcbn1cblxuLmNhcmQtY29udGVudCB7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5zZWN0aW9uLW1lbnUtaW1nIHtcbiAgbWF4LWhlaWdodDogMzBweDtcbn1cblxuLmNhcmQtbWVudS1pbWcge1xuICBtYXgtaGVpZ2h0OiAyMHB4O1xufVxuXG4uc2VjdGlvbi1tZW51IHtcbiAgcGFkZGluZzogMDtcbn1cblxuLnNlY3Rpb24taGVhZGVyIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBtYXJnaW4tYm90dG9tOiAwLjVlbTtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5zZWN0aW9uLXRpdGxlIHtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgZm9udC1zaXplOiAyZW07XG59XG5cbi5zZWN0aW9uLWNvbnRhaW5lciB7XG4gIG1hcmdpbi1sZWZ0OiAxZW07XG4gIG1hcmdpbi1yaWdodDogMWVtO1xuICBwYWRkaW5nOiAxZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICNmYWZhZmE7XG59XG5cbiNkYXNoYm9hcmQtdG9vbGJhciB7XG4gIGhlaWdodDogMTAlO1xufVxuXG4jbm90LXN0YXJ0ZWQtY29udGFpbmVyIHtcbiAgYm9yZGVyLXRvcDogN3B4IHNvbGlkO1xuICBib3JkZXItaW1hZ2Utc291cmNlOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIHJlZCwgc2FsbW9uKTtcbiAgYm9yZGVyLWltYWdlLXNsaWNlOiAxO1xufVxuXG4jaW4tcHJvZ3Jlc3MtY29udGFpbmVyIHtcbiAgYm9yZGVyLXRvcDogN3B4IHNvbGlkO1xuICBib3JkZXItaW1hZ2Utc291cmNlOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIGRhcmtvcmFuZ2UsIGdvbGQpO1xuICBib3JkZXItaW1hZ2Utc2xpY2U6IDE7XG59XG5cbiNjb21wbGV0ZWQtY29udGFpbmVyIHtcbiAgYm9yZGVyLXRvcDogN3B4IHNvbGlkO1xuICBib3JkZXItaW1hZ2Utc291cmNlOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIGxpbWVncmVlbiwgbGltZSk7XG4gIGJvcmRlci1pbWFnZS1zbGljZTogMTtcbn1cblxuI21haW4tY29udGVudC1jb250YWluZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlZWVlO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4jY29udGVudC1jb250YWluZXIge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiA5NSU7XG4gIHBhZGRpbmc6IDA7XG59XG5cbiNwcm9qZWN0LXNlbGVjdCB7XG4gIG1hcmdpbi1sZWZ0OiAxZW07XG4gIG1hcmdpbi10b3A6IDAuNWVtO1xufVxuXG4jY2FyZHMtY29udGFpbmVyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLypEcmFnIGFuZCBkcm9wIHN0eWxpbmcqL1xuLmNkay1kcmFnLXByZXZpZXcge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJveC1zaGFkb3c6IDAgNXB4IDVweCAtM3B4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMCA4cHggMTBweCAxcHggcmdiYSgwLCAwLCAwLCAwLjE0KSwgMCAzcHggMTRweCAycHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcbn1cblxuLmNkay1kcmFnLXBsYWNlaG9sZGVyIHtcbiAgb3BhY2l0eTogMDtcbn1cblxuLmNkay1kcmFnLWFuaW1hdGluZyB7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAyNTBtcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKTtcbn1cblxuLmRyYWctY2FyZDpsYXN0LWNoaWxkIHtcbiAgYm9yZGVyOiBub25lO1xufVxuXG4uZHJvcC1saXN0LmNkay1kcm9wLWxpc3QtZHJhZ2dpbmcgLmRyYWctY2FyZDpub3QoLmNkay1kcmFnLXBsYWNlaG9sZGVyKSB7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAyNTBtcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/components/dashboard/dashboard.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/dashboard/dashboard.component.ts ***!
  \*************************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/drag-drop */ "./node_modules/@angular/cdk/esm5/drag-drop.es5.js");
/* harmony import */ var _services_dashboard_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/dashboard.service */ "./src/app/services/dashboard.service.ts");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _entryComponents_edit_task_dialog_edit_task_dialog_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../entryComponents/edit-task-dialog/edit-task-dialog.component */ "./src/app/components/entryComponents/edit-task-dialog/edit-task-dialog.component.ts");
/* harmony import */ var _entryComponents_rejection_dialog_rejection_dialog_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../entryComponents/rejection-dialog/rejection-dialog.component */ "./src/app/components/entryComponents/rejection-dialog/rejection-dialog.component.ts");
/* harmony import */ var _entryComponents_history_log_dialog_history_log_dialog_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../entryComponents/history-log-dialog/history-log-dialog.component */ "./src/app/components/entryComponents/history-log-dialog/history-log-dialog.component.ts");
/* harmony import */ var src_app_services_file_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/file.service */ "./src/app/services/file.service.ts");









// TODO: Add limit to text overflow for cards
// TODO: Add a not started indicator
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(dashboardService, dialog, fileService) {
        this.dashboardService = dashboardService;
        this.dialog = dialog;
        this.fileService = fileService;
        this.notStartedTasks = [];
        this.inProgressTasks = [];
        this.completedTasks = [];
        this.filteredNotStarted = [];
        this.filteredInProgress = [];
        this.filteredCompleted = [];
    }
    DashboardComponent.prototype.ngOnInit = function () {
    };
    DashboardComponent.prototype.transferState = function () {
        return this.currentProject;
    };
    DashboardComponent.prototype.recieveState = function (project) {
        this.clearTasks();
        this.currentProject = project;
        if (project !== null) {
            this.currentTasks = project.tasks;
        }
        this.initDashboard();
    };
    DashboardComponent.prototype.addTask = function (task) {
        this.currentTasks.push(task);
        this.initDashboard();
    };
    DashboardComponent.prototype.removeTask = function (task) {
        var index = this.currentTasks.indexOf(task, 0);
        if (index > -1) {
            this.currentTasks.splice(index, 1);
        }
        this.initDashboard();
    };
    DashboardComponent.prototype.updateTask = function (modalResult, taskToUpdate) {
        taskToUpdate.name = modalResult.name;
        taskToUpdate.description = modalResult.description;
        taskToUpdate.priority = modalResult.priority;
        taskToUpdate.dueDate = modalResult.dueDate;
        this.initDashboard();
    };
    // This is a wrapper function to match function names with the list refresh()
    DashboardComponent.prototype.refresh = function () {
        this.initDashboard();
    };
    // Processes and udpates the dashboard
    DashboardComponent.prototype.initDashboard = function () {
        this.categorizeTasks();
        this.initFilters();
    };
    DashboardComponent.prototype.applyFilter = function (filter) {
        this.filteredInProgress = this.inProgressTasks.filter(this.isFiltered(filter));
        this.filteredNotStarted = this.notStartedTasks.filter(this.isFiltered(filter));
        this.filteredCompleted = this.completedTasks.filter(this.isFiltered(filter));
    };
    DashboardComponent.prototype.clearTasks = function () {
        this.currentTasks = [];
        this.inProgressTasks = [];
        this.notStartedTasks = [];
        this.completedTasks = [];
        this.filteredInProgress = [];
        this.filteredNotStarted = [];
        this.filteredCompleted = [];
    };
    DashboardComponent.prototype.categorizeTasks = function () {
        var e_1, _a;
        var currDate = new Date();
        this.completedTasks = [];
        this.notStartedTasks = [];
        this.inProgressTasks = [];
        try {
            for (var _b = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](this.currentTasks), _c = _b.next(); !_c.done; _c = _b.next()) {
                var task = _c.value;
                if (task.completed === true) {
                    this.completedTasks.push(task);
                }
                else if (task.started === true) {
                    this.inProgressTasks.push(task);
                }
                else {
                    this.notStartedTasks.push(task);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    DashboardComponent.prototype.initFilters = function () {
        this.filteredInProgress = this.inProgressTasks;
        this.filteredNotStarted = this.notStartedTasks;
        this.filteredCompleted = this.completedTasks;
    };
    DashboardComponent.prototype.drop = function (event) {
        // If moving in the same list
        if (event.previousContainer === event.container) {
            // console.log(event.container.data);
            Object(_angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_2__["moveItemInArray"])(event.container.data, event.previousIndex, event.currentIndex);
        }
        // Else, moving to a different list
        else {
            // Get the task being moved
            var nameOfTask = event.item.element.nativeElement.innerText.split("\n")[1];
            var targetTask = this.getTask(nameOfTask);
            // Change state of the task depending on where it is dropped
            if (event.container.id === "completed-list") {
                targetTask.completed = true;
                targetTask.completionDate = new Date();
                targetTask.started = true;
            }
            else if (event.container.id === "in-progress-list") {
                targetTask.completed = false;
                targetTask.completionDate = null;
                targetTask.started = true;
            }
            else {
                targetTask.completed = false;
                targetTask.completionDate = null;
                targetTask.started = false;
            }
            // targetTask.completed = event.container.id === "completed-list" ? true : false;
            Object(_angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_2__["transferArrayItem"])(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
            this.fileService.emitChange(true);
        }
    };
    DashboardComponent.prototype.isOverDue = function (dueDate) {
        var currDate = new Date();
        return dueDate < currDate;
    };
    DashboardComponent.prototype.isFiltered = function (filter) {
        return function (task) {
            if (task.name.indexOf(filter) != -1 || task.description.indexOf(filter) != -1) {
                return true;
            }
        };
    };
    DashboardComponent.prototype.sortPriority = function (event) {
        var btnName = event.srcElement.id;
        if (btnName === "progress-high-to-low-btn") {
            this.filteredInProgress = this.filteredInProgress.sort(this.highToLow);
        }
        else if (btnName === "progress-low-to-high-btn") {
            this.filteredInProgress = this.filteredInProgress.sort(this.lowToHigh);
        }
        else if (btnName === "not-started-high-to-low-btn") {
            this.filteredNotStarted = this.filteredNotStarted.sort(this.highToLow);
        }
        else if (btnName === "overdue-low-to-high-btn") {
            this.filteredNotStarted = this.filteredNotStarted.sort(this.lowToHigh);
        }
        else if (btnName === "completed-high-to-low-btn") {
            this.filteredCompleted = this.filteredCompleted.sort(this.highToLow);
        }
        else if (btnName === "completed-low-to-high-btn") {
            this.filteredCompleted = this.filteredCompleted.sort(this.lowToHigh);
        }
    };
    DashboardComponent.prototype.lowToHigh = function (first, second) {
        if (first.priority < second.priority) {
            return -1;
        }
        else if (first.priority > second.priority) {
            return 1;
        }
        return 0;
    };
    DashboardComponent.prototype.highToLow = function (first, second) {
        if (first.priority < second.priority) {
            return 1;
        }
        else if (first.priority > second.priority) {
            return -1;
        }
        return 0;
    };
    DashboardComponent.prototype.saveTask = function (event) {
        var target;
        // Sometimes the click event will return the inner icon as the src element so
        // have to check for that case.
        if (event.srcElement.className === "section-menu-img") {
            target = event.srcElement.parentElement.parentElement.parentElement;
        }
        else {
            target = event.srcElement;
        }
        this.cachedTaskName = target.parentElement.parentElement.children[1].innerText.split("\n")[0];
    };
    DashboardComponent.prototype.getTask = function (name) {
        for (var i = 0; i < this.currentTasks.length; i++) {
            if (name === this.currentTasks[i].name) {
                return this.currentTasks[i];
            }
        }
        return null;
    };
    DashboardComponent.prototype.onComplete = function (event) {
        if (this.cachedTaskName != undefined) {
            var task = this.getTask(this.cachedTaskName);
            task.completed = true;
            task.completionDate = new Date();
        }
        this.fileService.emitChange(true);
        this.initDashboard();
    };
    DashboardComponent.prototype.onUndo = function (event) {
        if (this.cachedTaskName != undefined) {
            var task = this.getTask(this.cachedTaskName);
            task.completed = false;
            task.completionDate = null;
        }
        this.fileService.emitChange(true);
        this.initDashboard();
    };
    DashboardComponent.prototype.onDelete = function (event) {
        if (this.cachedTaskName != undefined) {
            this.removeTask(this.getTask(this.cachedTaskName));
            this.fileService.emitChange(true);
        }
    };
    DashboardComponent.prototype.onReject = function (event) {
        var _this = this;
        if (this.cachedTaskName != undefined) {
            var targetTask_1 = this.getTask(this.cachedTaskName);
            var dialogRef = this.dialog.open(_entryComponents_rejection_dialog_rejection_dialog_component__WEBPACK_IMPORTED_MODULE_6__["RejectionDialogComponent"], {
                data: { reason: "", creationDate: new Date(), assignedTask: targetTask_1 }
            });
            dialogRef.afterClosed().subscribe(function (result) {
                if (result != undefined) {
                    var rejection = { reason: result.reason, creationDate: result.creationDate };
                    targetTask_1.rejections.push(rejection);
                    _this.fileService.emitChange(true);
                }
            });
        }
    };
    DashboardComponent.prototype.onView = function (event) {
        var _this = this;
        if (this.cachedTaskName != undefined) {
            var targetTask_2 = this.getTask(this.cachedTaskName);
            // Make a copy of rejections so that changes do not take effect until subscription is hit
            var rejectionsCopy = Object.create(targetTask_2.rejections);
            var dialogRef = this.dialog.open(_entryComponents_history_log_dialog_history_log_dialog_component__WEBPACK_IMPORTED_MODULE_7__["HistoryLogDialogComponent"], {
                data: { rejections: rejectionsCopy, taskName: targetTask_2.name }
            });
            dialogRef.afterClosed().subscribe(function (result) {
                if (result != undefined) {
                    targetTask_2.rejections = result.rejections;
                    _this.fileService.emitChange(true);
                }
            });
        }
    };
    DashboardComponent.prototype.onEdit = function (event) {
        var _this = this;
        if (this.cachedTaskName != undefined) {
            var targetTask_3 = this.getTask(this.cachedTaskName);
            // Clone the task to avoid livetime modification during dialog
            var cloneTask = Object.create(targetTask_3);
            var dialogRef = this.dialog.open(_entryComponents_edit_task_dialog_edit_task_dialog_component__WEBPACK_IMPORTED_MODULE_5__["EditTaskDialogComponent"], {
                data: { fields: cloneTask, project: this.currentProject }
            });
            dialogRef.afterClosed().subscribe(function (result) {
                if (result != undefined) {
                    _this.updateTask(result, targetTask_3);
                    _this.fileService.emitChange(true);
                }
            });
        }
    };
    DashboardComponent.prototype.clearView = function () {
        this.recieveState(null);
    };
    DashboardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(/*! raw-loader!./dashboard.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/dashboard/dashboard.component.html"),
            styles: [__webpack_require__(/*! ./dashboard.component.scss */ "./src/app/components/dashboard/dashboard.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_dashboard_service__WEBPACK_IMPORTED_MODULE_3__["DashboardService"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"], src_app_services_file_service__WEBPACK_IMPORTED_MODULE_8__["FileService"]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/components/entryComponents/add-task-dialog/add-task-dialog.component.scss":
/*!*******************************************************************************************!*\
  !*** ./src/app/components/entryComponents/add-task-dialog/add-task-dialog.component.scss ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".full-width {\n  display: block;\n  width: 100%;\n  padding-bottom: 10px;\n}\n\n.half-width {\n  display: block;\n  width: 50%;\n  padding-bottom: 10px;\n}\n\n#task-form {\n  max-width: 150px;\n  min-width: 500px;\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9lbnRyeUNvbXBvbmVudHMvYWRkLXRhc2stZGlhbG9nL0M6XFxVc2Vyc1xcdHlsZXJcXERvY3VtZW50c1xcTXkgU3R1ZmZcXFBlcnNvbmFsXFxDb2RlXFxTYWZyYW5cXG1hbmFnZXItYXBwL3NyY1xcYXBwXFxjb21wb25lbnRzXFxlbnRyeUNvbXBvbmVudHNcXGFkZC10YXNrLWRpYWxvZ1xcYWRkLXRhc2stZGlhbG9nLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9jb21wb25lbnRzL2VudHJ5Q29tcG9uZW50cy9hZGQtdGFzay1kaWFsb2cvYWRkLXRhc2stZGlhbG9nLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksY0FBQTtFQUNBLFdBQUE7RUFDQSxvQkFBQTtBQ0NKOztBREVBO0VBQ0ksY0FBQTtFQUNBLFVBQUE7RUFDQSxvQkFBQTtBQ0NKOztBREVBO0VBQ0ksZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZW50cnlDb21wb25lbnRzL2FkZC10YXNrLWRpYWxvZy9hZGQtdGFzay1kaWFsb2cuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZnVsbC13aWR0aCB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgcGFkZGluZy1ib3R0b206IDEwcHg7XHJcbn1cclxuXHJcbi5oYWxmLXdpZHRoIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgd2lkdGg6IDUwJTtcclxuICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xyXG59XHJcblxyXG4jdGFzay1mb3JtIHtcclxuICAgIG1heC13aWR0aDogMTUwcHg7XHJcbiAgICBtaW4td2lkdGg6IDUwMHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn0iLCIuZnVsbC13aWR0aCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZy1ib3R0b206IDEwcHg7XG59XG5cbi5oYWxmLXdpZHRoIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiA1MCU7XG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xufVxuXG4jdGFzay1mb3JtIHtcbiAgbWF4LXdpZHRoOiAxNTBweDtcbiAgbWluLXdpZHRoOiA1MDBweDtcbiAgd2lkdGg6IDEwMCU7XG59Il19 */"

/***/ }),

/***/ "./src/app/components/entryComponents/add-task-dialog/add-task-dialog.component.ts":
/*!*****************************************************************************************!*\
  !*** ./src/app/components/entryComponents/add-task-dialog/add-task-dialog.component.ts ***!
  \*****************************************************************************************/
/*! exports provided: AddTaskDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddTaskDialogComponent", function() { return AddTaskDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");



var AddTaskDialogComponent = /** @class */ (function () {
    function AddTaskDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    AddTaskDialogComponent.prototype.ngOnInit = function () {
    };
    AddTaskDialogComponent.prototype.checkForDuplicateName = function (name) {
        var projectTasks = this.data.project.tasks;
        for (var i = 0; i < projectTasks.length; i++) {
            if (name === projectTasks[i].name) {
                return true;
            }
        }
        return false;
    };
    AddTaskDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AddTaskDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-add-task-dialog',
            template: __webpack_require__(/*! raw-loader!./add-task-dialog.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/entryComponents/add-task-dialog/add-task-dialog.component.html"),
            styles: [__webpack_require__(/*! ./add-task-dialog.component.scss */ "./src/app/components/entryComponents/add-task-dialog/add-task-dialog.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], AddTaskDialogComponent);
    return AddTaskDialogComponent;
}());



/***/ }),

/***/ "./src/app/components/entryComponents/confirmation-dialog/confirmation-dialog.component.scss":
/*!***************************************************************************************************!*\
  !*** ./src/app/components/entryComponents/confirmation-dialog/confirmation-dialog.component.scss ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".full-width {\n  display: block;\n  width: 100%;\n  padding-bottom: 10px;\n}\n\n.half-width {\n  display: block;\n  width: 50%;\n  padding-bottom: 10px;\n}\n\n#task-form {\n  max-width: 150px;\n  min-width: 500px;\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9lbnRyeUNvbXBvbmVudHMvY29uZmlybWF0aW9uLWRpYWxvZy9DOlxcVXNlcnNcXHR5bGVyXFxEb2N1bWVudHNcXE15IFN0dWZmXFxQZXJzb25hbFxcQ29kZVxcU2FmcmFuXFxtYW5hZ2VyLWFwcC9zcmNcXGFwcFxcY29tcG9uZW50c1xcZW50cnlDb21wb25lbnRzXFxjb25maXJtYXRpb24tZGlhbG9nXFxjb25maXJtYXRpb24tZGlhbG9nLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9jb21wb25lbnRzL2VudHJ5Q29tcG9uZW50cy9jb25maXJtYXRpb24tZGlhbG9nL2NvbmZpcm1hdGlvbi1kaWFsb2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxjQUFBO0VBQ0EsV0FBQTtFQUNBLG9CQUFBO0FDQ0o7O0FERUE7RUFDSSxjQUFBO0VBQ0EsVUFBQTtFQUNBLG9CQUFBO0FDQ0o7O0FERUE7RUFDSSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsV0FBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9lbnRyeUNvbXBvbmVudHMvY29uZmlybWF0aW9uLWRpYWxvZy9jb25maXJtYXRpb24tZGlhbG9nLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZ1bGwtd2lkdGgge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xyXG59XHJcblxyXG4uaGFsZi13aWR0aCB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHdpZHRoOiA1MCU7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMTBweDtcclxufVxyXG5cclxuI3Rhc2stZm9ybSB7XHJcbiAgICBtYXgtd2lkdGg6IDE1MHB4O1xyXG4gICAgbWluLXdpZHRoOiA1MDBweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59IiwiLmZ1bGwtd2lkdGgge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xufVxuXG4uaGFsZi13aWR0aCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogNTAlO1xuICBwYWRkaW5nLWJvdHRvbTogMTBweDtcbn1cblxuI3Rhc2stZm9ybSB7XG4gIG1heC13aWR0aDogMTUwcHg7XG4gIG1pbi13aWR0aDogNTAwcHg7XG4gIHdpZHRoOiAxMDAlO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/components/entryComponents/confirmation-dialog/confirmation-dialog.component.ts":
/*!*************************************************************************************************!*\
  !*** ./src/app/components/entryComponents/confirmation-dialog/confirmation-dialog.component.ts ***!
  \*************************************************************************************************/
/*! exports provided: ConfirmationDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmationDialogComponent", function() { return ConfirmationDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");



var ConfirmationDialogComponent = /** @class */ (function () {
    function ConfirmationDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ConfirmationDialogComponent.prototype.ngOnInit = function () {
    };
    ConfirmationDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    ConfirmationDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-confirmation-dialog',
            template: __webpack_require__(/*! raw-loader!./confirmation-dialog.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/entryComponents/confirmation-dialog/confirmation-dialog.component.html"),
            styles: [__webpack_require__(/*! ./confirmation-dialog.component.scss */ "./src/app/components/entryComponents/confirmation-dialog/confirmation-dialog.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], String])
    ], ConfirmationDialogComponent);
    return ConfirmationDialogComponent;
}());



/***/ }),

/***/ "./src/app/components/entryComponents/create-project-dialog/create-project-dialog.component.scss":
/*!*******************************************************************************************************!*\
  !*** ./src/app/components/entryComponents/create-project-dialog/create-project-dialog.component.scss ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".full-width {\n  display: block;\n  width: 100%;\n  padding-bottom: 10px;\n}\n\n.half-width {\n  display: block;\n  width: 50%;\n  padding-bottom: 10px;\n}\n\n#task-form {\n  max-width: 150px;\n  min-width: 500px;\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9lbnRyeUNvbXBvbmVudHMvY3JlYXRlLXByb2plY3QtZGlhbG9nL0M6XFxVc2Vyc1xcdHlsZXJcXERvY3VtZW50c1xcTXkgU3R1ZmZcXFBlcnNvbmFsXFxDb2RlXFxTYWZyYW5cXG1hbmFnZXItYXBwL3NyY1xcYXBwXFxjb21wb25lbnRzXFxlbnRyeUNvbXBvbmVudHNcXGNyZWF0ZS1wcm9qZWN0LWRpYWxvZ1xcY3JlYXRlLXByb2plY3QtZGlhbG9nLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9jb21wb25lbnRzL2VudHJ5Q29tcG9uZW50cy9jcmVhdGUtcHJvamVjdC1kaWFsb2cvY3JlYXRlLXByb2plY3QtZGlhbG9nLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksY0FBQTtFQUNBLFdBQUE7RUFDQSxvQkFBQTtBQ0NKOztBREVBO0VBQ0ksY0FBQTtFQUNBLFVBQUE7RUFDQSxvQkFBQTtBQ0NKOztBREVBO0VBQ0ksZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZW50cnlDb21wb25lbnRzL2NyZWF0ZS1wcm9qZWN0LWRpYWxvZy9jcmVhdGUtcHJvamVjdC1kaWFsb2cuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZnVsbC13aWR0aCB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgcGFkZGluZy1ib3R0b206IDEwcHg7XHJcbn1cclxuXHJcbi5oYWxmLXdpZHRoIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgd2lkdGg6IDUwJTtcclxuICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xyXG59XHJcblxyXG4jdGFzay1mb3JtIHtcclxuICAgIG1heC13aWR0aDogMTUwcHg7XHJcbiAgICBtaW4td2lkdGg6IDUwMHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn0iLCIuZnVsbC13aWR0aCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZy1ib3R0b206IDEwcHg7XG59XG5cbi5oYWxmLXdpZHRoIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiA1MCU7XG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xufVxuXG4jdGFzay1mb3JtIHtcbiAgbWF4LXdpZHRoOiAxNTBweDtcbiAgbWluLXdpZHRoOiA1MDBweDtcbiAgd2lkdGg6IDEwMCU7XG59Il19 */"

/***/ }),

/***/ "./src/app/components/entryComponents/create-project-dialog/create-project-dialog.component.ts":
/*!*****************************************************************************************************!*\
  !*** ./src/app/components/entryComponents/create-project-dialog/create-project-dialog.component.ts ***!
  \*****************************************************************************************************/
/*! exports provided: CreateProjectDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateProjectDialogComponent", function() { return CreateProjectDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");



var CreateProjectDialogComponent = /** @class */ (function () {
    function CreateProjectDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.allProjects = data.allProjects;
    }
    CreateProjectDialogComponent.prototype.ngOnInit = function () {
    };
    CreateProjectDialogComponent.prototype.checkForDuplicateName = function (name) {
        for (var i = 0; i < this.allProjects.length; i++) {
            if (name === this.allProjects[i].name) {
                return true;
            }
        }
        return false;
    };
    CreateProjectDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    CreateProjectDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-create-project-dialog',
            template: __webpack_require__(/*! raw-loader!./create-project-dialog.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/entryComponents/create-project-dialog/create-project-dialog.component.html"),
            styles: [__webpack_require__(/*! ./create-project-dialog.component.scss */ "./src/app/components/entryComponents/create-project-dialog/create-project-dialog.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], CreateProjectDialogComponent);
    return CreateProjectDialogComponent;
}());



/***/ }),

/***/ "./src/app/components/entryComponents/edit-task-dialog/edit-task-dialog.component.scss":
/*!*********************************************************************************************!*\
  !*** ./src/app/components/entryComponents/edit-task-dialog/edit-task-dialog.component.scss ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".full-width {\n  display: block;\n  width: 100%;\n  padding-bottom: 10px;\n}\n\n.half-width {\n  display: block;\n  width: 50%;\n  padding-bottom: 10px;\n}\n\n#task-form {\n  max-width: 150px;\n  min-width: 500px;\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9lbnRyeUNvbXBvbmVudHMvZWRpdC10YXNrLWRpYWxvZy9DOlxcVXNlcnNcXHR5bGVyXFxEb2N1bWVudHNcXE15IFN0dWZmXFxQZXJzb25hbFxcQ29kZVxcU2FmcmFuXFxtYW5hZ2VyLWFwcC9zcmNcXGFwcFxcY29tcG9uZW50c1xcZW50cnlDb21wb25lbnRzXFxlZGl0LXRhc2stZGlhbG9nXFxlZGl0LXRhc2stZGlhbG9nLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9jb21wb25lbnRzL2VudHJ5Q29tcG9uZW50cy9lZGl0LXRhc2stZGlhbG9nL2VkaXQtdGFzay1kaWFsb2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxjQUFBO0VBQ0EsV0FBQTtFQUNBLG9CQUFBO0FDQ0o7O0FERUE7RUFDSSxjQUFBO0VBQ0EsVUFBQTtFQUNBLG9CQUFBO0FDQ0o7O0FERUE7RUFDSSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsV0FBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9lbnRyeUNvbXBvbmVudHMvZWRpdC10YXNrLWRpYWxvZy9lZGl0LXRhc2stZGlhbG9nLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZ1bGwtd2lkdGgge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xyXG59XHJcblxyXG4uaGFsZi13aWR0aCB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHdpZHRoOiA1MCU7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMTBweDtcclxufVxyXG5cclxuI3Rhc2stZm9ybSB7XHJcbiAgICBtYXgtd2lkdGg6IDE1MHB4O1xyXG4gICAgbWluLXdpZHRoOiA1MDBweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59IiwiLmZ1bGwtd2lkdGgge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xufVxuXG4uaGFsZi13aWR0aCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogNTAlO1xuICBwYWRkaW5nLWJvdHRvbTogMTBweDtcbn1cblxuI3Rhc2stZm9ybSB7XG4gIG1heC13aWR0aDogMTUwcHg7XG4gIG1pbi13aWR0aDogNTAwcHg7XG4gIHdpZHRoOiAxMDAlO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/components/entryComponents/edit-task-dialog/edit-task-dialog.component.ts":
/*!*******************************************************************************************!*\
  !*** ./src/app/components/entryComponents/edit-task-dialog/edit-task-dialog.component.ts ***!
  \*******************************************************************************************/
/*! exports provided: EditTaskDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditTaskDialogComponent", function() { return EditTaskDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");



var EditTaskDialogComponent = /** @class */ (function () {
    function EditTaskDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.originalName = data.fields.name;
    }
    EditTaskDialogComponent.prototype.ngOnInit = function () {
    };
    EditTaskDialogComponent.prototype.checkForDuplicateName = function (name) {
        // Check so that it doesn't throw error for same name
        if (name === this.originalName) {
            return false;
        }
        var projectTasks = this.data.project.tasks;
        for (var i = 0; i < projectTasks.length; i++) {
            if (name === projectTasks[i].name) {
                return true;
            }
        }
        return false;
    };
    EditTaskDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    EditTaskDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-edit-task-dialog',
            template: __webpack_require__(/*! raw-loader!./edit-task-dialog.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/entryComponents/edit-task-dialog/edit-task-dialog.component.html"),
            styles: [__webpack_require__(/*! ./edit-task-dialog.component.scss */ "./src/app/components/entryComponents/edit-task-dialog/edit-task-dialog.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], EditTaskDialogComponent);
    return EditTaskDialogComponent;
}());



/***/ }),

/***/ "./src/app/components/entryComponents/graph-dialog/graph-dialog.component.scss":
/*!*************************************************************************************!*\
  !*** ./src/app/components/entryComponents/graph-dialog/graph-dialog.component.scss ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZW50cnlDb21wb25lbnRzL2dyYXBoLWRpYWxvZy9ncmFwaC1kaWFsb2cuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/components/entryComponents/graph-dialog/graph-dialog.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/components/entryComponents/graph-dialog/graph-dialog.component.ts ***!
  \***********************************************************************************/
/*! exports provided: GraphDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphDialogComponent", function() { return GraphDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _models_Project__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../models/Project */ "./src/app/models/Project.ts");




var GraphDialogComponent = /** @class */ (function () {
    function GraphDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.dataFormat = "json";
        this.type = "mscombi2d";
        this.width = 800;
        this.height = 600;
        this.validYears = [];
        this.rejectionDict = { "Jan": 0, "Feb": 0, "Mar": 0, "Apr": 0, "May": 0, "Jun": 0, "Jul": 0, "Aug": 0, "Sep": 0, "Oct": 0, "Nov": 0, "Dec": 0 };
        this.completionDict = { "Jan": 0, "Feb": 0, "Mar": 0, "Apr": 0, "May": 0, "Jun": 0, "Jul": 0, "Aug": 0, "Sep": 0, "Oct": 0, "Nov": 0, "Dec": 0 };
    }
    GraphDialogComponent.prototype.ngOnInit = function () {
        this.initValidYears();
        if (this.validYears.length != 0) {
            this.prepareData(this.validYears[0]);
        }
        this.initChart(this.validYears[0]);
    };
    GraphDialogComponent.prototype.initValidYears = function () {
        var e_1, _a, e_2, _b;
        var taskList = this.data.tasks;
        try {
            for (var taskList_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](taskList), taskList_1_1 = taskList_1.next(); !taskList_1_1.done; taskList_1_1 = taskList_1.next()) {
                var task = taskList_1_1.value;
                if (task.completionDate !== null) {
                    this.appendYearIfMissing(task.completionDate.getFullYear());
                }
                try {
                    for (var _c = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](task.rejections), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var rejection = _d.value;
                        this.appendYearIfMissing(rejection.creationDate.getFullYear());
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (taskList_1_1 && !taskList_1_1.done && (_a = taskList_1.return)) _a.call(taskList_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    GraphDialogComponent.prototype.prepareData = function (targetYear) {
        this.clearData();
        this.currentYear = targetYear;
        var taskList = this.data.tasks;
        for (var i = 0; i < taskList.length; i++) {
            this.addRejectionsForTask(taskList[i].rejections, targetYear);
            this.addCompletionForTask(taskList[i].completionDate, targetYear);
        }
    };
    GraphDialogComponent.prototype.clearData = function () {
        this.rejectionDict = { "Jan": 0, "Feb": 0, "Mar": 0, "Apr": 0, "May": 0, "Jun": 0, "Jul": 0, "Aug": 0, "Sep": 0, "Oct": 0, "Nov": 0, "Dec": 0 };
        this.completionDict = { "Jan": 0, "Feb": 0, "Mar": 0, "Apr": 0, "May": 0, "Jun": 0, "Jul": 0, "Aug": 0, "Sep": 0, "Oct": 0, "Nov": 0, "Dec": 0 };
    };
    GraphDialogComponent.prototype.addRejectionsForTask = function (rejectionsList, targetYear) {
        for (var i = 0; i < rejectionsList.length; i++) {
            this.addRejectionData(rejectionsList[i], targetYear);
        }
    };
    GraphDialogComponent.prototype.addRejectionData = function (rejection, targetYear) {
        if (rejection.creationDate.getFullYear() !== targetYear) {
            return;
        }
        var monthKeys = Object.keys(this.rejectionDict);
        var targetMonth = monthKeys[rejection.creationDate.getMonth()];
        this.rejectionDict[targetMonth]++;
    };
    GraphDialogComponent.prototype.addCompletionForTask = function (completionDate, targetYear) {
        if (completionDate === null || completionDate.getFullYear() !== targetYear) {
            return;
        }
        var monthKeys = Object.keys(this.completionDict);
        var targetMonth = monthKeys[completionDate.getMonth()];
        this.completionDict[targetMonth]++;
    };
    GraphDialogComponent.prototype.appendYearIfMissing = function (targetYear) {
        var e_3, _a;
        try {
            for (var _b = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](this.validYears), _c = _b.next(); !_c.done; _c = _b.next()) {
                var year = _c.value;
                if (year === targetYear) {
                    return;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        this.validYears.push(targetYear);
    };
    GraphDialogComponent.prototype.onSelectionChange = function (year) {
        this.prepareData(year);
        this.initChart(year);
    };
    GraphDialogComponent.prototype.initChart = function (year) {
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
    };
    GraphDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    GraphDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-graph-dialog',
            template: __webpack_require__(/*! raw-loader!./graph-dialog.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/entryComponents/graph-dialog/graph-dialog.component.html"),
            styles: [__webpack_require__(/*! ./graph-dialog.component.scss */ "./src/app/components/entryComponents/graph-dialog/graph-dialog.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"],
            _models_Project__WEBPACK_IMPORTED_MODULE_3__["Project"]])
    ], GraphDialogComponent);
    return GraphDialogComponent;
}());



/***/ }),

/***/ "./src/app/components/entryComponents/history-log-dialog/history-log-dialog.component.scss":
/*!*************************************************************************************************!*\
  !*** ./src/app/components/entryComponents/history-log-dialog/history-log-dialog.component.scss ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".full-width {\n  display: block;\n  width: 100%;\n  padding-bottom: 10px;\n}\n\n.half-width {\n  display: block;\n  width: 50%;\n  padding-bottom: 10px;\n}\n\n.rejection-card {\n  background-color: #fafafa;\n  padding: 10px;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n\n.card-content {\n  font-size: 18px;\n}\n\n.card-title {\n  display: inline-block;\n  font-size: 25px;\n  font-weight: bold;\n}\n\n.drag-card {\n  margin-top: 15px;\n  margin-bottom: 15px;\n}\n\n.trash-icon {\n  display: inline-block;\n  font-size: 20px;\n  cursor: pointer;\n}\n\n#scroll-container {\n  min-width: 800px;\n  width: 100%;\n  overflow-y: auto;\n  background-color: #eeeeee;\n  padding: 20px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9lbnRyeUNvbXBvbmVudHMvaGlzdG9yeS1sb2ctZGlhbG9nL0M6XFxVc2Vyc1xcdHlsZXJcXERvY3VtZW50c1xcTXkgU3R1ZmZcXFBlcnNvbmFsXFxDb2RlXFxTYWZyYW5cXG1hbmFnZXItYXBwL3NyY1xcYXBwXFxjb21wb25lbnRzXFxlbnRyeUNvbXBvbmVudHNcXGhpc3RvcnktbG9nLWRpYWxvZ1xcaGlzdG9yeS1sb2ctZGlhbG9nLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9jb21wb25lbnRzL2VudHJ5Q29tcG9uZW50cy9oaXN0b3J5LWxvZy1kaWFsb2cvaGlzdG9yeS1sb2ctZGlhbG9nLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksY0FBQTtFQUNBLFdBQUE7RUFDQSxvQkFBQTtBQ0NKOztBREVBO0VBQ0ksY0FBQTtFQUNBLFVBQUE7RUFDQSxvQkFBQTtBQ0NKOztBREVBO0VBQ0kseUJBQUE7RUFDQSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBQ0NKOztBREVBO0VBQ0ksZUFBQTtBQ0NKOztBREdBO0VBQ0kscUJBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUNBSjs7QURHQTtFQUVJLGdCQUFBO0VBQ0EsbUJBQUE7QUNESjs7QURJQTtFQUNJLHFCQUFBO0VBQ0EsZUFBQTtFQUVBLGVBQUE7QUNGSjs7QURLQTtFQUVJLGdCQUFBO0VBQ0EsV0FBQTtFQUNBLGdCQUFBO0VBRUEseUJBQUE7RUFDQSxhQUFBO0FDSkoiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL2VudHJ5Q29tcG9uZW50cy9oaXN0b3J5LWxvZy1kaWFsb2cvaGlzdG9yeS1sb2ctZGlhbG9nLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZ1bGwtd2lkdGgge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xyXG59XHJcblxyXG4uaGFsZi13aWR0aCB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHdpZHRoOiA1MCU7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMTBweDtcclxufVxyXG5cclxuLnJlamVjdGlvbi1jYXJkIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTAsMjUwLDI1MCk7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgbWFyZ2luLXRvcDogMTBweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbn1cclxuXHJcbi5jYXJkLWNvbnRlbnQge1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgLy8gZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuXHJcbi5jYXJkLXRpdGxlIHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIGZvbnQtc2l6ZTogMjVweDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcblxyXG4uZHJhZy1jYXJkIHtcclxuICAgIC8vIGN1cnNvcjogbW92ZTtcclxuICAgIG1hcmdpbi10b3A6IDE1cHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxNXB4O1xyXG59XHJcblxyXG4udHJhc2gtaWNvbiB7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICAvLyBmbG9hdDogcmlnaHQ7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbiNzY3JvbGwtY29udGFpbmVye1xyXG4gICAgLy8gbWF4LXdpZHRoOiAxNTBweDtcclxuICAgIG1pbi13aWR0aDogODAwcHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIG92ZXJmbG93LXk6IGF1dG87XHJcbiAgICAvLyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjUwLDI1MCwyNTApO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIzOCwyMzgsMjM4KTtcclxuICAgIHBhZGRpbmc6IDIwcHg7XHJcbn0iLCIuZnVsbC13aWR0aCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZy1ib3R0b206IDEwcHg7XG59XG5cbi5oYWxmLXdpZHRoIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiA1MCU7XG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xufVxuXG4ucmVqZWN0aW9uLWNhcmQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmYWZhO1xuICBwYWRkaW5nOiAxMHB4O1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuXG4uY2FyZC1jb250ZW50IHtcbiAgZm9udC1zaXplOiAxOHB4O1xufVxuXG4uY2FyZC10aXRsZSB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgZm9udC1zaXplOiAyNXB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmRyYWctY2FyZCB7XG4gIG1hcmdpbi10b3A6IDE1cHg7XG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XG59XG5cbi50cmFzaC1pY29uIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBmb250LXNpemU6IDIwcHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuI3Njcm9sbC1jb250YWluZXIge1xuICBtaW4td2lkdGg6IDgwMHB4O1xuICB3aWR0aDogMTAwJTtcbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZWVlZTtcbiAgcGFkZGluZzogMjBweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/components/entryComponents/history-log-dialog/history-log-dialog.component.ts":
/*!***********************************************************************************************!*\
  !*** ./src/app/components/entryComponents/history-log-dialog/history-log-dialog.component.ts ***!
  \***********************************************************************************************/
/*! exports provided: HistoryLogDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HistoryLogDialogComponent", function() { return HistoryLogDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");



var HistoryLogDialogComponent = /** @class */ (function () {
    function HistoryLogDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    HistoryLogDialogComponent.prototype.ngOnInit = function () {
    };
    // TODO: Finish this function
    HistoryLogDialogComponent.prototype.onTrashClick = function (event) {
        // console.log(this.getIndexOfCard(event));
        this.data.rejections.splice(this.getIndexOfCard(event), 1);
    };
    HistoryLogDialogComponent.prototype.getIndexOfCard = function (event) {
        var siblingChainCount = 0;
        // -1 to account for 0 index scale
        var rejectionsLength = this.data.rejections.length - 1;
        var currentCard = event.srcElement.parentElement.parentElement;
        while (currentCard.nextSibling !== null) {
            currentCard = currentCard.nextSibling;
            siblingChainCount++;
        }
        return rejectionsLength - siblingChainCount;
    };
    HistoryLogDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    HistoryLogDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-history-log-dialog',
            template: __webpack_require__(/*! raw-loader!./history-log-dialog.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/entryComponents/history-log-dialog/history-log-dialog.component.html"),
            styles: [__webpack_require__(/*! ./history-log-dialog.component.scss */ "./src/app/components/entryComponents/history-log-dialog/history-log-dialog.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], HistoryLogDialogComponent);
    return HistoryLogDialogComponent;
}());



/***/ }),

/***/ "./src/app/components/entryComponents/manage-project-dialog/manage-project-dialog.component.scss":
/*!*******************************************************************************************************!*\
  !*** ./src/app/components/entryComponents/manage-project-dialog/manage-project-dialog.component.scss ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".full-width {\n  display: block;\n  width: 100%;\n  padding-bottom: 10px;\n}\n\n.half-width {\n  display: block;\n  width: 50%;\n  padding-bottom: 10px;\n}\n\n#task-form {\n  max-width: 150px;\n  min-width: 500px;\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9lbnRyeUNvbXBvbmVudHMvbWFuYWdlLXByb2plY3QtZGlhbG9nL0M6XFxVc2Vyc1xcdHlsZXJcXERvY3VtZW50c1xcTXkgU3R1ZmZcXFBlcnNvbmFsXFxDb2RlXFxTYWZyYW5cXG1hbmFnZXItYXBwL3NyY1xcYXBwXFxjb21wb25lbnRzXFxlbnRyeUNvbXBvbmVudHNcXG1hbmFnZS1wcm9qZWN0LWRpYWxvZ1xcbWFuYWdlLXByb2plY3QtZGlhbG9nLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9jb21wb25lbnRzL2VudHJ5Q29tcG9uZW50cy9tYW5hZ2UtcHJvamVjdC1kaWFsb2cvbWFuYWdlLXByb2plY3QtZGlhbG9nLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksY0FBQTtFQUNBLFdBQUE7RUFDQSxvQkFBQTtBQ0NKOztBREVBO0VBQ0ksY0FBQTtFQUNBLFVBQUE7RUFDQSxvQkFBQTtBQ0NKOztBREVBO0VBQ0ksZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZW50cnlDb21wb25lbnRzL21hbmFnZS1wcm9qZWN0LWRpYWxvZy9tYW5hZ2UtcHJvamVjdC1kaWFsb2cuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZnVsbC13aWR0aCB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgcGFkZGluZy1ib3R0b206IDEwcHg7XHJcbn1cclxuXHJcbi5oYWxmLXdpZHRoIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgd2lkdGg6IDUwJTtcclxuICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xyXG59XHJcblxyXG4jdGFzay1mb3JtIHtcclxuICAgIG1heC13aWR0aDogMTUwcHg7XHJcbiAgICBtaW4td2lkdGg6IDUwMHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn0iLCIuZnVsbC13aWR0aCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZy1ib3R0b206IDEwcHg7XG59XG5cbi5oYWxmLXdpZHRoIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiA1MCU7XG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xufVxuXG4jdGFzay1mb3JtIHtcbiAgbWF4LXdpZHRoOiAxNTBweDtcbiAgbWluLXdpZHRoOiA1MDBweDtcbiAgd2lkdGg6IDEwMCU7XG59Il19 */"

/***/ }),

/***/ "./src/app/components/entryComponents/manage-project-dialog/manage-project-dialog.component.ts":
/*!*****************************************************************************************************!*\
  !*** ./src/app/components/entryComponents/manage-project-dialog/manage-project-dialog.component.ts ***!
  \*****************************************************************************************************/
/*! exports provided: ManageProjectDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageProjectDialogComponent", function() { return ManageProjectDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _confirmation_dialog_confirmation_dialog_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../confirmation-dialog/confirmation-dialog.component */ "./src/app/components/entryComponents/confirmation-dialog/confirmation-dialog.component.ts");




var ManageProjectDialogComponent = /** @class */ (function () {
    function ManageProjectDialogComponent(dialogRef, dialog, data) {
        this.dialogRef = dialogRef;
        this.dialog = dialog;
        this.data = data;
        this.allProjects = data.allProjects;
        this.originalName = data.fields.name;
    }
    ManageProjectDialogComponent.prototype.ngOnInit = function () {
    };
    ManageProjectDialogComponent.prototype.checkForDuplicateName = function (name) {
        if (this.originalName === name) {
            return false;
        }
        for (var i = 0; i < this.allProjects.length; i++) {
            if (name === this.allProjects[i].name) {
                return true;
            }
        }
        return false;
    };
    ManageProjectDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    ManageProjectDialogComponent.prototype.onDeleteClick = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_confirmation_dialog_confirmation_dialog_component__WEBPACK_IMPORTED_MODULE_3__["ConfirmationDialogComponent"], {
            data: this.originalName
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result != undefined) {
                // Closes the dialog and sends the delete result to signal a delete event  
                _this.dialogRef.close("Delete");
            }
        });
    };
    ManageProjectDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-manage-project-dialog',
            template: __webpack_require__(/*! raw-loader!./manage-project-dialog.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/entryComponents/manage-project-dialog/manage-project-dialog.component.html"),
            styles: [__webpack_require__(/*! ./manage-project-dialog.component.scss */ "./src/app/components/entryComponents/manage-project-dialog/manage-project-dialog.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"], Object])
    ], ManageProjectDialogComponent);
    return ManageProjectDialogComponent;
}());



/***/ }),

/***/ "./src/app/components/entryComponents/rejection-dialog/rejection-dialog.component.scss":
/*!*********************************************************************************************!*\
  !*** ./src/app/components/entryComponents/rejection-dialog/rejection-dialog.component.scss ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".full-width {\n  display: block;\n  width: 100%;\n  padding-bottom: 10px;\n}\n\n.half-width {\n  display: block;\n  width: 50%;\n  padding-bottom: 10px;\n}\n\n#task-form {\n  max-width: 150px;\n  min-width: 500px;\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9lbnRyeUNvbXBvbmVudHMvcmVqZWN0aW9uLWRpYWxvZy9DOlxcVXNlcnNcXHR5bGVyXFxEb2N1bWVudHNcXE15IFN0dWZmXFxQZXJzb25hbFxcQ29kZVxcU2FmcmFuXFxtYW5hZ2VyLWFwcC9zcmNcXGFwcFxcY29tcG9uZW50c1xcZW50cnlDb21wb25lbnRzXFxyZWplY3Rpb24tZGlhbG9nXFxyZWplY3Rpb24tZGlhbG9nLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9jb21wb25lbnRzL2VudHJ5Q29tcG9uZW50cy9yZWplY3Rpb24tZGlhbG9nL3JlamVjdGlvbi1kaWFsb2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxjQUFBO0VBQ0EsV0FBQTtFQUNBLG9CQUFBO0FDQ0o7O0FERUE7RUFDSSxjQUFBO0VBQ0EsVUFBQTtFQUNBLG9CQUFBO0FDQ0o7O0FERUE7RUFDSSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsV0FBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9lbnRyeUNvbXBvbmVudHMvcmVqZWN0aW9uLWRpYWxvZy9yZWplY3Rpb24tZGlhbG9nLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZ1bGwtd2lkdGgge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xyXG59XHJcblxyXG4uaGFsZi13aWR0aCB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHdpZHRoOiA1MCU7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMTBweDtcclxufVxyXG5cclxuI3Rhc2stZm9ybSB7XHJcbiAgICBtYXgtd2lkdGg6IDE1MHB4O1xyXG4gICAgbWluLXdpZHRoOiA1MDBweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59IiwiLmZ1bGwtd2lkdGgge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xufVxuXG4uaGFsZi13aWR0aCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogNTAlO1xuICBwYWRkaW5nLWJvdHRvbTogMTBweDtcbn1cblxuI3Rhc2stZm9ybSB7XG4gIG1heC13aWR0aDogMTUwcHg7XG4gIG1pbi13aWR0aDogNTAwcHg7XG4gIHdpZHRoOiAxMDAlO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/components/entryComponents/rejection-dialog/rejection-dialog.component.ts":
/*!*******************************************************************************************!*\
  !*** ./src/app/components/entryComponents/rejection-dialog/rejection-dialog.component.ts ***!
  \*******************************************************************************************/
/*! exports provided: RejectionDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RejectionDialogComponent", function() { return RejectionDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _models_Rejection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../models/Rejection */ "./src/app/models/Rejection.ts");




var RejectionDialogComponent = /** @class */ (function () {
    function RejectionDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    RejectionDialogComponent.prototype.ngOnInit = function () {
    };
    RejectionDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    RejectionDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-rejection-dialog',
            template: __webpack_require__(/*! raw-loader!./rejection-dialog.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/entryComponents/rejection-dialog/rejection-dialog.component.html"),
            styles: [__webpack_require__(/*! ./rejection-dialog.component.scss */ "./src/app/components/entryComponents/rejection-dialog/rejection-dialog.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"],
            _models_Rejection__WEBPACK_IMPORTED_MODULE_3__["Rejection"]])
    ], RejectionDialogComponent);
    return RejectionDialogComponent;
}());



/***/ }),

/***/ "./src/app/components/header/header.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/components/header/header.component.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".nav-link {\n  color: white !important;\n  font-weight: bold;\n}\n\n.btn {\n  color: gray;\n}\n\n#project-name {\n  font-size: 1.5em;\n  font-weight: bold;\n  color: white;\n}\n\n#header {\n  background-image: linear-gradient(to right, #2E92C8, #4CACDB);\n  outline: 1px solid lightgray;\n  padding-left: 0px;\n  padding-top: 0px;\n  padding-bottom: 0px;\n  height: 3em;\n  width: 100%;\n  height: 100%;\n}\n\n#header-nav {\n  height: 100%;\n}\n\n#search {\n  width: 300px;\n  background: transparent;\n  border: none;\n  color: white;\n  outline: none;\n  display: inline-block;\n}\n\n#search-icon {\n  color: white;\n}\n\n#search::-webkit-input-placeholder {\n  color: white;\n}\n\n#search::-moz-placeholder {\n  color: white;\n}\n\n#search::-ms-input-placeholder {\n  color: white;\n}\n\n#search::placeholder {\n  color: white;\n}\n\n#search:focus {\n  outline: none;\n}\n\n#search-form {\n  margin-left: 5em;\n}\n\n#profile-name {\n  color: white;\n  letter-spacing: 1px;\n  font-weight: 600;\n}\n\n#profile-img {\n  height: 50px;\n  width: 50px;\n  -o-object-fit: cover;\n     object-fit: cover;\n  border-radius: 50%;\n}\n\n#header-dropdown {\n  border-width: 0px 1px 0px 0px;\n  border-style: solid;\n  color: white;\n  padding-left: 4em;\n  padding-right: 4em;\n  height: 100%;\n}\n\n#safran-logo-img {\n  max-height: 100%;\n  max-width: 100%;\n}\n\n#safran-brand {\n  height: 100%;\n  padding-left: 10px;\n  padding-right: 10px;\n  margin: 0;\n  background-color: white;\n  border-right: 1px solid lightgray;\n}\n\n#new-task-btn {\n  font-weight: bold !important;\n  height: 75%;\n}\n\n#plus-icon {\n  max-height: 25px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9oZWFkZXIvQzpcXFVzZXJzXFx0eWxlclxcRG9jdW1lbnRzXFxNeSBTdHVmZlxcUGVyc29uYWxcXENvZGVcXFNhZnJhblxcbWFuYWdlci1hcHAvc3JjXFxhcHBcXGNvbXBvbmVudHNcXGhlYWRlclxcaGVhZGVyLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9jb21wb25lbnRzL2hlYWRlci9oZWFkZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSx1QkFBQTtFQUNBLGlCQUFBO0FDQ0o7O0FERUE7RUFDSSxXQUFBO0FDQ0o7O0FETUE7RUFDSSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtBQ0hKOztBRE1BO0VBRUksNkRBQUE7RUFDQSw0QkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQ0pKOztBRE9BO0VBQ0ksWUFBQTtBQ0pKOztBRE9BO0VBQ0ksWUFBQTtFQUNBLHVCQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EscUJBQUE7QUNKSjs7QURPQTtFQUNJLFlBQUE7QUNKSjs7QURPQTtFQUNJLFlBQUE7QUNKSjs7QURHQTtFQUNJLFlBQUE7QUNKSjs7QURHQTtFQUNJLFlBQUE7QUNKSjs7QURHQTtFQUNJLFlBQUE7QUNKSjs7QURPQTtFQUNJLGFBQUE7QUNKSjs7QURPQTtFQUNJLGdCQUFBO0FDSko7O0FET0E7RUFDSSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtBQ0pKOztBRE9BO0VBQ0ksWUFBQTtFQUNBLFdBQUE7RUFDQSxvQkFBQTtLQUFBLGlCQUFBO0VBQ0Esa0JBQUE7QUNKSjs7QURPQTtFQUNJLDZCQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7QUNKSjs7QURPQTtFQUNJLGdCQUFBO0VBQ0EsZUFBQTtBQ0pKOztBRE9BO0VBQ0ksWUFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0EsdUJBQUE7RUFDQSxpQ0FBQTtBQ0pKOztBRE9BO0VBQ0ksNEJBQUE7RUFDQSxXQUFBO0FDSko7O0FET0E7RUFDSSxnQkFBQTtBQ0pKIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm5hdi1saW5rIHtcclxuICAgIGNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7ICAgIFxyXG59XHJcblxyXG4uYnRuIHtcclxuICAgIGNvbG9yOiBncmF5O1xyXG59XHJcblxyXG4vLyAjcHJvamVjdC1uYW1lLWNvbnRhaW5lciB7XHJcbi8vICAgICBtYXJnaW4tbGVmdDogMjB2dztcclxuLy8gfVxyXG5cclxuI3Byb2plY3QtbmFtZSB7XHJcbiAgICBmb250LXNpemU6IDEuNWVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbn1cclxuXHJcbiNoZWFkZXIge1xyXG4gICAgLy8gYmFja2dyb3VuZC1jb2xvcjogIzRDQUNEQiAhaW1wb3J0YW50O1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAjMkU5MkM4LCAjNENBQ0RCKTtcclxuICAgIG91dGxpbmU6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDBweDtcclxuICAgIHBhZGRpbmctdG9wOiAwcHg7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMHB4O1xyXG4gICAgaGVpZ2h0OiAzZW07XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMTAwJTtcclxufVxyXG5cclxuI2hlYWRlci1uYXYge1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcblxyXG4jc2VhcmNoIHtcclxuICAgIHdpZHRoOiAzMDBweDtcclxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgb3V0bGluZTogbm9uZTtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxufVxyXG5cclxuI3NlYXJjaC1pY29uIHtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuI3NlYXJjaDo6cGxhY2Vob2xkZXIge1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG4jc2VhcmNoOmZvY3VzIHtcclxuICAgIG91dGxpbmU6IG5vbmU7XHJcbn1cclxuXHJcbiNzZWFyY2gtZm9ybSB7XHJcbiAgICBtYXJnaW4tbGVmdDogNWVtO1xyXG59XHJcblxyXG4jcHJvZmlsZS1uYW1lIHtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGxldHRlci1zcGFjaW5nOiAxcHg7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG59XHJcblxyXG4jcHJvZmlsZS1pbWcge1xyXG4gICAgaGVpZ2h0OiA1MHB4O1xyXG4gICAgd2lkdGg6IDUwcHg7XHJcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxufVxyXG5cclxuI2hlYWRlci1kcm9wZG93biB7XHJcbiAgICBib3JkZXItd2lkdGg6IDBweCAxcHggMHB4IDBweDtcclxuICAgIGJvcmRlci1zdHlsZTogc29saWQ7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDRlbTtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDRlbTtcclxuICAgIGhlaWdodDogMTAwJTtcclxufVxyXG5cclxuI3NhZnJhbi1sb2dvLWltZyB7XHJcbiAgICBtYXgtaGVpZ2h0OiAxMDAlO1xyXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4jc2FmcmFuLWJyYW5kIHtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIHBhZGRpbmctbGVmdDogMTBweDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDEwcHg7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcclxufVxyXG5cclxuI25ldy10YXNrLWJ0biB7XHJcbiAgICBmb250LXdlaWdodDogYm9sZCAhaW1wb3J0YW50OyBcclxuICAgIGhlaWdodDogNzUlO1xyXG59XHJcblxyXG4jcGx1cy1pY29uIHtcclxuICAgIG1heC1oZWlnaHQ6IDI1cHg7XHJcbn0iLCIubmF2LWxpbmsge1xuICBjb2xvcjogd2hpdGUgIWltcG9ydGFudDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5idG4ge1xuICBjb2xvcjogZ3JheTtcbn1cblxuI3Byb2plY3QtbmFtZSB7XG4gIGZvbnQtc2l6ZTogMS41ZW07XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBjb2xvcjogd2hpdGU7XG59XG5cbiNoZWFkZXIge1xuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICMyRTkyQzgsICM0Q0FDREIpO1xuICBvdXRsaW5lOiAxcHggc29saWQgbGlnaHRncmF5O1xuICBwYWRkaW5nLWxlZnQ6IDBweDtcbiAgcGFkZGluZy10b3A6IDBweDtcbiAgcGFkZGluZy1ib3R0b206IDBweDtcbiAgaGVpZ2h0OiAzZW07XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbiNoZWFkZXItbmF2IHtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4jc2VhcmNoIHtcbiAgd2lkdGg6IDMwMHB4O1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiBub25lO1xuICBjb2xvcjogd2hpdGU7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cblxuI3NlYXJjaC1pY29uIHtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4jc2VhcmNoOjpwbGFjZWhvbGRlciB7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuI3NlYXJjaDpmb2N1cyB7XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cbiNzZWFyY2gtZm9ybSB7XG4gIG1hcmdpbi1sZWZ0OiA1ZW07XG59XG5cbiNwcm9maWxlLW5hbWUge1xuICBjb2xvcjogd2hpdGU7XG4gIGxldHRlci1zcGFjaW5nOiAxcHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbiNwcm9maWxlLWltZyB7XG4gIGhlaWdodDogNTBweDtcbiAgd2lkdGg6IDUwcHg7XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG59XG5cbiNoZWFkZXItZHJvcGRvd24ge1xuICBib3JkZXItd2lkdGg6IDBweCAxcHggMHB4IDBweDtcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgY29sb3I6IHdoaXRlO1xuICBwYWRkaW5nLWxlZnQ6IDRlbTtcbiAgcGFkZGluZy1yaWdodDogNGVtO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbiNzYWZyYW4tbG9nby1pbWcge1xuICBtYXgtaGVpZ2h0OiAxMDAlO1xuICBtYXgtd2lkdGg6IDEwMCU7XG59XG5cbiNzYWZyYW4tYnJhbmQge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHBhZGRpbmctbGVmdDogMTBweDtcbiAgcGFkZGluZy1yaWdodDogMTBweDtcbiAgbWFyZ2luOiAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgbGlnaHRncmF5O1xufVxuXG4jbmV3LXRhc2stYnRuIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQgIWltcG9ydGFudDtcbiAgaGVpZ2h0OiA3NSU7XG59XG5cbiNwbHVzLWljb24ge1xuICBtYXgtaGVpZ2h0OiAyNXB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/components/header/header.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/header/header.component.ts ***!
  \*******************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], HeaderComponent.prototype, "projectName", void 0);
    HeaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(/*! raw-loader!./header.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/header/header.component.html"),
            styles: [__webpack_require__(/*! ./header.component.scss */ "./src/app/components/header/header.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/components/list/list.component.scss":
/*!*****************************************************!*\
  !*** ./src/app/components/list/list.component.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".fill-container {\n  height: 100%;\n  width: 100%;\n  padding: 0;\n  margin: 0;\n}\n\n.mat-cell {\n  font-size: 16px;\n}\n\n.mat-header-cell {\n  font-size: 16px;\n  color: white;\n  background-color: #4CACDB;\n  letter-spacing: 1px;\n}\n\n.priority-header {\n  display: inline-block;\n  padding: 1em;\n  height: 20px;\n  width: 10em;\n  color: white;\n  font-weight: bold;\n  margin-top: 10px;\n  text-align: center;\n}\n\n.priority-text {\n  display: block;\n  position: relative;\n  bottom: 10px;\n}\n\n.low-priority {\n  background-color: limegreen;\n}\n\n.med-priority {\n  background-color: darkorange;\n}\n\n.high-priority {\n  background-color: red;\n}\n\n.centered {\n  text-align: center;\n}\n\n.description {\n  width: 400px;\n  overflow-wrap: break-word;\n}\n\n#main-content-container {\n  background-color: #eeeeee;\n  width: 100%;\n  height: 100%;\n}\n\n#table-container {\n  overflow-y: scroll;\n  max-height: 70vh;\n  width: 90%;\n}\n\n#data-table {\n  width: 100%;\n}\n\n#name-cell {\n  font-weight: 700;\n  overflow-wrap: break-word;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9saXN0L0M6XFxVc2Vyc1xcdHlsZXJcXERvY3VtZW50c1xcTXkgU3R1ZmZcXFBlcnNvbmFsXFxDb2RlXFxTYWZyYW5cXG1hbmFnZXItYXBwL3NyY1xcYXBwXFxjb21wb25lbnRzXFxsaXN0XFxsaXN0LmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9jb21wb25lbnRzL2xpc3QvbGlzdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFlBQUE7RUFDQSxXQUFBO0VBQ0EsVUFBQTtFQUNBLFNBQUE7QUNDSjs7QURFQTtFQUNJLGVBQUE7QUNDSjs7QURFQTtFQUNJLGVBQUE7RUFFQSxZQUFBO0VBQ0EseUJBQUE7RUFDQSxtQkFBQTtBQ0FKOztBRElBO0VBQ0kscUJBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFHQSxnQkFBQTtFQUNBLGtCQUFBO0FDSEo7O0FETUE7RUFDSSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0FDSEo7O0FETUE7RUFDSSwyQkFBQTtBQ0hKOztBRE1BO0VBQ0ksNEJBQUE7QUNISjs7QURNQTtFQUNJLHFCQUFBO0FDSEo7O0FETUE7RUFDSSxrQkFBQTtBQ0hKOztBRE1BO0VBQ0ksWUFBQTtFQUNBLHlCQUFBO0FDSEo7O0FETUE7RUFDSSx5QkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FDSEo7O0FETUE7RUFDSSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsVUFBQTtBQ0hKOztBRE9BO0VBQ0ksV0FBQTtBQ0pKOztBRE9BO0VBQ0ksZ0JBQUE7RUFDQSx5QkFBQTtBQ0pKIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9saXN0L2xpc3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZmlsbC1jb250YWluZXJ7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgICBtYXJnaW46IDA7XHJcbn1cclxuXHJcbi5tYXQtY2VsbCB7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbn1cclxuXHJcbi5tYXQtaGVhZGVyLWNlbGwge1xyXG4gICAgZm9udC1zaXplOiAxNnB4O1xyXG4gICAgLy8gZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNENBQ0RCO1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IDFweDtcclxuICAgIC8vIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTAsMjUwLDI1MCk7ICAgIFxyXG59XHJcblxyXG4ucHJpb3JpdHktaGVhZGVyIHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIHBhZGRpbmc6IDFlbTtcclxuICAgIGhlaWdodDogMjBweDtcclxuICAgIHdpZHRoOiAxMGVtO1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICAvLyBtYXJnaW4tYm90dG9tOiAxZW07XHJcbiAgICAvLyBtYXJnaW4tcmlnaHQ6IDA7XHJcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4ucHJpb3JpdHktdGV4dCB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGJvdHRvbTogMTBweDtcclxufVxyXG5cclxuLmxvdy1wcmlvcml0eSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaW1lZ3JlZW47XHJcbn1cclxuXHJcbi5tZWQtcHJpb3JpdHkge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZGFya29yYW5nZTtcclxufVxyXG5cclxuLmhpZ2gtcHJpb3JpdHkge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xyXG59XHJcblxyXG4uY2VudGVyZWQge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uZGVzY3JpcHRpb24ge1xyXG4gICAgd2lkdGg6IDQwMHB4O1xyXG4gICAgb3ZlcmZsb3ctd3JhcDogYnJlYWstd29yZDtcclxufVxyXG5cclxuI21haW4tY29udGVudC1jb250YWluZXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIzOCwyMzgsMjM4KTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcblxyXG4jdGFibGUtY29udGFpbmVyIHtcclxuICAgIG92ZXJmbG93LXk6IHNjcm9sbDtcclxuICAgIG1heC1oZWlnaHQ6IDcwdmg7XHJcbiAgICB3aWR0aDogOTAlO1xyXG4gICAgLy8gcGFkZGluZy10b3A6IDEwZW07XHJcbn1cclxuXHJcbiNkYXRhLXRhYmxlIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4jbmFtZS1jZWxsIHtcclxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgICBvdmVyZmxvdy13cmFwOiBicmVhay13b3JkO1xyXG59XHJcbiIsIi5maWxsLWNvbnRhaW5lciB7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbn1cblxuLm1hdC1jZWxsIHtcbiAgZm9udC1zaXplOiAxNnB4O1xufVxuXG4ubWF0LWhlYWRlci1jZWxsIHtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBjb2xvcjogd2hpdGU7XG4gIGJhY2tncm91bmQtY29sb3I6ICM0Q0FDREI7XG4gIGxldHRlci1zcGFjaW5nOiAxcHg7XG59XG5cbi5wcmlvcml0eS1oZWFkZXIge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHBhZGRpbmc6IDFlbTtcbiAgaGVpZ2h0OiAyMHB4O1xuICB3aWR0aDogMTBlbTtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgbWFyZ2luLXRvcDogMTBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4ucHJpb3JpdHktdGV4dCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJvdHRvbTogMTBweDtcbn1cblxuLmxvdy1wcmlvcml0eSB7XG4gIGJhY2tncm91bmQtY29sb3I6IGxpbWVncmVlbjtcbn1cblxuLm1lZC1wcmlvcml0eSB7XG4gIGJhY2tncm91bmQtY29sb3I6IGRhcmtvcmFuZ2U7XG59XG5cbi5oaWdoLXByaW9yaXR5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xufVxuXG4uY2VudGVyZWQge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5kZXNjcmlwdGlvbiB7XG4gIHdpZHRoOiA0MDBweDtcbiAgb3ZlcmZsb3ctd3JhcDogYnJlYWstd29yZDtcbn1cblxuI21haW4tY29udGVudC1jb250YWluZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlZWVlO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4jdGFibGUtY29udGFpbmVyIHtcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuICBtYXgtaGVpZ2h0OiA3MHZoO1xuICB3aWR0aDogOTAlO1xufVxuXG4jZGF0YS10YWJsZSB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4jbmFtZS1jZWxsIHtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgb3ZlcmZsb3ctd3JhcDogYnJlYWstd29yZDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/components/list/list.component.ts":
/*!***************************************************!*\
  !*** ./src/app/components/list/list.component.ts ***!
  \***************************************************/
/*! exports provided: ListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListComponent", function() { return ListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_dashboard_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/dashboard.service */ "./src/app/services/dashboard.service.ts");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/esm5/table.es5.js");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/sort */ "./node_modules/@angular/material/esm5/sort.es5.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _entryComponents_edit_task_dialog_edit_task_dialog_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../entryComponents/edit-task-dialog/edit-task-dialog.component */ "./src/app/components/entryComponents/edit-task-dialog/edit-task-dialog.component.ts");
/* harmony import */ var _entryComponents_rejection_dialog_rejection_dialog_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../entryComponents/rejection-dialog/rejection-dialog.component */ "./src/app/components/entryComponents/rejection-dialog/rejection-dialog.component.ts");
/* harmony import */ var _entryComponents_history_log_dialog_history_log_dialog_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../entryComponents/history-log-dialog/history-log-dialog.component */ "./src/app/components/entryComponents/history-log-dialog/history-log-dialog.component.ts");
/* harmony import */ var _entryComponents_confirmation_dialog_confirmation_dialog_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../entryComponents/confirmation-dialog/confirmation-dialog.component */ "./src/app/components/entryComponents/confirmation-dialog/confirmation-dialog.component.ts");
/* harmony import */ var src_app_services_file_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/file.service */ "./src/app/services/file.service.ts");











// TODO: Put limit on amount of text that shows for name and description
var ListComponent = /** @class */ (function () {
    function ListComponent(dashboardService, dialog, cdr, fileService) {
        this.dashboardService = dashboardService;
        this.dialog = dialog;
        this.cdr = cdr;
        this.fileService = fileService;
        this.displayedColumns = ['name', 'description', 'owner', 'priority', 'creationAge', 'dueDate', 'overdueAge', 'rejectedCount', 'status', 'actions'];
        this.currentProject = null;
        this.currentTasks = null;
    }
    ListComponent.prototype.ngOnInit = function () {
    };
    ListComponent.prototype.initSort = function () {
        var _this = this;
        this.dataSource.sort = this.sort;
        // Teaches the sorting algorithm for specific headers
        this.dataSource.sortingDataAccessor = function (item, property) {
            if (property === 'creationAge') {
                var ageString = _this.getCreationAge(item.dateCreated);
                return _this.extractDays(ageString);
            }
            else if (property === 'overdueAge') {
                var ageString = _this.getOverdueAge(item.dueDate, item.completed);
                return _this.extractDays(ageString);
            }
            else if (property === 'status') {
                return _this.getStatusValue(item);
            }
            else {
                return item[property];
            }
        };
    };
    ListComponent.prototype.transferState = function () {
        return this.currentProject;
    };
    ListComponent.prototype.recieveState = function (project) {
        if (project === null) {
            this.setState(null, null);
        }
        else {
            this.setState(project, project.tasks);
        }
    };
    ListComponent.prototype.setState = function (project, tasks) {
        this.currentProject = project;
        this.currentTasks = tasks;
        this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_3__["MatTableDataSource"](this.currentTasks);
        // Had to add this line because on initial app load, the view doesn't update properly
        // This probably is due to the getProjectCallback() in project-tool-bar component.
        // I believe that this component loads before the callback is called.
        // THIS LINE IS BREAKING THE POPUP DIALOGS
        // this.cdr.detectChanges();
        // Have to re init sort to keep sorting working with new dataset
        if (project !== null) {
            this.initSort();
        }
    };
    ListComponent.prototype.refresh = function () {
        if (this.currentProject != undefined && this.currentTasks != undefined) {
            this.setState(this.currentProject, this.currentTasks);
        }
    };
    // The JSON file is being updated in app.component.ts so a change event isn't needed here
    ListComponent.prototype.addTask = function (task) {
        this.currentTasks.push(task);
        // Refreshes the list
        this.refresh();
    };
    ListComponent.prototype.removeTask = function (task) {
        var index = this.currentTasks.indexOf(task, 0);
        if (index > -1) {
            // Removes the element in place
            this.currentTasks.splice(index, 1);
        }
        // Send a change event to the shared file service so that it can update the json file
        this.fileService.emitChange(true);
        // Refreshes the list
        this.refresh();
    };
    ListComponent.prototype.updateTask = function (modalResult, taskToUpdate) {
        taskToUpdate.name = modalResult.name;
        taskToUpdate.description = modalResult.description;
        taskToUpdate.priority = modalResult.priority;
        taskToUpdate.dueDate = modalResult.dueDate;
        this.fileService.emitChange(true);
        this.refresh();
    };
    ListComponent.prototype.applyFilter = function (value) {
        this.dataSource.filter = value.trim().toLowerCase();
    };
    ListComponent.prototype.getOverdueAge = function (dueDate, completed) {
        if (completed)
            return "0 days";
        var currDate = new Date();
        var diff = currDate.getTime() - dueDate.getTime();
        if (diff < 0) {
            return "0 days";
        }
        var diffDays = Math.ceil(Math.abs(diff) / (1000 * 3600 * 24));
        return diffDays + " days";
    };
    ListComponent.prototype.getCreationAge = function (creationDate) {
        var currDate = new Date();
        var diff = Math.abs(creationDate.getTime() - currDate.getTime());
        var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        return diffDays + " days";
    };
    ListComponent.prototype.isOverDue = function (dueDate) {
        var currDate = new Date();
        return dueDate < currDate;
    };
    ListComponent.prototype.shortenDescription = function (description) {
        if (description.length > 100) {
            return description.substring(0, 100) + "...";
        }
        return description;
    };
    // Returns a number for the header to sort by
    ListComponent.prototype.getStatusValue = function (task) {
        if (task.completed === true) {
            return 1;
        }
        else if (this.isOverDue(task.dueDate)) {
            return 2;
        }
        else {
            return 3;
        }
    };
    ListComponent.prototype.getTask = function (name) {
        for (var i = 0; i < this.currentTasks.length; i++) {
            if (name === this.currentTasks[i].name) {
                return this.currentTasks[i];
            }
        }
        return null;
    };
    ListComponent.prototype.onComplete = function (event) {
        if (this.cachedTaskName != undefined) {
            var targetTask = this.getTask(this.cachedTaskName);
            targetTask.completed = true;
            targetTask.completionDate = new Date();
            this.fileService.emitChange(true);
        }
    };
    ListComponent.prototype.onUndoComplete = function (event) {
        if (this.cachedTaskName != undefined) {
            var targetTask = this.getTask(this.cachedTaskName);
            targetTask.completed = false;
            targetTask.completionDate = null;
            this.fileService.emitChange(true);
        }
    };
    ListComponent.prototype.onStart = function (event) {
        if (this.cachedTaskName != undefined) {
            this.getTask(this.cachedTaskName).started = true;
            this.fileService.emitChange(true);
        }
    };
    ListComponent.prototype.onUndoStart = function (event) {
        if (this.cachedTaskName != undefined) {
            this.getTask(this.cachedTaskName).started = false;
            this.fileService.emitChange(true);
        }
    };
    ListComponent.prototype.onEdit = function (event) {
        var _this = this;
        if (this.cachedTaskName != undefined) {
            var targetTask_1 = this.getTask(this.cachedTaskName);
            var cloneTask = Object.create(targetTask_1);
            var dialogRef = this.dialog.open(_entryComponents_edit_task_dialog_edit_task_dialog_component__WEBPACK_IMPORTED_MODULE_6__["EditTaskDialogComponent"], {
                data: { fields: cloneTask, project: this.currentProject }
            });
            dialogRef.afterClosed().subscribe(function (result) {
                if (result != undefined) {
                    _this.updateTask(result, targetTask_1);
                    _this.fileService.emitChange(true);
                }
            });
        }
    };
    ListComponent.prototype.onDelete = function (event) {
        var _this = this;
        if (this.cachedTaskName != undefined) {
            var targetTask_2 = this.getTask(this.cachedTaskName);
            var dialogRef = this.dialog.open(_entryComponents_confirmation_dialog_confirmation_dialog_component__WEBPACK_IMPORTED_MODULE_9__["ConfirmationDialogComponent"], {
                data: targetTask_2.name
            });
            dialogRef.afterClosed().subscribe(function (result) {
                if (result != undefined) {
                    _this.removeTask(targetTask_2);
                    _this.fileService.emitChange(true);
                }
            });
        }
    };
    ListComponent.prototype.onReject = function (event) {
        var _this = this;
        if (this.cachedTaskName != undefined) {
            var targetTask_3 = this.getTask(this.cachedTaskName);
            var dialogRef = this.dialog.open(_entryComponents_rejection_dialog_rejection_dialog_component__WEBPACK_IMPORTED_MODULE_7__["RejectionDialogComponent"], {
                data: { reason: "", creationDate: new Date(), assignedTask: targetTask_3 }
            });
            dialogRef.afterClosed().subscribe(function (result) {
                if (result != undefined) {
                    var rejection = { reason: result.reason, creationDate: result.creationDate };
                    targetTask_3.rejections.push(rejection);
                    _this.fileService.emitChange(true);
                }
            });
        }
    };
    ListComponent.prototype.onView = function (event) {
        var _this = this;
        if (this.cachedTaskName != undefined) {
            var targetTask_4 = this.getTask(this.cachedTaskName);
            // Make a copy of rejections so that changes do not take effect until subscription is hit
            var rejectionsCopy = Object.create(targetTask_4.rejections);
            var dialogRef = this.dialog.open(_entryComponents_history_log_dialog_history_log_dialog_component__WEBPACK_IMPORTED_MODULE_8__["HistoryLogDialogComponent"], {
                data: { rejections: rejectionsCopy, taskName: targetTask_4.name }
            });
            dialogRef.afterClosed().subscribe(function (result) {
                if (result != undefined) {
                    targetTask_4.rejections = result.rejections;
                    _this.fileService.emitChange(true);
                }
            });
        }
    };
    ListComponent.prototype.saveRow = function (event) {
        var target;
        // Sometimes the click event will return the inner icon as the src element so
        // have to check for that case.
        if (event.srcElement.className === "fas fa-ellipsis-v") {
            target = event.srcElement.parentElement.parentElement;
        }
        else {
            target = event.srcElement;
        }
        this.cachedTaskName = target.parentElement.parentElement.children[0].innerHTML;
    };
    ListComponent.prototype.clearView = function () {
        this.recieveState(null);
    };
    ListComponent.prototype.extractDays = function (dayString) {
        var ageString = dayString;
        var indexSlice = ageString.indexOf(" days");
        var days = Number.parseInt(ageString.slice(0, indexSlice));
        return days;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material_sort__WEBPACK_IMPORTED_MODULE_4__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material_sort__WEBPACK_IMPORTED_MODULE_4__["MatSort"])
    ], ListComponent.prototype, "sort", void 0);
    ListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-list',
            template: __webpack_require__(/*! raw-loader!./list.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/list/list.component.html"),
            styles: [__webpack_require__(/*! ./list.component.scss */ "./src/app/components/list/list.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_dashboard_service__WEBPACK_IMPORTED_MODULE_2__["DashboardService"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__["MatDialog"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], src_app_services_file_service__WEBPACK_IMPORTED_MODULE_10__["FileService"]])
    ], ListComponent);
    return ListComponent;
}());



/***/ }),

/***/ "./src/app/components/nav/nav.component.scss":
/*!***************************************************!*\
  !*** ./src/app/components/nav/nav.component.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".nav-img {\n  height: 100%;\n  width: 100%;\n  -o-object-fit: contain;\n     object-fit: contain;\n  cursor: pointer;\n}\n\n.nav-img-container {\n  height: 5em;\n  padding: 0;\n}\n\n.nav-icon {\n  color: black;\n  font-size: 2em;\n  margin-top: 1em;\n  cursor: pointer;\n}\n\n#sidebar {\n  height: 100vh;\n  width: 100%;\n  background-color: white;\n  margin: 0;\n  border-width: 1px 1px 0px 0px;\n  border-style: solid;\n  color: lightgray;\n  padding-top: 0;\n}\n\n#brand {\n  background-color: white !important;\n  border-bottom: 1px solid lightgray;\n  height: 60px;\n}\n\n#safran-logo-img {\n  cursor: default;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9uYXYvQzpcXFVzZXJzXFx0eWxlclxcRG9jdW1lbnRzXFxNeSBTdHVmZlxcUGVyc29uYWxcXENvZGVcXFNhZnJhblxcbWFuYWdlci1hcHAvc3JjXFxhcHBcXGNvbXBvbmVudHNcXG5hdlxcbmF2LmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9jb21wb25lbnRzL25hdi9uYXYuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxZQUFBO0VBQ0EsV0FBQTtFQUNBLHNCQUFBO0tBQUEsbUJBQUE7RUFDQSxlQUFBO0FDQ0o7O0FERUE7RUFDSSxXQUFBO0VBQ0EsVUFBQTtBQ0NKOztBREVBO0VBQ0ksWUFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtBQ0NKOztBREVBO0VBQ0ksYUFBQTtFQUNBLFdBQUE7RUFDQSx1QkFBQTtFQUNBLFNBQUE7RUFDQSw2QkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0FDQ0o7O0FERUE7RUFDSSxrQ0FBQTtFQUNBLGtDQUFBO0VBQ0EsWUFBQTtBQ0NKOztBREVBO0VBQ0ksZUFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9uYXYvbmF2LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm5hdi1pbWcge1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBvYmplY3QtZml0OiBjb250YWluO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4ubmF2LWltZy1jb250YWluZXIge1xyXG4gICAgaGVpZ2h0OiA1ZW07XHJcbiAgICBwYWRkaW5nOiAwOyAgICBcclxufVxyXG5cclxuLm5hdi1pY29uIHtcclxuICAgIGNvbG9yOiBibGFjaztcclxuICAgIGZvbnQtc2l6ZTogMmVtO1xyXG4gICAgbWFyZ2luLXRvcDogMWVtO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4jc2lkZWJhciB7XHJcbiAgICBoZWlnaHQ6IDEwMHZoO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIGJvcmRlci13aWR0aDogMXB4IDFweCAwcHggMHB4O1xyXG4gICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcclxuICAgIGNvbG9yOiBsaWdodGdyYXk7XHJcbiAgICBwYWRkaW5nLXRvcDogMDtcclxufVxyXG5cclxuI2JyYW5kIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgbGlnaHRncmF5O1xyXG4gICAgaGVpZ2h0OiA2MHB4O1xyXG59XHJcblxyXG4jc2FmcmFuLWxvZ28taW1nIHtcclxuICAgIGN1cnNvcjogZGVmYXVsdDtcclxufSIsIi5uYXYtaW1nIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgb2JqZWN0LWZpdDogY29udGFpbjtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4ubmF2LWltZy1jb250YWluZXIge1xuICBoZWlnaHQ6IDVlbTtcbiAgcGFkZGluZzogMDtcbn1cblxuLm5hdi1pY29uIHtcbiAgY29sb3I6IGJsYWNrO1xuICBmb250LXNpemU6IDJlbTtcbiAgbWFyZ2luLXRvcDogMWVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbiNzaWRlYmFyIHtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgd2lkdGg6IDEwMCU7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBtYXJnaW46IDA7XG4gIGJvcmRlci13aWR0aDogMXB4IDFweCAwcHggMHB4O1xuICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICBjb2xvcjogbGlnaHRncmF5O1xuICBwYWRkaW5nLXRvcDogMDtcbn1cblxuI2JyYW5kIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGUgIWltcG9ydGFudDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbiAgaGVpZ2h0OiA2MHB4O1xufVxuXG4jc2FmcmFuLWxvZ28taW1nIHtcbiAgY3Vyc29yOiBkZWZhdWx0O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/components/nav/nav.component.ts":
/*!*************************************************!*\
  !*** ./src/app/components/nav/nav.component.ts ***!
  \*************************************************/
/*! exports provided: NavComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavComponent", function() { return NavComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _entryComponents_create_project_dialog_create_project_dialog_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../entryComponents/create-project-dialog/create-project-dialog.component */ "./src/app/components/entryComponents/create-project-dialog/create-project-dialog.component.ts");




var NavComponent = /** @class */ (function () {
    function NavComponent(dialog) {
        this.dialog = dialog;
        this.createProjectEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    NavComponent.prototype.ngOnInit = function () {
    };
    NavComponent.prototype.openCreateProjectDialog = function (event) {
        var _this = this;
        if (this.projects === undefined) {
            this.projects = [];
        }
        // the data injected is {Project, Project[]}
        // We pass in all of the current projects so that the name of the newly created project can be checked
        // This is to ensure that there is no duplicate project names
        var dialogRef = this.dialog.open(_entryComponents_create_project_dialog_create_project_dialog_component__WEBPACK_IMPORTED_MODULE_3__["CreateProjectDialogComponent"], {
            data: { fields: { name: "", dateCreated: "", description: "", dueDate: null, priority: null, tasks: [] }, allProjects: this.projects },
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result != undefined) {
                _this.createProjectEvent.emit(result);
            }
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], NavComponent.prototype, "createProjectEvent", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], NavComponent.prototype, "projects", void 0);
    NavComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-nav',
            template: __webpack_require__(/*! raw-loader!./nav.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/nav/nav.component.html"),
            styles: [__webpack_require__(/*! ./nav.component.scss */ "./src/app/components/nav/nav.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
    ], NavComponent);
    return NavComponent;
}());



/***/ }),

/***/ "./src/app/components/project-tool-bar/project-tool-bar.component.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/components/project-tool-bar/project-tool-bar.component.scss ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".toolbar-btn {\n  font-size: 16px;\n  color: white;\n  font-weight: bold;\n  padding-left: 3em;\n  padding-right: 3em;\n  background-color: #4CACDB;\n}\n\n.button-icon {\n  font-size: 22px;\n}\n\n#dashboard-toolbar {\n  height: 10%;\n}\n\n#project-select-container {\n  margin-left: 5vw;\n  margin-top: 1vh;\n}\n\n#toolbar-container {\n  background-color: #eeeeee;\n  width: 100%;\n  height: 100%;\n}\n\n#filter-form {\n  width: 20em;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9wcm9qZWN0LXRvb2wtYmFyL0M6XFxVc2Vyc1xcdHlsZXJcXERvY3VtZW50c1xcTXkgU3R1ZmZcXFBlcnNvbmFsXFxDb2RlXFxTYWZyYW5cXG1hbmFnZXItYXBwL3NyY1xcYXBwXFxjb21wb25lbnRzXFxwcm9qZWN0LXRvb2wtYmFyXFxwcm9qZWN0LXRvb2wtYmFyLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9jb21wb25lbnRzL3Byb2plY3QtdG9vbC1iYXIvcHJvamVjdC10b29sLWJhci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGVBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFFQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7QUNBSjs7QURHQTtFQUNJLGVBQUE7QUNBSjs7QURHQTtFQUNJLFdBQUE7QUNBSjs7QURHQTtFQUNJLGdCQUFBO0VBQ0EsZUFBQTtBQ0FKOztBRElBO0VBQ0kseUJBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQ0RKOztBRElBO0VBQ0ksV0FBQTtBQ0RKIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9wcm9qZWN0LXRvb2wtYmFyL3Byb2plY3QtdG9vbC1iYXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudG9vbGJhci1idG4ge1xyXG4gICAgZm9udC1zaXplOiAxNnB4O1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICAvLyBsZXR0ZXItc3BhY2luZzogMXB4O1xyXG4gICAgcGFkZGluZy1sZWZ0OiAzZW07XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAzZW07XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNENBQ0RCO1xyXG59XHJcblxyXG4uYnV0dG9uLWljb24ge1xyXG4gICAgZm9udC1zaXplOiAyMnB4O1xyXG59XHJcblxyXG4jZGFzaGJvYXJkLXRvb2xiYXIge1xyXG4gICAgaGVpZ2h0OiAxMCU7XHJcbn1cclxuXHJcbiNwcm9qZWN0LXNlbGVjdC1jb250YWluZXIge1xyXG4gICAgbWFyZ2luLWxlZnQ6IDV2dztcclxuICAgIG1hcmdpbi10b3A6IDF2aDtcclxuICAgIC8vIHdpZHRoOiA5MCU7XHJcbn1cclxuXHJcbiN0b29sYmFyLWNvbnRhaW5lciB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjM4LDIzOCwyMzgpO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuXHJcbiNmaWx0ZXItZm9ybSB7XHJcbiAgICB3aWR0aDogMjBlbTtcclxufSIsIi50b29sYmFyLWJ0biB7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgcGFkZGluZy1sZWZ0OiAzZW07XG4gIHBhZGRpbmctcmlnaHQ6IDNlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRDQUNEQjtcbn1cblxuLmJ1dHRvbi1pY29uIHtcbiAgZm9udC1zaXplOiAyMnB4O1xufVxuXG4jZGFzaGJvYXJkLXRvb2xiYXIge1xuICBoZWlnaHQ6IDEwJTtcbn1cblxuI3Byb2plY3Qtc2VsZWN0LWNvbnRhaW5lciB7XG4gIG1hcmdpbi1sZWZ0OiA1dnc7XG4gIG1hcmdpbi10b3A6IDF2aDtcbn1cblxuI3Rvb2xiYXItY29udGFpbmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZWVlZTtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuI2ZpbHRlci1mb3JtIHtcbiAgd2lkdGg6IDIwZW07XG59Il19 */"

/***/ }),

/***/ "./src/app/components/project-tool-bar/project-tool-bar.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/components/project-tool-bar/project-tool-bar.component.ts ***!
  \***************************************************************************/
/*! exports provided: ProjectToolBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectToolBarComponent", function() { return ProjectToolBarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_dashboard_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/dashboard.service */ "./src/app/services/dashboard.service.ts");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _entryComponents_add_task_dialog_add_task_dialog_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../entryComponents/add-task-dialog/add-task-dialog.component */ "./src/app/components/entryComponents/add-task-dialog/add-task-dialog.component.ts");
/* harmony import */ var _entryComponents_manage_project_dialog_manage_project_dialog_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../entryComponents/manage-project-dialog/manage-project-dialog.component */ "./src/app/components/entryComponents/manage-project-dialog/manage-project-dialog.component.ts");
/* harmony import */ var _services_file_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/file.service */ "./src/app/services/file.service.ts");
/* harmony import */ var _entryComponents_graph_dialog_graph_dialog_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../entryComponents/graph-dialog/graph-dialog.component */ "./src/app/components/entryComponents/graph-dialog/graph-dialog.component.ts");
/* harmony import */ var src_app_services_excel_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/excel.service */ "./src/app/services/excel.service.ts");









var ProjectToolBarComponent = /** @class */ (function () {
    function ProjectToolBarComponent(dashboardService, dialog, fileService, cdr, ngZone, excelService) {
        var _this = this;
        this.dashboardService = dashboardService;
        this.dialog = dialog;
        this.fileService = fileService;
        this.cdr = cdr;
        this.ngZone = ngZone;
        this.excelService = excelService;
        this.selectProjectEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.filterEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.addTaskEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.allProjectsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.clearViewEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.writeToFileEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.projects = [];
        this.currentProject = null;
        // This function is so that json date string can be caught and converted back to a date object
        this.dateTimeReviver = function (key, value) {
            var reDateDetect = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;
            if (typeof value == 'string' && (reDateDetect.exec(value))) {
                // console.log("hit conversion");
                return new Date(value);
            }
            return value;
        };
        fileService.changeEmitted$.subscribe(function (changeFlag) {
            _this.writeToFile();
            _this.allProjectsEvent.emit();
            // this.selectProjectEvent.emit(this.currentProject);
            // this.selectProjectTrigger(this.currentProject);
        });
    }
    ProjectToolBarComponent.prototype.ngOnInit = function () {
    };
    ProjectToolBarComponent.prototype.ngAfterViewInit = function () {
        // This will initiate the application
        this.getProjects();
    };
    ProjectToolBarComponent.prototype.addProject = function (newProject) {
        this.projects.push(newProject);
        // Select the value here programatically in order to update everything else with new project
        this.selectProjectTrigger(newProject.name);
        // Send out event to allow other components to access the list of projects
        // this.allProjectsEvent.emit(this.projects);
        this.fileService.emitChange(true);
    };
    // This is the entry point for the application
    // This feels like it should be in app.component.ts but for now it stays
    ProjectToolBarComponent.prototype.getProjects = function () {
        // This function will retrieve the data and use the callback function below
        this.fileService.readFile(this);
        // TESTING
        // this.projects = this.dashboardService.getProjects();
        // this.allProjectsEvent.emit(this.projects);
        // this.initDashboard();
    };
    ProjectToolBarComponent.prototype.getProjectsCallback = function (data) {
        var parsedObject;
        try {
            parsedObject = JSON.parse(data, this.dateTimeReviver);
        }
        catch (e) {
            // If it errors out, reset projects to empty list
            console.log(e);
            parsedObject = [];
            console.log("Recovering file state with a new file...");
            this.fileService.recoverCorruptFile();
        }
        this.projects = parsedObject;
        // Send out an event to allow other components to access the list of projects
        this.allProjectsEvent.emit(this.projects);
        this.initDashboard();
        // this.cdr.detectChanges();
    };
    ProjectToolBarComponent.prototype.deleteCurrentProject = function () {
        var currentProjectIndex;
        for (var i = 0; i < this.projects.length; i++) {
            if (this.projects[i].name === this.currentProject.name) {
                this.projects.splice(i, 1);
            }
        }
        this.currentProject = null;
        this.initDashboard();
        this.fileService.emitChange(true);
    };
    ProjectToolBarComponent.prototype.initDashboard = function () {
        // console.log(this.projects.length);
        if (this.projects.length > 0) {
            // console.log("triggering");
            this.selectProjectTrigger(this.projects[0].name);
        }
        else {
            // console.log("clearing view");
            this.clearViewEvent.emit(null);
        }
    };
    // Changes the current project according to value(name of project) and updates components
    ProjectToolBarComponent.prototype.selectProjectTrigger = function (value) {
        var _this = this;
        if (value === null) {
            return;
        }
        for (var i = 0; i < this.projects.length; i++) {
            if (this.projects[i].name === value) {
                this.currentProject = this.projects[i];
                // This is required to update the value display in the project dropdown
                // This is the only thing that I found to work
                this.ngZone.run(function () {
                    _this.projectSelect.value = _this.currentProject.name;
                });
                // Send event to parent component to update header and dash
                this.selectProjectEvent.emit(this.projects[i]);
                return;
            }
        }
    };
    ProjectToolBarComponent.prototype.applyFilter = function (value) {
        if (this.currentProject !== null) {
            this.filterEvent.emit(value);
        }
    };
    ProjectToolBarComponent.prototype.openAddTaskDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_entryComponents_add_task_dialog_add_task_dialog_component__WEBPACK_IMPORTED_MODULE_4__["AddTaskDialogComponent"], {
            data: { fields: { name: "", description: "", dateCreated: new Date(), dueDate: "", priority: 1, completed: false, completionDate: null, rejections: [] }, project: this.currentProject }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result != undefined) {
                _this.addTaskEvent.emit(result);
            }
        });
    };
    ProjectToolBarComponent.prototype.openManageProjectDialog = function () {
        var _this = this;
        var projectClone = Object.create(this.currentProject);
        var dialogRef = this.dialog.open(_entryComponents_manage_project_dialog_manage_project_dialog_component__WEBPACK_IMPORTED_MODULE_5__["ManageProjectDialogComponent"], {
            data: { fields: projectClone, allProjects: this.projects }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result != undefined) {
                if (result === "Delete") {
                    _this.deleteCurrentProject();
                    return;
                }
                _this.currentProject.name = result.name;
                _this.currentProject.description = result.description;
                _this.currentProject.priority = result.priority;
                _this.currentProject.dueDate = result.dueDate;
                _this.fileService.emitChange(true);
            }
        });
    };
    ProjectToolBarComponent.prototype.openGraphDialog = function () {
        // console.log(this.currentProject);
        var dialogRef = this.dialog.open(_entryComponents_graph_dialog_graph_dialog_component__WEBPACK_IMPORTED_MODULE_7__["GraphDialogComponent"], {
            data: this.currentProject
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result != undefined) {
                // console.log("graph callback");
            }
        });
    };
    ProjectToolBarComponent.prototype.writeToFile = function () {
        // console.log(this.projects);
        var jsonData = JSON.stringify(this.projects);
        // console.log(jsonData);    
        this.fileService.writeToFile(jsonData);
    };
    ProjectToolBarComponent.prototype.exportToExcel = function () {
        this.excelService.exportProjectsAsExcel(this.projects);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], ProjectToolBarComponent.prototype, "selectProjectEvent", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], ProjectToolBarComponent.prototype, "filterEvent", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], ProjectToolBarComponent.prototype, "addTaskEvent", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], ProjectToolBarComponent.prototype, "allProjectsEvent", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], ProjectToolBarComponent.prototype, "clearViewEvent", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], ProjectToolBarComponent.prototype, "writeToFileEvent", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('projectSelect', { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ProjectToolBarComponent.prototype, "projectSelect", void 0);
    ProjectToolBarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-project-tool-bar',
            template: __webpack_require__(/*! raw-loader!./project-tool-bar.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/project-tool-bar/project-tool-bar.component.html"),
            styles: [__webpack_require__(/*! ./project-tool-bar.component.scss */ "./src/app/components/project-tool-bar/project-tool-bar.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_dashboard_service__WEBPACK_IMPORTED_MODULE_2__["DashboardService"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialog"], _services_file_service__WEBPACK_IMPORTED_MODULE_6__["FileService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], src_app_services_excel_service__WEBPACK_IMPORTED_MODULE_8__["ExcelService"]])
    ], ProjectToolBarComponent);
    return ProjectToolBarComponent;
}());



/***/ }),

/***/ "./src/app/components/test/test.component.scss":
/*!*****************************************************!*\
  !*** ./src/app/components/test/test.component.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".elements {\n  max-height: 250px;\n  background: white;\n  overflow: hidden;\n  white-space: nowrap;\n}\n.elements.horizontal {\n  max-width: 100%;\n  margin: 0px 15%;\n}\n.element {\n  max-width: 200px;\n  width: 200px;\n  min-width: 200px;\n  padding: 20px 10px;\n  border-right: none;\n  border: solid 1px #ccc;\n  border-radius: 5px;\n  color: rgba(0, 0, 0, 0.87);\n  box-sizing: border-box;\n  cursor: move;\n  background: white;\n  font-size: 14px;\n  margin: 5px 0px;\n  text-align: center;\n}\n.element.horizontal {\n  display: inline-block;\n  margin: 0px 0px 0px 5px;\n}\n.cdk-drag-preview {\n  z-index: 10000000000;\n  width: 200px;\n  box-sizing: border-box;\n  border-radius: 5px;\n  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);\n}\n.cdk-drag-placeholder {\n  opacity: 0;\n}\n.cdk-drag-animating {\n  transition: -webkit-transform 250ms cubic-bezier(0, 0, 0.2, 1);\n  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);\n  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1), -webkit-transform 250ms cubic-bezier(0, 0, 0.2, 1);\n}\n.cdk-drop-list-dragging :not(.cdk-drag-placeholder) {\n  transition: -webkit-transform 250ms cubic-bezier(0, 0, 0.2, 1);\n  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);\n  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1), -webkit-transform 250ms cubic-bezier(0, 0, 0.2, 1);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy90ZXN0L0M6XFxVc2Vyc1xcdHlsZXJcXERvY3VtZW50c1xcTXkgU3R1ZmZcXFBlcnNvbmFsXFxDb2RlXFxTYWZyYW5cXG1hbmFnZXItYXBwL3NyY1xcYXBwXFxjb21wb25lbnRzXFx0ZXN0XFx0ZXN0LmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9jb21wb25lbnRzL3Rlc3QvdGVzdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGlCQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0FDQ0o7QURDSTtFQUNFLGVBQUE7RUFDQSxlQUFBO0FDQ047QURHRTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSwwQkFBQTtFQUNBLHNCQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtBQ0FKO0FERUk7RUFDRSxxQkFBQTtFQUNBLHVCQUFBO0FDQU47QURJRTtFQUNFLG9CQUFBO0VBQ0EsWUFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxxSEFBQTtBQ0RKO0FES0U7RUFDRSxVQUFBO0FDRko7QURLRTtFQUNFLDhEQUFBO0VBQUEsc0RBQUE7RUFBQSwwR0FBQTtBQ0ZKO0FES0U7RUFDRSw4REFBQTtFQUFBLHNEQUFBO0VBQUEsMEdBQUE7QUNGSiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvdGVzdC90ZXN0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmVsZW1lbnRzIHtcclxuICAgIG1heC1oZWlnaHQ6IDI1MHB4O1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICBcclxuICAgICYuaG9yaXpvbnRhbCB7XHJcbiAgICAgIG1heC13aWR0aDogMTAwJTtcclxuICAgICAgbWFyZ2luOiAwcHggMTUlO1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICAuZWxlbWVudCB7XHJcbiAgICBtYXgtd2lkdGg6IDIwMHB4O1xyXG4gICAgd2lkdGg6IDIwMHB4O1xyXG4gICAgbWluLXdpZHRoOiAyMDBweDtcclxuICAgIHBhZGRpbmc6IDIwcHggMTBweDtcclxuICAgIGJvcmRlci1yaWdodDogbm9uZTtcclxuICAgIGJvcmRlcjogc29saWQgMXB4ICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjg3KTtcclxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICBjdXJzb3I6IG1vdmU7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIG1hcmdpbjogNXB4IDBweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIFxyXG4gICAgJi5ob3Jpem9udGFsIHtcclxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICBtYXJnaW46IDBweCAwcHggMHB4IDVweDtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgLmNkay1kcmFnLXByZXZpZXcge1xyXG4gICAgei1pbmRleDogMTAwMDAwMDAwMDA7XHJcbiAgICB3aWR0aDogMjAwcHg7XHJcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgYm94LXNoYWRvdzogMCA1cHggNXB4IC0zcHggcmdiYSgwLCAwLCAwLCAwLjIpLFxyXG4gICAgICAwIDhweCAxMHB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMTQpLCAwIDNweCAxNHB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xyXG4gIH1cclxuICBcclxuICAuY2RrLWRyYWctcGxhY2Vob2xkZXIge1xyXG4gICAgb3BhY2l0eTogMDtcclxuICB9XHJcbiAgXHJcbiAgLmNkay1kcmFnLWFuaW1hdGluZyB7XHJcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMjUwbXMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSk7XHJcbiAgfVxyXG4gIFxyXG4gIC5jZGstZHJvcC1saXN0LWRyYWdnaW5nIDpub3QoLmNkay1kcmFnLXBsYWNlaG9sZGVyKSB7XHJcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMjUwbXMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSk7XHJcbiAgfVxyXG4gICIsIi5lbGVtZW50cyB7XG4gIG1heC1oZWlnaHQ6IDI1MHB4O1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cbi5lbGVtZW50cy5ob3Jpem9udGFsIHtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBtYXJnaW46IDBweCAxNSU7XG59XG5cbi5lbGVtZW50IHtcbiAgbWF4LXdpZHRoOiAyMDBweDtcbiAgd2lkdGg6IDIwMHB4O1xuICBtaW4td2lkdGg6IDIwMHB4O1xuICBwYWRkaW5nOiAyMHB4IDEwcHg7XG4gIGJvcmRlci1yaWdodDogbm9uZTtcbiAgYm9yZGVyOiBzb2xpZCAxcHggI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjg3KTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgY3Vyc29yOiBtb3ZlO1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBtYXJnaW46IDVweCAwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi5lbGVtZW50Lmhvcml6b250YWwge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIG1hcmdpbjogMHB4IDBweCAwcHggNXB4O1xufVxuXG4uY2RrLWRyYWctcHJldmlldyB7XG4gIHotaW5kZXg6IDEwMDAwMDAwMDAwO1xuICB3aWR0aDogMjAwcHg7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgYm94LXNoYWRvdzogMCA1cHggNXB4IC0zcHggcmdiYSgwLCAwLCAwLCAwLjIpLCAwIDhweCAxMHB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMTQpLCAwIDNweCAxNHB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xufVxuXG4uY2RrLWRyYWctcGxhY2Vob2xkZXIge1xuICBvcGFjaXR5OiAwO1xufVxuXG4uY2RrLWRyYWctYW5pbWF0aW5nIHtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDI1MG1zIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpO1xufVxuXG4uY2RrLWRyb3AtbGlzdC1kcmFnZ2luZyA6bm90KC5jZGstZHJhZy1wbGFjZWhvbGRlcikge1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMjUwbXMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSk7XG59Il19 */"

/***/ }),

/***/ "./src/app/components/test/test.component.ts":
/*!***************************************************!*\
  !*** ./src/app/components/test/test.component.ts ***!
  \***************************************************/
/*! exports provided: TestComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestComponent", function() { return TestComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/drag-drop */ "./node_modules/@angular/cdk/esm5/drag-drop.es5.js");



var TestComponent = /** @class */ (function () {
    function TestComponent() {
        this.elements = [
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
    }
    TestComponent.prototype.ngOnInit = function () {
    };
    TestComponent.prototype.drop = function (event) {
        Object(_angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_2__["moveItemInArray"])(this.elements, event.previousIndex, event.currentIndex);
    };
    TestComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-test',
            template: __webpack_require__(/*! raw-loader!./test.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/test/test.component.html"),
            styles: [__webpack_require__(/*! ./test.component.scss */ "./src/app/components/test/test.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TestComponent);
    return TestComponent;
}());



/***/ }),

/***/ "./src/app/directives/remove-wrapper.directive.ts":
/*!********************************************************!*\
  !*** ./src/app/directives/remove-wrapper.directive.ts ***!
  \********************************************************/
/*! exports provided: RemoveWrapperDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RemoveWrapperDirective", function() { return RemoveWrapperDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var RemoveWrapperDirective = /** @class */ (function () {
    function RemoveWrapperDirective(el) {
        this.el = el;
        var parentElement = el.nativeElement.parentElement;
        var element = el.nativeElement;
        parentElement.removeChild(element);
        parentElement.parentNode.insertBefore(element, parentElement.nextSibling);
        parentElement.parentNode.removeChild(parentElement);
    }
    RemoveWrapperDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[remove-wrapper]'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]])
    ], RemoveWrapperDirective);
    return RemoveWrapperDirective;
}());



/***/ }),

/***/ "./src/app/models/Project.ts":
/*!***********************************!*\
  !*** ./src/app/models/Project.ts ***!
  \***********************************/
/*! exports provided: Project */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Project", function() { return Project; });
var Project = /** @class */ (function () {
    function Project() {
    }
    return Project;
}());



/***/ }),

/***/ "./src/app/models/Rejection.ts":
/*!*************************************!*\
  !*** ./src/app/models/Rejection.ts ***!
  \*************************************/
/*! exports provided: Rejection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rejection", function() { return Rejection; });
var Rejection = /** @class */ (function () {
    function Rejection() {
    }
    return Rejection;
}());



/***/ }),

/***/ "./src/app/services/dashboard.service.ts":
/*!***********************************************!*\
  !*** ./src/app/services/dashboard.service.ts ***!
  \***********************************************/
/*! exports provided: DashboardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardService", function() { return DashboardService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var DashboardService = /** @class */ (function () {
    function DashboardService() {
    }
    //These two functions are used soley for dummy data
    /* --------------------------------------------------------------------- */
    DashboardService.prototype.randomIntFromInterval = function (min, max) {
        return Math.floor((Math.random() * (max - min + 1) + min));
    };
    DashboardService.prototype.generateRandomTask = function (project) {
        var taskName = "ATP 77000-003-201-" + this.randomIntFromInterval(1, 999);
        var taskDescription = "Design, Develop, and Test " + taskName;
        var taskCompleted = this.randomIntFromInterval(0, 1);
        var taskRejections;
        var resultTask = {
            name: taskName,
            description: taskDescription,
            dateCreated: new Date("2019-" + this.randomIntFromInterval(1, 5) + "-" + this.randomIntFromInterval(1, 29)),
            dueDate: new Date("2019-" + this.randomIntFromInterval(1, 12) + "-" + this.randomIntFromInterval(1, 29)),
            priority: this.randomIntFromInterval(1, 3),
            started: this.randomIntFromInterval(1, 3) === 1 ? false : true,
            completed: taskCompleted == 1 ? true : false,
            completionDate: taskCompleted == 1 ? new Date("2019-" + this.randomIntFromInterval(1, 12) + "-" + this.randomIntFromInterval(1, 29)) : null,
            rejections: [],
            owner: "Abdo"
        };
        // Link Rejections
        for (var i = 0; i < this.randomIntFromInterval(0, 5); i++) {
            resultTask.rejections.push({ reason: "This is the reason for rejection.", creationDate: new Date() });
        }
        return resultTask;
    };
    DashboardService.prototype.generateRandomProject = function () {
        var projName = "Project " + this.randomIntFromInterval(77000, 77300) + "-" + this.randomIntFromInterval(100, 999);
        var projDateCreated = new Date("2019-" + this.randomIntFromInterval(1, 12) + "-" + this.randomIntFromInterval(1, 29));
        var projDescription = "Deliverables for " + projName;
        var projDueDate = new Date(projDateCreated.getDate() + this.randomIntFromInterval(1, 50));
        var projPriority = this.randomIntFromInterval(1, 3);
        var resultProject = {
            name: projName,
            dateCreated: projDateCreated,
            description: projDescription,
            dueDate: projDueDate,
            priority: projPriority,
            tasks: []
        };
        for (var i = 0; i < this.randomIntFromInterval(10, 30); i++) {
            var taskToPush = this.generateRandomTask(resultProject);
            resultProject.tasks.push(taskToPush);
        }
        return resultProject;
    };
    /* --------------------------------------------------------------------- */
    //TODO: Make these functions query the database
    DashboardService.prototype.getTasks = function (project) {
        return project.tasks;
    };
    DashboardService.prototype.getProjects = function () {
        var projectList = [];
        for (var i = 0; i < this.randomIntFromInterval(4, 8); i++) {
            projectList.push(this.generateRandomProject());
        }
        return projectList;
    };
    DashboardService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], DashboardService);
    return DashboardService;
}());



/***/ }),

/***/ "./src/app/services/excel.service.ts":
/*!*******************************************!*\
  !*** ./src/app/services/excel.service.ts ***!
  \*******************************************/
/*! exports provided: ExcelService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExcelService", function() { return ExcelService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! xlsx */ "./node_modules/xlsx/xlsx.js");
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(xlsx__WEBPACK_IMPORTED_MODULE_2__);



var ExcelService = /** @class */ (function () {
    function ExcelService() {
    }
    ExcelService_1 = ExcelService;
    ExcelService.toExportFileName = function (excelFileName) {
        return excelFileName + "_export_" + new Date().getTime() + ".xlsx";
    };
    // Formats the projects into an exportable format
    ExcelService.prototype.exportProjectsAsExcel = function (projects) {
        var e_1, _a;
        var workbook = xlsx__WEBPACK_IMPORTED_MODULE_2__["utils"].book_new();
        try {
            for (var projects_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](projects), projects_1_1 = projects_1.next(); !projects_1_1.done; projects_1_1 = projects_1.next()) {
                var project = projects_1_1.value;
                var preparedProject = this.prepareProjectForExport(project);
                var worksheet = xlsx__WEBPACK_IMPORTED_MODULE_2__["utils"].json_to_sheet(preparedProject);
                xlsx__WEBPACK_IMPORTED_MODULE_2__["utils"].book_append_sheet(workbook, worksheet, project.name);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (projects_1_1 && !projects_1_1.done && (_a = projects_1.return)) _a.call(projects_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        xlsx__WEBPACK_IMPORTED_MODULE_2__["writeFile"](workbook, ExcelService_1.toExportFileName("projects"));
    };
    ExcelService.prototype.prepareProjectForExport = function (project) {
        var e_2, _a;
        var result = [];
        var tasks = project.tasks;
        try {
            for (var tasks_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](tasks), tasks_1_1 = tasks_1.next(); !tasks_1_1.done; tasks_1_1 = tasks_1.next()) {
                var task = tasks_1_1.value;
                var object = {
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
                };
                result.push(object);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (tasks_1_1 && !tasks_1_1.done && (_a = tasks_1.return)) _a.call(tasks_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return result;
    };
    var ExcelService_1;
    ExcelService = ExcelService_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ExcelService);
    return ExcelService;
}());



/***/ }),

/***/ "./src/app/services/file.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/file.service.ts ***!
  \******************************************/
/*! exports provided: FileService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileService", function() { return FileService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");



var FileService = /** @class */ (function () {
    function FileService() {
        // Observable string sources
        this.emitChangeSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        // Observable string streams
        this.changeEmitted$ = this.emitChangeSource.asObservable();
        // This block is error checking so that it can still run in browser
        if (window.require) {
            try {
                this.ipc = window.require('electron').ipcRenderer;
            }
            catch (error) {
                throw error;
            }
        }
        else {
            console.warn('Could not load electron ipc');
        }
    }
    FileService.prototype.writeToFile = function (jsonData) {
        this.ipc.send("write", { data: jsonData });
    };
    FileService.prototype.exportToExcel = function (jsonData, component) {
        // this.ipc.send("export", {data:jsonData})
        // this.ipc.on('exportResponse', function (event, data) {
        //   component.downloadFile(data);
        // })
    };
    // Gets the data from the file and uses the component ref to callback a function once data is retrieved
    FileService.prototype.readFile = function (component) {
        this.ipc.send("read");
        this.ipc.on('readResponse', function (event, data) {
            component.getProjectsCallback(data);
        });
    };
    FileService.prototype.recoverCorruptFile = function () {
        this.ipc.send("write", { data: "[]" });
    };
    FileService.prototype.emitChange = function (needToUpdate) {
        this.emitChangeSource.next(needToUpdate);
    };
    FileService.prototype.exportToCsv = function (filename, rows) {
        if (!rows || !rows.length) {
            return;
        }
        var separator = ',';
        var keys = Object.keys(rows[0]);
        var csvContent = keys.join(separator) +
            '\n' +
            rows.map(function (row) {
                return keys.map(function (k) {
                    var cell = row[k] === null || row[k] === undefined ? '' : row[k];
                    cell = cell instanceof Date
                        ? cell.toLocaleString()
                        : cell.toString().replace(/"/g, '""');
                    if (cell.search(/("|,|\n)/g) >= 0) {
                        cell = "\"" + cell + "\"";
                    }
                    return cell;
                }).join(separator);
            }).join('\n');
        var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        }
        else {
            var link = document.createElement('a');
            if (link.download !== undefined) {
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    };
    FileService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], FileService);
    return FileService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\tyler\Documents\My Stuff\Personal\Code\Safran\manager-app\src\main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!************************!*\
  !*** stream (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map