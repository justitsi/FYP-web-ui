import json
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
db = SQLAlchemy()


class Project(db.Model):
    __tablename__ = 'frontend_api_project'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300), nullable=False)

    node_data = db.Column(db.PickleType)
    group_data = db.Column(db.PickleType)

    run_costing_settings = db.Column(db.PickleType)
    run_settings = db.Column(db.PickleType)

    modified = db.Column(db.DateTime)

    def __repr__(self):
        return '<Project %r>' % self.id

    def __init__(self, name, node_data, group_data, run_costing_settings, run_settings):
        self.name = name
        self.node_data = node_data
        self.group_data = group_data
        self.run_costing_settings = run_costing_settings
        self.run_settings = run_settings
        self.modified = datetime.now()

    def jsonify(self):
        data = {
            'id': self.id,
            'name': self.name,
            'modified': self.modified,
            'node_data': self.node_data,
            'group_data': self.group_data,
            'costing_options': self.run_costing_settings,
            'general_options': self.run_settings,
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
