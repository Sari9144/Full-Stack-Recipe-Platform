

import { Component, OnInit, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { FormsModule } from '@angular/forms';
import { Recipe, Ingredient } from '../../model';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private recipeService = inject(RecipeService);

  recipe: any | null = null; 
  relatedRecipes: Recipe[] = []; 
  baseUrl = 'http://127.0.0.1:5000';
  currentImage: string = '';
  servings: number = 1;
  isScrolled: boolean = false;

  ingredientGenerator: Generator<Ingredient, void, unknown> | null = null;
  currentReadingIng: Ingredient | null = null;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 100;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.resetComponentState();
        this.loadRecipeData(id);
      }
    });
  }

  private resetComponentState() {
    this.servings = 1;
    this.currentReadingIng = null;
    this.ingredientGenerator = null;
    this.resetAudioAssistant();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // loadRecipeData(id: number) {
  //   this.recipeService.getRecipeById(id).subscribe({
  //     next: (data: any) => {
  //       this.recipe = data;
        
  //       // הגדרת תמונה ראשית - השרת שולח נתיב שמתחיל ב-/static/uploads
  //       if (data.main_image) {
  //         this.currentImage = `${this.baseUrl}${data.main_image}`;
  //       } else {
  //         this.currentImage = 'assets/images/placeholder.jpg';
  //       }
        
  //       this.loadRelated(id);
  //     },
  //     error: (err) => console.error('Error loading recipe:', err)
  //   });
  // }
loadRecipeData(id: number) {
  this.recipeService.getRecipeById(id).subscribe({
    next: (data: Recipe) => {
      console.log('נתוני מתכון שהתקבלו:', data); // בדקי בקונסול (F12) שמופיע כאן gallery
      
      this.recipe = data;
      
      // הגדרת תמונה ראשית
      if (data.main_image) {
        this.currentImage = `${this.baseUrl}${data.main_image}`;
      } else {
        this.currentImage = 'assets/images/placeholder.jpg';
      }
      
      this.loadRelated(id);
    },
    error: (err) => console.error('Error loading recipe:', err)
  });
}
  // onServingsChange() {
  //   if (!this.recipe || this.servings < 1) {
  //     this.servings = 1;
  //     return;
  //   }
  //   this.resetAudioAssistant();
  //   this.recipeService.updateServings(this.recipe.id, this.servings).subscribe({
  //     next: (updatedData: Partial<Recipe>) => {
  //       if (this.recipe && updatedData.ingredients) {
  //         this.recipe.ingredients = updatedData.ingredients;
  //       }
  //     },
  //     error: (err) => console.error('Error updating servings:', err)
  //   });
  // }
  onServingsChange() {
  if (!this.recipe || this.servings < 1) {
    this.servings = 1;
    return;
  }
  this.resetAudioAssistant();
  
  // קריאה ל-Service המעודכן
  this.recipeService.updateServings(this.recipe.id, this.servings).subscribe({
    next: (updatedData: any) => {
      if (updatedData && updatedData.ingredients) {
        // השרת מחזיר את כל המתכון, אנחנו מעדכנים רק את הרכיבים
        this.recipe.ingredients = updatedData.ingredients;
      }
    },
    error: (err) => console.error('Error updating servings:', err)
  });
}

  *createIngredientGenerator() {
    if (!this.recipe) return;
    for (let ing of this.recipe.ingredients) {
      yield ing;
    }
  }

  readNextIngredient() {
    if (!this.ingredientGenerator) {
      this.ingredientGenerator = this.createIngredientGenerator();
    }
    const result = this.ingredientGenerator?.next();
    if (result && !result.done) {
      this.currentReadingIng = result.value as Ingredient;
      const textToRead = `${this.currentReadingIng.amount} ${this.currentReadingIng.unit} ${this.currentReadingIng.product}`;
      this.speak(textToRead);
    } else {
      this.speak("זהו, סיימנו את כל הרכיבים! בהצלחה בבישול.");
      this.resetAudioAssistant();
    }
  }

  resetAudioAssistant() {
    this.currentReadingIng = null;
    this.ingredientGenerator = null;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  speak(text: string) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'he-IL';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }

  loadRelated(id: number) {
    this.recipeService.getRelatedRecipes(id).subscribe((res: Recipe[]) => {
      this.relatedRecipes = res;
    });
  }

  setMainImage(url: string) {
    this.currentImage = url;
  }

  handleImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/placeholder-recipe.jpg';
  }

  printRecipe() { window.print(); }
  goBack() { window.history.back(); }
}