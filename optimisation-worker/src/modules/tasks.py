from modules.jobRunner import jobRunner


def run_optimisation_job(spec):
    job_spec = spec['spec']
    job_id = spec['id']
    runner = jobRunner(job_spec)
    print(spec)

    # possible_trees = runner.run()
    return "Started job Runner"
