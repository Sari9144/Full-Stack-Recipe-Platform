
from DataBase import db

class BaseModel(db.Model):
    __abstract__ = True
    id = db.Column(db.Integer, primary_key=True)

    def save(self):
        try:
            db.session.add(self)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise e

    def to_dict(self):
        """
        הופכת כל מודל למילון באופן אוטומטי.
        זה קריטי כדי שנוכל להחזיר נתונים ל-Angular בפורמט JSON.
        """
        dictionary = {}
        # מעבר על כל העמודות שמוגדרות בטבלה
        for column in self.__table__.columns:
            value = getattr(self, column.name)
            dictionary[column.name] = value
        return dictionary