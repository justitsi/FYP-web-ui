from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()


class Output(db.Model):
    __tablename__ = 'optimizer_output'
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer)

    created = db.Column(db.DateTime)
    finished = db.Column(db.DateTime)

    jobSpec = db.Column(db.PickleType)
    results = db.Column(db.PickleType)

    def __repr__(self):
        return '<Output %r>' % self.id

    def __init__(self, jobSpec, projectID):
        self.created = datetime.now()
        self.jobSpec = jobSpec
        self.project_id = projectID
        self.results = None

    def jsonify(self):
        data = {
            'id': self.id,
            'project_id': self.project_id,
            'created': self.created,
            'finished': self.finished,
            'jobSpec': self.jobSpec,
            'results': self.results
        }
        return data
