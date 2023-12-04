import { DatePicker } from "rsuite";
import { useEffect } from "react";

const SelectDateTime = ({ value, onChange, label, readOnly, placement ='topStart'}) => {
    return (
        <div className="flex flex-row gap-3 items-center w-full">
            <p>{label}</p>
            <DatePicker readOnly={readOnly} className="w-full" format="MM/dd/yyyy HH:mm" value={value} onChange={onChange} placement={placement}/>
        </div>
    );
}
export default SelectDateTime