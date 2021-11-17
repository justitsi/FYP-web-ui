from flask import Blueprint, request
from models.models import Output, db
from util import generateResponse, generateError

outputs_blueprint = Blueprint('outputs', __name__)


@outputs_blueprint.route('/', methods=['GET'])
def root_route():
    # try:
    db_results = Output.query.all()
    results = []

    for result in db_results:
        results.append({
            'id': result.id,
            'project_id': result.project_id,
            'created': result.created
        })

    return generateResponse(results)
    # except:
    #     return generateError(500, "Could not proccess request")


@outputs_blueprint.route('/byProject/<projectId>', methods=['GET'])
def get_outputs_for_project(projectId):
    # try:
    db_results = Output.query.filter_by(project_id=projectId)
    results = []

    for result in db_results:
        results.append({
            'id': result.id,
            'project_id': result.project_id,
            'created': result.created
        })

    return generateResponse(results)
    # except:
    #     return generateError(500, "Could not proccess request")


@outputs_blueprint.route('/byID/<outputID>', methods=['GET', 'DELETE'])
def manage_by_id(outputID):
    # try:
    result = Output.query.filter_by(id=outputID).first()
    if not result:
        return generateError(404, "Output not found")

    if (request.method == 'GET'):
        return generateResponse(Output.jsonify(result))

    if (request.method == 'DELETE'):
        db.session.delete(result)
        db.session.commit()
        return generateResponse("Output deleted")

    # except:
    #     return generateError(500, "Could not proccess request")
