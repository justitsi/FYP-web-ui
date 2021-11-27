import styles from './ProjectEditor.module.scss';
import { Row, Col, Form } from 'react-bootstrap';
import { useState } from 'react';
import ProjectEditorTextBox from '../ProjectEditorTextBox';


const ProjectEditor = (props) => {
    const validateJson = (string) => {
        try {
            JSON.parse(string)
            return true
        }
        catch (e) { return false; }
    }

    const [nodesString, setNodesString] = useState(JSON.stringify(props.projectData.jobSpec.nodes, undefined, 4))
    const [groupsString, setGroupsString] = useState(JSON.stringify(props.projectData.jobSpec.groups, undefined, 4))
    const [algParamsString, setAlgParamsString] = useState(JSON.stringify(props.projectData.jobSpec.alg_params, undefined, 4))
    const [costingParamsString, setCostingParamsString] = useState(JSON.stringify(props.projectData.jobSpec.costing_params, undefined, 4))

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

    const copyObjectProperty = (destination, source, prop_name, def) => {
        if (source[prop_name]) destination[prop_name] = source[prop_name]
        else destination[prop_name] = def
    }

    const updateProjectData = (json_file) => {
        const reader = new FileReader();
        reader.onload = function () {
            const fileContent = JSON.parse(reader.result);
            const data = {}

            let name;
            if (fileContent.name) name = fileContent.name;
            else name = ''
            copyObjectProperty(data, fileContent, 'alg_params', {})
            copyObjectProperty(data, fileContent, 'costing_params', {})
            copyObjectProperty(data, fileContent, 'groups', [])
            copyObjectProperty(data, fileContent, 'nodes', [])

            setNodesString(JSON.stringify(fileContent.nodes, undefined, 4))
            setGroupsString(JSON.stringify(fileContent.groups, undefined, 4))
            setAlgParamsString(JSON.stringify(fileContent.alg_params, undefined, 4))
            setCostingParamsString(JSON.stringify(fileContent.costing_params, undefined, 4))

            const projCopy = JSON.parse(JSON.stringify(props.projectData))
            projCopy.jobSpec = data;
            props.setProjectData(projCopy);
        };
        reader.readAsText(json_file);
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
            <Row>
                <Col md={12}>
                    <ProjectEditorTextBox
                        label={"Nodes Data"}
                        value={nodesString}
                        update={updateNodes}
                        invalid={nodesInvalid}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <ProjectEditorTextBox
                        label={"Groups Data"}
                        value={groupsString}
                        update={updateGroups}
                        invalid={groupsInvalid}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <ProjectEditorTextBox
                        label={"General Project/Job Options"}
                        value={algParamsString}
                        update={updateAlgParamas}
                        invalid={projectGeneralOptionsInvalid}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <ProjectEditorTextBox
                        label={"Costing Project/Job Options"}
                        value={costingParamsString}
                        update={updateCostingParamas}
                        invalid={projectCostingOptionsInvalid}
                    />
                </Col>
            </Row>
            <Row>
                <Form.Group controlId="formFileSm" className="mb-3">
                    <Form.Label>Import job json</Form.Label>
                    <Form.Control type="file" size="sm" onChange={(e) => updateProjectData(e.target.files[0])} />
                </Form.Group>
            </Row>
        </div>
    );
}

export default ProjectEditor;