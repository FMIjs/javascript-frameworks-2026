import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { Login } from './login/login';
import { UserList } from './user-list/user-list';
import { UserDetails } from './user-details/user-details';

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
    component: UserList,
    canActivate: [authGuard],
    children: [...usersRoutes],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
