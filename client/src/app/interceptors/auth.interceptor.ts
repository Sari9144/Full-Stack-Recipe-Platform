// // // import { HttpInterceptorFn } from '@angular/common/http';

// // // export const authInterceptor: HttpInterceptorFn = (req, next) => {
// // //   return next(req);
// // // };

// // import { HttpInterceptorFn } from '@angular/common/http';
// // import { inject } from '@angular/core';
// // import { AuthService } from '../../services/services/auth.service';

// // export const authInterceptor: HttpInterceptorFn = (req, next) => {
// //   const authService = inject(AuthService);
// //   const user = authService.currentUser;

// //   // אם המשתמש מחובר, נשכפל את הבקשה ונוסיף לה את ה-Header
// //   if (user && user.role) {
// //     const authReq = req.clone({
// //       setHeaders: {
// //         'x-user-role': user.role
// //       }
// //     });
// //     return next(authReq);
// //   }

// //   // אם המשתמש לא מחובר, נשלח את הבקשה המקורית כמו שהיא
// //   return next(req);
// // };


// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { AuthService } from '../../services/services/auth.service';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const authService = inject(AuthService);
  
//   // שימוש ב-currentUserValue כדי לקבל את המידע העדכני מה-BehaviorSubject
//   const user = authService.currentUserValue;

//   if (user && user.role) {
//     const authReq = req.clone({
//       setHeaders: {
//         'x-user-role': user.role
//       }
//     });
//     return next(authReq);
//   }

//   return next(req);
// };

// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { AuthService } from '../../services/services/auth.service';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const authService = inject(AuthService);
  
//   // קבלת המידע העדכני מה-BehaviorSubject
//   const user = authService.currentUserValue;

//   // אם יש משתמש מחובר, נוסיף את כל הפרטים שלו ל-Headers
//   if (user) {
//     const authReq = req.clone({
//       setHeaders: {
//         'x-user-role': user.role || '',
//         'x-user-id': (user.id || '').toString(),
//         'x-user-name': user.username || 'אורח' // כאן עובר השם sara!
//       }
//     });
//     return next(authReq);
//   }

//   // אם אין משתמש, הבקשה עוברת כרגיל
//   return next(req);
// };

// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { AuthService } from '../../services/services/aunth.service';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const authService = inject(AuthService);
//   const user = authService.currentUserValue;

//   if (user) {
//     // מקודדים את שם המשתמש כדי למנוע שגיאות קידוד ב-HTTP Headers
//     const encodedName = encodeURIComponent(user.username || 'guest');
    
//     const authReq = req.clone({
//       setHeaders: {
//         'x-user-role': user.role || '',
//         'x-user-id': (user.id || '').toString(),
//         'x-user-name': encodedName 
//       }
//     });
//     return next(authReq);
//   }

//   return next(req);
// };
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/services/aunth.service';

/**
 * Interceptor - שומר הסף של ה-HTTP
 * תפקידו: להזריק אוטומטית לכל בקשה שיוצאת לשרת את פרטי המשתמש המחובר.
 * זה מאפשר לשרת ה-Python להפעיל את ה-@role_required על כל נתיב.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const user = authService.currentUserValue;

  // אם המשתמש מחובר, נשכפל את הבקשה ונוסיף לה את הכותרות
  if (user) {
    const encodedName = encodeURIComponent(user.username || 'guest');
    
    const authReq = req.clone({
      setHeaders: {
        'x-user-role': user.role || '',
        'x-user-id': (user.id || '').toString(),
        'x-user-name': encodedName 
      }
    });

    // מעבירים את הבקשה המשוכפלת (עם ה-Headers) להמשך השרשרת
    return next(authReq);
  }

  // אם אין משתמש (למשל בדף התחברות), הבקשה עוברת כמו שהיא
  return next(req);
};