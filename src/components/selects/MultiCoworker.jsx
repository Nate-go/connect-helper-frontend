import { CheckPicker } from "rsuite";
import { useApi } from '@/hooks'; 
import { useEffect } from "react";
import { BaseLoader } from '@/components'
import userEndpoints from "@/apis/enpoints/user";

const MultiCoworker = ({defaultValue, setValue}) => {

    const {data, loading, callApi } = useApi();

    useEffect(() => {
        callApi(userEndpoints.getCoworkers, {});
    }, [])

    if(loading || loading == null) return (<BaseLoader/>);

    return (
        <CheckPicker label="User" data={data ? data?.map((user) => ({label: user.name, value: user.id})) : []} value={defaultValue} onChange={setValue} className="w-full"/>
    );
}
export default MultiCoworker