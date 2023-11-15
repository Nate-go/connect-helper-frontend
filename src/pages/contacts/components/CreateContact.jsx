import { useEffect, useState } from "react";
import { Panel, InputGroup, Input, InputPicker, Button } from "rsuite";

import { ContactType } from "@/constants";
import { getConstantTitle } from "@/helpers/constantHelpers";
import { PlusIcon } from "@/components/icons";
import { useApi } from '@/hooks';
import contactEndpoints from "@/apis/enpoints/contact";
import { BaseLoader } from "@/components"

const CreateContact = ({connectionId, setFetchContacts}) => {
    const { data: createContactData, callApi: handleCreateContact, loading: createContactLoading } = useApi();

    const typeData = Object.entries(ContactType).map(([label, value]) => ({
        label: getConstantTitle(ContactType, value),
        value
    }));

    const [newContact, setNewContact] = useState({
        title: '',
        content: '',
        type: ContactType.MAIL
    })

    const handleNewContact = (data) => {
        setNewContact((prevNewContact) => ({ ...prevNewContact, ...data }));
    }

    const createContact = () => {
        handleCreateContact(
            contactEndpoints.create,
            {
                method: "POST",
                data: {
                    ...newContact,
                    'connection_id': connectionId
                }
            }
        );
    }

    const newContactRefresh = () => {
        setNewContact({
            title: '',
            content: '',
            type: ContactType.MAIL
        });
    }

    useEffect(() => {
        if(!createContactData) return;

        setFetchContacts(true);

        newContactRefresh();
    }, [createContactData]);

    const body = () => {
        if (createContactLoading) return (<BaseLoader/>);

        return (
            <div className="grid grid-cols-6 gap-3">
                <InputGroup className="col-span-4">
                    <InputGroup.Addon>Title</InputGroup.Addon>
                    <Input value={newContact.title} onChange={(value) => handleNewContact({ title: value })} />
                </InputGroup>
                <InputGroup className="col-span-2">
                    <InputPicker className="col-span-2 w-full" value={newContact.type} data={typeData} label="Type" onChange={(value) => handleNewContact({ type: value })} />
                </InputGroup>
                <InputGroup className="col-span-4">
                    <InputGroup.Addon>Content</InputGroup.Addon>
                    <Input value={newContact.content} onChange={(value) => handleNewContact({ content: value })} />
                </InputGroup>
                <Button className='bg-gray-200 text-black col-span-1' onClick={newContactRefresh}>
                    Cancel
                </Button>
                <Button color="blue" className='bg-blue-600 col-span-1' appearance="primary" startIcon={<PlusIcon />} onClick={createContact}>
                    Create
                </Button>
            </div>
        );
    }

    return (
        <Panel header='New contact' bordered>
            {body()}
        </Panel>
    );
}

export default CreateContact