import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { CounterService } from '../counter-service';
import { Person } from '../types/person';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-counter',
  imports: [NgClass, NgStyle],
  templateUrl: './counter.html',
  styleUrl: './counter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Counter {
  title = input.required<string>();
  counterChange = output<{ message: string }>();

  protected readonly persons = signal<Person[]>([]);
  protected readonly counterClasses = computed(() => ({
    'padding-10': true,
    'red-border': this.counterValue() > 0,
    'green-border': this.counterValue() > 5,
    'blue-border': this.counterValue() > 10,
  }));

  protected readonly counterService = inject(CounterService);
  protected readonly counterValue = this.counterService.counterValue;
  protected readonly counterMessage = this.counterService.counterMessage;
}
