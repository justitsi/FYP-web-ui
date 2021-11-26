import styles from './NewProject.module.scss';
import { Jumbotron, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useHistory } from "react-router-dom";

import ProjectEditor from './../../components/ProjectEditor';
import CONSTANTS from '../../modules/CONSTANTS.json';
import default_project from '../../modules/default_project.json';
import { postRequest } from '../../modules/requests';

const NewProject = (props) => {
    const [projectData, setProjectData] = useState(default_project);
    const [projectValid, setProjectValid] = useState(false);
    const history = useHistory();

    const handleProjectCreation = () => {
        const address = `${CONSTANTS.INTERFACE_API_LOCATION}/project/`;
        const requestBody = JSON.stringify({
            "name": projectData.name,

            "node_data": projectData.jobSpec.nodes,
            "group_data": projectData.jobSpec.groups,

            "general_options": projectData.jobSpec.alg_params,
            "costing_options": projectData.jobSpec.costing_params
        });

        postRequest(address, requestBody).then((result) => {
            if (parseInt(result.status) === 200) {
                history.push(`/project/${result.data.id}`);
            }
            else {
                console.log("Error when creating project")
                console.log(result)
            }
        }).catch((e) => console.log(e))
    }

    return (
        <div className={styles.page}>
            <Jumbotron>
                <Row>
                    <Col md={2} lg={3} />
                    <Col md={8} lg={6}>
                        <h1 className={styles.heading}>{projectData.name}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={2} lg={3} />
                    <Col md={8} lg={6}>
                        <ProjectEditor
                            projectData={projectData}
                            setProjectData={setProjectData}
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
                <br />
            </Jumbotron>
        </div>
    )
}
export default NewProject;