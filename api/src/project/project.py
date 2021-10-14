import json
from flask import Blueprint, request
from datetime import datetime
from models.models import Project, db
from util import generateResponse, generateError

projects_blueprint = Blueprint('projects', __name__)


@projects_blueprint.route('/', methods=['GET', 'POST'])
def root_route():
    # try:
    if (request.method == 'GET'):
        db_projects = Project.query.all()
        projects = []

        for project in db_projects:
            projects.append({
                'id': project.id,
                'name': project.name,
                'modified': project.modified
            })

        return generateResponse(projects)
    if (request.method == 'POST'):
        try:
            project = Project(
                name=request.json["name"],
                data=json.dumps(request.json["data"]),
                runSettings=json.dumps(request.json["runSettings"])
            )
        except:
            return generateError(400, "Missing mandatory request paramaters in request body")

        db.session.add(project)
        db.session.commit()

        return generateResponse({
            "message": "Project created",
            "id": project.id

        })
    # except:
    #     return generateError(500, "Could not proccess request")


@projects_blueprint.route('/<projects_id>', methods=['GET', 'POST', 'DELETE'])
def manage_projects(projects_id):
    try:
        if (request.method == 'GET'):
            project = Project.query.filter_by(id=projects_id).first()

            if (project):
                return generateResponse(Project.jsonify(project))
            else:
                return generateError(404, "Project not found")
        if (request.method == 'POST'):
            project = Project.query.filter_by(id=projects_id).first()
            if (project):
                try:
                    project.name = request.json["name"]
                    project.data = json.dumps(request.json["data"])
                    project.runSettings = json.dumps(
                        request.json["runSettings"])
                except:
                    return generateError(400, "Missing mandatory request paramaters in request body")

                project.modified = datetime.now()
                db.session.commit()
                return generateResponse("Project modified")
            else:
                return generateError(404, "Project not found")
        if (request.method == 'DELETE'):
            project = Project.query.filter_by(id=projects_id).first()
            if (project):
                db.session.delete(project)
                db.session.commit()

                return generateResponse("Project deleted")
            else:
                return generateError(404, "Project not found")
    except:
        return generateError(500, "Could not proccess request")
