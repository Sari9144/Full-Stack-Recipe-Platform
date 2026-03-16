// // // import { inject } from '@angular/core';
// // // import { CanActivateFn, Router } from '@angular/router';
// // // import { AuthService } from './services/services/auth.service';

// // // /**
// // //  * שומר סף גנרי שבודק תפקיד משתמש
// // //  * @param expectedRole התפקיד הנדרש כדי להיכנס לנתיב
// // //  */
// // // export const roleGuard = (expectedRole: string): CanActivateFn => {
// // //   return () => {
// // //     const authService = inject(AuthService);
// // //     const router = inject(Router);
// // //     const user = authService.currentUser;

// // //     // 1. בדיקה האם המשתמש מחובר בכלל
// // //     if (!user) {
// // //       router.navigate(['/login']);
// // //       return false;
// // //     }

// // //     // 2. בדיקה האם המשתמש הוא מנהל (מנהל תמיד יכול להיכנס)
// // //     if (user.role === 'Admin') {
// // //       return true;
// // //     }

// // //     // 3. בדיקה האם התפקיד של המשתמש תואם לתפקיד המצופה
// // //     if (user.role === expectedRole) {
// // //       return true;
// // //     }

// // //     // אם אין הרשאה - שלח אותו לדף הבית
// // //     alert('אין לך הרשאה לגשת לדף זה');
// // //     router.navigate(['/']);
// // //     return false;
// // //   };
// // // };

// // import { inject } from '@angular/core';
// // import { CanActivateFn, Router } from '@angular/router';
// // import { AuthService } from './services/services/auth.service';

// // /**
// //  * שומר סף גנרי שבודק האם למשתמש יש את התפקיד המתאים
// //  * @param expectedRoles מערך של תפקידים מורשים (למשל: ['Admin', 'Uploader'])
// //  */
// // export const roleGuard = (expectedRoles: string[]): CanActivateFn => {
// //   return () => {
// //     const authService = inject(AuthService);
// //     const router = inject(Router);
    
// //     // שימוש ב-currentUserValue כדי לקבל את המידע מהעוגיה/Subject
// //     const user = authService.currentUserValue;

// //     // 1. בדיקה האם המשתמש מחובר בכלל
// //     if (!user) {
// //       console.warn('Access denied: No user logged in.');
// //       router.navigate(['/login']);
// //       return false;
// //     }

// //     // 2. בדיקה האם המשתמש הוא מנהל (מנהל תמיד מקבל גישה לכל מקום)
// //     if (user.role === 'Admin') {
// //       return true;
// //     }

// //     // 3. בדיקה האם התפקיד של המשתמש כלול ברשימת התפקידים המותרים
// //     if (expectedRoles.includes(user.role)) {
// //       return true;
// //     }

// //     // אם הגענו לכאן - אין הרשאה
// //     console.error(`Access denied: User role '${user.role}' is not in [${expectedRoles}]`);
// //     alert('אין לך הרשאה לגשת לדף זה');
// //     router.navigate(['/']);
// //     return false;
// //   };
// // };

// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from './services/services/aunth.service';

// /**
//  * שומר סף גנרי שבודק האם למשתמש יש את התפקיד המתאים
//  * @param expectedRoles מערך של תפקידים מורשים (למשל: ['Admin', 'Uploader'])
//  */
// export const roleGuard = (expectedRoles: string[]): CanActivateFn => {
//   return () => {
//     const authService = inject(AuthService);
//     const router = inject(Router);
    
//     // שימוש ב-currentUserValue כדי לקבל את המידע מהעוגיה/Subject
//     const user = authService.currentUserValue;

//     // 1. בדיקה האם המשתמש מחובר בכלל
//     if (!user) {
//       console.warn('Access denied: No user logged in.');
//       router.navigate(['/login']);
//       return false;
//     }

//     // 2. בדיקה האם המשתמש הוא מנהל (מנהל תמיד מקבל גישה לכל מקום)
//     if (user.role === 'Admin') {
//       return true;
//     }

//     // 3. בדיקה האם התפקיד של המשתמש כלול ברשימת התפקידים המותרים
//     if (user.role && expectedRoles.includes(user.role)) {
//     return true;
// } 
    

//     // אם הגענו לכאן - אין הרשאה
//     console.error(`Access denied: User role '${user.role}' is not in [${expectedRoles}]`);
//     alert('אין לך הרשאה לגשת לדף זה');
//     router.navigate(['/']);
//     return false;
//   };
// };

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/services/aunth.service';
import Swal from 'sweetalert2'; // ייבוא הספריה

export const roleGuard = (expectedRoles: string[]): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const user = authService.currentUserValue;

    // 1. בדיקה האם המשתמש מחובר
    if (!user) {
      router.navigate(['/login']);
      return false;
    }

    // 2. מנהל (Admin) תמיד מורשה
    if (user.role === 'Admin') {
      return true;
    }

    // 3. בדיקת הרשאה לפי תפקיד
    if (user.role && expectedRoles.includes(user.role)) {
      return true;
    }

    // --- אם הגענו לכאן, אין הרשאה - נקפיץ SweetAlert מעוצב ---
    Swal.fire({
      title: 'גישה נחסמה!',
      text: 'מצטערים, אין לך הרשאה מתאימה לצפייה בדף זה.',
      icon: 'error',
      confirmButtonText: 'חזרה לדף הבית',
      confirmButtonColor: '#ff5722', // צבע דגש כתום/אדום
      background: '#ffffff',
      heightAuto: false, // מונע קפיצות מוזרות ב-UI
      customClass: {
        popup: 'rounded-canvas' // נוכל להוסיף CSS ייחודי למטה
      },
      showClass: {
        popup: 'animate__animated animate__fadeInDown' // אנימציית כניסה (אם מותקן animate.css)
      }
    });

    router.navigate(['/']);
    return false;
  };
};