import { ButtonToolbar, Button } from 'rsuite';
import { useState } from 'react';

import { TrashIcon, CombinationIcon, TbStatusChange, PlusIcon, AiOutlineTags } from '@/components/icons';
import DrawerCreateConnection from './DrawerCreateConnection';

const ConnectionToolbar = ({checkedKeys, tagData, setFetchTag, setFetchData, deleteConnections, mergeConnections, changeStatus, addTags, openConfirmation}) => {
    const [openCreateConnection, setOpenCreateConnection] = useState(false);

    return (
        <>
            <DrawerCreateConnection
                open={openCreateConnection}
                handleClose={() => {setOpenCreateConnection(false), setFetchData(true)}}
                openConfirmation={openConfirmation}
                tagData={tagData}
                setFetchTag={setFetchTag}
            />

            <ButtonToolbar className='pb-4'>
                <Button color="green" className='bg-green-600' appearance="primary" startIcon={<PlusIcon />} onClick={() => setOpenCreateConnection(true)}>
                    New connection
                </Button>
                <Button disabled={!checkedKeys.length} color="red" className='bg-red-600' appearance="primary" startIcon={<TrashIcon />} onClick={deleteConnections}>
                    Delete
                </Button>
                <Button disabled={checkedKeys.length < 2} color="yellow" className='bg-yellow-500' appearance="primary" startIcon={<CombinationIcon />} onClick={mergeConnections}>
                    Merge
                </Button>
                <Button disabled={!checkedKeys.length} color="cyan" className='bg-cyan-500' appearance="primary" startIcon={<TbStatusChange />} onClick={changeStatus}>
                    Change status
                </Button>
                <Button disabled={!checkedKeys.length} color='violet' className='bg-violet-700' appearance="primary" startIcon={<AiOutlineTags />} onClick={addTags}>
                    Add tag
                </Button>
            </ButtonToolbar>
        </>
        
    );
}

export default ConnectionToolbar