// // // // // // import { Component } from '@angular/core';
// // // // // // import { RecipeService } from '../../services/recipe.service';
// // // // // // import { FormsModule } from '@angular/forms';

// // // // // // // @Component({
// // // // // // //   selector: 'app-add-recipe',
// // // // // // //   templateUrl: './add-recipe.component.ts', // תכף ניצור את ה-HTML
// // // // // // // })
// // // // // // // @Component({
// // // // // // //   selector: 'app-add-recipe',
// // // // // // //   imports: [FormsModule],
// // // // // // //   templateUrl: './add-recipe.component.html', // <--- האם בטעות כתבת כאן .ts במקום .html?
// // // // // // //   styleUrls: ['./add-recipe.component.css']
// // // // // // // })

// // // // // // import { CommonModule } from '@angular/common'; // הוסיפי ייבוא

// // // // // // @Component({
// // // // // //   selector: 'app-add-recipe',
// // // // // //   standalone: true, // אם כתוב כאן true
// // // // // //   imports: [CommonModule, FormsModule], // הוסיפי כאן את CommonModule
// // // // // //   templateUrl: './add-recipe.component.html',
// // // // // //   styleUrls: ['./add-recipe.component.css']
// // // // // // })
// // // // // // export class AddRecipeComponent {
// // // // // //   recipe = { title: '', type: 'Parve' };
// // // // // //   ingredients: any[] = [{ product: '', amount: 0, unit: '' }];
// // // // // //   selectedFile: File | null = null;

// // // // // //   constructor(private recipeService: RecipeService) {}

// // // // // //   // הוספת שורה לרשימת הרכיבים בטופס
// // // // // //   addIngredientRow() {
// // // // // //     this.ingredients.push({ product: '', amount: 0, unit: '' });
// // // // // //   }

// // // // // //   // שמירת הקובץ שנבחר מהמחשב
// // // // // //   onFileSelected(event: any) {
// // // // // //     this.selectedFile = event.target.files[0];
// // // // // //   }

// // // // // //   submitRecipe() {
// // // // // //     if (!this.selectedFile) {
// // // // // //       alert("חובה לבחור תמונה!");
// // // // // //       return;
// // // // // //     }

// // // // // //     // יצירת אובייקט FormData (חובה בשביל קבצים)
// // // // // //     const formData = new FormData();
// // // // // //     formData.append('title', this.recipe.title);
// // // // // //     formData.append('type', this.recipe.type);
// // // // // //     formData.append('image', this.selectedFile);
    
// // // // // //     // את הרכיבים (המערך) אנחנו שולחים כמחרוזת JSON
// // // // // //     formData.append('ingredients', JSON.stringify(this.ingredients));

// // // // // //     this.recipeService.addRecipe(formData).subscribe({
// // // // // //       next: (res) => alert("המתכון עלה בהצלחה!"),
// // // // // //       error: (err) => console.error("שגיאה בהעלאה", err)
// // // // // //     });
// // // // // //   }

// // // // // //   removeIngredient(index: number) {
// // // // // //   this.ingredients.splice(index, 1);
// // // // // // }
// // // // // // }

// // // // // import { Component, inject } from '@angular/core';
// // // // // import { RecipeService } from '../../services/recipe.service';
// // // // // import { FormsModule } from '@angular/forms';
// // // // // import { CommonModule } from '@angular/common';

// // // // // @Component({
// // // // //   selector: 'app-add-recipe',
// // // // //   standalone: true,
// // // // //   imports: [CommonModule, FormsModule],
// // // // //   templateUrl: './add-recipe.component.html',
// // // // //   styleUrls: ['./add-recipe.component.css']
// // // // // })
// // // // // export class AddRecipeComponent {
// // // // //   private recipeService = inject(RecipeService);

// // // // //   // הוספת השדות החדשים לאובייקט
// // // // //   recipe = { 
// // // // //     title: '', 
// // // // //     type: 'Parve', 
// // // // //     instructions: '', 
// // // // //     prep_time: 0, 
// // // // //     category: '', 
// // // // //     created_by_name: '' 
// // // // //   };
  
// // // // //   ingredients: any[] = [{ product: '', amount: 0, unit: '' }];
// // // // //   selectedFile: File | null = null;

// // // // //   addIngredientRow() {
// // // // //     this.ingredients.push({ product: '', amount: 0, unit: '' });
// // // // //   }

// // // // //   onFileSelected(event: any) {
// // // // //     this.selectedFile = event.target.files[0];
// // // // //   }

// // // // //   submitRecipe() {
// // // // //     if (!this.selectedFile) {
// // // // //       alert("חובה לבחור תמונה!");
// // // // //       return;
// // // // //     }

// // // // //     const formData = new FormData();
// // // // //     formData.append('title', this.recipe.title);
// // // // //     formData.append('type', this.recipe.type);
// // // // //     formData.append('image', this.selectedFile);
    
// // // // //     // הוספת השדות החדשים ל-FormData
// // // // //     formData.append('instructions', this.recipe.instructions);
// // // // //     formData.append('prep_time', this.recipe.prep_time.toString());
// // // // //     formData.append('category', this.recipe.category);
// // // // //     formData.append('created_by_name', this.recipe.created_by_name);

// // // // //     formData.append('ingredients', JSON.stringify(this.ingredients));

// // // // //     this.recipeService.addRecipe(formData).subscribe({
// // // // //       next: (res) => alert("המתכון עלה בהצלחה!"),
// // // // //       error: (err) => console.error("שגיאה בהעלאה", err)
// // // // //     });
// // // // //   }

// // // // //   removeIngredient(index: number) {
// // // // //     this.ingredients.splice(index, 1);
// // // // //   }
// // // // // }

// // // // import { Component, inject, OnInit } from '@angular/core';
// // // // import { RecipeService } from '../../services/recipe.service';
// // // // import { AuthService } from '../../services/services/auth.service'; // וודאי שהנתיב נכון
// // // // import { FormsModule } from '@angular/forms';
// // // // import { CommonModule } from '@angular/common';

// // // // @Component({
// // // //   selector: 'app-add-recipe',
// // // //   standalone: true,
// // // //   imports: [CommonModule, FormsModule],
// // // //   templateUrl: './add-recipe.component.html',
// // // //   styleUrls: ['./add-recipe.component.css']
// // // // })
// // // // export class AddRecipeComponent implements OnInit {
// // // //   private recipeService = inject(RecipeService);
// // // //   private authService = inject(AuthService);

// // // //   // אובייקט המתכון עם השדות החדשים
// // // //   recipe = { 
// // // //     title: '', 
// // // //     type: 'Parve', 
// // // //     prep_time: 0, 
// // // //     category: '', 
// // // //     created_by_name: '' 
// // // //   };
  
// // // //   // שלבי הכנה כמערך עבור ngFor
// // // //   instructions: { step: string }[] = [{ step: '' }];
  
// // // //   // רכיבים
// // // //   ingredients: any[] = [{ product: '', amount: 0, unit: '' }];
  
// // // //   selectedFile: File | null = null;

// // // //   ngOnInit() {
// // // //     // משיכת המשתמש הנוכחי מה-BehaviorSubject (שמושך מהעוגיה)
// // // //     const user = this.authService.currentUserValue;
// // // //     if (user) {
// // // //       this.recipe.created_by_name = user.username;
// // // //     }
// // // //   }

// // // //   // ניהול רכיבים
// // // //   addIngredientRow() {
// // // //     this.ingredients.push({ product: '', amount: 0, unit: '' });
// // // //   }

// // // //   removeIngredient(index: number) {
// // // //     this.ingredients.splice(index, 1);
// // // //   }

// // // //   // ניהול שלבי הכנה (ngFor)
// // // //   addStep() {
// // // //     this.instructions.push({ step: '' });
// // // //   }

// // // //   removeStep(index: number) {
// // // //     this.instructions.splice(index, 1);
// // // //   }

// // // //   onFileSelected(event: any) {
// // // //     this.selectedFile = event.target.files[0];
// // // //   }

// // // //   submitRecipe() {
// // // //     if (!this.selectedFile) {
// // // //       alert("חובה לבחור תמונה!");
// // // //       return;
// // // //     }

// // // //     const formData = new FormData();
// // // //     formData.append('title', this.recipe.title);
// // // //     formData.append('type', this.recipe.type);
// // // //     formData.append('image', this.selectedFile);
// // // //     formData.append('prep_time', this.recipe.prep_time.toString());
// // // //     formData.append('category', this.recipe.category);
// // // //     formData.append('created_by_name', this.recipe.created_by_name);

// // // //     // הופכים את מערך השלבים למחרוזת טקסט אחת עם ירידות שורה עבור השרת
// // // //     const instructionsText = this.instructions
// // // //       .map(s => s.step)
// // // //       .filter(s => s.trim() !== '')
// // // //       .join('\n');
// // // //     formData.append('instructions', instructionsText);

// // // //     // שליחת הרכיבים כ-JSON
// // // //     formData.append('ingredients', JSON.stringify(this.ingredients));

// // // //     this.recipeService.addRecipe(formData).subscribe({
// // // //       next: (res) => {
// // // //         alert("המתכון עלה בהצלחה!");
// // // //         // אופציונלי: ניקוי הטופס או ניווט לדף אחר
// // // //       },
// // // //       error: (err) => console.error("שגיאה בהעלאה", err)
// // // //     });
// // // //   }
// // // // }

// // // import { Component, inject, OnInit } from '@angular/core';
// // // import { RecipeService } from '../../services/recipe.service';
// // // import { AuthService } from '../../services/services/auth.service'; // וודאי שהנתיב נכון
// // // import { FormsModule } from '@angular/forms';
// // // import { CommonModule } from '@angular/common';

// // // @Component({
// // //   selector: 'app-add-recipe',
// // //   standalone: true,
// // //   imports: [CommonModule, FormsModule],
// // //   templateUrl: './add-recipe.component.html',
// // //   styleUrls: ['./add-recipe.component.css']
// // // })
// // // export class AddRecipeComponent implements OnInit {
// // //   private recipeService = inject(RecipeService);
// // //   private authService = inject(AuthService);

// // //   // אובייקט המתכון
// // //   recipe = { 
// // //     title: '', 
// // //     type: 'Parve', 
// // //     prep_time: 0, 
// // //     category: '', 
// // //     created_by_name: '' 
// // //   };
  
// // //   // שלבי הכנה כמערך (בשביל ה-UI של ngFor)
// // //   instructions: { step: string }[] = [{ step: '' }];
  
// // //   // רכיבים
// // //   ingredients: any[] = [{ product: '', amount: 1, unit: 'גרם' }];
  
// // //   selectedFile: File | null = null;

// // //   ngOnInit() {
// // //     // שליפת שם המשתמש בצורה בטוחה מהשירות
// // //     // אנחנו משתמשים בפונקציה getUserName() שיצרנו ב-AuthService
// // //     this.recipe.created_by_name = this.authService.getUserName();
    
// // //     // במידה והשם עדיין "אורח", ננסה להאזין לשינויים (למקרה שהטעינה איטית)
// // //     this.authService.currentUser$.subscribe(() => {
// // //       this.recipe.created_by_name = this.authService.getUserName();
// // //     });
// // //   }

// // //   // --- ניהול רכיבים ---
// // //   addIngredientRow() {
// // //     this.ingredients.push({ product: '', amount: 1, unit: '' });
// // //   }

// // //   removeIngredient(index: number) {
// // //     if (this.ingredients.length > 1) {
// // //       this.ingredients.splice(index, 1);
// // //     }
// // //   }

// // //   // --- ניהול שלבי הכנה ---
// // //   addStep() {
// // //     this.instructions.push({ step: '' });
// // //   }

// // //   removeStep(index: number) {
// // //     if (this.instructions.length > 1) {
// // //       this.instructions.splice(index, 1);
// // //     }
// // //   }

// // //   onFileSelected(event: any) {
// // //     const file = event.target.files[0];
// // //     if (file) {
// // //       this.selectedFile = file;
// // //     }
// // //   }

// // //   submitRecipe() {
// // //     if (!this.selectedFile) {
// // //       alert("חובה לבחור תמונה למתכון!");
// // //       return;
// // //     }

// // //     if (!this.recipe.title.trim()) {
// // //       alert("חובה להזין כותרת למתכון!");
// // //       return;
// // //     }

// // //     const formData = new FormData();
// // //     formData.append('title', this.recipe.title);
// // //     formData.append('type', this.recipe.type);
// // //     formData.append('image', this.selectedFile);
// // //     formData.append('prep_time', this.recipe.prep_time.toString());
// // //     formData.append('category', this.recipe.category);
    
// // //     // וידוא אחרון של שם המשתמש לפני השליחה
// // //     const finalName = this.authService.getUserName();
// // //     formData.append('created_by_name', finalName);

// // //     // הופכים את מערך השלבים לטקסט ארוך עם ירידות שורה
// // //     const instructionsText = this.instructions
// // //       .map((s, index) => `${index + 1}. ${s.step}`) // מוסיף מספור אוטומטי
// // //       .filter(s => s.trim() !== '')
// // //       .join('\n');
// // //     formData.append('instructions', instructionsText);

// // //     // שליחת הרכיבים כ-JSON
// // //     formData.append('ingredients', JSON.stringify(this.ingredients));

// // //     this.recipeService.addRecipe(formData).subscribe({
// // //       next: (res) => {
// // //         alert("המתכון עלה בהצלחה!");
// // //         this.resetForm();
// // //       },
// // //       error: (err) => {
// // //         console.error("שגיאה בהעלאה:", err);
// // //         alert("חלה שגיאה בהעלאת המתכון. בדקי את ה-Console.");
// // //       }
// // //     });
// // //   }

// // //   resetForm() {
// // //     this.recipe = { title: '', type: 'Parve', prep_time: 0, category: '', created_by_name: this.authService.getUserName() };
// // //     this.ingredients = [{ product: '', amount: 1, unit: '' }];
// // //     this.instructions = [{ step: '' }];
// // //     this.selectedFile = null;
// // //   }
// // // }

// // import { Component, inject, OnInit } from '@angular/core';
// // import { RecipeService } from '../../services/recipe.service'; // ודאי שהנתיב מוביל לקובץ שיצרנו למעלה
// // import { AuthService } from '../../services/services/auth.service'; 
// // import { FormsModule } from '@angular/forms';
// // import { CommonModule } from '@angular/common';

// // @Component({
// //   selector: 'app-add-recipe',
// //   standalone: true,
// //   imports: [CommonModule, FormsModule],
// //   templateUrl: './add-recipe.component.html',
// //   styleUrls: ['./add-recipe.component.css']
// // })
// // export class AddRecipeComponent implements OnInit {
// //   private recipeService = inject(RecipeService);
// //   private authService = inject(AuthService);

// //   recipe = { 
// //     title: '', 
// //     type: 'Parve', 
// //     prep_time: 0, 
// //     category: '', 
// //     created_by_name: '' 
// //   };
  
// //   instructions: { step: string }[] = [{ step: '' }];
// //   ingredients: any[] = [{ product: '', amount: 1, unit: 'גרם' }];
// //   selectedFile: File | null = null;

// //   ngOnInit() {
// //     // אתחול שם המשתמש מהעוגיה/סשן
// //     this.updateUserName();
    
// //     // האזנה לשינויים במידה והמשתמש מתחבר/מתנתק בזמן שהדף פתוח
// //     this.authService.currentUser$.subscribe(() => {
// //       this.updateUserName();
// //     });
// //   }

// //   updateUserName() {
// //     this.recipe.created_by_name = this.authService.getUserName();
// //   }

// //   addIngredientRow() {
// //     this.ingredients.push({ product: '', amount: 1, unit: '' });
// //   }

// //   removeIngredient(index: number) {
// //     if (this.ingredients.length > 1) this.ingredients.splice(index, 1);
// //   }

// //   addStep() {
// //     this.instructions.push({ step: '' });
// //   }

// //   removeStep(index: number) {
// //     if (this.instructions.length > 1) this.instructions.splice(index, 1);
// //   }

// //   onFileSelected(event: any) {
// //     this.selectedFile = event.target.files[0];
// //   }

// //   submitRecipe() {
// //     if (!this.selectedFile) {
// //       alert("חובה לבחור תמונה!");
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append('title', this.recipe.title);
// //     formData.append('type', this.recipe.type);
// //     formData.append('image', this.selectedFile);
// //     formData.append('prep_time', this.recipe.prep_time.toString());
// //     formData.append('category', this.recipe.category);
    
// //     // שליחת השם המעודכן ביותר
// //     formData.append('created_by_name', this.authService.getUserName());

// //     const instructionsText = this.instructions
// //       .map((s, i) => `${i + 1}. ${s.step}`)
// //       .filter(s => s.trim() !== '')
// //       .join('\n');
// //     formData.append('instructions', instructionsText);
// //     formData.append('ingredients', JSON.stringify(this.ingredients));

// //     this.recipeService.addRecipe(formData).subscribe({
// //       next: (res) => {
// //         alert("המתכון עלה בהצלחה!");
// //         this.resetForm();
// //       },
// //       error: (err) => console.error("שגיאה:", err)
// //     });
// //   }

// //   resetForm() {
// //     this.recipe = { title: '', type: 'Parve', prep_time: 0, category: '', created_by_name: this.authService.getUserName() };
// //     this.ingredients = [{ product: '', amount: 1, unit: '' }];
// //     this.instructions = [{ step: '' }];
// //     this.selectedFile = null;
// //   }
// // }

// // import { Component, inject, OnInit } from '@angular/core';
// // import { RecipeService } from '../../services/recipe.service';
// // import { AuthService } from '../../services/services/auth.service';
// // import { FormsModule } from '@angular/forms';
// // import { CommonModule } from '@angular/common';
// // import { Recipe, Ingredient, Instruction } from '../../recipe.model';

// // @Component({
// //   selector: 'app-add-recipe',
// //   standalone: true,
// //   imports: [CommonModule, FormsModule],
// //   templateUrl: './add-recipe.component.html',
// //   styleUrls: ['./add-recipe.component.css']
// // })
// // export class AddRecipeComponent implements OnInit {
// //   private readonly recipeService = inject(RecipeService);
// //   private readonly authService = inject(AuthService);

// //   recipe: Recipe = { title: '', type: 'Parve', prep_time: 0, category: '', created_by_name: '' };
// //   instructions: Instruction[] = [{ step: '' }];
// //   ingredients: Ingredient[] = [{ product: '', amount: 1, unit: 'גרם' }];
// //   selectedFile: File | null = null;

// //   ngOnInit(): void {
// //     this.recipe.created_by_name = this.authService.getUserName();
// //     this.authService.currentUser$.subscribe(() => {
// //       this.recipe.created_by_name = this.authService.getUserName();
// //     });
// //   }

// //   addIngredientRow(): void {
// //     this.ingredients.push({ product: '', amount: 1, unit: '' });
// //   }

// //   removeIngredient(index: number): void {
// //     if (this.ingredients.length > 1) this.ingredients.splice(index, 1);
// //   }

// //   addStep(): void {
// //     this.instructions.push({ step: '' });
// //   }

// //   removeStep(index: number): void {
// //     if (this.instructions.length > 1) this.instructions.splice(index, 1);
// //   }

// //   onFileSelected(event: Event): void {
// //     const input = event.target as HTMLInputElement;
// //     if (input.files && input.files.length > 0) this.selectedFile = input.files[0];
// //   }

// //   submitRecipe(): void {
// //     if (!this.selectedFile) {
// //       alert("חובה לבחור תמונה!");
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append('title', this.recipe.title);
// //     formData.append('type', this.recipe.type);
// //     formData.append('image', this.selectedFile);
// //     formData.append('prep_time', this.recipe.prep_time.toString());
// //     formData.append('category', this.recipe.category);
// //     formData.append('created_by_name', this.authService.getUserName());

// //     const instructionsText = this.instructions
// //       .map((s, i) => `${i + 1}. ${s.step}`)
// //       .filter(s => s.trim() !== '')
// //       .join('\n');

// //     formData.append('instructions', instructionsText);
// //     formData.append('ingredients', JSON.stringify(this.ingredients));

// //     this.recipeService.addRecipe(formData).subscribe({
// //       next: () => alert("המתכון עלה בהצלחה!"),
// //       error: (err) => console.error("שגיאה:", err)
// //     });
// //   }
// // }
// // import { Component, inject, OnInit } from '@angular/core';
// import { RecipeService } from '../../services/recipe.service';
// import { AuthService } from '../../services/services/aunth.service';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { Recipe, Ingredient, Instruction } from '../../recipe.model'; // נתיב מעודכן
// import { Component, inject, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-add-recipe',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './add-recipe.component.html',
//   styleUrls: ['./add-recipe.component.css']
// })
// export class AddRecipeComponent implements OnInit {
//   private readonly recipeService = inject(RecipeService);
//   private readonly authService = inject(AuthService);

//   // עדכון אובייקט המתכון לפי ה-Interface החדש
//   recipe: Recipe = { 
//     id: 0, 
//     title: '', 
//     type: 'Parve', 
//     prep_time: 0, 
//     category: '', 
//     created_by: '', // שינוי מ-created_by_name ל-created_by בהתאם למודל
//     instructions: '', 
//     main_image: '',
//     ingredients: [] 
//   };

//   instructions: Instruction[] = [{ step: '' }];
//   ingredients: Ingredient[] = [{ product: '', amount: 1, unit: 'גרם' }];
  
//   selectedFile: File | null = null;
//   imagePreview: string | ArrayBuffer | null = null; 

//   ngOnInit(): void {
//     this.recipe.created_by = this.authService.getUserName();
//     this.authService.currentUser$.subscribe(() => {
//       this.recipe.created_by = this.authService.getUserName();
//     });
//   }

//   addIngredientRow(): void {
//     this.ingredients.push({ product: '', amount: 1, unit: '' });
//   }

//   removeIngredient(index: number): void {
//     if (this.ingredients.length > 1) this.ingredients.splice(index, 1);
//   }

//   addStep(): void {
//     this.instructions.push({ step: '' });
//   }

//   removeStep(index: number): void {
//     if (this.instructions.length > 1) this.instructions.splice(index, 1);
//   }

//   onFileSelected(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files.length > 0) {
//       this.selectedFile = input.files[0];

//       const reader = new FileReader();
//       reader.onload = () => {
//         this.imagePreview = reader.result;
//       };
//       reader.readAsDataURL(this.selectedFile);
//     }
//   }

//   removeImage(): void {
//     this.selectedFile = null;
//     this.imagePreview = null;
//   }

//   submitRecipe(): void {
//     if (!this.selectedFile) {
//       alert("חובה לבחור תמונה!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', this.recipe.title);
//     formData.append('type', this.recipe.type);
//     formData.append('image', this.selectedFile);
//     formData.append('prep_time', this.recipe.prep_time.toString());
//     formData.append('category', this.recipe.category);
//     formData.append('created_by_name', this.recipe.created_by || ''); // שליחה לשרת עם המפתח הצפוי

//     const instructionsText = this.instructions
//       .map((s, i) => `${i + 1}. ${s.step}`)
//       .filter(s => s.trim() !== '')
//       .join('\n');

//     formData.append('instructions', instructionsText);
//     formData.append('ingredients', JSON.stringify(this.ingredients));

//     this.recipeService.addRecipe(formData).subscribe({
//       next: () => alert("המתכון עלה בהצלחה!"),
//       error: (err: any) => console.error("שגיאה:", err)
//     });
//   }
// }

// import { Component, inject, OnInit, OnDestroy } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RecipeService } from '../../services/recipe.service';
// import { AuthService } from '../../services/services/aunth.service';
// import { Recipe, Ingredient, Instruction } from '../../recipe.model';
// import Swal from 'sweetalert2';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-add-recipe',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './add-recipe.component.html',
//   styleUrls: ['./add-recipe.component.css']
// })
// export class AddRecipeComponent implements OnInit, OnDestroy {
//   private readonly recipeService = inject(RecipeService);
//   private readonly authService = inject(AuthService);
//   private authSub?: Subscription;

//   // אובייקט המתכון התואם למודל
//   recipe: Recipe = { 
//     id: 0, 
//     title: '', 
//     type: 'Parve', 
//     prep_time: 0, 
//     category: '', 
//     created_by: '', 
//     instructions: '', 
//     main_image: '',
//     ingredients: [] 
//   };

//   // ניהול רשימות דינמיות בטופס
//   instructions: Instruction[] = [{ step: '' }];
//   ingredients: Ingredient[] = [{ product: '', amount: 1, unit: 'גרם' }];
  
//   selectedFile: File | null = null;
//   imagePreview: string | ArrayBuffer | null = null; 

//   ngOnInit(): void {
//     // עדכון ראשוני של שם היוצר
//     this.updateCreatorName();

//     // האזנה לשינויים במשתמש (ריאקטיביות)
//     this.authSub = this.authService.currentUser$.subscribe(() => {
//       this.updateCreatorName();
//     });
//   }

//   /**
//    * עדכון שם היוצר מתוך נתוני המשתמש הנוכחי ב-AuthService
//    */
//   private updateCreatorName(): void {
//     const user = this.authService.currentUserValue;
//     this.recipe.created_by = user ? user.username : 'אורח';
//   }

//   // --- ניהול רכיבים (Ingredients) ---
//   addIngredientRow(): void {
//     this.ingredients.push({ product: '', amount: 1, unit: '' });
//   }

//   removeIngredient(index: number): void {
//     if (this.ingredients.length > 1) {
//       this.ingredients.splice(index, 1);
//     }
//   }

//   // --- ניהול שלבי הכנה (Instructions) ---
//   addStep(): void {
//     this.instructions.push({ step: '' });
//   }

//   removeStep(index: number): void {
//     if (this.instructions.length > 1) {
//       this.instructions.splice(index, 1);
//     }
//   }

//   // --- טיפול בתמונה ---
//   onFileSelected(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files.length > 0) {
//       this.selectedFile = input.files[0];

//       const reader = new FileReader();
//       reader.onload = () => {
//         this.imagePreview = reader.result;
//       };
//       reader.readAsDataURL(this.selectedFile);
//     }
//   }

//   removeImage(): void {
//     this.selectedFile = null;
//     this.imagePreview = null;
//   }

//   // --- שליחת הטופס ---
//   submitRecipe(): void {
//     if (!this.selectedFile) {
//       Swal.fire({
//         title: 'חסרה תמונה',
//         text: 'כדי שהמתכון ייראה מטורף, חייבים להוסיף תמונה!',
//         icon: 'warning',
//         confirmButtonColor: '#ff5722'
//       });
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', this.recipe.title);
//     formData.append('type', this.recipe.type);
//     formData.append('image', this.selectedFile);
//     formData.append('prep_time', this.recipe.prep_time.toString());
//     formData.append('category', this.recipe.category);
//     formData.append('created_by_name', this.recipe.created_by || '');

//     // עיבוד ההוראות לטקסט רציף עם מספור
//     const instructionsText = this.instructions
//       .map((s, i) => `${i + 1}. ${s.step}`)
//       .filter(s => s.trim() !== '')
//       .join('\n');

//     formData.append('instructions', instructionsText);
//     formData.append('ingredients', JSON.stringify(this.ingredients));

//     // שליחה לשרת
//     this.recipeService.addRecipe(formData).subscribe({
//       next: () => {
//         Swal.fire({
//           title: 'המתכון עלה בהצלחה!',
//           text: 'עוד שלב בדרך לאתר מתכונים מטורף...',
//           icon: 'success',
//           confirmButtonColor: '#2D5A27'
//         });
//         this.resetForm(); // פונקציה אופציונלית לאיפוס
//       },
//       error: (err: any) => {
//         console.error("שגיאה:", err);
//         Swal.fire('אופס...', 'משהו השתבש בהעלאת המתכון.', 'error');
//       }
//     });
//   }

//   private resetForm(): void {
//     // לוגיקה לאיפוס הטופס במידת הצורך
//     this.instructions = [{ step: '' }];
//     this.ingredients = [{ product: '', amount: 1, unit: 'גרם' }];
//     this.imagePreview = null;
//     this.selectedFile = null;
//   }

//   ngOnDestroy(): void {
//     // ניקוי Subscription למניעת דליפות זיכרון
//     this.authSub?.unsubscribe();
//   }
// }
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { AuthService } from '../../services/services/aunth.service';
import { Recipe, Ingredient, Instruction } from '../../model';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { AppButtonComponent } from '../buton-basic/buton-basic.component';

/**
 * @description קומפוננטה ליצירת מתכון חדש.
 * כוללת ניהול רכיבים ושלבים דינמיים, העלאת תמונה ותצוגה מקדימה.
 */
@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule,AppButtonComponent],
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit, OnDestroy {
  private readonly recipeService = inject(RecipeService);
  private readonly authService = inject(AuthService);
  private authSub?: Subscription;

  // אובייקט המתכון התואם למודל - אתחול ברירת מחדל
  recipe: Recipe = { 
    id: 0, 
    title: '', 
    type: 'Parve', 
    prep_time: 0, 
    category: '', 
    created_by: '', 
    instructions: '', 
    main_image: '',
    ingredients: [] 
  };

  // רשימות עזר לניהול הטופס הדינמי
  instructions: Instruction[] = [{ step: '' }];
  ingredients: Ingredient[] = [{ product: '', amount: 1, unit: 'גרם' }];
  isUploading = false;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null; 

  ngOnInit(): void {
    // אתחול שם היוצר מהמשתמש המחובר
    this.updateCreatorName();

    // ריספונסיביות לשינוי סטטוס התחברות
    this.authSub = this.authService.currentUser$.subscribe(() => {
      this.updateCreatorName();
    });
  }

  /**
   * מעדכן את שם היוצר בשדה המתכון לפי המידע ב-AuthService
   */
  private updateCreatorName(): void {
    const user = this.authService.currentUserValue;
    this.recipe.created_by = user ? user.username : 'שף אורח';
  }

  // --- ניהול רכיבים (Ingredients) ---
  addIngredientRow(): void {
    this.ingredients.push({ product: '', amount: 1, unit: '' });
  }

  removeIngredient(index: number): void {
    if (this.ingredients.length > 1) {
      this.ingredients.splice(index, 1);
    }
  }

  // --- ניהול שלבי הכנה (Instructions) ---
  addStep(): void {
    this.instructions.push({ step: '' });
  }

  removeStep(index: number): void {
    if (this.instructions.length > 1) {
      this.instructions.splice(index, 1);
    }
  }

  // --- טיפול במדיה ותמונות ---
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // יצירת תצוגה מקדימה לקובץ שנבחר
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  removeImage(): void {
    this.selectedFile = null;
    this.imagePreview = null;
  }

  /**
   * @description פונקציית השליחה המרכזית.
   * מבצעת וולידציה, מציגה מצב טעינה ושולחת FormData לשרת.
   */
  submitRecipe(): void {
    // 1. וולידציה בסיסית
    if (!this.selectedFile || !this.recipe.title || !this.recipe.category) {
      Swal.fire({
        title: 'חסרים פרטים',
        text: 'אנא ודאי שכל שדות החובה מלאים (שם, קטגוריה ותמונה)',
        icon: 'info',
        confirmButtonColor: '#d3b062' // צבע זהב מעודן
      });
      return;
    }

    // 2. הצגת הודעת טעינה "מטורפת"
    Swal.fire({
      title: 'אופים לך את המתכון...',
      text: 'עוד רגע וזה מושלם..........',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // 3. בניית FormData (מתאים לשליחת קבצים)
    const formData = new FormData();
    formData.append('title', this.recipe.title);
    formData.append('type', this.recipe.type);
    formData.append('image', this.selectedFile);
    formData.append('prep_time', this.recipe.prep_time.toString());
    formData.append('category', this.recipe.category);
    formData.append('created_by_name', this.recipe.created_by || '');

    // עיבוד הוראות למחרוזת אחת עם מספור
    const instructionsText = this.instructions
      .map((s, i) => `${i + 1}. ${s.step}`)
      .filter(s => s.trim() !== '')
      .join('\n');

    formData.append('instructions', instructionsText);
    formData.append('ingredients', JSON.stringify(this.ingredients));

    // 4. קריאה לשרת
    this.recipeService.addRecipe(formData).subscribe({
      next: () => {
        Swal.fire({
          title: 'וואו! המתכון עלה!',
          text: 'המתכון שלך נוסף בהצלחה לאוסף שלנו.',
          icon: 'success',
          confirmButtonText: 'מעולה!',
          confirmButtonColor: '#2D5A27'
        });
        this.resetForm();
      },
      error: (err: any) => {
        console.error("שגיאה בהעלאה:", err);
        Swal.fire({
          title: 'אופס...',
          text: 'משהו השתבש בדרך לתנור. נסי שוב מאוחר יותר.',
          icon: 'error',
          confirmButtonColor: '#c0392b'
        });
      }
    });
  }

  /**
   * מאפס את כל שדות הטופס למצב התחלתי
   */
  private resetForm(): void {
    this.recipe = { 
      id: 0, title: '', type: 'Parve', prep_time: 0, 
      category: '', created_by: this.authService.currentUserValue?.username || '', 
      instructions: '', main_image: '', ingredients: [] 
    };
    this.instructions = [{ step: '' }];
    this.ingredients = [{ product: '', amount: 1, unit: 'גרם' }];
    this.imagePreview = null;
    this.selectedFile = null;
  }

  ngOnDestroy(): void {
    // ניקוי האזנה למניעת דליפות זיכרון
    this.authSub?.unsubscribe();
  }
  private handleFile(file: File): void {
    if (!file.type.startsWith('image/')) {
      Swal.fire('סוג קובץ לא תקין', 'אנא בחרי תמונה בלבד', 'warning');
      return;
    }
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  // onFileSelected(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     this.handleFile(input.files[0]);
  //   }
  // }

  // לוגיקת גרירה והשלכה
  onFileDropped(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  
}