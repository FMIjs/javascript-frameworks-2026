import { Routes } from '@angular/router';
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
    path: 'users',
    component: UserList,
    children: [...usersRoutes],
  },
  {
    path: '**',
    redirectTo: 'users',
  },
];
