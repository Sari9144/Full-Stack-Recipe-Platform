

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/services/aunth.service';
import { UserDetailComponent } from '../personal-details/personal-details.component';
import { AppButtonComponent } from '../buton-basic/buton-basic.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User } from '../../model'; // שימוש בטיפוס באות קטנה
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-management',
  standalone: true,
  imports: [CommonModule, UserDetailComponent, AppButtonComponent, RouterModule],
  templateUrl: './show-users.component.html',
  styleUrl: './show-users.component.css'
})
export class AdminManagementComponent implements OnInit {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  public router = inject(Router);

  users: User[] = [];
  currentMode: 'all' | 'pending' = 'all';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // מצב התצוגה נקבע לפי ה-URL
      this.currentMode = params['mode'] === 'pending' ? 'pending' : 'all';
      this.loadData();
    });
  }

  loadData(): void {
    if (this.currentMode === 'pending') {
      this.loadPendingUsers();
    } else {
      this.loadAllUsers();
    }
  }

  loadPendingUsers(): void {
    this.authService.getPendingUsers().subscribe({
      next: (data: User[]) => this.users = data,
      error: (err) => console.error("Error loading pending users", err)
    });
  }

  loadAllUsers(): void {
    this.authService.getAllUsers().subscribe({
      next: (data: User[]) => this.users = data,
      error: (err) => console.error("Error loading all users", err)
    });
  }

  

  // שפינו את הטיפוס ל-number בלבד או מספר/לא מוגדר
  approve(userId: number | undefined): void {
    if (userId === undefined) {
      console.error("User ID is missing");
      return;
    }

    Swal.fire({
      title: ' לאשר?',
      text: 'אישור בקשה יאפשר למשתמש להעלות מתכונים משלו לקהילה.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#8c6d31',
      confirmButtonText: 'שלחו בקשה',
      cancelButtonText: 'ביטול'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.approveUser(userId).subscribe({
          next: (res: any) => {
            Swal.fire('נשלח!', 'הבקשה בטיפול.', 'success');
            this.loadData();
          },
          error: (err) => Swal.fire('נכשל!', ' אישור הבקשה נכשל .', 'error')
        });
        
      
      
    }});
  }
}
