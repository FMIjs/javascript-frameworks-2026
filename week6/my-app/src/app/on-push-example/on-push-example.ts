import { ChangeDetectionStrategy, Component, effect } from '@angular/core';
import { Person } from '../types/person';

@Component({
  selector: 'app-on-push-example',
  imports: [],
  templateUrl: './on-push-example.html',
  styleUrl: './on-push-example.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnPushExample {
  person: Person = {
    name: 'John',
    firstName: 'John',
    lastName: 'Doe',
    age: 20,
  };

  constructor() {
    effect(() => {
      setTimeout(() => {
        this.person.name = 'Jane';
      }, 2000);
    });
  }
}
