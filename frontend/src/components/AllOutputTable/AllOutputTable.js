import styles from './AllOutputTable.module.scss';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const AllOutputTable = (props) => {
    const dataEntries = []

    for (const item of props.data) {
        const handleOutputDelete = () => {
            props.deleteFunction(item.id)
        }
        dataEntries.push(
            <tr key={item.id} >
                <td className={styles.trText}>{item.id}</td>
                <td className={styles.trText}>{item.project_id}</td>
                <td >{item.created}</td>
                <td>
                    <LinkContainer to={`/output/${item.id}`} variant="primary">
                        <Button>
                            View
                        </Button>
                    </LinkContainer>
                </td>
                <td>
                    <Button onClick={handleOutputDelete} variant="danger">
                        Delete
                    </Button>
                </td>
            </tr>
        )
    }

    return (
        <div>
            <Table striped hover>
                <thead>
                    <tr>
                        <th className={styles.trText}>ID</th>
                        <th className={styles.trText}>ProjectID</th>
                        <th>Created</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {dataEntries}
                </tbody>
            </Table>
        </div>
    )
}
export default AllOutputTable;