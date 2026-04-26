# Step-by-step: Firebase authentication in Angular (demo script)

---

## Part A — Firebase & tooling (before code)

### 1. Create / choose a Firebase project

- In [Firebase Console](https://console.firebase.google.com), create a project (or pick an existing one).
- Add a **Web** app and copy the **client configuration** object (`apiKey`, `projectId`, etc.).

**Teaching point:** The web config is **not** a secret; real protection is **Security Rules**, **Auth settings**, and (for abuse) **App Check**.

### 2. Enable sign-in method

- **Build → Authentication → Sign-in method → Email/Password** → Enable.

### 3. Install npm packages (versions must match Angular major)

- `firebase`
- `@angular/fire` **same major as Angular** (e.g. Angular 21 → `@angular/fire@next` / 21.x until `latest` catches up)

```bash
npm install firebase @angular/fire@next
```

**Teaching point:** If npm reports a **peer dependency conflict**, align `@angular/common` / `@angular/core` with what `@angular/fire` expects.

### 4. (Optional) Firebase CLI for the Auth emulator

- `npm install -g firebase-tools` (or use `npx`)
- `firebase login` (correct Google account for the project)
- In the app folder: `firebase init` (Emulators + link project), **or** add `firebase.json` + `.firebaserc` with your `projectId` and emulator ports (Auth default **9099**).

```bash
firebase emulators:start --only auth
```

---

## Part B — Wire Firebase into Angular

### 5. Put config in one module

- Add e.g. `src/app/firebase.config.ts` exporting a typed `FirebaseOptions` object (and optionally `authEmulatorUrl`).

### 6. Register the Firebase app and Auth in `app.config.ts`

1. `provideFirebaseApp(() => initializeApp(firebaseConfig))` from `@angular/fire/app`.
2. `provideAuth(() => { ... return getAuth(); })` from `@angular/fire/auth`.
3. **Emulator (dev only):** inside the factory, if `isDevMode()`, call `connectAuthEmulator(auth, authEmulatorUrl, { disableWarnings: true })` **before** returning `auth`.

**Teaching point:** `connectAuthEmulator` must run **before** any auth usage, and production builds should **not** point at the emulator (`isDevMode()` is false for `ng build`).

### 7. (If using Angular Material on the login screen)

- Add `@angular/animations` and `provideAnimations()` in `app.config.ts`.
- Import a Material prebuilt theme in `styles.scss`, e.g. `@import '@angular/material/prebuilt-themes/azure-blue.css';`

---

## Part C — Auth API your features will use

### 8. `Auth` service (facade over Firebase Auth)

- Inject Firebase `Auth` (from `@angular/fire/auth`).
- Expose `user$ = authState(this.firebaseAuth)` so the UI and guards can react to sign-in / sign-out.
- Methods: `signInWithEmail(email, password)`, `logout()` → `signOut(...)`.

**Teaching point:** `user$` is the **single stream** for “who is logged in?” across the app.

---

## Part D — Routing: guard + login route

### 9. `authGuard` (`CanActivateFn`)

- Inject your `Auth` service and `Router`.
- Return `auth.user$.pipe(take(1), map(user => user ? true : router.createUrlTree(['/login'])))`.

**Teaching point:** `canActivate` runs when you **navigate into** a route. It does **not** run again when the user logs out **while staying on the same URL** — that needs a separate step (below).

### 10. `app.routes.ts`

- `path: 'login'` → `Login` component.
- `path: 'users'` → protected feature, `canActivate: [authGuard]`, plus any child routes.
- Wildcard `**` → e.g. `redirectTo: 'login'` (adjust to your preferred default).

---

## Part E — Login UI and “already signed in”

### 11. Login component

- Reactive form: email + password (validators).
- On submit: call `Auth.signInWithEmail`, then `router.navigateByUrl('/users')` (or your home route).
- Show Firebase errors in the template (e.g. `catch` → message signal).

### 12. Redirect away from `/login` when session exists

- In `Login`, subscribe to `auth.user$` (with `takeUntilDestroyed`). If `user` is truthy, `navigateByUrl('/users')`.

**Teaching point:** Otherwise, a restored session still leaves the URL on `/login` with the form visible.

---

## Part F — Sign-out while on a protected page

### 13. Root `App` component: logout navigation

- Subscribe to `auth.user$` with **`pairwise()`** and **`filter(([prev, curr]) => prev != null && curr === null)`**.
- If the current URL is `/users` or `/users/...`, `navigateByUrl('/login')`.

**Teaching point:** This handles “logged out in place” without relying on the guard re-running. **`pairwise`** avoids treating the initial `null` (before restore) as a logout.

### 14. Logout control in the shell

- Call `auth.logout()` from a button in `app.html` (or a toolbar). After sign-out, step 13 sends users to `/login`.

---

## Part G — Demo checklist (live)

1. Show **Firebase Console**: project, Auth enabled, Email/Password, (optional) emulator running.
2. Show **`firebase.config.ts`** + **`app.config.ts`** providers (app + auth + emulator gate).
3. Show **`Auth`** service: `user$`, sign-in, sign-out.
4. Show **`authGuard`**: `take(1)` + redirect to `/login`.
5. Open app **not signed in** → navigate to `/users` → blocked → `/login`.
6. Sign in → land on `/users`.
7. Refresh on `/users` → still in (persistence).
8. Open `/login` while signed in → redirected to `/users` (Login subscription).
9. From `/users`, click **Logout** → redirected to `/login`; list no longer the “real” session (step 13).

---

## Quick reference — files in this repo

| Concern                                         | Location                     |
| ----------------------------------------------- | ---------------------------- |
| Web config + emulator URL                       | `src/app/firebase.config.ts` |
| `provideFirebaseApp` / `provideAuth` / emulator | `src/app/app.config.ts`      |
| `user$`, sign-in, sign-out                      | `src/app/auth-service.ts`    |
| Route guard                                     | `src/app/auth.guard.ts`      |
| Routes                                          | `src/app/app.routes.ts`      |
| Login form + redirect if already user           | `src/app/login/`             |
| Logout-on-protected-URL                         | `src/app/app.ts`             |

---

## Optional discussion topics

- **Why not `.env` for web config?** Client bundle is public; use TS config + build-time substitution if you need per-environment values.
- **Guards vs resolvers vs services:** Guards gate **navigation**; ongoing session changes need **subscriptions** or explicit navigation after `signOut`.
