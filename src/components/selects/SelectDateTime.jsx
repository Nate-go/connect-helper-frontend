import { DatePicker } from "rsuite";
import { getDateTimeZone } from "@/helpers/dateTimeHelpers";

const SelectDateTime = ({value, onChange, label, readOnly, limitStart=null, limitEnd=null}) => {
    const handldeChange = (value) => {
        if(limitStart && value < limitStart) {
            onChange(limitStart);
            return;
        }

        if (limitEnd && value > limitEnd) {
            onChange(limitEnd);
            return;
        }

        onChange(value);
    }

    return (
        <div className="flex flex-row gap-3 items-center w-full">
            <p>{label}</p>
            <DatePicker readOnly={readOnly} className="w-full" format="MM/dd/yyyy HH:mm" value={value} onChange={handldeChange} placement="topStart"/>
        </div>
    );
}
export default SelectDateTime