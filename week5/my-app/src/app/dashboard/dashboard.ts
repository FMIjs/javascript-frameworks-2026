import { Component, inject } from '@angular/core';
import { AnotherCounter } from '../another-counter/another-counter';
import { Counter } from '../counter/counter';
import { CounterService } from '../counter-service';

@Component({
  selector: 'app-dashboard',
  imports: [Counter, AnotherCounter],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  protected readonly counterService = inject(CounterService);

  counterChangeHandler(event: { message: string }) {
    const { message } = event;
    if (message === 'Increment') {
      this.counterService.incrementCounter();
    } else if (message === 'Decrement') {
      this.counterService.decrementCounter();
    }
  }
}
