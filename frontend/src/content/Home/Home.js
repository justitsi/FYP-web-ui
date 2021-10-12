import styles from './Home.module.scss';
import ProjectTable from './../../components/ProjectTable'
import { Jumbotron, Row, Col } from 'react-bootstrap';


const Homepage = (props) => {
    const data = [
        {
            "id": 1,
            "modified": "Tue, 12 Oct 2021 13:40:01 GMT",
            "name": "test project"
        },
        {
            "id": 2,
            "modified": "Tue, 12 Oct 2021 13:40:11 GMT",
            "name": "test project 2"
        },
        {
            "id": 3,
            "modified": "Tue, 12 Oct 2021 13:40:12 GMT",
            "name": "test project 3"
        }
    ]



    return (
        <div className={styles.page}>
            <Jumbotron>
                <Row>
                    <Col md={2} />
                    <Col md={8}>
                        <ProjectTable
                            data={data}
                        />
                    </Col>
                </Row>
            </Jumbotron>
        </div>
    )
}
export default Homepage;