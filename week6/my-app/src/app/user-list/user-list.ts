import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  Input,
  input,
  signal,
  Signal,
} from '@angular/core';
import { Person } from '../types/person';
import { UserDetails } from '../user-details/user-details';

@Component({
  selector: 'app-user-list',
  imports: [UserDetails],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserList {
  protected readonly people = signal<Person[]>([]);
  constructor() {
    effect(() => {
      // load data from server
      this.people.set([
        { name: 'John', firstName: 'John', lastName: 'Doe', age: 20 },
        { name: 'Jane', firstName: 'Jane', lastName: 'Doe', age: 21 },
        { name: 'Jim', firstName: 'Jim', lastName: 'Doe', age: 22 },
        { name: 'Jill', firstName: 'Jill', lastName: 'Doe', age: 23 },
        { name: 'Jack', firstName: 'Jack', lastName: 'Doe', age: 24 },
        { name: 'Jill', firstName: 'Jill', lastName: 'Doe', age: 25 },
        { name: 'Jack', firstName: 'Jack', lastName: 'Doe', age: 26 },
        { name: 'Jill', firstName: 'Jill', lastName: 'Doe', age: 27 },
        { name: 'Jack', firstName: 'Jack', lastName: 'Doe', age: 28 },
        { name: 'Jill', firstName: 'Jill', lastName: 'Doe', age: 29 },
        { name: 'Jack', firstName: 'Jack', lastName: 'Doe', age: 30 },
      ]);
    });
  }
}
