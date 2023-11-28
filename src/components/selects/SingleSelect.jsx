import { InputPicker, SelectPicker } from "rsuite";

const SingleSelect = ({value, onChange, data, label, readOnly, loading=false}) => {
    return (
        <SelectPicker className="w-full" label={label} data={data} value={value} onChange={onChange} loading={loading} readOnly={readOnly}/>
    );
}
export default SingleSelect