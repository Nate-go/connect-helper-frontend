import { ButtonToolbar, Button, Modal, Input, InputPicker } from 'rsuite';
import { useState } from 'react';

import { TrashIcon, TbStatusChange, PlusIcon} from '@/components/icons';
import { useApi } from '@/hooks';
import { templateGroupEndpoints } from '@/apis';
import { AccessStatus } from '@/constants';
import { AutoLoader } from '@/components';
import { StatusSingleSelect } from '@/components/selects';

const EmailCheduleToolbar = ({ checkedKeys, deleteEmailSchedules, changeStatus, openConfirmation, setFetch}) => {
    return (
        <>
            <ButtonToolbar className='pb-4'>
                <Button disabled={!checkedKeys.length} color="red" className='bg-red-600' appearance="primary" startIcon={<TrashIcon />} onClick={deleteEmailSchedules}>
                    Delete
                </Button>
                <Button disabled={!checkedKeys.length} color="cyan" className='bg-cyan-500' appearance="primary" startIcon={<TbStatusChange />} onClick={changeStatus}>
                    Change status
                </Button>
            </ButtonToolbar>
        </>
        
    );
}

export default EmailCheduleToolbar