// // // // // // // // // // // // import { Component, OnInit } from '@angular/core';
// // // // // // // // // // // // import { RecipeService } from '../../services/recipe.service';
// // // // // // // // // // // // import { CommonModule } from '@angular/common';
// // // // // // // // // // // // import { Router } from '@angular/router'; // ייבוא הראוטר לניווט

// // // // // // // // // // // // @Component({
// // // // // // // // // // // //   selector: 'app-recipe-list',
// // // // // // // // // // // //   standalone: true,
// // // // // // // // // // // //   imports: [CommonModule],
// // // // // // // // // // // //   templateUrl: './recipe-list.component.html',
// // // // // // // // // // // //   styleUrls: ['./recipe-list.component.css']
// // // // // // // // // // // // })
// // // // // // // // // // // // export class RecipeListComponent implements OnInit {
// // // // // // // // // // // //   recipes: any[] = [];
// // // // // // // // // // // //   baseUrl = 'http://127.0.0.1:5000';

// // // // // // // // // // // //   constructor(private recipeService: RecipeService, private router: Router) {}

// // // // // // // // // // // //   ngOnInit(): void {
// // // // // // // // // // // //     this.recipeService.getAllRecipes().subscribe(data => this.recipes = data);
// // // // // // // // // // // //   }

// // // // // // // // // // // //   // פונקציה למעבר לדף פרטים נוספים
// // // // // // // // // // // //   viewDetails(id: number) {
// // // // // // // // // // // //     this.router.navigate(['/recipe-details', id]);
// // // // // // // // // // // //   }
// // // // // // // // // // // // }

// // // // // // // // // // // import { Component, OnInit } from '@angular/core';
// // // // // // // // // // // import { RecipeService } from '../../services/recipe.service';
// // // // // // // // // // // import { CommonModule } from '@angular/common';
// // // // // // // // // // // import { Router } from '@angular/router';

// // // // // // // // // // // @Component({
// // // // // // // // // // //   selector: 'app-recipe-list',
// // // // // // // // // // //   standalone: true,
// // // // // // // // // // //   imports: [CommonModule],
// // // // // // // // // // //   templateUrl: './recipe-list.component.html',
// // // // // // // // // // //   styleUrls: ['./recipe-list.component.css']
// // // // // // // // // // // })
// // // // // // // // // // // export class RecipeListComponent implements OnInit {
// // // // // // // // // // //   recipes: any[] = [];
// // // // // // // // // // //   baseUrl = 'http://127.0.0.1:5000';
// // // // // // // // // // //   isAdmin: boolean = false; // משתנה לבדיקת הרשאת מנהל

// // // // // // // // // // //   constructor(private recipeService: RecipeService, private router: Router) {}

// // // // // // // // // // //   ngOnInit(): void {
// // // // // // // // // // //     this.loadRecipes();
// // // // // // // // // // //     this.checkAdminStatus();
// // // // // // // // // // //   }

// // // // // // // // // // //   loadRecipes(): void {
// // // // // // // // // // //     this.recipeService.getAllRecipes().subscribe(data => {
// // // // // // // // // // //       this.recipes = data;
// // // // // // // // // // //     });
// // // // // // // // // // //   }

// // // // // // // // // // //   checkAdminStatus(): void {
// // // // // // // // // // //     // שליפת התפקיד מהאחסון המקומי (וודאי שזה השם שבו את שומרת את התפקיד)
// // // // // // // // // // //     const role = localStorage.getItem('userRole'); 
// // // // // // // // // // //     this.isAdmin = role === 'Admin';
// // // // // // // // // // //   }

// // // // // // // // // // //   // פונקציה למעבר לדף פרטים נוספים
// // // // // // // // // // //   viewDetails(id: number) {
// // // // // // // // // // //     this.router.navigate(['/recipe-details', id]);
// // // // // // // // // // //   }

// // // // // // // // // // //   // פונקציית המחיקה החדשה
// // // // // // // // // // //   deleteRecipe(id: number, event: Event) {
// // // // // // // // // // //     event.stopPropagation(); // מונע מהקליק להפעיל אירועים אחרים בכרטיסייה
    
// // // // // // // // // // //     if (confirm('האם את בטוחה שברצונך למחוק מתכון זה?')) {
// // // // // // // // // // //       this.recipeService.deleteRecipe(id).subscribe({
// // // // // // // // // // //         next: () => {
// // // // // // // // // // //           // עדכון הרשימה המקומית כדי שהמתכון ייעלם מהמסך מיד
// // // // // // // // // // //           this.recipes = this.recipes.filter(r => r.id !== id);
// // // // // // // // // // //           alert('המתכון נמחק בהצלחה');
// // // // // // // // // // //         },
// // // // // // // // // // //         error: (err) => {
// // // // // // // // // // //           console.error('Delete error:', err);
// // // // // // // // // // //           alert('חלה שגיאה במחיקת המתכון');
// // // // // // // // // // //         }
// // // // // // // // // // //       });
// // // // // // // // // // //     }
// // // // // // // // // // //   }
// // // // // // // // // // // }

// // // // // // // // // // import { Component, OnInit, OnDestroy } from '@angular/core';
// // // // // // // // // // import { RecipeService } from '../../services/recipe.service';
// // // // // // // // // // import { AuthService } from '../../services/services/auth.service'; // ייבוא ה-AuthService
// // // // // // // // // // import { CommonModule } from '@angular/common';
// // // // // // // // // // import { Router } from '@angular/router';
// // // // // // // // // // import { Subscription } from 'rxjs';
// // // // // // // // // // import { HttpClient } from '@angular/common/http';
// // // // // // // // // // import { SmartSearchComponent } from '../smart-sort/smart-sort.component';

// // // // // // // // // // @Component({
// // // // // // // // // //   selector: 'app-recipe-list',
// // // // // // // // // //   standalone: true,
// // // // // // // // // //   imports: [CommonModule,SmartSearchComponent],
// // // // // // // // // //   templateUrl: './recipe-list.component.html',
// // // // // // // // // //   styleUrls: ['./recipe-list.component.css']
// // // // // // // // // // })
// // // // // // // // // // export class RecipeListComponent implements OnInit, OnDestroy {
// // // // // // // // // //   recipes: any[] = [];
// // // // // // // // // //   baseUrl = 'http://127.0.0.1:5000';
  
// // // // // // // // // //   // המשתנה שיחזיק את המשתמש הנוכחי עבור ה-HTML
// // // // // // // // // //   user: any = null;
// // // // // // // // // //   private userSub: Subscription | undefined;

// // // // // // // // // //   constructor(
// // // // // // // // // //     private recipeService: RecipeService, 
// // // // // // // // // //     private authService: AuthService, // הזרקת ה-AuthService
// // // // // // // // // //     private router: Router,
// // // // // // // // // //     // private http: HttpClient
// // // // // // // // // //   ) {}

// // // // // // // // // //   ngOnInit(): void {
// // // // // // // // // //     this.loadRecipes();
    
// // // // // // // // // //     // האזנה לשינויים במשתמש המחובר באופן ריאקטיבי
// // // // // // // // // //     this.userSub = this.authService.currentUser$.subscribe(userData => {
// // // // // // // // // //       this.user = userData;
// // // // // // // // // //     });
// // // // // // // // // //   }

// // // // // // // // // //   ngOnDestroy(): void {
// // // // // // // // // //     // ניקוי ה-Subscription כדי למנוע זליגת זיכרון
// // // // // // // // // //     if (this.userSub) {
// // // // // // // // // //       this.userSub.unsubscribe();
// // // // // // // // // //     }
// // // // // // // // // //   }

// // // // // // // // // //   loadRecipes(): void {
// // // // // // // // // //     this.recipeService.getAllRecipes().subscribe(data => {
// // // // // // // // // //       this.recipes = data;
// // // // // // // // // //     });
// // // // // // // // // //   }

// // // // // // // // // //   viewDetails(id: number) {
// // // // // // // // // //     this.router.navigate(['/recipe-details', id]);
// // // // // // // // // //   }

// // // // // // // // // //   deleteRecipe(id: number, event: Event) {
// // // // // // // // // //     event.stopPropagation();
    
// // // // // // // // // //     if (confirm('האם את בטוחה שברצונך למחוק מתכון זה?')) {
// // // // // // // // // //       this.recipeService.deleteRecipe(id).subscribe({
// // // // // // // // // //         next: () => {
// // // // // // // // // //           this.recipes = this.recipes.filter(r => r.id !== id);
// // // // // // // // // //           alert('המתכון נמחק בהצלחה');
// // // // // // // // // //         },
// // // // // // // // // //         error: (err) => {
// // // // // // // // // //           console.error('Delete error:', err);
// // // // // // // // // //           alert('חלה שגיאה במחיקת המתכון. וודא שאתה מחובר כמנהל.');
// // // // // // // // // //         }
// // // // // // // // // //       });
// // // // // // // // // //     }
// // // // // // // // // //   }
// // // // // // // // // //   toggleFavorite(recipe: any, event: Event) {
// // // // // // // // // //   event.stopPropagation(); // מונע כניסה לדף המתכון כשלוחצים על הלב
  
// // // // // // // // // //   this.recipeService.toggleFavorite(recipe.id).subscribe({
// // // // // // // // // //     next: (response) => {
// // // // // // // // // //       // עדכון הסטטוס מקומית כדי שהלב ישנה צבע מיד
// // // // // // // // // //       recipe.isFavorite = (response.status === 'added');
// // // // // // // // // //       // אפשר להוסיף Toast או הודעה קטנה
// // // // // // // // // //     },
// // // // // // // // // //     error: (err) => console.error('Error toggling favorite', err)
// // // // // // // // // //   });
// // // // // // // // // // }

// // // // // // // // // // //   deleteRecipe(id: number): Observable<any> {
// // // // // // // // // // //   // אנחנו חייבים לשלוח את ה-Role ב-Headers כדי שהשרת יאשר את המחיקה
// // // // // // // // // // //   const role = this.authService.currentUserValue?.role || '';
// // // // // // // // // // //   const headers = new HttpHeaders().set('x-user-role', role);

// // // // // // // // // // //   return this.http.delete(`${this.apiUrl}/delete/${id}`, { headers });
// // // // // // // // // // // }
// // // // // // // // // // }

// // // // // // // // // import { Component, OnInit, OnDestroy } from '@angular/core';
// // // // // // // // // import { RecipeService } from '../../services/recipe.service';
// // // // // // // // // import { AuthService } from '../../services/services/auth.service';
// // // // // // // // // import { CommonModule } from '@angular/common';
// // // // // // // // // import { Router } from '@angular/router';
// // // // // // // // // import { Subscription } from 'rxjs';
// // // // // // // // // import { SmartSearchComponent } from '../smart-sort/smart-sort.component';

// // // // // // // // // @Component({
// // // // // // // // //   selector: 'app-recipe-list',
// // // // // // // // //   standalone: true,
// // // // // // // // //   imports: [CommonModule, SmartSearchComponent],
// // // // // // // // //   templateUrl: './recipe-list.component.html',
// // // // // // // // //   styleUrls: ['./recipe-list.component.css']
// // // // // // // // // })
// // // // // // // // // export class RecipeListComponent implements OnInit, OnDestroy {
// // // // // // // // //   recipes: any[] = [];
// // // // // // // // //   baseUrl = 'http://127.0.0.1:5000/static/'; // הוספת /static לנתיב התמונות
  
// // // // // // // // //   user: any = null;
// // // // // // // // //   private userSub: Subscription | undefined;

// // // // // // // // //   constructor(
// // // // // // // // //     private recipeService: RecipeService, 
// // // // // // // // //     private authService: AuthService,
// // // // // // // // //     private router: Router
// // // // // // // // //   ) {}

// // // // // // // // //   ngOnInit(): void {
// // // // // // // // //     // 1. טעינת מתכונים
// // // // // // // // //     this.loadRecipes();
    
// // // // // // // // //     // 2. האזנה למשתמש המחובר
// // // // // // // // //     this.userSub = this.authService.currentUser$.subscribe(userData => {
// // // // // // // // //       this.user = userData;
// // // // // // // // //     });
// // // // // // // // //   }

// // // // // // // // //   ngOnDestroy(): void {
// // // // // // // // //     if (this.userSub) {
// // // // // // // // //       this.userSub.unsubscribe();
// // // // // // // // //     }
// // // // // // // // //   }

// // // // // // // // //   loadRecipes(): void {
// // // // // // // // //     this.recipeService.getAllRecipes().subscribe({
// // // // // // // // //       next: (data) => {
// // // // // // // // //         this.recipes = data;
// // // // // // // // //       },
// // // // // // // // //       error: (err) => console.error('שגיאה בטעינת מתכונים', err)
// // // // // // // // //     });
// // // // // // // // //   }

// // // // // // // // //   viewDetails(id: number) {
// // // // // // // // //     this.router.navigate(['/recipe-details', id]);
// // // // // // // // //   }

// // // // // // // // //   deleteRecipe(id: number, event: Event) {
// // // // // // // // //     event.stopPropagation();
    
// // // // // // // // //     if (confirm('האם את בטוחה שברצונך למחוק מתכון זה?')) {
// // // // // // // // //       this.recipeService.deleteRecipe(id).subscribe({
// // // // // // // // //         next: () => {
// // // // // // // // //           this.recipes = this.recipes.filter(r => r.id !== id);
// // // // // // // // //           alert('המתכון נמחק בהצלחה');
// // // // // // // // //         },
// // // // // // // // //         error: (err) => {
// // // // // // // // //           console.error('Delete error:', err);
// // // // // // // // //           alert('חלה שגיאה במחיקת המתכון. וודא שאתה מחובר כמנהל.');
// // // // // // // // //         }
// // // // // // // // //       });
// // // // // // // // //     }
// // // // // // // // //   }

// // // // // // // // //   toggleFavorite(recipe: any, event: Event) {
// // // // // // // // //     event.stopPropagation();
    
// // // // // // // // //     if (!this.user) {
// // // // // // // // //       alert('יש להתחבר כדי להוסיף למועדפים');
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     this.recipeService.toggleFavorite(recipe.id).subscribe({
// // // // // // // // //       next: (response) => {
// // // // // // // // //         // השרת מחזיר בדרך כלל הודעה אם התווסף או הוסר
// // // // // // // // //         recipe.isFavorite = !recipe.isFavorite;
// // // // // // // // //       },
// // // // // // // // //       error: (err) => console.error('Error toggling favorite', err)
// // // // // // // // //     });
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // import { Component, OnInit, OnDestroy } from '@angular/core';
// // // // // // // // import { RecipeService } from '../../services/recipe.service';
// // // // // // // // import { AuthService } from '../../services/services/auth.service';
// // // // // // // // import { CommonModule } from '@angular/common';
// // // // // // // // import { Router } from '@angular/router';
// // // // // // // // import { Subscription } from 'rxjs';
// // // // // // // // import { SmartSearchComponent } from '../smart-sort/smart-sort.component';

// // // // // // // // @Component({
// // // // // // // //   selector: 'app-recipe-list',
// // // // // // // //   standalone: true,
// // // // // // // //   imports: [CommonModule, SmartSearchComponent],
// // // // // // // //   templateUrl: './recipe-list.component.html',
// // // // // // // //   styleUrls: ['./recipe-list.component.css']
// // // // // // // // })
// // // // // // // // export class RecipeListComponent implements OnInit, OnDestroy {
// // // // // // // //   recipes: any[] = [];
// // // // // // // //   // השרת שלך שומר ב-static/uploads, לכן ה-BaseUrl חייב להתאים
// // // // // // // //   baseUrl = 'http://127.0.0.1:5000'; 
  
// // // // // // // //   user: any = null;
// // // // // // // //   private userSub: Subscription | undefined;

// // // // // // // //   constructor(
// // // // // // // //     private recipeService: RecipeService, 
// // // // // // // //     private authService: AuthService,
// // // // // // // //     private router: Router
// // // // // // // //   ) {}

// // // // // // // //   ngOnInit(): void {
// // // // // // // //     this.loadRecipes();
    
// // // // // // // //     // מעקב אחרי המשתמש המחובר
// // // // // // // //     this.userSub = this.authService.currentUser$.subscribe(userData => {
// // // // // // // //       this.user = userData;
// // // // // // // //     });
// // // // // // // //   }

// // // // // // // //   ngOnDestroy(): void {
// // // // // // // //     if (this.userSub) {
// // // // // // // //       this.userSub.unsubscribe();
// // // // // // // //     }
// // // // // // // //   }

// // // // // // // //   loadRecipes(): void {
// // // // // // // //     this.recipeService.getAllRecipes().subscribe({
// // // // // // // //       next: (data) => {
// // // // // // // //         this.recipes = data;
// // // // // // // //       },
// // // // // // // //       error: (err) => console.error('Error loading recipes', err)
// // // // // // // //     });
// // // // // // // //   }

// // // // // // // //   viewDetails(id: number) {
// // // // // // // //     this.router.navigate(['/recipe-details', id]);
// // // // // // // //   }

// // // // // // // //   deleteRecipe(id: number, event: Event) {
// // // // // // // //     event.stopPropagation();
// // // // // // // //     if (confirm('האם את בטוחה שברצונך למחוק מתכון זה?')) {
// // // // // // // //       this.recipeService.deleteRecipe(id).subscribe({
// // // // // // // //         next: () => {
// // // // // // // //           this.recipes = this.recipes.filter(r => r.id !== id);
// // // // // // // //         },
// // // // // // // //         error: (err) => alert('מחיקה נכשלה: ' + err.error?.message)
// // // // // // // //       });
// // // // // // // //     }
// // // // // // // //   }

// // // // // // // //   toggleFavorite(recipe: any, event: Event) {
// // // // // // // //     event.stopPropagation();
// // // // // // // //     if (!this.user) {
// // // // // // // //       alert('אנא התחבר כדי להוסיף למועדפים');
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     this.recipeService.toggleFavorite(recipe.id).subscribe({
// // // // // // // //       next: (res) => {
// // // // // // // //         // עדכון מצב הלב ב-UI
// // // // // // // //         recipe.isFavorite = (res.status === 'added');
// // // // // // // //       }
// // // // // // // //     });
// // // // // // // //   }
// // // // // // // //   selectedIds: number[] = [];
// // // // // // // // shoppingListData: any = null; // כאן תישמר התוצאה מהשרת

// // // // // // // // toggleRecipeSelection(id: number) {
// // // // // // // //   const index = this.selectedIds.indexOf(id);
// // // // // // // //   if (index > -1) {
// // // // // // // //     this.selectedIds.splice(index, 1); // הסרה אם כבר נבחר
// // // // // // // //   } else {
// // // // // // // //     this.selectedIds.push(id); // הוספה אם לא נבחר
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // generateList() {
// // // // // // // //   this.recipeService.generateShoppingList(this.selectedIds).subscribe(data => {
// // // // // // // //     this.shoppingListData = data; // זה יגרום לקומפוננטה החדשה שפתחנו "לקפוץ"
// // // // // // // //   });
// // // // // // // // }
// // // // // // // // }

// // // // // // // // import { Component, OnInit, OnDestroy } from '@angular/core';
// // // // // // // // import { RecipeService } from '../../services/recipe.service';
// // // // // // // // import { AuthService } from '../../services/services/auth.service';
// // // // // // // // import { CommonModule } from '@angular/common';
// // // // // // // // import { Router } from '@angular/router';
// // // // // // // // import { Subscription } from 'rxjs';
// // // // // // // // import { SmartSearchComponent } from '../smart-sort/smart-sort.component';
// // // // // // // // import { ShoppingListComponent } from '../shoping-list/shoping-list.component';
// // // // // // // // // import { SmartSearchComponent } from '../smart-sort/smart-sort.component';
// // // // // // // // // import { ShoppingListComponent } from '../shoping-list/shoping-list.component';

// // // // // // // // @Component({
// // // // // // // //   selector: 'app-recipe-list',
// // // // // // // //   standalone: true,
// // // // // // // //   imports: [CommonModule, SmartSearchComponent,ShoppingListComponent, ],// הוספת ShoppingListComponent כאן
// // // // // // // //   templateUrl: './recipe-list.component.html',
// // // // // // // //   styleUrls: ['./recipe-list.component.css']
// // // // // // // // })
// // // // // // // // import { Component, OnInit, OnDestroy } from '@angular/core';
// // // // // // // // import { CommonModule } from '@angular/common';
// // // // // // // // import { RecipeService } from '../../services/recipe.service';
// // // // // // // // import { AuthService } from '../../services/services/auth.service';
// // // // // // // // import { Router } from '@angular/router';
// // // // // // // // import { Subscription } from 'rxjs';
// // // // // // // // import { SmartSearchComponent } from '../smart-sort/smart-sort.component';
// // // // // // // // // שימי לב לנתיב - השתמשתי ב-p אחת כמו בתיקייה שלך
// // // // // // // // import { ShoppingListComponent } from '../shoping-list/shoping-list.component'; 

// // // // // // // // @Component({
// // // // // // // //   selector: 'app-recipe-list',
// // // // // // // //   standalone: true,
// // // // // // // //   imports: [
// // // // // // // //     CommonModule, 
// // // // // // // //     SmartSearchComponent, 
// // // // // // // //     ShoppingListComponent // בלי פסיקים מיותרים ובלי תווים מוזרים
// // // // // // // //   ],
// // // // // // // //   templateUrl: './recipe-list.component.html',
// // // // // // // //   styleUrls: ['./recipe-list.component.css']
// // // // // // // // })


// // // // // // // // export class RecipeListComponent implements OnInit, OnDestroy {
// // // // // // // //   recipes: any[] = [];
// // // // // // // //   baseUrl = 'http://127.0.0.1:5000'; 
  
// // // // // // // //   user: any = null;
// // // // // // // //   private userSub: Subscription | undefined;

// // // // // // // //   // משתנים לניהול רשימת הקניות
// // // // // // // //   selectedIds: number[] = [];
// // // // // // // //   shoppingListData: any = null;

// // // // // // // //   constructor(
// // // // // // // //     private recipeService: RecipeService, 
// // // // // // // //     public authService: AuthService,
// // // // // // // //     private router: Router
// // // // // // // //   ) {}

// // // // // // // //   ngOnInit(): void {
// // // // // // // //     this.loadRecipes();
// // // // // // // //     this.userSub = this.authService.currentUser$.subscribe(userData => {
// // // // // // // //       this.user = userData;
// // // // // // // //     });
// // // // // // // //   }

// // // // // // // //   ngOnDestroy(): void {
// // // // // // // //     if (this.userSub) {
// // // // // // // //       this.userSub.unsubscribe();
// // // // // // // //     }
// // // // // // // //   }

// // // // // // // //   loadRecipes(): void {
// // // // // // // //     this.recipeService.getAllRecipes().subscribe({
// // // // // // // //       next: (data) => this.recipes = data,
// // // // // // // //       error: (err) => console.error('Error loading recipes', err)
// // // // // // // //     });
// // // // // // // //   }

// // // // // // // //   viewDetails(id: number) {
// // // // // // // //     this.router.navigate(['/recipe-details', id]);
// // // // // // // //   }

// // // // // // // //   deleteRecipe(id: number, event: Event) {
// // // // // // // //     event.stopPropagation();
// // // // // // // //     if (confirm('האם את בטוחה שברצונך למחוק מתכון זה?')) {
// // // // // // // //       this.recipeService.deleteRecipe(id).subscribe({
// // // // // // // //         next: () => this.recipes = this.recipes.filter(r => r.id !== id),
// // // // // // // //         error: (err) => alert('מחיקה נכשלה: ' + err.error?.message)
// // // // // // // //       });
// // // // // // // //     }
// // // // // // // //   }

// // // // // // // //   toggleFavorite(recipe: any, event: Event) {
// // // // // // // //     event.stopPropagation();
// // // // // // // //     if (!this.user) {
// // // // // // // //       alert('אנא התחבר כדי להוסיף למועדפים');
// // // // // // // //       return;
// // // // // // // //     }
// // // // // // // //     this.recipeService.toggleFavorite(recipe.id).subscribe({
// // // // // // // //       next: (res) => recipe.isFavorite = (res.status === 'added')
// // // // // // // //     });
// // // // // // // //   }

// // // // // // // //   // פונקציות בחירת מתכונים לרשימה
// // // // // // // //   toggleRecipeSelection(id: number) {
// // // // // // // //     const index = this.selectedIds.indexOf(id);
// // // // // // // //     if (index > -1) {
// // // // // // // //       this.selectedIds.splice(index, 1);
// // // // // // // //     } else {
// // // // // // // //       this.selectedIds.push(id);
// // // // // // // //     }
// // // // // // // //   }

// // // // // // // //   generateList() {
// // // // // // // //     if (this.selectedIds.length === 0) return;
// // // // // // // //     this.recipeService.generateShoppingList(this.selectedIds).subscribe({
// // // // // // // //       next: (data) => {
// // // // // // // //         this.shoppingListData = data;
// // // // // // // //       },
// // // // // // // //       error: (err) => console.error("Error generating list", err)
// // // // // // // //     });
// // // // // // // //   }
// // // // // // // // }import { Component, OnInit, OnDestroy } from '@angular/core';
// // // // // // // import { CommonModule } from '@angular/common';
// // // // // // // import { FormsModule } from '@angular/forms'; // הוספנו לצורך הסינונים
// // // // // // // import { RecipeService } from '../../services/recipe.service';
// // // // // // // import { AuthService } from '../../services/services/auth.service';
// // // // // // // import { Router } from '@angular/router';
// // // // // // // import { Subscription } from 'rxjs';
// // // // // // // import { SmartSearchComponent } from '../smart-sort/smart-sort.component';
// // // // // // // import { ShoppingListComponent } from '../shoping-list/shoping-list.component'; 
// // // // // // // import { Component, OnDestroy, OnInit } from '@angular/core';

// // // // // // // @Component({
// // // // // // //   selector: 'app-recipe-list',
// // // // // // //   standalone: true,
// // // // // // //   imports: [
// // // // // // //     CommonModule, 
// // // // // // //     FormsModule, // הוספנו כאן
// // // // // // //     SmartSearchComponent, 
// // // // // // //     ShoppingListComponent
// // // // // // //   ],
// // // // // // //   templateUrl: './recipe-list.component.html',
// // // // // // //   styleUrls: ['./recipe-list.component.css']
// // // // // // // })
// // // // // // // export class RecipeListComponent implements OnInit, OnDestroy {
// // // // // // //   allRecipes: any[] = [];      // כל המתכונים מהשרת
// // // // // // //   filteredRecipes: any[] = []; // המתכונים שמוצגים לאחר סינון
// // // // // // //   baseUrl = 'http://127.0.0.1:5000'; 
  
// // // // // // //   user: any = null;
// // // // // // //   private userSub: Subscription | undefined;

// // // // // // //   // משתני סינון
// // // // // // //   filters = {
// // // // // // //     searchQuery: '',
// // // // // // //     type: '',     // כשרות
// // // // // // //     category: '', // קטגוריה
// // // // // // //     maxTime: 180  // זמן הכנה מקסימלי
// // // // // // //   };

// // // // // // //   // משתני רשימת קניות
// // // // // // //   selectedIds: number[] = [];
// // // // // // //   shoppingListData: any = null;

// // // // // // //   constructor(
// // // // // // //     private recipeService: RecipeService, 
// // // // // // //     public authService: AuthService,
// // // // // // //     private router: Router
// // // // // // //   ) {}

// // // // // // //   ngOnInit(): void {
// // // // // // //     this.loadRecipes();
// // // // // // //     this.userSub = this.authService.currentUser$.subscribe(userData => {
// // // // // // //       this.user = userData;
// // // // // // //     });
// // // // // // //   }

// // // // // // //   ngOnDestroy(): void {
// // // // // // //     if (this.userSub) this.userSub.unsubscribe();
// // // // // // //   }

// // // // // // //   loadRecipes(): void {
// // // // // // //     this.recipeService.getAllRecipes().subscribe({
// // // // // // //       next: (data) => {
// // // // // // //         this.allRecipes = data;
// // // // // // //         this.applyFilters(); // אתחול הרשימה
// // // // // // //       },
// // // // // // //       error: (err) => console.error('Error loading recipes', err)
// // // // // // //     });
// // // // // // //   }

// // // // // // //   // פונקציית הסינון
// // // // // // //   applyFilters(): void {
// // // // // // //     this.filteredRecipes = this.allRecipes.filter(recipe => {
// // // // // // //       const matchesSearch = recipe.title.toLowerCase().includes(this.filters.searchQuery.toLowerCase());
// // // // // // //       const matchesType = !this.filters.type || recipe.type === this.filters.type;
// // // // // // //       const matchesCategory = !this.filters.category || recipe.category === this.filters.category;
// // // // // // //       const matchesTime = recipe.prep_time <= this.filters.maxTime;

// // // // // // //       return matchesSearch && matchesType && matchesCategory && matchesTime;
// // // // // // //     });
// // // // // // //   }

// // // // // // //   viewDetails(id: number) {
// // // // // // //     this.router.navigate(['/recipe-details', id]);
// // // // // // //   }

// // // // // // //   deleteRecipe(id: number, event: Event) {
// // // // // // //     event.stopPropagation();
// // // // // // //     if (confirm('האם את בטוחה שברצונך למחוק מתכון זה?')) {
// // // // // // //       this.recipeService.deleteRecipe(id).subscribe({
// // // // // // //         next: () => {
// // // // // // //           this.allRecipes = this.allRecipes.filter(r => r.id !== id);
// // // // // // //           this.applyFilters();
// // // // // // //         },
// // // // // // //         error: (err) => alert('מחיקה נכשלה: ' + err.error?.message)
// // // // // // //       });
// // // // // // //     }
// // // // // // //   }

// // // // // // //   toggleFavorite(recipe: any, event: Event) {
// // // // // // //     event.stopPropagation();
// // // // // // //     if (!this.user) {
// // // // // // //       alert('אנא התחבר כדי להוסיף למועדפים');
// // // // // // //       return;
// // // // // // //     }
// // // // // // //     this.recipeService.toggleFavorite(recipe.id).subscribe({
// // // // // // //       next: (res) => recipe.isFavorite = (res.status === 'added')
// // // // // // //     });
// // // // // // //   }

// // // // // // //   toggleRecipeSelection(id: number) {
// // // // // // //     const index = this.selectedIds.indexOf(id);
// // // // // // //     if (index > -1) {
// // // // // // //       this.selectedIds.splice(index, 1);
// // // // // // //     } else {
// // // // // // //       this.selectedIds.push(id);
// // // // // // //     }
// // // // // // //   }

// // // // // // //   generateList() {
// // // // // // //     if (this.selectedIds.length === 0) return;
// // // // // // //     this.recipeService.generateShoppingList(this.selectedIds).subscribe({
// // // // // // //       next: (data) => this.shoppingListData = data,
// // // // // // //       error: (err) => console.error("Error generating list", err)
// // // // // // //     });
// // // // // // //   }
// // // // // // // }

// // // // // // import { Component, OnInit, OnDestroy } from '@angular/core';
// // // // // // import { CommonModule } from '@angular/common';
// // // // // // import { FormsModule } from '@angular/forms';
// // // // // // import { RecipeService } from '../../services/recipe.service';
// // // // // // import { AuthService } from '../../services/services/auth.service';
// // // // // // import { Router, ActivatedRoute } from '@angular/router'; // הוספנו ActivatedRoute
// // // // // // import { Subscription } from 'rxjs';
// // // // // // import { SmartSearchComponent } from '../smart-sort/smart-sort.component';
// // // // // // import { ShoppingListComponent } from '../shoping-list/shoping-list.component'; 

// // // // // // @Component({
// // // // // //   selector: 'app-recipe-list',
// // // // // //   standalone: true,
// // // // // //   imports: [
// // // // // //     CommonModule, 
// // // // // //     FormsModule, 
// // // // // //     SmartSearchComponent, 
// // // // // //     ShoppingListComponent
// // // // // //   ],
// // // // // //   templateUrl: './recipe-list.component.html',
// // // // // //   styleUrls: ['./recipe-list.component.css']
// // // // // // })
// // // // // // export class RecipeListComponent implements OnInit, OnDestroy {
// // // // // //   allRecipes: any[] = [];      
// // // // // //   filteredRecipes: any[] = []; 
// // // // // //   baseUrl = 'http://127.0.0.1:5000'; 
  
// // // // // //   user: any = null;
// // // // // //   private userSub: Subscription | undefined;
// // // // // //   private routeSub: Subscription | undefined; // סאבסקריב למסלול

// // // // // //   filters = {
// // // // // //     searchQuery: '',
// // // // // //     type: '',     
// // // // // //     category: '', 
// // // // // //     maxTime: 180  
// // // // // //   };

// // // // // //   selectedIds: number[] = [];
// // // // // //   shoppingListData: any = null;

// // // // // //   constructor(
// // // // // //     private recipeService: RecipeService, 
// // // // // //     public authService: AuthService,
// // // // // //     private router: Router,
// // // // // //     private route: ActivatedRoute // הזרקה של ה-Route
// // // // // //   ) {}

// // // // // //   ngOnInit(): void {
// // // // // //     // 1. טעינת המשתמש
// // // // // //     this.userSub = this.authService.currentUser$.subscribe(userData => {
// // // // // //       this.user = userData;
// // // // // //     });

// // // // // //     // 2. טעינת המתכונים וטיפול בפרמטרים מה-URL
// // // // // //     this.loadRecipesAndHandleParams();
// // // // // //   }

// // // // // //   loadRecipesAndHandleParams(): void {
// // // // // //     this.recipeService.getAllRecipes().subscribe({
// // // // // //       next: (data) => {
// // // // // //         this.allRecipes = data;

// // // // // //         // האזנה לשינויים בפרמטרים של הכתובת (למשל כשלוחצים על קטגוריה בדף הבית)
// // // // // //         this.routeSub = this.route.queryParams.subscribe(params => {
// // // // // //           if (params['category']) {
// // // // // //             this.filters.category = params['category'];
// // // // // //           }
// // // // // //           if (params['search']) {
// // // // // //             this.filters.searchQuery = params['search'];
// // // // // //           }
          
// // // // // //           this.applyFilters(); // הפעלת הסינון על הנתונים החדשים
// // // // // //         });
// // // // // //       },
// // // // // //       error: (err) => console.error('Error loading recipes', err)
// // // // // //     });
// // // // // //   }

// // // // // //   applyFilters(): void {
// // // // // //     this.filteredRecipes = this.allRecipes.filter(recipe => {
// // // // // //       const matchesSearch = recipe.title.toLowerCase().includes(this.filters.searchQuery.toLowerCase());
// // // // // //       const matchesType = !this.filters.type || recipe.type === this.filters.type;
// // // // // //       const matchesCategory = !this.filters.category || recipe.category === this.filters.category;
// // // // // //       const matchesTime = recipe.prep_time <= this.filters.maxTime;

// // // // // //       return matchesSearch && matchesType && matchesCategory && matchesTime;
// // // // // //     });
// // // // // //   }

// // // // // //   ngOnDestroy(): void {
// // // // // //     if (this.userSub) this.userSub.unsubscribe();
// // // // // //     if (this.routeSub) this.routeSub.unsubscribe();
// // // // // //   }

// // // // // //   // --- שאר הפונקציות ללא שינוי ---

// // // // // //   viewDetails(id: number) {
// // // // // //     this.router.navigate(['/recipe-details', id]);
// // // // // //   }

// // // // // //   deleteRecipe(id: number, event: Event) {
// // // // // //     event.stopPropagation();
// // // // // //     if (confirm('האם את בטוחה שברצונך למחוק מתכון זה?')) {
// // // // // //       this.recipeService.deleteRecipe(id).subscribe({
// // // // // //         next: () => {
// // // // // //           this.allRecipes = this.allRecipes.filter(r => r.id !== id);
// // // // // //           this.applyFilters();
// // // // // //         },
// // // // // //         error: (err) => alert('מחיקה נכשלה: ' + err.error?.message)
// // // // // //       });
// // // // // //     }
// // // // // //   }

// // // // // //   toggleFavorite(recipe: any, event: Event) {
// // // // // //     event.stopPropagation();
// // // // // //     if (!this.user) {
// // // // // //       alert('אנא התחבר כדי להוסיף למועדפים');
// // // // // //       return;
// // // // // //     }
// // // // // //     this.recipeService.toggleFavorite(recipe.id).subscribe({
// // // // // //       next: (res) => recipe.isFavorite = (res.status === 'added')
// // // // // //     });
// // // // // //   }

// // // // // //   toggleRecipeSelection(id: number) {
// // // // // //     const index = this.selectedIds.indexOf(id);
// // // // // //     if (index > -1) {
// // // // // //       this.selectedIds.splice(index, 1);
// // // // // //     } else {
// // // // // //       this.selectedIds.push(id);
// // // // // //     }
// // // // // //   }

// // // // // //   generateList() {
// // // // // //     if (this.selectedIds.length === 0) return;
// // // // // //     this.recipeService.generateShoppingList(this.selectedIds).subscribe({
// // // // // //       next: (data) => this.shoppingListData = data,
// // // // // //       error: (err) => console.error("Error generating list", err)
// // // // // //     });
// // // // // //   }
// // // // // // }

// // // // // import { Component, OnInit, OnDestroy } from '@angular/core';
// // // // // import { CommonModule } from '@angular/common';
// // // // // import { FormsModule } from '@angular/forms';
// // // // // import { RecipeService } from '../../services/recipe.service';
// // // // // import { AuthService } from '../../services/services/auth.service';
// // // // // import { Router, ActivatedRoute } from '@angular/router';
// // // // // import { Subscription } from 'rxjs';
// // // // // import { SmartSearchComponent } from '../smart-sort/smart-sort.component';
// // // // // import { ShoppingListComponent } from '../shoping-list/shoping-list.component'; 

// // // // // @Component({
// // // // //   selector: 'app-recipe-list',
// // // // //   standalone: true,
// // // // //   imports: [
// // // // //     CommonModule, 
// // // // //     FormsModule, 
// // // // //     SmartSearchComponent, 
// // // // //     ShoppingListComponent
// // // // //   ],
// // // // //   templateUrl: './recipe-list.component.html',
// // // // //   styleUrls: ['./recipe-list.component.css']
// // // // // })
// // // // // export class RecipeListComponent implements OnInit, OnDestroy {
// // // // //   allRecipes: any[] = [];      
// // // // //   filteredRecipes: any[] = []; 
// // // // //   baseUrl = 'http://127.0.0.1:5000'; 
  
// // // // //   user: any = null;
// // // // //   private userSub: Subscription | undefined;
// // // // //   private routeSub: Subscription | undefined;

// // // // //   filters = {
// // // // //     searchQuery: '',
// // // // //     type: '',     
// // // // //     category: '', 
// // // // //     maxTime: 180  
// // // // //   };

// // // // //   selectedIds: number[] = [];
// // // // //   shoppingListData: any = null;

// // // // //   constructor(
// // // // //     private recipeService: RecipeService, 
// // // // //     public authService: AuthService,
// // // // //     private router: Router,
// // // // //     private route: ActivatedRoute
// // // // //   ) {}

// // // // //   ngOnInit(): void {
// // // // //     this.userSub = this.authService.currentUser$.subscribe(userData => {
// // // // //       this.user = userData;
// // // // //     });

// // // // //     this.loadRecipesAndHandleParams();
// // // // //   }

// // // // //   loadRecipesAndHandleParams(): void {
// // // // //     this.recipeService.getAllRecipes().subscribe({
// // // // //       next: (data) => {
// // // // //         this.allRecipes = data;

// // // // //         this.routeSub = this.route.queryParams.subscribe(params => {
// // // // //           if (params['category']) {
// // // // //             this.filters.category = params['category'];
// // // // //           }
// // // // //           if (params['search']) {
// // // // //             this.filters.searchQuery = params['search'];
// // // // //           }
          
// // // // //           this.applyFilters();
// // // // //         });
// // // // //       },
// // // // //       error: (err) => console.error('Error loading recipes', err)
// // // // //     });
// // // // //   }

// // // // //   applyFilters(): void {
// // // // //     this.filteredRecipes = this.allRecipes.filter(recipe => {
// // // // //       const matchesSearch = recipe.title.toLowerCase().includes(this.filters.searchQuery.toLowerCase());
// // // // //       const matchesType = !this.filters.type || recipe.type === this.filters.type;
// // // // //       const matchesCategory = !this.filters.category || recipe.category === this.filters.category;
// // // // //       const matchesTime = recipe.prep_time <= this.filters.maxTime;

// // // // //       return matchesSearch && matchesType && matchesCategory && matchesTime;
// // // // //     });
// // // // //   }

// // // // //   /**
// // // // //    * פונקציה לאיפוס כל המסננים וחזרה למצב התחלתי
// // // // //    */
// // // // //   resetFilters(): void {
// // // // //     // 1. החזרת האובייקט לערכי ברירת המחדל
// // // // //     this.filters = {
// // // // //       searchQuery: '',
// // // // //       type: '',
// // // // //       category: '',
// // // // //       maxTime: 180
// // // // //     };

// // // // //     // 2. עדכון הרשימה המוצגת (filteredRecipes)
// // // // //     this.applyFilters();

// // // // //     // 3. אופציונלי: ניקוי פרמטרי ה-URL כדי שהדפדפן יהיה "נקי"
// // // // //     this.router.navigate([], {
// // // // //       relativeTo: this.route,
// // // // //       queryParams: {}, 
// // // // //       replaceUrl: true
// // // // //     });
// // // // //   }

// // // // //   ngOnDestroy(): void {
// // // // //     if (this.userSub) this.userSub.unsubscribe();
// // // // //     if (this.routeSub) this.routeSub.unsubscribe();
// // // // //   }

// // // // //   viewDetails(id: number) {
// // // // //     this.router.navigate(['/recipe-details', id]);
// // // // //   }

// // // // //   deleteRecipe(id: number, event: Event) {
// // // // //     event.stopPropagation();
// // // // //     if (confirm('האם את בטוחה שברצונך למחוק מתכון זה?')) {
// // // // //       this.recipeService.deleteRecipe(id).subscribe({
// // // // //         next: () => {
// // // // //           this.allRecipes = this.allRecipes.filter(r => r.id !== id);
// // // // //           this.applyFilters();
// // // // //         },
// // // // //         error: (err) => alert('מחיקה נכשלה: ' + err.error?.message)
// // // // //       });
// // // // //     }
// // // // //   }

// // // // //   toggleFavorite(recipe: any, event: Event) {
// // // // //     event.stopPropagation();
// // // // //     if (!this.user) {
// // // // //       alert('אנא התחבר כדי להוסיף למועדפים');
// // // // //       return;
// // // // //     }
// // // // //     this.recipeService.toggleFavorite(recipe.id).subscribe({
// // // // //       next: (res) => recipe.isFavorite = (res.status === 'added')
// // // // //     });
// // // // //   }

// // // // //   toggleRecipeSelection(id: number) {
// // // // //     const index = this.selectedIds.indexOf(id);
// // // // //     if (index > -1) {
// // // // //       this.selectedIds.splice(index, 1);
// // // // //     } else {
// // // // //       this.selectedIds.push(id);
// // // // //     }
// // // // //   }

// // // // //   generateList() {
// // // // //     if (this.selectedIds.length === 0) return;
// // // // //     this.recipeService.generateShoppingList(this.selectedIds).subscribe({
// // // // //       next: (data) => this.shoppingListData = data,
// // // // //       error: (err) => console.error("Error generating list", err)
// // // // //     });
// // // // //   }
// // // // // }

// // // // import { Component, OnInit, OnDestroy } from '@angular/core';
// // // // import { CommonModule } from '@angular/common';
// // // // import { FormsModule } from '@angular/forms';
// // // // import { RecipeService } from '../../services/recipe.service';
// // // // import { AuthService } from '../../services/services/auth.service';
// // // // import { Router, ActivatedRoute } from '@angular/router';
// // // // import { Subscription } from 'rxjs';
// // // // import { SmartSearchComponent } from '../smart-sort/smart-sort.component';
// // // // import { ShoppingListComponent } from '../shoping-list/shoping-list.component'; 

// // // // @Component({
// // // //   selector: 'app-recipe-list',
// // // //   standalone: true,
// // // //   imports: [
// // // //     CommonModule, 
// // // //     FormsModule, 
// // // //     SmartSearchComponent, 
// // // //     ShoppingListComponent
// // // //   ],
// // // //   templateUrl: './recipe-list.component.html',
// // // //   styleUrls: ['./recipe-list.component.css']
// // // // })
// // // // export class RecipeListComponent implements OnInit, OnDestroy {
// // // //   allRecipes: any[] = [];      
// // // //   filteredRecipes: any[] = []; 
// // // //   baseUrl = 'http://127.0.0.1:5000'; 
  
// // // //   user: any = null;
// // // //   private userSub: Subscription | undefined;
// // // //   private routeSub: Subscription | undefined;

// // // //   filters = {
// // // //     searchQuery: '',
// // // //     type: '',     
// // // //     category: '', 
// // // //     maxTime: 180  
// // // //   };

// // // //   selectedIds: number[] = [];
// // // //   shoppingListData: any = null;
// // // //   smartSearchNoResults: boolean = false; // משתנה חדש להודעת חיפוש חכם

// // // //   constructor(
// // // //     private recipeService: RecipeService, 
// // // //     public authService: AuthService,
// // // //     private router: Router,
// // // //     private route: ActivatedRoute
// // // //   ) {}

// // // //   ngOnInit(): void {
// // // //     this.userSub = this.authService.currentUser$.subscribe(userData => {
// // // //       this.user = userData;
// // // //     });
// // // //     this.loadRecipesAndHandleParams();
// // // //   }

// // // //   loadRecipesAndHandleParams(): void {
// // // //     this.recipeService.getAllRecipes().subscribe({
// // // //       next: (data) => {
// // // //         this.allRecipes = data;
// // // //         this.routeSub = this.route.queryParams.subscribe(params => {
// // // //           if (params['category']) this.filters.category = params['category'];
// // // //           if (params['search']) this.filters.searchQuery = params['search'];
// // // //           this.applyFilters();
// // // //         });
// // // //       },
// // // //       error: (err) => console.error('Error loading recipes', err)
// // // //     });
// // // //   }

// // // //   applyFilters(): void {
// // // //     this.filteredRecipes = this.allRecipes.filter(recipe => {
// // // //       const matchesSearch = recipe.title.toLowerCase().includes(this.filters.searchQuery.toLowerCase());
// // // //       const matchesType = !this.filters.type || recipe.type === this.filters.type;
// // // //       const matchesCategory = !this.filters.category || recipe.category === this.filters.category;
// // // //       const matchesTime = recipe.prep_time <= this.filters.maxTime;
// // // //       return matchesSearch && matchesType && matchesCategory && matchesTime;
// // // //     });
// // // //   }

// // // //   resetFilters(): void {
// // // //     this.filters = { searchQuery: '', type: '', category: '', maxTime: 180 };
// // // //     this.applyFilters();
// // // //     this.router.navigate([], { relativeTo: this.route, queryParams: {}, replaceUrl: true });
// // // //   }

// // // //   // פונקציה שתופסת תוצאות מהחיפוש החכם (יש לקשר ב-HTML)
// // // //   handleSmartSearchResults(results: any[]) {
// // // //     if (results && results.length > 0) {
// // // //       this.filteredRecipes = results;
// // // //       this.smartSearchNoResults = false;
// // // //     } else {
// // // //       this.smartSearchNoResults = true;
// // // //     }
// // // //   }

// // // //   ngOnDestroy(): void {
// // // //     if (this.userSub) this.userSub.unsubscribe();
// // // //     if (this.routeSub) this.routeSub.unsubscribe();
// // // //   }

// // // //   viewDetails(id: number) {
// // // //     this.router.navigate(['/recipe-details', id]);
// // // //   }

// // // //   deleteRecipe(id: number, event: Event) {
// // // //     event.stopPropagation();
// // // //     if (confirm('האם את בטוחה שברצונך למחוק מתכון זה?')) {
// // // //       this.recipeService.deleteRecipe(id).subscribe({
// // // //         next: () => {
// // // //           this.allRecipes = this.allRecipes.filter(r => r.id !== id);
// // // //           this.applyFilters();
// // // //         },
// // // //         error: (err) => alert('מחיקה נכשלה: ' + err.error?.message)
// // // //       });
// // // //     }
// // // //   }

// // // //   toggleFavorite(recipe: any, event: Event) {
// // // //     event.stopPropagation();
// // // //     if (!this.user) {
// // // //       alert('אנא התחבר כדי להוסיף למועדפים');
// // // //       return;
// // // //     }
// // // //     this.recipeService.toggleFavorite(recipe.id).subscribe({
// // // //       next: (res) => recipe.isFavorite = (res.status === 'added')
// // // //     });
// // // //   }

// // // //   toggleRecipeSelection(id: number) {
// // // //     const index = this.selectedIds.indexOf(id);
// // // //     if (index > -1) {
// // // //       this.selectedIds.splice(index, 1);
// // // //     } else {
// // // //       this.selectedIds.push(id);
// // // //     }
// // // //   }

// // // //   generateList() {
// // // //     if (this.selectedIds.length === 0) return;
// // // //     this.recipeService.generateShoppingList(this.selectedIds).subscribe({
// // // //       next: (data) => {
// // // //         this.shoppingListData = data;
// // // //         window.scrollTo({ top: 0, behavior: 'smooth' }); // גלילה למעלה לראות את הרשימה
// // // //       },
// // // //       error: (err) => console.error("Error generating list", err)
// // // //     });
// // // //   }

// // // //   closeShoppingList() {
// // // //     this.shoppingListData = null;
// // // //   }
// // // // }

// // // import { Component, OnInit, OnDestroy } from '@angular/core';
// // // import { CommonModule } from '@angular/common';
// // // import { FormsModule } from '@angular/forms';
// // // import { RecipeService } from '../../services/recipe.service';
// // // import { AuthService } from '../../services/services/auth.service';
// // // import { Router, ActivatedRoute } from '@angular/router';
// // // import { Subscription } from 'rxjs';
// // // import { SmartSearchComponent } from '../smart-sort/smart-sort.component';
// // // import { ShoppingListComponent } from '../shoping-list/shoping-list.component'; 

// // // @Component({
// // //   selector: 'app-recipe-list',
// // //   standalone: true,
// // //   imports: [
// // //     CommonModule, 
// // //     FormsModule, 
// // //     SmartSearchComponent, 
// // //     ShoppingListComponent 
// // //   ],
// // //   templateUrl: './recipe-list.component.html',
// // //   styleUrls: ['./recipe-list.component.css']
// // // })
// // // export class RecipeListComponent implements OnInit, OnDestroy {
// // //   allRecipes: any[] = [];      
// // //   filteredRecipes: any[] = []; 
// // //   baseUrl = 'http://127.0.0.1:5000'; 
  
// // //   user: any = null;
// // //   private userSub: Subscription | undefined;
// // //   private routeSub: Subscription | undefined;

// // //   filters = {
// // //     searchQuery: '',
// // //     type: '',     
// // //     category: '', 
// // //     maxTime: 180  
// // //   };

// // //   selectedIds: number[] = [];
// // //   shoppingListData: any = null;
// // //   smartSearchNoResults: boolean = false;

// // //   constructor(
// // //     private recipeService: RecipeService, 
// // //     public authService: AuthService,
// // //     private router: Router,
// // //     private route: ActivatedRoute
// // //   ) {}

// // //   ngOnInit(): void {
// // //     this.userSub = this.authService.currentUser$.subscribe(userData => {
// // //       this.user = userData;
// // //     });
// // //     this.loadRecipesAndHandleParams();
// // //   }

// // //   loadRecipesAndHandleParams(): void {
// // //     this.recipeService.getAllRecipes().subscribe({
// // //       next: (data) => {
// // //         this.allRecipes = data;
// // //         this.routeSub = this.route.queryParams.subscribe(params => {
// // //           if (params['category']) this.filters.category = params['category'];
// // //           if (params['search']) this.filters.searchQuery = params['search'];
// // //           this.applyFilters();
// // //         });
// // //       },
// // //       error: (err) => console.error('Error loading recipes', err)
// // //     });
// // //   }

// // //   applyFilters(): void {
// // //     this.smartSearchNoResults = false; // איפוס הודעת חיפוש חכם כשמסננים רגיל
// // //     this.filteredRecipes = this.allRecipes.filter(recipe => {
// // //       const matchesSearch = recipe.title.toLowerCase().includes(this.filters.searchQuery.toLowerCase());
// // //       const matchesType = !this.filters.type || recipe.type === this.filters.type;
// // //       const matchesCategory = !this.filters.category || recipe.category === this.filters.category;
// // //       const matchesTime = recipe.prep_time <= this.filters.maxTime;

// // //       return matchesSearch && matchesType && matchesCategory && matchesTime;
// // //     });
// // //   }

// // //   handleSmartSearchResults(results: any[]) {
// // //     if (results && results.length > 0) {
// // //       this.filteredRecipes = results;
// // //       this.smartSearchNoResults = false;
// // //     } else {
// // //       this.filteredRecipes = [];
// // //       this.smartSearchNoResults = true;
// // //     }
// // //   }

// // //   resetFilters(): void {
// // //     this.filters = { searchQuery: '', type: '', category: '', maxTime: 180 };
// // //     this.smartSearchNoResults = false;
// // //     this.applyFilters();
// // //     this.router.navigate([], { relativeTo: this.route, queryParams: {}, replaceUrl: true });
// // //   }

// // //   ngOnDestroy(): void {
// // //     if (this.userSub) this.userSub.unsubscribe();
// // //     if (this.routeSub) this.routeSub.unsubscribe();
// // //   }

// // //   viewDetails(id: number) {
// // //     this.router.navigate(['/recipe-details', id]);
// // //   }

// // //   deleteRecipe(id: number, event: Event) {
// // //     event.stopPropagation();
// // //     if (confirm('האם את בטוחה שברצונך למחוק מתכון זה?')) {
// // //       this.recipeService.deleteRecipe(id).subscribe({
// // //         next: () => {
// // //           this.allRecipes = this.allRecipes.filter(r => r.id !== id);
// // //           this.applyFilters();
// // //         },
// // //         error: (err) => alert('מחיקה נכשלה: ' + err.error?.message)
// // //       });
// // //     }
// // //   }

// // //   toggleFavorite(recipe: any, event: Event) {
// // //     event.stopPropagation();
// // //     if (!this.user) {
// // //       alert('אנא התחבר כדי להוסיף למועדפים');
// // //       return;
// // //     }
// // //     this.recipeService.toggleFavorite(recipe.id).subscribe({
// // //       next: (res) => recipe.isFavorite = (res.status === 'added')
// // //     });
// // //   }

// // //   toggleRecipeSelection(id: number) {
// // //     const index = this.selectedIds.indexOf(id);
// // //     if (index > -1) {
// // //       this.selectedIds.splice(index, 1);
// // //     } else {
// // //       this.selectedIds.push(id);
// // //     }
// // //   }

// // //   generateList() {
// // //     if (this.selectedIds.length === 0) return;
// // //     this.recipeService.generateShoppingList(this.selectedIds).subscribe({
// // //       next: (data) => {
// // //         this.shoppingListData = data;
// // //         window.scrollTo({ top: 0, behavior: 'smooth' });
// // //       },
// // //       error: (err) => console.error("Error generating list", err)
// // //     });
// // //   }

// // //   closeShoppingList() {
// // //     this.shoppingListData = null;
// // //   }
// // // }

// // import { Component, OnInit, OnDestroy } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { FormsModule } from '@angular/forms';
// // import { RecipeService } from '../../services/recipe.service';
// // import { AuthService } from '../../services/services/auth.service';
// // import { Router, ActivatedRoute } from '@angular/router';
// // import { Subscription } from 'rxjs';
// // import { SmartSearchComponent } from '../smart-sort/smart-sort.component';
// // import { ShoppingListComponent } from '../shoping-list/shoping-list.component'; 

// // @Component({
// //   selector: 'app-recipe-list',
// //   standalone: true,
// //   imports: [
// //     CommonModule, 
// //     FormsModule, 
// //     SmartSearchComponent, 
// //     ShoppingListComponent 
// //   ],
// //   templateUrl: './recipe-list.component.html',
// //   styleUrls: ['./recipe-list.component.css']
// // })
// // export class RecipeListComponent implements OnInit, OnDestroy {
// //   allRecipes: any[] = [];      
// //   filteredRecipes: any[] = []; 
// //   baseUrl = 'http://127.0.0.1:5000'; 
  
// //   user: any = null;
// //   private userSub: Subscription | undefined;
// //   private routeSub: Subscription | undefined;

// //   filters = {
// //     searchQuery: '',
// //     type: '',     
// //     category: '', 
// //     maxTime: 180  
// //   };

// //   selectedIds: number[] = [];
// //   shoppingListData: any = null;
// //   smartSearchNoResults: boolean = false;

// //   constructor(
// //     private recipeService: RecipeService, 
// //     public authService: AuthService,
// //     private router: Router,
// //     private route: ActivatedRoute
// //   ) {}

// //   ngOnInit(): void {
// //     this.userSub = this.authService.currentUser$.subscribe(userData => {
// //       this.user = userData;
// //     });
// //     this.loadRecipesAndHandleParams();
// //   }

// //   loadRecipesAndHandleParams(): void {
// //     this.recipeService.getAllRecipes().subscribe({
// //       next: (data) => {
// //         this.allRecipes = data;
// //         this.routeSub = this.route.queryParams.subscribe(params => {
// //           if (params['category']) this.filters.category = params['category'];
// //           if (params['search']) this.filters.searchQuery = params['search'];
// //           this.applyFilters();
// //         });
// //       },
// //       error: (err) => console.error('Error loading recipes', err)
// //     });
// //   }

// //   applyFilters(): void {
// //     this.smartSearchNoResults = false;
// //     this.filteredRecipes = this.allRecipes.filter(recipe => {
// //       const matchesSearch = recipe.title.toLowerCase().includes(this.filters.searchQuery.toLowerCase());
// //       const matchesType = !this.filters.type || recipe.type === this.filters.type;
// //       const matchesCategory = !this.filters.category || recipe.category === this.filters.category;
// //       const matchesTime = recipe.prep_time <= this.filters.maxTime;

// //       return matchesSearch && matchesType && matchesCategory && matchesTime;
// //     });
// //   }

// //   // תיקון השגיאה: קבלת any כדי למנוע התנגשות Types ב-Template
// //   handleSmartSearchResults(results: any) {
// //     if (results && Array.isArray(results) && results.length > 0) {
// //       this.filteredRecipes = results;
// //       this.smartSearchNoResults = false;
// //     } else {
// //       this.filteredRecipes = [];
// //       this.smartSearchNoResults = true;
// //     }
// //   }

// //   resetFilters(): void {
// //     this.filters = { searchQuery: '', type: '', category: '', maxTime: 180 };
// //     this.smartSearchNoResults = false;
// //     this.applyFilters();
// //     this.router.navigate([], { relativeTo: this.route, queryParams: {}, replaceUrl: true });
// //   }

// //   ngOnDestroy(): void {
// //     if (this.userSub) this.userSub.unsubscribe();
// //     if (this.routeSub) this.routeSub.unsubscribe();
// //   }

// //   viewDetails(id: number) {
// //     this.router.navigate(['/recipe-details', id]);
// //   }

// //   deleteRecipe(id: number, event: Event) {
// //     event.stopPropagation();
// //     if (confirm('האם את בטוחה שברצונך למחוק מתכון זה?')) {
// //       this.recipeService.deleteRecipe(id).subscribe({
// //         next: () => {
// //           this.allRecipes = this.allRecipes.filter(r => r.id !== id);
// //           this.applyFilters();
// //         },
// //         error: (err) => alert('מחיקה נכשלה: ' + err.error?.message)
// //       });
// //     }
// //   }

// //   toggleFavorite(recipe: any, event: Event) {
// //     event.stopPropagation();
// //     if (!this.user) {
// //       alert('אנא התחבר כדי להוסיף למועדפים');
// //       return;
// //     }
// //     this.recipeService.toggleFavorite(recipe.id).subscribe({
// //       next: (res) => recipe.isFavorite = (res.status === 'added')
// //     });
// //   }

// //   toggleRecipeSelection(id: number) {
// //     const index = this.selectedIds.indexOf(id);
// //     if (index > -1) {
// //       this.selectedIds.splice(index, 1);
// //     } else {
// //       this.selectedIds.push(id);
// //     }
// //   }

// //   generateList() {
// //     if (this.selectedIds.length === 0) return;
// //     this.recipeService.generateShoppingList(this.selectedIds).subscribe({
// //       next: (data) => {
// //         this.shoppingListData = data;
// //         window.scrollTo({ top: 0, behavior: 'smooth' });
// //       },
// //       error: (err) => console.error("Error generating list", err)
// //     });
// //   }

// //   closeShoppingList() {
// //     this.shoppingListData = null;
// //   }
// // // }
// // import { Component, OnInit, OnDestroy } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { FormsModule } from '@angular/forms';
// // import { RecipeService } from '../../services/recipe.service';
// // import { AuthService } from '../../services/services/auth.service';
// // import { Router, ActivatedRoute } from '@angular/router';
// // import { Subscription } from 'rxjs';
// // import { SmartSearchComponent } from '../smart-sort/smart-sort.component';
// // import { ShoppingListComponent } from '../shoping-list/shoping-list.component'; 

// // @Component({
// //   selector: 'app-recipe-list',
// //   standalone: true,
// //   imports: [
// //     CommonModule, 
// //     FormsModule, 
// //     SmartSearchComponent, 
// //     ShoppingListComponent 
// //   ],
// //   templateUrl: './recipe-list.component.html',
// //   styleUrls: ['./recipe-list.component.css']
// // })
// // export class RecipeListComponent implements OnInit, OnDestroy {
// //   allRecipes: any[] = [];      
// //   filteredRecipes: any[] = []; 
// //   baseUrl = 'http://127.0.0.1:5000'; 
  
// //   user: any = null;
// //   private userSub: Subscription | undefined;
// //   private routeSub: Subscription | undefined;

// //   filters = {
// //     searchQuery: '',
// //     type: '',     
// //     category: '', 
// //     maxTime: 180  
// //   };

// //   selectedIds: number[] = [];
// //   shoppingListData: any = null;
// //   smartSearchNoResults: boolean = false;

// //   constructor(
// //     private recipeService: RecipeService, 
// //     public authService: AuthService,
// //     private router: Router,
// //     private route: ActivatedRoute
// //   ) {}

// //   ngOnInit(): void {
// //     this.userSub = this.authService.currentUser$.subscribe(userData => {
// //       this.user = userData;
// //     });
// //     this.loadRecipesAndHandleParams();
// //   }

// //   loadRecipesAndHandleParams(): void {
// //     this.recipeService.getAllRecipes().subscribe({
// //       next: (data) => {
// //         this.allRecipes = data;
// //         this.routeSub = this.route.queryParams.subscribe(params => {
// //           if (params['category']) this.filters.category = params['category'];
// //           if (params['search']) this.filters.searchQuery = params['search'];
// //           this.applyFilters();
// //         });
// //       },
// //       error: (err) => console.error('Error loading recipes', err)
// //     });
// //   }

// //   applyFilters(): void {
// //     // איפוס מצב חיפוש חכם כשמשתמשים במסננים הרגילים
// //     this.smartSearchNoResults = false; 

// //     this.filteredRecipes = this.allRecipes.filter(recipe => {
// //       const matchesSearch = recipe.title.toLowerCase().includes(this.filters.searchQuery.toLowerCase());
// //       const matchesType = !this.filters.type || recipe.type === this.filters.type;
// //       const matchesCategory = !this.filters.category || recipe.category === this.filters.category;
// //       const matchesTime = recipe.prep_time <= this.filters.maxTime;

// //       return matchesSearch && matchesType && matchesCategory && matchesTime;
// //     });
// //   }

// //   // טיפול בתוצאות חיפוש חכם (לפי מוצרים)
// //   handleSmartSearchResults(results: any) {
// //     // וידוא שהתוצאות הן מערך תקין
// //     if (results && Array.isArray(results) && results.length > 0) {
// //       this.filteredRecipes = results;
// //       this.smartSearchNoResults = false;
// //     } else {
// //       this.filteredRecipes = [];
// //       this.smartSearchNoResults = true; // כאן אנחנו מדליקים את ההודעה הייעודית
// //     }
// //   }

// //   resetFilters(): void {
// //     this.filters = { searchQuery: '', type: '', category: '', maxTime: 180 };
// //     this.smartSearchNoResults = false;
// //     this.applyFilters();
// //     this.router.navigate([], { relativeTo: this.route, queryParams: {}, replaceUrl: true });
// //   }

// //   // שאר הפונקציות (מועדפים, מחיקה, בחירה) נשארות ללא שינוי...
// //   ngOnDestroy(): void {
// //     if (this.userSub) this.userSub.unsubscribe();
// //     if (this.routeSub) this.routeSub.unsubscribe();
// //   }

// //   viewDetails(id: number) {
// //     this.router.navigate(['/recipe-details', id]);
// //   }

// //   deleteRecipe(id: number, event: Event) {
// //     event.stopPropagation();
// //     if (confirm('האם את בטוחה שברצונך למחוק מתכון זה?')) {
// //       this.recipeService.deleteRecipe(id).subscribe({
// //         next: () => {
// //           this.allRecipes = this.allRecipes.filter(r => r.id !== id);
// //           this.applyFilters();
// //         },
// //         error: (err) => alert('מחיקה נכשלה: ' + err.error?.message)
// //       });
// //     }
// //   }

// //   toggleFavorite(recipe: any, event: Event) {
// //     event.stopPropagation();
// //     if (!this.user) {
// //       alert('אנא התחבר כדי להוסיף למועדפים');
// //       return;
// //     }
// //     this.recipeService.toggleFavorite(recipe.id).subscribe({
// //       next: (res) => recipe.isFavorite = (res.status === 'added')
// //     });
// //   }

// //   toggleRecipeSelection(id: number) {
// //     const index = this.selectedIds.indexOf(id);
// //     if (index > -1) {
// //       this.selectedIds.splice(index, 1);
// //     } else {
// //       this.selectedIds.push(id);
// //     }
// //   }

// //   generateList() {
// //     if (this.selectedIds.length === 0) return;
// //     this.recipeService.generateShoppingList(this.selectedIds).subscribe({
// //       next: (data) => {
// //         this.shoppingListData = data;
// //         window.scrollTo({ top: 0, behavior: 'smooth' });
// //       },
// //       error: (err) => console.error("Error generating list", err)
// //     });
// //   }

// //   closeShoppingList() {
// //     this.shoppingListData = null;
// //   }
// // }


// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RecipeService } from '../../services/recipe.service';
// import { AuthService } from '../../services/services/auth.service';
// import { Router, ActivatedRoute } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { SmartSearchComponent } from '../smart-sort/smart-sort.component';
// import { ShoppingListComponent } from '../shoping-list/shoping-list.component'; 
// import { Recipe, User, RecipeFilters } from '../../recipe.model'; // ודאי שהנתיב נכון

// @Component({
//   selector: 'app-recipe-list',
//   standalone: true,
//   imports: [
//     CommonModule, 
//     FormsModule, 
//     SmartSearchComponent, 
//     ShoppingListComponent 
//   ],
//   templateUrl: './recipe-list.component.html',
//   styleUrls: ['./recipe-list.component.css']
// })
// export class RecipeListComponent implements OnInit, OnDestroy {
//   allRecipes: Recipe[] = [];      
//   filteredRecipes: Recipe[] = []; 
//   baseUrl = 'http://127.0.0.1:5000'; 
  
//   user: User | null = null;
//   private userSub: Subscription | undefined;
//   private routeSub: Subscription | undefined;

//   filters: RecipeFilters = {
//     searchQuery: '',
//     type: '',     
//     category: '', 
//     maxTime: 180  
//   };

//   selectedIds: number[] = [];
//   shoppingListData: any = null; // ניתן להגדיר Interface גם לזה אם תרצי
//   smartSearchNoResults: boolean = false;

//   constructor(
//     private recipeService: RecipeService, 
//     public authService: AuthService,
//     private router: Router,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     // האזנה למשתמש הנוכחי
//     this.userSub = this.authService.currentUser$.subscribe(userData => {
//       this.user = userData;
//     });
//     this.loadRecipesAndHandleParams();
//   }

//   loadRecipesAndHandleParams(): void {
//     this.recipeService.getAllRecipes().subscribe({
//       next: (data: Recipe[]) => {
//         this.allRecipes = data;
//         // האזנה לפרמטרים בכתובת (למשל כשמגיעים מדף הבית)
//         this.routeSub = this.route.queryParams.subscribe(params => {
//           if (params['category']) this.filters.category = params['category'];
//           if (params['search']) this.filters.searchQuery = params['search'];
//           this.applyFilters();
//         });
//       },
//       error: (err) => console.error('Error loading recipes', err)
//     });
//   }

//   applyFilters(): void {
//     this.smartSearchNoResults = false; 

//     this.filteredRecipes = this.allRecipes.filter(recipe => {
//       const matchesSearch = recipe.title.toLowerCase().includes(this.filters.searchQuery.toLowerCase());
//       const matchesType = !this.filters.type || recipe.type === this.filters.type;
//       const matchesCategory = !this.filters.category || recipe.category === this.filters.category;
//       const matchesTime = recipe.prep_time <= this.filters.maxTime;

//       return matchesSearch && matchesType && matchesCategory && matchesTime;
//     });
//   }

//   handleSmartSearchResults(results: Recipe[]) {
//     if (results && Array.isArray(results) && results.length > 0) {
//       this.filteredRecipes = results;
//       this.smartSearchNoResults = false;
//     } else {
//       this.filteredRecipes = [];
//       this.smartSearchNoResults = true;
//     }
//   }

//   resetFilters(): void {
//     this.filters = { searchQuery: '', type: '', category: '', maxTime: 180 };
//     this.smartSearchNoResults = false;
//     this.applyFilters();
//     this.router.navigate([], { relativeTo: this.route, queryParams: {}, replaceUrl: true });
//   }

//   viewDetails(id: number) {
//     this.router.navigate(['/recipe-details', id]);
//   }

//   deleteRecipe(id: number, event: Event) {
//     event.stopPropagation();
//     if (confirm('האם את בטוחה שברצונך למחוק מתכון זה?')) {
//       this.recipeService.deleteRecipe(id).subscribe({
//         next: () => {
//           this.allRecipes = this.allRecipes.filter(r => r.id !== id);
//           this.applyFilters();
//         },
//         error: (err) => alert('מחיקה נכשלה: ' + err.error?.message)
//       });
//     }
//   }

//   toggleFavorite(recipe: Recipe, event: Event) {
//     event.stopPropagation();
//     if (!this.user) {
//       alert('אנא התחבר כדי להוסיף למועדפים');
//       return;
//     }
//     this.recipeService.toggleFavorite(recipe.id).subscribe({
//       next: (res: any) => {
//         // כאן ה-TypeScript כבר לא יצעק כי הוספנו isFavorite למודל
//         recipe.isFavorite = (res.status === 'added');
//       },
//       error: (err) => console.error('Error toggling favorite', err)
//     });
//   }

//   toggleRecipeSelection(id: number) {
//     const index = this.selectedIds.indexOf(id);
//     if (index > -1) {
//       this.selectedIds.splice(index, 1);
//     } else {
//       this.selectedIds.push(id);
//     }
//   }

//   generateList() {
//     if (this.selectedIds.length === 0) return;
//     this.recipeService.generateShoppingList(this.selectedIds).subscribe({
//       next: (data) => {
//         this.shoppingListData = data;
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//       },
//       error: (err) => console.error("Error generating list", err)
//     });
//   }

//   closeShoppingList() {
//     this.shoppingListData = null;
//   }

//   ngOnDestroy(): void {
//     if (this.userSub) this.userSub.unsubscribe();
//     if (this.routeSub) this.routeSub.unsubscribe();
//   }
// }

// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RecipeService } from '../../services/recipe.service';
// import { AuthService } from '../../services/services/aunth.service';
// import { Router, ActivatedRoute } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { SmartSearchComponent } from '../smart-sort/smart-sort.component';
// import { ShoppingListComponent } from '../shoping-list/shoping-list.component'; 
// import { Recipe, User, RecipeFilters } from '../../recipe.model';

// @Component({
//   selector: 'app-recipe-list',
//   standalone: true,
//   imports: [
//     CommonModule, 
//     FormsModule, 
//     SmartSearchComponent, 
//     ShoppingListComponent 
//   ],
//   templateUrl: './recipe-list.component.html',
//   styleUrls: ['./recipe-list.component.css']
// })
// export class RecipeListComponent implements OnInit, OnDestroy {
//   allRecipes: Recipe[] = [];      
//   filteredRecipes: Recipe[] = []; 
//   baseUrl = 'http://127.0.0.1:5000'; 
  
//   user: User | null = null;
//   private userSub: Subscription | undefined;
//   private routeSub: Subscription | undefined;

//   filters: RecipeFilters = {
//     searchQuery: '',
//     type: '',     
//     category: '', 
//     maxTime: 180  
//   };

//   selectedIds: number[] = [];
//   shoppingListData: any = null; 
//   smartSearchNoResults: boolean = false;

//   constructor(
//     private recipeService: RecipeService, 
//     public authService: AuthService,
//     private router: Router,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     this.userSub = this.authService.currentUser$.subscribe(userData => {
//       this.user = userData;
//     });
//     this.loadRecipesAndHandleParams();
//   }

//   loadRecipesAndHandleParams(): void {
//     this.recipeService.getAllRecipes().subscribe({
//       next: (data: Recipe[]) => {
//         this.allRecipes = data;
//         this.routeSub = this.route.queryParams.subscribe(params => {
//           if (params['category']) this.filters.category = params['category'];
//           if (params['search']) this.filters.searchQuery = params['search'];
//           this.applyFilters();
//         });
//       },
//       error: (err) => console.error('Error loading recipes', err)
//     });
//   }

//   applyFilters(): void {
//     this.smartSearchNoResults = false; 

//     this.filteredRecipes = this.allRecipes.filter(recipe => {
//       const matchesSearch = recipe.title.toLowerCase().includes(this.filters.searchQuery.toLowerCase());
//       const matchesType = !this.filters.type || recipe.type === this.filters.type;
//       const matchesCategory = !this.filters.category || recipe.category === this.filters.category;
//       const matchesTime = recipe.prep_time <= this.filters.maxTime;

//       return matchesSearch && matchesType && matchesCategory && matchesTime;
//     });
//   }

//   // תיקון שגיאת NG5: הגדרת הטיפוס כ-any מאפשרת ל-HTML להעביר את האובייקט ללא שגיאת קומפילציה
//   handleSmartSearchResults(results: any) {
//     const data = Array.isArray(results) ? results : [];
    
//     if (data.length > 0) {
//       this.filteredRecipes = data;
//       this.smartSearchNoResults = false;
//     } else {
//       this.filteredRecipes = [];
//       this.smartSearchNoResults = true;
//     }
//   }

//   resetFilters(): void {
//     this.filters = { searchQuery: '', type: '', category: '', maxTime: 180 };
//     this.smartSearchNoResults = false;
//     this.applyFilters();
//     this.router.navigate([], { relativeTo: this.route, queryParams: {}, replaceUrl: true });
//   }

//   viewDetails(id: number) {
//     this.router.navigate(['/recipe-details', id]);
//   }

//   deleteRecipe(id: number, event: Event) {
//     event.stopPropagation();
//     if (confirm('האם את בטוחה שברצונך למחוק מתכון זה?')) {
//       this.recipeService.deleteRecipe(id).subscribe({
//         next: () => {
//           this.allRecipes = this.allRecipes.filter(r => r.id !== id);
//           this.applyFilters();
//         },
//         error: (err) => alert('מחיקה נכשלה: ' + err.error?.message)
//       });
//     }
//   }

//   toggleFavorite(recipe: Recipe, event: Event) {
//     event.stopPropagation();
//     if (!this.user) {
//       alert('אנא התחבר כדי להוסיף למועדפים');
//       return;
//     }
//     this.recipeService.toggleFavorite(recipe.id).subscribe({
//       next: (res: any) => {
//         recipe.isFavorite = (res.status === 'added');
//       },
//       error: (err) => console.error('Error toggling favorite', err)
//     });
//   }

//   toggleRecipeSelection(id: number) {
//     const index = this.selectedIds.indexOf(id);
//     if (index > -1) {
//       this.selectedIds.splice(index, 1);
//     } else {
//       this.selectedIds.push(id);
//     }
//   }

//   generateList() {
//     if (this.selectedIds.length === 0) return;
//     this.recipeService.generateShoppingList(this.selectedIds).subscribe({
//       next: (data) => {
//         this.shoppingListData = data;
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//       },
//       error: (err) => console.error("Error generating list", err)
//     });
//   }

//   closeShoppingList() {
//     this.shoppingListData = null;
//   }

//   ngOnDestroy(): void {
//     if (this.userSub) this.userSub.unsubscribe();
//     if (this.routeSub) this.routeSub.unsubscribe();
//   }
// }
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { AuthService } from '../../services/services/aunth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SmartSearchComponent } from '../smart-sort/smart-sort.component';
import { ShoppingListComponent } from '../shoping-list/shoping-list.component'; 
import { Recipe, User, RecipeFilters } from '../../model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, FormsModule, SmartSearchComponent, ShoppingListComponent],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  allRecipes: Recipe[] = [];      
  filteredRecipes: Recipe[] = []; 
  baseUrl = 'http://127.0.0.1:5000'; 
  user: User | null = null;
  filters: RecipeFilters = { searchQuery: '', type: '', category: '', maxTime: 180 };
  selectedIds: number[] = [];
  shoppingListData: any = null; 
  private subs = new Subscription();

  constructor(
    private recipeService: RecipeService, 
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subs.add(this.authService.currentUser$.subscribe(userData => this.user = userData));
    this.loadRecipes();
  }

  // loadRecipes(): void {
  //   this.recipeService.getAllRecipes().subscribe({
  //     next: (data) => {
  //       this.allRecipes = data;
  //       this.subs.add(this.route.queryParams.subscribe(params => {
  //         if (params['category']) this.filters.category = params['category'];
  //         this.applyFilters();
  //       }));
  //     }
  //   });
  // }
  loadRecipes(): void {
  this.recipeService.getAllRecipes().subscribe({
    next: (data) => {
      this.allRecipes = data;
      this.subs.add(this.route.queryParams.subscribe(params => {
        // קליטת קטגוריה אם קיימת
        if (params['category']) {
          this.filters.category = params['category'];
        }
        // הוספה: קליטת סגנון (בשרי/חלבי/פרווה) אם קיים
        if (params['type']) {
          this.filters.type = params['type'];
        }
        
        this.applyFilters();
      }));
    }
  });
}

  applyFilters(): void {
    this.filteredRecipes = this.allRecipes.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(this.filters.searchQuery.toLowerCase());
      const matchesType = !this.filters.type || recipe.type === this.filters.type;
      const matchesCategory = !this.filters.category || recipe.category === this.filters.category;
      return matchesSearch && matchesType && matchesCategory && recipe.prep_time <= this.filters.maxTime;
    });
  }

  handleSmartSearchResults(results: any) {
    this.filteredRecipes = Array.isArray(results) ? results : [];
  }

  toggleRecipeSelection(id: number) {
    const idx = this.selectedIds.indexOf(id);
    idx > -1 ? this.selectedIds.splice(idx, 1) : this.selectedIds.push(id);
  }

  generateList() {
    if (this.selectedIds.length === 0) return;
    this.recipeService.generateShoppingList(this.selectedIds).subscribe({
      next: (data) => {
        this.shoppingListData = data;
        document.body.style.overflow = 'hidden'; // מניעת גלילה ברקע
      }
    });
  }
// toggleFavorite(recipe: Recipe, event: Event) {
//   event.stopPropagation(); // מונע מהקליק לפתוח את פרטי המתכון
//   if (!this.user) {
//     alert('אנא התחברי כדי להוסיף למועדפים');
//     return;
//   }
//   this.recipeService.toggleFavorite(recipe.id).subscribe({
//     next: (res: any) => {
//       recipe.isFavorite = (res.status === 'added');
//     },
//     error: (err) => console.error('Error toggling favorite', err)
//   });
// }
toggleFavorite(recipe: Recipe, event: Event) {
  event.stopPropagation();
  if (!this.user) {
    Swal.fire({
      icon: 'info',
      title: 'שימו לב',
      text: 'אנא התחברי כדי להוסיף למועדפים',
      confirmButtonColor: '#3085d6',
    });
    return;
  }

  this.recipeService.toggleFavorite(recipe.id).subscribe({
    next: (res: any) => {
      recipe.isFavorite = (res.status === 'added');

      Swal.fire({
        icon: 'success',
        title: res.status === 'added' ? 'נוסף למועדפים!' : 'הוסר מהמועדפים',
        showConfirmButton: false,
        timer: 1000
      });
    },
    error: (err) => Swal.fire('שגיאה', 'העדכון נכשל', 'error')
  });
}

  closeShoppingList() {
    this.shoppingListData = null;
    document.body.style.overflow = 'auto';
  }

  ngOnDestroy(): void { this.subs.unsubscribe(); }
  
  viewDetails(id: number) { this.router.navigate(['/recipe-details', id]); }
  resetFilters() { this.filters = { searchQuery: '', type: '', category: '', maxTime: 180 }; this.applyFilters(); }

  //   deleteRecipe(id: number, event: Event) {
  //   event.stopPropagation();
  //   if (confirm('האם את בטוחה שברצונך למחוק מתכון זה?')) {
  //     this.recipeService.deleteRecipe(id).subscribe({
  //       next: () => {
  //         this.allRecipes = this.allRecipes.filter(r => r.id !== id);
  //         this.applyFilters();
  //       },
  //       error: (err) => alert('מחיקה נכשלה: ' + err.error?.message)
  //     });
  //   }
  // }

  deleteRecipe(id: number, event: Event) {
  event.stopPropagation();

  Swal.fire({
    title: 'האם את בטוחה?',
    text: "המתכון יימחק לצמיתות!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'כן, מחק!',
    cancelButtonText: 'ביטול'
  }).then((result) => {
    if (result.isConfirmed) {
      this.recipeService.deleteRecipe(id).subscribe({
        next: () => {
          this.allRecipes = this.allRecipes.filter(r => r.id !== id);
          this.applyFilters();

          Swal.fire(
            'נמחק!',
            'המתכון נמחק בהצלחה.',
            'success'
          );
        },
        error: (err) => Swal.fire('שגיאה', 'מחיקה נכשלה: ' + err.error?.message, 'error')
      });
    }
  });
}

}