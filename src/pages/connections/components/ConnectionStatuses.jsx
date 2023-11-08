import { CheckPicker } from 'rsuite';
import { ConnectionStatus } from '@/constants';

const ConnectionStatuses = ({setStatuses}) => {
    const data = Object.entries(ConnectionStatus).map(([label, value]) => ({ label, value }));

    return (
        <div>
            <CheckPicker label={'Statuses (' + data.length + ')'} data={data} style={{ width: 250 }} onSelect={(items) => setStatuses(items)} onClean={() => setStatuses([])}/>
        </div>
        
    );
}

export default ConnectionStatuses