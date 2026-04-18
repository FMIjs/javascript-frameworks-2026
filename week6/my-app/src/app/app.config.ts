import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp } from '@angular/fire/app';
import { getApp, initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { connectFirestoreEmulator, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { routes } from './app.routes';
import firebaseConfig, {
  authEmulatorUrl,
  firestoreEmulatorHost,
  firestoreEmulatorMockUserId,
  firestoreEmulatorPort,
} from './firebase.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => {
      const auth = getAuth(getApp());
      // if (isDevMode()) {
      //   connectAuthEmulator(auth, authEmulatorUrl, { disableWarnings: true });
      // }
      return auth;
    }),
    provideFirestore(() => {
      const app = getApp();
      const db = getFirestore(app);
      // if (isDevMode()) {
      //   connectFirestoreEmulator(db, firestoreEmulatorHost, firestoreEmulatorPort, {
      //     mockUserToken: { user_id: firestoreEmulatorMockUserId },
      //   });
      // }
      return db;
    }),
    importProvidersFrom(MatSnackBarModule),
  ],
};
