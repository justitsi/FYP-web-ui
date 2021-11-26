import styles from './OutputTable.module.scss';
import OutputTableItem from '../OutputTableItem/OutputTableItem';
import { Accordion } from 'react-bootstrap';

const OutputTable = (props) => {
    console.log(props.projectOutputs)

    const tableItems = []
    for (const item of props.projectOutputs) {
        tableItems.push(<OutputTableItem
            data={item}
        />)
    }

    return (
        <div>
            <Accordion>
                {tableItems}
            </Accordion>
        </div>
    );
}

export default OutputTable;