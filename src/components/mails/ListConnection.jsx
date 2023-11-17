import { CheckPicker } from "rsuite";

const ListConnection = ({value, setValue, data, loading}) => {
    return (
        <CheckPicker className="w-full" label="Connection" data={data?.map(item => ({
            label: item.name,
            value: item.id
        })) ?? []} value={value} onChange={setValue} loading={loading}/>
    );
}
export default ListConnection