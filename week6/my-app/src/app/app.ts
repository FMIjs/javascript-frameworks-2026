import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { AuthService } from './auth-service';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, pairwise, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Dashboard, AsyncPipe],
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
    this.user$.pipe(pairwise(), takeUntilDestroyed(this.destroyRef)).subscribe(([prev, curr]) => {
      if (prev && !curr) {
        this.router.navigate(['/login']);
      } else if (!prev && curr) {
        this.router.navigateByUrl('/users');
      }
    });

    // Same idea, different operator
    // this.user$
    //   .pipe(
    //     distinctUntilChanged((prev, curr) => prev?.email === curr?.email),
    //     takeUntilDestroyed(this.destroyRef),
    //   )
    //   .subscribe((user) => {
    //     if (!user) {
    //       this.router.navigate(['/login']);
    //     } else {
    //       this.router.navigateByUrl('/users');
    //     }
    //   });
  }
}
