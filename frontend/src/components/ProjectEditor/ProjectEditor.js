import styles from './ProjectEditor.module.scss';
import { Row, Col, Form } from 'react-bootstrap';
import BytesLabel from './../BytesLabel';
import { useState } from 'react';


const ProjectEditor = (props) => {
    const validateJson = (string) => {
        try {
            JSON.parse(string)
            return true
        }
        catch (e) { return false; }
    }

    const [nodesString, setNodesString] = useState(JSON.stringify(props.projectData.jobSpec.nodes))
    const [groupsString, setGroupsString] = useState(JSON.stringify(props.projectData.jobSpec.groups))
    const [algParamsString, setAlgParamsString] = useState(JSON.stringify(props.projectData.jobSpec.alg_params))
    const [costingParamsString, setCostingParamsString] = useState(JSON.stringify(props.projectData.jobSpec.costing_params))


    const nameInvalid = ((props.projectData.name.length === 0) || (props.projectData.name.length >= 300));
    // validate data
    const nodesInvalid = !validateJson(nodesString);
    const groupsInvalid = !validateJson(groupsString);
    // validate options
    const projectGeneralOptionsInvalid = !validateJson(algParamsString);
    const projectCostingOptionsInvalid = !validateJson(costingParamsString);

    // console.log(nameInvalid, nodesInvalid, groupsInvalid, projectGeneralOptionsInvalid, projectCostingOptionsInvalid);

    props.setProjectValid(
        (!nameInvalid) &&
        (!nodesInvalid) &&
        (!groupsInvalid) &&
        (!projectGeneralOptionsInvalid) &&
        (!projectCostingOptionsInvalid)
    );

    const updateName = (value) => {
        const dataCopy = JSON.parse(JSON.stringify(props.projectData))
        dataCopy['name'] = value;
        props.setProjectData(dataCopy);
    }

    const updateField = (name, value) => {
        const dataCopy = JSON.parse(JSON.stringify(props.projectData))
        dataCopy.jobSpec[name] = JSON.parse(value);
        props.setProjectData(dataCopy);
    }

    const updateNodes = (string) => {
        if (validateJson(string)) updateField('nodes', string)
        setNodesString(string);
    }

    const updateGroups = (string) => {
        if (validateJson(string)) updateField('groups', string)
        setGroupsString(string);
    }

    const updateAlgParamas = (string) => {
        if (validateJson(string)) updateField('alg_params', string)
        setAlgParamsString(string);
    }

    const updateCostingParamas = (string) => {
        if (validateJson(string)) updateField('costing_params', string)
        setCostingParamsString(string);
    }

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
                            value={props.projectData.name}
                            onChange={(event) => { updateName(event.target.value) }}
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
                            value={nodesString}
                            onChange={(event) => { updateNodes(event.target.value) }}
                        />
                        <BytesLabel bytes={new Blob([nodesString]).size} />
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
                            value={groupsString}
                            onChange={(event) => { updateGroups(event.target.value) }}
                        />
                        <BytesLabel bytes={new Blob([groupsString]).size} />
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
                            value={algParamsString}
                            onChange={(event) => { updateAlgParamas(event.target.value) }}
                        />
                        <BytesLabel bytes={new Blob([algParamsString]).size} />
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
                            value={costingParamsString}
                            onChange={(event) => { updateCostingParamas(event.target.value) }}
                        />
                        <BytesLabel bytes={new Blob([costingParamsString]).size} />
                    </Form.Group>
                </Col>
            </Row>
        </div>
    );
}

export default ProjectEditor;