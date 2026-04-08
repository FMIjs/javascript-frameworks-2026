import { Routes } from '@angular/router';
import { UserList } from './user-list/user-list';
import { UserDetails } from './user-details/user-details';
import { Login } from './login/login';
import { authGuard } from './auth.guard';

const usersRoutes: Routes = [
  {
    path: ':id',
    component: UserDetails,
  },
];

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'users',
    canActivate: [authGuard],
    component: UserList,
    children: [...usersRoutes],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
