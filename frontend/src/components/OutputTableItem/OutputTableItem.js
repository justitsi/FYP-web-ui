import styles from './OutputTableItem.module.scss';
import { Accordion, Button, ListGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import CONSTANTS from '../../modules/CONSTANTS.json';
import { getRequest } from '../../modules/requests';
import { useHistory } from "react-router-dom";


const OutputTableItem = (props) => {
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState("")

    const getStatus = () => {
        setIsLoaded(false)
        const address = `${CONSTANTS.COMPUTE_API_LOCATION}/job/status/${props.data.jobID}`;

        getRequest(address).then((result) => {
            if (parseInt(result.status) === 200) {
                if (result.data.status !== "NOT REGISTERED") {
                    setMessage(result.data.status)
                    setIsLoaded(true)
                    setTimeout(function () { getStatus() }, 30000)
                }
            }
        })
    }

    useEffect(() => {
        getStatus();
    }, [props.data])

    const viewOutput = () => {
        history.push(`/output/${props.data.id}`);
    }

    let text = '';
    if (isLoaded) {
        text = ` ${message}`;
    }

    return (
        <Accordion.Item eventKey={props.data.id}>
            <Accordion.Header>
                Job {props.data.id} {text}

            </Accordion.Header>
            <Accordion.Body>
                <ListGroup>
                    <ListGroup.Item>Project ID: {props.data.project_id}</ListGroup.Item>
                    <ListGroup.Item>Job created: {props.data.created}</ListGroup.Item>
                    <ListGroup.Item>Job Started: {props.data.started}</ListGroup.Item>
                    <ListGroup.Item>Job finished: {props.data.finished}</ListGroup.Item>
                    <ListGroup.Item>Job ID: {props.data.jobID}</ListGroup.Item>
                </ListGroup>
                <br />
                <div >
                    <Button onClick={viewOutput} className={styles.spaceRight}>
                        View
                    </Button>
                    <Button variant="danger">
                        Delete
                    </Button>
                </div>
            </Accordion.Body>
        </Accordion.Item>
    );
}
export default OutputTableItem;