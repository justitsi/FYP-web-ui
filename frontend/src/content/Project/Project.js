import styles from './Project.module.scss';
import { useParams } from "react-router-dom";
import { Jumbotron, Row, Col, Button } from 'react-bootstrap';
import CONSTANTS from '../../modules/CONSTANTS.json';
import default_project from '../../modules/default_project.json';
import { getRequest, postRequest } from '../../modules/requests';
import { useState, useEffect } from 'react';
import ProjectEditor from './../../components/ProjectEditor';
import OutputTable from '../../components/OutputTable/OutputTable';

const Project = (props) => {
    const { id } = useParams();

    const [isLoaded, setIsLoaded] = useState(false)
    const [response, setResponse] = useState({ status: 200 })
    const [projectValid, setProjectValid] = useState(false);
    const [projectOutputs, setProjectOutputs] = useState([]);

    const [projectData, setProjectData] = useState();

    const getProject = () => {
        setIsLoaded(false)
        const address_project = `${CONSTANTS.INTERFACE_API_LOCATION}/project/${id}`
        const address_outputs = `${CONSTANTS.INTERFACE_API_LOCATION}/output/byProject//${id}`

        getRequest(address_project).then((result_project) => {
            getRequest(address_outputs).then((result_outputs) => {
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

    useEffect(() => {
        getProject();
    }, [id])

    return (
        <div className={styles.page}>
            <br />
            {(isLoaded) &&
                <div>
                    {(parseInt(response.status) === 200) &&
                        <Jumbotron>
                            <Row>
                                <Col md={1} />
                                <Col md={5}>
                                    <h1 className={styles.heading}>{projectData.name}</h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={1} />
                                <Col md={5}>
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
                                <Col>
                                    < OutputTable
                                        projectOutputs={projectOutputs}
                                    />
                                </Col>
                            </Row>
                            <br />
                        </Jumbotron>
                    }
                    {(parseInt(response.status) === 404) &&
                        <Row>
                            <Col md={2} />
                            <Col md={8}>
                                <h1>Project {`<${id}>`} not found</h1>
                            </Col>
                        </Row>
                    }
                </div>
            }
        </div>
    )
}
export default Project;