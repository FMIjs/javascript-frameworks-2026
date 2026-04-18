import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { CourseService } from '../course-service';
import { CourseEditDialog } from '../course-edit-dialog/course-edit-dialog';
import { Course } from '../../types/course';

@Component({
  selector: 'app-courses-list',
  imports: [AsyncPipe, MatButtonModule, MatTableModule],
  templateUrl: './courses-list.html',
  styleUrl: './courses-list.scss',
})
export class CoursesList {
  private readonly courseService = inject(CourseService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly courses$ = this.courseService.courses$;
  protected readonly displayedColumns = ['title', 'description', 'credits', 'actions'] as const;

  edit(course: Course): void {
    const ref = this.dialog.open(CourseEditDialog, {
      width: '520px',
      data: course,
    });
    ref.afterClosed().subscribe((updated?: Course) => {
      if (!updated) {
        return;
      }
      void this.courseService.updateCourse(updated).then(
        () => this.snackBar.open('Course updated', 'Dismiss', { duration: 3000 }),
        () => this.snackBar.open('Could not update course', 'Dismiss', { duration: 4000 }),
      );
    });
  }

  async remove(course: Course): Promise<void> {
    const ok = globalThis.confirm(`Delete “${course.title}”?`);
    if (!ok) {
      return;
    }
    try {
      await this.courseService.deleteCourse(course.id);
      this.snackBar.open('Course deleted', 'Dismiss', { duration: 3000 });
    } catch {
      this.snackBar.open('Could not delete course', 'Dismiss', { duration: 4000 });
    }
  }
}
