import { AutoComplete } from 'rsuite';
import React from 'react';

const suffixes = ['@gmail.com', '@edu.vn'];

const AutoFillEmail = ({ style, value, onChange }) => { // Destructure 'style' and 'value' from props
    const [data, setData] = React.useState([]);

    const handleChange = value => {
        const at = value.match(/@[\S]*/);
        const nextData = at
            ? suffixes
                .filter(item => item.indexOf(at[0]) >= 0)
                .map(item => {
                    return `${value}${item.replace(at[0], '')}`;
                })
            : suffixes.map(item => `${value}${item}`);

        setData(nextData);
        onchange = value;
    };

    return (
        <AutoComplete data={data} placeholder="Email" onChange={handleChange} style={style} value={value} />
    );
};

export default AutoFillEmail;
