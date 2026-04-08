import { TestBed } from '@angular/core/testing';
import { Auth as FirebaseAuth } from '@angular/fire/auth';
import { Auth } from './auth';

describe('Auth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: FirebaseAuth, useValue: {} }],
    });
  });

  it('should be created', () => {
    expect(TestBed.inject(Auth)).toBeTruthy();
  });
});
