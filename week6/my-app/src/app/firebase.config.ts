const firebaseConfig = {
  apiKey: 'AIzaSyCpQSHxH1sX7P-Ge1Fj1-539cfsPpfIPW8',
  authDomain: 'fmi-frameworks.firebaseapp.com',
  projectId: 'fmi-frameworks',
  storageBucket: 'fmi-frameworks.firebasestorage.app',
  messagingSenderId: '846303108992',
  appId: '1:846303108992:web:84ec7e81a839dbfa48ab65',
};

export default firebaseConfig;

export const authEmulatorUrl = 'http://localhost:9099';

/** Host and port for `connectFirestoreEmulator` in development. */
export const firestoreEmulatorHost = 'localhost';
export const firestoreEmulatorPort = 8080;

/**
 * When set as `connectFirestoreEmulator(..., { mockUserToken })`, every Firestore request to the
 * emulator carries a synthetic JWT so rules see `request.auth`. Without this, the JS SDK often
 * wires Auth and Firestore such that the emulator still logs “missing auth” on requests.
 * Production builds do not use this option.
 */
export const firestoreEmulatorMockUserId = 'emulator-rules-user';
