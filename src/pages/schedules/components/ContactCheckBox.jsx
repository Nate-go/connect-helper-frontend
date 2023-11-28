import React, { useState} from 'react';
import { Checkbox, CheckboxGroup} from 'rsuite';
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
            <p>Contacts</p>
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
                        {data.map(contact => (
                            <Checkbox key={contact.id} value={contact.id} className='pt-2'>
                                <div key={contact.id} className="flex flex-row items-center gap-3 justify-between -mt-3">
                                    <div className="flex flex-col items-start">
                                        <div className="truncate text-base font-sans">{contact.connection.name}</div>
                                        <div className="truncate text-xs text-slate-400">{contact.content}</div>
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