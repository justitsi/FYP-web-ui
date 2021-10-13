import styles from './Project.module.scss';
import { useParams } from "react-router-dom";
import { Jumbotron, Row, Col } from 'react-bootstrap';
import CONSTANTS from '../../modules/CONSTANTS.json';
import { getRequest } from '../../modules/requests';
import { useState, useEffect } from 'react';
// import CodeEditor from '@uiw/react-textarea-code-editor';

const Project = (props) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [response, setResponse] = useState(null)
    const [data, setData] = useState(null)


    const { id } = useParams();

    useEffect(() => {
        const address = `${CONSTANTS.INTERFACE_API_LOCATION}/project/${id}`

        getRequest(address).then((result) => {
            setResponse(result)
            setData(result.data)
            setIsLoaded(true)
        }).catch((e) => console.log(e))
    }, [])

    return (
        <div className={styles.page}>
            <br />
            {(isLoaded) &&
                <div>
                    {(parseInt(response.status) === 200) &&
                        <Jumbotron>
                            <Row>
                                <Col md={2} />
                                <Col md={8}>
                                    <h1>{data.name}</h1>
                                    <p>{JSON.stringify(data)}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={2} />
                                <Col md={8}>
                                    {/* json editor needs to be placed here */}
                                </Col>
                            </Row>
                        </Jumbotron>
                    }
                    {(parseInt(response.status) === 404) &&
                        <Row>
                            <Col md={2} />
                            <Col md={8}>
                                <h1>Project {`<${id}>`} not found</h1>
                            </Col>
                        </Row>
                    }
                </div>
            }
        </div>
    )
}
export default Project;