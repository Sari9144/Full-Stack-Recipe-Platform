// // // import { Component, inject } from '@angular/core';
// // // import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// // // import { AuthService } from '../../services/services/auth.service';

// // // @Component({
// // //   selector: 'app-login',
// // //   standalone: true,
// // //   imports: [ReactiveFormsModule], // אין צורך ב-CommonModule עבור @if
// // //   templateUrl: './login.component.html',
// // //   styleUrls: ['./login.component.css']
// // // })
// // // export class LoginComponent {
// // //   // שימוש ב-inject במקום ב-Constructor (סגנון מודרני של אנגולר)
// // //   private fb = inject(FormBuilder);
// // //   private authService = inject(AuthService);

// // //   loginForm: FormGroup = this.fb.group({
// // //     email: ['', [Validators.required, Validators.email]],
// // //     password: ['', [Validators.required, Validators.minLength(4)]]
// // //   });

// // //   errorMessage = '';

// // //   onSubmit() {
// // //     if (this.loginForm.valid) {
// // //       this.authService.login(this.loginForm.value).subscribe({
// // //         next: (res) => {
// // //           console.log('התחברת בהצלחה', res);
// // //           // כאן נוסיף בהמשך ניתוב לדף אחר
// // //         },
// // //         error: (err) => {
// // //           this.errorMessage = 'שגיאה בהתחברות, בדקי את הפרטים';
// // //         }
// // //       });
// // //     }
// // //   }
// // // }

// // import { Component, inject } from '@angular/core';
// // import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// // import { AuthService } from '../../services/services/auth.service';
// // import { Router } from '@angular/router'; // הוספנו את הראוטר


// // @Component({
// //   selector: 'app-login',
// //   standalone: true,
// //   imports: [ReactiveFormsModule],
// //   templateUrl: './login.component.html',
// //   styleUrls: ['./login.component.css']
// // })
// // export class LoginComponent {
// //   private fb = inject(FormBuilder);
// //   private authService = inject(AuthService);
// //   private router = inject(Router); // הזרקת הראוטר

// //   // הגדרת הטופס
// //   loginForm: FormGroup = this.fb.group({
// //     email: ['', [Validators.required, Validators.email]],
// //     password: ['', [Validators.required, Validators.minLength(3)]]
// //   });

// //   errorMessage = '';
// //   welcomeMessage = ''; // משתנה להצגת הודעת הצלחה בממשק

// //   onSubmit() {
// //     if (this.loginForm.valid) {
// //       this.authService.login(this.loginForm.value).subscribe({
// //         next: (res: any) => {
// //           // הצלחה: השרת מחזיר סטטוס 200
// //           this.errorMessage = '';
// //           this.welcomeMessage = res.message; // "שלום ל..." שמגיע מה-Python
          
// //           console.log('התחברת בהצלחה:', res.user);
          
// //           // אופציונלי: מעבר לדף הבית/לוח בקרה אחרי הצלחה
// //           setTimeout(() => this.router.navigate(['/home']), 1500);
// //         },
// //         error: (err) => {
// //           this.welcomeMessage = '';
// //           console.log('Status code received:', err.status);
// //     console.log('Body received:', err.error); // תראי אם יש כאן action: 'redirect_to_register'
// //           // בדיקה האם השרת החזיר 404 (משתמש לא נמצא)
// //           if (err.status === 401 && err.error.action === 'redirect_to_register') {
// //             console.log('משתמש לא קיים, עובר להרשמה');
// //             alert("!!משתמש לא קיים, יש להרשם ")
// //             this.router.navigate(['/register']);
// //           } else if (err.status === 401) {
// //             this.errorMessage = 'סיסמה שגויה, נסי שוב';
// //           } else {
// //             this.errorMessage = 'שגיאה בחיבור לשרת, נסי מאוחר יותר';
// //           }
// //         }
// //       });
// //     }
// //   }
// // }

// import { Component, inject } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { AuthService } from '../../services/services/auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [ReactiveFormsModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   private fb = inject(FormBuilder);
//   private authService = inject(AuthService);
//   private router = inject(Router);

//   loginForm: FormGroup = this.fb.group({
//     email: ['', [Validators.required, Validators.email]],
//     password: ['', [Validators.required, Validators.minLength(3)]]
//   });

//   errorMessage = '';
//   welcomeMessage = '';

//   onSubmit() {
//     if (this.loginForm.valid) {
//       this.authService.login(this.loginForm.value).subscribe({
//         next: (res: any) => {
//           this.errorMessage = '';
//           this.welcomeMessage = `שלום ${res.user.username}, התחברת בהצלחה!`;
          
//           console.log('User Data:', res.user);
          
//           // ניתוב לדף הבית לאחר הצלחה
//           setTimeout(() => this.router.navigate(['/home']), 1500);
//         },
//         error: (err) => {
//           this.welcomeMessage = '';
//           const serverError = err.error;

//           // 1. משתמש לא קיים - הפניה לרישום (סטטוס 404 כפי שהגדרנו בשרת)
//           if (err.status === 404 && serverError.action === 'redirect_to_register') {
//             console.log('Redirecting to register...');
//             alert(serverError.message || "משתמש לא קיים, עובר לדף הרשמה");
//             this.router.navigate(['/register']);
//           } 
//           // 2. סיסמה שגויה (סטטוס 401)
//           else if (err.status === 401) {
//             this.errorMessage = serverError.message || 'סיסמה שגויה, נסי שוב';
//           } 
//           // 3. שגיאות אחרות (שרת למטה וכדומה)
//           else {
//             this.errorMessage = 'שגיאה בתקשורת עם השרת, נסי שוב מאוחר יותר';
//           }
//         }
//       });
//     }
//   }
// }

// import { Component, inject } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { AuthService } from '../../services/services/auth.service';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common'; // הוספה לתמיכה בסימנים מותנים ב-HTML

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   private fb = inject(FormBuilder);
//   private authService = inject(AuthService);
//   private router = inject(Router);

//   // הגדרת הטופס עם ולידציה בסיסית
//   loginForm: FormGroup = this.fb.group({
//     email: ['', [Validators.required, Validators.email]],
//     password: ['', [Validators.required, Validators.minLength(3)]]
//   });

//   errorMessage = '';
//   welcomeMessage = '';

//   onSubmit() {
//     if (this.loginForm.valid) {
//       this.authService.login(this.loginForm.value).subscribe({
//         next: (res: any) => {
//           // הצלחה: ה-AuthService כבר מעדכן את העוגיה וה-Subject בתוך פונקציית ה-login (דרך ה-tap)
//           this.errorMessage = '';
//           this.welcomeMessage = `שלום ${res.user.username}, התחברת בהצלחה!`;
          
//           console.log('Login successful, user stored in cookie.');
          
//           // ניתוב לדף הבית לאחר השהייה קלה לצורך הצגת הודעת ברוך הבא
//           setTimeout(() => this.router.navigate(['/home']), 1500);
//         },
//         error: (err) => {
//           this.welcomeMessage = '';
//           const serverError = err.error;

//           // טיפול בשגיאות לפי סטטוסים מהשרת:
          
//           // 1. משתמש לא קיים (404) - הפניה להרשמה
//           if (err.status === 404 && serverError.action === 'redirect_to_register') {
//             alert(serverError.message || "משתמש לא קיים במערכת, עובר לדף הרשמה...");
//             this.router.navigate(['/register']);
//           } 
//           // 2. סיסמה שגויה או פרטים לא נכונים (401)
//           else if (err.status === 401) {
//             this.errorMessage = serverError.message || 'סיסמה שגויה, נסי שוב';
//           } 
//           // 3. בעיות תקשורת או שגיאות כלליות
//           else {
//             this.errorMessage = 'שגיאה בחיבור לשרת, נסי שוב מאוחר יותר';
//             console.error('Login Error:', err);
//           }
//         }
//       });
//     }
//   }
// }

// import { Component, inject } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { AuthService } from '../../services/services/aunth.service';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { User } from '../../recipe.model'; // ייבוא המודל

// /**
//  * ממשק פנימי המגדיר את המבנה הצפוי מהשרת בזמן התחברות
//  */
// interface LoginResponse {
//   user: User;
//   message?: string;
// }

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   private fb = inject(FormBuilder);
//   private authService = inject(AuthService);
//   private router = inject(Router);

//   // הגדרת הטופס עם ולידציה
//   loginForm: FormGroup = this.fb.group({
//     email: ['', [Validators.required, Validators.email]],
//     password: ['', [Validators.required, Validators.minLength(3)]]
//   });

//   errorMessage = '';
//   welcomeMessage = '';

//   onSubmit() {
//     if (this.loginForm.valid) {
//       // שליחת הנתונים לשרת עם טיפוס מוגדר ל-Response
//       this.authService.login(this.loginForm.value).subscribe({
//         next: (res: LoginResponse) => {
//           this.errorMessage = '';
//           // עכשיו TypeScript יודע שקיים שדה username בתוך user
//           this.welcomeMessage = `שלום ${res.user.username}, התחברת בהצלחה!`;
          
//           console.log('Login successful, user stored in cookie.');
          
//           // ניתוב לדף הבית לאחר השהייה קלה
//           setTimeout(() => this.router.navigate(['/home']), 1500);
//         },
//         error: (err) => {
//           this.welcomeMessage = '';
//           const serverError = err.error;

//           // טיפול בשגיאות לפי סטטוסים מהשרת
//           if (err.status === 404 && serverError.action === 'redirect_to_register') {
//             alert(serverError.message || "משתמש לא קיים במערכת, עובר לדף הרשמה...");
//             this.router.navigate(['/register']);
//           } 
//           else if (err.status === 401) {
//             this.errorMessage = serverError.message || 'סיסמה שגויה, נסי שוב';
//           } 
//           else {
//             this.errorMessage = 'שגיאה בחיבור לשרת, נסי שוב מאוחר יותר';
//             console.error('Login Error:', err);
//           }
//         }
//       });
//     }
//   }
// }
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