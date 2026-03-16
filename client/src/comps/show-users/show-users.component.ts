// // // // // // import { Component, OnInit, inject } from '@angular/core';
// // // // // // import { AuthService } from '../../services/services/auth.service';
// // // // // // import { UserDetailComponent } from '../personal-details/personal-details.component'; // ייבוא הבן של הפרטים
// // // // // // import { AppButtonComponent } from '../buton-basic/buton-basic.component'; // ייבוא הבן של הכפתור

// // // // // // @Component({
// // // // // //   selector: 'app-admin-management',
// // // // // //   standalone: true,
// // // // // //   imports: [UserDetailComponent, AppButtonComponent], // רישום הבנים
// // // // // //   templateUrl: './show-users.component.html',
// // // // // //   styleUrl: './show-users.component.css'
// // // // // // })
// // // // // // export class AdminManagementComponent implements OnInit {
// // // // // //   authService = inject(AuthService);
// // // // // //   pendingUsers: any[] = [];

// // // // // //   ngOnInit() {
// // // // // //     this.loadPendingUsers();
// // // // // //   }

// // // // // //   loadPendingUsers() {
// // // // // //     this.authService.getPendingUsers().subscribe({
// // // // // //       next: (users) => this.pendingUsers = users,
// // // // // //       error: (err) => console.error("שגיאה בטעינת משתמשים", err)
// // // // // //     });
// // // // // //   }

// // // // // //   approve(userId: number) {
// // // // // //     this.authService.approveUser(userId).subscribe({
// // // // // //       next: (res) => {
// // // // // //         alert(res.message);
// // // // // //         this.loadPendingUsers(); // רענון הרשימה
// // // // // //       }
// // // // // //     });
// // // // // //   }
// // // // // // }

// // // // // import { Component, OnInit, inject } from '@angular/core';
// // // // // import { CommonModule } from '@angular/common'; // הוסיפי את זה עבור @if ו-@for
// // // // // import { AuthService } from '../../services/services/auth.service';
// // // // // import { UserDetailComponent } from '../personal-details/personal-details.component';
// // // // // import { AppButtonComponent } from '../buton-basic/buton-basic.component';
// // // // // import { ActivatedRoute } from '@angular/router'; // 1. ייבוא ה-Route

// // // // // @Component({
// // // // //   selector: 'app-admin-management',
// // // // //   standalone: true,
// // // // //   imports: [CommonModule, UserDetailComponent, AppButtonComponent], // 2. הוספת CommonModule
// // // // //   templateUrl: './show-users.component.html',
// // // // //   styleUrl: './show-users.component.css'
// // // // // })
// // // // // export class AdminManagementComponent implements OnInit {
// // // // //   authService = inject(AuthService);
// // // // //   route = inject(ActivatedRoute); // 3. הזרקת ה-Route

// // // // //   users: any[] = []; // שינוי שם מ-pendingUsers ל-users (כללי יותר)
// // // // //   currentMode: string = 'all'; // משתנה שישמור אם אנחנו ב-'all' או 'pending'

// // // // //   ngOnInit() {
// // // // //     // 4. האזנה לשינויים בפרמטר 'mode' שב-URL
// // // // //     this.route.queryParams.subscribe(params => {
// // // // //       this.currentMode = params['mode'] || 'all'; // ברירת מחדל: כולם
// // // // //       this.loadData();
// // // // //     });
// // // // //   }

// // // // //   loadData() {
// // // // //     if (this.currentMode === 'pending') {
// // // // //       this.loadPendingUsers();
// // // // //     } else {
// // // // //       this.loadAllUsers();
// // // // //     }
// // // // //   }

// // // // //   loadPendingUsers() {
// // // // //     this.authService.getPendingUsers().subscribe({
// // // // //       next: (users) => this.users = users,
// // // // //       error: (err) => console.error("שגיאה בטעינת ממתינים", err)
// // // // //     });
// // // // //   }

// // // // //   loadAllUsers() {
// // // // //     // ודאי שיצרת פונקציה כזו ב-AuthService (אני אציג אותה בהמשך)
// // // // //     this.authService.getAllUsers().subscribe({
// // // // //       next: (users) => this.users = users,
// // // // //       error: (err) => console.error("שגיאה בטעינת כל המשתמשים", err)
// // // // //     });
// // // // //   }

// // // // //   approve(userId: number) {
// // // // //     this.authService.approveUser(userId).subscribe({
// // // // //       next: (res) => {
// // // // //         alert(res.message);
// // // // //         this.loadData(); // רענון לפי המצב הנוכחי
// // // // //       }
// // // // //     });
// // // // //   }
// // // // // }
// // // // import { Component, OnInit, inject } from '@angular/core';
// // // // import { CommonModule } from '@angular/common';
// // // // import { AuthService } from '../../services/services/auth.service';
// // // // import { UserDetailComponent } from '../personal-details/personal-details.component';
// // // // import { AppButtonComponent } from '../buton-basic/buton-basic.component';
// // // // import { ActivatedRoute } from '@angular/router';

// // // // @Component({
// // // //   selector: 'app-admin-management',
// // // //   standalone: true,
// // // //   imports: [CommonModule, UserDetailComponent, AppButtonComponent],
// // // //   templateUrl: './show-users.component.html',
// // // //   styleUrl: './show-users.component.css'
// // // // })
// // // // export class AdminManagementComponent implements OnInit {
// // // //   private authService = inject(AuthService);
// // // //   private route = inject(ActivatedRoute);

// // // //   users: any[] = []; 
// // // //   currentMode: string = 'all'; 

// // // //   ngOnInit() {
// // // //     // האזנה לפרמטר mode בכתובת ה-URL (למשל: ?mode=pending)
// // // //     this.route.queryParams.subscribe(params => {
// // // //       this.currentMode = params['mode'] || 'all';
// // // //       this.loadData();
// // // //     });
// // // //   }

// // // //   loadData() {
// // // //     if (this.currentMode === 'pending') {
// // // //       this.loadPendingUsers();
// // // //     } else {
// // // //       this.loadAllUsers();
// // // //     }
// // // //   }

// // // //   loadPendingUsers() {
// // // //     this.authService.getPendingUsers().subscribe({
// // // //       next: (data) => {
// // // //         console.log("ממתינים שהתקבלו:", data);
// // // //         this.users = data;
// // // //       },
// // // //       error: (err) => console.error("שגיאה בטעינת ממתינים", err)
// // // //     });
// // // //   }

// // // //   loadAllUsers() {
// // // //     this.authService.getAllUsers().subscribe({
// // // //       next: (data) => {
// // // //         console.log("כל המשתמשים שהתקבלו:", data);
// // // //         this.users = data;
// // // //       },
// // // //       error: (err) => console.error("שגיאה בטעינת כל המשתמשים", err)
// // // //     });
// // // //   }

// // // //   approve(userId: number) {
// // // //     this.authService.approveUser(userId).subscribe({
// // // //       next: (res) => {
// // // //         alert(res.message);
// // // //         this.loadData(); // רענון הרשימה לפי המצב הנוכחי
// // // //       },
// // // //       error: (err) => alert("שגיאה באישור המשתמש")
// // // //     });
// // // //   }
// // // // }
// // // import { Component, OnInit, inject } from '@angular/core';
// // // import { CommonModule } from '@angular/common';
// // // import { AuthService } from '../../services/services/auth.service';
// // // import { UserDetailComponent } from '../personal-details/personal-details.component';
// // // import { AppButtonComponent } from '../buton-basic/buton-basic.component';
// // // import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // הוספנו את Router

// // // @Component({
// // //   selector: 'app-admin-management',
// // //   standalone: true,
// // //   imports: [CommonModule, UserDetailComponent, AppButtonComponent, RouterModule],
// // //   templateUrl: './show-users.component.html',
// // //   styleUrl: './show-users.component.css'
// // // })
// // // export class AdminManagementComponent implements OnInit {
// // //   private authService = inject(AuthService);
// // //   private route = inject(ActivatedRoute);
// // //   public router = inject(Router); // כאן הוספנו את ה-Router עם public כדי שה-HTML יזהה אותו

// // //   users: any[] = []; 
// // //   currentMode: string = 'all'; 

// // //   ngOnInit() {
// // //     this.route.queryParams.subscribe(params => {
// // //       this.currentMode = params['mode'] || 'all';
// // //       this.loadData();
// // //     });
// // //   }

// // //   loadData() {
// // //     if (this.currentMode === 'pending') {
// // //       this.loadPendingUsers();
// // //     } else {
// // //       this.loadAllUsers();
// // //     }
// // //   }

// // //   loadPendingUsers() {
// // //     this.authService.getPendingUsers().subscribe({
// // //       next: (data) => this.users = data,
// // //       error: (err) => console.error("שגיאה בטעינת ממתינים", err)
// // //     });
// // //   }

// // //   loadAllUsers() {
// // //     this.authService.getAllUsers().subscribe({
// // //       next: (data) => this.users = data,
// // //       error: (err) => console.error("שגיאה בטעינת כל המשתמשים", err)
// // //     });
// // //   }

// // //   approve(userId: number) {
// // //     if (confirm('האם לאשר את המשתמש להעלאת מתכונים?')) {
// // //       this.authService.approveUser(userId).subscribe({
// // //         next: (res) => {
// // //           alert(res.message);
// // //           this.loadData(); 
// // //         },
// // //         error: (err) => alert("שגיאה בתהליך האישור")
// // //       });
// // //     }
// // //   }
// // // }

// // import { Component, OnInit, inject } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { AuthService } from '../../services/services/auth.service';
// // import { UserDetailComponent } from '../personal-details/personal-details.component';
// // import { AppButtonComponent } from '../buton-basic/buton-basic.component';
// // import { ActivatedRoute, Router, RouterModule } from '@angular/router';
// // import { User } from '../../recipe.model'; // ייבוא הממשק

// // @Component({
// //   selector: 'app-admin-management',
// //   standalone: true,
// //   imports: [CommonModule, UserDetailComponent, AppButtonComponent, RouterModule],
// //   templateUrl: './show-users.component.html',
// //   styleUrl: './show-users.component.css'
// // })
// // export class AdminManagementComponent implements OnInit {
// //   private authService = inject(AuthService);
// //   private route = inject(ActivatedRoute);
// //   public router = inject(Router); 

// //   // שימוש במערך של משתמשים לפי הממשק
// //   users: User[] = []; 
// //   currentMode: 'all' | 'pending' = 'all'; 

// //   ngOnInit(): void {
// //     this.route.queryParams.subscribe(params => {
// //       // וידוא שה-mode תואם לטיפוסים שהגדרנו
// //       this.currentMode = params['mode'] === 'pending' ? 'pending' : 'all';
// //       this.loadData();
// //     });
// //   }

// //   loadData(): void {
// //     if (this.currentMode === 'pending') {
// //       this.loadPendingUsers();
// //     } else {
// //       this.loadAllUsers();
// //     }
// //   }

// //   loadPendingUsers(): void {
// //     this.authService.getPendingUsers().subscribe({
// //       next: (data: User[]) => this.users = data,
// //       error: (err) => console.error("שגיאה בטעינת ממתינים", err)
// //     });
// //   }

// //   loadAllUsers(): void {
// //     this.authService.getAllUsers().subscribe({
// //       next: (data: User[]) => this.users = data,
// //       error: (err) => console.error("שגיאה בטעינת כל המשתמשים", err)
// //     });
// //   }

// //   approve(userId: number): void {
// //     if (confirm('האם לאשר את המשתמש להעלאת מתכונים?')) {
// //       this.authService.approveUser(userId).subscribe({
// //         next: (res: { message: string }) => {
// //           alert(res.message);
// //           this.loadData(); 
// //         },
// //         error: (err) => {
// //           console.error(err);
// //           alert("שגיאה בתהליך האישור");
// //         }
// //       });
// //     }
// //   }
// // }

// import { Component, OnInit, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { AuthService } from '../../services/services/auth.service';
// import { UserDetailComponent } from '../personal-details/personal-details.component';
// import { AppButtonComponent } from '../buton-basic/buton-basic.component';
// import { ActivatedRoute, Router, RouterModule } from '@angular/router';
// import { User } from '../../recipe.model'; // טיפוס user באות קטנה, אך תוכן באות גדולה

// @Component({
//   selector: 'app-admin-management',
//   standalone: true,
//   imports: [CommonModule, UserDetailComponent, AppButtonComponent, RouterModule],
//   templateUrl: './show-users.component.html',
//   styleUrl: './show-users.component.css'
// })
// export class AdminManagementComponent implements OnInit {
//   private authService = inject(AuthService);
//   private route = inject(ActivatedRoute);
//   public router = inject(Router); 

//   users: User[] = []; 
//   currentMode: 'all' | 'pending' = 'all'; 

//   ngOnInit(): void {
//     this.route.queryParams.subscribe(params => {
//       // כאן ה-currentMode הוא פנימי של הקומפוננטה לניווט, אפשר להשאיר קטן
//       this.currentMode = params['mode'] === 'pending' ? 'pending' : 'all';
//       this.loadData();
//     });
//   }

//   loadData(): void {
//     if (this.currentMode === 'pending') {
//       this.loadPendingUsers();
//     } else {
//       this.loadAllUsers();
//     }
//   }

//   loadPendingUsers(): void {
//     this.authService.getPendingUsers().subscribe({
//       next: (data: User[]) => this.users = data,
//       error: (err) => console.error("Error loading pending users", err)
//     });
//   }

//   loadAllUsers(): void {
//     this.authService.getAllUsers().subscribe({
//       next: (data: User[]) => this.users = data,
//       error: (err) => console.error("Error loading all users", err)
//     });
//   }

//   approve(userId: number): void {
//     if (confirm('האם לאשר את המשתמש?')) {
//       this.authService.approveUser(userId).subscribe({
//         next: (res: any) => {
//           alert(res.message || 'המשתמש אושר בהצלחה');
//           this.loadData(); 
//         },
//         error: (err) => alert("שגיאה בתהליך האישור")
//       });
//     }
//   }
// }

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

  // approve(userId: number): void {
  //   if (confirm('האם לאשר את המשתמש להעלאת מתכונים?')) {
  //     this.authService.approveUser(userId).subscribe({
  //       next: (res: any) => {
  //         alert(res.message || 'המשתמש אושר בהצלחה');
  //         this.loadData(); 
  //       },
  //       error: (err) => {
  //         console.error(err);
  //         alert("שגיאה בתהליך האישור");
  //       }
  //     });
  //   }
  // }

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

// if (!user.email) return;

//   Swal.fire({
//     title: 'רוצה להפוך לשף ב-Pasha?',
//     text: 'שליחת בקשה תאפשר לך להעלות מתכונים משלך לקהילה.',
//     icon: 'question',
//     showCancelButton: true,
//     confirmButtonColor: '#8c6d31',
//     confirmButtonText: 'שלחו בקשה',
//     cancelButtonText: 'ביטול'
//   }).then((result) => {
//     if (result.isConfirmed) {
//       this.authService.requestUpgrade(user.email).subscribe({
//         next: () => {
//           user.role = 'Pending';
//           Swal.fire('נשלח!', 'הבקשה בטיפול.', 'success');
//         }
//       });
//     }
//   });
// }
