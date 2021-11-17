from flask import Blueprint, request
from util import generateResponse, generateError
from models.models import Output, db


job_blueprint = Blueprint('job', __name__)


@job_blueprint.route('/', methods=['POST'])
def process_job():
    # try:
    output = Output(
        jobSpec=request.json['jobSpec'],
        projectID=request.json['projectId'],
    )
    # except:
    #     return generateError(400, "Missing mandatory request paramaters in request body")

    db.session.add(output)
    db.session.commit()

    return generateResponse({
        "output_id": output.id,
        "created_time": output.created
    })
