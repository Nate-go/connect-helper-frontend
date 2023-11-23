import { InputPicker } from "rsuite";
import { ConnectionStatus } from '@/constants';

const StatusSingleSelect = ({value, onChange}) => {
    const statusData = Object.entries(ConnectionStatus).map(([label, value]) => ({ label, value }));

    return (
        <InputPicker label='Status' value={value} data={statusData} onChange={onChange} />
    );
} 
export default StatusSingleSelect