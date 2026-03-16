
/** * ממשק המייצג רכיב בודד במתכון
 */
export interface Ingredient {
  product: string;    // שם המוצר (למשל: קמח)
  amount: number;     // כמות נומרית
  unit: string;       // יחידת מידה (למשל: כוס, כף, גרם)
}

/** * ממשק המייצג מתכון מלא
 */
export interface Recipe {
  id: number;
  title: string;
  instructions: string;    // אופן ההכנה
  prep_time: number;       // זמן הכנה בדקות
  
  // הגדרת סוגי הכשרות האפשריים למניעת שגיאות כתיב
  type: 'Meat' | 'Dairy' | 'Parve' | string; 
  
  category: string;        // קטגוריה (עוגות, מרקים וכו')
  main_image: string;      // נתיב לתמונה הראשית
  
  gallery?: string[];      // מערך אופציונלי של נתיבי תמונות נוספות
  ingredients: Ingredient[]; // מערך של אובייקטים מסוג Ingredient
  
  created_by?: string;     // שם היוצר (אם קיים)
  
  // שדות אופציונליים המשמשים לחיפוש חכם וסטטיסטיקות
  matching_score?: number; 
  created_at?: Date;
  isFavorite?: boolean;
}

/**
 * ממשק המייצג נתוני סטטיסטיקה לדף הבית
 */
export interface HomeStats {
  quick_recipes: Recipe[];
  categories: string[];
}


export interface User {
  id: number;
  username: string;
  email: string; // ✅ חובה
  role: 'Admin' | 'User' | 'Uploader' | 'Pending' | 'Reader';
}

// --- Instruction Interface ---
export interface Instruction {
  step: string;
}

export interface RecipeFilters {
  searchQuery: string;
  type: 'Meat' | 'Dairy' | 'Parve' | '';
  category: string;
  maxTime: number;
}


export interface ShoppingListData {
  [ingredientName: string]: string | number;
}



export interface smartSearchResult {
  id: number;
  title: string;
  matching_score: number;
}

export interface missingIngredient {
  name: string;
  amount: string | number;
}
/** ממשק המייצג את מבנה התגובה מהשרת בזמן התחברות */
// export interface AuthResponse {
//   user: User;
//   message?: string;
//   status?: string;
// }

export interface UserStats {
  recipe_count: number; 
  total_likes: number;
  join_date: string;
}