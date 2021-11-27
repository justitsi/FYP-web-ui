from flask import Blueprint, request
from modules.util import generateResponse, generateError, verifyJob
from modules.job_scheduler import sendOptimisationJob, getJob
from models.models import Output, db

job_blueprint = Blueprint('job', __name__)


@job_blueprint.route('/submit', methods=['POST'])
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
    jobID = sendOptimisationJob(output.jobSpec, output.id)

    output.jobID = jobID.get_id()
    db.session.add(output)
    db.session.commit()

    return generateResponse({
        "outputID": output.id,
        "jobID": output.jobID,
        "created_time": output.created
    })


@job_blueprint.route('/status/<job_id>', methods=['GET'])
def check_job_status(job_id):
    job = getJob(job_id)

    if (job):
        status = job.get_status()

    else:
        status = 'NOT REGISTERED'

    return generateResponse({
        "job_id": job_id,
        "status": status
    })
