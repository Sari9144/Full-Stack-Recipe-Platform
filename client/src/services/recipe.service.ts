

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe, RecipeFilters, smartSearchResult, HomeStats, UserStats } from '../model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private http = inject(HttpClient);
  // נתיב ה-API ב-Flask
  private apiUrl = 'http://127.0.0.1:5000/api/recipes';

  /** * שליפת נתונים סטטיסטיים לדף הבית (קטגוריות ומתכונים מהירים)
   */
  getHomeData(): Observable<HomeStats> {
    return this.http.get<HomeStats>(`${this.apiUrl}/home-stats`);
  }

  /**
   * חיפוש דינמי: בונה אובייקט HttpParams המבוסס על המסננים שהמשתמש בחר.
   */
  searchRecipes(filters: RecipeFilters): Observable<Recipe[]> {
    let params = new HttpParams();
    if (filters.searchQuery) params = params.append('query', filters.searchQuery);
    if (filters.maxTime) params = params.append('max_time', filters.maxTime.toString());
    if (filters.type) params = params.append('type', filters.type);
    if (filters.category) params = params.append('category', filters.category);

    return this.http.get<Recipe[]>(`${this.apiUrl}/search`, { params });
  }

  /**
   * אלגוריתם "מה יש במקרר": שולח רשימת רכיבים ומחזיר מתכונים עם ציון התאמה.
   */
  smartSearch(ingredients: string[]): Observable<smartSearchResult[]> {
    return this.http.post<smartSearchResult[]>(`${this.apiUrl}/smart-search`, { ingredients });
  }

  // --- ניהול מתכונים (CRUD) ---

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/all`);
  }

  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }

  /**
   * הוספת מתכון: משתמש ב-FormData כדי לאפשר העלאת קבצי תמונה (Pillow).
   */
  addRecipe(recipeData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, recipeData);
  }

  updateRecipe(id: number, recipeData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, recipeData);
  }

  deleteRecipe(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  // --- כלים ותכונות נוספות ---

  /**
   * רשימת קניות: מאחדת רכיבים ממספר מתכונים נבחרים.
   */
  generateShoppingList(recipeIds: number[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/recipe/shopping-list`, { recipe_ids: recipeIds });
  }

  /**
   * חישוב מחדש של כמויות לפי פקטור (סועדים).
   */
  updateServings(recipeId: number, factor: number): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.apiUrl}/calculate-servings/${recipeId}`, { factor });
  }

  /**
   * שליפת המתכונים האישיים של המשתמש (עבור עמוד הפרופיל).
   */
  getUserRecipes(username: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/my-recipes/${username}`);
  }
  /**
 * שליפת סטטיסטיקות של משתמש ספציפי (למשל: כמה מתכונים העלה)
 */
getUserStats(username: string): Observable<UserStats> {
  return this.http.get<UserStats>(`${this.apiUrl}/my-stats/${username}`);
}
getFavorites(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/favorites`);
  }

  toggleFavorite(recipeId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/recipe/${recipeId}/favorite`, {});
  }

  getRelatedRecipes(recipeId: number): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/related/${recipeId}`);
  }
  
}