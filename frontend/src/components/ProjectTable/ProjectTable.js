import styles from './ProjectTable.module.scss';

const ProjectTable = (props) => {
    const dataEntries = []

    for (const item of props.data) {
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
            </tr>
        )
    }

    return (
        <div className={styles.container}>
            <h2>Project table</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Modified</th>
                    </tr>
                </thead>
                <tbody>
                    {dataEntries}
                </tbody>
            </table>
        </div>
    )
}

export default ProjectTable;