import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { routes } from './app.routes';
import firebaseConfig, { authEmulatorUrl } from './firebase.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => {
      const auth = getAuth();
      if (isDevMode()) {
        connectAuthEmulator(auth, authEmulatorUrl, { disableWarnings: true });
      }
      return auth;
    }),
    importProvidersFrom(MatSnackBarModule),
  ],
};
