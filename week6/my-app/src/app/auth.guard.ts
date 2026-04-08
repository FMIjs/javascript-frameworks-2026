import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Auth } from './auth';

/** Runs only when navigating *to* this route — not when auth changes in place (see `App` for logout redirect). */
export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);
  return auth.user$.pipe(
    take(1),
    map((user) => (user ? true : router.createUrlTree(['/login']))),
  );
};
