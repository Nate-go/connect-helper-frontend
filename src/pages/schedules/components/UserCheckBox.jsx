import React, { useState} from 'react';
import { Checkbox, CheckboxGroup, Avatar} from 'rsuite';
import { getIds } from '@/helpers/dataHelpers';

const UserCheckBox = ({data, setValue}) => {
    const [groupValue, setGroupValue] = useState([]);

    const handleCheckAll = (value, checked) => {
        setGroupValue(checked ? getIds(data) : []);
        setValue(getIds(checked ? data : []));
    };

    const handleChange = (value) => {
        setGroupValue(value);
        setValue(value);
    }

    return (
        <div className="flex flex-col items-start">
            <p>Users</p>
            <div>
                {(!data || data.length <= 0) ? <p> Empty data</p> : 
                <div className='max-h-96 overflow-auto'>
                    <Checkbox
                        indeterminate={groupValue.length > 0 && groupValue.length < data.length}
                        checked={groupValue.length === data.length}
                        onChange={handleCheckAll}
                        className='-ml-2'
                    >
                        Check all
                    </Checkbox>
                    <CheckboxGroup name="checkboxList" value={groupValue} onChange={handleChange}>
                        {data.map(user => (
                            <Checkbox key={user.id} value={user.id} className='pt-2'>
                                <div className="flex flex-row items-center gap-3 justify-between -mt-3">
                                    <Avatar
                                        size="md"
                                        circle
                                        src={user.image_url}
                                    />
                                    <div className="flex flex-col items-start">
                                        <div className="text-base font-sans">{user.name}</div>
                                        <div className="text-xs text-slate-400">{user.email}</div>
                                    </div>
                                </div>                            
                            </Checkbox>
                        ))}
                    </CheckboxGroup>
                </div>}
            </div>
        </div>
    );
}
export default UserCheckBox