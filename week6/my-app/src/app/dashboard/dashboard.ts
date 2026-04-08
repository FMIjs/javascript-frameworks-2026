import { Component, inject } from '@angular/core';
import { AnotherCounter } from '../another-counter/another-counter';
import { Counter } from '../counter/counter';
import { CounterService } from '../counter-service';
import { ObservablesDemo } from '../observables-demo/observables-demo';

@Component({
  selector: 'app-dashboard',
  imports: [ObservablesDemo],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}
