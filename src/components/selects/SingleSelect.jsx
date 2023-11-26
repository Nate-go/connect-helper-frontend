import { InputPicker, SelectPicker } from "rsuite";

const SingleSelect = ({value, onChange, data, label, loading=false}) => {
    return (
        <SelectPicker className="w-full" label={label} data={data} value={value} onChange={onChange} loading={loading}/>
    );
}
export default SingleSelect