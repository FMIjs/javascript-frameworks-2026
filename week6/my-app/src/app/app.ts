import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterOutlet } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { Auth } from './auth';
import { Dashboard } from './dashboard/dashboard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Dashboard, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('my-app');
  protected readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly user$ = this.auth.user$;

  constructor() {
    // canActivate only runs on navigation; signing out does not. Redirect when
    // auth goes from a user → null while still on a protected URL.
    this.auth.user$
      .pipe(
        pairwise(),
        filter(([prev, curr]) => prev != null && curr === null),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        const path = this.router.url.split('?')[0];
        if (path === '/users' || path.startsWith('/users/')) {
          void this.router.navigateByUrl('/login');
        }
      });
  }
}
