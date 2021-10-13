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
            console.log(`Running project ${item.id}`)
        }

        dataEntries.push(
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.modified}</td>
                <td>
                    <LinkContainer to={`/project/${item.id}`}>
                        <Button>
                            View
                        </Button>
                    </LinkContainer>
                </td>
                <td>
                    <Button onClick={handleProjectRun}>
                        Run
                    </Button>
                </td>
                <td>
                    <Button onClick={handleProjectDelete}>
                        Delete
                    </Button>
                </td>
            </tr>
        )
    }

    return (
        <div className={styles.container}>
            <h2>Current projects</h2>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Modified</th>
                        <th />
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