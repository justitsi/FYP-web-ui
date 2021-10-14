import styles from './ProjectEditor.module.scss';
import { Row, Col, Form } from 'react-bootstrap';


const ProjectEditor = (props) => {
    const validateJson = (string) => {
        try {
            JSON.parse(string)
            return true
        }
        catch (e) { return false; }
    }

    const nameInvalid = ((props.projectName.length === 0) || (props.projectName.length >= 300));
    const dataInvalid = !validateJson(props.projectData);
    const optionsInvalid = !validateJson(props.projectOptions);

    props.setProjectValid((!nameInvalid) && (!dataInvalid) && (!optionsInvalid));

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
                        <Form.Label>Project Data</Form.Label>
                        <Form.Control as="textarea" rows={5}
                            placeholder="Project Data"
                            aria-label="Project Data"
                            isInvalid={dataInvalid}
                            value={props.projectData}
                            onChange={(event) => { props.setProjectData(event.target.value) }}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Project Options</Form.Label>
                        <Form.Control as="textarea" rows={4}
                            placeholder="Project Options"
                            aria-label="Project Options"
                            isInvalid={optionsInvalid}
                            value={props.projectOptions}
                            onChange={(event) => { props.setProjectOptions(event.target.value) }}
                        />
                    </Form.Group>
                </Col>
            </Row>
        </div>
    );
}

export default ProjectEditor;