

from functools import wraps
from flask import request, jsonify, make_response
from claases.Recipe import Recipe

def role_required(required_role, check_owner=False):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            # טיפול בבקשות Preflight של הדפדפן (CORS)
            if request.method == 'OPTIONS':
                return make_response('', 200)

            # שליפת נתוני המשתמש מה-Headers
            user_role = request.headers.get('x-user-role')
            user_id = request.headers.get('x-user-id')

            if not user_role:
                return jsonify({"message": "Access Denied: Missing role"}), 401

            # 1. מנהל תמיד מורשה לבצע כל פעולה
            if user_role == 'Admin':
                return f(*args, **kwargs)

            # 2. בדיקת בעלות על תוכן (למשל: עריכת מתכון אישי)
            if check_owner:
                recipe_id = kwargs.get('id') 
                recipe = Recipe.query.get(recipe_id)
                
                if not recipe:
                    return jsonify({"message": "Recipe not found"}), 404
                
                # השוואה בין יוצר המתכון למשתמש הנוכחי
                # שימי לב: השדה במודל שלך הוא created_by_user_id
                if str(recipe.created_by_user_id) == str(user_id):
                    return f(*args, **kwargs)
                else:
                    return jsonify({"message": "Forbidden: You are not the owner"}), 403

            # 3. בדיקת הרשאה לפי תפקיד (Reader/Uploader)
            if user_role == required_role or required_role == 'Any':
                return f(*args, **kwargs)

            return jsonify({"message": "Forbidden: No permission"}), 403
            
        return decorated_function
    return decorator