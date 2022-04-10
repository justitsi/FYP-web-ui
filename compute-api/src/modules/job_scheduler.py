from redis import Redis
from rq import Queue
from modules.tasks import run_optimisation_job
import os
from dotenv import load_dotenv


load_dotenv()
REDIS_URL = os.getenv('REDIS_URL')
REDIS_PORT = os.getenv('REDIS_PORT')
MAX_JOB_LENGTH = os.getenv('MAX_JOB_LENGTH')

redis_connection = Redis(host=REDIS_URL, port=REDIS_PORT, db=0)
q = Queue(connection=redis_connection)


def sendOptimisationJob(jobSpec, id):
    job = q.enqueue(
        run_optimisation_job,
        args=(
            {'spec': jobSpec, 'id': id},
        ),
        job_timeout=MAX_JOB_LENGTH
    )
    # print(json.dumps(job.to_dict(), indent=2, default=str))
    return job


def getJob(job_id):
    j = q.fetch_job(job_id)

    return j
