import type { FirebaseOptions } from 'firebase/app';

export const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyCpQSHxH1sX7P-Ge1Fj1-539cfsPpfIPW8',
  authDomain: 'fmi-frameworks.firebaseapp.com',
  projectId: 'fmi-frameworks',
  storageBucket: 'fmi-frameworks.firebasestorage.app',
  messagingSenderId: '846303108992',
  appId: '1:846303108992:web:84ec7e81a839dbfa48ab65',
};

/** Default Auth emulator URL (`firebase emulators:start` — port 9099). */
export const authEmulatorUrl = 'http://127.0.0.1:9099';
