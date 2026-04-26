import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { from } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth-service';

/**
 * Waits for Firebase Auth to finish restoring persistence, then checks the current user.
 * Avoids treating a briefly-unknown session as logged out (see `App` for post-login redirect).
 */
export const authGuard: CanActivateFn = () => {
  const firebaseAuth = inject(Auth);
  const authService = inject(AuthService);
  const router = inject(Router);
  return from(firebaseAuth.authStateReady()).pipe(
    switchMap(() => authService.user$.pipe(take(1))),
    map((user) => (user ? true : router.createUrlTree(['/login']))),
  );
};
