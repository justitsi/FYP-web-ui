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

    const [projectName, setProjectName] = useState("")
    const [projectData, setProjectData] = useState("")
    const [projectOptions, setProjectOptions] = useState("")
    const [projectValid, setProjectValid] = useState(false)


    const getProject = () => {
        setIsLoaded(false)
        const address = `${CONSTANTS.INTERFACE_API_LOCATION}/project/${id}`

        getRequest(address).then((result) => {
            setResponse(result)
            setIsLoaded(true)

            setProjectName(result.data.name)
            setProjectData(JSON.stringify(result.data.data))
            setProjectOptions(JSON.stringify(result.data.runSettings))

        }).catch((e) => console.log(e))
    }

    const updateProject = () => {
        const address = `${CONSTANTS.INTERFACE_API_LOCATION}/project/${id}`;

        const requestBody = JSON.stringify({
            "name": projectName,
            "data": JSON.parse(projectData),
            "runSettings": JSON.parse(projectOptions)
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
                                            projectData={projectData}
                                            setProjectData={setProjectData}
                                            projectOptions={projectOptions}
                                            setProjectOptions={setProjectOptions}
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