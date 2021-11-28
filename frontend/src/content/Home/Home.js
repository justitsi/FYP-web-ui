import styles from './Home.module.scss';
import { useState, useEffect } from 'react';
import ProjectTable from './../../components/ProjectTable'
import { Row, Col } from 'react-bootstrap';
import CONSTANTS from '../../modules/CONSTANTS.json';
import { getRequest, deleteRequest, postRequest } from '../../modules/requests';
import { buildJobFromProjectData, validateJob } from '../../modules/jobs';
import { useHistory } from "react-router-dom";


const Homepage = (props) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [data, setData] = useState([])
    const history = useHistory();

    useEffect(() => {
        const address = `${CONSTANTS.INTERFACE_API_LOCATION}/project/`

        getRequest(address).then((result) => {
            setData(result.data)
            setIsLoaded(true)
        })
    }, [])

    const handleProjectDelete = (projectID) => {
        setIsLoaded(false)

        const delete_address = `${CONSTANTS.INTERFACE_API_LOCATION}/project/${projectID}`;
        const get_address = `${CONSTANTS.INTERFACE_API_LOCATION}/project/`;

        deleteRequest(delete_address).then((result) => {
            if (parseInt(result.status) === 200) {
                getRequest(get_address).then((result) => {
                    setData(result.data)
                    setIsLoaded(true)
                })
            }
        })
    }

    const handleProjectRun = (projectID) => {
        const get_address = `${CONSTANTS.INTERFACE_API_LOCATION}/project/${projectID}`;
        const submit_job_address = `${CONSTANTS.COMPUTE_API_LOCATION}/job/submit`;

        getRequest(get_address).then((result) => {
            const job_object = buildJobFromProjectData(result.data)
            if (validateJob(job_object)) {
                postRequest(submit_job_address, JSON.stringify(job_object)).then((result) => {
                    if (parseInt(result.status) === 200) {
                        history.push(`/output/${result.data.outputID}`);
                    }
                    else {
                        console.log(result);
                    }
                })
            } else {
                console.log("Invalid job specification");
            }
        })
    }

    return (
        <div className={styles.page}>
            <Row>
                <Col sm={1} md={2} lg={3} />
                <Col sm={10} md={8} lg={6}>
                    <h1>Projects</h1>
                    <br />
                    {(isLoaded) &&
                        <ProjectTable
                            data={data}
                            deleteFunction={handleProjectDelete}
                            runFuncton={handleProjectRun}
                        />
                    }
                    {(!isLoaded) &&
                        <p>Loading...</p>
                    }
                </Col>
            </Row>
        </div>
    )
}
export default Homepage;