// // // // // // // // import { Injectable } from '@angular/core';
// // // // // // // // import { HttpClient, HttpHeaders } from '@angular/common/http';
// // // // // // // // import { Observable } from 'rxjs';
// // // // // // // // import { AuthService } from './services/auth.service'; // נצטרך את התפקיד מה-Auth

// // // // // // // // @Injectable({
// // // // // // // //   providedIn: 'root'
// // // // // // // // })
// // // // // // // // export class RecipeService {
// // // // // // // //   private apiUrl = 'http://127.0.0.1:5000/recipes';

// // // // // // // //   constructor(private http: HttpClient, private authService: AuthService) {}

// // // // // // // //   // פונקציה להוספת מתכון - משתמשת ב-FormData
// // // // // // // //   addRecipe(recipeData: FormData): Observable<any> {
// // // // // // // //     // שליפת התפקיד מה-AuthService לצורך הדקורטור בשרת
// // // // // // // //     const role = this.authService.currentUserValue?.role || '';
    
// // // // // // // //     const headers = new HttpHeaders({
// // // // // // // //       'x-user-role': role // ה-Header שהדקורטור שלנו מחפש
// // // // // // // //     });

// // // // // // // //     return this.http.post(`${this.apiUrl}/add`, recipeData, { headers });
// // // // // // // //   }

// // // // // // // //   // שליפת כל המתכונים לגלריה
// // // // // // // //   getAllRecipes(): Observable<any[]> {
// // // // // // // //     return this.http.get<any[]>(`${this.apiUrl}/all`);
// // // // // // // //   }

// // // // // // // //   // recipe.service.ts
// // // // // // // // getRecipeById(id: number): Observable<any> {
// // // // // // // //   return this.http.get<any>(`${this.apiUrl}/${id}`);
// // // // // // // // }
// // // // // // // // }


// // // // // // // import { Injectable } from '@angular/core';
// // // // // // // import { HttpClient, HttpHeaders } from '@angular/common/http';
// // // // // // // import { Observable } from 'rxjs';
// // // // // // // import { AuthService } from './services/auth.service'; // וודאי שהנתיב ל-AuthService נכון

// // // // // // // @Injectable({
// // // // // // //   providedIn: 'root'
// // // // // // // })
// // // // // // // export class RecipeService {
// // // // // // //   private apiUrl = 'http://127.0.0.1:5000/recipes';

// // // // // // //   constructor(private http: HttpClient, private authService: AuthService) {}

// // // // // // //   /**
// // // // // // //    * פונקציה להוספת מתכון
// // // // // // //    * שולחת FormData הכולל תמונה, רכיבים ופרטים
// // // // // // //    * מוסיפה Headers של המשתמש המחובר כדי שהשרת ידע מי העלה את המתכון
// // // // // // //    */
// // // // // // //   addRecipe(recipeData: FormData): Observable<any> {
// // // // // // //     // 1. שליפת פרטי המשתמש מה-AuthService
// // // // // // //     const user = this.authService.currentUserValue;
    
// // // // // // //     // 2. הכנת הנתונים למשלוח ב-Headers
// // // // // // //     // שים לב: אנחנו משתמשים ב-id, name ו-role
// // // // // // //     const role = user?.role || '';
// // // // // // //     const userId = user?.id ? user.id.toString() : '';
// // // // // // //     const userName = user?.name || user?.username || 'אורח';

// // // // // // //     const headers = new HttpHeaders({
// // // // // // //       'x-user-role': role,
// // // // // // //       'x-user-id': userId,     // פותר את שגיאת ה-IntegrityError ב-DB
// // // // // // //       'x-user-name': userName  // מציג את השם שלך במקום "אורח"
// // // // // // //     });

// // // // // // //     // 3. שליחת הבקשה לשרת
// // // // // // //     return this.http.post(`${this.apiUrl}/add`, recipeData, { headers });
// // // // // // //   }

// // // // // // //   /**
// // // // // // //    * שליפת כל המתכונים להצגה בגלריה
// // // // // // //    */
// // // // // // //   getAllRecipes(): Observable<any[]> {
// // // // // // //     return this.http.get<any[]>(`${this.apiUrl}/all`);
// // // // // // //   }

// // // // // // //   /**
// // // // // // //    * שליפת מתכון ספציפי לפי מזהה (ID)
// // // // // // //    */
// // // // // // //   getRecipeById(id: number): Observable<any> {
// // // // // // //     return this.http.get<any>(`${this.apiUrl}/${id}`);
// // // // // // //   }
// // // // // // // }

// // // // // // import { Injectable } from '@angular/core';
// // // // // // import { HttpClient, HttpHeaders } from '@angular/common/http';
// // // // // // import { Observable } from 'rxjs';
// // // // // // import { AuthService } from './services/auth.service'; // וודאי שהנתיב נכון

// // // // // // @Injectable({
// // // // // //   providedIn: 'root'
// // // // // // })
// // // // // // export class RecipeService {
// // // // // //   private apiUrl = 'http://127.0.0.1:5000/recipes';

// // // // // //   constructor(private http: HttpClient, private authService: AuthService) {}

// // // // // //   addRecipe(recipeData: FormData): Observable<any> {
// // // // // //     const user = this.authService.currentUserValue;
    
// // // // // //     // שליפת הנתונים מה-BehaviorSubject של ה-AuthService
// // // // // //     const role = user?.role || '';
// // // // // //     const userId = user?.id || '';
    
// // // // // //     // שימוש בפונקציה החדשה או שליפה ישירה
// // // // // //     const userName = user?.name || user?.username || 'אורח';

// // // // // //     // הדפסה ל-Console כדי שתוכלי לראות מה נשלח לפני שזה מגיע לשרת
// // // // // //     console.log('Sending Recipe with User:', { userId, userName, role });

// // // // // //     const headers = new HttpHeaders({
// // // // // //       'x-user-role': role,
// // // // // //       'x-user-id': userId.toString(),
// // // // // //       'x-user-name': userName
// // // // // //     });

// // // // // //     return this.http.post(`${this.apiUrl}/add`, recipeData, { headers });
// // // // // //   }

// // // // // //   getAllRecipes(): Observable<any[]> {
// // // // // //     return this.http.get<any[]>(`${this.apiUrl}/all`);
// // // // // //   }

// // // // // //   getRecipeById(id: number): Observable<any> {
// // // // // //     return this.http.get<any>(`${this.apiUrl}/${id}`);
// // // // // //   }
// // // // // // }


// // // // // import { Injectable, inject } from '@angular/core';
// // // // // import { HttpClient, HttpHeaders } from '@angular/common/http';
// // // // // import { Observable, BehaviorSubject, tap } from 'rxjs';
// // // // // import { CookieService } from 'ngx-cookie-service';

// // // // // @Injectable({
// // // // //   providedIn: 'root'
// // // // // })
// // // // // export class AuthService {
// // // // //   private http = inject(HttpClient);
// // // // //   private cookieService = inject(CookieService);
// // // // //   private apiUrl = 'http://127.0.0.1:5000/auth';

// // // // //   // ניהול המדינה של המשתמש בזיכרון
// // // // //   private currentUserSubject = new BehaviorSubject<any>(this.getUserFromCookie());
// // // // //   public currentUser$ = this.currentUserSubject.asObservable();

// // // // //   constructor() {}

// // // // //   /**
// // // // //    * שליפת המשתמש מהעוגיה בטעינה ראשונית
// // // // //    */
// // // // //   private getUserFromCookie(): any {
// // // // //     const data = this.cookieService.get('user_session');
// // // // //     if (data && data !== "undefined" && data !== "null") {
// // // // //       try {
// // // // //         return JSON.parse(data);
// // // // //       } catch (e) {
// // // // //         console.error("שגיאה בפענוח עוגיית המשתמש", e);
// // // // //         return null;
// // // // //       }
// // // // //     }
// // // // //     return null;
// // // // //   }

// // // // //   /**
// // // // //    * מחזירה את אובייקט המשתמש הנוכחי
// // // // //    */
// // // // //   public get currentUserValue(): any {
// // // // //     return this.currentUserSubject.value;
// // // // //   }

// // // // //   /**
// // // // //    * פונקציה חדשה: מחזירה את שם המשתמש בצורה בטוחה
// // // // //    * בודקת את כל השדות האפשריים (name, username, וכו')
// // // // //    */
// // // // //   public getUserName(): string {
// // // // //     const user = this.currentUserValue;
// // // // //     if (!user) return 'אורח';
// // // // //     // בודק איזה שדה קיים באובייקט המשתמש שלך
// // // // //     return user.name || user.username || user.display_name || 'משתמש';
// // // // //   }

// // // // //   /**
// // // // //    * יצירת Headers עם התפקיד של המשתמש עבור השרת
// // // // //    */
// // // // //   private getAuthHeaders(): HttpHeaders {
// // // // //     const role = this.currentUserValue?.role || '';
// // // // //     return new HttpHeaders({
// // // // //       'Content-Type': 'application/json',
// // // // //       'x-user-role': role
// // // // //     });
// // // // //   }

// // // // //   /**
// // // // //    * עדכון העוגיה וה-Subject לאחר תגובה מהשרת
// // // // //    */
// // // // //   private handleAuthResponse(res: any) {
// // // // //     if (res && res.user) {
// // // // //       // שמירה בעוגיה ליום אחד (1)
// // // // //       this.cookieService.set('user_session', JSON.stringify(res.user), 1, '/');
// // // // //       this.currentUserSubject.next(res.user);
// // // // //     }
// // // // //   }

// // // // //   login(credentials: any): Observable<any> {
// // // // //     return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
// // // // //       tap(res => this.handleAuthResponse(res))
// // // // //     );
// // // // //   }

// // // // //   register(userData: any): Observable<any> {
// // // // //     return this.http.post(`${this.apiUrl}/register`, userData).pipe(
// // // // //       tap(res => this.handleAuthResponse(res))
// // // // //     );
// // // // //   }

// // // // //   requestUpgrade(email: string): Observable<any> {
// // // // //     return this.http.post(`${this.apiUrl}/request-upgrade`, { email }).pipe(
// // // // //       tap((res: any) => {
// // // // //         const user = this.currentUserValue;
// // // // //         if (user) {
// // // // //           user.role = res.newRole;
// // // // //           this.handleAuthResponse({ user }); 
// // // // //         }
// // // // //       })
// // // // //     );
// // // // //   }

// // // // //   getPendingUsers(): Observable<any[]> {
// // // // //     return this.http.get<any[]>(`${this.apiUrl}/pending-users`, {
// // // // //       headers: this.getAuthHeaders()
// // // // //     });
// // // // //   }

// // // // //   approveUser(userId: number): Observable<any> {
// // // // //     return this.http.post(`${this.apiUrl}/approve-user/${userId}`, {}, {
// // // // //       headers: this.getAuthHeaders()
// // // // //     });
// // // // //   }

// // // // //   logout() {
// // // // //     this.cookieService.delete('user_session', '/');
// // // // //     this.currentUserSubject.next(null);
// // // // //   }
// // // // // }


// // // // import { Injectable, inject } from '@angular/core';
// // // // import { HttpClient, HttpHeaders } from '@angular/common/http';
// // // // import { Observable } from 'rxjs';
// // // // import { AuthService } from './services/auth.service'; // וודאי שהנתיב ל-AuthService מדויק

// // // // @Injectable({
// // // //   providedIn: 'root'
// // // // })
// // // // export class RecipeService { // קריטי שיהיה כאן export
// // // //   private http = inject(HttpClient);
// // // //   private authService = inject(AuthService);
// // // //   private apiUrl = 'http://127.0.0.1:5000/recipes';

// // // //   /**
// // // //    * הוספת מתכון חדש
// // // //    */
// // // //   addRecipe(recipeData: FormData): Observable<any> {
// // // //     const user = this.authService.currentUserValue;
    
// // // //     // שליפת נתונים מה-AuthService
// // // //     const role = user?.role || '';
// // // //     const userId = user?.id || '';
// // // //     const userName = this.authService.getUserName(); // שימוש בפונקציה החדשה ששלחת

// // // //     // יצירת Headers למניעת שגיאות בשרת ושמירת שם המעלה
// // // //     const headers = new HttpHeaders({
// // // //       'x-user-role': role,
// // // //       'x-user-id': userId.toString(),
// // // //       'x-user-name': userName
// // // //     });

// // // //     return this.http.post(`${this.apiUrl}/add`, recipeData, { headers });
// // // //   }

// // // //   /**
// // // //    * שליפת כל המתכונים
// // // //    */
// // // //   getAllRecipes(): Observable<any[]> {
// // // //     return this.http.get<any[]>(`${this.apiUrl}/all`);
// // // //   }

// // // //   /**
// // // //    * שליפת מתכון לפי ID
// // // //    */
// // // //   getRecipeById(id: number): Observable<any> {
// // // //     return this.http.get<any>(`${this.apiUrl}/${id}`);
// // // //   }
// // // // }

// // // import { Injectable, inject } from '@angular/core';
// // // import { HttpClient, HttpHeaders } from '@angular/common/http';
// // // import { Observable } from 'rxjs';
// // // import { AuthService } from './services/auth.service'; // וודאי שהנתיב ל-AuthService מדויק

// // // @Injectable({
// // //   providedIn: 'root'
// // // })
// // // export class RecipeService {
// // //   private http = inject(HttpClient);
// // //   private authService = inject(AuthService);
// // //   private apiUrl = 'http://127.0.0.1:5000/recipes';

// // //   /**
// // //    * הוספת מתכון חדש
// // //    */
// // //   addRecipe(recipeData: FormData): Observable<any> {
// // //     const user = this.authService.currentUserValue;
    
// // //     const role = user?.role || '';
// // //     const userId = user?.id || '';
// // //     const userName = this.authService.getUserName();

// // //     const headers = new HttpHeaders({
// // //       'x-user-role': role,
// // //       'x-user-id': userId.toString(),
// // //       'x-user-name': userName
// // //     });

// // //     return this.http.post(`${this.apiUrl}/add`, recipeData, { headers });
// // //   }

// // //   /**
// // //    * שליפת כמות המתכונים של משתמש ספציפי (לאיזור האישי)
// // //    */
// // //   getUserStats(userId: number): Observable<{user_id: number, recipe_count: number}> {
// // //     return this.http.get<{user_id: number, recipe_count: number}>(`${this.apiUrl}/my-stats/${userId}`);
// // //   }

// // //   /**
// // //    * שליפת רשימת המתכונים שהעלה משתמש ספציפי
// // //    */
// // //   getUserRecipes(userId: number): Observable<any[]> {
// // //     return this.http.get<any[]>(`${this.apiUrl}/my-recipes/${userId}`);
// // //   }

// // //   /**
// // //    * שליפת כל המתכונים לגלריה הכללית
// // //    */
// // //   getAllRecipes(): Observable<any[]> {
// // //     return this.http.get<any[]>(`${this.apiUrl}/all`);
// // //   }

// // //   /**
// // //    * שליפת מתכון לפי ID
// // //    */
// // //   getRecipeById(id: number): Observable<any> {
// // //     return this.http.get<any>(`${this.apiUrl}/${id}`);
// // //   }

// // // //מחיקת מתכון
// // //   deleteRecipe(id: number): Observable<any> {
// // //   return this.http.delete(`${this.apiUrl}/recipe/delete/${id}`, {
// // //     headers: new HttpHeaders({
// // //       'x-user-role': 'Admin' // או הדרך שבה את מעבירה הרשאות
// // //     })
// // //   });
// // // }
// // // // מועדפים
// // // toggleFavorite(recipeId: number, userId: number): Observable<any> {
// // //   const headers = new HttpHeaders().set('x-user-id', userId.toString());
// // //   return this.http.post(`${this.apiUrl}/recipe/${recipeId}/favorite`, {}, { headers });
// // // }
// // // // רשימת קניות
// // // generateShoppingList(recipeIds: number[]): Observable<{[key: string]: number}> {
// // //   return this.http.post<{[key: string]: number}>(
// // //     `${this.apiUrl}/recipe/shopping-list`, 
// // //     { recipe_ids: recipeIds }
// // //   );
// // // }
// // // }


// // import { Injectable, inject } from '@angular/core';
// // import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// // import { Observable } from 'rxjs';
// // import { AuthService } from './services/auth.service'; // וודאי שהנתיב מדויק

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class RecipeService {
// //   private http = inject(HttpClient);
// //   private authService = inject(AuthService);
  
// //   // כתובת ה-API הבסיסית כפי שהוגדרה ב-Blueprint
// //   private apiUrl = 'http://127.0.0.1:5000/api/recipes';

// //   /**
// //    * עזר ליצירת Headers עם פרטי המשתמש המחובר
// //    */
// //   private getAuthHeaders(): HttpHeaders {
// //     const user = this.authService.currentUserValue;
// //     return new HttpHeaders({
// //       'x-user-role': user?.role || '',
// //       'x-user-id': user?.id?.toString() || '',
// //       'x-user-name': this.authService.getUserName()
// //     });
// //   }

// //   // ==========================================
// //   // 1. פונקציות חדשות: דף הבית, חיפוש ודומים
// //   // ==========================================

// //   /**
// //    * שליפת נתונים מרוכזים לדף הבית (4 מהירים + רשימת קטגוריות)
// //    */
// //   getHomeData(): Observable<any> {
// //     return this.http.get(`${this.apiUrl}/home-stats`);
// //   }

// //   /**
// //    * חיפוש וסינון דינמי לפי פרמטרים
// //    * filters יכול להכיל: query, max_time, type, category
// //    */
// //   searchRecipes(filters: any): Observable<any[]> {
// //     let params = new HttpParams();
// //     if (filters.query) params = params.append('query', filters.query);
// //     if (filters.max_time) params = params.append('max_time', filters.max_time.toString());
// //     if (filters.type) params = params.append('type', filters.type);
// //     if (filters.category) params = params.append('category', filters.category);

// //     return this.http.get<any[]>(`${this.apiUrl}/search`, { params });
// //   }

// //   /**
// //    * שליפת מתכונים דומים מאותה קטגוריה (עבור דף מתכון יחיד)
// //    */
// //   getRelatedRecipes(recipeId: number): Observable<any[]> {
// //     return this.http.get<any[]>(`${this.apiUrl}/related/${recipeId}`);
// //   }

// //   // ==========================================
// //   // 2. ניהול מתכונים (CRUD)
// //   // ==========================================

// //   addRecipe(recipeData: FormData): Observable<any> {
// //     return this.http.post(`${this.apiUrl}/add`, recipeData, { headers: this.getAuthHeaders() });
// //   }

// //   getAllRecipes(): Observable<any[]> {
// //     return this.http.get<any[]>(`${this.apiUrl}/all`); // וודאי שיש נתיב כזה ב-Flask או השתמשי ב-search ללא פרמטרים
// //   }

// //   getRecipeById(id: number): Observable<any> {
// //     return this.http.get<any>(`${this.apiUrl}/${id}`);
// //   }

// //   deleteRecipe(id: number): Observable<any> {
// //     return this.http.delete(`${this.apiUrl}/delete/${id}`, { headers: this.getAuthHeaders() });
// //   }

// //   // ==========================================
// //   // 3. פונקציות משתמש וסטטיסטיקה
// //   // ==========================================

// //   // getUserStats(userId: number): Observable<any> {
// //   //   return this.http.get(`${this.apiUrl}/my-stats/${userId}`);
// //   // }

// //   // getUserRecipes(userId: number): Observable<any[]> {
// //   //   return this.http.get<any[]>(`${this.apiUrl}/my-recipes/${userId}`);
// //   // }

// //   getUserStats(username: string): Observable<any> {
// //   return this.http.get(`${this.apiUrl}/my-stats/${username}`);
// // }

// // getUserRecipes(username: string): Observable<any[]> {
// //   return this.http.get<any[]>(`${this.apiUrl}/my-recipes/${username}`);
// // }
// //   // ==========================================
// //   // 4. מועדפים ורשימת קניות
// //   // ==========================================

// //   toggleFavorite(recipeId: number): Observable<any> {
// //     // משתמש ב-ID מה-AuthService באופן אוטומטי
// //     return this.http.post(`${this.apiUrl}/recipe/${recipeId}/favorite`, {}, { headers: this.getAuthHeaders() });
// //   }

// //   generateShoppingList(recipeIds: number[]): Observable<{[key: string]: number}> {
// //     return this.http.post<{[key: string]: number}>(
// //       `${this.apiUrl}/recipe/shopping-list`, 
// //       { recipe_ids: recipeIds }
// //     );
// //   }

  

// //   smartSearch(ingredients: string[]): Observable<any[]> {
// //   return this.http.post<any[]>(`${this.apiUrl}/smart-search`, { ingredients });
// // }

// // // getFavorites(userId: string): Observable<any[]> {
// // //   const headers = new HttpHeaders().set('x-user-id', userId);
// // //   return this.http.get<any[]>(`${this.apiUrl}/favorites`, { headers });
// // // }

// // // שכתוב הפונקציה בתוך ה-Service שלך
// // getFavorites(userId: any): Observable<any[]> {
// //   // המרה מפורשת לטקסט מונעת את שגיאת ה-iterable שקיבלת
// //   const headers = new HttpHeaders().set('x-user-id', String(userId));
  
// //   return this.http.get<any[]>(`${this.apiUrl}/favorites`, { headers });
// // }
// // }

// // import { Injectable, inject } from '@angular/core';
// // import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// // import { Observable } from 'rxjs';
// // import { AuthService } from './services/aunth.service'; // וודאי שהנתיב מדויק

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class RecipeService {
// //   private http = inject(HttpClient);
// //   private authService = inject(AuthService);
  
// //   // כתובת ה-API הבסיסית כפי שהוגדרה ב-Blueprint ב-Flask
// //   private apiUrl = 'http://127.0.0.1:5000/api/recipes';

// //   /**
// //    * פונקציית עזר ליצירת Headers מאוחדים לכל הבקשות הדורשות הרשאה.
// //    * שולח את התפקיד, ה-ID ושם המשתמש כפי שהדקורטור בשרת מצפה לקבל.
// //    */
// //   private getAuthHeaders(): HttpHeaders {
// //     const user = this.authService.currentUserValue;
// //     return new HttpHeaders({
// //       'x-user-role': user?.role || '',
// //       'x-user-id': user?.id?.toString() || '',
// //       'x-user-name': this.authService.getUserName() || ''
// //     });
// //   }

// //   // ==========================================
// //   // 1. חיפוש ונתוני דף הבית
// //   // ==========================================

// //   /** שליפת נתונים מרוכזים לדף הבית */
// //   getHomeData(): Observable<any> {
// //     return this.http.get(`${this.apiUrl}/home-stats`);
// //   }

// //   /** חיפוש וסינון דינמי (query, max_time, type, category) */
// //   searchRecipes(filters: any): Observable<any[]> {
// //     let params = new HttpParams();
// //     if (filters.query) params = params.append('query', filters.query);
// //     if (filters.max_time) params = params.append('max_time', filters.max_time.toString());
// //     if (filters.type) params = params.append('type', filters.type);
// //     if (filters.category) params = params.append('category', filters.category);

// //     return this.http.get<any[]>(`${this.apiUrl}/search`, { params });
// //   }

// //   /** שליפת מתכונים דומים מאותה קטגוריה */
// //   getRelatedRecipes(recipeId: number): Observable<any[]> {
// //     return this.http.get<any[]>(`${this.apiUrl}/related/${recipeId}`);
// //   }

// //   /** חיפוש חכם לפי רשימת מצרכים שיש בבית */
// //   smartSearch(ingredients: string[]): Observable<any[]> {
// //     return this.http.post<any[]>(`${this.apiUrl}/smart-search`, { ingredients });
// //   }

// //   // ==========================================
// //   // 2. ניהול מתכונים (CRUD)
// //   // ==========================================

// //   /** שליפת כל המתכונים */
// //   getAllRecipes(): Observable<any[]> {
// //     return this.http.get<any[]>(`${this.apiUrl}/all`);
// //   }

// //   /** שליפת מתכון יחיד לפי ID */
// //   getRecipeById(id: number): Observable<any> {
// //     return this.http.get<any>(`${this.apiUrl}/${id}`);
// //   }

// //   /** הוספת מתכון חדש (FormData כולל תמונה) */
// //   addRecipe(recipeData: FormData): Observable<any> {
// //     return this.http.post(`${this.apiUrl}/add`, recipeData, { headers: this.getAuthHeaders() });
// //   }

// //   /** עדכון מתכון קיים */
// //   updateRecipe(id: number, recipeData: any): Observable<any> {
// //     return this.http.put(`${this.apiUrl}/update/${id}`, recipeData, { headers: this.getAuthHeaders() });
// //   }

// //   /** מחיקת מתכון */
// //   deleteRecipe(id: number): Observable<any> {
// //     return this.http.delete(`${this.apiUrl}/delete/${id}`, { headers: this.getAuthHeaders() });
// //   }

// //   // ==========================================
// //   // 3. איזור אישי וסטטיסטיקה
// //   // ==========================================

// //   /** כמות מתכונים של משתמש */
// //   getUserStats(username: string): Observable<any> {
// //     return this.http.get(`${this.apiUrl}/my-stats/${username}`);
// //   }

// //   /** רשימת המתכונים שהמשתמש העלה */
// //   getUserRecipes(username: string): Observable<any[]> {
// //     return this.http.get<any[]>(`${this.apiUrl}/my-recipes/${username}`);
// //   }

// //   /** שליפת רשימת המועדפים של המשתמש */
// //   getFavorites(userId: any): Observable<any[]> {
// //     const headers = new HttpHeaders().set('x-user-id', String(userId));
// //     return this.http.get<any[]>(`${this.apiUrl}/favorites`, { headers });
// //   }

// //   /** הוספה/הסרה מהמועדפים */
// //   toggleFavorite(recipeId: number): Observable<any> {
// //     return this.http.post(`${this.apiUrl}/recipe/${recipeId}/favorite`, {}, { headers: this.getAuthHeaders() });
// //   }

// //   // ==========================================
// //   // 4. כלים נוספים
// //   // ==========================================

// //   /** יצירת רשימת קניות מרוכזת מכמה מתכונים */
// //   generateShoppingList(recipeIds: number[]): Observable<{[key: string]: number}> {
// //     return this.http.post<{[key: string]: number}>(
// //       `${this.apiUrl}/recipe/shopping-list`, 
// //       { recipe_ids: recipeIds }
// //     );
// //   }


// //   /** חישוב כמויות רכיבים לפי מכפיל (מנות) */
// // updateServings(recipeId: number, factor: number): Observable<any> {
// //   return this.http.post(`${this.apiUrl}/calculate-servings/${recipeId}`, { factor });
// // }
// // }

// // import { Injectable, inject } from '@angular/core';
// // import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// // import { Observable } from 'rxjs';
// // import { AuthService } from '../services/services/aunth.service'; // נתיב מעודכן
// // import { Recipe, User, RecipeFilters } from '../recipe.model'; // שימוש בטיפוסים באות קטנה

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class RecipeService {
// //   private http = inject(HttpClient);
// //   private authService = inject(AuthService);
  
// //   private apiUrl = 'http://127.0.0.1:5000/api/recipes';

// //   /**
// //    * יצירת Headers המכילים את פרטי המשתמש לצרכי הרשאות (Role, ID).
// //    */
// //   private getAuthHeaders(): HttpHeaders {
// //     const currentUser = this.authService.currentUserValue;
// //     return new HttpHeaders({
// //       'x-user-role': currentUser?.role || '',
// //       'x-user-id': currentUser?.id?.toString() || '',
// //       'x-user-name': currentUser?.username || ''
// //     });
// //   }

// //   // ==========================================
// //   // 1. חיפוש ונתוני דף הבית
// //   // ==========================================

// //   getHomeData(): Observable<any> {
// //     return this.http.get(`${this.apiUrl}/home-stats`);
// //   }

// //   /** חיפוש וסינון עם טיפוסי נתונים מוגדרים */
// //   searchRecipes(filters: RecipeFilters): Observable<Recipe[]> {
// //     let params = new HttpParams();
// //     if (filters.searchQuery) params = params.append('query', filters.searchQuery);
// //     if (filters.maxTime) params = params.append('max_time', filters.maxTime.toString());
// //     if (filters.type) params = params.append('type', filters.type);
// //     if (filters.category) params = params.append('category', filters.category);

// //     return this.http.get<Recipe[]>(`${this.apiUrl}/search`, { params });
// //   }

// //   getRelatedRecipes(recipeId: number): Observable<Recipe[]> {
// //     return this.http.get<Recipe[]>(`${this.apiUrl}/related/${recipeId}`);
// //   }

// //   smartSearch(ingredients: string[]): Observable<any[]> {
// //     return this.http.post<any[]>(`${this.apiUrl}/smart-search`, { ingredients });
// //   }

// //   // ==========================================
// //   // 2. ניהול מתכונים (CRUD)
// //   // ==========================================

// //   getAllRecipes(): Observable<Recipe[]> {
// //     return this.http.get<Recipe[]>(`${this.apiUrl}/all`);
// //   }

// //   getRecipeById(id: number): Observable<Recipe> {
// //     return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
// //   }

// //   addRecipe(recipeData: FormData): Observable<any> {
// //     return this.http.post(`${this.apiUrl}/add`, recipeData, { headers: this.getAuthHeaders() });
// //   }

// //   updateRecipe(id: number, recipeData: any): Observable<any> {
// //     return this.http.put(`${this.apiUrl}/update/${id}`, recipeData, { headers: this.getAuthHeaders() });
// //   }

// //   deleteRecipe(id: number): Observable<any> {
// //     return this.http.delete(`${this.apiUrl}/delete/${id}`, { headers: this.getAuthHeaders() });
// //   }

// //   // ==========================================
// //   // 3. איזור אישי ומועדפים
// //   // ==========================================

// //   getUserStats(username: string): Observable<any> {
// //     return this.http.get(`${this.apiUrl}/my-stats/${username}`);
// //   }

// //   getUserRecipes(username: string): Observable<Recipe[]> {
// //     return this.http.get<Recipe[]>(`${this.apiUrl}/my-recipes/${username}`);
// //   }

// //   getFavorites(userId: number): Observable<Recipe[]> {
// //     const headers = new HttpHeaders().set('x-user-id', String(userId));
// //     return this.http.get<Recipe[]>(`${this.apiUrl}/favorites`, { headers });
// //   }

// //   toggleFavorite(recipeId: number): Observable<any> {
// //     return this.http.post(`${this.apiUrl}/recipe/${recipeId}/favorite`, {}, { headers: this.getAuthHeaders() });
// //   }

// //   // ==========================================
// //   // 4. כלים נוספים
// //   // ==========================================

// //   generateShoppingList(recipeIds: number[]): Observable<{[key: string]: string | number}> {
// //     return this.http.post<{[key: string]: string | number}>(
// //       `${this.apiUrl}/recipe/shopping-list`, 
// //       { recipe_ids: recipeIds }
// //     );
// //   }

// //   updateServings(recipeId: number, factor: number): Observable<any> {
// //     return this.http.post(`${this.apiUrl}/calculate-servings/${recipeId}`, { factor });
// //   }
// // }

// import { Injectable, inject } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthService } from '../services/services/aunth.service';
// import { Recipe, RecipeFilters } from '../recipe.model';

// /**
//  * שירות ניהול מתכונים
//  * תפקיד: CRUD, חיפוש חכם, ניהול מועדפים ויצירת רשימות קניות.
//  */
// @Injectable({ providedIn: 'root' })
// export class RecipeService {
//   private http = inject(HttpClient);
//   private authService = inject(AuthService);
//   private apiUrl = 'http://127.0.0.1:5000/api/recipes';

//   /** * יצירת Headers עם פרטי המשתמש הנוכחי.
//    * קריטי עבור ה-Python כדי לאמת מי מוחק/עורך/מוסיף מתכון.
//    */
//   private getAuthHeaders(): HttpHeaders {
//     const user = this.authService.currentUserValue;
//     return new HttpHeaders({
//       'x-user-role': user?.role || '',
//       'x-user-id': user?.id?.toString() || '',
//       'x-user-name': user?.username || ''
//     });
//   }

//   // ==========================================
//   // 1. חיפוש ונתוני תצוגה
//   // ==========================================

//   /** שליפת נתונים סטטיסטיים לדף הבית */
//   getHomeData(): Observable<any> {
//     return this.http.get(`${this.apiUrl}/home-stats`);
//   }

//   /** חיפוש מתקדם עם פילטרים */
//   searchRecipes(filters: RecipeFilters): Observable<Recipe[]> {
//     let params = new HttpParams();
//     if (filters.searchQuery) params = params.append('query', filters.searchQuery);
//     if (filters.maxTime) params = params.append('max_time', filters.maxTime.toString());
//     if (filters.type) params = params.append('type', filters.type);
//     if (filters.category) params = params.append('category', filters.category);

//     return this.http.get<Recipe[]>(`${this.apiUrl}/search`, { params });
//   }

//   /** חיפוש חכם לפי רשימת רכיבים שיש בבית */
//   smartSearch(ingredients: string[]): Observable<Recipe[]> {
//     return this.http.post<Recipe[]>(`${this.apiUrl}/smart-search`, { ingredients });
//   }

//   getRelatedRecipes(recipeId: number): Observable<Recipe[]> {
//     return this.http.get<Recipe[]>(`${this.apiUrl}/related/${recipeId}`);
//   }

//   // ==========================================
//   // 2. ניהול מתכונים (CRUD)
//   // ==========================================

//   getAllRecipes(): Observable<Recipe[]> {
//     return this.http.get<Recipe[]>(`${this.apiUrl}/all`);
//   }

//   getRecipeById(id: number): Observable<Recipe> {
//     return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
//   }

//   /** הוספת מתכון חדש - מקבל FormData בגלל התמונה */
//   addRecipe(recipeData: FormData): Observable<any> {
//     return this.http.post(`${this.apiUrl}/add`, recipeData, { headers: this.getAuthHeaders() });
//   }

//   /** עדכון מתכון - שולח JSON (לא FormData) */
//   updateRecipe(id: number, recipeData: any): Observable<any> {
//     return this.http.put(`${this.apiUrl}/update/${id}`, recipeData, { headers: this.getAuthHeaders() });
//   }

//   deleteRecipe(id: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/delete/${id}`, { headers: this.getAuthHeaders() });
//   }

//   // ==========================================
//   // 3. מועדפים ואיזור אישי
//   // ==========================================

//   /** שליפת המתכונים שהמשתמש אהב */
//   getFavorites(): Observable<Recipe[]> {
//     // משתמש ב-getAuthHeaders כדי שהשרת ידע לשלוף לפי ה-ID של המשתמש המחובר
//     return this.http.get<Recipe[]>(`${this.apiUrl}/favorites`, { headers: this.getAuthHeaders() });
//   }

//   /** הוספה/הסרה ממועדפים */
//   toggleFavorite(recipeId: number): Observable<any> {
//     return this.http.post(`${this.apiUrl}/recipe/${recipeId}/favorite`, {}, { headers: this.getAuthHeaders() });
//   }

//   getUserStats(username: string): Observable<any> {
//     return this.http.get(`${this.apiUrl}/my-stats/${username}`);
//   }

//   getUserRecipes(username: string): Observable<Recipe[]> {
//     return this.http.get<Recipe[]>(`${this.apiUrl}/my-recipes/${username}`);
//   }

//   // ==========================================
//   // 4. כלי עזר (רשימת קניות ומנות)
//   // ==========================================

//   generateShoppingList(recipeIds: number[]): Observable<any> {
//     return this.http.post(`${this.apiUrl}/recipe/shopping-list`, { recipe_ids: recipeIds });
//   }
// }


// import { Injectable, inject } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Recipe, RecipeFilters } from '../recipe.model';

// /**
//  * שירות ניהול מתכונים
//  * ללא הגדרת Headers ידנית - הכל מטופל ב-authInterceptor.
//  */
// @Injectable({ providedIn: 'root' })
// export class RecipeService {
//   private http = inject(HttpClient);
//   private apiUrl = 'http://127.0.0.1:5000/api/recipes';

//   // --- חיפוש ונתונים כלליים ---

//   getHomeData(): Observable<any> {
//     return this.http.get(`${this.apiUrl}/home-stats`);
//   }

//   searchRecipes(filters: RecipeFilters): Observable<Recipe[]> {
//     let params = new HttpParams();
//     if (filters.searchQuery) params = params.append('query', filters.searchQuery);
//     if (filters.maxTime) params = params.append('max_time', filters.maxTime.toString());
//     if (filters.type) params = params.append('type', filters.type);
//     if (filters.category) params = params.append('category', filters.category);

//     return this.http.get<Recipe[]>(`${this.apiUrl}/search`, { params });
//   }

//   smartSearch(ingredients: string[]): Observable<Recipe[]> {
//     return this.http.post<Recipe[]>(`${this.apiUrl}/smart-search`, { ingredients });
//   }

//   getRelatedRecipes(recipeId: number): Observable<Recipe[]> {
//     return this.http.get<Recipe[]>(`${this.apiUrl}/related/${recipeId}`);
//   }

//   // --- ניהול מתכונים (CRUD) ---

//   getAllRecipes(): Observable<Recipe[]> {
//     return this.http.get<Recipe[]>(`${this.apiUrl}/all`);
//   }

//   getRecipeById(id: number): Observable<Recipe> {
//     return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
//   }

//   addRecipe(recipeData: FormData): Observable<any> {
//     return this.http.post(`${this.apiUrl}/add`, recipeData);
//   }

//   updateRecipe(id: number, recipeData: any): Observable<any> {
//     return this.http.put(`${this.apiUrl}/update/${id}`, recipeData);
//   }

//   deleteRecipe(id: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/delete/${id}`);
//   }

//   // --- איזור אישי ומועדפים ---

//   getFavorites(): Observable<Recipe[]> {
//     return this.http.get<Recipe[]>(`${this.apiUrl}/favorites`);
//   }

//   toggleFavorite(recipeId: number): Observable<any> {
//     return this.http.post(`${this.apiUrl}/recipe/${recipeId}/favorite`, {});
//   }

//   getUserStats(username: string): Observable<any> {
//     return this.http.get(`${this.apiUrl}/my-stats/${username}`);
//   }

//   getUserRecipes(username: string): Observable<Recipe[]> {
//     return this.http.get<Recipe[]>(`${this.apiUrl}/my-recipes/${username}`);
//   }

//   generateShoppingList(recipeIds: number[]): Observable<any> {
//     return this.http.post(`${this.apiUrl}/recipe/shopping-list`, { recipe_ids: recipeIds });
//   }
//   // בתוך קובץ recipe.service.ts

// updateServings(recipeId: number, servings: number): Observable<any> {
//   return this.http.get(`${this.apiUrl}/${recipeId}/update-servings`, {
//     params: { servings: servings.toString() }
//   });
// }
// // }
// import { Injectable, inject } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Recipe, RecipeFilters, smartSearchResult } from '../model';

// @Injectable({ providedIn: 'root' })
// export class RecipeService {
//   private http = inject(HttpClient);
//   private apiUrl = 'http://127.0.0.1:5000/api/recipes';

//   // --- חיפוש ונתונים כלליים ---
//   getHomeData(): Observable<any> {
//     return this.http.get(`${this.apiUrl}/home-stats`);
//   }

//   searchRecipes(filters: RecipeFilters): Observable<Recipe[]> {
//     let params = new HttpParams();
//     if (filters.searchQuery) params = params.append('query', filters.searchQuery);
//     if (filters.maxTime) params = params.append('max_time', filters.maxTime.toString());
//     if (filters.type) params = params.append('type', filters.type);
//     if (filters.category) params = params.append('category', filters.category);

//     return this.http.get<Recipe[]>(`${this.apiUrl}/search`, { params });
//   }

//   // תיקון: מחזיר smartSearchResult[] כדי לכלול את ציון ההתאמה
//   smartSearch(ingredients: string[]): Observable<smartSearchResult[]> {
//     return this.http.post<smartSearchResult[]>(`${this.apiUrl}/smart-search`, { ingredients });
//   }

//   getRelatedRecipes(recipeId: number): Observable<Recipe[]> {
//     return this.http.get<Recipe[]>(`${this.apiUrl}/related/${recipeId}`);
//   }

//   // --- ניהול מתכונים (CRUD) ---
//   getAllRecipes(): Observable<Recipe[]> {
//     return this.http.get<Recipe[]>(`${this.apiUrl}/all`);
//   }

//   getRecipeById(id: number): Observable<Recipe> {
//     return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
//   }

//   addRecipe(recipeData: FormData): Observable<any> {
//     return this.http.post(`${this.apiUrl}/add`, recipeData);
//   }

//   updateRecipe(id: number, recipeData: any): Observable<any> {
//     return this.http.put(`${this.apiUrl}/update/${id}`, recipeData);
//   }

//   deleteRecipe(id: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/delete/${id}`);
//   }

//   // --- מועדפים ואיזור אישי ---
//   getFavorites(): Observable<Recipe[]> {
//     return this.http.get<Recipe[]>(`${this.apiUrl}/favorites`);
//   }

//   toggleFavorite(recipeId: number): Observable<any> {
//     return this.http.post(`${this.apiUrl}/recipe/${recipeId}/favorite`, {});
//   }

//   generateShoppingList(recipeIds: number[]): Observable<any> {
//     return this.http.post(`${this.apiUrl}/recipe/shopping-list`, { recipe_ids: recipeIds });
//   }

//   // updateServings(recipeId: number, servings: number): Observable<any> {
//   //   return this.http.get(`${this.apiUrl}/${recipeId}/update-servings`, {
//   //     params: { servings: servings.toString() }
//   //   });
//   // }
//   updateServings(recipeId: number, servings: number): Observable<any> {
//   // שליחת בקשת POST לנתיב הנכון בשרת עם האובייקט factor
//   return this.http.post(`${this.apiUrl}/calculate-servings/${recipeId}`, {
//     factor: servings
//   });
// }
//   // פונקציה להבאת סטטיסטיקות של משתמש (אם את צריכה את זה בדפים אחרים)
// getUserStats(username: string): Observable<any> {
//   return this.http.get(`${this.apiUrl}/my-stats/${username}`);
// }

// // הפונקציה הקריטית שחסרה לך כרגע!
// getUserRecipes(username: string): Observable<Recipe[]> {
//   return this.http.get<Recipe[]>(`${this.apiUrl}/my-recipes/${username}`);
// }
// }


import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe, RecipeFilters, smartSearchResult, HomeStats, UserStats } from '../model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private http = inject(HttpClient);
  // נתיב ה-API ב-Flask
  private apiUrl = 'http://127.0.0.1:5000/api/recipes';

  /** * שליפת נתונים סטטיסטיים לדף הבית (קטגוריות ומתכונים מהירים)
   */
  getHomeData(): Observable<HomeStats> {
    return this.http.get<HomeStats>(`${this.apiUrl}/home-stats`);
  }

  /**
   * חיפוש דינמי: בונה אובייקט HttpParams המבוסס על המסננים שהמשתמש בחר.
   */
  searchRecipes(filters: RecipeFilters): Observable<Recipe[]> {
    let params = new HttpParams();
    if (filters.searchQuery) params = params.append('query', filters.searchQuery);
    if (filters.maxTime) params = params.append('max_time', filters.maxTime.toString());
    if (filters.type) params = params.append('type', filters.type);
    if (filters.category) params = params.append('category', filters.category);

    return this.http.get<Recipe[]>(`${this.apiUrl}/search`, { params });
  }

  /**
   * אלגוריתם "מה יש במקרר": שולח רשימת רכיבים ומחזיר מתכונים עם ציון התאמה.
   */
  smartSearch(ingredients: string[]): Observable<smartSearchResult[]> {
    return this.http.post<smartSearchResult[]>(`${this.apiUrl}/smart-search`, { ingredients });
  }

  // --- ניהול מתכונים (CRUD) ---

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/all`);
  }

  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }

  /**
   * הוספת מתכון: משתמש ב-FormData כדי לאפשר העלאת קבצי תמונה (Pillow).
   */
  addRecipe(recipeData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, recipeData);
  }

  updateRecipe(id: number, recipeData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, recipeData);
  }

  deleteRecipe(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  // --- כלים ותכונות נוספות ---

  /**
   * רשימת קניות: מאחדת רכיבים ממספר מתכונים נבחרים.
   */
  generateShoppingList(recipeIds: number[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/recipe/shopping-list`, { recipe_ids: recipeIds });
  }

  /**
   * חישוב מחדש של כמויות לפי פקטור (סועדים).
   */
  updateServings(recipeId: number, factor: number): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.apiUrl}/calculate-servings/${recipeId}`, { factor });
  }

  /**
   * שליפת המתכונים האישיים של המשתמש (עבור עמוד הפרופיל).
   */
  getUserRecipes(username: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/my-recipes/${username}`);
  }
  /**
 * שליפת סטטיסטיקות של משתמש ספציפי (למשל: כמה מתכונים העלה)
 */
getUserStats(username: string): Observable<UserStats> {
  return this.http.get<UserStats>(`${this.apiUrl}/my-stats/${username}`);
}
getFavorites(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/favorites`);
  }

  toggleFavorite(recipeId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/recipe/${recipeId}/favorite`, {});
  }

  getRelatedRecipes(recipeId: number): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/related/${recipeId}`);
  }
  
}