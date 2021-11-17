from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()


class Output(db.Model):
    __tablename__ = 'optimizer_output'
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer)
    started = db.Column(db.DateTime)
    results = db.Column(db.PickleType)

    def __repr__(self):
        return '<Output %r>' % self.id

    def __init__(self, id):
        self.id = id
        self.started = datetime.now()
        self.results = None

    def jsonify(self):
        data = {
            'id': self.id,
            'started': self.started,
            'results': self.results
        }
        return (data)
