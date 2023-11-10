import { Input, InputGroup } from 'rsuite';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import { useState } from 'react';

const InputPassword = (props) => {
    const [visible, setVisible] = useState(false);

    const handleChange = () => {
        setVisible(!visible);
    };
    return (
        <InputGroup inside>
            <Input type={visible ? 'text' : 'password'} {...props}/>
            <InputGroup.Button onClick={handleChange}>
                {visible ? <EyeIcon /> : <EyeSlashIcon />}
            </InputGroup.Button>
        </InputGroup>
    );
};

export default InputPassword