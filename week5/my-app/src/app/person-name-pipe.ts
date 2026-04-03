import { Pipe, PipeTransform } from '@angular/core';
import { Person } from './types/person';

@Pipe({
  name: 'personName',
})
export class PersonNamePipe implements PipeTransform {
  transform(value: Person, ...args: unknown[]): unknown {
    if (args.length > 0) {
      return `${value.firstName} ${value.lastName} ${args.join(', ')}`;
    }
    return `${value.firstName} ${value.lastName}`;
  }
}
