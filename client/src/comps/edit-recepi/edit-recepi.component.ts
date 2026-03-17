
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