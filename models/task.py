from app import db 

class Task(db.Document):
    
    description = db.StringField()
    order = db.IntField()
    done = db.BoolField(default=False)
    