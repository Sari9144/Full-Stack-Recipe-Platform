// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { provideHttpClient } from '@angular/common/http'; // ייבוא חובה

// import { routes } from './app.routes';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideRouter(routes),
//     provideHttpClient() // הוספת הספק של ה-HTTP
//   ]
// };

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // הוספנו את withInterceptors

import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor'; // ודאי שהנתיב לקובץ שיצרת נכון
import { CookieService } from 'ngx-cookie-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    CookieService,
    
    // הגדרה מעודכנת של ה-HttpClient עם ה-Interceptor שלנו
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
};