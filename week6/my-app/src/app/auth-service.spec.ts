import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth-service';
import { firebaseTestProviders } from './firebase-test-providers';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...firebaseTestProviders],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
