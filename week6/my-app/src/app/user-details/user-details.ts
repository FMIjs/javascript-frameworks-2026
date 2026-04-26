import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';
import { Person } from '../types/person';
import { Highlight } from '../highlight';
import { PersonNamePipe } from '../person-name-pipe';

@Component({
  selector: 'app-user-details',
  imports: [Highlight, PersonNamePipe],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetails {
  person = input.required<Person>();

  randomStringOne = 'ala';
  randomStringTwo = 'bala';

  constructor() {
    effect(() => {
      setTimeout(() => {
        // Changing the value of the random strings will not trigger a change detection because its parameter of the pipe
        this.randomStringOne = Math.random().toString(36).substring(2, 15);
        this.randomStringTwo = Math.random().toString(36).substring(2, 15);
      }, 2000);
    });
  }
}
