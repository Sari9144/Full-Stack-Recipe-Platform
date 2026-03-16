
# import json
# from DataBase import db
# from claases.BaseModel import BaseModel

# class Recipe(BaseModel):
#     title = db.Column(db.String(100), nullable=False)
#     image_path = db.Column(db.String(255))
#     variation_paths = db.Column(db.Text) # נשמר כסטרינג של JSON

#     # אינדקסים לביצועים מהירים בסינונים (כשרות, קטגוריה, זמן)
#     type = db.Column(db.String(20), index=True)  
#     category = db.Column(db.String(50), index=True)
#     prep_time = db.Column(db.Integer, index=True)

#     instructions = db.Column(db.Text, nullable=False)
#     created_by_user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
#     created_by_name = db.Column(db.String(100), index=True)

#     # קשר לרכיבים - כשימחקו מתכון, גם הרכיבים שלו יימחקו (cascade)
#     ingredients = db.relationship('IngredientEntry', backref='recipe', lazy=True, cascade="all, delete-orphan")

#     def get_variations(self):
#         """ממיר את מחרוזת ה-JSON מה-DB לרשימת פייתון אמיתית"""
#         try:
#             return json.loads(self.variation_paths) if self.variation_paths else []
#         except:
#             return []
#     def get_variations(self):
#         """ממיר את מחרוזת ה-JSON מה-DB לרשימת פייתון אמיתית"""
#         try:
#             return json.loads(self.variation_paths) if self.variation_paths else []
#         except:
#             return []

#     def to_dict(self):
#         """הופך את האובייקט למילון עבור ה-API"""
#         data = super().to_dict() # לוקח את ה-id והשדות הבסיסיים מה-BaseModel
#         data['variation_paths'] = self.get_variations()
#         # מוסיף את הרכיבים על ידי קריאה ל-to_dict של כל רכיב
#         data['ingredients'] = [i.to_dict() for i in self.ingredients]
#         return data

import json
from DataBase import db
from claases.BaseModel import BaseModel

class Recipe(BaseModel):
    title = db.Column(db.String(100), nullable=False)
    image_path = db.Column(db.String(255))
    variation_paths = db.Column(db.Text) # נשמר כסטרינג של JSON

    type = db.Column(db.String(20), index=True)  
    category = db.Column(db.String(50), index=True)
    prep_time = db.Column(db.Integer, index=True)

    instructions = db.Column(db.Text, nullable=False)
    created_by_user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_by_name = db.Column(db.String(100), index=True)

    ingredients = db.relationship('IngredientEntry', backref='recipe', lazy=True, cascade="all, delete-orphan")

    # --- הפונקציה החדשה שחסרה לך ---
    def set_variations(self, variations_list):
        """הופכת רשימת פייתון למחרוזת JSON עבור ה-DB"""
        if variations_list is not None:
            self.variation_paths = json.dumps(variations_list)
        else:
            self.variation_paths = json.dumps([])

    def get_variations(self):
        """ממיר את מחרוזת ה-JSON מה-DB לרשימת פייתון אמיתית"""
        try:
            return json.loads(self.variation_paths) if self.variation_paths else []
        except:
            return []

    def to_dict(self):
        data = super().to_dict() 
        data['variation_paths'] = self.get_variations()
        data['ingredients'] = [i.to_dict() for i in self.ingredients]
        return data