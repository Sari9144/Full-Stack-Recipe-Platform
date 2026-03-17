
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