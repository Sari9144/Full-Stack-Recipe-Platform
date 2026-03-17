

import { Routes } from '@angular/router';
import { roleGuard } from '../auth.guard'; // ודאי שהנתיב ל-Guard שיצרנו נכון

export const routes: Routes = [
  // ==========================================
  // 1. דפים ציבוריים (נגישים לכולם)
  // ==========================================
  { 
    path: 'home', 
    loadComponent: () => import('../comps/home/home.component').then(m => m.HomeComponent) 
  },
  { 
    path: 'login', 
    loadComponent: () => import('../comps/login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'register', 
    loadComponent: () => import('../comps/register/register.component').then(m => m.RegisterComponent) 
  },
  { 
    path: 'recipes', 
    loadComponent: () => import('../comps/recipe-list/recipe-list.component').then(m => m.RecipeListComponent) 
  },
  { 
    path: 'recipe-details/:id', 
    loadComponent: () => import('../comps/recipe-details/recipe-details.component').then(m => m.RecipeDetailsComponent) 
  },

  // ==========================================
  // 2. דפים מוגנים (דורשים תפקיד מסוים)
  // ==========================================
  
  // הוספת מתכון - מנהלים ומעלי תוכן בלבד
  { 
    path: 'add-recipe', 
    loadComponent: () => import('../comps/add-recipe/add-recipe.component').then(m => m.AddRecipeComponent),
    canActivate: [roleGuard(['Admin', 'Uploader'])] 
  },

  // ניהול משתמשים - אדמין בלבד
  { 
    path: 'admin-management', 
    loadComponent: () => import('../comps/show-users/show-users.component').then(m => m.AdminManagementComponent),
    canActivate: [roleGuard(['Admin'])] 
  },

  // אזור אישי ופרופיל - כל משתמש רשום
  { 
    path: 'personal-details', 
    loadComponent: () => import('../comps/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [roleGuard(['Admin', 'Uploader', 'Reader'])] 
  },

  // המתכונים שלי
  { 
    path: 'my-recipes', 
    loadComponent: () => import('../comps/my-recipies/my-recipies.component').then(m => m.MyRecipesComponent),
    canActivate: [roleGuard(['Admin', 'Uploader', 'Reader'])]
  },

  // עריכת מתכון - מנהלים ומעלי תוכן
  { 
    path: 'edit-recipe/:id', 
    loadComponent: () => import('../comps/edit-recepi/edit-recepi.component').then(m => m.EditRecipeComponent),
    canActivate: [roleGuard(['Admin', 'Uploader'])] 
  },

  // ==========================================
  // 3. ניתובים אוטומטיים ושגיאות
  // ==========================================
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];