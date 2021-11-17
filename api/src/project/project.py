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
                node_data=request.json["node_data"],
                group_data=request.json["group_data"],
                run_costing_settings=request.json["costing_options"],
                run_settings=request.json["general_options"]
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
    # try:
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
                project.name = request.json["name"],
                project.node_data = request.json["node_data"],
                project.group_data = request.json["group_data"],
                project.run_costing_settings = request.json["costing_options"],
                project.run_settings = request.json["general_options"]
            except:
                return generateError(400, "Missing mandatory request paramaters in request body")

            # address flask bug where nested json objects might show up as tuples
            if (type(project.node_data) is tuple):
                project.node_data = project.node_data[0]
            if (type(project.group_data) is tuple):
                project.group_data = project.group_data[0]
            if (type(project.run_costing_settings) is tuple):
                project.run_costing_settings = project.run_costing_settings[0]
            if (type(project.run_settings) is tuple):
                project.run_settings = project.run_settings[0]

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
    # except:
    #     return generateError(500, "Could not proccess request")
