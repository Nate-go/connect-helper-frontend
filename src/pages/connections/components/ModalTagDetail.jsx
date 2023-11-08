import { Modal, Input, List, Panel, Button } from "rsuite";
import { TrashIcon } from '@/components/icons';
import { useApi } from "@/hooks";
import { useEffect, useState } from "react";
import { AutoLoader } from '@/components';
import tagEndpoints from "@/apis/enpoints/tag";
import connectionEndpoints from "@/apis/enpoints/connection";

const ModalTagDetail = ({open, handleClose, item, openConfirmation}) => {

    const { loading: editTagLoading, callApi: handleEditTag } = useApi();
    const { data: tagDetailData, loading: tagDetailLoading, callApi: handleTagDetail } = useApi();
    const { loading: deleteTagLoading, callApi: handleDeleteTag } = useApi();
    const { loading: deleteConnectionTagLoading, callApi: handleDeleteConnectionTag } = useApi();

    const [tagName, setTagName] = useState('');

    const deleteConnectionTag = async (connectionIds, tagIds) => {
        await handleDeleteConnectionTag(
            connectionEndpoints.deleteTags,
            {
                method: 'POST',
                data: {
                    connectionIds,
                    tagIds
                }
            }
        );

        handleTagDetail(tagEndpoints.detail + item.id, {});
    }

    const editTag = async () => {
        await handleEditTag(
            tagEndpoints.update + item.id,
            {
                method: "PUT",
                data: {
                    name: tagName
                }
            }
        );
    }

    const deleteTag = async (id) => {
        await handleDeleteTag(
            tagEndpoints.delete,
            {
                method: 'DELETE',
                data: {
                    ids: [id]
                }
            }
        );

        handleClose();
    }

    const confirmDeleteConnectionTag = (connectionId, tagId) => {
        openConfirmation(deleteConnectionTag, [[connectionId], [tagId]], 'Are you sure to delete this connection tag ?');
    }

    const confirmEditTag = () => {
        openConfirmation(editTag, [], 'Are you sure to update this tag ?');
    }

    const confirmDeleteTag = () => {
        openConfirmation(deleteTag, [item.id], 'Are you sure to delete this tag ?')
    }

    useEffect(() => {
        if (!tagDetailData) return;
        setTagName(tagDetailData.tag.name);
    }, [tagDetailData]);

    useEffect(() => {
        if(!item) return;
        handleTagDetail(tagEndpoints.detail + item.id, {});
    }, [item])

    const ConnectionList = () => {
        if (!tagDetailData || !tagDetailData.connections.length) return (<p>Empty data</p>);

        return (
            <>
                <List size="md">
                    {tagDetailData?.connections?.map((item, index) => (
                        <List.Item key={index} index={index} className='flex justify-between w-full'>
                            <p>{item.name}</p>
                            <Button appearance="link" onClick={() => confirmDeleteConnectionTag(item.id, tagDetailData?.tag?.id)} startIcon={<TrashIcon />} className='hover:text-red-600'>
                            </Button>
                        </List.Item>
                    ))}
                </List>
            </>
        );
    }

    return (
        <Modal size='md' open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Edit tag</Modal.Title>
            </Modal.Header>
            <AutoLoader
                display={!tagDetailLoading}
                component={
                    <>
                        <Modal.Body>
                            <Input placeholder="Tag's name" onChange={setTagName} value={tagName} />
                            <Panel header="Connections" bordered className='mt-5'>
                                <AutoLoader
                                    display={!deleteConnectionTagLoading}
                                    component={
                                        <ConnectionList/>
                                    }
                                />
                            </Panel>
                        </Modal.Body>
                        <Modal.Footer>
                            <AutoLoader
                                display={!(deleteTagLoading || editTagLoading)}
                                component={
                                    <>
                                        <Button onClick={confirmDeleteTag} appearance="primary" className='bg-red-600 hover:bg-red-700'>
                                            Delete
                                        </Button>
                                        <Button onClick={handleClose} appearance="subtle">
                                            Cancel
                                        </Button>
                                        <Button onClick={confirmEditTag} appearance="primary" className='bg-blue-500'>
                                            Save
                                        </Button>
                                    </>
                                }
                            />
                        </Modal.Footer>
                    </>
                }
            />
        </Modal>
    );
}

export default ModalTagDetail