import { TagGroup, Tag, Input, IconButton, Panel } from 'rsuite';
import { useState } from 'react';

import useApi from '@/hooks/useApi';
import { tagEndpoints } from '@/apis';
import { PlusIcon, CloseIcon, CheckIcon } from '@/components/icons';

const TagManagement = ({tagData, handleCreateTag }) => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [editItem, setEditItem] = useState(null);
    const { data: deleteTagData, loading: deleteTagLoading, error: deleteTagError, callApi: deleteTag } = useApi();
    // const { data: updateTagData, loading: updateTagLoading, error: updateTagError, callApi: updateTag } = useApi();


    const removeTag = (id) => {
        console.log(id);
    };

    const handleGetTags = () => {
        getTags(
            tagEndpoints.get,
            {}
        );
    }

    const handleUpdateTags = (id, name) => {
        updateTag(
            tagEndpoints.update + id,
            {
                'method': 'PUT',
                'data': {
                    'name': name
                },
            }
        );
    }

    const addTag = () => {
        handleCreateTag(inputValue);
    };

    const edit = (itemId) => {
        setEditItem(itemId);
    };

    const updateTag = (id, value) => {
        console.log(id, value);
    };

    const renderInput = () => {
        if (open) {
            return (
                <div className='flex flex-row gap-2 p-2'>
                    <Input
                        className="tag-input"
                        size="xs"
                        style={{ width: 90, height: 26 }}
                        value={inputValue}
                        onChange={setInputValue}
                    />
                    <IconButton
                        className="tag-add-btn"
                        onClick={() => setOpen(false)}
                        icon={<CloseIcon />}
                        appearance="ghost"
                        size="xs"
                    />
                    <IconButton
                        className="tag-add-btn"
                        onClick={() => setOpen(false)}
                        icon={<CheckIcon />}
                        appearance="ghost"
                        size="xs"
                    />
                </div>
            );
        }

        return (
            <div className='p-2'>
                <IconButton
                    className="tag-add-btn"
                    onClick={() => setOpen(true)}
                    icon={<PlusIcon />}
                    appearance="ghost"
                    size="xs"
                />
            </div>
        );
    };
    return (
        <Panel header='Tag management' bordered className='overflow-auto'>
            <TagGroup>
                {tagData.map((item) => (
                    item.id == editItem ? (
                        <div className='flex flex-row gap-2'>
                            <Input
                                className="tag-input"
                                size="xs"
                                style={{ width: 90, height: 26 }}
                                value={item.name}
                                onChange={(value) => {item.name = value}}
                            />
                            <IconButton
                                className="tag-add-btn"
                                icon={<CloseIcon />}
                                appearance="ghost"
                                size="xs"
                            />
                        </div>
                    ) : (
                        <Tag key={item.id} closable onClose={() => removeTag(item.id)} onClick={() => edit(item.id)}>
                            {item.name}
                        </Tag>
                    )
                ))}
                {renderInput()}
            </TagGroup>
        </Panel>
        
    );
};

export default TagManagement