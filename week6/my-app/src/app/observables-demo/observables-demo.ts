import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnDestroy, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { interval, of, Subject } from 'rxjs';
import { map, take, takeUntil, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-observables-demo',
  imports: [MatCardModule, AsyncPipe, JsonPipe],
  templateUrl: './observables-demo.html',
  styleUrl: './observables-demo.scss',
})
export class ObservablesDemo implements OnDestroy {
  private readonly destroyRef = inject(DestroyRef);

  readonly mapFilterResult = signal<string>('…');
  readonly takeOneResult = signal<string>('…');
  readonly ofWithMapResult = signal<string>('…');
  readonly tickCount = signal<number | null>(null);

  readonly myFirstSubject = new Subject<number>();
  readonly myFirstObservable$ = this.myFirstSubject.asObservable();

  readonly myDestroyRef = new Subject<void>();

  readonly myInterval$ = interval(1000).pipe(
    map((n) => 'tick ' + n),
    takeUntil(this.myDestroyRef.asObservable()),
  );

  constructor() {
    this.myFirstSubject.next(1);
    setTimeout(() => {
      this.myFirstSubject.next(2);
    }, 1000);
    setTimeout(() => {
      this.myFirstSubject.next(3);
    }, 2000);
    setTimeout(() => {
      this.myFirstSubject.next(4);
    }, 3000);
    setTimeout(() => {
      this.myFirstSubject.next(5);
    }, 4000);

    // this.myFirstObservable$
    //   .pipe(
    //     map((n) => n * 2),
    //     // filter((n) => n > 5),
    //     // toArray(),
    //     takeUntilDestroyed(this.destroyRef),
    //   )
    //   .subscribe((arr) => {
    //     console.log(arr);

    //     //this.mapFilterResult.set(arr.join(', '));
    //   });

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
      .pipe(takeUntil(this.myDestroyRef.asObservable()))
      .subscribe((n) => this.tickCount.set(n + 1));
  }

  ngOnDestroy(): void {
    this.myDestroyRef.next();
    this.myDestroyRef.complete();
    this.myDestroyRef.unsubscribe();
  }
}
