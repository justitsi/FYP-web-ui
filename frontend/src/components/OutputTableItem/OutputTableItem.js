import styles from './OutputTableItem.module.scss';
import { Accordion, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import CONSTANTS from '../../modules/CONSTANTS.json';
import { getRequest } from '../../modules/requests';


const OutputTableItem = (props) => {
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
    }, [])

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