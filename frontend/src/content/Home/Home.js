import styles from './Home.module.scss';
import { useState, useEffect } from 'react';
import ProjectTable from './../../components/ProjectTable'
import { Jumbotron, Row, Col } from 'react-bootstrap';
import CONSTANTS from '../../modules/CONSTANTS.json';
import { getRequest, deleteRequest } from '../../modules/requests';

const Homepage = (props) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [data, setData] = useState([])

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
        const get_address = `${CONSTANTS.INTERFACE_API_LOCATION}/project/`

        deleteRequest(delete_address).then((result) => {
            console.log(result)
            if (parseInt(result.status) === 200) {
                getRequest(get_address).then((result) => {
                    setData(result.data)
                    setIsLoaded(true)
                })
            }
        })
    }

    return (
        <div className={styles.page}>
            <Jumbotron>
                <Row>
                    <Col md={2} />
                    <Col md={8}>
                        {(isLoaded) &&
                            <ProjectTable
                                data={data}
                                deleteFunction={handleProjectDelete}
                            />
                        }
                    </Col>
                </Row>
            </Jumbotron>
        </div>
    )
}
export default Homepage;