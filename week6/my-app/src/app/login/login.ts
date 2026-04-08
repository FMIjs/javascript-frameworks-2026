import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { startWith } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);

  readonly form = this.formBuilder.group({
    email: ['diana@test.com', []],
    password: ['', []],
    type: this.formBuilder.nonNullable.control<'email' | 'google'>('email', {
      validators: [Validators.required],
    }),
  });

  constructor() {
    this.form.controls.type.valueChanges
      .pipe(startWith(this.form.controls.type.value), takeUntilDestroyed(this.destroyRef))
      .subscribe((type) => this.syncValidatorsForLoginType(type));
  }

  private syncValidatorsForLoginType(type: 'email' | 'google'): void {
    const emailCtrl = this.form.controls.email;
    const passwordCtrl = this.form.controls.password;
    if (type === 'email') {
      emailCtrl.setValidators([Validators.required, Validators.email]);
      passwordCtrl.setValidators([Validators.required, Validators.minLength(6)]);
    } else {
      emailCtrl.clearValidators();
      passwordCtrl.clearValidators();
    }
    emailCtrl.updateValueAndValidity({ emitEvent: false });
    passwordCtrl.updateValueAndValidity({ emitEvent: false });
  }

  loginHandler = () => {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.authService.login(
      this.form.value.email!,
      this.form.value.password!,
      this.form.value.type!,
    );
  };
}
