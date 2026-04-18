# Adding Cloud Firestore (Firebase) to this Angular app

This guide covers Firestore-specific setup: `firebase.json`, `firestore.rules`, `firebase.config.ts`, wiring **`provideFirestore`** in `app.config.ts`, **`firebase-test-providers.ts`**, and the **`courses`** example under `src/app/`.

**Firebase Authentication** (sign-in, `provideAuth`, guards) is documented separately in **[AUTHENTICATION-FLOW-GUIDE.md](./AUTHENTICATION-FLOW-GUIDE.md)**.

## 1. Install dependencies

From the project root (`week6/my-app`):

```bash
npm install firebase @angular/fire
```

Use versions compatible with your Angular major (this app uses Angular 21 with `@angular/fire` 21 and `firebase` 12).

## 2. Firebase project and web app config

1. Open [Firebase Console](https://console.firebase.google.com/) and select your project.
2. Enable **Cloud Firestore** (Native mode) if you have not already.
3. Project settings → Your apps → **Web** (`</>`) → register or select the app → copy the **Firebase configuration object**.

## 3. Configuration file (`firebase.config.ts`)

Create or edit **`src/app/firebase.config.ts`**:

- Paste the **`firebaseConfig`** object (`apiKey`, `authDomain`, `projectId`, etc.).
- For **Firestore emulator**–only helpers, you can export `firestoreEmulatorHost`, `firestoreEmulatorPort`, and optionally `firestoreEmulatorMockUserId` (see step 6).

Treat `apiKey` as a client identifier, not a secret—prefer environment-specific config for public repos.

Default-export `firebaseConfig` for use in `app.config.ts`.

## 4. Register the Firebase app and Firestore (`app.config.ts`)

Firestore expects a Firebase **app** instance first, then Firestore:

1. **`provideFirebaseApp`** — `initializeApp(firebaseConfig)` from `firebase/app`.
2. **`provideFirestore`** — `getFirestore(getApp())` from `@angular/fire/firestore`.

Optionally wrap **`connectFirestoreEmulator(...)`** in **`isDevMode()`** when you use the local Firestore emulator (see step 6).

Other Firebase products (for example **Authentication**) are registered the same way with their own `provide*` functions—follow **[AUTHENTICATION-FLOW-GUIDE.md](./AUTHENTICATION-FLOW-GUIDE.md)** for that part of `app.config.ts`.

## 5. Security rules and `firebase.json`

**Why `firestore.rules`:** Firestore evaluates every request against these rules. Deploy them so production matches what you intend.

1. Add **`firestore.rules`** at the project root (next to `firebase.json`). Example for a `courses` collection: public reads, writes only when `request.auth != null` (the `request.auth` field is filled when your client is signed in per your auth setup).
2. In **`firebase.json`**, reference the rules file:

```json
"firestore": {
  "rules": "firestore.rules"
}
```

3. Deploy:

```bash
firebase login
firebase deploy --only firestore
```

Use the same **project** as in `firebase.config.ts` (`projectId`).

## 6. Optional: Firestore Emulator

For local, offline Firestore:

1. **`firebase.json`** — under `"emulators"`, add a **firestore** entry (e.g. port `8080`) and enable **UI** if you like. You can run **only** Firestore with `firebase emulators:start --only firestore`, or run multiple emulators if your workflow uses them.
2. **`package.json`** — e.g. `"emulator": "firebase emulators:start --only firestore"` (adjust flags to match what you start locally).
3. In **`app.config.ts`**, in development only, call **`connectFirestoreEmulator(db, host, port, options)`** after **`getFirestore`**. Use **`isDevMode()`** so production builds never target `localhost`.
4. If the emulator shows **missing auth** in requests while rules need `request.auth`, you can pass **`mockUserToken`** on **`connectFirestoreEmulator`** (see `firestoreEmulatorMockUserId` in `firebase.config.ts`) for local rules testing. Production builds should not use `mockUserToken`.
5. Prefer **`127.0.0.1`** over **`localhost`** for the emulator host if you hit IPv4/IPv6 issues.

```bash
npm run emulator
```

## 7. Firestore feature: `courses` (this repo)

- **`src/app/types/course.ts`** — `Course` shape, collection name constant, optional `SAMPLE_COURSES` for seeding.
- **`src/app/courses/course-service.ts`** — injects **`Firestore`**, builds the **`courses`** collection, exposes **`courses$`** with **`collectionData(..., { idField: 'id' })`**, and runs **`seedIfEmpty()`** when the app’s session indicates a signed-in user (same timing as the rest of the app’s auth flow).
- **`src/app/app.ts`** — **`inject(CourseService)`** in the root constructor so the service starts with the app.

## 8. Checklist

| Step          | Action                                                         |
| ------------- | -------------------------------------------------------------- |
| Packages      | `firebase`, `@angular/fire` installed                          |
| Config        | `firebase.config.ts` matches your Firebase web app             |
| App bootstrap | `provideFirebaseApp` + `provideFirestore` in `app.config.ts`   |
| Rules         | `firestore.rules`; `firebase deploy --only firestore`          |
| Emulator      | Optional: `firebase.json`, dev-only `connectFirestoreEmulator` |
| Data layer    | Collections + services (`courses` example)                     |

---

**References:** [AngularFire](https://github.com/angular/angularfire), [Firestore](https://firebase.google.com/docs/firestore), [Security rules](https://firebase.google.com/docs/firestore/security/get-started), [Firestore emulator](https://firebase.google.com/docs/emulator-suite/connect_firestore).
