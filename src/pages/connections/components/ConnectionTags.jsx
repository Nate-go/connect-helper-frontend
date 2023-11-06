import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Checkbox, CheckboxGroup, Panel, ButtonToolbar, Button, Modal, Input, Grid, Col, Row } from 'rsuite';
import { PlusIcon } from '@/components/icons';
import tagEndpoints from '@/apis/enpoints/tag';
import { AutoLoader } from '@/components';
import { useApi } from '@/hooks';
import { getIds } from '@/helpers/dataHelpers';


const ConnectionTags = ({ tagData, setTags }) => {
    const data = tagData;
    const [groupValue, setGroupValue] = useState([]);
    const [open, setOpen] = useState(false);
    const [tagName, setTagName] = useState('');
    const { data: createTagData, loading: createTagLoading, error: createTagError, callApi: handleCreateTag } = useApi();

    const handleClose = () => {
        setTags([]);
        setOpen(false);
    };

    const handleCheckAll = (value, checked) => {
        setGroupValue(checked ? data : []);
        console.log(groupValue);
        setTags(getIds(data));
    };

    const handleChange = (value) => {
        console.log(value);
        setGroupValue(value);
        setTags(getIds(value));
    }

    const handleAddTag = async () => {
        console.log(tagName);
        await handleCreateTag(
            tagEndpoints.create,
            {
                method:"POST",
                data: {
                    name: tagName
                }
            }
        );
    }

    useEffect(() => {
        console.log(createTagError);
        if(!createTagError) return;
        
        toast.error(createTagError.data.message);

    }, [createTagError])

    useEffect(() => {
        if (!createTagData) return;

        toast.success(createTagData.data.message);

        setTagName('');

    }, [createTagData])

    return (
        <Panel header={'Tags (' + data.length + ')'} bodyFill >
            <ButtonToolbar className='pb-4'>
                <Button color="blue" className='bg-blue-600' appearance="primary" startIcon={<PlusIcon />} onClick={() => setOpen(true)}>
                    New tag
                </Button>
            </ButtonToolbar>
            {data.length > 0 ? <Checkbox
                indeterminate={groupValue.length > 0 && groupValue.length < data.length}
                checked={groupValue.length === data.length}
                onChange={handleCheckAll}
            >
                Check all
            </Checkbox> : <p>Empty data</p>}
            <CheckboxGroup name="checkboxList" value={groupValue} onChange={handleChange}>
                {data.map(item => (
                    <Checkbox key={item.id} value={item}>
                        {item.name}
                    </Checkbox>
                ))}
            </CheckboxGroup>
            <Modal size='md' open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Add tag</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input placeholder="Tag's name" onChange={setTagName}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} appearance="subtle">
                        Cancel
                    </Button>
                    <AutoLoader 
                        display={!createTagLoading} 
                        component={
                            <Button onClick={handleAddTag} appearance="primary" className='bg-blue-500'>
                                Add
                            </Button>
                        }
                    />
                    
                </Modal.Footer>
            </Modal>
        </Panel>
    );
};

export default ConnectionTags