import { TagGroup, Tag, Input, IconButton } from 'rsuite';
import PlusIcon from '@rsuite/icons/Plus';
import useApi from '@/hooks/useApi';
import { tagEndpoints } from '@/apis';

const TagManagement = () => {
    const [tags, setTags] = React.useState([]);
    const [typing, setTyping] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const { data: getTagData, loading: getTagLoading, error: getTagError, callApi: getTags } = useApi();
    const { data: deleteTagData, loading: deleteTagLoading, error: deleteTagError, callApi: deleteTag } = useApi();
    const { data: updateTagData, loading: updateTagLoading, error: updateTagError, callApi: updateTag } = useApi();


    const removeTag = tag => {
        const nextTags = tags.filter(item => item !== tag);
        setTags(nextTags);
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
        const nextTags = inputValue ? [...tags, inputValue] : tags;
        setTags(nextTags);
        setTyping(false);
        setInputValue('');
    };

    const handleButtonClick = () => {
        setTyping(true);
    };

    const renderInput = () => {
        if (typing) {
            return (
                <Input
                    className="tag-input"
                    size="xs"
                    style={{ width: 70 }}
                    value={inputValue}
                    onChange={setInputValue}
                    onBlur={addTag}
                    onPressEnter={addTag}
                />
            );
        }

        return (
            <IconButton
                className="tag-add-btn"
                onClick={handleButtonClick}
                icon={<PlusIcon />}
                appearance="ghost"
                size="xs"
            />
        );
    };
    return (
        <TagGroup>
            {tags.map((item, index) => (
                <Tag key={index} closable onClose={() => removeTag(item.id)} onClick={() => edit(item.id)}>
                    {item.name}
                </Tag>
            ))}
            {renderInput()}
        </TagGroup>
    );
};

export default TagManagement