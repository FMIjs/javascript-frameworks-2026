import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Auth,
  authState,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, distinctUntilChanged, from, of, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected readonly auth = inject(Auth);
  protected readonly snackBar = inject(MatSnackBar);
  protected readonly destroyRef = inject(DestroyRef);
  readonly user$ = authState(this.auth).pipe(
    takeUntilDestroyed(this.destroyRef),
    distinctUntilChanged((prev: User | null, curr: User | null) => prev?.uid === curr?.uid),
    tap((x) => (x ? console.log(x) : console.log('no user'))),
    shareReplay(1),
  );

  login(email: string, password: string, type: 'email' | 'google'): void {
    const signIn$ =
      type === 'email'
        ? from(signInWithEmailAndPassword(this.auth, email, password))
        : from(signInWithPopup(this.auth, new GoogleAuthProvider()));

    signIn$
      .pipe(
        catchError((error: unknown) => {
          const message =
            error instanceof Error ? error.message : 'Something went wrong. Please try again.';
          this.snackBar.open(message, 'Close', { duration: 3000 });
          return of(null);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  logout() {
    signOut(this.auth);
  }
}
