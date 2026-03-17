

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';
import { smartSearchResult, missingIngredient } from '../../model';

@Component({
  selector: 'app-smart-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './smart-sort.component.html',
  styleUrls: ['./smart-sort.component.css']
})
export class SmartSearchComponent {
  private recipeService = inject(RecipeService);
  private router = inject(Router);

  ingredientInput: string = '';
  selectedIngredients: string[] = [];
  results: smartSearchResult[] = []; // שימוש בטיפוס המוגדר
  isLoading: boolean = false;
  shoppingListData: missingIngredient[] | null = null; 

  addIngredient() {
    const val = this.ingredientInput.trim();
    if (val && !this.selectedIngredients.includes(val)) {
      this.selectedIngredients.push(val);
      this.ingredientInput = '';
    }
  }

  removeIngredient(index: number) {
    this.selectedIngredients.splice(index, 1);
    this.shoppingListData = null; 
  }

  search() {
    if (this.selectedIngredients.length === 0) return;
    this.isLoading = true;
    this.recipeService.smartSearch(this.selectedIngredients).subscribe({
      next: (data: smartSearchResult[]) => {
        this.results = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Search error:", err);
        this.isLoading = false;
      }
    });
  }

  generateMissingIngredients(recipeId: number, event: Event) {
    event.stopPropagation();
    
    this.recipeService.generateShoppingList([recipeId]).subscribe({
      next: (data: any) => {
        // המרה מאובייקט מילוני (מה שחוזר מהשרת) למערך של אובייקטים
        const allIngredients: missingIngredient[] = Object.keys(data).map(key => ({
          name: key,
          amount: data[key]
        }));

        // סינון: מה חסר למשתמש (לא נמצא ברשימת ה-selectedIngredients שלו)
        this.shoppingListData = allIngredients.filter(item => {
          return !this.selectedIngredients.some(selected => 
            item.name.toLowerCase().includes(selected.toLowerCase()) || 
            selected.toLowerCase().includes(item.name.toLowerCase())
          );
        });

        if (this.shoppingListData.length === 0) {
          alert('מעולה! יש לך את כל המצרכים למתכון זה בשלוף! 😊');
        }
      },
      error: (err) => {
        console.error("Error fetching recipe ingredients:", err);
        alert('חלה שגיאה בטעינת המצרכים');
      }
    });
  }

  goToRecipe(id: number) {
    this.router.navigate(['/recipe-details', id]);
  }
}