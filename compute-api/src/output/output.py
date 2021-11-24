from flask import Blueprint, request
from models.models import Output, db
from modules.util import generateResponse, generateError

output_blueprint = Blueprint('outputs', __name__)


@output_blueprint.route('/', methods=['GET'])
def root_route():
    # try:
    db_results = Output.query.all()
    results = []

    for result in db_results:
        job_finished = False
        if (result.finished):
            job_finished = result.finished

        results.append({
            'id': result.id,
            'project_id': result.project_id,
            'jobID': result.jobID,
            'created': result.created,
            'started': result.started,
            'finished': job_finished
        })

    return generateResponse(results)
    # except:
    #     return generateError(500, "Could not proccess request")


@output_blueprint.route('/byID/<outputID>', methods=['GET', 'DELETE'])
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
