import { Form } from 'react-bootstrap';
import BytesLabel from './../BytesLabel';

const ProjectEditorTextBox = (props) => {
    return (
        <div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>{props.label}</Form.Label>
                <Form.Control as="textarea" rows={12}
                    placeholder={props.label}
                    aria-label={props.label}

                    isInvalid={props.invalid}
                    value={props.value}
                    onChange={(event) => { props.update(event.target.value) }}
                />
                <BytesLabel bytes={new Blob([props.value]).size} />
            </Form.Group>
        </div>
    )
}
export default ProjectEditorTextBox;