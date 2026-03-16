// // // import { Component, inject } from '@angular/core';
// // // import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// // // import { AuthService } from '../../services/services/auth.service';
// // // import { Router } from '@angular/router';

// // // @Component({
// // //   selector: 'app-register',
// // //   standalone: true,
// // //   imports: [ReactiveFormsModule],
// // //   templateUrl: './register.component.html',
// // //   styleUrls: ['./register.component.css']
// // // })
// // // export class RegisterComponent {
// // //   private fb = inject(FormBuilder);
// // //   private authService = inject(AuthService);
// // //   private router = inject(Router);

// // //   errorMessage = '';

// // //   // בניית הטופס לפי השדות במסד הנתונים
// // //   registerForm: FormGroup = this.fb.group({
// // //   username: ['', [Validators.required, Validators.minLength(2)]], // השדה החדש
// // //   email: ['', [Validators.required, Validators.email]],
// // //   password: ['', [Validators.required, Validators.minLength(3)]],
// // //   role: ['Reader']
// // // });
// // //   onSubmit() {
// // //     if (this.registerForm.valid) {
// // //       this.authService.register(this.registerForm.value).subscribe({
// // //         next: (res) => {
// // //           console.log('Registration success', res);
// // //           alert('נרשמת בהצלחה! כעת תוכל להתחבר.');
// // //           this.router.navigate(['/home']); // מעבר לדף כניסה אחרי הרשמה
// // //         },
// // //         error: (err) => {
// // //           console.error(err);
// // //           this.errorMessage = err.error?.message || 'שגיאה ברישום המשתמש';
// // //         }
// // //       });
// // //     }
// // //   }
// // // }

// // import { Component, inject } from '@angular/core';
// // import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// // import { AuthService } from '../../services/services/auth.service';
// // import { Router } from '@angular/router';
// // import { CommonModule } from '@angular/common'; // הוספת CommonModule עבור הודעות שגיאה ב-HTML

// // @Component({
// //   selector: 'app-register',
// //   standalone: true,
// //   imports: [ReactiveFormsModule, CommonModule],
// //   templateUrl: './register.component.html',
// //   styleUrls: ['../login/login.component.css']
// // })
// // export class RegisterComponent {
// //   private fb = inject(FormBuilder);
// //   private authService = inject(AuthService);
// //   private router = inject(Router);

// //   errorMessage = '';

// //   // בניית הטופס עם ולידציות
// //   registerForm: FormGroup = this.fb.group({
// //     username: ['', [Validators.required, Validators.minLength(2)]],
// //     email: ['', [Validators.required, Validators.email]],
// //     password: ['', [Validators.required, Validators.minLength(3)]],
// //     role: ['Reader'] // ערך ברירת מחדל
// //   });

// //   onSubmit() {
// //     if (this.registerForm.valid) {
// //       this.authService.register(this.registerForm.value).subscribe({
// //         next: (res) => {
// //           console.log('Registration success', res);
          
// //           // הודעה למשתמש
// //           alert('נרשמת בהצלחה! ברוך הבא למערכת.');
          
// //           // ה-AuthService כבר עדכן את העוגיה בזיכרון דרך ה-tap.
// //           // עוברים ישר לדף הבית כמשתמש מחובר.
// //           this.router.navigate(['/home']); 
// //         },
// //         error: (err) => {
// //           console.error('Registration error:', err);
          
// //           // טיפול בשגיאות מהשרת (למשל: אימייל כבר קיים)
// //           if (err.status === 409) {
// //             this.errorMessage = 'האימייל או שם המשתמש כבר קיימים במערכת.';
// //           } else {
// //             this.errorMessage = err.error?.message || 'שגיאה בתהליך הרישום, נסה שוב מאוחר יותר.';
// //           }
// //         }
// //       });
// //     }
// //   }
// // }

// import { Component, inject } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { AuthService } from '../../services/services/aunth.service';
// import { Router, RouterLink } from '@angular/router'; // הוספת RouterLink
// import { CommonModule } from '@angular/common';
// import { User } from '../../recipe.model'; // ייבוא הממשק

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule, RouterLink], // הוספת RouterLink לשימוש ב-HTML
//   templateUrl: './register.component.html',
//   styleUrls: ['../login/login.component.css']
// })
// export class RegisterComponent {
//   private fb = inject(FormBuilder);
//   private authService = inject(AuthService);
//   private router = inject(Router);

//   errorMessage: string = '';

//   // בניית הטופס עם טיפוס חזק
//   registerForm = this.fb.nonNullable.group({
//     username: ['', [Validators.required, Validators.minLength(2)]],
//     email: ['', [Validators.required, Validators.email]],
//     password: ['', [Validators.required, Validators.minLength(3)]],
//     role: ['Reader'] as [User['role']] // הגדרת ה-Role לפי הטיפוסים המותרים במודל
//   });

//   onSubmit(): void {
//     if (this.registerForm.valid) {
//       // חילוץ הערכים בצורה בטוחה
//       const registerData = this.registerForm.getRawValue();

//       this.authService.register(registerData).subscribe({
//         next: (res) => {
//           console.log('Registration success', res);
//           alert('נרשמת בהצלחה! ברוך הבא למערכת.');
//           this.router.navigate(['/home']); 
//         },
//         error: (err) => {
//           console.error('Registration error:', err);
//           if (err.status === 409) {
//             this.errorMessage = 'האימייל או שם המשתמש כבר קיימים במערכת.';
//           } else {
//             this.errorMessage = err.error?.message || 'שגיאה בתהליך הרישום, נסה שוב מאוחר יותר.';
//           }
//         }
//       });
//     }
//   }
// }

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
