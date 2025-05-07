import {Routes} from '@angular/router';
import {LoginComponent} from './features/auth/login/login.component';
import {RegisterComponent} from './features/auth/register/register.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
        //canActivate: [authGuard]
    }, {
        path: 'register',
        component: RegisterComponent,
        title: 'Register',
    },
    /*{
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard',
    }*/
];
