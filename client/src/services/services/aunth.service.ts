// // import { Injectable, inject } from '@angular/core';
// // import { HttpClient, HttpHeaders } from '@angular/common/http';
// // import { Observable, BehaviorSubject, tap } from 'rxjs';
// // import { CookieService } from 'ngx-cookie-service';
// // import { User } from '../../recipe.model'; // ייבוא הממשק באות קטנה

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class AuthService {
// //   private http = inject(HttpClient);
// //   private cookieService = inject(CookieService);
// //   private apiUrl = 'http://127.0.0.1:5000/auth';

// //   // ניהול המשתמש המחובר בזיכרון עם טיפוס מוגדר
// //   private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromCookie());
// //   public currentUser$ = this.currentUserSubject.asObservable();

// //   constructor() {}

// //   /**
// //    * שליפת נתוני המשתמש מהעוגיה בטעינה ראשונית
// //    */
// //   private getUserFromCookie(): User | null {
// //     const data = this.cookieService.get('user_session');
// //     if (data && data !== "undefined" && data !== "null") {
// //       try {
// //         return JSON.parse(data) as User;
// //       } catch (e) {
// //         return null;
// //       }
// //     }
// //     return null;
// //   }

// //   /**
// //    * קבלת אובייקט המשתמש הנוכחי (ערך סטטי)
// //    */
// //   public get currentUserValue(): User | null {
// //     return this.currentUserSubject.value;
// //   }

// //   /**
// //    * יצירת Headers עם התפקיד של המשתמש.
// //    * קריטי עבור הדקורטור @role_required בשרת ה-Python.
// //    */
// //   private getAuthHeaders(): HttpHeaders {
// //     const role = this.currentUserValue?.role || '';
// //     return new HttpHeaders({
// //       'Content-Type': 'application/json',
// //       'x-user-role': role // השרת בודק את השדה הזה להרשאות
// //     });
// //   }

// //   /**
// //    * עדכון העוגיה וה-Subject לאחר התחברות או שינוי פרטים
// //    */
// //   private handleAuthResponse(res: { user: User } | { user: any }) {
// //     if (res && res.user) {
// //       this.cookieService.set('user_session', JSON.stringify(res.user), 1, '/');
// //       this.currentUserSubject.next(res.user as User);
// //     }
// //   }

// //   // --- פונקציות אימות ---

// //   login(credentials: any): Observable<any> {
// //     return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
// //       tap(res => this.handleAuthResponse(res))
// //     );
// //   }

// //   register(userData: any): Observable<any> {
// //     return this.http.post<any>(`${this.apiUrl}/register`, userData).pipe(
// //       tap(res => this.handleAuthResponse(res))
// //     );
// //   }

// //   logout() {
// //     this.cookieService.delete('user_session', '/');
// //     this.currentUserSubject.next(null);
// //   }

// //   // --- פונקציות ניהול (Admin/User) ---

// //   /**
// //    * הגשת בקשה להפוך למעלה תוכן (Pending)
// //    */
// //   requestUpgrade(email: string): Observable<any> {
// //     return this.http.post(`${this.apiUrl}/request-upgrade`, { email }).pipe(
// //       tap((res: any) => {
// //         const currentUser = this.currentUserValue;
// //         if (currentUser) {
// //           // עדכון מקומי של ה-Role כדי שה-UI יתעדכן מיד
// //           currentUser.role = res.newRole || 'Pending';
// //           this.handleAuthResponse({ user: currentUser });
// //         }
// //       })
// //     );
// //   }

// //   /**
// //    * קבלת כלל המשתמשים (למנהל בלבד)
// //    */
// //   getAllUsers(): Observable<User[]> {
// //     return this.http.get<User[]>(`${this.apiUrl}/all-users`, {
// //       headers: this.getAuthHeaders()
// //     });
// //   }

// //   /**
// //    * קבלת משתמשים הממתינים לאישור (למנהל בלבד)
// //    */
// //   getPendingUsers(): Observable<User[]> {
// //     return this.http.get<User[]>(`${this.apiUrl}/pending-users`, {
// //       headers: this.getAuthHeaders()
// //     });
// //   }

// //   /**
// //    * אישור משתמש (שדרוג מ-Pending ל-Uploader)
// //    */
// //   approveUser(userId: number): Observable<any> {
// //     return this.http.post(`${this.apiUrl}/approve-user/${userId}`, {}, {
// //       headers: this.getAuthHeaders()
// //     });
// //   }

// //   /**
// //    * קבלת שם המשתמש לתצוגה - תואם לשדה username בשרת
// //    */
// //   public getUserName(): string {
// //     const user = this.currentUserValue;
// //     return user ? (user.username || 'משתמש') : 'אורח';
// //   }
// // }

// // import { Injectable, inject } from '@angular/core';
// // import { HttpClient, HttpHeaders } from '@angular/common/http';
// // import { Observable, BehaviorSubject, tap } from 'rxjs';
// // import { CookieService } from 'ngx-cookie-service';
// // import { User } from '../../recipe.model';

// // /**
// //  * שירות ניהול משתמשים ואימות
// //  * תפקיד: כניסה, הרשמה, שמירת מצב המשתמש בעוגייה וניהול הרשאות אדמין.
// //  */
// // @Injectable({ providedIn: 'root' })
// // export class AuthService {
// //   private http = inject(HttpClient);
// //   private cookieService = inject(CookieService);
// //   private apiUrl = 'http://127.0.0.1:5000/auth';

// //   // ניהול המשתמש בזיכרון - מאפשר לכל רכיב להאזין לשינויים (למשל: שינוי שם בתפריט)
// //   private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromCookie());
// //   public currentUser$ = this.currentUserSubject.asObservable();

// //   /** שליפת נתוני המשתמש מהעוגייה - מתבצע פעם אחת בטעינת האתר */
// //   private getUserFromCookie(): User | null {
// //     const data = this.cookieService.get('user_session');
// //     if (!data || data === 'undefined' || data === 'null') return null;
// //     try {
// //       return JSON.parse(data) as User;
// //     } catch {
// //       return null;
// //     }
// //   }

// //   /** קבלת הערך הנוכחי של המשתמש (ללא צורך ב-Subscribe) */
// //   public get currentUserValue(): User | null {
// //     return this.currentUserSubject.value;
// //   }

// //   /** כותרות משותפות לפעולות ניהול (Admin) */
// //   public getAuthHeaders(): HttpHeaders {
// //     return new HttpHeaders({
// //       'Content-Type': 'application/json',
// //       'x-user-role': this.currentUserValue?.role || ''
// //     });
// //   }

// //   /** עדכון המערכת בנתוני המשתמש (אחרי לוגין, הרשמה או עדכון תפקיד) */
// //   private handleAuthResponse(res: any) {
// //     if (res && res.user) {
// //       this.cookieService.set('user_session', JSON.stringify(res.user), 1, '/');
// //       this.currentUserSubject.next(res.user);
// //     }
// //   }

// //   // --- פונקציות API ---

// //   login(credentials: any): Observable<any> {
// //     return this.http.post<any>(`${this.apiUrl}/login`, credentials)
// //       .pipe(tap(res => this.handleAuthResponse(res)));
// //   }

// //   register(userData: any): Observable<any> {
// //     return this.http.post<any>(`${this.apiUrl}/register`, userData)
// //       .pipe(tap(res => this.handleAuthResponse(res)));
// //   }

// //   logout() {
// //     this.cookieService.delete('user_session', '/');
// //     this.currentUserSubject.next(null);
// //   }

// //   /** בקשת שדרוג למעלה תוכן */
// //   requestUpgrade(email: string): Observable<any> {
// //     return this.http.post(`${this.apiUrl}/request-upgrade`, { email })
// //       .pipe(tap((res: any) => {
// //         const user = this.currentUserValue;
// //         if (user) {
// //           user.role = res.newRole || 'Pending';
// //           this.handleAuthResponse({ user });
// //         }
// //       }));
// //   }

// //   // --- ניהול מנהל (Admin Only) ---

// //   getAllUsers(): Observable<User[]> {
// //     return this.http.get<User[]>(`${this.apiUrl}/all-users`, { headers: this.getAuthHeaders() });
// //   }

// //   approveUser(userId: number): Observable<any> {
// //     return this.http.post(`${this.apiUrl}/approve-user/${userId}`, {}, { headers: this.getAuthHeaders() });
// //   }
// // }

// import { Injectable, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, BehaviorSubject, tap } from 'rxjs';
// import { CookieService } from 'ngx-cookie-service';
// import { User } from '../../recipe.model';

// /**
//  * שירות אימות וניהול משתמשים
//  * ה-Interceptor מזריק אוטומטית את פרטי המשתמש לכל הקריאות.
//  */
// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private http = inject(HttpClient);
//   private cookieService = inject(CookieService);
//   private apiUrl = 'http://127.0.0.1:5000/auth';

//   private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromCookie());
//   public currentUser$ = this.currentUserSubject.asObservable();

//   private getUserFromCookie(): User | null {
//     const data = this.cookieService.get('user_session');
//     if (!data || data === 'undefined' || data === 'null') return null;
//     try {
//       return JSON.parse(data) as User;
//     } catch { return null; }
//   }

//   public get currentUserValue(): User | null {
//     return this.currentUserSubject.value;
//   }

//   private handleAuthResponse(res: any) {
//     if (res?.user) {
//       this.cookieService.set('user_session', JSON.stringify(res.user), 1, '/');
//       this.currentUserSubject.next(res.user);
//     }
//   }

//   login(credentials: any): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/login`, credentials)
//       .pipe(tap(res => this.handleAuthResponse(res)));
//   }

//   register(userData: any): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/register`, userData)
//       .pipe(tap(res => this.handleAuthResponse(res)));
//   }

//   logout() {
//     this.cookieService.delete('user_session', '/');
//     this.currentUserSubject.next(null);
//   }

//   requestUpgrade(email: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}/request-upgrade`, { email })
//       .pipe(tap((res: any) => {
//         if (this.currentUserValue) {
//           const updatedUser = { ...this.currentUserValue, role: res.newRole || 'Pending' };
//           this.handleAuthResponse({ user: updatedUser });
//         }
//       }));
//   }

//   // --- ניהול (ה-Headers מתווספים אוטומטית ע"י ה-Interceptor) ---

//   getAllUsers(): Observable<User[]> {
//     return this.http.get<User[]>(`${this.apiUrl}/all-users`);
//   }

//   approveUser(userId: number): Observable<any> {
//     return this.http.post(`${this.apiUrl}/approve-user/${userId}`, {});
//   }
  
// }
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);
  private apiUrl = 'http://127.0.0.1:5000/auth';

  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromCookie());
  public currentUser$ = this.currentUserSubject.asObservable();
  private getUserFromCookie(): User | null {
    const data = this.cookieService.get('user_session');
    if (!data || data === 'undefined' || data === 'null') return null;
    try {
      return JSON.parse(data) as User;
    } catch { return null; }
  }
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
  private handleAuthResponse(res: any) {
    if (res?.user) {
      this.cookieService.set('user_session', JSON.stringify(res.user), 1, '/');
      this.currentUserSubject.next(res.user);
    }
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(tap(res => this.handleAuthResponse(res)));
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData)
      .pipe(tap(res => this.handleAuthResponse(res)));
  }

  logout() {
    this.cookieService.delete('user_session', '/');
    this.currentUserSubject.next(null);
  }

  requestUpgrade(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/request-upgrade`, { email })
      .pipe(tap((res: any) => {
        if (this.currentUserValue) {
          const updatedUser = { ...this.currentUserValue, role: res.newRole || 'Pending' };
          this.handleAuthResponse({ user: updatedUser });
        }
      }));
  }

  // --- פונקציות ניהול אדמין ---

  // החזרת כל המשתמשים
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all-users`);
  }

  // הפונקציה שהייתה חסרה: החזרת משתמשים הממתינים לאישור
  getPendingUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/pending-users`);
  }

  // אישור שדרוג משתמש
  approveUser(userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/approve-user/${userId}`, {});
  }
  
}



// import { Injectable, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, BehaviorSubject, tap } from 'rxjs';
// import { CookieService } from 'ngx-cookie-service';
// import { User } from '../../recipe.model'; // שימוש ב-Interface שלך

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private http = inject(HttpClient);
//   private cookieService = inject(CookieService);
//   private apiUrl = 'http://127.0.0.1:5000/auth';

//   // BehaviorSubject שומר את מצב המשתמש הנוכחי
//   private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromCookie());
  
//   // הזרם אליו הקומפוננטות (כמו ה-Navbar) יאזינו
//   public currentUser$ = this.currentUserSubject.asObservable();

//   /**
//    * טעינת המשתמש מהעוגיה בזמן אתחול האפליקציה
//    */
//   private getUserFromCookie(): User | null {
//     const data = this.cookieService.get('user_session');
//     if (!data || data === 'undefined' || data === 'null') return null;
//     try {
//       return JSON.parse(data) as User;
//     } catch { return null; }
//   }

//   // גישה מהירה לערך המשתמש הנוכחי
//   public get currentUserValue(): User | null {
//     return this.currentUserSubject.value;
//   }

//   /**
//    * ניהול תגובת השרת: שמירה בעוגיה ועדכון ה-Subject
//    */
//   private handleAuthResponse(res: { user: User }) {
//     if (res?.user) {
//       this.cookieService.set('user_session', JSON.stringify(res.user), 1, '/');
//       this.currentUserSubject.next(res.user);
//     }
//   }

//   // --- פונקציות אימות (Authentication) ---

//   login(credentials: any): Observable<User> {
//     return this.http.post<User>(`${this.apiUrl}/login`, credentials)
//       .pipe(tap((res: any) => this.handleAuthResponse(res)));
//   }

//   register(userData: any): Observable<User> {
//     return this.http.post<User>(`${this.apiUrl}/register`, userData)
//       .pipe(tap((res: any) => this.handleAuthResponse(res)));
//   }

//   logout() {
//     this.cookieService.delete('user_session', '/');
//     this.currentUserSubject.next(null);
//   }

//   /**
//    * בקשת שדרוג לתפקיד Uploader.
//    * עדכון המצב המקומי ל-'Pending' מיד עם קבלת התגובה.
//    */
//   requestUpgrade(email: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}/request-upgrade`, { email })
//       .pipe(tap((res: any) => {
//         if (this.currentUserValue) {
//           const updatedUser: User = { 
//             ...this.currentUserValue, 
//             role: (res.newRole as User['role']) || 'Pending' 
//           };
//           this.handleAuthResponse({ user: updatedUser });
//         }
//       }));
//   }

//   // --- פונקציות ניהול (Admin Only) ---

//   /**
//    * שליפת כל המשתמשים הרשומים במערכת
//    */
//   getAllUsers(): Observable<User[]> {
//     return this.http.get<User[]>(`${this.apiUrl}/all-users`);
//   }

//   /**
//    * שליפת משתמשים הממתינים לאישור שדרוג (Role = Pending)
//    */
//   getPendingUsers(): Observable<User[]> {
//     return this.http.get<User[]>(`${this.apiUrl}/pending-users`);
//   }

//   /**
//    * אישור המשתמש והפיכתו ל-Uploader
//    */
//   approveUser(userId: number): Observable<any> {
//     return this.http.post(`${this.apiUrl}/approve-user/${userId}`, {});
//   }

//   /**
//    * דחיית בקשת המשתמש והחזרתו לתפקיד Reader
//    * קריאה לפונקציה החדשה שהוספנו ב-Flask
//    */
//   rejectUser(userId: number): Observable<any> {
//     return this.http.post(`${this.apiUrl}/reject-user/${userId}`, {});
//   }
// }


// אפשרות לשנות!!!!!!!!!!!


// AuthService - עדכון הפונקציות
// login(credentials: any): Observable<AuthResponse> {
//   return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
//     .pipe(
//       tap((res: AuthResponse) => this.handleAuthResponse(res))
//     );
// }

// register(userData: any): Observable<AuthResponse> {
//   return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData)
//     .pipe(
//       tap((res: AuthResponse) => this.handleAuthResponse(res))
//     );
// }

// private handleAuthResponse(res: AuthResponse) {
//   if (res && res.user) {
//     this.cookieService.set('user_session', JSON.stringify(res.user), 1, '/');
//     this.currentUserSubject.next(res.user);
//   }
// }