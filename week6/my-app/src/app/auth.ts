import { Injectable, inject } from '@angular/core';
import {
  Auth as FirebaseAuth,
  authState,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly firebaseAuth = inject(FirebaseAuth);

  /** Emits the signed-in user, or `null` when signed out. */
  readonly user$ = authState(this.firebaseAuth);

  signInWithEmail(email: string, password: string) {
    return signInWithEmailAndPassword(this.firebaseAuth, email.trim(), password);
  }

  logout() {
    return signOut(this.firebaseAuth);
  }
}
