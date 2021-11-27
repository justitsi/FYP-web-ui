import OutputTableItem from '../OutputTableItem/OutputTableItem';
import { Accordion } from 'react-bootstrap';

const OutputTable = (props) => {
    const tableItems = []
    for (const item of props.projectOutputs) {
        tableItems.push(<OutputTableItem
            data={item}
            key={item.id}
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