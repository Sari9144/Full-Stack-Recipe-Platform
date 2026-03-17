
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/services/aunth.service';
import { Router, RouterModule } from '@angular/router'; // הוספת RouterModule
import { CommonModule } from '@angular/common';
import { User } from '../../model';
import Swal from 'sweetalert2'; // מומלץ להתקין: npm install sweetalert2
import { AppButtonComponent } from '../buton-basic/buton-basic.component';

interface LoginResponse {
  user: User;
  message?: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule,AppButtonComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isSubmitting = false;
  errorMessage = '';

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: LoginResponse) => {
        // הצלחה - הודעה יוקרתית
        const toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        });
        
        toast.fire({
          icon: 'success',
          title: `ברוכה השבה, ${res.user.username}!`,
          text: 'המטבח כבר מחכה לך...'
        });

        setTimeout(() => this.router.navigate(['/home']), 2000);
      },
      error: (err) => {
        this.isSubmitting = false;
        const serverError = err.error;

        if (err.status === 404 && serverError.action === 'redirect_to_register') {
          Swal.fire({
            title: 'עדיין לא רשומה?',
            text: 'לא מצאנו את הפרטים שלך, רוצה להצטרף למשפחה?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'כן, להרשמה',
            cancelButtonText: 'אולי אחר כך',
            confirmButtonColor: '#8c6d31'
          }).then((result) => {
            if (result.isConfirmed) this.router.navigate(['/register']);
          });
        } else {
          this.errorMessage = serverError.message || 'סיסמה שגויה או תקלה בשרת';
        }
      }
    });
  }
}