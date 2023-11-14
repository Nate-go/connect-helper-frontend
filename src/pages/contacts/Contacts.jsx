import { useState } from "react";
import { Divider, InputGroup, Input, Panel } from "rsuite";
import { ContactType } from "@/constants";
import { EditIcon, CheckIcon, CloseIcon, TrashIcon } from "@/components/icons";
import { getConstantTitle } from "@/helpers/constantHelpers";
import { CreateContact } from "./components";
import { contactEndpoints } from "@/apis";
import { useApi } from '@/hooks';

const Contacts = ({ contacts, openConfirmation }) => {
    let contactsByType = {
        [ContactType.MAIL]: [],
        [ContactType.PHONENUMBER]: [],
        [ContactType.ADDRESS]: [],
        [ContactType.SOCIAL_MEDIA]: [],
    };

    contacts.forEach(contact => {
        contactsByType[contact.type] = [...contactsByType[contact.type], contact];
    });

    const [editContact, setEditContact] = useState({});
    const { callApi: handleUpdateContact, loading: updateContactLoading } = useApi();
    const { callApi: handleDeleteContact, loading: deleteContactLoading } = useApi();

    const handleEditContact = (data) => {
        setEditContact((prevEditContact) => ({ ...prevEditContact, ...data }));
    }

    const saveContact = async () => {
        await handleUpdateContact(
            contactEndpoints.edit + editContact.id,
            {
                method:"PUT",
                data:{
                    title: editContact.title,
                    content: editContact.content
                }
            }
        );
    }

    const deleteContact = async (contactId) => {

    }

    const confirmSaveEditContact = () => {
        openConfirmation(
            saveContact,
            [],
            'Are you sure to update this contact ?',
        );
    }

    const confirmDeleteContact = (contactId) => {
        openConfirmation(
            deleteContact,
            [contactId],
            'Are you sure to delete this contact ?',
        );
    }

    return (
        <div className="flex flex-col w-full h-full gap-4">
            <CreateContact/>
            <Panel header='Current contacts' bordered>
                {Object.keys(contactsByType).map((key) => (
                    contactsByType[key].length != 0 && 
                        (<div key={key}>
                            <Divider style={{ marginBottom: '20px', marginTop: '-5px' }}>{getConstantTitle(ContactType, key)}</Divider>
                            <div>
                                {contactsByType[key].map((contact) => (
                                    contact.id == editContact.id ? (
                                        <InputGroup key={contact.id} className="mt-5">
                                            <InputGroup.Addon>Title</InputGroup.Addon>
                                            <Input value={editContact.title} onChange={(value) => handleEditContact({ title: value })} />
                                            <InputGroup.Addon>Content</InputGroup.Addon>
                                            <Input value={editContact.content} onChange={(value) => handleEditContact({ content: value })} />
                                                <InputGroup.Button className='hover:bg-gray-500 text-gray-500 bg-white hover:text-white' onClick={() => setEditContact({})}>
                                                <CloseIcon />
                                            </InputGroup.Button>
                                                <InputGroup.Button className='hover:bg-green-500 text-green-500 bg-white hover:text-white' onClick={confirmSaveEditContact}>
                                                <CheckIcon />
                                            </InputGroup.Button>
                                        </InputGroup>
                                     ) : (
                                        <InputGroup key={contact.id} className="mt-5">
                                            <InputGroup.Addon>Title</InputGroup.Addon>
                                            <Input value={contact.title} readOnly/>
                                            <InputGroup.Addon>Content</InputGroup.Addon>
                                            <Input value={contact.content} readOnly/>
                                                <InputGroup.Button className='hover:bg-blue-500 text-blue-500 bg-white hover:text-white' onClick={() => setEditContact(contact)}>
                                                <EditIcon />
                                            </InputGroup.Button>
                                                <InputGroup.Button className='hover:bg-red-500 text-red-500 bg-white hover:text-white' onClick={() => confirmDeleteContact(contact.id)}>
                                                <TrashIcon/>
                                            </InputGroup.Button>
                                        </InputGroup>
                                     )
                                    
                                ))}
                            </div>
                        </div>)
                ))}
            </Panel>
        </div>
    );
}

export default Contacts