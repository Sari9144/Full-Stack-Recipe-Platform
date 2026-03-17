
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

