import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { User } from '@angular/fire/auth';
import { AuthService } from './auth-service';
import { CourseService } from './courses/course-service';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, AsyncPipe, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('my-app');
  protected readonly authService = inject(AuthService);
  protected readonly router = inject(Router);
  protected readonly destroyRef = inject(DestroyRef);

  protected readonly user$ = this.authService.user$;

  constructor() {
    inject(CourseService);

    /** Prior emit from auth; used only to detect logout (was signed in, now signed out). */
    let priorUser: User | null | undefined;

    this.user$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((user) => {
      const path = this.router.url.split('?')[0];

      if (user && path === '/login') {
        void this.router.navigateByUrl('/users');
      } else if (priorUser != null && !user) {
        void this.router.navigate(['/login']);
      }

      priorUser = user;
    });
  }
}
