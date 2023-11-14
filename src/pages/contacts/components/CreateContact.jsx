import { useState } from "react";
import { Panel, InputGroup, Input, InputPicker, Button } from "rsuite";

import { ContactType } from "@/constants";
import { getConstantTitle } from "@/helpers/constantHelpers";
import { PlusIcon } from "@/components/icons";

const CreateContact = () => {

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

    return (
        <Panel header='New contact' bordered>
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
                <Button className='bg-gray-200 text-black col-span-1' onClick={() => setNewContact({
                    title: '',
                    content: '',
                    type: ContactType.MAIL
                })}>
                    Cancel
                </Button>
                <Button color="blue" className='bg-blue-600 col-span-1' appearance="primary" startIcon={<PlusIcon />} onClick={() => { }}>
                    Create
                </Button>
            </div>
        </Panel>
    );
}

export default CreateContact