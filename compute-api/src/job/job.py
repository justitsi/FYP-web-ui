from flask import Blueprint, request
from modules.util import generateResponse, generateError, verifyJob
from models.models import Output, db


job_blueprint = Blueprint('job', __name__)


@job_blueprint.route('/', methods=['POST'])
def process_job():
    try:
        if not verifyJob(request.json['jobSpec']):
            return generateError(400, "Invalid job spec")

        output = Output(
            jobSpec=request.json['jobSpec'],
            projectID=request.json['projectId'],
        )
    except:
        return generateError(400, "Missing mandatory request paramaters in request body")

    db.session.add(output)
    db.session.commit()

    return generateResponse({
        "output_id": output.id,
        "created_time": output.created
    })
