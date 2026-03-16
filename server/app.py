
import os
from flask import Flask
from flask_cors import CORS
from DataBase import db

# --- ייבוא המודלים (חובה לייבא לפני db.create_all) ---
from claases.User import User
from claases.Recipe import Recipe
from claases.IngredientEntry import IngredientEntry
# --- ייבוא ה-Blueprints ---
from Routes.auth_routes import auth_bp
from Routes.recipe_routes import recipe_bp
from Routes.smartSorted import recipe_search_bp 

def create_app():
    app = Flask(__name__)

    # --- הגדרות מסד הנתונים ---
    # שימוש בנתיב מוחלט ליצירת קובץ ה-DB בתיקיית הפרויקט
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'recipe_app.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # --- הגדרת CORS ---
    # מאפשר לאנגולר (בדרך כלל פורט 4200) לתקשר עם השרת
    CORS(app, resources={r"/*": {"origins": "*"}},
         allow_headers=["Content-Type", "x-user-role", "x-user-id", "x-user-name", "Authorization"],
         methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

    # --- אתחול מסד הנתונים ---
    db.init_app(app)

    # --- רישום נתיבים (Blueprints) ---
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(recipe_bp, url_prefix='/api/recipes')
    app.register_blueprint(recipe_search_bp, url_prefix='/api/recipes')

    # --- יצירת הטבלאות בתוך הקשר האפליקציה ---
    with app.app_context():
        try:
            db.create_all()
            print("✅ מסד הנתונים והטבלאות אותחלו בהצלחה.")
        except Exception as e:
            print(f"❌ שגיאה ביצירת הטבלאות: {e}")

    return app

app = create_app()

@app.route('/')
def home():
    return {"status": "Server is running", "message": "Recipe API is active"}

if __name__ == '__main__':
    # threaded=True מאפשר לשרת לטפל בכמה בקשות במקביל
    app.run(debug=True, port=5000, threaded=True)