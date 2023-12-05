import { CheckPicker } from 'rsuite';

const MultiSelect = ({setStatuses, data, label, loading=false}) => {
    return (
        <div>
            <CheckPicker label={label + ' (' + data.length + ')'} data={data} style={{ width: 250 }} onSelect={(items) => setStatuses(items)} onClean={() => setStatuses([])} loading={loading}/>
        </div>
    );
}

export default MultiSelect