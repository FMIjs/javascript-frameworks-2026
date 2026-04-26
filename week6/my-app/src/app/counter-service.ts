import { computed, effect, Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  private readonly counterSignal = signal(0);
  counterMessage = computed(() =>
    this.counterSignal() === 0 ? 'Zero' : 'Value is ' + this.counterSignal(),
  );
  readonly counterValue = this.counterSignal.asReadonly();

  incrementCounter() {
    this.counterSignal.update((prev) => prev + 1);
  }

  decrementCounter() {
    this.counterSignal.update((prev) => prev - 1);
  }

  constructor() {
    effect(() => {
      // load data from server
    });
  }
}
