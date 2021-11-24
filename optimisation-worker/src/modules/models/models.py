from datetime import datetime

from sqlalchemy import Column, String, PickleType, DateTime, Integer
from sqlalchemy.ext.declarative import declarative_base

base = declarative_base()


class Output(base):
    __tablename__ = 'optimizer_output'
    id = Column(Integer, primary_key=True)
    project_id = Column(Integer)
    jobID = Column(String(300))

    created = Column(DateTime)
    started = Column(DateTime)
    finished = Column(DateTime)

    jobSpec = Column(PickleType)
    results = Column(PickleType)

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
            'jobID': self.jobID,
            'created': self.created,
            'started': self.started,
            'finished': self.finished,
            'jobSpec': self.jobSpec,
            'results': self.results
        }
        return data
