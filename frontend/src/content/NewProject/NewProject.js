import styles from './NewProject.module.scss';
import { Jumbotron, Row, Col, FormControl, InputGroup, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useHistory } from "react-router-dom";


import CONSTANTS from '../../modules/CONSTANTS.json';
import { postRequest } from '../../modules/requests';

const NewProject = (props) => {
    const [projectName, setProjectName] = useState("New Project")
    const history = useHistory();

    const handleProjectCreation = () => {
        const address = `${CONSTANTS.INTERFACE_API_LOCATION}/project/`;
        const requestBody = JSON.stringify({
            "name": projectName,
            "data": {},
            "runSettings": {}
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
                        <h1>{projectName}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={2} lg={3} />
                    <Col md={8} lg={6}>
                        <InputGroup>
                            <FormControl
                                placeholder="Project Name"
                                aria-label="Project Name"
                                value={projectName}
                                onChange={(event) => { setProjectName(event.target.value) }}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col md={2} lg={3} />
                    <Col md={8} lg={6}>
                        <Button className={styles.right} onClick={handleProjectCreation}>
                            Create
                        </Button>
                    </Col>
                </Row>
            </Jumbotron>
        </div>
    )
}
export default NewProject;