// // import { Component } from '@angular/core';
// // import { RouterOutlet } from '@angular/router';
// // import { LoginComponent } from '../comps/login/login.component';
// // import { RegisterComponent } from '../comps/register/register.component';

// // @Component({
// //   selector: 'app-root',
// //   imports: [RouterOutlet,LoginComponent,RegisterComponent],
// //   templateUrl: './app.component.html',
// //   styleUrl: './app.component.css'
// // })
// // export class AppComponent {
// //   title = 'myProject';
// // }


import { Component, HostListener, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterModule, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/services/aunth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
  CommonModule, 
    RouterModule,    // מאפשר שימוש ב-router-outlet
    RouterLink,      // מאפשר שימוש ב-routerLink
    RouterLinkActive // מאפשר שימוש ב-routerLinkActive ו-routerLinkActiveOptions
  ],
 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // הזרקת ה-Service כ-public כדי שה-HTML יזהה אותו
  public authService = inject(AuthService);
  isScrolled = false;
// app.component.ts
// testInterceptor() {
//   this.authService.checkServerStatus().subscribe({
//     next: (res) => console.log('תגובת השרת:', res),
//     error: (err) => console.error('שגיאה:', err)
//   });
// }
@HostListener('window:scroll', [])
  onWindowScroll() {
    // אם גללנו יותר מ-50 פיקסלים, נשנה את המצב
    this.isScrolled = window.scrollY > 50;
  }
  logout() {
    this.authService.logout();
  }
}
// import { Component, inject } from '@angular/core';
// import { RouterOutlet, RouterLink, RouterModule, RouterLinkActive } from '@angular/router';
// import { AuthService } from '../services/services/aunth.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [
//     CommonModule, 
//     RouterModule, 
//     RouterLink, 
//     RouterLinkActive 
//   ],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   // הזרקה ציבורית כדי שה-HTML יוכל לגשת ל-currentUser$
//   public authService = inject(AuthService);

//   logout(): void {
//     this.authService.logout();
//   }
// }