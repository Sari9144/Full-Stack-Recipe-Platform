
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

  

  // לוגיקת גרירה והשלכה
  onFileDropped(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  
}