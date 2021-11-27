import styles from './ProjectTable.module.scss';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const ProjectTable = (props) => {
    const dataEntries = []

    for (const item of props.data) {
        const handleProjectDelete = () => {
            props.deleteFunction(item.id)
        }

        const handleProjectRun = () => {
            props.runFuncton(item.id)
        }

        dataEntries.push(
            <tr key={item.id}>
                <td >{item.name}</td>
                <td >{item.modified}</td>
                <td>
                    <LinkContainer to={`/project/${item.id}`} variant="primary">
                        <Button>
                            View
                        </Button>
                    </LinkContainer>
                </td>
                <td>
                    <Button onClick={handleProjectRun} variant="success">
                        Run
                    </Button>
                </td>
                <td>
                    <Button onClick={handleProjectDelete} variant="danger">
                        Delete
                    </Button>
                </td>
            </tr>
        )
    }

    return (
        <div className={styles.container}>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last Modified</th>
                        <th />
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

export default ProjectTable;