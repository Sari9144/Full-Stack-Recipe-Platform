// // import { Component, OnInit } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { FormsModule } from '@angular/forms';
// // import { ActivatedRoute, Router } from '@angular/router';
// // import { RecipeService } from '../../services/recipe.service';

// // @Component({
// //   selector: 'app-edit-recipe',
// //   standalone: true,
// //   imports: [CommonModule, FormsModule],
// //   templateUrl: './edit-recepi.component.html',
// //   styleUrl: './edit-recepi.component.css'
// // })
// // export class EditRecipeComponent implements OnInit {
// //   recipeId!: number;
// //   recipe: any = null;
// //   isLoading = true;
// //   baseUrl = 'http://127.0.0.1:5000';
// //   currentImage: string | null = null;

// //   constructor(
// //     private route: ActivatedRoute,
// //     private router: Router,
// //     private recipeService: RecipeService
// //   ) {}

// //   ngOnInit() {
// //     this.recipeId = Number(this.route.snapshot.paramMap.get('id'));
// //     if (this.recipeId) {
// //       this.loadRecipe();
// //     }
// //   }

// //   loadRecipe() {
// //     this.isLoading = true;
// //     this.recipeService.getRecipeById(this.recipeId).subscribe({
// //       next: (data) => {
// //         this.recipe = data;
        
// //         // הפיכת מערך הרכיבים לטקסט עבור ה-textarea
// //         if (this.recipe.ingredients && Array.isArray(this.recipe.ingredients)) {
// //           this.recipe.ingredients_raw = this.recipe.ingredients
// //             .map((ing: any) => `${ing.amount || ''} ${ing.unit || ''} ${ing.product || ''}`.trim())
// //             .join('\n');
// //         }
        
// //         this.isLoading = false;
// //       },
// //       error: (err) => {
// //         console.error('שגיאה בטעינת המתכון', err);
// //         this.router.navigate(['/profile']);
// //       }
// //     });
// //   }

// //   onSave() {
// //     if (!this.recipe) return;

// //     // פונקציה לפירוק הטקסט מה-textarea חזרה למערך אובייקטים
// //     const ingredientsArray = this.recipe.ingredients_raw.split('\n')
// //       .filter((line: string) => line.trim() !== '')
// //       .map((line: string) => {
// //         return { product: line.trim(), amount: 0, unit: '' }; 
// //         // הערה: השרת שלך חכם מספיק לקבל את זה ככה, או שניתן לשכלל את הפירוק
// //       });

// //     const recipeToUpdate = {
// //       title: this.recipe.title,
// //       instructions: this.recipe.instructions,
// //       prep_time: Number(this.recipe.prep_time),
// //       type: this.recipe.type,
// //       category: this.recipe.category,
// //       ingredients: ingredientsArray // שולחים מערך נקי
// //     };

// //     this.recipeService.updateRecipe(this.recipeId, recipeToUpdate).subscribe({
// //       next: () => {
// //         alert('המתכון עודכן בהצלחה!');
// //         this.router.navigate(['/profile']);
// //       },
// //       error: (err) => {
// //         console.error('שגיאה בעדכון', err);
// //         alert('עדכון נכשל. וודאי שכל השדות מלאים כראוי.');
// //       }
// //     });
// //   }

// //   setMainImage(url: string) {
// //     this.currentImage = url;
// //   }

// //   onCancel() {
// //     this.router.navigate(['/profile']);
// //   }
// // }
// // import { Component, OnInit } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { FormsModule } from '@angular/forms';
// // import { ActivatedRoute, Router } from '@angular/router';
// // import { RecipeService } from '../../services/recipe.service';
// // import { Recipe, Ingredient } from '../../recipe.model'; // ייבוא המודל המעודכן

// // // הרחבה מקומית לממשק לצורך ה-textarea בעריכה
// // interface EditRecipe extends Recipe {
// //   ingredients_raw?: string;
// // }

// // @Component({
// //   selector: 'app-edit-recipe',
// //   standalone: true,
// //   imports: [CommonModule, FormsModule],
// //   templateUrl: './edit-recepi.component.html',
// //   styleUrl: './edit-recepi.component.css'
// // })
// // export class EditRecipeComponent implements OnInit {
// //   recipeId!: number;
// //   recipe: EditRecipe | null = null; // שימוש בממשק המורחב
// //   isLoading = true;
// //   baseUrl = 'http://127.0.0.1:5000';
// //   currentImage: string | null = null;

// //   constructor(
// //     private route: ActivatedRoute,
// //     private router: Router,
// //     private recipeService: RecipeService
// //   ) {}

// //   ngOnInit() {
// //     this.recipeId = Number(this.route.snapshot.paramMap.get('id'));
// //     if (this.recipeId) {
// //       this.loadRecipe();
// //     }
// //   }

// //   loadRecipe() {
// //     this.isLoading = true;
// //     this.recipeService.getRecipeById(this.recipeId).subscribe({
// //       next: (data: Recipe) => {
// //         this.recipe = data as EditRecipe;
        
// //         // הפיכת מערך הרכיבים לטקסט עבור ה-textarea
// //         if (this.recipe.ingredients_raw && Array.isArray(this.recipe.ingredients_raw)) {
// //           this.recipe.ingredients_raw = this.recipe.ingredients_raw
// //             .map((ing: Ingredient) => `${ing.amount || ''} ${ing.unit || ''} ${ing.product || ''}`.trim())
// //             .join('\n');
// //         }
        
// //         this.isLoading = false;
// //       },
// //       error: (err) => {
// //         console.error('שגיאה בטעינת המתכון', err);
// //         this.router.navigate(['/profile']);
// //       }
// //     });
// //   }

// //   onSave() {
// //     if (!this.recipe || !this.recipe.ingredients_raw) return;

// //     // פונקציה לפירוק הטקסט מה-textarea חזרה למערך אובייקטים
// //     const ingredientsArray: Ingredient[] = this.recipe.ingredients_raw.split('\n')
// //       .filter((line: string) => line.trim() !== '')
// //       .map((line: string) => {
// //         return { product: line.trim(), amount: 0, unit: '' }; 
// //       });

// //     // יצירת אובייקט לעדכון מבוסס על המודל
// //     const recipeToUpdate: Partial<Recipe> = {
// //       title: this.recipe.title,
// //       instructions: this.recipe.instructions,
// //       prep_time: Number(this.recipe.prep_time),
// //       type: this.recipe.type,
// //       category: this.recipe.category,
// //       ingredients: ingredientsArray
// //     };

// //     this.recipeService.updateRecipe(this.recipeId, recipeToUpdate).subscribe({
// //       next: () => {
// //         alert('המתכון עודכן בהצלחה!');
// //         this.router.navigate(['/profile']);
// //       },
// //       error: (err) => {
// //         console.error('שגיאה בעדכון', err);
// //         alert('עדכון נכשל. וודאי שכל השדות מלאים כראוי.');
// //       }
// //     });
// //   }

// //   setMainImage(url: string) {
// //     this.currentImage = url;
// //   }

// //   onCancel() {
// //     this.router.navigate(['/profile']);
// //   }
// // // }
// // import { Component, OnInit } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { FormsModule } from '@angular/forms';
// // import { ActivatedRoute, Router } from '@angular/router';
// // import { RecipeService } from '../../services/recipe.service';
// // import { Recipe, Ingredient } from '../../recipe.model';

// // interface EditRecipe extends Recipe {
// //   ingredients_raw?: string;
// // }

// // @Component({
// //   selector: 'app-edit-recipe',
// //   standalone: true,
// //   imports: [CommonModule, FormsModule],
// //   templateUrl: './edit-recepi.component.html',
// //   styleUrl: './edit-recepi.component.css'
// // })
// // export class EditRecipeComponent implements OnInit {
// //   recipeId!: number;
// //   recipe: EditRecipe | null = null;
// //   isLoading = true;
// //   baseUrl = 'http://127.0.0.1:5000';
// //   currentImage: string | null = null;

// //   constructor(
// //     private route: ActivatedRoute,
// //     private router: Router,
// //     private recipeService: RecipeService
// //   ) {}

// //   ngOnInit() {
// //     this.recipeId = Number(this.route.snapshot.paramMap.get('id'));
// //     if (this.recipeId) {
// //       this.loadRecipe();
// //     }
// //   }

// //   loadRecipe() {
// //     this.isLoading = true;
// //     this.recipeService.getRecipeById(this.recipeId).subscribe({
// //       next: (data: Recipe) => {
// //         this.recipe = { ...data }; // העתקת האובייקט
        
// //         // תיקון: טעינת הרכיבים מתוך מערך ה-ingredients של השרת
// //         if (data.ingredients && Array.isArray(data.ingredients)) {
// //           this.recipe.ingredients_raw = data.ingredients
// //             .map((ing: Ingredient) => `${ing.amount || ''} ${ing.unit || ''} ${ing.product || ''}`.trim())
// //             .join('\n');
// //         }
        
// //         this.isLoading = false;
// //       },
// //       error: (err) => {
// //         console.error('שגיאה בטעינת המתכון', err);
// //         this.router.navigate(['/profile']);
// //       }
// //     });
// //   }

// //   onSave() {
// //     if (!this.recipe) return;

// //     // עיבוד הטקסט חזרה למערך אובייקטים
// //     const ingredientsArray: Ingredient[] = (this.recipe.ingredients_raw || '')
// //       .split('\n')
// //       .filter((line: string) => line.trim() !== '')
// //       .map((line: string) => {
// //         // במידה ויש לוגיקה עתידית לפירוק כמות/יחידה, היא תיכנס כאן
// //         return { product: line.trim(), amount: 1, unit: 'יחידה' }; 
// //       });

// //     // יצירת אובייקט עדכון מלא
// //     const recipeToUpdate: Partial<Recipe> = {
// //       title: this.recipe.title,
// //       instructions: this.recipe.instructions,
// //       prep_time: Number(this.recipe.prep_time),
// //       type: this.recipe.type,
// //       category: this.recipe.category,
// //       ingredients: ingredientsArray,
// //       main_image: this.recipe.main_image, // חשוב לשמור על התמונה הקיימת
// //       gallery: this.recipe.gallery
// //     };

// //     this.recipeService.updateRecipe(this.recipeId, recipeToUpdate).subscribe({
// //       next: () => {
// //         alert('המתכון עודכן בהצלחה!');
// //         this.router.navigate(['/recipe-details', this.recipeId]); // ניווט למתכון המעודכן
// //       },
// //       error: (err) => {
// //         console.error('שגיאה בעדכון', err);
// //         alert('עדכון נכשל. בדקי את החיבור לשרת.');
// //       }
// //     });
// //   }

// //   setMainImage(url: string) {
// //     if (!this.recipe) return;
// //     // שמירת הנתיב היחסי (ללא ה-baseUrl) בתוך האובייקט
// //     const relativeUrl = url.replace(this.baseUrl, '');
// //     this.recipe.main_image = relativeUrl;
// //     this.currentImage = url;
// //   }

// //   onCancel() {
// //     this.router.navigate(['/profile']);
// //   }
// // }

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { RecipeService } from '../../services/recipe.service';
// import { Recipe, Ingredient } from '../../model';
// import Swal from 'sweetalert2';

// /**
//  * ממשק עזר מקומי לעריכה המאפשר עבודה עם טקסט גולמי ברכיבים
//  */
// interface EditRecipe extends Recipe {
//   ingredients_raw?: string;
// }

// @Component({
//   selector: 'app-edit-recipe',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './edit-recepi.component.html',
//   styleUrl: './edit-recepi.component.css'
// })
// export class EditRecipeComponent implements OnInit {
//   recipeId!: number;
//   recipe: EditRecipe | null = null;
//   isLoading = true;
//   baseUrl = 'http://127.0.0.1:5000'; // מומלץ להעביר ל-environment.ts בעתיד
//   currentImage: string | null = null;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private recipeService: RecipeService
//   ) {}

//   ngOnInit() {
//     this.recipeId = Number(this.route.snapshot.paramMap.get('id'));
//     if (this.recipeId) {
//       this.loadRecipe();
//     }
//   }

//   /**
//    * טעינת המתכון מהשרת והמרת הרכיבים לפורמט טקסטואלי לעריכה נוחה
//    */
//   loadRecipe() {
//     this.isLoading = true;
//     this.recipeService.getRecipeById(this.recipeId).subscribe({
//       next: (data: Recipe) => {
//         this.recipe = { ...data };
        
//         // המרת מערך אובייקטי הרכיבים למחרוזת אחת עם שורות
//         if (data.ingredients && Array.isArray(data.ingredients)) {
//           this.recipe.ingredients_raw = data.ingredients
//             .map((ing: Ingredient) => `${ing.amount || ''} ${ing.unit || ''} ${ing.product || ''}`.trim())
//             .join('\n');
//         }
        
//         this.isLoading = false;
//       },
//       error: (err) => {
//         console.error('שגיאה בטעינת המתכון', err);
//         Swal.fire('אופס...', 'לא הצלחנו למצוא את המתכון המבוקש', 'error');
//         this.router.navigate(['/profile']);
//       }
//     });
//   }

//   /**
//    * שמירת השינויים: המרת הטקסט חזרה לאובייקטים ושליחה לשרת
//    */
//   onSave() {
//     if (!this.recipe) return;

//     if (!this.recipe.title || !this.recipe.ingredients_raw) {
//       Swal.fire('שדות חסרים', 'אנא ודאי שיש שם למתכון ורשימת רכיבים', 'warning');
//       return;
//     }

//     // הצגת אינדיקציית שמירה
//     Swal.fire({
//       title: 'מעדכן את היצירה...',
//       didOpen: () => Swal.showLoading(),
//       allowOutsideClick: false
//     });

//     // עיבוד טקסט הרכיבים חזרה למבנה הנתונים של ה-API
//     const ingredientsArray: Ingredient[] = (this.recipe.ingredients_raw || '')
//       .split('\n')
//       .filter((line: string) => line.trim() !== '')
//       .map((line: string) => {
//         const parts = line.trim().split(' ');
//         // לוגיקה פשוטה: אם המילה הראשונה היא מספר, נתייחס אליה ככמות
//         const amount = !isNaN(parseFloat(parts[0])) ? parseFloat(parts.shift()!) : 1;
//         return { 
//           product: parts.join(' ').trim(), 
//           amount: amount, 
//           unit: 'יחידה' 
//         }; 
//       });

//     const recipeToUpdate: Partial<Recipe> = {
//       title: this.recipe.title,
//       instructions: this.recipe.instructions,
//       prep_time: Number(this.recipe.prep_time),
//       type: this.recipe.type,
//       category: this.recipe.category,
//       ingredients: ingredientsArray,
//       main_image: this.recipe.main_image,
//       gallery: this.recipe.gallery
//     };

//     this.recipeService.updateRecipe(this.recipeId, recipeToUpdate).subscribe({
//       next: () => {
//         Swal.fire({
//           title: 'עודכן בהצלחה!',
//           text: 'המתכון שלך נשמר עם כל השינויים',
//           icon: 'success',
//           confirmButtonColor: '#8c6d31'
//         }).then(() => {
//           this.router.navigate(['/recipe-details', this.recipeId]);
//         });
//       },
//       error: (err) => {
//         console.error('שגיאה בעדכון', err);
//         Swal.fire('שגיאה', 'עדכון נכשל. בדקי את החיבור לשרת.', 'error');
//       }
//     });
//   }

//   /**
//    * החלפת התמונה הראשית מתוך הגלריה הקיימת
//    */
//   setMainImage(url: string) {
//     if (!this.recipe) return;
//     const relativeUrl = url.replace(this.baseUrl, '');
//     this.recipe.main_image = relativeUrl;
//     this.currentImage = url;
//   }

//   onCancel() {
//     this.router.navigate(['/profile']);
//   }
// }
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe, Ingredient } from '../../model';
import { AppButtonComponent } from '../buton-basic/buton-basic.component'; // וודאי נתיב תקין
import Swal from 'sweetalert2';

interface EditRecipe extends Recipe {
  ingredients_raw?: string;
}

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule, AppButtonComponent],
  templateUrl: './edit-recepi.component.html',
  styleUrl: './edit-recepi.component.css'
})
export class EditRecipeComponent implements OnInit {
  // הזרקת שירותים מודרנית
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly recipeService = inject(RecipeService);

  recipeId!: number;
  recipe: EditRecipe | null = null;
  isLoading = true;
  isSaving = false; // לניהול מצב הכפתור
  baseUrl = 'http://127.0.0.1:5000'; 
  currentImage: string | null = null;

  ngOnInit() {
    this.recipeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.recipeId) {
      this.loadRecipe();
    }
  }

  loadRecipe() {
    this.isLoading = true;
    this.recipeService.getRecipeById(this.recipeId).subscribe({
      next: (data: Recipe) => {
        this.recipe = { ...data };
        if (data.ingredients && Array.isArray(data.ingredients)) {
          this.recipe.ingredients_raw = data.ingredients
            .map((ing: Ingredient) => `${ing.amount || ''} ${ing.unit || ''} ${ing.product || ''}`.trim())
            .join('\n');
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('שגיאה בטעינה', err);
        Swal.fire({
          title: 'אופס...',
          text: 'לא הצלחנו למצוא את המתכון',
          icon: 'error',
          confirmButtonColor: '#c5a059'
        });
        this.router.navigate(['/profile']);
      }
    });
  }

  onSave() {
    if (!this.recipe) return;

    if (!this.recipe.title || !this.recipe.ingredients_raw) {
      Swal.fire({
        title: 'שדות חסרים',
        text: 'אנא ודאי שיש שם למתכון ורשימת רכיבים',
        icon: 'warning',
        confirmButtonColor: '#c5a059'
      });
      return;
    }

    this.isSaving = true;

    // עיבוד טקסט הרכיבים חזרה למבנה אובייקטים
    const ingredientsArray: Ingredient[] = (this.recipe.ingredients_raw || '')
      .split('\n')
      .filter((line: string) => line.trim() !== '')
      .map((line: string) => {
        const parts = line.trim().split(' ');
        const amount = !isNaN(parseFloat(parts[0])) ? parseFloat(parts.shift()!) : 1;
        return { 
          product: parts.join(' ').trim(), 
          amount: amount, 
          unit: 'יחידה' 
        }; 
      });

    const recipeToUpdate: Partial<Recipe> = {
      title: this.recipe.title,
      instructions: this.recipe.instructions,
      prep_time: Number(this.recipe.prep_time),
      type: this.recipe.type,
      category: this.recipe.category,
      ingredients: ingredientsArray,
      main_image: this.recipe.main_image,
      gallery: this.recipe.gallery
    };

    this.recipeService.updateRecipe(this.recipeId, recipeToUpdate).subscribe({
      next: () => {
        this.isSaving = false;
        Swal.fire({
          title: 'היצירה עודכנה!',
          text: 'השינויים נשמרו בהצלחה',
          icon: 'success',
          confirmButtonColor: '#c5a059'
        }).then(() => {
          this.router.navigate(['/recipe-details', this.recipeId]);
        });
      },
      error: (err) => {
        this.isSaving = false;
        console.error('שגיאה בעדכון', err);
        Swal.fire({
          title: 'שגיאה',
          text: 'העדכון נכשל. נסי שוב מאוחר יותר.',
          icon: 'error',
          confirmButtonColor: '#8b0000'
        });
      }
    });
  }

  setMainImage(url: string) {
    if (!this.recipe) return;
    const relativeUrl = url.replace(this.baseUrl, '');
    this.recipe.main_image = relativeUrl;
    this.currentImage = url;
  }

  onCancel() {
    this.router.navigate(['/profile']);
  }
}