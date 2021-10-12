import styles from './Project.module.scss';
import { useParams } from "react-router-dom";

const Project = (props) => {
    const { id } = useParams();

    return (
        <div className={styles.page}>
            <h1>Project page for {id}</h1>
        </div>
    )
}
export default Project;