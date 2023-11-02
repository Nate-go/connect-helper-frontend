import { CheckPicker } from 'rsuite';
import React, { useState, useEffect } from 'react';
import useApi from '@/hooks/useApi';
import { tagEndpoints } from '@/apis';

const ConnectionTags = ({setTags}) => {
    const {data:tagData, error, loading, callApi:handleGetTags } = useApi();
    const [defaultData, setDefaultData] = useState([]);

    useEffect(() => {
        handleGetTags(
           tagEndpoints.get,
           {

           } 
        );
    }, []);

    useEffect(() => {
        if (tagData) {
            setDefaultData(tagData);
        }
    }, [tagData]);

    const data = defaultData.map(
        item => ({ label: item.name, value: item.id })
    );

    return (
        <div>
            <CheckPicker label={'Tags (' + data.length + ')'} data={data} style={{ width: 250 }} loading={loading} onSelect={(items) => setTags(items)}/>
        </div>
        
    );
}

export default ConnectionTags