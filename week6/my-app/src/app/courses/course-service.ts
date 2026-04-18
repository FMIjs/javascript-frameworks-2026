import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDocs,
  writeBatch,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth-service';
import { COURSES_COLLECTION, Course, SAMPLE_COURSES } from '../types/course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly firestore = inject(Firestore);
  private readonly coursesCollection = collection(this.firestore, COURSES_COLLECTION);

  /** All courses in the database; document ids mapped to `id`. */
  readonly courses$: Observable<Course[]> = collectionData(this.coursesCollection, {
    idField: 'id',
  }) as Observable<Course[]>;

  constructor() {
    this.authService.user$
      .pipe(
        filter((u): u is NonNullable<typeof u> => u != null),
        switchMap(() => this.seedIfEmpty()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({ error: (err) => console.error(err) });
  }

  /** Inserts {@link SAMPLE_COURSES} once when the collection has no documents. */
  async seedIfEmpty(): Promise<void> {
    const snapshot = await getDocs(this.coursesCollection);
    if (!snapshot.empty) {
      return;
    }
    const batch = writeBatch(this.firestore);
    for (const course of SAMPLE_COURSES) {
      const ref = doc(this.coursesCollection);
      batch.set(ref, course);
    }
    await batch.commit();
  }
}
