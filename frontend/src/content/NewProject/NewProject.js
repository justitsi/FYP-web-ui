import styles from './NewProject.module.scss';
import { Jumbotron, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useHistory } from "react-router-dom";

import ProjectEditor from './../../components/ProjectEditor';
import CONSTANTS from '../../modules/CONSTANTS.json';
import { postRequest } from '../../modules/requests';

const NewProject = (props) => {
    const [projectName, setProjectName] = useState("New Project");
    const [projectData, setProjectData] = useState(JSON.stringify({ "example": "data" }));
    const [projectOptions, setProjectOptions] = useState(JSON.stringify({ "example": "settings" }));
    const [projectValid, setProjectValid] = useState(false);

    const history = useHistory();

    const handleProjectCreation = () => {
        const address = `${CONSTANTS.INTERFACE_API_LOCATION}/project/`;
        const requestBody = JSON.stringify({
            "name": projectName,
            "data": JSON.parse(projectData),
            "runSettings": JSON.parse(projectOptions)
        });

        postRequest(address, requestBody).then((result) => {
            if (parseInt(result.status) === 200) {
                history.push("/");
            }
            else {
                console.log("Error when creating project")
            }
        }).catch((e) => console.log(e))
    }

    return (
        <div className={styles.page}>
            <Jumbotron>
                <Row>
                    <Col md={2} lg={3} />
                    <Col md={8} lg={6}>
                        <ProjectEditor
                            projectName={projectName}
                            setProjectName={setProjectName}
                            projectData={projectData}
                            setProjectData={setProjectData}
                            projectOptions={projectOptions}
                            setProjectOptions={setProjectOptions}
                            setProjectValid={setProjectValid}
                        />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col md={2} lg={3} />
                    <Col md={8} lg={6}>
                        <Button
                            className={styles.right}
                            onClick={handleProjectCreation}
                            disabled={!projectValid}
                        >
                            Create
                        </Button>
                    </Col>
                </Row>
            </Jumbotron>
        </div>
    )
}
export default NewProject;