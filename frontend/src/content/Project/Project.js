import styles from './Project.module.scss';
import { useParams } from "react-router-dom";
import { Jumbotron } from 'react-bootstrap';


const Project = (props) => {
    const { id } = useParams();

    return (
        <div className={styles.page}>
            <Jumbotron>
                <h1>Project page for {id}</h1>
            </Jumbotron>

        </div>
    )
}
export default Project;