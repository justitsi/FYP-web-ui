import { Card, Form, Tabs, Tab, Table } from 'react-bootstrap';
import styles from "./OutputResultViewer.module.scss";

const OutputResultViewer = (props) => {
    const table_rows = []

    for (let i = 0; i < props.data.groups.length; i++) {
        let nodesStr = "";
        for (const node of props.data.groups[i]) {
            nodesStr += node + ", "
        }
        if (nodesStr.length > 0) {
            nodesStr = nodesStr.slice(0, -2);
        }

        const newRow =
            <tr key={i}>
                <td>{i + 1}</td>
                <td>{nodesStr}</td>
            </tr>

        table_rows.push(newRow)
    }


    return (
        <div>
            <Card>
                <Tabs defaultActiveKey="table">
                    <Tab eventKey="table" title="Table">
                        <Table bordered striped>
                            <tbody>
                                <tr>
                                    <th>Group</th>
                                    <th>Nodes</th>
                                </tr>
                                {table_rows}
                            </tbody>
                        </Table>
                        <div className={styles.costIndicator}>Cost: {props.data.cost}</div>
                    </Tab>
                    <Tab eventKey="json" title="JSON">
                        <Form.Group>
                            <Form.Control
                                as="textarea"
                                rows={10}
                                readOnly={true}
                                value={JSON.stringify(props.data, undefined, 4)}
                            />
                        </Form.Group>
                    </Tab>
                </Tabs >
            </Card>
        </div >
    )
}
export default OutputResultViewer;