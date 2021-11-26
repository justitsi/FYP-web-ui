import styles from './OutputTableItem.module.scss';
import { Accordion, Button } from 'react-bootstrap';


const OutputTableItem = (props) => {
    console.log(props.data);



    return (
        <Accordion.Item eventKey={props.data.id}>
            <Accordion.Header>Output {props.data.id}</Accordion.Header>
            <Accordion.Body>
                <ul>
                    <li>Project ID: {props.data.project_id}</li>

                    <li>Job created: {props.data.created}</li>
                    <li>Job Started: {props.data.started}</li>
                    <li>Job finished: {props.data.finished}</li>
                    <li>Job ID: {props.data.jobID}</li>
                </ul>
                <div >
                    <Button className={styles.spaceRight}>
                        View
                    </Button>
                    <Button>
                        Delete
                    </Button>
                </div>
            </Accordion.Body>
        </Accordion.Item>
    );
}
export default OutputTableItem;