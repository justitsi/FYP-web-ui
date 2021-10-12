import styles from './ProjectTable.module.scss';
import { Table } from 'react-bootstrap';

const ProjectTable = (props) => {
    const dataEntries = []

    for (const item of props.data) {
        const handleProjectDelete = () => {
            console.log(`Deleteing project ${item.id}`)
        }

        dataEntries.push(
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.modified}</td>
                <td>
                    <a href={`/project/${item.id}`}>
                        <button>
                            View
                        </button>
                    </a>
                </td>
                <td>
                    <a>
                        <button onClick={handleProjectDelete}>
                            Delete
                        </button>
                    </a>
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