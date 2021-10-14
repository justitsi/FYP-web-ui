import styles from './BytesLabel.module.scss';
import { Form } from 'react-bootstrap';


const BytesLabel = (props) => {

    const humanFileSize = (bytes, si = true, dp = 1) => {
        const thresh = si ? 1000 : 1024;

        if (Math.abs(bytes) < thresh) {
            return bytes + ' B';
        }

        const units = si
            ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
            : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
        let u = -1;
        const r = 10 ** dp;

        do {
            bytes /= thresh;
            ++u;
        } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


        return bytes.toFixed(dp) + ' ' + units[u];
    }

    return (
        <div className={styles.container}>
            <Form.Label>
                {humanFileSize(props.bytes)}
            </Form.Label>
        </div>
    )
}
export default BytesLabel;