import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Course } from '../../types/course';

@Component({
  selector: 'app-course-edit-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './course-edit-dialog.html',
  styleUrl: './course-edit-dialog.scss',
})
export class CourseEditDialog {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<CourseEditDialog, Course | undefined>);
  private readonly course = inject<Course>(MAT_DIALOG_DATA);

  readonly form = this.fb.nonNullable.group({
    title: [this.course.title, [Validators.required]],
    description: [this.course.description],
    credits: [this.course.credits, [Validators.required, Validators.min(1)]],
  });

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    this.dialogRef.close({
      ...this.course,
      title: v.title,
      description: v.description,
      credits: v.credits,
    });
  }
}
