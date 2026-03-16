
from flask import Blueprint, request, jsonify
from DataBase import db
from claases.Recipe import Recipe

# הגדרת ה-Blueprint לריכוז נתיבי החיפוש והלוגיקה הצרכנית
recipe_search_bp = Blueprint('recipeSearch', __name__)

# --- 1. דף הבית: סטטיסטיקות וקטגוריות ---
@recipe_search_bp.route('/home-stats', methods=['GET', 'OPTIONS'])
def get_home_stats():
    """
    מטרה: שליפת מידע תמציתי לדף הבית.
    מחזיר: 4 מתכונים מהירים (עד 30 דקות) ורשימת קטגוריות ייחודיות.
    """
    if request.method == 'OPTIONS': 
        return jsonify({"status": "ok"}), 200
        
    try:
        # פילטור מתכונים מהירים: פחות מ-30 דקות, ממוין מהמהיר ביותר
        top_quick = Recipe.query.filter(Recipe.prep_time <= 30)\
                                .order_by(Recipe.prep_time.asc())\
                                .limit(4).all()
        
        # Fallback: אם אין מתכונים תחת 30 דקות, נשלוף את ה-4 הכי מהירים שיש במאגר
        if not top_quick:
            top_quick = Recipe.query.order_by(Recipe.prep_time.asc()).limit(4).all()

        # שליפת קטגוריות ייחודיות: שימוש ב-distinct למניעת כפילויות
        categories_raw = db.session.query(Recipe.category).distinct().all()
        # ניקוי רשימה: רק קטגוריות שאינן ריקות
        category_list = [c[0] for c in categories_raw if c[0] and str(c[0]).strip()]

        return jsonify({
            "quick_recipes": [r.to_dict() for r in top_quick],
            "categories": category_list
        }), 200
    except Exception as e:
        return jsonify({"message": "Error fetching stats", "error": str(e)}), 500

# --- 2. חיפוש וסינון דינמי (גלריה) ---
@recipe_search_bp.route('/search', methods=['GET', 'OPTIONS'])
def search_recipes():
    """
    מטרה: מנוע חיפוש רב-פרמטרים.
    תומך ב: טקסט חופשי, זמן הכנה מקסימלי, סוג כשרות וקטגוריה.
    """
    if request.method == 'OPTIONS': return jsonify({"status": "ok"}), 200
    
    # שליפת פרמטרים מכתובת ה-URL (Query Params)
    search_query = request.args.get('query')
    max_time = request.args.get('max_time', type=int)
    kosher_type = request.args.get('type')
    category_name = request.args.get('category')

    # בניית שאילתה דינמית (Query Building)
    query = Recipe.query
    
    if search_query:
        # ilike מאפשר חיפוש טקסט שאינו רגיש לאותיות גדולות/קטנות
        query = query.filter(Recipe.title.ilike(f'%{search_query}%'))
    if max_time:
        query = query.filter(Recipe.prep_time <= max_time)
    if kosher_type:
        query = query.filter(Recipe.type == kosher_type)
    if category_name:
        query = query.filter(Recipe.category == category_name)

    results = query.order_by(Recipe.prep_time.asc()).all()
    return jsonify([r.to_dict() for r in results]), 200

# --- 3. אלגוריתם חיפוש חכם (Smart Matching) ---
@recipe_search_bp.route('/smart-search', methods=['POST', 'OPTIONS'])
def smart_search():
    """
    מטרה: מציאת מתכונים לפי רכיבים קיימים (מקרר ריק).
    לוגיקה: חישוב אחוז התאמה בין רכיבי המשתמש לרכיבי המתכון.
    """
    if request.method == 'OPTIONS': return jsonify({"status": "ok"}), 200
    
    data = request.json
    # שימוש ב-set מאפשר לבצע פעולות חיתוך (Intersection) ביעילות של O(1)
    user_ingredients_set = set(data.get('ingredients', []))

    all_recipes = Recipe.query.all()
    results = []

    for recipe in all_recipes:
        # יצירת קבוצת רכיבים למתכון הנוכחי
        recipe_ingredients_set = set([i.product for i in recipe.ingredients])
        if not recipe_ingredients_set: continue

        # פעולת החיתוך (&) מוצאת רכיבים שקיימים בשתי הקבוצות
        common = user_ingredients_set & recipe_ingredients_set
        
        # חישוב הציון: כמה אחוז מהמתכון המשתמש יכול להכין עכשיו
        score = (len(common) / len(recipe_ingredients_set)) * 100

        # סף חסימה: רק מתכונים עם מעל 20% התאמה יוחזרו
        if score >= 20:
            d = recipe.to_dict()
            d['matching_score'] = round(score, 2)
            results.append(d)

    # מיון התוצאות מהציון הגבוה לנמוך (הכי רלוונטי ראשון)
    results.sort(key=lambda x: x.get('matching_score', 0), reverse=True)
    return jsonify(results), 200

# --- 4. ריכוז רשימת קניות ---
@recipe_search_bp.route('/recipe/shopping-list', methods=['POST', 'OPTIONS'])
def generate_shopping_list():
    """
    מטרה: איחוד רכיבים ממספר מתכונים לרשימה אחת מרוכזת.
    שימושי עבור: תכנון שבועי או אירוח.
    """
    if request.method == 'OPTIONS': return jsonify({"status": "ok"}), 200
    
    recipe_ids = request.json.get('recipe_ids', [])
    # שליפת כל המתכונים שה-ID שלהם נמצא ברשימה (שימוש ב-in_)
    recipes = Recipe.query.filter(Recipe.id.in_(recipe_ids)).all()

    shopping_list = {}
    for r in recipes:
        for ing in r.ingredients:
            # מפתח ייחודי המשלב שם ויחידה למניעת טעויות (קמח גרם לעומת קמח כפות)
            key = f"{ing.product} ({ing.unit})"
            shopping_list[key] = shopping_list.get(key, 0) + ing.amount

    return jsonify(shopping_list), 200

# --- 5. התאמת כמויות (Scaling) ---
@recipe_search_bp.route('/calculate-servings/<int:recipe_id>', methods=['POST', 'OPTIONS'])
def calculate_servings(recipe_id):
    """
    מטרה: שינוי כמויות הרכיבים במתכון לפי פקטור (מכפיל).
    למשל: הכפלת מתכון פי 2 או חלוקה ב-2.
    """
    if request.method == 'OPTIONS': return jsonify({"status": "ok"}), 200
        
    try:
        data = request.json
        factor = float(data.get('factor', 1)) # קבלת המכפיל מהחזית
        
        recipe = Recipe.query.get_or_404(recipe_id)
        recipe_data = recipe.to_dict()
        
        if 'ingredients' in recipe_data:
            for ing in recipe_data['ingredients']:
                if ing.get('amount'):
                    # חישוב מחדש ועיגול למניעת מספרים עשרוניים ארוכים מדי
                    ing['amount'] = round(float(ing['amount']) * factor, 2)
        
        return jsonify(recipe_data), 200
    except Exception as e:
        return jsonify({"message": "Error calculating servings", "error": str(e)}), 500