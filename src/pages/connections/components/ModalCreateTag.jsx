import { Modal, Button, Input } from "rsuite";
import { useEffect, useState } from "react";
import { AutoLoader } from '@/components';
import { useApi } from "@/hooks";
import { toast } from 'react-toastify';
import tagEndpoints from "@/apis/enpoints/tag";

const ModalCreatetag = ({open, handleClose}) => {
    const { data: createTagData, loading: createTagLoading, error: createTagError, callApi: handleCreateTag } = useApi();
    const [tagName, setTagName] = useState('');

    const createTag = async () => {
        await handleCreateTag(
            tagEndpoints.create,
            {
                method: "POST",
                data: {
                    name: tagName
                }
            }
        );

        setTagName('');
    }

    return (
        <Modal size='md' open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Add tag</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Input placeholder="Tag's name" onChange={setTagName} value={tagName} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} appearance="subtle">
                    Cancel
                </Button>
                <AutoLoader
                    display={!createTagLoading}
                    component={
                        <Button onClick={createTag} appearance="primary" className='bg-blue-500'>
                            Add
                        </Button>
                    }
                />
            </Modal.Footer>
        </Modal>
    );
}

export default ModalCreatetag