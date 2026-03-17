

import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/services/aunth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { User } from '../../model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // בניית הטופס עם טיפוס חזק
  registerForm = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    role: ['Reader'] as [User['role']]
  });

  onSubmit(): void {
    if (!this.registerForm.valid) return;

    const registerData = this.registerForm.getRawValue();

    this.authService.register(registerData).subscribe({
      next: (res) => {
        // הצלחה - SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'נרשמת בהצלחה!',
          text: 'ברוך הבא למערכת',
          confirmButtonColor: '#3085d6'
        }).then(() => {
          this.router.navigate(['/home']);
        });
      },
      error: (err) => {
        console.error('Registration error:', err);

        // קביעת ההודעה לפי סוג השגיאה
        let msg = '';
        if (err.status === 409) {
          msg = 'האימייל או שם המשתמש כבר קיימים במערכת.';
        } else {
          msg = err.error?.message || 'שגיאה בתהליך הרישום, נסה שוב מאוחר יותר.';
        }

        // שגיאה - SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'שגיאה',
          text: msg,
          confirmButtonColor: '#d33'
        });
      }
    });
  }
}
