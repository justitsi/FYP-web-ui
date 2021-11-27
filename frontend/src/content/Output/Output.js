import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Row, Col, ListGroup, Form, Button } from 'react-bootstrap';
import CONSTANTS from '../../modules/CONSTANTS.json';
import { getRequest, deleteRequest } from '../../modules/requests';
import { useHistory } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import OutputResultViewer from './../../components/OutputResultViewer';


const Output = (props) => {
    const { id } = useParams();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false)
    const [data, setData] = useState({})


    const getOutput = () => {
        const output_address = `${CONSTANTS.INTERFACE_API_LOCATION}/output/byID/${id}`

        getRequest(output_address).then((result) => {
            if (parseInt(result.status) === 200) {
                setData(result.data)
                setIsLoaded(true)
            }
        }).catch((e) => console.log(e))
    }

    const deleteOutput = () => {
        if (isLoaded) {
            const output_address = `${CONSTANTS.INTERFACE_API_LOCATION}/output/byID/${id}`
            deleteRequest(output_address).then((result) => {
                if (parseInt(result.status) === 200) {
                    history.push(`/project/${data.project_id}`)
                }
            }).catch((e) => console.log(e))
        }
    }

    let job_complete = false;
    if (data)
        if (data.results)
            if (data.results[0])
                job_complete = true

    useEffect(() => {
        getOutput();
    }, [id])

    return (
        <div>
            <br />
            <Row>
                <Col md={2} />
                <Col md={5}>
                    <h1>
                        Output {id}
                    </h1>
                </Col>
            </Row>
            {(isLoaded) &&
                <div>
                    <Row>
                        <Col md={2} />
                        <Col md={5}>
                            <h3>
                                Job Run Details
                            </h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2} />
                        <Col md={3}>
                            <ListGroup>
                                <ListGroup.Item>JobID: {data.jobID}</ListGroup.Item>
                                <ListGroup.Item>
                                    <LinkContainer to={`/project/${data.project_id}`}>
                                        <a href={`/project/${data.project_id}`}>ProjectID: {data.project_id}</a>
                                    </LinkContainer>
                                </ListGroup.Item>
                            </ListGroup>
                            <br />
                            <Button onClick={deleteOutput} variant="danger">
                                Delete
                            </Button>

                        </Col>
                        <Col md={3}>
                            <ListGroup>
                                <ListGroup.Item>Created: {data.created}</ListGroup.Item>
                                <ListGroup.Item>Started: {data.started}</ListGroup.Item>
                                <ListGroup.Item>Finished: {data.finished}</ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md={2} />
                        <Col md={5}>
                            <h3>
                                Job Output
                            </h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2} />
                        <Col md={8}>
                            {(job_complete) &&
                                <OutputResultViewer
                                    data={data.results[0]}
                                />
                            }
                            {(!job_complete) &&
                                <p>No job results registered yet...</p>
                            }
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md={2} />
                        <Col md={5}>
                            <h3>
                                Job Specification
                            </h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2} />
                        <Col md={8}>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    as="textarea"
                                    rows={30}
                                    readOnly={true}
                                    value={JSON.stringify(data.jobSpec, undefined, 4)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </div>
            }
        </div>
    )
}
export default Output;