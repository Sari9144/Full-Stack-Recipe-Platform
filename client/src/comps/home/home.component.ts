

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