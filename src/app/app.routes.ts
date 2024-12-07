import { Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { RegisterComponent } from '../components/register/register.component';
import { EditDataComponent } from '../components/edit-data/edit-data.component';
import { RegisterCompanyComponent } from '../components/register-company/register-company.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        title: 'Dashboard'
    },
    {
        path: 'register',
        component: RegisterComponent,
        title: 'Register'
    },
    {
        path: 'employee/:id',
        component: EditDataComponent,
        title: 'Edit'
    },
    {
        path: 'register-company',
        component: RegisterCompanyComponent,
        title: 'Register Company'
    }
];
