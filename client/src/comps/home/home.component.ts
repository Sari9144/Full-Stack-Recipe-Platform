// // // // // // // import { Component, OnInit, inject } from '@angular/core';
// // // // // // // import { CommonModule } from '@angular/common';
// // // // // // // import { RecipeService } from '../../services/recipe.service';
// // // // // // // import { RouterLink } from '@angular/router';

// // // // // // // @Component({
// // // // // // //   selector: 'app-home',
// // // // // // //   standalone: true,
// // // // // // //   imports: [CommonModule, RouterLink],
// // // // // // //   templateUrl: './home.component.html',
// // // // // // //   styleUrls: ['./home.component.css']
// // // // // // // })
// // // // // // // export class HomeComponent implements OnInit {
// // // // // // //   private recipeService = inject(RecipeService);
  
// // // // // // //   quickRecipes: any[] = [];
// // // // // // //   categories: string[] = [];
// // // // // // //   baseUrl = 'http://127.0.0.1:5000';

// // // // // // //   ngOnInit(): void {
// // // // // // //     this.recipeService.getHomeData().subscribe({
// // // // // // //       next: (data) => {
// // // // // // //         this.quickRecipes = data.quick_recipes;
// // // // // // //         this.categories = data.categories;
// // // // // // //       },
// // // // // // //       error: (err) => console.error('Error loading home data:', err)
// // // // // // //     });
// // // // // // //   }
// // // // // // // }


// // // // // // import { Component, OnInit, inject } from '@angular/core';
// // // // // // import { CommonModule } from '@angular/common';
// // // // // // import { RecipeService } from '../../services/recipe.service';
// // // // // // import { RouterLink } from '@angular/router';

// // // // // // @Component({
// // // // // //   selector: 'app-home',
// // // // // //   standalone: true,
// // // // // //   imports: [CommonModule, RouterLink],
// // // // // //   templateUrl: './home.component.html',
// // // // // //   styleUrls: ['./home.component.css']
// // // // // // })
// // // // // // export class HomeComponent implements OnInit {
// // // // // //   private recipeService = inject(RecipeService);
  
// // // // // //   // כאן נשמור את כל המתכונים שיחזרו מהשרת
// // // // // //   recipes: any[] = [];
// // // // // //   categories: string[] = [];
// // // // // //   // הכתובת של השרת - ודאי ששרת ה-Flask אכן רץ על פורט 5000
// // // // // //   baseUrl = 'http://127.0.0.1:5000';

// // // // // //   ngOnInit(): void {
// // // // // //     // שיניתי לקריאה שמביאה את כל המתכונים מהנתיב המעודכן
// // // // // //     this.recipeService.getAllRecipes().subscribe({
// // // // // //       next: (data) => {
// // // // // //         // המידע מגיע כמערך של מתכונים
// // // // // //         this.recipes = data;
// // // // // //       },
// // // // // //       error: (err) => {
// // // // // //         console.error('Error loading recipes:', err);
// // // // // //         // אם השרת לא עונה, תקבלי כאן את ה-HttpErrorResponse שראינו קודם
// // // // // //       }
// // // // // //     });
// // // // // //   }
// // // // // // }
// // // // import { Component, OnInit, inject } from '@angular/core';
// // // // import { CommonModule } from '@angular/common';
// // // // import { RecipeService } from '../../services/recipe.service';
// // // // import { RouterLink } from '@angular/router';

// // // // @Component({
// // // //   selector: 'app-home',
// // // //   standalone: true,
// // // //   imports: [CommonModule, RouterLink],
// // // //   templateUrl: './home.component.html',
// // // //   styleUrls: ['./home.component.css']
// // // // })
// // // // // export class HomeComponent implements OnInit {
// // // // //   private recipeService = inject(RecipeService);
  
// // // // //   recipes: any[] = [];
// // // // //   // הוספת המשתנה כדי למנוע את שגיאת NG9 ב-HTML
// // // // //   categories: string[] = []; 
// // // // //   baseUrl = 'http://127.0.0.1:5000';

// // // // //   ngOnInit(): void {
// // // // //     // קריאה לנתיב שמחזיר את כל המתכונים
// // // // //     this.recipeService.getAllRecipes().subscribe({
// // // // //       next: (data) => {
// // // // //         this.recipes = data;
// // // // //         // חילוץ אוטומטי של קטגוריות מתוך המתכונים כדי שהתפריט ב-HTML יעבוד
// // // // //         this.categories = [...new Set(data.map((r: any) => r.type))];
// // // // //       },
// // // // //       error: (err) => console.error('Error loading home data:', err)
// // // // //     });
// // // // //   }
// // // // // }

// // // // export class HomeComponent implements OnInit {
// // // //   private recipeService = inject(RecipeService);
  
// // // //   // הגדרת המשתנים שה-HTML מצפה להם
// // // //   recipes: any[] = [];
// // // //   quickRecipes: any[] = []; // הוספת המשתנה החסר
// // // //   categories: string[] = []; 
// // // //   baseUrl = 'http://127.0.0.1:5000';
// // // //   ngOnInit(): void {
// // // //     this.recipeService.getAllRecipes().subscribe({
// // // //       next: (data) => {
// // // //         this.recipes = data;
// // // //         // כאן אנחנו "מאכילים" את ה-quickRecipes בנתונים מהשרת
// // // //         this.quickRecipes = data; 
// // // //         this.categories = [...new Set(data.map((r: any) => r.type))];
// // // //       },
// // // //       error: (err) => console.error('Error:', err)
// // // //     });
// // // //   }
// // // // }

// // // // import { Component, OnInit, inject } from '@angular/core';
// // // // import { CommonModule } from '@angular/common';
// // // // import { RecipeService } from '../../services/recipe.service';
// // // // import { RouterLink } from '@angular/router';
// // // // import { SmartSearchComponent } from '../smart-sort/smart-sort.component';

// // // // @Component({
// // // //   selector: 'app-home',
// // // //   standalone: true,
// // // //   imports: [CommonModule, RouterLink,SmartSearchComponent],
// // // //   templateUrl: './home.component.html',
// // // //   styleUrls: ['./home.component.css']
// // // // })
// // // // export class HomeComponent implements OnInit {
// // // //   private recipeService = inject(RecipeService);
  
// // // //   // הגדרת המשתנים
// // // //   quickRecipes: any[] = []; // כאן יופיעו רק ה-4 המהירים
// // // //   categories: string[] = []; // כאן יופיעו הקטגוריות הנקיות מהשרת
// // // //   baseUrl = 'http://127.0.0.1:5000';

// // // //   ngOnInit(): void {
// // // //     // השתמשי ב-getHomeData במקום ב-getAllRecipes
// // // //     this.recipeService.getHomeData().subscribe({
// // // //       next: (data) => {
// // // //         // השרת מחזיר אובייקט עם quick_recipes ו-categories
// // // //         this.quickRecipes = data.quick_recipes; 
// // // //         this.categories = data.categories;
// // // //         console.log('Home data loaded successfully:', data);
// // // //       },
// // // //       error: (err) => {
// // // //         console.error('Error loading home data:', err);
// // // //       }
// // // //     });
// // // //   }
// // // // }
// // // import { Component, OnInit, inject } from '@angular/core';
// // // import { CommonModule } from '@angular/common';
// // // import { RecipeService } from '../../services/recipe.service';
// // // import { RouterLink } from '@angular/router';
// // // import { SmartSearchComponent } from '../smart-sort/smart-sort.component';
// // // import { FormsModule } from '@angular/forms'; // הוספת FormsModule עבור ה-select

// // // @Component({
// // //   selector: 'app-home',
// // //   standalone: true,
// // //   imports: [CommonModule, RouterLink, SmartSearchComponent, FormsModule],
// // //   templateUrl: './home.component.html',
// // //   styleUrls: ['./home.component.css']
// // // })
// // // export class HomeComponent implements OnInit {
// // //   private recipeService = inject(RecipeService);
  
// // //   baseUrl = 'http://127.0.0.1:5000';
  
// // //   // נתונים גולמיים מהשרת
// // //   allQuickRecipes: any[] = []; 
// // //   // נתונים להצגה (אחרי סינון מקומי)
// // //   filteredQuickRecipes: any[] = [];

// // //   // הגדרת קטגוריות סטטית (חוסך קריאת שרת)
// // //   staticCategories: string[] = [
// // //     'עיקריות', 'תוספות', 'סלטים', 'מרקים', 'מאפים', 
// // //     'לחמים', 'קינוחים', 'עוגות ועוגיות', 'משקאות', 
// // //     'ארוחת בוקר', 'חגים', 'טבעוני', 'ללא גלוטן'
// // //   ];

// // //   selectedCategory: string = '';

// // //   ngOnInit(): void {
// // //     this.loadHomeData();
// // //   }

// // //   loadHomeData() {
// // //     this.recipeService.getHomeData().subscribe({
// // //       next: (data) => {
// // //         this.allQuickRecipes = data.quick_recipes;
// // //         this.filteredQuickRecipes = [...this.allQuickRecipes]; // בהתחלה מציגים הכל
// // //       },
// // //       error: (err) => console.error('Error loading home data:', err)
// // //     });
// // //   }

// // //   // פונקציית סינון מקומית (Client-side filtering)
// // //   filterByCategory() {
// // //     if (!this.selectedCategory) {
// // //       this.filteredQuickRecipes = [...this.allQuickRecipes];
// // //     } else {
// // //       this.filteredQuickRecipes = this.allQuickRecipes.filter(r => 
// // //         r.category === this.selectedCategory
// // //       );
// // //     }
// // //   }
// // //   handleImageError(event: any) {
// // //   // אם התמונה לא נמצאה בשרת, נשים תמונת ברירת מחדל
// // //   event.target.src = 'assets/placeholder.jpg'; 
// // //   // או נתיב ישיר לתמונה גנרית בשרת:
// // //   // event.target.src = this.baseUrl + '/static/uploads/default_recipe.jpg';
// // // }
// // // }
// // import { Component, OnInit, inject } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { RecipeService } from '../../services/recipe.service'; // וודאי שהנתיב נכון
// // import { RouterModule } from '@angular/router';
// // import { FormsModule } from '@angular/forms';
// // import { SmartSearchComponent } from '../smart-sort/smart-sort.component';

// // @Component({
// //   selector: 'app-home',
// //   standalone: true,
// //   imports: [CommonModule, RouterModule, FormsModule, SmartSearchComponent],
// //   templateUrl: './home.component.html',
// //   styleUrls: ['./home.component.css']
// // })
// // export class HomeComponent implements OnInit {
// //   private recipeService = inject(RecipeService);
  
// //   baseUrl: string = 'http://localhost:5000'; // וודאי שזה תואם לשרת שלך
// //   quickRecipes: any[] = [];
// //   filteredQuickRecipes: any[] = [];
// //   selectedCategory: string = '';
  
// //   // רשימת קטגוריות סטטית לתצוגה בריבועים
// //   staticCategories: string[] = ['בשרי', 'חלבי', 'פרווה', 'קינוחים', 'דגים', 'סלטים'];

// //   ngOnInit() {
// //     this.loadQuickRecipes();
// //   }

// //   loadQuickReשcipes() {
// //     this.recipeService.getRecipes().subscribe({
// //       next: (data) => {
// //         // סינון מתכונים שזמן ההכנה שלהם עד 30 דקות
// //         this.quickRecipes = data.filter((r: any) => r.prep_time <= 30);
// //         this.filteredQuickRecipes = [...this.quickRecipes];
// //       },
// //       error: (err) => console.error(err)
// //     });
// //   }

// //   filterByCategory() {
// //     if (!this.selectedCategory) {
// //       this.filteredQuickRecipes = [...this.quickRecipes];
// //     } else {
// //       this.filteredQuickRecipes = this.quickRecipes.filter(
// //         r => r.category === this.selectedCategory
// //       );
// //     }
// //   }

// //   // הפונקציה שפתרה את השגיאה:
// //   scrollToCategories() {
// //     const element = document.getElementById('categories');
// //     if (element) {
// //       element.scrollIntoView({ behavior: 'smooth', block: 'start' });
// //     }
// //   }

// //   handleImageError(event: any) {
// //     event.target.src = this.baseUrl + '/static/uploads/placeholder.jpg';
// //   }
// // }

// // import { Component, OnInit, inject } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { RecipeService } from '../../services/recipe.service';
// // import { RouterModule } from '@angular/router';
// // import { FormsModule } from '@angular/forms';
// // import { SmartSearchComponent } from '../smart-sort/smart-sort.component';

// // @Component({
// //   selector: 'app-home',
// //   standalone: true,
// //   imports: [CommonModule, RouterModule, FormsModule, SmartSearchComponent],
// //   templateUrl: './home.component.html',
// //   styleUrls: ['./home.component.css']
// // })
// // export class HomeComponent implements OnInit {
// //   private recipeService = inject(RecipeService);
  
// //   // כתובת השרת המדויקת עבור תמונות
// //   baseUrl: string = 'http://127.0.0.1:5000'; 
  
// //   quickRecipes: any[] = [];
// //   filteredQuickRecipes: any[] = [];
// //   selectedCategory: string = '';
  
// //   // רשימת קטגוריות לתצוגה בריבועים ובסינון
// //   staticCategories: string[] = ['בשרי', 'חלבי', 'פרווה', 'קינוחים', 'דגים', 'סלטים', 'מאפים', 'מרקים'];

// //   ngOnInit() {
// //     this.loadQuickRecipes();
// //   }

// //   /**
// //    * טעינת כל המתכונים וסינון אלו שזמן ההכנה שלהם קצר מ-30 דקות
// //    */
// //   loadQuickRecipes() {
// //     this.recipeService.getAllRecipes().subscribe({
// //       next: (data: any[]) => {
// //         // סינון מתכונים מהירים (עד 30 דק')
// //         this.quickRecipes = data.filter(r => r.prep_time <= 30);
// //         // בהתחלה מציגים את כולם
// //         this.filteredQuickRecipes = [...this.quickRecipes];
// //       },
// //       error: (err) => console.error('שגיאה בטעינת מתכונים לדף הבית:', err)
// //     });
// //   }

// //   /**
// //    * סינון רשימת המתכונים המהירים לפי קטגוריה שנבחרה ב-Select
// //    */
// //   filterByCategory() {
// //     if (!this.selectedCategory) {
// //       this.filteredQuickRecipes = [...this.quickRecipes];
// //     } else {
// //       this.filteredQuickRecipes = this.quickRecipes.filter(
// //         r => r.category === this.selectedCategory
// //       );
// //     }
// //   }

// //   /**
// //    * גלילה חלקה אל אזור הקטגוריות בלחיצה על הכפתור ב-Hero
// //    */
// //   scrollToCategories() {
// //     const element = document.getElementById('categories');
// //     if (element) {
// //       element.scrollIntoView({ behavior: 'smooth', block: 'start' });
// //     }
// //   }

// //   /**
// //    * טיפול בשגיאת טעינת תמונה - הצגת תמונת ברירת מחדל
// //    */
// //   handleImageError(event: any) {
// //     event.target.src = this.baseUrl + '/static/uploads/placeholder.jpg';
// //   }
// // }

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SmartSearchComponent } from '../smart-sort/smart-sort.component';
import { Recipe } from '../../model'; // ייבוא המודל המעודכן

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SmartSearchComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private recipeService = inject(RecipeService);
  
  // כתובת השרת המדויקת עבור תמונות
  baseUrl: string = 'http://127.0.0.1:5000'; 
  
  // שימוש בטיפוס Recipe במקום any
  quickRecipes: Recipe[] = [];
  filteredQuickRecipes: Recipe[] = [];
  selectedCategory: string = '';
  isLoaded = false;
  // רשימת קטגוריות לתצוגה בריבועים ובסינון
  // staticCategories: string[] = ['בשרי', 'חלבי', 'פרווה', 'קינוחים', 'דגים', 'סלטים', 'מאפים', 'מרקים'];
 staticCategories = [
  { name: 'עיקריות', icon: '🍽️' },
  { name: 'תוספות', icon: '🍟' },
  { name: 'סלטים', icon: '🥗' },
  { name: 'מרקים', icon: '🥣' },
  { name: 'מאפים', icon: '🥐' },
  { name: 'לחמים', icon: '🥖' },
  { name: 'קינוחים', icon: '🧁' },
  { name: 'עוגות ועוגיות', icon: '🍪' },
  { name: 'בשרי', icon: '🍗' ,typeValue: 'Meat' },
  { name: 'חלבי', icon: '🥛' ,typeValue: 'Dairy'},
  { name: 'פרווה', icon: '🍏'  ,typeValue: 'Parve' }
];
//  staticCategories = [
//   { name: 'עיקריות', icon: '🍽️' },
//   { name: 'תוספות', icon: '🍟' },
//   { name: 'סלטים', icon: '🥗' },
//   { name: 'מרקים', icon: '🥣' },
//   { name: 'מאפים', icon: '🥐' },
//   { name: 'לחמים', icon: '🥖' },
//   { name: 'קינוחים', icon: '🧁' },
//   { name: 'עוגות ועוגיות', icon: '🍪' },
//   { name: 'בשרי', icon: '🍗', typeValue: 'Meat' },
//   { name: 'חלבי', icon: '🥛', typeValue: 'Dairy' },
//   { name: 'פרווה', icon: '🍏', typeValue: 'Parve' }
// ];
  ngOnInit() {
    this.loadQuickRecipes();
  }

  /**
   * טעינת כל המתכונים וסינון אלו שזמן ההכנה שלהם קצר מ-30 דקות
   */
  loadQuickRecipes() {
    this.recipeService.getAllRecipes().subscribe({
      next: (data: Recipe[]) => { // הגדרת טיפול בנתונים כ-Recipe[]
        // סינון מתכונים מהירים (עד 30 דק')
        this.quickRecipes = data.filter(r => r.prep_time <= 30);
        // בהתחלה מציגים את כולם
        this.filteredQuickRecipes = [...this.quickRecipes];
      },
      error: (err) => console.error('שגיאה בטעינת מתכונים לדף הבית:', err)
    });
  }

  /**
   * סינון רשימת המתכונים המהירים לפי קטגוריה שנבחרה ב-Select
   */
  filterByCategory() {
    if (!this.selectedCategory) {
      this.filteredQuickRecipes = [...this.quickRecipes];
    } else {
      this.filteredQuickRecipes = this.quickRecipes.filter(
        r => r.category === this.selectedCategory
      );
    }
  }

  /**
   * גלילה חלקה אל אזור הקטגוריות בלחיצה על הכפתור ב-Hero
   */
  scrollToCategories() {
    const element = document.getElementById('categories');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /**
   * טיפול בשגיאת טעינת תמונה - הצגת תמונת ברירת מחדל
   */
  handleImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = this.baseUrl + '/static/uploads/placeholder.jpg';
  }
}
// import { Component, OnInit, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RecipeService } from '../../services/recipe.service';
// import { RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { SmartSearchComponent } from '../smart-sort/smart-sort.component';
// import { Recipe } from '../../model';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [CommonModule, RouterModule, FormsModule, SmartSearchComponent],
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {
//   private recipeService = inject(RecipeService);
  
//   baseUrl: string = 'http://127.0.0.1:5000'; 
//   quickRecipes: Recipe[] = [];
//   filteredQuickRecipes: Recipe[] = [];
//   isLoaded = false;

//   staticCategories = [
//     { name: 'בשרי', icon: '🍳' },
//     { name: 'חלבי', icon: '🥛' },
//     { name: 'פרווה', icon: '🥗' },
//     { name: 'קינוחים', icon: '🧁' },
//     { name: 'דגים', icon: '🐟' },
//     { name: 'סלטים', icon: '🥬' },
//     { name: 'מאפים', icon: '🥐' },
//     { name: 'מרקים', icon: '🍜' }
//   ];

//   ngOnInit() {
//     this.loadQuickRecipes();
//   }

//   loadQuickRecipes() {
//     this.recipeService.getAllRecipes().subscribe({
//       next: (data: Recipe[]) => {
//         // לוקחים רק את ה-4 הכי מהירים לתצוגת פרימיום מצומצמת
//         this.quickRecipes = data
//           .filter(r => r.prep_time <= 30)
//           .sort((a, b) => a.prep_time - b.prep_time)
//           .slice(0, 4);
//         this.filteredQuickRecipes = [...this.quickRecipes];
//         this.isLoaded = true;
//       },
//       error: (err) => console.error('Error:', err)
//     });
//   }

//   scrollToCategories() {
//     document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
//   }

//   handleImageError(event: Event) {
//     (event.target as HTMLImageElement).src = 'assets/images/placeholder-gold.jpg';
//   }
//     filterByCategory() {
//     if (!this.selectedCategory) {
//       this.filteredQuickRecipes = [...this.quickRecipes];
//     } else {
//       this.filteredQuickRecipes = this.quickRecipes.filter(
//         r => r.category === this.selectedCategory
//       );
//     }
//   }
// }