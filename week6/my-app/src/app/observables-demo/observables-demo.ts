import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { interval, of } from 'rxjs';
import { filter, map, take, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-observables-demo',
  imports: [MatCardModule],
  templateUrl: './observables-demo.html',
  styleUrl: './observables-demo.scss',
})
export class ObservablesDemo {
  private readonly destroyRef = inject(DestroyRef);

  readonly mapFilterResult = signal<string>('…');
  readonly takeOneResult = signal<string>('…');
  readonly ofWithMapResult = signal<string>('…');
  readonly tickCount = signal<number | null>(null);

  constructor() {
    of(1, 2, 3, 4, 5)
      .pipe(
        map((n) => n * 2),
        filter((n) => n > 5),
        toArray(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((arr) => this.mapFilterResult.set(arr.join(', ')));

    of('first', 'second', 'third')
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe((v) => this.takeOneResult.set(v));

    of(10, 20, 30)
      .pipe(
        map((n) => n + 1),
        toArray(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((arr) => this.ofWithMapResult.set(arr.join(', ')));

    interval(1000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((n) => this.tickCount.set(n + 1));
  }
}
