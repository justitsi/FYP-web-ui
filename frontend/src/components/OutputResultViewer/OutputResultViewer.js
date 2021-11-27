import { Card, Form, Tabs, Tab, Table } from 'react-bootstrap';
import styles from "./OutputResultViewer.module.scss";

const OutputResultViewer = (props) => {
    const table_rows = [[], []]


    table_rows[0].push(<th key={0}>Node</th>)
    table_rows[1].push(<th key={1}>Group</th>)

    for (let i = 0; i < props.data.nodes.length; i++) {
        const item = props.data.nodes[i];
        let style = styles.tdCell;
        if (i % 2 == 1) style = styles.tdCellGray;

        const nodeData = (
            <td key={item.id + 1} className={style}>
                {item.id}
            </td>
        )

        table_rows[0].push(nodeData);
    }

    for (let i = 0; i < props.data.nodes.length; i++) {
        const item = props.data.nodes[i];
        let style = styles.tdCell;
        if (i % 2 == 1) style = styles.tdCellGray;

        const groupData = (
            <td key={`${item.groupID}${item.id + 1}`} className={style}>
                {item.groupID}
            </td>
        )
        table_rows[1].push(groupData);
    }


    return (
        <div>
            <Card>
                <Tabs defaultActiveKey="table">
                    <Tab eventKey="table" title="Table">
                        <Table bordered>
                            <tbody>
                                <tr>
                                    {table_rows[0]}
                                </tr>
                                <tr>
                                    {table_rows[1]}
                                </tr>
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