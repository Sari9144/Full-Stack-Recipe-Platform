
import json
from flask import Blueprint, request, jsonify, make_response
from werkzeug.security import generate_password_hash, check_password_hash
from DataBase import db
from claases.User import User
from .utils.decorators import role_required

# יצירת ה-Blueprint לניהול מערכת המשתמשים
auth_bp = Blueprint('auth', __name__)

def create_auth_response(user_data, message, status_code=200):
    """
    פונקציית עזר ליצירת תגובה אחידה מהשרת הכוללת עוגיית Session.
    העוגיה מאפשרת לאנגולר לזהות את המשתמש גם לאחר רענון הדף.
    """
    response = make_response(jsonify({
        "status": "success",
        "message": message,
        "user": user_data
    }), status_code)
    
    # הגדרת עוגיה (Cookie) בדפדפן
    response.set_cookie(
        'user_session',
        value=json.dumps(user_data),  # שמירת נתוני המשתמש כטקסט בתוך העוגיה
        max_age=3600 * 24,            # תוקף העוגיה: 24 שעות
        httponly=False,               # מאפשר ל-Angular לקרוא את העוגיה (דרך CookieService)
        samesite='Lax',
        path='/'
    )
    return response

# --- 1. רישום משתמש חדש (Register) ---
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    # ברירת מחדל היא משתמש רגיל (Reader)
    role = data.get('role', 'Reader')

    # בדיקה האם האימייל כבר תפוס
    if User.query.filter_by(email=email).first():
        return jsonify({"message": "האימייל כבר קיים במערכת", "status": "error"}), 400

    try:
        # הצפנת הסיסמה לפני שמירה במסד הנתונים (אבטחה)
        hashed_pw = generate_password_hash(password, method='pbkdf2:sha256')
        
        new_user = User(
            username=username,
            email=email,
            password=hashed_pw,
            role=role,
            is_approved_uploader=False # משתמש חדש תמיד מתחיל כלא מאושר
        )
        
        new_user.save() # שימוש במתודת save שהגדרנו ב-BaseModel

        user_info = {
            "id": new_user.id,
            "username": new_user.username,
            "email": new_user.email,
            "role": new_user.role
        }

        return create_auth_response(user_info, "החשבון נוצר בהצלחה!", 201)

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "חלה שגיאה בתהליך הרישום", "error": str(e)}), 500

# --- 2. התחברות (Login) ---
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # חיפוש המשתמש לפי מייל
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"status": "error", "message": "משתמש לא קיים במערכת"}), 404

    # בדיקה האם הסיסמה שהוזנה מתאימה ל-Hash שנמצא ב-DB
    if not check_password_hash(user.password, password):
        return jsonify({"status": "error", "message": "הסיסמה שגויה"}), 401

    user_data = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "role": user.role,
        "is_approved_uploader": user.is_approved_uploader
    }

    return create_auth_response(user_data, f"שלום {user.username}, התחברת בהצלחה!")

# --- 3. בקשת שדרוג לתפקיד מעלה תוכן (Uploader Request) ---
@auth_bp.route('/request-upgrade', methods=['POST'])
def request_upgrade():
    """משתמש רגיל מבקש להפוך למעלה מתכונים. הסטטוס הופך ל-Pending."""
    data = request.get_json()
    email = data.get('email')

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "משתמש לא נמצא"}), 404

    user.role = 'Pending'
    db.session.commit()
    
    return jsonify({"status": "success", "newRole": "Pending", "message": "הבקשה נשלחה למנהל"}), 200

# --- 4. אזור מנהל: קבלת כל המשתמשים הממתינים ---
@auth_bp.route('/pending-users', methods=['GET'])
@role_required('Admin') # רק למנהל מותר לגשת לכאן
def get_pending_users():
    """שולף רשימה של כל המשתמשים שממתינים לאישור (Pending)"""
    pending_users = User.query.filter_by(role='Pending').all()
    
    users_list = [{
        "id": u.id,
        "username": u.username,
        "email": u.email,
        "role": u.role
    } for u in pending_users]

    return jsonify(users_list), 200

# --- 5. אזור מנהל: אישור משתמש ---
@auth_bp.route('/approve-user/<int:user_id>', methods=['POST'])
@role_required('Admin')
def approve_user(user_id):
    """המנהל מאשר את המשתמש ומעלה את רמת ההרשאה שלו"""
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "משתמש לא נמצא"}), 404

    user.role = 'Uploader'
    user.is_approved_uploader = True # סימון בוליאני שהמשתמש מאושר
    db.session.commit()

    return jsonify({"status": "success", "message": f"המשתמש {user.username} אושר"}), 200

# --- 6. אזור מנהל: צפייה בכל המשתמשים ---
@auth_bp.route('/all-users', methods=['GET'])
@role_required('Admin')
def get_all_users():
    """פונקציה למנהל לצורך ניהול כללי של המאגר"""
    all_users = User.query.all()
    users_list = [{
        "id": u.id,
        "username": u.username,
        "email": u.email,
        "role": u.role
    } for u in all_users]

    return jsonify(users_list), 200