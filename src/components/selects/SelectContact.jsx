import { CheckPicker} from "rsuite";
import React from 'react';
import { useState, useEffect } from "react";
import { useApi } from '@/hooks'
import connectionEndpoints from "@/apis/enpoints/connection";
import tagEndpoints from "@/apis/enpoints/tag";
import ListConnection from "./ListConnection";
import ListToContact from "./ListToContact";

const SelectContact = ({contacts, setContacts}) => {
    const [connections, setConnections] = useState([]);
    const [tags, setTags] = useState([]);
    const { data, loading, callApi } = useApi();
    const { data: tagData, loading: tagLoading, callApi: handleGetTag } = useApi();

    useEffect(() => {
        callApi(connectionEndpoints.getUserConnections, {});
        handleGetTag(tagEndpoints.get, {});
    }, []);

    const handleContact = (contact) => {
        setContacts([...contacts, contact]);
    }

    const handleConnection = (items) => {
        setContacts(contacts.filter((contact) => {
            return items.includes(contact.connection_id);
        }));
        setConnections(items);
    }

    const getConnections = () => {
        return data?.filter((connection) => {
            return connections.includes(connection.id);
        })
    }

    const handleTags = (items) => {
        const deleteIds = tags.filter((item) => !items.includes(item));
        setTags(items);
        const connectionIds = getConnectionFromTags(items);
        const deleteConnectionIds = getConnectionFromTags(deleteIds);
        setConnections(Array.from(new Set([...connections, ...connectionIds])).filter((item) => !deleteConnectionIds.includes(item)));
    }

    const getConnectionFromTags = (tagIds) => {
        const filteredTags = tagData.filter((tag) => tagIds.includes(tag.id));
        const connectionIds = filteredTags.flatMap((tag) => tag.connections.map((connection) => connection.id));
        return connectionIds;
    }

    return (
        <div className="w-full h-full flex flex-col gap-4" >
            <div className="grid grid-cols-4 gap-2">
                <CheckPicker className="w-full col-span-1" label="Tag" data={tagData?.map(item => ({
                    label: item.name,
                    value: item.id
                })) ?? []} value={tags} onChange={handleTags} loading={tagLoading} />
                <div className="col-span-3">
                    <ListConnection value={connections} setValue={handleConnection} data={data} loading={loading} />
                </div>
            </div>
            <ListToContact connections={getConnections()} handleContact={handleContact} />
        </div>
    );
}
export default SelectContact