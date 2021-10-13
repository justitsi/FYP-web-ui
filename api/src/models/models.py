from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
db = SQLAlchemy()


class Project(db.Model):
    __tablename__ = 'frontend_api_project'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300), nullable=False)

    data = db.Column(db.Text)
    runSettings = db.Column(db.Text)
    modified = db.Column(db.DateTime)

    def __repr__(self):
        return '<Project %r>' % self.id

    def __init__(self, name, data, runSettings):
        self.name = name
        self.data = data
        self.runSettings = runSettings
        self.modified = datetime.now()

    def jsonify(self):
        data = {
            'id': self.id,
            'name': self.name,
            'modified': self.modified,
            'data': self.data,
            'runSettings': self.runSettings
        }
        return (data)


class Output(db.Model):
    __tablename__ = 'optimizer_output'
    id = db.Column(db.Integer, primary_key=True)

    def __repr__(self):
        return '<Output %r>' % self.id

    def __init__(self, id):
        self.id = id

    def jsonify(self):
        data = {
            'id': self.id,
        }
        return (data)
