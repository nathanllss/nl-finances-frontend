import { Routes } from '@angular/router';
import {LoginComponent} from './features/auth/login/login.component';
import {authGuard} from './core/guards/auth.guard';

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
  }
];
