import styles from './Home.module.scss';
import ProjectTable from './../../components/ProjectTable'


const Homepage = (props) => {
    const data = [
        {
            "id": 1,
            "modified": "Tue, 12 Oct 2021 13:40:01 GMT",
            "name": "test project"
        },
        {
            "id": 2,
            "modified": "Tue, 12 Oct 2021 13:40:11 GMT",
            "name": "test project 2"
        },
        {
            "id": 3,
            "modified": "Tue, 12 Oct 2021 13:40:12 GMT",
            "name": "test project 3"
        }
    ]



    return (
        <div className={styles.page}>
            <h1>Home page</h1>
            <ProjectTable
                data={data}
            />
        </div>
    )
}
export default Homepage;