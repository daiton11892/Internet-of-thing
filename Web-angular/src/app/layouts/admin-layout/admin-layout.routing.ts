import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { ControllerComponent } from 'app/controller/controller.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'controller', component: ControllerComponent },
    { path: 'table-list', component: TableListComponent },
];
