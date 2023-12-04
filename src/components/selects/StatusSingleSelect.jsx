import { InputPicker } from "rsuite";
import { AccessStatus } from '@/constants';

const StatusSingleSelect = ({value, onChange, readOnly=false}) => {
    const statusData = Object.entries(AccessStatus).map(([label, value]) => ({ label, value }));

    return (
        <InputPicker label='Status' value={value} data={statusData} onChange={onChange} readOnly={readOnly}/>
    );
} 
export default StatusSingleSelect