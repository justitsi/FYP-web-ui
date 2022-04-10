from modules.jobRunner import jobRunner
import os
from datetime import datetime
from dotenv import load_dotenv

from sqlalchemy import create_engine
from modules.models.models import Output
from sqlalchemy.orm import sessionmaker


def run_optimisation_job(spec):
    # setup job
    job_spec = spec['spec']
    output_id = spec['id']
    runner = jobRunner(job_spec)

    # connect to database and set started time
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

    output.started = datetime.now()
    session.commit()

    # run optimisation
    best_solutions = []
    possible_trees = runner.getBestPairings()

    # get the best solution and only store it
    if len(possible_trees) > 0:
        best_tree = possible_trees[0]

        for tree in possible_trees:
            if tree['cost'] <= best_tree['cost']:
                best_tree = tree

        # order groups in the best tree discovered
        best_order = runner.getOptimalGroupOrder(best_tree)

        best_solutions.append(best_order)

        # save result
        output.finished = datetime.now()
        output.results = best_solutions
        session.commit()
        session.close()
    else:
        session.close()
