


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

@HostListener('window:scroll', [])
  onWindowScroll() {
    // אם גללנו יותר מ-50 פיקסלים, נשנה את המצב
    this.isScrolled = window.scrollY > 50;
  }
  logout() {
    this.authService.logout();
  }
}
