import styles from './ProjectEditor.module.scss';
import { Row, Col, Form } from 'react-bootstrap';
import BytesLabel from './../BytesLabel';


const ProjectEditor = (props) => {
    const validateJson = (string) => {
        try {
            JSON.parse(string)
            return true
        }
        catch (e) { return false; }
    }

    const nameInvalid = ((props.projectName.length === 0) || (props.projectName.length >= 300));
    // validate data
    const nodesInvalid = !validateJson(props.projectNodeData);
    const groupsInvalid = !validateJson(props.projectGroupData);
    // validate options
    const projectGeneralOptionsInvalid = !validateJson(props.projectGeneralOptions);
    const projectCostingOptionsInvalid = !validateJson(props.projectCostingOptions);


    props.setProjectValid(
        (!nameInvalid) &&
        (!nodesInvalid) &&
        (!groupsInvalid) &&
        (!projectGeneralOptionsInvalid) &&
        (!projectCostingOptionsInvalid)
    );

    return (
        <div className={styles.container}>
            <Row>
                <Col md={8}>
                    <Form.Group>
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control
                            placeholder="Project Name"
                            aria-label="Project Name"
                            isInvalid={nameInvalid}
                            value={props.projectName}
                            onChange={(event) => { props.setProjectName(event.target.value) }}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <br />
            <Row>
                <Col md={12}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Nodes Data</Form.Label>
                        <Form.Control as="textarea" rows={5}
                            placeholder="Nodes Data"
                            aria-label="Nodes Data"
                            isInvalid={nodesInvalid}
                            value={props.projectNodeData}
                            onChange={(event) => { props.setProjectNodeData(event.target.value) }}
                        />
                        <BytesLabel bytes={new Blob([props.projectNodeData]).size} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Groups Data</Form.Label>
                        <Form.Control as="textarea" rows={5}
                            placeholder="Groups Data"
                            aria-label="Groups Data"
                            isInvalid={groupsInvalid}
                            value={props.projectGroupData}
                            onChange={(event) => { props.setProjectGroupData(event.target.value) }}
                        />
                        <BytesLabel bytes={new Blob([props.projectGroupData]).size} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>General Project/Job Options</Form.Label>
                        <Form.Control as="textarea" rows={4}
                            placeholder="General Project/Job Options"
                            aria-label="General Project/Job Options"
                            isInvalid={projectGeneralOptionsInvalid}
                            value={props.projectGeneralOptions}
                            onChange={(event) => { props.setProjectGeneralOptions(event.target.value) }}
                        />
                        <BytesLabel bytes={new Blob([props.projectGeneralOptions]).size} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Costing Project/Job Options</Form.Label>
                        <Form.Control as="textarea" rows={4}
                            placeholder="Costing Project/Job Options"
                            aria-label="Costing Project/Job Options"
                            isInvalid={projectCostingOptionsInvalid}
                            value={props.projectCostingOptions}
                            onChange={(event) => { props.setProjectCostingOptions(event.target.value) }}
                        />
                        <BytesLabel bytes={new Blob([props.projectCostingOptions]).size} />
                    </Form.Group>
                </Col>
            </Row>
        </div>
    );
}

export default ProjectEditor;