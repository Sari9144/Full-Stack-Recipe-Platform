
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