// // // // // // // // import { Component, OnInit } from '@angular/core';
// // // // // // // // import { CommonModule } from '@angular/common'; // חשוב עבור *ngIf ו-*ngFor
// // // // // // // // import { ActivatedRoute } from '@angular/router'; // בשביל לקרוא את ה-ID מהכתובת
// // // // // // // // import { RecipeService } from '../../services/recipe.service'; // ודאי שהנתיב ל-Service נכון

// // // // // // // // @Component({
// // // // // // // //   selector: 'app-recipe-details',
// // // // // // // //   standalone: true, // אם את משתמשת בגרסאות החדשות
// // // // // // // //   imports: [CommonModule], // מאפשר להשתמש ב-ngIf ו-ngFor ב-HTML
// // // // // // // //   templateUrl: './recipe-details.component.html',
// // // // // // // //   styleUrl: './recipe-details.component.css'
// // // // // // // // })
// // // // // // // // // export class RecipeDetailsComponent implements OnInit {
// // // // // // // // //   // הגדרת המשתנה שיחזיק את נתוני המתכון
// // // // // // // // //   recipe: any;
// // // // // // // // //   baseUrl = 'http://127.0.0.1:5000'; // כתובת השרת לתמונות

// // // // // // // // //   constructor(
// // // // // // // // //     private route: ActivatedRoute, 
// // // // // // // // //     private recipeService: RecipeService
// // // // // // // // //   ) {}

// // // // // // // // //   ngOnInit(): void {
// // // // // // // // //     // 1. שליפת ה-ID מה-URL (למשל מתוך recipes/5)
// // // // // // // // //     const id = this.route.snapshot.paramMap.get('id');
    
// // // // // // // // //     if (id) {
// // // // // // // // //       // 2. קריאה לשרת להבאת נתוני המתכון הספציפי
// // // // // // // // //       this.recipeService.getRecipeById(+id).subscribe({
// // // // // // // // //         next: (data) => {
// // // // // // // // //           this.recipe = data;
// // // // // // // // //           console.log('Recipe details loaded:', data);
// // // // // // // // //         },
// // // // // // // // //         error: (err) => {
// // // // // // // // //           console.error('Error fetching recipe details:', err);
// // // // // // // // //         }
// // // // // // // // //       });
// // // // // // // // //     }
// // // // // // // // //   }

// // // // // // // // //   // פונקציה לחזרה אחורה (אופציונלי)
// // // // // // // // //   goBack(): void {
// // // // // // // // //     window.history.back();
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // export class RecipeDetailsComponent implements OnInit {
// // // // // // // //   recipe: any;
// // // // // // // //   baseUrl = 'http://127.0.0.1:5000';
  
// // // // // // // //   // 1. הוסיפי את השורה הזו (הגדרת המשתנה)
// // // // // // // //   currentImage: string = ''; 

// // // // // // // //   constructor(
// // // // // // // //     private route: ActivatedRoute,
// // // // // // // //     private recipeService: RecipeService
// // // // // // // //   ) {}

// // // // // // // //   ngOnInit(): void {
// // // // // // // //     const id = this.route.snapshot.paramMap.get('id');
// // // // // // // //     if (id) {
// // // // // // // //       this.recipeService.getRecipeById(+id).subscribe({
// // // // // // // //         next: (data) => {
// // // // // // // //           this.recipe = data;
// // // // // // // //           // 2. אופציונלי: הגדרת התמונה המקורית כתמונה הראשונה שרואים
// // // // // // // //           this.currentImage = this.baseUrl + data.main_image;
// // // // // // // //         },
// // // // // // // //         error: (err) => console.error(err)
// // // // // // // //       });
// // // // // // // //     }
// // // // // // // //   }

// // // // // // // //   // 3. הוסיפי את הפונקציה הזו כדי שהלחיצה ב-HTML תעבוד
// // // // // // // //   setMainImage(url: string) {
// // // // // // // //     this.currentImage = url;
// // // // // // // //   }

// // // // // // // //   goBack() {
// // // // // // // //     window.history.back();
// // // // // // // //   }
// // // // // // // // }

// // // // // // // import { Component, OnInit, inject } from '@angular/core';
// // // // // // // import { CommonModule } from '@angular/common';
// // // // // // // import { ActivatedRoute, RouterLink } from '@angular/router';
// // // // // // // import { RecipeService } from '../../services/recipe.service';

// // // // // // // @Component({
// // // // // // //   selector: 'app-recipe-details',
// // // // // // //   standalone: true,
// // // // // // //   imports: [CommonModule, RouterLink],
// // // // // // //   templateUrl: './recipe-details.component.html',
// // // // // // //   styleUrl: './recipe-details.component.css'
// // // // // // // })
// // // // // // // export class RecipeDetailsComponent implements OnInit {
// // // // // // //   private route = inject(ActivatedRoute);
// // // // // // //   private recipeService = inject(RecipeService);

// // // // // // //   recipe: any;
// // // // // // //   relatedRecipes: any[] = []; // לרשימת "מתכונים דומים"
// // // // // // //   baseUrl = 'http://127.0.0.1:5000';
// // // // // // //   currentImage: string = '';

// // // // // // //   ngOnInit(): void {
// // // // // // //     // אנחנו משתמשים ב-params.subscribe כדי שהדף יתעדכן אם המשתמש לוחץ על מתכון דומה
// // // // // // //     this.route.params.subscribe(params => {
// // // // // // //       const id = +params['id'];
// // // // // // //       if (id) {
// // // // // // //         this.loadRecipeData(id);
// // // // // // //       }
// // // // // // //     });
// // // // // // //   }

// // // // // // //   loadRecipeData(id: number) {
// // // // // // //     // 1. טעינת המתכון הראשי
// // // // // // //     this.recipeService.getRecipeById(id).subscribe({
// // // // // // //       next: (data) => {
// // // // // // //         this.recipe = data;
// // // // // // //         this.currentImage = this.baseUrl + data.main_image;
        
// // // // // // //         // 2. אחרי שהמתכון נטען, נביא מתכונים דומים מאותה קטגוריה
// // // // // // //         this.loadRelated(id);
// // // // // // //       },
// // // // // // //       error: (err) => console.error(err)
// // // // // // //     });
// // // // // // //   }

// // // // // // //   loadRelated(id: number) {
// // // // // // //     this.recipeService.getRelatedRecipes(id).subscribe(res => {
// // // // // // //       this.relatedRecipes = res;
// // // // // // //     });
// // // // // // //   }

// // // // // // //   setMainImage(url: string) {
// // // // // // //     this.currentImage = url;
// // // // // // //   }

// // // // // // //   goBack() {
// // // // // // //     window.history.back();
// // // // // // //   }
// // // // // // // }

// // // // // // import { Component, OnInit, inject } from '@angular/core';
// // // // // // import { CommonModule } from '@angular/common';
// // // // // // import { ActivatedRoute, RouterLink } from '@angular/router';
// // // // // // import { RecipeService } from '../../services/recipe.service';
// // // // // // // import { SmartSearchComponent } from '../smart-sort/smart-sort.component';

// // // // // // @Component({
// // // // // //   selector: 'app-recipe-details',
// // // // // //   standalone: true,
// // // // // //   imports: [CommonModule, RouterLink,
// // // // // //     // SmartSearchComponent

// // // // // //   ],
// // // // // //   templateUrl: './recipe-details.component.html',
// // // // // //   styleUrl: './recipe-details.component.css'
// // // // // // })
// // // // // // export class RecipeDetailsComponent implements OnInit {
// // // // // //   private route = inject(ActivatedRoute);
// // // // // //   private recipeService = inject(RecipeService);

// // // // // //   recipe: any;
// // // // // //   relatedRecipes: any[] = []; // לרשימת "מתכונים דומים"
// // // // // //   baseUrl = 'http://127.0.0.1:5000';
// // // // // //   currentImage: string = '';

// // // // // //   ngOnInit(): void {
// // // // // //     // אנחנו משתמשים ב-params.subscribe כדי שהדף יתעדכן אם המשתמש לוחץ על מתכון דומה
// // // // // //     this.route.params.subscribe(params => {
// // // // // //       const id = +params['id'];
// // // // // //       if (id) {
// // // // // //         this.loadRecipeData(id);
// // // // // //       }
// // // // // //     });
// // // // // //   }

// // // // // //   loadRecipeData(id: number) {
// // // // // //     // 1. טעינת המתכון הראשי
// // // // // //     this.recipeService.getRecipeById(id).subscribe({
// // // // // //       next: (data) => {
// // // // // //         this.recipe = data;
// // // // // //         this.currentImage = this.baseUrl + data.main_image;
        
// // // // // //         // 2. אחרי שהמתכון נטען, נביא מתכונים דומים מאותה קטגוריה
// // // // // //         this.loadRelated(id);
// // // // // //       },
// // // // // //       error: (err) => console.error(err)
// // // // // //     });
// // // // // //   }

// // // // // //   loadRelated(id: number) {
// // // // // //     this.recipeService.getRelatedRecipes(id).subscribe(res => {
// // // // // //       this.relatedRecipes = res;
// // // // // //     });
// // // // // //   }

// // // // // //   setMainImage(url: string) {
// // // // // //     this.currentImage = url;
// // // // // //   }

// // // // // //   goBack() {
// // // // // //     window.history.back();
// // // // // //   }
// // // // // // }

// // // // // // import { Component, OnInit, inject } from '@angular/core';
// // // // // // import { CommonModule } from '@angular/common';
// // // // // // import { ActivatedRoute, RouterLink } from '@angular/router';
// // // // // // import { RecipeService } from '../../services/recipe.service';

// // // // // // @Component({
// // // // // //   selector: 'app-recipe-details',
// // // // // //   standalone: true,
// // // // // //   imports: [CommonModule, RouterLink],
// // // // // //   templateUrl: './recipe-details.component.html',
// // // // // //   styleUrl: './recipe-details.component.css'
// // // // // // })
// // // // // // export class RecipeDetailsComponent implements OnInit {
// // // // // //   private route = inject(ActivatedRoute);
// // // // // //   private recipeService = inject(RecipeService);

// // // // // //   recipe: any;
// // // // // //   relatedRecipes: any[] = [];
// // // // // //   baseUrl = 'http://127.0.0.1:5000';
// // // // // //   currentImage: string = '';

// // // // // //   ngOnInit(): void {
// // // // // //     this.route.params.subscribe(params => {
// // // // // //       const id = +params['id'];
// // // // // //       if (id) {
// // // // // //         this.loadRecipeData(id);
// // // // // //       }
// // // // // //     });
// // // // // //   }

// // // // // //   loadRecipeData(id: number) {
// // // // // //     this.recipeService.getRecipeById(id).subscribe({
// // // // // //       next: (data) => {
// // // // // //         this.recipe = data;
// // // // // //         this.currentImage = this.baseUrl + data.main_image;
// // // // // //         this.loadRelated(id);
// // // // // //       },
// // // // // //       error: (err) => console.error(err)
// // // // // //     });
// // // // // //   }

// // // // // //   loadRelated(id: number) {
// // // // // //     this.recipeService.getRelatedRecipes(id).subscribe(res => {
// // // // // //       this.relatedRecipes = res;
// // // // // //     });
// // // // // //   }

// // // // // //   setMainImage(url: string) {
// // // // // //     this.currentImage = url;
// // // // // //   }

// // // // // //   // פונקציה חדשה להדפסה
// // // // // //   printRecipe() {
// // // // // //     window.print();
// // // // // //   }

// // // // // //   goBack() {
// // // // // //     window.history.back();
// // // // // //   }
// // // // // // }
// // // // // import { Component, OnInit, inject } from '@angular/core';
// // // // // import { CommonModule } from '@angular/common';
// // // // // import { ActivatedRoute, RouterLink } from '@angular/router';
// // // // // import { RecipeService } from '../../services/recipe.service';
// // // // // import { FormsModule } from '@angular/forms'; // ייבוא FormsModule עבור ngModel

// // // // // @Component({
// // // // //   selector: 'app-recipe-details',
// // // // //   standalone: true,
// // // // //   imports: [CommonModule, RouterLink, FormsModule], // הוספנו FormsModule
// // // // //   templateUrl: './recipe-details.component.html',
// // // // //   styleUrl: './recipe-details.component.css'
// // // // // })
// // // // // export class RecipeDetailsComponent implements OnInit {
// // // // //   private route = inject(ActivatedRoute);
// // // // //   private recipeService = inject(RecipeService);

// // // // //   recipe: any;
// // // // //   relatedRecipes: any[] = [];
// // // // //   baseUrl = 'http://127.0.0.1:5000';
// // // // //   currentImage: string = '';
  
// // // // //   // משתנה חדש למספר מנות
// // // // //   servings: number = 1;

// // // // //   ngOnInit(): void {
// // // // //     this.route.params.subscribe(params => {
// // // // //       const id = +params['id'];
// // // // //       if (id) {
// // // // //         this.servings = 1; // איפוס המנות במעבר בין מתכונים
// // // // //         this.loadRecipeData(id);
// // // // //       }
// // // // //     });
// // // // //   }

// // // // //   loadRecipeData(id: number) {
// // // // //     this.recipeService.getRecipeById(id).subscribe({
// // // // //       next: (data) => {
// // // // //         this.recipe = data;
// // // // //         this.currentImage = this.baseUrl + data.main_image;
// // // // //         this.loadRelated(id);
// // // // //       },
// // // // //       error: (err) => console.error(err)
// // // // //     });
// // // // //   }

// // // // //   // פונקציה חדשה לעדכון כמויות מהשרת
// // // // //   onServingsChange() {
// // // // //     if (this.servings < 1) this.servings = 1;
    
// // // // //     this.recipeService.updateServings(this.recipe.id, this.servings).subscribe({
// // // // //       next: (updatedData) => {
// // // // //         // מעדכנים רק את הרכיבים כדי לשמור על שאר המידע
// // // // //         this.recipe.ingredients = updatedData.ingredients;
// // // // //       },
// // // // //       error: (err) => console.error('Error updating servings:', err)
// // // // //     });
// // // // //   }

// // // // //   loadRelated(id: number) {
// // // // //     this.recipeService.getRelatedRecipes(id).subscribe(res => {
// // // // //       this.relatedRecipes = res;
// // // // //     });
// // // // //   }

// // // // //   setMainImage(url: string) {
// // // // //     this.currentImage = url;
// // // // //   }

// // // // //   printRecipe() {
// // // // //     window.print();
// // // // //   }

// // // // //   goBack() {
// // // // //     window.history.back();
// // // // //   }
// // // // // }

// // // // import { Component, OnInit, inject } from '@angular/core';
// // // // import { CommonModule } from '@angular/common';
// // // // import { ActivatedRoute, RouterLink } from '@angular/router';
// // // // import { RecipeService } from '../../services/recipe.service';
// // // // import { FormsModule } from '@angular/forms';

// // // // @Component({
// // // //   selector: 'app-recipe-details',
// // // //   standalone: true,
// // // //   imports: [CommonModule, RouterLink, FormsModule],
// // // //   templateUrl: './recipe-details.component.html',
// // // //   styleUrl: './recipe-details.component.css'
// // // // })
// // // // export class RecipeDetailsComponent implements OnInit {
// // // //   private route = inject(ActivatedRoute);
// // // //   private recipeService = inject(RecipeService);

// // // //   recipe: any;
// // // //   relatedRecipes: any[] = [];
// // // //   baseUrl = 'http://127.0.0.1:5000';
// // // //   currentImage: string = '';
// // // //   servings: number = 1;

// // // //   // משתנים עבור עוזר הבישול הקולי
// // // //   ingredientGenerator: Generator<any, void, unknown> | null = null;
// // // //   currentReadingIng: any = null;

// // // //   ngOnInit(): void {
// // // //     this.route.params.subscribe(params => {
// // // //       const id = +params['id'];
// // // //       if (id) {
// // // //         this.servings = 1;
// // // //         this.resetAudioAssistant();
// // // //         this.loadRecipeData(id);
// // // //       }
// // // //     });
// // // //   }

// // // //   loadRecipeData(id: number) {
// // // //     this.recipeService.getRecipeById(id).subscribe({
// // // //       next: (data) => {
// // // //         this.recipe = data;
// // // //         this.currentImage = this.baseUrl + data.main_image;
// // // //         this.loadRelated(id);
// // // //       },
// // // //       error: (err) => console.error(err)
// // // //     });
// // // //   }

// // // //   onServingsChange() {
// // // //     if (this.servings < 1) this.servings = 1;
// // // //     this.resetAudioAssistant(); // איפוס הקריין אם הכמויות השתנו

// // // //     this.recipeService.updateServings(this.recipe.id, this.servings).subscribe({
// // // //       next: (updatedData) => {
// // // //         this.recipe.ingredients = updatedData.ingredients;
// // // //       },
// // // //       error: (err) => console.error('Error updating servings:', err)
// // // //     });
// // // //   }

// // // //   // --- לוגיקת עוזר בישול (Generator) ---

// // // //   *createIngredientGenerator() {
// // // //     for (let ing of this.recipe.ingredients) {
// // // //       yield ing;
// // // //     }
// // // //   }

// // // //   readNextIngredient() {
// // // //     if (!this.ingredientGenerator) {
// // // //       this.ingredientGenerator = this.createIngredientGenerator();
// // // //     }

// // // //     const result = this.ingredientGenerator.next();

// // // //     if (!result.done) {
// // // //       this.currentReadingIng = result.value;
// // // //       const textToRead = `${this.currentReadingIng.amount} ${this.currentReadingIng.unit} ${this.currentReadingIng.product}`;
// // // //       this.speak(textToRead);
// // // //     } else {
// // // //       this.speak("זהו, סיימנו את כל הרכיבים! בהצלחה בבישול.");
// // // //       this.resetAudioAssistant();
// // // //     }
// // // //   }

// // // //   resetAudioAssistant() {
// // // //     this.currentReadingIng = null;
// // // //     this.ingredientGenerator = null;
// // // //     window.speechSynthesis.cancel();
// // // //   }

// // // //   speak(text: string) {
// // // //     window.speechSynthesis.cancel();
// // // //     const utterance = new SpeechSynthesisUtterance(text);
// // // //     utterance.lang = 'he-IL';
// // // //     utterance.rate = 0.9;
// // // //     window.speechSynthesis.speak(utterance);
// // // //   }

// // // //   // --- שאר הפונקציות ---

// // // //   loadRelated(id: number) {
// // // //     this.recipeService.getRelatedRecipes(id).subscribe(res => {
// // // //       this.relatedRecipes = res;
// // // //     });
// // // //   }

// // // //   setMainImage(url: string) {
// // // //     this.currentImage = url;
// // // //   }

// // // //   printRecipe() { window.print(); }
// // // //   goBack() { window.history.back(); }
// // // // }

// // // // import { Component, OnInit, inject } from '@angular/core';
// // // // import { CommonModule } from '@angular/common';
// // // // import { ActivatedRoute, RouterLink } from '@angular/router';
// // // // import { RecipeService } from '../../services/recipe.service';
// // // // import { FormsModule } from '@angular/forms';
// // // // import { Recipe, Ingredient } from '../../recipe.model'; // ייבוא המודלים

// // // // @Component({
// // // //   selector: 'app-recipe-details',
// // // //   standalone: true,
// // // //   imports: [CommonModule, RouterLink, FormsModule],
// // // //   templateUrl: './recipe-details.component.html',
// // // //   styleUrl: './recipe-details.component.css'
// // // // })
// // // // export class RecipeDetailsComponent implements OnInit {
// // // //   private route = inject(ActivatedRoute);
// // // //   private recipeService = inject(RecipeService);

// // // //   // החלפת any בטיפוס Recipe
// // // //   recipe: Recipe | null = null;
// // // //   relatedRecipes: Recipe[] = []; 
  
// // // //   baseUrl = 'http://127.0.0.1:5000';
// // // //   currentImage: string = '';
// // // //   servings: number = 1;

// // // //   // שימוש בטיפוס Ingredient עבור עוזר הבישול
// // // //   ingredientGenerator: Generator<Ingredient, void, unknown> | null = null;
// // // //   currentReadingIng: Ingredient | null = null;

// // // //   ngOnInit(): void {
// // // //     this.route.params.subscribe(params => {
// // // //       const id = +params['id'];
// // // //       if (id) {
// // // //         this.servings = 1;
// // // //         this.resetAudioAssistant();
// // // //         this.loadRecipeData(id);
// // // //       }
// // // //     });
// // // //   }

// // // //   loadRecipeData(id: number) {
// // // //     this.recipeService.getRecipeById(id).subscribe({
// // // //       next: (data: Recipe) => {
// // // //         this.recipe = data;
// // // //         this.currentImage = this.baseUrl + data.main_image;
// // // //         this.loadRelated(id);
// // // //       },
// // // //       error: (err) => console.error(err)
// // // //     });
// // // //   }

// // // //   onServingsChange() {
// // // //     if (!this.recipe) return;
// // // //     if (this.servings < 1) this.servings = 1;
// // // //     this.resetAudioAssistant();

// // // //     this.recipeService.updateServings(this.recipe.id, this.servings).subscribe({
// // // //       next: (updatedData: Partial<Recipe>) => {
// // // //         if (this.recipe && updatedData.ingredients) {
// // // //           this.recipe.ingredients = updatedData.ingredients;
// // // //         }
// // // //       },
// // // //       error: (err) => console.error('Error updating servings:', err)
// // // //     });
// // // //   }

// // // //   *createIngredientGenerator() {
// // // //     if (!this.recipe) return;
// // // //     for (let ing of this.recipe.ingredients) {
// // // //       yield ing;
// // // //     }
// // // //   }

// // // //   readNextIngredient() {
// // // //     if (!this.ingredientGenerator) {
// // // //       this.ingredientGenerator = this.createIngredientGenerator();
// // // //     }

// // // //     if (!this.ingredientGenerator) return;
// // // //     const result = this.ingredientGenerator.next();

// // // //     if (!result.done) {
// // // //       this.currentReadingIng = result.value;
// // // //       const textToRead = `${this.currentReadingIng.amount} ${this.currentReadingIng.unit} ${this.currentReadingIng.product}`;
// // // //       this.speak(textToRead);
// // // //     } else {
// // // //       this.speak("זהו, סיימנו את כל הרכיבים! בהצלחה בבישול.");
// // // //       this.resetAudioAssistant();
// // // //     }
// // // //   }

// // // //   resetAudioAssistant() {
// // // //     this.currentReadingIng = null;
// // // //     this.ingredientGenerator = null;
// // // //     if ('speechSynthesis' in window) {
// // // //       window.speechSynthesis.cancel();
// // // //     }
// // // //   }

// // // //   speak(text: string) {
// // // //     if (!('speechSynthesis' in window)) return;
// // // //     window.speechSynthesis.cancel();
// // // //     const utterance = new SpeechSynthesisUtterance(text);
// // // //     utterance.lang = 'he-IL';
// // // //     utterance.rate = 0.9;
// // // //     window.speechSynthesis.speak(utterance);
// // // //   }

// // // //   loadRelated(id: number) {
// // // //     this.recipeService.getRelatedRecipes(id).subscribe((res: Recipe[]) => {
// // // //       this.relatedRecipes = res;
// // // //     });
// // // //   }

// // // //   setMainImage(url: string) { this.currentImage = url; }
// // // //   printRecipe() { window.print(); }
// // // //   goBack() { window.history.back(); }
// // // // }
// // // import { Component, OnInit, inject, HostListener } from '@angular/core';
// // // import { CommonModule } from '@angular/common';
// // // import { ActivatedRoute, RouterLink } from '@angular/router';
// // // import { RecipeService } from '../../services/recipe.service';
// // // import { FormsModule } from '@angular/forms';
// // // import { Recipe, Ingredient } from '../../recipe.model';

// // // @Component({
// // //   selector: 'app-recipe-details',
// // //   standalone: true,
// // //   imports: [CommonModule, RouterLink, FormsModule],
// // //   templateUrl: './recipe-details.component.html',
// // //   styleUrl: './recipe-details.component.css'
// // // })
// // // export class RecipeDetailsComponent implements OnInit {
// // //   private route = inject(ActivatedRoute);
// // //   private recipeService = inject(RecipeService);

// // //   // נתונים
// // //   recipe: Recipe | null = null;
// // //   relatedRecipes: Recipe[] = []; 
// // //   baseUrl = 'http://127.0.0.1:5000';
// // //   currentImage: string = '';
// // //   servings: number = 1;
// // //   isScrolled: boolean = false; // למעקב אחרי גלילה

// // //   // עוזר בישול קולי
// // //   ingredientGenerator: Generator<Ingredient, void, unknown> | null = null;
// // //   currentReadingIng: Ingredient | null = null;

// // //   // מאזין לגלילת הדף לצורך שינויי עיצוב בזמן אמת
// // //   @HostListener('window:scroll', [])
// // //   onWindowScroll() {
// // //     this.isScrolled = window.scrollY > 100;
// // //   }

// // //   ngOnInit(): void {
// // //     this.route.params.subscribe(params => {
// // //       const id = +params['id'];
// // //       if (id) {
// // //         this.resetComponentState();
// // //         this.loadRecipeData(id);
// // //       }
// // //     });
// // //   }

// // //   /**
// // //    * מאפס את המצב של הקומפוננטה במעבר בין מתכונים
// // //    */
// // //   private resetComponentState() {
// // //     this.servings = 1;
// // //     this.currentReadingIng = null;
// // //     this.ingredientGenerator = null;
// // //     this.resetAudioAssistant();
// // //     window.scrollTo({ top: 0, behavior: 'smooth' });
// // //   }

// // //   loadRecipeData(id: number) {
// // //     this.recipeService.getRecipeById(id).subscribe({
// // //       next: (data: Recipe) => {
// // //         this.recipe = data;
// // //         // הגדרת תמונה ראשית ראשונית
// // //         this.currentImage = data.main_image ? this.baseUrl + data.main_image : 'assets/images/placeholder.jpg';
// // //         this.loadRelated(id);
// // //       },
// // //       error: (err) => console.error('Error loading recipe:', err)
// // //     });
// // //   }

// // //   onServingsChange() {
// // //     if (!this.recipe || this.servings < 1) {
// // //       this.servings = 1;
// // //       return;
// // //     }
    
// // //     this.resetAudioAssistant();

// // //     // קריאה לשירות לעדכון כמויות (חישוב בשרת)
// // //     this.recipeService.updateServings(this.recipe.id, this.servings).subscribe({
// // //       next: (updatedData: Partial<Recipe>) => {
// // //         if (this.recipe && updatedData.ingredients) {
// // //           this.recipe.ingredients = updatedData.ingredients;
// // //         }
// // //       },
// // //       error: (err) => console.error('Error updating servings:', err)
// // //     });
// // //   }

// // //   // --- לוגיקת הקראה קולית (Pasha Assistant) ---

// // //   *createIngredientGenerator() {
// // //     if (!this.recipe) return;
// // //     for (let ing of this.recipe.ingredients) {
// // //       yield ing;
// // //     }
// // //   }

// // //   readNextIngredient() {
// // //     if (!this.ingredientGenerator) {
// // //       this.ingredientGenerator = this.createIngredientGenerator();
// // //     }

// // //     if (!this.ingredientGenerator) return;
// // //     const result = this.ingredientGenerator.next();

// // //     if (!result.done) {
// // //       this.currentReadingIng = result.value;
// // //       const textToRead = `${this.currentReadingIng.amount} ${this.currentReadingIng.unit} ${this.currentReadingIng.product}`;
// // //       this.speak(textToRead);
// // //     } else {
// // //       this.speak("זהו, סיימנו את כל הרכיבים! בהצלחה בבישול.");
// // //       this.resetAudioAssistant();
// // //     }
// // //   }

// // //   resetAudioAssistant() {
// // //     this.currentReadingIng = null;
// // //     this.ingredientGenerator = null;
// // //     if ('speechSynthesis' in window) {
// // //       window.speechSynthesis.cancel();
// // //     }
// // //   }

// // //   speak(text: string) {
// // //     if (!('speechSynthesis' in window)) return;
// // //     window.speechSynthesis.cancel();
// // //     const utterance = new SpeechSynthesisUtterance(text);
// // //     utterance.lang = 'he-IL';
// // //     utterance.rate = 0.9;
// // //     window.speechSynthesis.speak(utterance);
// // //   }

// // //   // --- ניווט וגלריה ---

// // //   loadRelated(id: number) {
// // //     this.recipeService.getRelatedRecipes(id).subscribe((res: Recipe[]) => {
// // //       this.relatedRecipes = res;
// // //     });
// // //   }

// // //   setMainImage(url: string) {
// // //     this.currentImage = url;
// // //   }

// // //   handleImageError(event: Event) {
// // //     const target = event.target as HTMLImageElement;
// // //     target.src = 'assets/images/placeholder-recipe.jpg';
// // //   }

// // //   printRecipe() {
// // //     window.print();
// // //   }

// // //   goBack() {
// // //     window.history.back();
// // //   }
// // // }

// // import { Component, OnInit, inject, HostListener } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { ActivatedRoute, RouterLink } from '@angular/router';
// // import { RecipeService } from '../../services/recipe.service';
// // import { FormsModule } from '@angular/forms';
// // import { Recipe, Ingredient } from '../../recipe.model';

// // @Component({
// //   selector: 'app-recipe-details',
// //   standalone: true,
// //   imports: [CommonModule, RouterLink, FormsModule],
// //   templateUrl: './recipe-details.component.html',
// //   styleUrl: './recipe-details.component.css'
// // })
// // export class RecipeDetailsComponent implements OnInit {
// //   private route = inject(ActivatedRoute);
// //   private recipeService = inject(RecipeService);

// //   recipe: any | null = null; // שינוי ל-any כדי לתמוך בשדות הדינמיים מהשרת
// //   relatedRecipes: Recipe[] = []; 
// //   baseUrl = 'http://127.0.0.1:5000';
// //   currentImage: string = '';
// //   servings: number = 1;
// //   isScrolled: boolean = false;

// //   ingredientGenerator: Generator<Ingredient, void, unknown> | null = null;
// //   currentReadingIng: Ingredient | null = null;

// //   @HostListener('window:scroll', [])
// //   onWindowScroll() {
// //     this.isScrolled = window.scrollY > 100;
// //   }

// //   ngOnInit(): void {
// //     this.route.params.subscribe(params => {
// //       const id = +params['id'];
// //       if (id) {
// //         this.resetComponentState();
// //         this.loadRecipeData(id);
// //       }
// //     });
// //   }

// //   private resetComponentState() {
// //     this.servings = 1;
// //     this.currentReadingIng = null;
// //     this.ingredientGenerator = null;
// //     this.resetAudioAssistant();
// //     window.scrollTo({ top: 0, behavior: 'smooth' });
// //   }

// //   // loadRecipeData(id: number) {
// //   //   this.recipeService.getRecipeById(id).subscribe({
// //   //     next: (data: any) => {
// //   //       this.recipe = data;
// //   //       // התיקון: שימוש ב-image_path ובנתיב הסטטי של השרת
// //   //       const mainImg = data.image_path;
// //   //       this.currentImage = mainImg ? `${this.baseUrl}/static/uploads/${mainImg}` : 'assets/images/placeholder.jpg';
// //   //       this.loadRelated(id);
// //   //     },
// //   //     error: (err) => console.error('Error loading recipe:', err)
// //   //   });
// //   // }
// //   loadRecipeData(id: number) {
// //   this.recipeService.getRecipeById(id).subscribe({
// //     next: (data: any) => {
// //       // וידוא שהוואריאציות הן מערך ולא טקסט
// //       if (data.variation_paths && typeof data.variation_paths === 'string') {
// //         try {
// //           data.variation_paths = JSON.parse(data.variation_paths);
// //         } catch (e) {
// //           console.error("Could not parse variation_paths", e);
// //           data.variation_paths = [];
// //         }
// //       }
      
// //       this.recipe = data;
      
// //       const mainImg = data.image_path;
// //       this.currentImage = mainImg ? `${this.baseUrl}/static/uploads/${mainImg}` : 'assets/images/placeholder.jpg';
// //       this.loadRelated(id);
// //     },
// //     error: (err) => console.error('Error loading recipe:', err)
// //   });
// // }

// //   onServingsChange() {
// //     if (!this.recipe || this.servings < 1) {
// //       this.servings = 1;
// //       return;
// //     }
// //     this.resetAudioAssistant();
// //     this.recipeService.updateServings(this.recipe.id, this.servings).subscribe({
// //       next: (updatedData: Partial<Recipe>) => {
// //         if (this.recipe && updatedData.ingredients) {
// //           this.recipe.ingredients = updatedData.ingredients;
// //         }
// //       },
// //       error: (err) => console.error('Error updating servings:', err)
// //     });
// //   }

// //   *createIngredientGenerator() {
// //     if (!this.recipe) return;
// //     for (let ing of this.recipe.ingredients) {
// //       yield ing;
// //     }
// //   }

// //   readNextIngredient() {
// //     if (!this.ingredientGenerator) {
// //       this.ingredientGenerator = this.createIngredientGenerator();
// //     }
// //     const result = this.ingredientGenerator?.next();
// //     if (result && !result.done) {
// //       this.currentReadingIng = result.value as Ingredient;
// //       const textToRead = `${this.currentReadingIng.amount} ${this.currentReadingIng.unit} ${this.currentReadingIng.product}`;
// //       this.speak(textToRead);
// //     } else {
// //       this.speak("זהו, סיימנו את כל הרכיבים! בהצלחה בבישול.");
// //       this.resetAudioAssistant();
// //     }
// //   }

// //   resetAudioAssistant() {
// //     this.currentReadingIng = null;
// //     this.ingredientGenerator = null;
// //     if ('speechSynthesis' in window) {
// //       window.speechSynthesis.cancel();
// //     }
// //   }

// //   speak(text: string) {
// //     if (!('speechSynthesis' in window)) return;
// //     window.speechSynthesis.cancel();
// //     const utterance = new SpeechSynthesisUtterance(text);
// //     utterance.lang = 'he-IL';
// //     utterance.rate = 0.9;
// //     window.speechSynthesis.speak(utterance);
// //   }

// //   loadRelated(id: number) {
// //     this.recipeService.getRelatedRecipes(id).subscribe((res: Recipe[]) => {
// //       this.relatedRecipes = res;
// //     });
// //   }

// //   setMainImage(url: string) {
// //     this.currentImage = url;
// //   }

// //   handleImageError(event: Event) {
// //     const target = event.target as HTMLImageElement;
// //     target.src = 'assets/images/placeholder-recipe.jpg';
// //   }

// //   printRecipe() { window.print(); }
// //   goBack() { window.history.back(); }
// // }
// import { Component, OnInit, inject, HostListener } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute, RouterLink } from '@angular/router';
// import { RecipeService } from '../../services/recipe.service';
// import { FormsModule } from '@angular/forms';
// import { Recipe, Ingredient } from '../../recipe.model';

// @Component({
//   selector: 'app-recipe-details',
//   standalone: true,
//   imports: [CommonModule, RouterLink, FormsModule],
//   templateUrl: './recipe-details.component.html',
//   styleUrl: './recipe-details.component.css'
// })
// export class RecipeDetailsComponent implements OnInit {
//   private route = inject(ActivatedRoute);
//   private recipeService = inject(RecipeService);

//   recipe: any | null = null; 
//   relatedRecipes: Recipe[] = []; 
//   baseUrl = 'http://127.0.0.1:5000';
//   currentImage: string = '';
//   servings: number = 1;
//   isScrolled: boolean = false;

//   ingredientGenerator: Generator<Ingredient, void, unknown> | null = null;
//   currentReadingIng: Ingredient | null = null;

//   @HostListener('window:scroll', [])
//   onWindowScroll() {
//     this.isScrolled = window.scrollY > 100;
//   }

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       const id = +params['id'];
//       if (id) {
//         this.resetComponentState();
//         this.loadRecipeData(id);
//       }
//     });
//   }

//   private resetComponentState() {
//     this.servings = 1;
//     this.currentReadingIng = null;
//     this.ingredientGenerator = null;
//     this.resetAudioAssistant();
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }

//   // loadRecipeData(id: number) {
//   //   this.recipeService.getRecipeById(id).subscribe({
//   //     next: (data: any) => {
//   //       // המרה בטוחה של מערך התמונות מהשרת
//   //       if (data.variation_paths && typeof data.variation_paths === 'string') {
//   //         try {
//   //           data.variation_paths = JSON.parse(data.variation_paths);
//   //         } catch (e) {
//   //           console.error("Could not parse variation_paths", e);
//   //           data.variation_paths = [];
//   //         }
//   //       }
        
//   //       this.recipe = data;
        
//   //       // הגדרת תמונה ראשית
//   //       const mainImg = data.image_path;
//   //       this.currentImage = mainImg ? `${this.baseUrl}/static/uploads/${mainImg}` : 'assets/images/placeholder.jpg';
//   //       this.loadRelated(id);
//   //     },
//   //     error: (err) => console.error('Error loading recipe:', err)
//   //   });
//   // }
// loadRecipeData(id: number) {
//   this.recipeService.getRecipeById(id).subscribe({
//     next: (data: any) => {
//       this.recipe = data;
      
//       // התיקון: Flask כבר שולח נתיב מלא שמתחיל ב-/static
//       // אנחנו רק צריכים להוסיף את הכתובת של השרת לפניו
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
//   onServingsChange() {
//     if (!this.recipe || this.servings < 1) {
//       this.servings = 1;
//       return;
//     }
//     this.resetAudioAssistant();
//     this.recipeService.updateServings(this.recipe.id, this.servings).subscribe({
//       next: (updatedData: Partial<Recipe>) => {
//         if (this.recipe && updatedData.ingredients) {
//           this.recipe.ingredients = updatedData.ingredients;
//         }
//       },
//       error: (err) => console.error('Error updating servings:', err)
//     });
//   }

//   *createIngredientGenerator() {
//     if (!this.recipe) return;
//     for (let ing of this.recipe.ingredients) {
//       yield ing;
//     }
//   }

//   readNextIngredient() {
//     if (!this.ingredientGenerator) {
//       this.ingredientGenerator = this.createIngredientGenerator();
//     }
//     const result = this.ingredientGenerator?.next();
//     if (result && !result.done) {
//       this.currentReadingIng = result.value as Ingredient;
//       const textToRead = `${this.currentReadingIng.amount} ${this.currentReadingIng.unit} ${this.currentReadingIng.product}`;
//       this.speak(textToRead);
//     } else {
//       this.speak("זהו, סיימנו את כל הרכיבים! בהצלחה בבישול.");
//       this.resetAudioAssistant();
//     }
//   }

//   resetAudioAssistant() {
//     this.currentReadingIng = null;
//     this.ingredientGenerator = null;
//     if ('speechSynthesis' in window) {
//       window.speechSynthesis.cancel();
//     }
//   }

//   speak(text: string) {
//     if (!('speechSynthesis' in window)) return;
//     window.speechSynthesis.cancel();
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = 'he-IL';
//     utterance.rate = 0.9;
//     window.speechSynthesis.speak(utterance);
//   }

//   loadRelated(id: number) {
//     this.recipeService.getRelatedRecipes(id).subscribe((res: Recipe[]) => {
//       this.relatedRecipes = res;
//     });
//   }

//   setMainImage(url: string) {
//     this.currentImage = url;
//   }

//   handleImageError(event: Event) {
//     const target = event.target as HTMLImageElement;
//     target.src = 'assets/images/placeholder-recipe.jpg';
//   }

//   printRecipe() { window.print(); }
//   goBack() { window.history.back(); }
// }

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