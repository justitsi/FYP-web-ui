import styles from './Project.module.scss';
import { useParams } from "react-router-dom";
import { Jumbotron, Row, Col, Button } from 'react-bootstrap';
import CONSTANTS from '../../modules/CONSTANTS.json';
import { getRequest, postRequest } from '../../modules/requests';
import { useState, useEffect } from 'react';
import ProjectEditor from './../../components/ProjectEditor'

const Project = (props) => {
    const { id } = useParams();

    const [isLoaded, setIsLoaded] = useState(false)
    const [response, setResponse] = useState(null)

    const [projectName, setProjectName] = useState("New Project");
    const [projectGroupData, setProjectGroupData] = useState(JSON.stringify({ "example": "groups" }));
    const [projectNodeData, setProjectNodeData] = useState(JSON.stringify({ "example": "nodes" }));
    const [projectGeneralOptions, setProjectGeneralOptions] = useState(JSON.stringify({ "example": "run settings" }));
    const [projectCostingOptions, setProjectCostingOptions] = useState(JSON.stringify({ "example": "costing settings" }));
    const [projectValid, setProjectValid] = useState(false)


    const getProject = () => {
        setIsLoaded(false)
        const address = `${CONSTANTS.INTERFACE_API_LOCATION}/project/${id}`

        getRequest(address).then((result) => {
            setResponse(result)
            setIsLoaded(true)

            setProjectName(result.data.name)
            setProjectGroupData(JSON.stringify(result.data.group_data))
            setProjectNodeData(JSON.stringify(result.data.node_data))
            setProjectGeneralOptions(JSON.stringify(result.data.general_options))
            setProjectCostingOptions(JSON.stringify(result.data.costing_options))

        }).catch((e) => console.log(e))
    }

    const updateProject = () => {
        const address = `${CONSTANTS.INTERFACE_API_LOCATION}/project/${id}`;

        const requestBody = JSON.stringify({
            "name": projectName,

            "node_data": JSON.parse(projectNodeData),
            "group_data": JSON.parse(projectGroupData),

            "general_options": JSON.parse(projectGeneralOptions),
            "costing_options": JSON.parse(projectCostingOptions)
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
                                    <h1 className={styles.heading}>{projectName}</h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={1} />
                                <Col md={5}>
                                    <Row>
                                        <ProjectEditor
                                            projectName={projectName}
                                            setProjectName={setProjectName}
                                            // group data props
                                            projectGroupData={projectGroupData}
                                            setProjectGroupData={setProjectGroupData}
                                            // node data props
                                            projectNodeData={projectNodeData}
                                            setProjectNodeData={setProjectNodeData}
                                            // job general options
                                            projectGeneralOptions={projectGeneralOptions}
                                            setProjectGeneralOptions={setProjectGeneralOptions}
                                            // job costing options
                                            projectCostingOptions={projectCostingOptions}
                                            setProjectCostingOptions={setProjectCostingOptions}

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