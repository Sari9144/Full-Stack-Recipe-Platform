

from DataBase import db
from claases.BaseModel import BaseModel

# 1. טבלת קשר Many-to-Many עבור המועדפים
favorites = db.Table('favorites',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('recipe_id', db.Integer, db.ForeignKey('recipe.id'), primary_key=True)
)

class User(BaseModel):
    # שדות בסיסיים
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    
    # שינוי מ-user_name ל-username כדי לפתור את שגיאת ה-Internal Server Error
    username = db.Column(db.String(100), nullable=False)

    # ניהול הרשאות
    # תפקידים: 'Admin', 'Uploader', 'Reader'
    role = db.Column(db.String(20), default='Reader')
    
    # האם המנהל אישר אותו כמעלה תוכן
    is_approved_uploader = db.Column(db.Boolean, default=False)

    # 2. קשר למתכונים שהמשתמש יצר (One-to-Many)
    # מאפשר לעשות: user.my_recipes
    my_recipes = db.relationship('Recipe', backref='author', lazy=True)

    # 3. קשר למתכונים מועדפים (Many-to-Many)
    # מאפשר לעשות: user.favorite_recipes.append(recipe)
    favorite_recipes = db.relationship('Recipe',
                                        secondary=favorites,
                                        backref=db.backref('favorited_by', lazy='dynamic'))

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username, # עודכן ל-username
            "role": self.role,
            "is_approved_uploader": self.is_approved_uploader,
            # מחזירים רק את ה-ID של המועדפים כדי לא להכביד על ה-JSON
            "favorite_recipe_ids": [r.id for r in self.favorite_recipes]
        }