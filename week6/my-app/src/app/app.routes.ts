import { Routes } from '@angular/router';
import { UserList } from './user-list/user-list';
import { UserDetails } from './user-details/user-details';
import { Login } from './login/login';
import { CoursesList } from './courses/courses-list/courses-list';
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
    path: 'courses',
    canActivate: [authGuard],
    component: CoursesList,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
