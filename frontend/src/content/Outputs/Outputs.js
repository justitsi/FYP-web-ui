import { Row, Col } from 'react-bootstrap';
import CONSTANTS from '../../modules/CONSTANTS.json';
import { getRequest, deleteRequest, postRequest } from '../../modules/requests';
import { useState, useEffect } from 'react';
import AllOutputTable from './../../components/AllOutputTable';

const Outputs = (props) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [data, setData] = useState([])

    const deleteOutput = (output_id) => {
        const output_address = `${CONSTANTS.INTERFACE_API_LOCATION}/output/byID/${output_id}`
        deleteRequest(output_address).then((result) => {
            if (parseInt(result.status) === 200) {
                getOutputs();
            }
        }).catch((e) => console.log(e))
    }

    const getOutputs = () => {
        const address = `${CONSTANTS.INTERFACE_API_LOCATION}/output/`

        getRequest(address).then((result) => {
            setData(result.data)
            setIsLoaded(true)
        })
    }

    useEffect(() => {
        getOutputs();
    }, [])

    return (
        <div >
            <Row>
                <Col sm={1} md={2} lg={3} />
                <Col sm={10} md={8} lg={6}>
                    <h1>Outputs</h1>
                    <br />
                    {(isLoaded) &&
                        <AllOutputTable
                            data={data}
                            deleteFunction={deleteOutput}
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
export default Outputs;