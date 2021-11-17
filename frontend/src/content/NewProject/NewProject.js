import styles from './NewProject.module.scss';
import { Jumbotron, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useHistory } from "react-router-dom";

import ProjectEditor from './../../components/ProjectEditor';
import CONSTANTS from '../../modules/CONSTANTS.json';
import { postRequest } from '../../modules/requests';

const NewProject = (props) => {
    const [projectName, setProjectName] = useState("New Project");
    const [projectGroupData, setProjectGroupData] = useState(JSON.stringify({ "example": "groups" }));
    const [projectNodeData, setProjectNodeData] = useState(JSON.stringify({ "example": "nodes" }));

    const [projectGeneralOptions, setProjectGeneralOptions] = useState(JSON.stringify({ "example": "run settings" }));
    const [projectCostingOptions, setProjectCostingOptions] = useState(JSON.stringify({ "example": "costing settings" }));

    const [projectValid, setProjectValid] = useState(false);

    const history = useHistory();

    const handleProjectCreation = () => {
        const address = `${CONSTANTS.INTERFACE_API_LOCATION}/project/`;
        const requestBody = JSON.stringify({
            "name": projectName,

            "node_data": JSON.parse(projectNodeData),
            "group_data": JSON.parse(projectGroupData),

            "general_options": JSON.parse(projectGeneralOptions),
            "costing_options": JSON.parse(projectCostingOptions)
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
                        <h1 className={styles.heading}>{projectName}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={2} lg={3} />
                    <Col md={8} lg={6}>
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