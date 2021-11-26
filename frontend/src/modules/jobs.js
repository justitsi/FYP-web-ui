export const buildJobFromProjectData = (project_json) => {
    const job_object = {
        projectId: project_json.id,
        jobSpec: {
            costing_params: project_json.costing_options,
            alg_params: project_json.general_options,
            groups: project_json.group_data,
            nodes: project_json.node_data,
        }
    }

    return job_object;
}

export const validateJob = (spec) => {
    try {
        const job_json = spec['jobSpec'];

        let alg_params = job_json['alg_params']
        let costing_params = job_json['costing_params']
        let groups = job_json['groups']
        let nodes = job_json['nodes']


        if (!Array.isArray(groups)) return false
        if (!Array.isArray(nodes)) return false

        let node_node = costing_params['node-node']
        let node_group = costing_params['node-group']
        let group_group = costing_params['group-group']

        let node_node_pre_run = node_node['pre-run-costs']
        let node_group_pre_run = node_group['pre-run-costs']
        let node_group_runtime = node_group['runtime-costs']

        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}