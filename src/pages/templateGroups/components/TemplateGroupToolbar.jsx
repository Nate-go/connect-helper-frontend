import { ButtonToolbar, Button, Modal, Input, InputPicker } from 'rsuite';
import { useState } from 'react';

import { TrashIcon, TbStatusChange, PlusIcon} from '@/components/icons';
import { useApi } from '@/hooks';
import { templateGroupEndpoints } from '@/apis';
import { AccessStatus } from '@/constants';
import { AutoLoader } from '@/components';
import { StatusSingleSelect } from '@/components/selects';

const CreateTemplateGroup = ({open, handleClose}) => {

    const {callApi, loading} = useApi();
    const [templateGroup, setTemplateGroup] = useState({
        name: '',
        status: AccessStatus.Private
    })

    const create = () => {
        callApi(templateGroupEndpoints.create, {
            method:"POST",
            data:{
                ...templateGroup
            }
        })
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Modal.Header>
                <Modal.Title>Create template group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='flex flex-col gap-3'>
                    <Input value={templateGroup.name} onChange={(value) => setTemplateGroup((prevTemplateGroup) => ({ ...prevTemplateGroup, ...{ name: value } }))} placeholder="Group's name" />
                    <StatusSingleSelect
                        value={templateGroup.status}
                        onChange={(value) => setTemplateGroup((prevTemplateGroup) => ({ ...prevTemplateGroup, ...{ status: value } }))}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} appearance="subtle">
                    Cancel
                </Button>
                <AutoLoader
                    display={!loading}
                    component={
                        <Button onClick={create} className='bg-blue-500' appearance="primary">
                            Create
                        </Button>
                    }
                />
            </Modal.Footer>
        </Modal>
    );
}

const TemplateGroupToolbar = ({checkedKeys, deleteTemplateGroups, changeStatus, openConfirmation, setFetch}) => {
    const [openCreateTemplateGroup, setOpenCreateTemplateGroup] = useState(false);

    return (
        <>
            {openCreateTemplateGroup && <CreateTemplateGroup open={openCreateTemplateGroup} handleClose={() => {
                setOpenCreateTemplateGroup(false);
                setFetch(true);
            }} />}

            <ButtonToolbar className='pb-4'>
                <Button color="green" className='bg-green-600' appearance="primary" startIcon={<PlusIcon />} onClick={() => setOpenCreateTemplateGroup(true)}>
                    New template group
                </Button>
                <Button disabled={!checkedKeys.length} color="red" className='bg-red-600' appearance="primary" startIcon={<TrashIcon />} onClick={deleteTemplateGroups}>
                    Delete
                </Button>
                <Button disabled={!checkedKeys.length} color="cyan" className='bg-cyan-500' appearance="primary" startIcon={<TbStatusChange />} onClick={changeStatus}>
                    Change status
                </Button>
            </ButtonToolbar>
        </>
        
    );
}

export default TemplateGroupToolbar