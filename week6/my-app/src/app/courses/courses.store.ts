import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { pipe, switchMap, tap } from 'rxjs';
import { CourseService } from './course-service';
import { Course } from '../types/course';

/**
 * Holds course entities (mirrored from Firestore) and which course id is being edited.
 * UI opens the edit dialog when `editingCourseId` is set and the entity exists in the collection.
 */
export const CoursesStore = signalStore(
  withEntities<Course>(),
  withState({
    editingCourseId: null as string | null,
  }),
  withComputed(({ entities, editingCourseId }) => ({
    courseUnderEdit: () => {
      const id = editingCourseId();
      if (id == null) {
        return undefined;
      }
      return entities().find((c) => c.id === id);
    },
  })),
  withMethods((store) => {
    const courseService = inject(CourseService);
    return {
      /** Subscribes to Firestore and keeps the entity collection in sync. */
      loadCourses: rxMethod<void>(
        pipe(
          switchMap(() =>
            courseService.courses$.pipe(
              tap((courses) => patchState(store, setAllEntities(courses))),
            ),
          ),
        ),
      ),

      startEditing(courseId: string): void {
        patchState(store, { editingCourseId: courseId });
      },

      finishEditing(): void {
        patchState(store, { editingCourseId: null });
      },
    };
  }),
  withHooks({
    onDestroy(store) {
      patchState(store, { editingCourseId: null });
    },
  }),
);
