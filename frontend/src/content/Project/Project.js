import styles from './Project.module.scss';
import { useParams } from "react-router-dom";
import { Row, Col, Button } from 'react-bootstrap';
import CONSTANTS from '../../modules/CONSTANTS.json';
import { getRequest, postRequest, deleteRequest } from '../../modules/requests';
import { useState, useEffect } from 'react';
import ProjectEditor from './../../components/ProjectEditor';
import OutputTable from '../../components/OutputTable/OutputTable';
import { validateJob } from '../../modules/jobs';


const Project = (props) => {
    const { id } = useParams();

    const [isLoaded, setIsLoaded] = useState(false)
    const [response, setResponse] = useState({ status: 200 })
    const [projectValid, setProjectValid] = useState(false);
    const [projectOutputs, setProjectOutputs] = useState([]);

    const [projectData, setProjectData] = useState();

    const getProject = () => {
        const address_project = `${CONSTANTS.INTERFACE_API_LOCATION}/project/${id}`
        const address_outputs = `${CONSTANTS.INTERFACE_API_LOCATION}/output/byProject//${id}`

        getRequest(address_project).then((result_project) => {
            getRequest(address_outputs).then((result_outputs) => {
                if (parseInt(result_project.status) == 200) {
                    const jobSpec = {
                        costing_params: result_project.data.costing_options,
                        alg_params: result_project.data.general_options,
                        nodes: result_project.data.node_data,
                        groups: result_project.data.group_data
                    }

                    const projectDataTmp = {
                        "name": result_project.data.name,
                        "jobSpec": jobSpec
                    }

                    setProjectData(projectDataTmp)
                    setProjectOutputs(result_outputs.data)
                }

                setResponse(result_project)
                setIsLoaded(true)
            }).catch((e) => console.log(e))
        }).catch((e) => console.log(e))
    }

    const updateProject = () => {
        const address = `${CONSTANTS.INTERFACE_API_LOCATION}/project/${id}`;

        const requestBody = JSON.stringify({
            "name": projectData.name,

            "node_data": projectData.jobSpec.nodes,
            "group_data": projectData.jobSpec.groups,

            "general_options": projectData.jobSpec.alg_params,
            "costing_options": projectData.jobSpec.costing_params
        });

        postRequest(address, requestBody).then((result) => {
            if (parseInt(result.status) === 200) {
                getProject()
            }
            else {
                console.log("Error when updating project")
                console.log(result)
            }
        }).catch((e) => console.log(e))
    }

    const runProject = () => {
        // save current project spec, build job specification and send it to compute api, then update _entire_ page state
        const submit_job_address = `${CONSTANTS.COMPUTE_API_LOCATION}/job/submit`;
        const update_project_address = `${CONSTANTS.INTERFACE_API_LOCATION}/project/${id}`;

        const saveRequestBody = JSON.stringify({
            "name": projectData.name,

            "node_data": projectData.jobSpec.nodes,
            "group_data": projectData.jobSpec.groups,

            "general_options": projectData.jobSpec.alg_params,
            "costing_options": projectData.jobSpec.costing_params
        });

        postRequest(update_project_address, saveRequestBody).then((save_results) => {
            if (parseInt(save_results.status) === 200) {
                const job_object = {
                    projectId: id,
                    jobSpec: projectData.jobSpec
                }

                if (validateJob(job_object)) {
                    postRequest(submit_job_address, JSON.stringify(job_object)).then((result) => {
                        if (parseInt(result.status) === 200) {
                            getProject();
                        }
                        else {
                            console.log(result);
                        }
                    })
                } else {
                    console.log("Invalid job specification");
                }
            }
            else {
                console.log("Error when updating project")
                console.log(save_results)
            }
        }).catch((e) => console.log(e))
    }

    const deleteOutput = (output_id) => {
        const output_address = `${CONSTANTS.INTERFACE_API_LOCATION}/output/byID/${output_id}`
        deleteRequest(output_address).then((result) => {
            if (parseInt(result.status) === 200) {
                getProject();
            }
        }).catch((e) => console.log(e))
    }

    useEffect(() => {
        getProject();
    }, [id])

    return (
        <div className={styles.page}>
            <br />
            {(isLoaded) &&
                <div>
                    {(parseInt(response.status) === 200) &&
                        <div>
                            <Row>
                                <Col md={1} />
                                <Col md={5}>
                                    <h1 className={styles.heading}>{projectData.name}</h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={1} />
                                <Col md={7}>
                                    <Row>
                                        <ProjectEditor
                                            projectData={projectData}
                                            setProjectData={setProjectData}
                                            setProjectValid={setProjectValid}
                                        />
                                    </Row>
                                    <Row>
                                        <Col md={1}>
                                            <Button
                                                className={styles.right}
                                                onClick={updateProject}
                                                disabled={!projectValid}
                                            >
                                                Update
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={3}>
                                    <Row>
                                        < OutputTable
                                            projectOutputs={projectOutputs}
                                            deleteFunction={deleteOutput}
                                        />
                                    </Row>
                                    <br />
                                    <Row>

                                        <Col md={1}>
                                            <Button
                                                className={styles.right}
                                                onClick={runProject}
                                                disabled={!projectValid}
                                                variant="success"
                                            >
                                                Run
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <br />
                        </div>
                    }
                    {(parseInt(response.status) === 404) &&
                        <Row>
                            <Col md={2} />
                            <Col md={8}>
                                <h4>404 - Project {id} not found</h4>
                            </Col>
                        </Row>
                    }
                </div>
            }
        </div>
    )
}
export default Project;