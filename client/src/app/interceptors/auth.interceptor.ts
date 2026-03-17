
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