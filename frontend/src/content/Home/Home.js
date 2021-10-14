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
                    <Col sm={1} md={2} lg={3} />
                    <Col sm={10} md={8} lg={6}>
                        <h1>Projects</h1>
                        <br />
                        {(isLoaded) &&
                            <ProjectTable
                                data={data}
                                deleteFunction={handleProjectDelete}
                            />
                        }
                        {(!isLoaded) &&
                            <p>Loading...</p>
                        }
                    </Col>
                </Row>
            </Jumbotron>
        </div>
    )
}
export default Homepage;