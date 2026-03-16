
import os
import uuid
import json
from sqlalchemy import func
from flask import Blueprint, request, jsonify
from PIL import Image, ImageOps, ImageFilter
from DataBase import db
from claases.Recipe import Recipe
from claases.IngredientEntry import IngredientEntry
from claases.User import User 
from .utils.decorators import role_required

recipe_bp = Blueprint('recipe', __name__)

# הגדרת תיקיית היעד לשמירה
UPLOAD_FOLDER = os.path.join('static', 'uploads')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# ==========================================
# 1. הוספת מתכון חדש (מתוקן)
# ==========================================
# @recipe_bp.route('/add', methods=['POST'])
# @role_required('Uploader')
# def add_recipe():
#     try:
#         # שליפת נתונים מ-FormData
#         title = request.form.get('title')
#         recipe_type = request.form.get('type')
#         instructions = request.form.get('instructions')
#         prep_time = request.form.get('prep_time')
#         category = request.form.get('category')

#         # זיהוי המשתמש מה-Headers - קריטי לסינון העתידי
#         user_name = request.headers.get('x-user-name', 'אורח')
#         user_id_raw = request.headers.get('x-user-id')

#         # המרת רכיבים מ-JSON
#         ingredients_raw = request.form.get('ingredients', '[]')
#         ingredients_list = json.loads(ingredients_raw)

#         if not title or not instructions:
#             return jsonify({"message": "חובה להזין כותרת והוראות הכנה"}), 400

#         # טיפול בתמונה
#         file = request.files.get('image')
#         if not file:
#             return jsonify({"message": "חובה להעלות תמונה"}), 400

#         unique_id = str(uuid.uuid4())
#         original_filename = f"{unique_id}_original.jpg"
#         original_path = os.path.join(UPLOAD_FOLDER, original_filename)
#         file.save(original_path)

#         # עיבוד תמונות (Variations)
#         img = Image.open(original_path)
#         if img.mode in ("RGBA", "P"):
#             img = img.convert("RGB")

#         variations = []
#         # Negative
#         neg_filename = f"{unique_id}_negative.jpg"
#         ImageOps.invert(img).save(os.path.join(UPLOAD_FOLDER, neg_filename))
#         variations.append(neg_filename)

#         # Contour
#         contour_filename = f"{unique_id}_contour.jpg"
#         img.filter(ImageFilter.CONTOUR).save(os.path.join(UPLOAD_FOLDER, contour_filename))
#         variations.append(contour_filename)

#         # Sepia
#         sepia_img = img.convert("L")
#         sepia_img = ImageOps.colorize(sepia_img, black="#704214", white="#C0A080")
#         sepia_filename = f"{unique_id}_sepia.jpg"
#         sepia_img.save(os.path.join(UPLOAD_FOLDER, sepia_filename))
#         variations.append(sepia_filename)

#         # המרת ה-ID למספר שלם עבור ה-Foreign Key
#         formatted_user_id = int(user_id_raw) if user_id_raw and user_id_raw.isdigit() else None

#         # יצירת אובייקט המתכון עם שם המשתמש וה-ID
#         new_recipe = Recipe(
#             title=title,
#             type=recipe_type,
#             instructions=instructions,
#             prep_time=int(prep_time) if prep_time else 0,
#             category=category,
#             image_path=original_filename,
#             created_by_user_id=formatted_user_id,
#             created_by_name=user_name
#         )
#         new_recipe.set_variations(variations)

#         db.session.add(new_recipe)
#         db.session.flush() 

#         # הוספת רכיבים
#         for ing in ingredients_list:
#             ingredient_entry = IngredientEntry(
#                 product=ing.get('product'),
#                 amount=float(ing.get('amount', 0)),
#                 unit=ing.get('unit'),
#                 recipe_id=new_recipe.id
#             )
#             db.session.add(ingredient_entry)

#         db.session.commit()
#         print(f"✅ Recipe '{title}' added by {user_name}")
#         return jsonify({"message": "המתכון עלה בהצלחה!", "recipe_id": new_recipe.id}), 201

#     except Exception as e:
#         db.session.rollback()
#         print(f"❌ Error adding recipe: {str(e)}")
#         return jsonify({"message": "שגיאה פנימית בשרת", "error": str(e)}), 500





@recipe_bp.route('/add', methods=['POST'])
@role_required('Uploader')
def add_recipe():
    try:
        # שליפת נתונים מ-FormData
        title = request.form.get('title')
        recipe_type = request.form.get('type')
        instructions = request.form.get('instructions')
        prep_time = request.form.get('prep_time')
        category = request.form.get('category')

        # זיהוי המשתמש מה-Headers
        user_name = request.headers.get('x-user-name', 'אורח')
        user_id_raw = request.headers.get('x-user-id')
        formatted_user_id = int(user_id_raw) if user_id_raw and str(user_id_raw).isdigit() else None

        # המרת רכיבים מ-JSON
        ingredients_raw = request.form.get('ingredients', '[]')
        ingredients_list = json.loads(ingredients_raw)

        if not title or not instructions:
            return jsonify({"message": "חובה להזין כותרת והוראות הכנה"}), 400

        # טיפול בתמונה ראשית
        file = request.files.get('image')
        if not file:
            return jsonify({"message": "חובה להעלות תמונה"}), 400

        unique_id = str(uuid.uuid4())
        original_filename = f"{unique_id}_original.jpg"
        original_path = os.path.join(UPLOAD_FOLDER, original_filename)
        file.save(original_path)

        # עיבוד תמונות (Variations) - יצירת הגלריה
        img = Image.open(original_path)
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")

        variations = []
        
        # 1. Negative
        neg_filename = f"{unique_id}_negative.jpg"
        ImageOps.invert(img).save(os.path.join(UPLOAD_FOLDER, neg_filename))
        variations.append(neg_filename)

        # 2. Contour (קווי מתאר)
        contour_filename = f"{unique_id}_contour.jpg"
        img.filter(ImageFilter.CONTOUR).save(os.path.join(UPLOAD_FOLDER, contour_filename))
        variations.append(contour_filename)

        # 3. Sepia
        sepia_img = img.convert("L")
        sepia_img = ImageOps.colorize(sepia_img, black="#704214", white="#C0A080")
        sepia_filename = f"{unique_id}_sepia.jpg"
        sepia_img.save(os.path.join(UPLOAD_FOLDER, sepia_filename))
        variations.append(sepia_filename)

        # יצירת אובייקט המתכון
        new_recipe = Recipe(
            title=title,
            type=recipe_type,
            instructions=instructions,
            prep_time=int(prep_time) if prep_time and str(prep_time).isdigit() else 0,
            category=category,
            image_path=original_filename,
            created_by_user_id=formatted_user_id,
            created_by_name=user_name
        )
        
        # שמירת רשימת הווריאציות למסד הנתונים
        new_recipe.set_variations(variations)

        db.session.add(new_recipe)
        db.session.flush() # קבלת ה-ID עבור הרכיבים

        # הוספת רכיבים
        for ing in ingredients_list:
            ingredient_entry = IngredientEntry(
                product=ing.get('product'),
                amount=float(ing.get('amount', 0)) if ing.get('amount') else 0,
                unit=ing.get('unit'),
                recipe_id=new_recipe.id
            )
            db.session.add(ingredient_entry)

        db.session.commit()
        print(f"✅ Recipe '{title}' with {len(variations)} variations added.")
        return jsonify({"message": "המתכון עלה בהצלחה!", "recipe_id": new_recipe.id}), 201

    except Exception as e:
        db.session.rollback()
        print(f"❌ Error adding recipe: {str(e)}")
        return jsonify({"message": "שגיאה פנימית בשרת", "error": str(e)}), 500

@recipe_bp.route('/my-stats/<string:username>', methods=['GET'])
def get_user_stats(username):
    try:
        count = Recipe.query.filter_by(created_by_name=username).count()
        return jsonify({
            "username": username,
            "recipe_count": count
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@recipe_bp.route('/my-recipes/<string:username>', methods=['GET'])
def get_user_recipes(username):
    try:
        # user_recipes = Recipe.query.filter_by(created_by_name=username).all()
        user_recipes = Recipe.query.filter(func.lower(Recipe.created_by_name) == func.lower(username)).all()
        return jsonify([{
            "id": r.id,
            "title": r.title,
            "type": r.type,
            "main_image": f"/static/uploads/{r.image_path}",
            "prep_time": r.prep_time
        } for r in user_recipes]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ==========================================
# 4. שליפת מתכונים כללית
# ==========================================
@recipe_bp.route('/all', methods=['GET'])
def get_all_recipes():
    recipes = Recipe.query.all()
    return jsonify([{
        "id": r.id,
        "title": r.title,
        "type": r.type,
        "prep_time": r.prep_time,
        "category": r.category,
        "created_by": r.created_by_name,
        "main_image": f"/static/uploads/{r.image_path}"
    } for r in recipes]), 200

@recipe_bp.route('/<int:id>', methods=['GET'])
def get_recipe(id):
    recipe = Recipe.query.get_or_404(id)
    return jsonify({
        "id": recipe.id,
        "title": recipe.title,
        "type": recipe.type,
        "instructions": recipe.instructions,
        "prep_time": recipe.prep_time,
        "category": recipe.category,
        "created_by": recipe.created_by_name,
        "main_image": f"/static/uploads/{recipe.image_path}",
        "gallery": [f"/static/uploads/{v}" for v in recipe.get_variations()],
        "ingredients": [
            {"product": i.product, "amount": i.amount, "unit": i.unit}
            for i in recipe.ingredients
        ]
    }), 200



@recipe_bp.route('/related/<int:recipe_id>', methods=['GET', 'OPTIONS'])
def get_related_recipes(recipe_id):
    # טיפול בבקשת ה-Preflight של הדפדפן
    if request.method == 'OPTIONS':
        return '', 200

    try:
        current_recipe = Recipe.query.get_or_404(recipe_id)
        related = Recipe.query.filter(
            Recipe.category == current_recipe.category,
            Recipe.id != recipe_id
        ).limit(4).all()

        return jsonify([{
            "id": r.id, 
            "title": r.title, 
            "main_image": f"/static/uploads/{r.image_path}"
        } for r in related]), 200
    except Exception as e:
        return jsonify({"message": "Error", "error": str(e)}), 500

@recipe_bp.route('/recipe/<int:recipe_id>/favorite', methods=['POST'])
@role_required('Any')
def toggle_favorite(recipe_id):
    user_id = request.headers.get('x-user-id')
    user = User.query.get_or_404(user_id)
    recipe = Recipe.query.get_or_404(recipe_id)

    if recipe in user.favorite_recipes:
        user.favorite_recipes.remove(recipe)
        status = "removed"
    else:
        user.favorite_recipes.append(recipe)
        status = "added"

    db.session.commit()
    return jsonify({"status": status, "message": "עודכן בהצלחה"}), 200



@recipe_bp.route('/favorites', methods=['GET'])
@role_required('Any')
def get_favorites():
    user_id = request.headers.get('x-user-id')
    user = User.query.get_or_404(user_id)
    
    favorites_list = []
    for recipe in user.favorite_recipes:
        favorites_list.append({
            'id': recipe.id,
            'title': recipe.title,
            'main_image': f"/static/uploads/{recipe.image_path}" # הוספת השורה הזו!
        })
    
    return jsonify(favorites_list), 200 

@recipe_bp.route('/delete/<int:id>', methods=['DELETE', 'OPTIONS'])
@role_required('Uploader', check_owner=True) # רק מנהל או הבעלים יכול למחוק
def delete_recipe(id):
    try:
        recipe = Recipe.query.get_or_404(id)
        # מחיקת רכיבים (אם אין cascade במודל)
        IngredientEntry.query.filter_by(recipe_id=id).delete()
        db.session.delete(recipe)
        db.session.commit()
        return jsonify({"message": "המתכון נמחק בהצלחה"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "מחיקה נכשלה", "error": str(e)}), 500



@recipe_bp.route('/update/<int:id>', methods=['PUT', 'OPTIONS'])
def update_recipe(id):
    # 1. טיפול חובה ב-OPTIONS עבור CORS
    if request.method == 'OPTIONS':
        return '', 200

    # 2. קריאת הנתונים בצורה בטוחה
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"message": "לא התקבלו נתונים"}), 400

    try:
        # בדיקת הרשאות ידנית (במקום הדיקורטור שעלול לגרום לבעיות ב-PUT)
        user_id = request.headers.get('x-user-id')
        recipe = Recipe.query.get_or_404(id)

        # בדיקה אם המשתמש הוא הבעלים או מנהל
        if str(recipe.created_by_user_id) != str(user_id) and request.headers.get('x-user-role') != 'Admin':
            return jsonify({"message": "אין לך הרשאה לערוך מתכון זה"}), 403

        # 3. עדכון שדות בסיסיים
        recipe.title = data.get('title', recipe.title)
        recipe.instructions = data.get('instructions', recipe.instructions)
        
        # המרה בטוחה למספר עבור זמן הכנה
        try:
            recipe.prep_time = int(data.get('prep_time', recipe.prep_time))
        except (ValueError, TypeError):
            recipe.prep_time = 0

        recipe.type = data.get('type', recipe.type)
        recipe.category = data.get('category', recipe.category)

        # 4. עדכון רכיבים
        if 'ingredients' in data and isinstance(data['ingredients'], list):
            # מחיקת רכיבים קודמים
            IngredientEntry.query.filter_by(recipe_id=id).delete()
            
            for ing in data['ingredients']:
                if ing.get('product'): # וודא שיש שם למוצר
                    new_ing = IngredientEntry(
                        recipe_id=id,
                        product=ing['product'],
                        amount=float(ing.get('amount', 0)) if ing.get('amount') else 0,
                        unit=ing.get('unit', '')
                    )
                    db.session.add(new_ing)

        db.session.commit()
        return jsonify({"message": "המתכון עודכן בהצלחה"}), 200

    except Exception as e:
        db.session.rollback()
        print(f"❌ Update Error: {str(e)}") # חשוב כדי שתראי בטרמינל מה קרה
        return jsonify({"message": "עדכון נכשל", "error": str(e)}), 500