
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