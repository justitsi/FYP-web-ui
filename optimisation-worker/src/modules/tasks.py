from modules.jobRunner import jobRunner
import os
from datetime import datetime
from dotenv import load_dotenv

from sqlalchemy import create_engine
from modules.models.models import Output
from sqlalchemy.orm import sessionmaker


def run_optimisation_job(spec):
    job_spec = spec['spec']
    output_id = spec['id']

    # setup job complete
    runner = jobRunner(job_spec)

    print(spec)
    possible_trees = []
    possible_trees = runner.run()

    # connect to database and save data
    load_dotenv()
    DB_URL = os.getenv('DB_URL')
    DB_DBNAME = os.getenv('DB_DBNAME')
    DB_USER = os.getenv('DB_USER')
    DB_PASS = os.getenv('DB_PASS')

    db_url = 'postgresql://' + DB_USER+':'+DB_PASS+'@'+DB_URL+'/'+DB_DBNAME
    db = create_engine(db_url)
    Session = sessionmaker(db)
    session = Session()

    output = session.query(Output).filter_by(id=output_id).first()
    output.finished = datetime.now()
    output.results = possible_trees
    session.commit()
