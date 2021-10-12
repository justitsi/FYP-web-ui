import styles from './Home.module.scss';
import { useState, useEffect } from 'react';
import ProjectTable from './../../components/ProjectTable'
import { Jumbotron, Row, Col } from 'react-bootstrap';
import CONSTANTS from '../../modules/CONSTANTS.json';
import { getRequest } from '../../modules/requests';

const Homepage = (props) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        const address = `${CONSTANTS.INTERFACE_API_LOCATION}/project/`

        getRequest(address).then((result) => {
            setData(result.data)
            setIsLoaded(true)
        }).catch((e) => console.log(e))
    }, [])

    return (
        <div className={styles.page}>
            <Jumbotron>
                <Row>
                    <Col md={2} />
                    <Col md={8}>
                        {(isLoaded) &&
                            <ProjectTable
                                data={data}
                            />
                        }
                    </Col>
                </Row>
            </Jumbotron>
        </div>
    )
}
export default Homepage;