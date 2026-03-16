// // // // // // // import { Component, OnInit } from '@angular/core';
// // // // // // // import { CommonModule } from '@angular/common'; 
// // // // // // // import { AuthService } from '../../services/services/auth.service';
// // // // // // // import { RecipeService } from '../../services/recipe.service'; 
// // // // // // // import { UserDetailComponent } from '../personal-details/personal-details.component';
// // // // // // // import { Router, RouterModule } from '@angular/router';
// // // // // // // import { AppButtonComponent } from '../buton-basic/buton-basic.component';

// // // // // // // @Component({
// // // // // // //   selector: 'app-profile',
// // // // // // //   standalone: true,
// // // // // // //   imports: [
// // // // // // //     CommonModule, 
// // // // // // //     RouterModule,
// // // // // // //     UserDetailComponent,
// // // // // // //     AppButtonComponent
// // // // // // //   ],
// // // // // // //   templateUrl: './profile.component.html',
// // // // // // //   styleUrl: './profile.component.css'
// // // // // // // })
// // // // // // // export class ProfileComponent implements OnInit {
// // // // // // //   // המשתנים שחסרו ב-HTML
// // // // // // //   recipeCount: number = 0; 
// // // // // // //   favorites: any[] = [];
// // // // // // //   myRecipes: any[] = []; 
// // // // // // //   showFavorites: boolean = false;
// // // // // // //   baseUrl = 'http://127.0.0.1:5000'; 

// // // // // // //   constructor(
// // // // // // //     public authService: AuthService,
// // // // // // //     private recipeService: RecipeService, 
// // // // // // //     private router: Router 
// // // // // // //   ) {}

// // // // // // //   ngOnInit() {
// // // // // // //     this.loadUserStats();
// // // // // // //     this.loadMyRecipes(); 
// // // // // // //   }

// // // // // // //   // --- טעינת המתכונים שלי ---
// // // // // // //   loadMyRecipes() {
// // // // // // //     const user = this.authService.currentUserValue;
// // // // // // //     // ב-Service שלך הפונקציה מצפה ל-username
// // // // // // //     if (user?.username) {
// // // // // // //       this.recipeService.getUserRecipes(user.username).subscribe({
// // // // // // //         next: (data: any[]) => {
// // // // // // //           this.myRecipes = data;
// // // // // // //         },
// // // // // // //         error: (err: any) => console.error('שגיאה בטעינת המתכונים האישיים', err)
// // // // // // //       });
// // // // // // //     }
// // // // // // //   }

// // // // // // //   // --- מחיקת מתכון ---
// // // // // // //   deleteRecipe(recipeId: number, event: Event) {
// // // // // // //     event.stopPropagation();
// // // // // // //     if (confirm('האם את בטוחה שברצונך למחוק את המתכון לצמיתות?')) {
// // // // // // //       this.recipeService.deleteRecipe(recipeId).subscribe({
// // // // // // //         next: () => {
// // // // // // //           // עדכון הרשימה המקומית כדי שהמתכון ייעלם מהמסך מיד
// // // // // // //           this.myRecipes = this.myRecipes.filter(r => r.id !== recipeId);
// // // // // // //           this.loadUserStats(); // עדכון המונה
// // // // // // //           alert('המתכון נמחק בהצלחה');
// // // // // // //         },
// // // // // // //         error: (err: any) => alert('שגיאה במחיקת המתכון')
// // // // // // //       });
// // // // // // //     }
// // // // // // //   }

// // // // // // //   // --- עריכת מתכון ---
// // // // // // //   editRecipe(recipeId: number, event: Event) {
// // // // // // //     event.stopPropagation();
// // // // // // //     this.router.navigate(['/edit-recipe', recipeId]);
// // // // // // //   }

// // // // // // //   // --- סטטיסטיקה (מונה מתכונים) ---
// // // // // // //   private loadUserStats() {
// // // // // // //     const user = this.authService.currentUserValue;
// // // // // // //     if (user?.username) {
// // // // // // //       this.recipeService.getUserStats(user.username).subscribe({
// // // // // // //         next: (res: any) => {
// // // // // // //           this.recipeCount = res.recipe_count;
// // // // // // //         },
// // // // // // //         error: (err: any) => console.error("שגיאה בטעינת סטטיסטיקה", err)
// // // // // // //       });
// // // // // // //     }
// // // // // // //   }

// // // // // // //   // --- ניהול מועדפים ---
// // // // // // //   toggleFavorites() {
// // // // // // //     this.showFavorites = !this.showFavorites;
// // // // // // //     if (this.showFavorites && this.favorites.length === 0) {
// // // // // // //       this.loadFavorites();
// // // // // // //     }
// // // // // // //   }

// // // // // // //   loadFavorites() {
// // // // // // //     const user = this.authService.currentUserValue;
// // // // // // //     if (user?.id) {
// // // // // // //       this.recipeService.getFavorites(user.id).subscribe({
// // // // // // //         next: (data: any[]) => this.favorites = data,
// // // // // // //         error: (err: any) => console.error('שגיאה בטעינת מועדפים', err)
// // // // // // //       });
// // // // // // //     }
// // // // // // //   }

// // // // // // //   removeFromFavorites(recipeId: number, event: Event) {
// // // // // // //     event.stopPropagation();
// // // // // // //     this.recipeService.toggleFavorite(recipeId).subscribe({
// // // // // // //       next: () => {
// // // // // // //         this.favorites = this.favorites.filter(f => f.id !== recipeId);
// // // // // // //       },
// // // // // // //       error: (err: any) => console.error('שגיאה בהסרה מהמועדפים', err)
// // // // // // //     });
// // // // // // //   }

// // // // // // //   // --- בקשת שדרוג חשבון ---
// // // // // // //   handleUpgradeRequest() {
// // // // // // //     const email = this.authService.currentUserValue?.email;
// // // // // // //     if (!email) return;
// // // // // // //     this.authService.requestUpgrade(email).subscribe({
// // // // // // //       next: (res: any) => alert(res.message || "הבקשה נשלחה למנהל"),
// // // // // // //       error: (err: any) => alert("שגיאה בשליחת בקשת השדרוג")
// // // // // // //     });
// // // // // // //   }

// // // // // // //   // --- ניווט וטיפול בתמונות ---
// // // // // // //   goToRecipe(id: number) {
// // // // // // //     this.router.navigate(['/recipe-details', id]);
// // // // // // //   }

// // // // // // //   goToAddRecipe() {
// // // // // // //     this.router.navigate(['/add-recipe']);
// // // // // // //   }

// // // // // // //   handleImageError(event: any) {
// // // // // // //     event.target.src = 'assets/images/placeholder-recipe.jpg';
// // // // // // //   }

// // // // // // //   goToAdmin(viewMode: string) {
// // // // // // //     this.router.navigate(['/admin-management'], { queryParams: { mode: viewMode } });
// // // // // // //   }
// // // // // // // }

// // // // // // import { Component, OnInit } from '@angular/core';
// // // // // // import { CommonModule } from '@angular/common'; 
// // // // // // import { AuthService } from '../../services/services/auth.service';
// // // // // // import { RecipeService } from '../../services/recipe.service'; 
// // // // // // import { UserDetailComponent } from '../personal-details/personal-details.component';
// // // // // // import { Router, RouterModule } from '@angular/router';
// // // // // // import { AppButtonComponent } from '../buton-basic/buton-basic.component';

// // // // // // @Component({
// // // // // //   selector: 'app-profile',
// // // // // //   standalone: true,
// // // // // //   imports: [CommonModule, RouterModule, UserDetailComponent, AppButtonComponent],
// // // // // //   templateUrl: './profile.component.html',
// // // // // //   styleUrl: './profile.component.css'
// // // // // // })
// // // // // // export class ProfileComponent implements OnInit {
// // // // // //   recipeCount: number = 0; 
// // // // // //   favorites: any[] = [];
// // // // // //   showFavorites: boolean = false;
// // // // // //   baseUrl = 'http://127.0.0.1:5000'; 
  
// // // // // //   // הוספנו את המשתנה הזה כדי שה-HTML יוכל להשתמש בו ישירות
// // // // // //   user: any = null;

// // // // // //   constructor(
// // // // // //     public authService: AuthService,
// // // // // //     private recipeService: RecipeService, 
// // // // // //     public router: Router // שינינו ל-public כדי שה-HTML יוכל להשתמש ב-router.navigate
// // // // // //   ) {}

// // // // // //   ngOnInit() {
// // // // // //     // שליפת נתוני המשתמש מה-Service
// // // // // //     this.user = this.authService.currentUserValue;
// // // // // //     this.loadUserStats();
// // // // // //   }

// // // // // //   private loadUserStats() {
// // // // // //     if (this.user?.username) {
// // // // // //       this.recipeService.getUserStats(this.user.username).subscribe({
// // // // // //         next: (res: any) => this.recipeCount = res.recipe_count,
// // // // // //         error: (err: any) => console.error("שגיאה בסטטיסטיקה", err)
// // // // // //       });
// // // // // //     }
// // // // // //   }

// // // // // //   // שאר הפונקציות (toggleFavorites וכו') נשארות אותו דבר...
// // // // // //   goToAddRecipe() {
// // // // // //     this.router.navigate(['/add-recipe']);
// // // // // //   }
  
// // // // // //   // handleUpgradeRequest() {
// // // // // //   //   if (!this.user?.email) return;
// // // // // //   //   this.authService.requestUpgrade(this.user.email).subscribe({
// // // // // //   //     next: (res: any) => alert(res.message),
// // // // // //   //     error: () => alert("שגיאה")
// // // // // //   //   });
// // // // // //   // }
// // // // // //   //   loadFavorites() {
// // // // // //   //   const user = this.authService.currentUserValue;
// // // // // //   //   if (user?.id) {
// // // // // //   //     this.recipeService.getFavorites(user.id).subscribe({
// // // // // //   //       next: (data: any[]) => this.favorites = data,
// // // // // //   //       error: (err: any) => console.error('שגיאה בטעינת מועדפים', err)
// // // // // //   //     });
// // // // // //   //   }
// // // // // //   // }

// // // // // //   // removeFromFavorites(recipeId: number, event: Event) {
// // // // // //   //   event.stopPropagation();
// // // // // //   //   this.recipeService.toggleFavorite(recipeId).subscribe({
// // // // // //   //     next: () => {
// // // // // //   //       this.favorites = this.favorites.filter(f => f.id !== recipeId);
// // // // // //   //     },
// // // // // //   //     error: (err: any) => console.error('שגיאה בהסרה מהמועדפים', err)
// // // // // //   //   });
// // // // // //   // }



// // // // // //   //   toggleFavorites() {
// // // // // //   //   this.showFavorites = !this.showFavorites;
// // // // // //   //   if (this.showFavorites && this.favorites.length === 0) {
// // // // // //   //     this.loadFavorites();
// // // // // //   //   }
// // // // // //   // }

// // // // // //   // loadFavorites() {
// // // // // //   //   const user = this.authService.currentUserValue;
// // // // // //   //   if (user?.id) {
// // // // // //   //     this.recipeService.getFavorites(user.id).subscribe({
// // // // // //   //       next: (data: any[]) => this.favorites = data,
// // // // // //   //       error: (err: any) => console.error('שגיאה בטעינת מועדפים', err)
// // // // // //   //     });
// // // // // //   //   }
// // // // // //   // }

// // // // // //   // removeFromFavorites(recipeId: number, event: Event) {
// // // // // //   //   event.stopPropagation();
// // // // // //   //   this.recipeService.toggleFavorite(recipeId).subscribe({
// // // // // //   //     next: () => {
// // // // // //   //       this.favorites = this.favorites.filter(f => f.id !== recipeId);
// // // // // //   //     },
// // // // // //   //     error: (err: any) => console.error('שגיאה בהסרה מהמועדפים', err)
// // // // // //   //   });
// // // // // //   // }

// // // // // //     handleUpgradeRequest() {
// // // // // //     const email = this.authService.currentUserValue?.email;
// // // // // //     if (!email) return;
// // // // // //     this.authService.requestUpgrade(email).subscribe({
// // // // // //       next: (res: any) => alert(res.message || "הבקשה נשלחה למנהל"),
// // // // // //       error: (err: any) => alert("שגיאה בשליחת בקשת השדרוג")
// // // // // //     });
// // // // // //   }
// // // // // //   goToAdmin(viewMode: string) {
// // // // // //     this.router.navigate(['/admin-management'], { queryParams: { mode: viewMode } });
// // // // // //   }
// // // // // //   goToRecipe(id: number) {
// // // // // //     this.router.navigate(['/recipe-details', id]);
// // // // // //   }

// // // // // //   // goToAddRecipe() {
// // // // // //   //   this.router.navigate(['/add-recipe']);
// // // // // //   // }
// // // // // // }
// // // // // import { Component, OnInit } from '@angular/core';
// // // // // import { CommonModule } from '@angular/common'; 
// // // // // import { AuthService } from '../../services/services/auth.service';
// // // // // import { RecipeService } from '../../services/recipe.service'; 
// // // // // import { UserDetailComponent } from '../personal-details/personal-details.component';
// // // // // import { Router, RouterModule } from '@angular/router';
// // // // // import { AppButtonComponent } from '../buton-basic/buton-basic.component';

// // // // // @Component({
// // // // //   selector: 'app-profile',
// // // // //   standalone: true,
// // // // //   imports: [CommonModule, RouterModule, UserDetailComponent, AppButtonComponent],
// // // // //   templateUrl: './profile.component.html',
// // // // //   styleUrl: './profile.component.css'
// // // // // })
// // // // // export class ProfileComponent implements OnInit {
// // // // //   recipeCount: number = 0; 
// // // // //   user: any = null;

// // // // //   constructor(
// // // // //     public authService: AuthService,
// // // // //     private recipeService: RecipeService, 
// // // // //     public router: Router 
// // // // //   ) {}

// // // // //   ngOnInit() {
// // // // //     this.user = this.authService.currentUserValue;
// // // // //     if (this.user?.role === 'Uploader' || this.user?.role === 'Admin') {
// // // // //       this.loadUserStats();
// // // // //     }
// // // // //   }

// // // // //   loadUserStats() {
// // // // //     this.recipeService.getUserStats(this.user.username).subscribe({
// // // // //       next: (res: any) => this.recipeCount = res.recipe_count,
// // // // //       error: (err) => console.error(err)
// // // // //     });
// // // // //   }

// // // // //   handleUpgradeRequest() {
// // // // //     this.authService.requestUpgrade(this.user.email).subscribe({
// // // // //       next: (res: any) => {
// // // // //         alert("הבקשה נשלחה! הסטטוס שלך שונה ל-'ממתין'.");
// // // // //         // עדכון מקומי של ה-Role כדי שה-UI יתעדכן מיד
// // // // //         this.user.role = 'Pending';
// // // // //       },
// // // // //       error: () => alert("שגיאה בשליחת הבקשה")
// // // // //     });
// // // // //   }

// // // // //   goToAddRecipe() {
// // // // //     this.router.navigate(['/add-recipe']);
// // // // //   }

// // // // //   goToAdmin(mode: string) {
// // // // //     this.router.navigate(['/admin-management'], { queryParams: { mode: mode } });
// // // // //   }
// // // // // }

// // // // // import { Component, OnInit, inject } from '@angular/core';
// // // // // import { CommonModule } from '@angular/common';
// // // // // import { AuthService } from '../../services/services/auth.service';
// // // // // import { RecipeService } from '../../services/recipe.service';
// // // // // import { UserDetailComponent } from '../personal-details/personal-details.component';
// // // // // import { Router, RouterModule } from '@angular/router';
// // // // // import { AppButtonComponent } from '../buton-basic/buton-basic.component';

// // // // // @Component({
// // // // //   selector: 'app-profile',
// // // // //   standalone: true,
// // // // //   imports: [CommonModule, RouterModule, UserDetailComponent, AppButtonComponent],
// // // // //   templateUrl: './profile.component.html',
// // // // //   styleUrl: './profile.component.css'
// // // // // })
// // // // // export class ProfileComponent implements OnInit {
// // // // //   // משתני נתונים
// // // // //   user: any = null;
// // // // //   recipeCount: number = 0;
// // // // //   myRecipes: any[] = [];
// // // // //   favorites: any[] = [];
  
// // // // //   // משתני מצב (UI)
// // // // //   showFavorites: boolean = false;
// // // // //   baseUrl = 'http://127.0.0.1:5000'; // וודאי שזה תואם לשרת שלך

// // // // //   constructor(
// // // // //     public authService: AuthService,
// // // // //     private recipeService: RecipeService,
// // // // //     public router: Router
// // // // //   ) {}

// // // // //   ngOnInit() {
// // // // //     // 1. שליפת נתוני המשתמש
// // // // //     this.user = this.authService.currentUserValue;

// // // // //     if (this.user) {
// // // // //       // 2. אם הוא בשלן/מנהל - טען את המתכונים שלו וסטטיסטיקה
// // // // //       if (this.user.role === 'Uploader' || this.user.role === 'Admin') {
// // // // //         this.loadUserStats();
// // // // //         this.loadMyRecipes();
// // // // //       }
// // // // //     }
// // // // //   }

// // // // //   // --- טעינת נתונים מהשרת ---

// // // // //   loadUserStats() {
// // // // //     if (!this.user?.username) return;
// // // // //     this.recipeService.getUserStats(this.user.username).subscribe({
// // // // //       next: (res: any) => this.recipeCount = res.recipe_count,
// // // // //       error: (err) => console.error('שגיאה בטעינת סטטיסטיקה', err)
// // // // //     });
// // // // //   }

// // // // //   loadMyRecipes() {
// // // // //     if (!this.user?.username) return;
// // // // //     this.recipeService.getUserRecipes(this.user.username).subscribe({
// // // // //       next: (data: any[]) => this.myRecipes = data,
// // // // //       error: (err) => console.error('שגיאה בטעינת מתכונים אישיים', err)
// // // // //     });
// // // // //   }

// // // // //   loadFavorites() {
// // // // //     if (!this.user?.id) return;
// // // // //     this.recipeService.getFavorites(this.user.id).subscribe({
// // // // //       next: (data: any[]) => this.favorites = data,
// // // // //       error: (err) => console.error('שגיאה בטעינת מועדפים', err)
// // // // //     });
// // // // //   }

// // // // //   // --- פעולות משתמש ---

// // // // //   handleUpgradeRequest() {
// // // // //     if (!this.user?.email) return;
// // // // //     this.authService.requestUpgrade(this.user.email).subscribe({
// // // // //       next: (res: any) => {
// // // // //         alert("הבקשה נשלחה! הסטטוס שלך שונה ל-'ממתין'.");
// // // // //         this.user.role = 'Pending'; // עדכון ה-UI מיד
// // // // //         this.user.is_approved_uploader='true'
// // // // //       },
// // // // //       error: () => alert("שגיאה בשליחת הבקשה")
// // // // //     });
// // // // //   }

// // // // //   toggleFavorites() {
// // // // //     this.showFavorites = !this.showFavorites;
// // // // //     if (this.showFavorites && this.favorites.length === 0) {
// // // // //       this.loadFavorites();
// // // // //     }
// // // // //   }

// // // // //   removeFromFavorites(recipeId: number, event: Event) {
// // // // //     event.stopPropagation(); // מונע ניווט למתכון בלחיצה על המחיקה
// // // // //     this.recipeService.toggleFavorite(recipeId).subscribe({
// // // // //       next: () => {
// // // // //         this.favorites = this.favorites.filter(f => f.id !== recipeId);
// // // // //       },
// // // // //       error: (err) => console.error('שגיאה בהסרה מהמועדפים', err)
// // // // //     });
// // // // //   }

// // // // //   deleteRecipe(recipeId: number, event: Event) {
// // // // //     event.stopPropagation();
// // // // //     if (confirm('האם למחוק את המתכון לצמיתות?')) {
// // // // //       this.recipeService.deleteRecipe(recipeId).subscribe({
// // // // //         next: () => {
// // // // //           this.myRecipes = this.myRecipes.filter(r => r.id !== recipeId);
// // // // //           this.recipeCount--;
// // // // //           alert('המתכון נמחק');
// // // // //         },
// // // // //         error: () => alert('שגיאה במחיקה')
// // // // //       });
// // // // //     }
// // // // //   }

// // // // //   // --- ניווט ---

// // // // //   goToAddRecipe() {
// // // // //     this.router.navigate(['/add-recipe']);
// // // // //   }

// // // // //   goToRecipe(id: number) {
// // // // //     this.router.navigate(['/recipe-details', id]);
// // // // //   }

// // // // //   editRecipe(id: number, event: Event) {
// // // // //     event.stopPropagation();
// // // // //     this.router.navigate(['/edit-recipe', id]);
// // // // //   }

// // // // //   goToAdmin(mode: string) {
// // // // //     this.router.navigate(['/admin-management'], { queryParams: { mode } });
// // // // //   }

// // // // //   handleImageError(event: any) {
// // // // //     event.target.src = 'assets/images/placeholder-recipe.jpg';
// // // // //   }
// // // // // }

// // // // import { Component, OnInit, inject } from '@angular/core';
// // // // import { CommonModule } from '@angular/common';
// // // // import { AuthService } from '../../services/services/auth.service';
// // // // import { RecipeService } from '../../services/recipe.service';
// // // // import { UserDetailComponent } from '../personal-details/personal-details.component';
// // // // import { Router, RouterModule } from '@angular/router';
// // // // import { AppButtonComponent } from '../buton-basic/buton-basic.component';
// // // // import { Recipe, User } from '../../recipe.model'; // ייבוא המודלים

// // // // interface UserStats {
// // // //   recipe_count: number;
// // // // }

// // // // @Component({
// // // //   selector: 'app-profile',
// // // //   standalone: true,
// // // //   imports: [CommonModule, RouterModule, UserDetailComponent, AppButtonComponent],
// // // //   templateUrl: './profile.component.html',
// // // //   styleUrl: './profile.component.css'
// // // // })
// // // // export class ProfileComponent implements OnInit {
// // // //   // החלפת any בטיפוסים חזקים
// // // //   user: User | null = null;
// // // //   recipeCount: number = 0;
// // // //   myRecipes: Recipe[] = [];
// // // //   favorites: Recipe[] = [];
  
// // // //   showFavorites: boolean = false;
// // // //   baseUrl = 'http://127.0.0.1:5000';

// // // //   constructor(
// // // //     public authService: AuthService,
// // // //     private recipeService: RecipeService,
// // // //     public router: Router
// // // //   ) {}

// // // //   ngOnInit() {
// // // //     this.user = this.authService.currentUserValue;

// // // //     if (this.user) {
// // // //       // עדכון הבדיקה לאותיות קטנות בהתאם למודל המעודכן
// // // //       if (this.user.role === 'uploader' || this.user.role === 'admin') {
// // // //         this.loadUserStats();
// // // //         this.loadMyRecipes();
// // // //       }
// // // //     }
// // // //   }

// // // //   loadUserStats() {
// // // //     if (!this.user?.username) return;
// // // //     this.recipeService.getUserStats(this.user.username).subscribe({
// // // //       next: (res: UserStats) => this.recipeCount = res.recipe_count,
// // // //       error: (err) => console.error('שגיאה בטעינת סטטיסטיקה', err)
// // // //     });
// // // //   }

// // // //   loadMyRecipes() {
// // // //     if (!this.user?.username) return;
// // // //     this.recipeService.getUserRecipes(this.user.username).subscribe({
// // // //       next: (data: Recipe[]) => this.myRecipes = data,
// // // //       error: (err) => console.error('שגיאה בטעינת מתכונים אישיים', err)
// // // //     });
// // // //   }

// // // //   loadFavorites() {
// // // //     if (!this.user?.id) return;
// // // //     this.recipeService.getFavorites(this.user.id).subscribe({
// // // //       next: (data: Recipe[]) => this.favorites = data,
// // // //       error: (err) => console.error('שגיאה בטעינת מועדפים', err)
// // // //     });
// // // //   }

// // // //   handleUpgradeRequest() {
// // // //     if (!this.user?.email) return;
// // // //     this.authService.requestUpgrade(this.user.email).subscribe({
// // // //       next: () => {
// // // //         alert("הבקשה נשלחה! הסטטוס שלך שונה ל-'ממתין'.");
// // // //         if (this.user) {
// // // //           this.user.role = 'pending'; // שימוש בערך lowercase מהמודל
// // // //         }
// // // //       },
// // // //       error: () => alert("שגיאה בשליחת הבקשה")
// // // //     });
// // // //   }

// // // //   toggleFavorites() {
// // // //     this.showFavorites = !this.showFavorites;
// // // //     if (this.showFavorites && this.favorites.length === 0) {
// // // //       this.loadFavorites();
// // // //     }
// // // //   }

// // // //   removeFromFavorites(recipeId: number, event: Event) {
// // // //     event.stopPropagation();
// // // //     this.recipeService.toggleFavorite(recipeId).subscribe({
// // // //       next: () => {
// // // //         this.favorites = this.favorites.filter(f => f.id !== recipeId);
// // // //       },
// // // //       error: (err) => console.error('שגיאה בהסרה מהמועדפים', err)
// // // //     });
// // // //   }

// // // //   deleteRecipe(recipeId: number, event: Event) {
// // // //     event.stopPropagation();
// // // //     if (confirm('האם למחוק את המתכון לצמיתות?')) {
// // // //       this.recipeService.deleteRecipe(recipeId).subscribe({
// // // //         next: () => {
// // // //           this.myRecipes = this.myRecipes.filter(r => r.id !== recipeId);
// // // //           this.recipeCount--;
// // // //           alert('המתכון נמחק');
// // // //         },
// // // //         error: () => alert('שגיאה במחיקה')
// // // //       });
// // // //     }
// // // //   }

// // // //   goToAddRecipe() {
// // // //     this.router.navigate(['/add-recipe']);
// // // //   }

// // // //   goToRecipe(id: number) {
// // // //     this.router.navigate(['/recipe-details', id]);
// // // //   }

// // // //   editRecipe(id: number, event: Event) {
// // // //     event.stopPropagation();
// // // //     this.router.navigate(['/edit-recipe', id]);
// // // //   }

// // // //   goToAdmin(mode: string) {
// // // //     this.router.navigate(['/admin-management'], { queryParams: { mode } });
// // // //   }

// // // //   handleImageError(event: Event) {
// // // //     const target = event.target as HTMLImageElement;
// // // //     target.src = 'assets/images/placeholder-recipe.jpg';
// // // //   }
// // // // }

// // // import { Component, OnInit, inject } from '@angular/core';
// // // import { CommonModule } from '@angular/common';
// // // import { AuthService } from '../../services/services/auth.service';
// // // import { RecipeService } from '../../services/recipe.service';
// // // import { UserDetailComponent } from '../personal-details/personal-details.component';
// // // import { Router, RouterModule } from '@angular/router';
// // // import { AppButtonComponent } from '../buton-basic/buton-basic.component';
// // // import { Recipe, User } from '../../recipe.model'; 

// // // interface UserStats {
// // //   recipe_count: number;
// // // }

// // // @Component({
// // //   selector: 'app-profile',
// // //   standalone: true,
// // //   imports: [CommonModule, RouterModule, UserDetailComponent, AppButtonComponent],
// // //   templateUrl: './profile.component.html',
// // //   styleUrl: './profile.component.css'
// // // })
// // // export class ProfileComponent implements OnInit {
// // //   user: User | null = null;
// // //   recipeCount: number = 0;
// // //   myRecipes: Recipe[] = [];
// // //   favorites: Recipe[] = [];
  
// // //   showFavorites: boolean = false;
// // //   baseUrl = 'http://127.0.0.1:5000';

// // //   constructor(
// // //     public authService: AuthService,
// // //     private recipeService: RecipeService,
// // //     public router: Router
// // //   ) {}

// // //   ngOnInit() {
// // //     // שליפת המשתמש הנוכחי
// // //     this.user = this.authService.currentUserValue;

// // //     if (this.user) {
// // //       // בדיקה מול lowercase כדי שהלוגיקה תעבוד
// // //       if (this.user.role === 'Uploader' || this.user.role === 'Admin') {
// // //         this.loadUserStats();
// // //         this.loadMyRecipes();
// // //       }
// // //     }
// // //   }

// // //   loadUserStats() {
// // //     if (!this.user?.username) return;
// // //     this.recipeService.getUserStats(this.user.username).subscribe({
// // //       next: (res: UserStats) => this.recipeCount = res.recipe_count,
// // //       error: (err) => console.error('שגיאה בטעינת סטטיסטיקה', err)
// // //     });
// // //   }

// // //   loadMyRecipes() {
// // //     if (!this.user?.username) return;
// // //     this.recipeService.getUserRecipes(this.user.username).subscribe({
// // //       next: (data: Recipe[]) => this.myRecipes = data,
// // //       error: (err) => console.error('שגיאה בטעינת מתכונים אישיים', err)
// // //     });
// // //   }

// // //   loadFavorites() {
// // //     if (!this.user?.id) return;
// // //     this.recipeService.getFavorites(this.user.id).subscribe({
// // //       next: (data: Recipe[]) => this.favorites = data,
// // //       error: (err) => console.error('שגיאה בטעינת מועדפים', err)
// // //     });
// // //   }

// // //   handleUpgradeRequest() {
// // //     if (!this.user?.email) return;
// // //     this.authService.requestUpgrade(this.user.email).subscribe({
// // //       next: () => {
// // //         alert("הבקשה נשלחה! הסטטוס שלך שונה ל-'ממתין'.");
// // //         if (this.user) {
// // //           this.user.role = 'Pending'; 
// // //         }
// // //       },
// // //       error: () => alert("שגיאה בשליחת הבקשה")
// // //     });
// // //   }

// // //   toggleFavorites() {
// // //     this.showFavorites = !this.showFavorites;
// // //     if (this.showFavorites && this.favorites.length === 0) {
// // //       this.loadFavorites();
// // //     }
// // //   }

// // //   removeFromFavorites(recipeId: number, event: Event) {
// // //     event.stopPropagation();
// // //     this.recipeService.toggleFavorite(recipeId).subscribe({
// // //       next: () => {
// // //         this.favorites = this.favorites.filter(f => f.id !== recipeId);
// // //       },
// // //       error: (err) => console.error('שגיאה בהסרה מהמועדפים', err)
// // //     });
// // //   }

// // //   deleteRecipe(recipeId: number, event: Event) {
// // //     event.stopPropagation();
// // //     if (confirm('האם למחוק את המתכון לצמיתות?')) {
// // //       this.recipeService.deleteRecipe(recipeId).subscribe({
// // //         next: () => {
// // //           this.myRecipes = this.myRecipes.filter(r => r.id !== recipeId);
// // //           this.recipeCount--;
// // //           alert('המתכון נמחק');
// // //         },
// // //         error: () => alert('שגיאה במחיקה')
// // //       });
// // //     }
// // //   }

// // //   goToAddRecipe() { this.router.navigate(['/add-recipe']); }
// // //   goToRecipe(id: number) { this.router.navigate(['/recipe-details', id]); }
// // //   editRecipe(id: number, event: Event) {
// // //     event.stopPropagation();
// // //     this.router.navigate(['/edit-recipe', id]);
// // //   }
// // //   goToAdmin(mode: string) {
// // //     this.router.navigate(['/admin-management'], { queryParams: { mode } });
// // //   }

// // //   handleImageError(event: Event) {
// // //     const target = event.target as HTMLImageElement;
// // //     target.src = 'assets/images/placeholder-recipe.jpg';
// // //   }
// // // }

// // // import { Component, OnInit } from '@angular/core';
// // // import { CommonModule } from '@angular/common';
// // // import { AuthService } from '../../services/services/aunth.service';
// // // import { RecipeService } from '../../services/recipe.service';
// // // import { UserDetailComponent } from '../personal-details/personal-details.component';
// // // import { Router, RouterModule } from '@angular/router';
// // // import { AppButtonComponent } from '../buton-basic/buton-basic.component';
// // // import { Recipe, User } from '../../recipe.model'; 

// // // interface UserStats {
// // //   recipe_count: number;
// // // }

// // // @Component({
// // //   selector: 'app-profile',
// // //   standalone: true,
// // //   imports: [CommonModule, RouterModule, UserDetailComponent, AppButtonComponent],
// // //   templateUrl: './profile.component.html',
// // //   styleUrl: './profile.component.css'
// // // })
// // // export class ProfileComponent implements OnInit {
// // //   user: User | null = null;
// // //   recipeCount: number = 0;
// // //   myRecipes: Recipe[] = [];
// // //   favorites: Recipe[] = [];
  
// // //   showFavorites: boolean = false;
// // //   baseUrl = 'http://127.0.0.1:5000';

// // //   constructor(
// // //     public authService: AuthService,
// // //     private recipeService: RecipeService,
// // //     public router: Router
// // //   ) {}

// // //   ngOnInit() {
// // //     this.user = this.authService.currentUserValue;

// // //     if (this.user) {
// // //       // עדכון הבדיקה לאותיות גדולות (Admin, Uploader)
// // //       if (this.user.role === 'Uploader' || this.user.role === 'Admin') {
// // //         this.loadUserStats();
// // //         this.loadMyRecipes();
// // //       }
// // //     }
// // //   }

// // //   loadUserStats() {
// // //     if (!this.user?.username) return;
// // //     this.recipeService.getUserStats(this.user.username).subscribe({
// // //       next: (res: UserStats) => this.recipeCount = res.recipe_count,
// // //       error: (err) => console.error('שגיאה בטעינת סטטיסטיקה', err)
// // //     });
// // //   }

// // //   loadMyRecipes() {
// // //     if (!this.user?.username) return;
// // //     this.recipeService.getUserRecipes(this.user.username).subscribe({
// // //       next: (data: Recipe[]) => this.myRecipes = data,
// // //       error: (err) => console.error('שגיאה בטעינת מתכונים אישיים', err)
// // //     });
// // //   }

// // //   loadFavorites() {
// // //     if (!this.user?.id) return;
// // //     this.recipeService.getFavorites(this.user.id).subscribe({
// // //       next: (data: Recipe[]) => this.favorites = data,
// // //       error: (err) => console.error('שגיאה בטעינת מועדפים', err)
// // //     });
// // //   }

// // //   handleUpgradeRequest() {
// // //     if (!this.user?.email) return;
// // //     this.authService.requestUpgrade(this.user.email).subscribe({
// // //       next: () => {
// // //         alert("הבקשה נשלחה! הסטטוס שלך שונה ל-'ממתין'.");
// // //         if (this.user) {
// // //           this.user.role = 'Pending'; // עדכון הטיפוס לאות גדולה
// // //         }
// // //       },
// // //       error: () => alert("שגיאה בשליחת הבקשה")
// // //     });
// // //   }

// // //   toggleFavorites() {
// // //     this.showFavorites = !this.showFavorites;
// // //     if (this.showFavorites && this.favorites.length === 0) {
// // //       this.loadFavorites();
// // //     }
// // //   }

// // //   removeFromFavorites(recipeId: number, event: Event) {
// // //     event.stopPropagation();
// // //     this.recipeService.toggleFavorite(recipeId).subscribe({
// // //       next: () => {
// // //         this.favorites = this.favorites.filter(f => f.id !== recipeId);
// // //       },
// // //       error: (err) => console.error('שגיאה בהסרה מהמועדפים', err)
// // //     });
// // //   }

// // //   deleteRecipe(recipeId: number, event: Event) {
// // //     event.stopPropagation();
// // //     if (confirm('האם למחוק את המתכון לצמיתות?')) {
// // //       this.recipeService.deleteRecipe(recipeId).subscribe({
// // //         next: () => {
// // //           this.myRecipes = this.myRecipes.filter(r => r.id !== recipeId);
// // //           this.recipeCount--;
// // //           alert('המתכון נמחק');
// // //         },
// // //         error: () => alert('שגיאה במחיקה')
// // //       });
// // //     }
// // //   }

// // //   goToAddRecipe() { this.router.navigate(['/add-recipe']); }
// // //   goToRecipe(id: number) { this.router.navigate(['/recipe-details', id]); }
  
// // //   editRecipe(id: number, event: Event) {
// // //     event.stopPropagation();
// // //     this.router.navigate(['/edit-recipe', id]);
// // //   }

// // //   // goToAdmin(mode: string) {
// // //   //   this.router.navigate(['/admin-management'], { queryParams: { mode } });
// // //   // }
// // // goToAdmin(mode: 'all' | 'pending') {
// // //   this.router.navigate(['/admin-management'], { queryParams: { mode } });
// // // }
// // //   handleImageError(event: Event) {
// // //     const target = event.target as HTMLImageElement;
// // //     target.src = 'assets/images/placeholder-recipe.jpg';
// // //   }
// // // }
// // import { Component, OnInit, inject } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { AuthService } from '../../services/services/aunth.service';
// // import { RecipeService } from '../../services/recipe.service';
// // import { UserDetailComponent } from '../personal-details/personal-details.component';
// // import { Router, RouterModule } from '@angular/router';
// // import { AppButtonComponent } from '../buton-basic/buton-basic.component';
// // import { Recipe, User } from '../../recipe.model'; 
// // import Swal from 'sweetalert2'; // חובה להתקין: npm install sweetalert2

// // interface UserStats {
// //   recipe_count: number;
// // }

// // @Component({
// //   selector: 'app-profile',
// //   standalone: true,
// //   imports: [CommonModule, RouterModule, UserDetailComponent, AppButtonComponent],
// //   templateUrl: './profile.component.html',
// //   styleUrl: './profile.component.css'
// // })
// // export class ProfileComponent implements OnInit {
// //   // שימוש ב-inject (מודרני יותר)
// //   public authService = inject(AuthService);
// //   private recipeService = inject(RecipeService);
// //   public router = inject(Router);

// //   user: User | null = null;
// //   recipeCount: number = 0;
// //   myRecipes: Recipe[] = [];
// //   favorites: Recipe[] = [];
  
// //   showFavorites: boolean = false;
// //   isLoading: boolean = true;
// //   baseUrl = 'http://127.0.0.1:5000';

// //   ngOnInit() {
// //     this.user = this.authService.currentUserValue;

// //     if (this.user) {
// //       this.initialLoad();
// //     } else {
// //       this.isLoading = false;
// //     }
// //   }

// //   /**
// //    * טעינה ראשונית של כל נתוני הפרופיל
// //    */
// //   private initialLoad() {
// //     this.isLoading = true;
// //     if (this.user?.role === 'Uploader' || this.user?.role === 'Admin') {
// //       this.loadUserStats();
// //       this.loadMyRecipes();
// //     }
// //     // תמיד נטען מועדפים ברקע כדי שהמעבר יהיה חלק
// //     this.loadFavorites();
// //     this.isLoading = false;
// //   }

// //   loadUserStats() {
// //     if (!this.user?.username) return;
// //     this.recipeService.getUserStats(this.user.username).subscribe({
// //       next: (res: UserStats) => this.recipeCount = res.recipe_count,
// //       error: (err) => console.error('שגיאה בטעינת סטטיסטיקה', err)
// //     });
// //   }

// //   loadMyRecipes() {
// //     if (!this.user?.username) return;
// //     this.recipeService.getUserRecipes(this.user.username).subscribe({
// //       next: (data: Recipe[]) => this.myRecipes = data,
// //       error: (err) => console.error('שגיאה בטעינת מתכונים אישיים', err)
// //     });
// //   }

// //   loadFavorites() {
// //     if (!this.user?.id) return;
// //     this.recipeService.getFavorites(this.user.id).subscribe({
// //       next: (data: Recipe[]) => this.favorites = data,
// //       error: (err) => console.error('שגיאה בטעינת מועדפים', err)
// //     });
// //   }

// //   /**
// //    * בקשת שדרוג עם הודעה מעוצבת
// //    */
// //   handleUpgradeRequest() {
// //     if (!this.user?.email) return;

// //     Swal.fire({
// //       title: 'רוצה להפוך לשף ב-Pasha?',
// //       text: 'שליחת בקשה תאפשר לך להעלות מתכונים משלך לקהילה.',
// //       icon: 'question',
// //       showCancelButton: true,
// //       confirmButtonColor: '#8c6d31',
// //       cancelButtonColor: '#1a1a1a',
// //       confirmButtonText: 'כן, שלחו בקשה!',
// //       cancelButtonText: 'אולי אחר כך'
// //     }).then((result) => {
// //       if (result.isConfirmed) {
// //         this.authService.requestUpgrade(this.user!.email).subscribe({
// //           next: () => {
// //             if (this.user) this.user.role = 'Pending';
// //             Swal.fire({
// //               title: 'הבקשה נשלחה!',
// //               text: 'הצוות שלנו יבחן אותה בקרוב.',
// //               icon: 'success',
// //               confirmButtonColor: '#8c6d31'
// //             });
// //           },
// //           error: () => Swal.fire('אופס...', 'שגיאה בשליחת הבקשה', 'error')
// //         });
// //       }
// //     });
// //   }

// //   toggleFavorites() {
// //     this.showFavorites = !this.showFavorites;
// //   }

// //   /**
// //    * הסרה מהמועדפים עם Toast קטן
// //    */
// //   removeFromFavorites(recipeId: number, event: Event) {
// //     event.stopPropagation();
// //     this.recipeService.toggleFavorite(recipeId).subscribe({
// //       next: () => {
// //         this.favorites = this.favorites.filter(f => f.id !== recipeId);
// //         const Toast = Swal.mixin({
// //           toast: true,
// //           position: 'top-end',
// //           showConfirmButton: false,
// //           timer: 2000,
// //           timerProgressBar: true
// //         });
// //         Toast.fire({ icon: 'info', title: 'הוסר מהמועדפים' });
// //       }
// //     });
// //   }

// //   /**
// //    * מחיקת מתכון עם אישור סופי
// //    */
// //   deleteRecipe(recipeId: number, event: Event) {
// //     event.stopPropagation();
// //     Swal.fire({
// //       title: 'למחוק את היצירה?',
// //       text: 'לא ניתן לשחזר מתכון שנמחק.',
// //       icon: 'warning',
// //       showCancelButton: true,
// //       confirmButtonColor: '#d33',
// //       cancelButtonColor: '#1a1a1a',
// //       confirmButtonText: 'כן, מחק לצמיתות',
// //       cancelButtonText: 'ביטול'
// //     }).then((result) => {
// //       if (result.isConfirmed) {
// //         this.recipeService.deleteRecipe(recipeId).subscribe({
// //           next: () => {
// //             this.myRecipes = this.myRecipes.filter(r => r.id !== recipeId);
// //             this.recipeCount--;
// //             Swal.fire('נמחק!', 'המתכון הוסר מהמטבח שלך.', 'success');
// //           },
// //           error: () => Swal.fire('שגיאה', 'המחיקה נכשלה', 'error')
// //         });
// //       }
// //     });
// //   }

// //   // ניווט מהיר
// //   goToAddRecipe() { this.router.navigate(['/add-recipe']); }
// //   goToRecipe(id: number) { this.router.navigate(['/recipe-details', id]); }
// //   editRecipe(id: number, event: Event) {
// //     event.stopPropagation();
// //     this.router.navigate(['/edit-recipe', id]);
// //   }

// //   goToAdmin(mode: 'all' | 'pending') {
// //     this.router.navigate(['/admin-management'], { queryParams: { mode } });
// //   }

// //   handleImageError(event: Event) {
// //     const target = event.target as HTMLImageElement;
// //     target.src = 'assets/images/placeholder-recipe.jpg';
// //   }
// // }
// import { Component, OnInit, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { AuthService } from '../../services/services/aunth.service';
// import { RecipeService } from '../../services/recipe.service';
// import { UserDetailComponent } from '../personal-details/personal-details.component';
// import { Router, RouterModule } from '@angular/router';
// import { AppButtonComponent } from '../buton-basic/buton-basic.component';
// import { Recipe, User } from '../../recipe.model'; 
// import Swal from 'sweetalert2';

// interface UserStats {
//   recipe_count: number;
// }

// @Component({
//   selector: 'app-profile',
//   standalone: true,
//   imports: [CommonModule, RouterModule, UserDetailComponent, AppButtonComponent],
//   templateUrl: './profile.component.html',
//   styleUrl: './profile.component.css'
// })
// export class ProfileComponent implements OnInit {
//   public authService = inject(AuthService);
//   private recipeService = inject(RecipeService);
//   public router = inject(Router);

//   user: User | null = null;
//   recipeCount: number = 0;
//   myRecipes: Recipe[] = [];
//   favorites: Recipe[] = [];
  
//   showFavorites: boolean = false;
//   isLoading: boolean = true;
//   loading: boolean = true; // נוסף כדי לפתור את שגיאת ה-Template
//   baseUrl = 'http://127.0.0.1:5000';

//   ngOnInit() {
//     this.user = this.authService.currentUserValue;
//     if (this.user) {
//       this.initialLoad();
//     } else {
//       this.isLoading = false;
//       this.loading = false;
//     }
//   }

//   private initialLoad() {
//     this.isLoading = true;
//     this.loading = true;

//     // טעינת נתונים לפי הרשאה
//     if (this.user?.role === 'Uploader' || this.user?.role === 'Admin') {
//       this.loadUserStats();
//       this.loadMyRecipes();
//     }
    
//     this.loadFavorites();

//     // דימוי סיום טעינה קטן לחוויה חלקה
//     setTimeout(() => {
//       this.isLoading = false;
//       this.loading = false;
//     }, 500);
//   }

//   loadUserStats() {
//     if (!this.user?.username) return;
//     this.recipeService.getUserStats(this.user.username).subscribe({
//       next: (res: UserStats) => this.recipeCount = res.recipe_count,
//       error: (err) => console.error('Stats error', err)
//     });
//   }

//   loadMyRecipes() {
//     if (!this.user?.username) return;
//     this.recipeService.getUserRecipes(this.user.username).subscribe({
//       next: (data: Recipe[]) => this.myRecipes = data,
//       error: (err) => console.error('Recipes error', err)
//     });
//   }

//   loadFavorites() {
//     if (!this.user?.id) return;
//     this.recipeService.getFavorites(this.user.id).subscribe({
//       next: (data: Recipe[]) => this.favorites = data,
//       error: (err) => console.error('Favorites error', err)
//     });
//   }

//   handleUpgradeRequest() {
//     if (!this.user?.email) return;

//     Swal.fire({
//       title: 'רוצה להפוך לשף ב-Pasha?',
//       text: 'שליחת בקשה תאפשר לך להעלות מתכונים משלך לקהילה.',
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonColor: '#8c6d31',
//       confirmButtonText: 'שלחו בקשה',
//       cancelButtonText: 'ביטול'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         this.authService.requestUpgrade(this.user!.email).subscribe({
//           next: () => {
//             if (this.user) this.user.role = 'Pending';
//             Swal.fire('נשלח!', 'הבקשה בטיפול.', 'success');
//           }
//         });
//       }
//     });
//   }

//   toggleFavorites() {
//     this.showFavorites = !this.showFavorites;
//   }

//   removeFromFavorites(recipeId: number, event: Event) {
//     event.stopPropagation();
//     this.recipeService.toggleFavorite(recipeId).subscribe({
//       next: () => {
//         this.favorites = this.favorites.filter(f => f.id !== recipeId);
//         Swal.fire({ toast: true, position: 'top-end', icon: 'info', title: 'הוסר מהמועדפים', showConfirmButton: false, timer: 1500 });
//       }
//     });
//   }

//   deleteRecipe(recipeId: number, event: Event) {
//     event.stopPropagation();
//     Swal.fire({
//       title: 'למחוק את היצירה?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       confirmButtonText: 'כן, מחק',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         this.recipeService.deleteRecipe(recipeId).subscribe({
//           next: () => {
//             this.myRecipes = this.myRecipes.filter(r => r.id !== recipeId);
//             this.recipeCount--;
//             Swal.fire('נמחק!', '', 'success');
//           }
//         });
//       }
//     });
//   }

//   goToAddRecipe() { this.router.navigate(['/add-recipe']); }
//   goToRecipe(id: number) { this.router.navigate(['/recipe-details', id]); }
//   editRecipe(id: number, event: Event) {
//     event.stopPropagation();
//     this.router.navigate(['/edit-recipe', id]);
//   }
//   goToAdmin(mode: 'all' | 'pending') {
//     this.router.navigate(['/admin-management'], { queryParams: { mode } });
//   }
//   handleImageError(event: Event) {
//     const target = event.target as HTMLImageElement;
//     target.src = 'assets/images/placeholder-recipe.jpg';
//   }
// }
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/services/aunth.service';
import { RecipeService } from '../../services/recipe.service';
import { UserDetailComponent } from '../personal-details/personal-details.component';
import { Router, RouterModule } from '@angular/router';
import { AppButtonComponent } from '../buton-basic/buton-basic.component';
import { Recipe, User } from '../../model'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, UserDetailComponent, AppButtonComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  public authService = inject(AuthService);
  private recipeService = inject(RecipeService);
  public router = inject(Router);

  user: User | null = null;
  recipeCount: number = 0;
  myRecipes: Recipe[] = [];
  favorites: Recipe[] = [];
  showFavorites: boolean = false;
  isLoading: boolean = true; // משמש לניהול לוגי פנימי
  baseUrl = 'http://127.0.0.1:5000';

  ngOnInit() {
    this.user = this.authService.currentUserValue;
    if (this.user) {
      this.initialLoad();
    }
  }

  private initialLoad() {
    if (this.user?.role === 'Uploader' || this.user?.role === 'Admin') {
      this.loadUserStats();
      this.loadMyRecipes();
    }
    this.loadFavorites();
  }

  loadUserStats() {
    if (!this.user?.username) return;
    this.recipeService.getUserStats(this.user.username).subscribe({
      next: (res) => this.recipeCount = res.recipe_count,
      error: (err) => console.error(err)
    });
  }

  loadMyRecipes() {
    if (!this.user?.username) return;
    this.recipeService.getUserRecipes(this.user.username).subscribe({
      next: (data) => this.myRecipes = data,
      error: (err) => console.error(err)
    });
  }

  loadFavorites() {
    this.recipeService.getFavorites().subscribe({
      next: (data) => this.favorites = data,
      error: (err) => console.error(err)
    });
  }

  handleImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/placeholder-recipe.jpg';
  }

  toggleFavorites() { this.showFavorites = !this.showFavorites; }
  
  editRecipe(id: number, event: Event) {
    event.stopPropagation();
    this.router.navigate(['/edit-recipe', id]);
  }

  deleteRecipe(id: number, event: Event) {
    event.stopPropagation();
    Swal.fire({
      title: 'למחוק?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'כן'
    }).then(result => {
      if(result.isConfirmed) {
        this.recipeService.deleteRecipe(id).subscribe(() => {
          this.myRecipes = this.myRecipes.filter(r => r.id !== id);
        });
      }
    });
  }

  removeFromFavorites(id: number, event: Event) {
    event.stopPropagation();
    this.recipeService.toggleFavorite(id).subscribe(() => {
      this.favorites = this.favorites.filter(f => f.id !== id);
    });
  }

  goToAddRecipe() { this.router.navigate(['/add-recipe']); }
  goToRecipe(id: number) { this.router.navigate(['/recipe-details', id]); }
  goToAdmin(mode: 'all' | 'pending') {
    this.router.navigate(['/admin-management'], { queryParams: { mode } });
  }

  // handleUpgradeRequest() {
  //  if (!this.user?.email) return;

  //   Swal.fire({
  //    title: 'רוצה להפוך לשף ב-Pasha?',
  //     text: 'שליחת בקשה תאפשר לך להעלות מתכונים משלך לקהילה.',
  //     icon: 'question',
  //     showCancelButton: true,
  //      confirmButtonColor: '#8c6d31',
  //      confirmButtonText: 'שלחו בקשה',
  //     cancelButtonText: 'ביטול'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.authService.requestUpgrade(this.user!.email).subscribe({
  //         next: () => {
  //           if (this.user) this.user.role = 'Pending';
  //           Swal.fire('נשלח!', 'הבקשה בטיפול.', 'success');
  //         }
  //       });
  //     }
  //    });
  // }
  handleUpgradeRequest(user: User) {
  if (!user.email) return;

  Swal.fire({
    title: 'רוצה להפוך לשף ב-Pasha?',
    text: 'שליחת בקשה תאפשר לך להעלות מתכונים משלך לקהילה.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#8c6d31',
    confirmButtonText: 'שלחו בקשה',
    cancelButtonText: 'ביטול'
  }).then((result) => {
    if (result.isConfirmed) {
      this.authService.requestUpgrade(user.email).subscribe({
        next: () => {
          user.role = 'Pending';
          Swal.fire('נשלח!', 'הבקשה בטיפול.', 'success');
        }
      });
    }
  });
}

}