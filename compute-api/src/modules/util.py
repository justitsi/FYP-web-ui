from datetime import datetime

# helper functions for generating responses


def generateResponse(message):
    return {
        "status": "200",
        "data": message
    }


def generateError(code, message):
    return (
        {
            "status": code,
            "error": message
        },
        code
    )


def verifyJob(jobDict):
    try:
        alg_params = jobDict['alg_params']
        costing_params = jobDict['costing_params']
        groups = jobDict['groups']
        nodes = jobDict['nodes']

        if type(groups) is not list:
            return False
        if type(nodes) is not list:
            return False

        node_node = costing_params['node-node']
        node_group = costing_params['node-group']
        group_group = costing_params['group-group']

        node_node_pre_run = node_node['pre-run-costs']
        node_group_pre_run = node_group['pre-run-costs']
        node_group_runtime = node_group['runtime-costs']

        return True
    except:
        return False
