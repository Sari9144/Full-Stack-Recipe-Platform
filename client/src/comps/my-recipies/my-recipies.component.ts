// // import { Component, OnInit, inject } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { RecipeService } from '../../services/recipe.service';
// // import { AuthService } from '../../services/services/auth.service';
// // import { Router, RouterModule } from '@angular/router';

// // @Component({
// //   selector: 'app-my-recipes',
// //   standalone: true,
// //   imports: [CommonModule, RouterModule],
// //   templateUrl: './my-recipies.component.html',
// //   styleUrl: './my-recipies.component.css'
// // })
// // // export class MyRecipesComponent implements OnInit {
// // //   private recipeService = inject(RecipeService);
// // //   private authService = inject(AuthService);

// // //   myRecipes: any[] = [];
// // //   isLoading: boolean = true;

// // //   ngOnInit(): void {
// // //     const userId = this.authService.currentUserValue?.id;
// // //     if (userId) {
// // //       this.recipeService.getUserRecipes(userId).subscribe({
// // //         next: (recipes) => {
// // //           this.myRecipes = recipes;
// // //           this.isLoading = false;
// // //         },
// // //         error: (err) => {
// // //           console.error('שגיאה בטעינת המתכונים שלי:', err);
// // //           this.isLoading = false;
// // //         }
// // //       });
// // //     }
// // //   }
// // // }

// // // export class MyRecipesComponent implements OnInit {
// // //   private recipeService = inject(RecipeService);
// // //   private authService = inject(AuthService);

// // //   myRecipes: any[] = [];
// // //   isLoading: boolean = true;

// // //   ngOnInit(): void {
// // //     // 1. נשלוף את שם המשתמש במקום את ה-ID
// // //     // וודאי שב-AuthService השדה נקרא username (או name לפי מה שהגדרת ב-User model)
// // //     const username = this.authService.currentUserValue?.username; 

// // //     if (username) {
// // //       // 2. נשלח את ה-username ל-Service
// // //       this.recipeService.getUserRecipes(username).subscribe({
// // //         next: (recipes) => {
// // //           this.myRecipes = recipes;
// // //           this.isLoading = false;
// // //         },
// // //         error: (err) => {
// // //           console.error('שגיאה בטעינת המתכונים שלי:', err);
// // //           this.isLoading = false;
// // //         }
// // //       });
// // //     } else {
// // //       console.warn('לא נמצא שם משתמש מחובר');
// // //       this.isLoading = false;
// // //     }
// // //   }
// // // }
// // export class MyRecipesComponent implements OnInit {
// //   private recipeService = inject(RecipeService);
// //   private authService = inject(AuthService);
// //   private router = inject(Router); // הוספנו ניתוב

// //   myRecipes: any[] = [];
// //   isLoading: boolean = true;
// //   baseUrl = 'http://127.0.0.1:5000';

// //   ngOnInit(): void {
// //     const username = this.authService.currentUserValue?.username; 
// //     if (username) {
// //       this.loadRecipes(username);
// //     }
// //   }

// //   loadRecipes(username: string) {
// //     this.recipeService.getUserRecipes(username).subscribe({
// //       next: (recipes) => {
// //         this.myRecipes = recipes;
// //         this.isLoading = false;
// //       },
// //       error: (err) => {
// //         console.error('שגיאה:', err);
// //         this.isLoading = false;
// //       }
// //     });
// //   }

// //   // --- פונקציית עריכה ---
// //   editRecipe(id: number, event: Event) {
// //     event.stopPropagation(); // מונע מהקליק לעבור ל-routerLink של הכרטיס
// //     this.router.navigate(['/edit-recipe', id]);
// //   }

// //   // --- פונקציית מחיקה ---
// //   deleteRecipe(id: number, event: Event) {
// //     event.stopPropagation();
// //     if (confirm('בטוח שברצונך למחוק את המתכון לצמיתות?')) {
// //       this.recipeService.deleteRecipe(id).subscribe({
// //         next: () => {
// //           this.myRecipes = this.myRecipes.filter(r => r.id !== id);
// //           alert('המתכון נמחק בהצלחה');
// //         },
// //         error: () => alert('שגיאה במחיקה')
// //       });
// //     }
// //   }
// // }


// // import { Component, OnInit, inject } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { RecipeService } from '../../services/recipe.service';
// // import { AuthService } from '../../services/services/aunth.service';
// // import { Router, RouterModule } from '@angular/router';
// // import { Recipe } from '../../recipe.model'; // ייבוא המודל

// // @Component({
// //   selector: 'app-my-recipes',
// //   standalone: true,
// //   imports: [CommonModule, RouterModule],
// //   templateUrl: './my-recipies.component.html',
// //   styleUrl: './my-recipies.component.css'
// // })
// // export class MyRecipesComponent implements OnInit {
// //   private recipeService = inject(RecipeService);
// //   private authService = inject(AuthService);
// //   private router = inject(Router);

// //   // החלפת any[] ב-Recipe[]
// //   myRecipes: Recipe[] = [];
// //   isLoading: boolean = true;
// //   baseUrl = 'http://127.0.0.1:5000';

// //   ngOnInit(): void {
// //     // שליפת שם המשתמש מה-AuthService לפי המודל המעודכן
// //     const username = this.authService.currentUserValue?.username; 
// //     if (username) {
// //       this.loadRecipes(username);
// //     } else {
// //       this.isLoading = false;
// //       console.warn('לא נמצא משתמש מחובר');
// //     }
// //   }

// //   loadRecipes(username: string) {
// //     this.isLoading = true;
// //     this.recipeService.getUserRecipes(username).subscribe({
// //       next: (recipes: Recipe[]) => {
// //         this.myRecipes = recipes;
// //         this.isLoading = false;
// //       },
// //       error: (err) => {
// //         console.error('שגיאה בטעינת המתכונים:', err);
// //         this.isLoading = false;
// //       }
// //     });
// //   }

// //   /**
// //    * ניווט לעמוד עריכה
// //    */
// //   editRecipe(id: number, event: Event): void {
// //     event.stopPropagation(); // מניעת הפעלת ה-routerLink של הכרטיס כולו
// //     this.router.navigate(['/edit-recipe', id]);
// //   }

// //   /**
// //    * מחיקת מתכון מהשרת ועדכון הרשימה המקומית
// //    */
// //   deleteRecipe(id: number, event: Event): void {
// //     event.stopPropagation();
// //     if (confirm('בטוח שברצונך למחוק את המתכון לצמיתות?')) {
// //       this.recipeService.deleteRecipe(id).subscribe({
// //         next: () => {
// //           // עדכון הרשימה בתצוגה ללא צורך בטעינה מחדש מהשרת
// //           this.myRecipes = this.myRecipes.filter(r => r.id !== id);
// //           alert('המתכון נמחק בהצלחה');
// //         },
// //         error: (err) => {
// //           console.error('שגיאה במחיקה:', err);
// //           alert('שגיאה במחיקה');
// //         }
// //       });
// //     }
// //   }
// // }
// import { Component, OnInit, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RecipeService } from '../../services/recipe.service';
// import { AuthService } from '../../services/services/aunth.service';
// import { Router, RouterModule } from '@angular/router';
// import { Recipe } from '../../recipe.model';
// import Swal from 'sweetalert2'; // אל תשכחי להתקין

// @Component({
//   selector: 'app-my-recipes',
//   standalone: true,
//   imports: [CommonModule, RouterModule],
//   templateUrl: './my-recipies.component.html',
//   styleUrl: './my-recipies.component.css'
// })
// export class MyRecipesComponent implements OnInit {
//   private recipeService = inject(RecipeService);
//   private authService = inject(AuthService);
//   private router = inject(Router);

//   myRecipes: Recipe[] = [];
//   isLoading: boolean = true;
//   baseUrl = 'http://127.0.0.1:5000';

//   ngOnInit(): void {
//     const user = this.authService.currentUserValue;
//     if (user && user.username) {
//       this.loadRecipes(user.username);
//     } else {
//       this.isLoading = false;
//     }
//   }

//   loadRecipes(username: string) {
//     this.recipeService.getUserRecipes(username).subscribe({
//       next: (recipes) => {
//         this.myRecipes = recipes;
//         this.isLoading = false;
//       },
//       error: () => this.isLoading = false
//     });
//   }

//   editRecipe(id: number, event: Event): void {
//     event.stopPropagation();
//     this.router.navigate(['/edit-recipe', id]);
//   }

//   deleteRecipe(id: number, event: Event): void {
//     event.stopPropagation();

//     Swal.fire({
//       title: 'למחוק את היצירה?',
//       text: "לא ניתן יהיה לשחזר את המתכון לאחר המחיקה",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#8c6d31',
//       cancelButtonColor: '#1a1a1a',
//       confirmButtonText: 'כן, מחק לצמיתות',
//       cancelButtonText: 'ביטול',
//       background: '#ffffff'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         this.recipeService.deleteRecipe(id).subscribe({
//           next: () => {
//             this.myRecipes = this.myRecipes.filter(r => r.id !== id);
//             Swal.fire({
//               title: 'נמחק!',
//               icon: 'success',
//               timer: 1500,
//               showConfirmButton: false
//             });
//           }
//         });
//       }
//     });
//   }
// }

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { AuthService } from '../../services/services/aunth.service';
import { Router, RouterModule } from '@angular/router';
import { Recipe } from '../../model';
import Swal from 'sweetalert2';
import { AppButtonComponent } from '../buton-basic/buton-basic.component';

@Component({
  selector: 'app-my-recipes',
  standalone: true,
  imports: [CommonModule, RouterModule,AppButtonComponent],
  templateUrl: './my-recipies.component.html',
  styleUrl: './my-recipies.component.css'
})
export class MyRecipesComponent implements OnInit {
  private recipeService = inject(RecipeService);
  private authService = inject(AuthService);
  private router = inject(Router);

  myRecipes: Recipe[] = [];
  isLoading: boolean = true;
  baseUrl = 'http://127.0.0.1:5000';

  ngOnInit(): void {
    const user = this.authService.currentUserValue;
    if (user && user.username) {
      this.loadRecipes(user.username);
    } else {
      this.isLoading = false;
    }
  }

  loadRecipes(username: string) {
    this.recipeService.getUserRecipes(username).subscribe({
      next: (recipes) => {
        this.myRecipes = recipes;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  // הפונקציה שהייתה חסרה
  handleImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/placeholder-recipe.jpg'; // וודאי שהנתיב קיים בתיקיית assets
  }

  editRecipe(id: number, event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/edit-recipe', id]);
  }

  deleteRecipe(id: number, event: Event): void {
    event.stopPropagation();

    Swal.fire({
      title: 'למחוק את היצירה?',
      text: "לא ניתן יהיה לשחזר את המתכון לאחר המחיקה",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8c6d31',
      cancelButtonColor: '#1a1a1a',
      confirmButtonText: 'כן, מחק לצמיתות',
      cancelButtonText: 'ביטול',
      background: '#ffffff'
    }).then((result) => {
      if (result.isConfirmed) {
        this.recipeService.deleteRecipe(id).subscribe({
          next: () => {
            this.myRecipes = this.myRecipes.filter(r => r.id !== id);
            Swal.fire({
              title: 'נמחק!',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false
            });
          }
        });
      }
    });
  }
}