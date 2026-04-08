import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

import firebaseConfig from './firebase.config';

/** Use in TestBed so `inject(Auth)` / AuthService work without the full app config. */
export const firebaseTestProviders = [
  provideFirebaseApp(() => initializeApp(firebaseConfig)),
  provideAuth(() => getAuth()),
];
