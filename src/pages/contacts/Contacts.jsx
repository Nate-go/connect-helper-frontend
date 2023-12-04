import { useEffect, useState } from "react";
import { Divider, InputGroup, Input, Panel } from "rsuite";
import { ContactType } from "@/constants";
import { EditIcon, CheckIcon, CloseIcon, TrashIcon, FaCrown } from "@/components/icons";
import { getConstantTitle } from "@/helpers/constantHelpers";
import { CreateContact } from "./components";
import { contactEndpoints } from "@/apis";
import { useApi } from '@/hooks';
import { BaseLoader } from '@/components'

const Contacts = ({ contacts, openConfirmation, setFetchContacts, contactLoading, connection, isMember, updateConnection }) => {
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
    const { data: updateContactData, callApi: handleUpdateContact, loading: updateContactLoading } = useApi();
    const { data: deleteContactData, callApi: handleDeleteContact, loading: deleteContactLoading } = useApi();

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

        setEditContact({});
    }

    const deleteContact = async (contactId) => {
        await handleDeleteContact(contactEndpoints.delete + contactId, {});
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

    useEffect(() => {
        if(!updateContactData && !deleteContactData) return;

        setFetchContacts(true);

    }, [updateContactData, deleteContactData]);

    const body = () => {
        if (contactLoading || updateContactLoading || deleteContactLoading) return (<BaseLoader/>);

        return (
            <Panel header='Current contacts' bordered>
                <div className="-mt-5">
                    {Object.keys(contactsByType).map((key) => (
                        contactsByType[key].length != 0 &&
                        (<div key={key}>
                            <Divider className="">{getConstantTitle(ContactType, key)}</Divider>
                            <div>
                                {contactsByType[key].map((contact) => (
                                    contact.id == editContact.id ? (
                                        <InputGroup key={'edit-' + contact.id} className="mt-3">
                                            <InputGroup.Addon>Title</InputGroup.Addon>
                                            <Input value={editContact.title} onChange={(value) => handleEditContact({ title: value })} />
                                            <InputGroup.Addon>Content</InputGroup.Addon>
                                            <Input value={editContact.content} onChange={(value) => handleEditContact({ content: value })} />
                                            <InputGroup.Button className='hover:bg-gray-500 text-gray-500 hover:text-white' onClick={() => setEditContact({})}>
                                                <CloseIcon />
                                            </InputGroup.Button>
                                            <InputGroup.Button className='hover:bg-green-500 text-green-500 hover:text-white' onClick={confirmSaveEditContact}>
                                                <CheckIcon />
                                            </InputGroup.Button>
                                        </InputGroup>
                                    ) : (
                                            <InputGroup key={contact.id} className="mt-3">
                                            <InputGroup.Addon>Title</InputGroup.Addon>
                                            <Input value={contact.title} readOnly />
                                            <InputGroup.Addon>Content</InputGroup.Addon>
                                            <Input value={contact.content} readOnly />
                                            {isMember() && 
                                                <>
                                                    <InputGroup.Button className='hover:bg-blue-500 text-blue-500 hover:text-white' onClick={() => setEditContact({ ...contact })}>
                                                        <EditIcon />
                                                    </InputGroup.Button>
                                                    <InputGroup.Button className='hover:bg-red-500 text-red-500 hover:text-white' onClick={() => confirmDeleteContact(contact.id)}>
                                                        <TrashIcon />
                                                    </InputGroup.Button>
                                                    {
                                                        contact.id !== connection.contact_id &&
                                                        <InputGroup.Button className='hover:bg-yellow-500 text-yellow-500 hover:text-white' onClick={() => updateConnection(contact.id)}>
                                                            <FaCrown />
                                                        </InputGroup.Button>
                                                    }
                                                </>
                                            }
                                        </InputGroup>
                                    )

                                ))}
                            </div>
                        </div>)
                    ))}
                </div>    
            </Panel>
        );
    }

    return (
        <div className="flex flex-col w-full h-full gap-4">
            {isMember() && <CreateContact connectionId={connection?.id} setFetchContacts={setFetchContacts} />}
            {body()}
        </div>
    );
}

export default Contacts