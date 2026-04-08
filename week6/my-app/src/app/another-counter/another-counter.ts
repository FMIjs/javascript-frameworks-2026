import { Component, inject } from '@angular/core';
import { CounterService } from '../counter-service';

@Component({
  selector: 'app-another-counter',
  imports: [],
  templateUrl: './another-counter.html',
  styleUrl: './another-counter.scss',
})
export class AnotherCounter {
  protected readonly counterService = inject(CounterService);

  protected readonly counterSignal = this.counterService.counterMessage;
}
