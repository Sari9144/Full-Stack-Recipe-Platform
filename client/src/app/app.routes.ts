// // import { Routes } from '@angular/router';
// // import { LoginComponent } from '../comps/login/login.component';
// // import { RegisterComponent } from '../comps/register/register.component';
// // import { HomeComponent } from '../comps/home/home.component';
// // import { RecipeListComponent } from '../comps/recipe-list/recipe-list.component';
// // import { AddRecipeComponent } from '../comps/add-recipe/add-recipe.component';
// // import { ProfileComponent } from '../comps/profile/profile.component';
// // import { AdminManagementComponent } from '../comps/show-users/show-users.component';
// // import { roleGuard } from '../auth.guard';
// // import { RecipeDetailsComponent } from '../comps/recipe-details/recipe-details.component';

// // export const routes: Routes = [
// //   // דף הבית והרשמה/התחברות
// //   { path: 'login', component: LoginComponent },
// //   { path: 'register', component: RegisterComponent },
// //   { path: 'home', component: HomeComponent },
// //   { path: 'recipes', component: RecipeListComponent },
// //   { path: 'recipe-details/:id', component: RecipeDetailsComponent },
// //   { path: 'personal-details', component: ProfileComponent },

// //   // נתיב המנהל - מוגן על ידי שומר הסף
// //   { 
// //     path: 'admin-management', 
// //     component: AdminManagementComponent, 
// //     canActivate: [roleGuard('Admin')] 
// //   },

// //   // נתיב הוספת מתכון - מוגן למעלי תוכן
// //   { 
// //     path: 'add-recipe', 
// //     component: AddRecipeComponent, 
// //     canActivate: [roleGuard('Uploader')] 
// //   },

// //   // ברירת מחדל - אם הנתיב ריק, נווט לבית
// //   { path: '', component: HomeComponent, pathMatch: 'full' },

// //   // הגנה מפני דפים לא קיימים - תמיד אחרון!
// //   { path: '**', redirectTo: 'home' }
// // ];

// import { Routes } from '@angular/router';
// import { inject } from '@angular/core';
// import { AuthService } from '../services/services/auth.service';
// import { Router } from '@angular/router';
// import { AddRecipeComponent } from '../comps/add-recipe/add-recipe.component';
// import { roleGuard } from '../auth.guard';
// import { AdminManagementComponent } from '../comps/show-users/show-users.component';
// import { RecipeDetailsComponent } from '../comps/recipe-details/recipe-details.component';
// // import { SmartSearchComponent } from '../comps/smart-sort/smart-sort.component';

// // פונקציית הגנה (Guard) פשוטה לבדיקת תפקיד
// const authGuard = (requiredRoles: string[]) => {
//   return () => {
//     const authService = inject(AuthService);
//     const router = inject(Router);
//     const user = authService.currentUserValue;

//     if (user && requiredRoles.includes(user.role)) {
//       return true;
//     }
    
//     // אם אין הרשאה, שלח לדף הבית או ללוגין
//     alert('אין לך הרשאה לגשת לדף זה');
//     return router.parseUrl('/login');
//   };
// };

// export const routes: Routes = [
//   { path: '', redirectTo: 'home', pathMatch: 'full' },
//   // { path: 'recipe-details/:id', component: RecipeDetailsComponent },
//   { path: 'recipe-details/:id', component: RecipeDetailsComponent },
//   { path: 'home', loadComponent: () => import('../comps/home/home.component').then(m => m.HomeComponent) },
//   { path: 'login', loadComponent: () => import('../comps/login/login.component').then(m => m.LoginComponent) },
//   { path: 'register', loadComponent: () => import('../comps/register/register.component').then(m => m.RegisterComponent) },
//   { path: 'recipes', loadComponent: () => import('../comps/recipe-list/recipe-list.component').then(m => m.RecipeListComponent) },
//   {path:'my-recipes', loadComponent:() => import('../comps/my-recipies/my-recipies.component').then(m => m.MyRecipesComponent)},
  
//   // דפים מוגנים
//   // { 
//   //   path: 'add-recipe', 
//   //   loadComponent: () => import('../comps/add-recipe/add-recipe.component').then(m => m.AddRecipeComponent),
//   //   canActivate: [authGuard(['Admin', 'Uploader'])] // רק מנהל או מעלה מתכונים
//   // },
//   // { 
//   //   path: 'admin-management', 
//   //   loadComponent: () => import('../comps/show-users/show-users.component').then(m => m.AdminManagementComponent),
//   //   canActivate: [authGuard(['Admin'])] // רק מנהל
//   // },
//   { 
//     path: 'add-recipe', 
//     component: AddRecipeComponent, 
//     canActivate: [roleGuard(['Uploader'])] // מנהל נכנס אוטומטית לפי הלוגיקה ב-Guard
//   },
//   { 
//     path: 'admin-management', 
//     component: AdminManagementComponent, 
//     canActivate: [roleGuard(['Admin'])] 
//   },
//   { 
//     path: 'personal-details', 
//     loadComponent: () => import('../comps/profile/profile.component').then(m => m.ProfileComponent),
//     canActivate: [authGuard(['Admin', 'Uploader', 'Reader'])] // כל משתמש מחובר
//   },
//   { 
//   path: 'edit-recipe/:id', 
//   loadComponent: () => import('../comps/edit-recepi/edit-recepi.component').then(m => m.EditRecipeComponent) 
// }
//   // { path: 'smart-search', component: SmartSearchComponent },
// ];
// import { Routes } from '@angular/router';
// import { inject } from '@angular/core';
// import { AuthService } from '../services/services/aunth.service';
// import { Router } from '@angular/router';

// // פונקציית Guard פשוטה ומאוחדת
// const roleGuard = (allowedRoles: string[]) => {
//   return () => {
//     const authService = inject(AuthService);
//     const router = inject(Router);
//     const user = authService.currentUserValue;

//     if (user && allowedRoles.includes(user.role)) {
//       return true;
//     }
    
//     console.error('Access Denied: User does not have the required role');
//     return router.parseUrl('/login');
//   };
// };

// export const routes: Routes = [
//   // דף בית - חשוב שיהיה ראשון וברור
//   { 
//     path: 'home', 
//     loadComponent: () => import('../comps/home/home.component').then(m => m.HomeComponent) 
//   },
  
//   // ניתוב אוטומטי מהדף הריק לבית
//   { path: '', redirectTo: 'home', pathMatch: 'full' },

//   { 
//     path: 'login', 
//     loadComponent: () => import('../comps/login/login.component').then(m => m.LoginComponent) 
//   },
//   { 
//     path: 'register', 
//     loadComponent: () => import('../comps/register/register.component').then(m => m.RegisterComponent) 
//   },
//   { 
//     path: 'recipes', 
//     loadComponent: () => import('../comps/recipe-list/recipe-list.component').then(m => m.RecipeListComponent) 
//   },
//   { 
//     path: 'recipe-details/:id', 
//     loadComponent: () => import('../comps/recipe-details/recipe-details.component').then(m => m.RecipeDetailsComponent) 
//   },

//   // דפים מוגנים - שימוש ב-roleGuard המאוחד
//   { 
//     path: 'add-recipe', 
//     loadComponent: () => import('../comps/add-recipe/add-recipe.component').then(m => m.AddRecipeComponent),
//     canActivate: [roleGuard(['Admin', 'Uploader'])]
//   },
//   { 
//     path: 'admin-management', 
//     loadComponent: () => import('../comps/show-users/show-users.component').then(m => m.AdminManagementComponent),
//     canActivate: [roleGuard(['Admin'])] 
//   },
//   { 
//     path: 'personal-details', 
//     loadComponent: () => import('../comps/profile/profile.component').then(m => m.ProfileComponent),
//     canActivate: [roleGuard(['Admin', 'Uploader', 'Reader'])] 
//   },
//   { 
//     path: 'my-recipes', 
//     loadComponent: () => import('../comps/my-recipies/my-recipies.component').then(m => m.MyRecipesComponent)
//   },
//   { 
//     path: 'edit-recipe/:id', 
//     loadComponent: () => import('../comps/edit-recepi/edit-recepi.component').then(m => m.EditRecipeComponent) 
//   },

//   // תפיסת נתיבים לא קיימים - תמיד בסוף!
//   { path: '**', redirectTo: 'home' }
// ];

// import { Routes } from '@angular/router';
// import { inject } from '@angular/core';
// import { AuthService } from '../services/services/aunth.service'; // ודאי שהשם auth.service מאוית נכון
// import { Router } from '@angular/router';

// // פונקציית Guard פשוטה ומאוחדת
// const roleGuard = (allowedRoles: string[]) => {
//   return () => {
//     const authService = inject(AuthService);
//     const router = inject(Router);
//     const user = authService.currentUserValue;

//     // התיקון: מוודאים ש-user קיים וגם ש-user.role קיים לפני הבדיקה
//     if (user && user.role && allowedRoles.includes(user.role)) {
//       return true;
//     }
    
//     console.error('Access Denied: User does not have the required role');
//     return router.parseUrl('/login');
//   };
// };

// export const routes: Routes = [
//   // דף בית
//   { 
//     path: 'home', 
//     loadComponent: () => import('../comps/home/home.component').then(m => m.HomeComponent) 
//   },
  
//   { path: '', redirectTo: 'home', pathMatch: 'full' },

//   { 
//     path: 'login', 
//     loadComponent: () => import('../comps/login/login.component').then(m => m.LoginComponent) 
//   },
//   { 
//     path: 'register', 
//     loadComponent: () => import('../comps/register/register.component').then(m => m.RegisterComponent) 
//   },
//   { 
//     path: 'recipes', 
//     loadComponent: () => import('../comps/recipe-list/recipe-list.component').then(m => m.RecipeListComponent) 
//   },
//   { 
//     path: 'recipe-details/:id', 
//     loadComponent: () => import('../comps/recipe-details/recipe-details.component').then(m => m.RecipeDetailsComponent) 
//   },

//   // דפים מוגנים
//   { 
//     path: 'add-recipe', 
//     loadComponent: () => import('../comps/add-recipe/add-recipe.component').then(m => m.AddRecipeComponent),
//     canActivate: [roleGuard(['Admin', 'Uploader'])]
//   },
//   { 
//     path: 'admin-management', 
//     loadComponent: () => import('../comps/show-users/show-users.component').then(m => m.AdminManagementComponent),
//     canActivate: [roleGuard(['Admin'])] 
//   },
//   { 
//     path: 'personal-details', 
//     loadComponent: () => import('../comps/profile/profile.component').then(m => m.ProfileComponent),
//     canActivate: [roleGuard(['Admin', 'Uploader', 'Reader'])] 
//   },
//   { 
//     path: 'my-recipes', 
//     loadComponent: () => import('../comps/my-recipies/my-recipies.component').then(m => m.MyRecipesComponent),
//     canActivate: [roleGuard(['Admin', 'Uploader', 'Reader'])]
//   },
//   { 
//     path: 'edit-recipe/:id', 
//     loadComponent: () => import('../comps/edit-recepi/edit-recepi.component').then(m => m.EditRecipeComponent),
//     canActivate: [roleGuard(['Admin', 'Uploader'])]
//   },

//   // תפיסת נתיבים לא קיימים
//   { path: '**', redirectTo: 'home' }
// ];

// import { Routes } from '@angular/router';
// import { inject } from '@angular/core';
// import { AuthService } from '../services/services/aunth.service'; 
// import { Router } from '@angular/router';

// // פונקציית Guard (Factory) שמחזירה פונקציית הגנה
// const roleGuard = (allowedRoles: string[]) => {
//   return () => {
//     const authService = inject(AuthService);
//     const router = inject(Router);
//     const user = authService.currentUserValue;

//     // בדיקה שהמשתמש קיים ושיש לו את התפקיד המתאים
//     if (user && user.role && allowedRoles.includes(user.role)) {
//       return true;
//     }
    
//     console.error('Access Denied: User does not have the required role');
//     // ניתוב מחדש לדף הלוגין במקרה שאין הרשאה
//     return router.parseUrl('/login');
//   };
// };

// export const routes: Routes = [
//   // דפים ציבוריים
//   { 
//     path: 'home', 
//     loadComponent: () => import('../comps/home/home.component').then(m => m.HomeComponent) 
//   },
//   { path: '', redirectTo: 'home', pathMatch: 'full' },
//   { 
//     path: 'login', 
//     loadComponent: () => import('../comps/login/login.component').then(m => m.LoginComponent) 
//   },
//   { 
//     path: 'register', 
//     loadComponent: () => import('../comps/register/register.component').then(m => m.RegisterComponent) 
//   },
//   { 
//     path: 'recipes', 
//     loadComponent: () => import('../comps/recipe-list/recipe-list.component').then(m => m.RecipeListComponent) 
//   },
//   { 
//     path: 'recipe-details/:id', 
//     loadComponent: () => import('../comps/recipe-details/recipe-details.component').then(m => m.RecipeDetailsComponent) 
//   },

//   // דפים מוגנים - שים לב לעטיפה בתוך פונקציית חץ () =>
//   { 
//     path: 'add-recipe', 
//     loadComponent: () => import('../comps/add-recipe/add-recipe.component').then(m => m.AddRecipeComponent),
//     canActivate: [() => roleGuard(['Admin', 'Uploader'])()]
//   },
//   { 
//     path: 'admin-management', 
//     loadComponent: () => import('../comps/show-users/show-users.component').then(m => m.AdminManagementComponent),
//     canActivate: [() => roleGuard(['Admin'])()] 
//   },
//   { 
//     path: 'personal-details', 
//     loadComponent: () => import('../comps/profile/profile.component').then(m => m.ProfileComponent),
//     canActivate: [() => roleGuard(['Admin', 'Uploader', 'Reader'])()] 
//   },
//   { 
//     path: 'my-recipes', 
//     loadComponent: () => import('../comps/my-recipies/my-recipies.component').then(m => m.MyRecipesComponent),
//     canActivate: [() => roleGuard(['Admin', 'Uploader', 'Reader'])()]
//   },
//   { 
//     path: 'edit-recipe/:id', 
//     loadComponent: () => import('../comps/edit-recepi/edit-recepi.component').then(m => m.EditRecipeComponent),
//     canActivate: [() => roleGuard(['Admin', 'Uploader'])()]
//   },

//   // תפיסת נתיבים לא קיימים
//   { path: '**', redirectTo: 'home' }
// ];

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