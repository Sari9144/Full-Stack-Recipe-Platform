from DataBase import db   # ייבוא ה-db והבסיס מקובץ האפליקציה
from  claases.BaseModel import  BaseModel
class IngredientEntry(BaseModel):
    product = db.Column(db.String(100), nullable=False)  # שם הרכיב (למשל: סוכר)
    amount = db.Column(db.Float, nullable=False)  # כמות (למשל: 1.5)
    unit = db.Column(db.String(50))  # יחידה (למשל: כוס)

    # מפתח זר - מקשר את הרכיב למתכון ספציפי
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'), nullable=False)