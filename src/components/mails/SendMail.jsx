import { InputGroup, Input, SelectPicker, Button, Whisper, Tooltip, CheckPicker, Panel } from "rsuite";
import React from 'react';
import ListConnection from "./ListConnection";
import { useState, useEffect } from "react";
import { useApi } from '@/hooks'
import connectionEndpoints from "@/apis/enpoints/connection";
import ListToContact from "./ListToContact";
import { SentToUserIcon, AiOutlineQuestionCircle } from '@/components/icons';
import { AutoLoader } from "@/components";
import { SendMailType } from "@/constants";
import tagEndpoints from "@/apis/enpoints/tag";
import MailContentEdit from "./MailContentEdit";
import { sendMailEndpoints } from "@/apis";
import { getIds } from '@/helpers/dataHelpers'
import MailType from "./MailType";
import { MailTemplateSelect } from "@/components/selects";

const SendMail = ({openConfirmation}) => {
    const [connections, setConnections] = useState([]);
    const [tags, setTags] = useState([]);
    const { data, loading, callApi } = useApi();
    const { data: tagData, loading:tagLoading, callApi: handleGetTag } = useApi();
    const { loading: sendMailLoading, callApi: handleSendMail } = useApi();

    const { SunEditorComponent, saveContent, loading:saveContentLoading, setContent } = MailContentEdit();
    const [contacts, SetContacts] = useState([]);

    const defaultMailTemplate = {
        subject: '',
        type: SendMailType.PERSONAL,
        name: ''
    }

    const [mailData, setMailData] = useState(defaultMailTemplate);

    const handleMailData = (data) => {
        setMailData((prevMailData) => ({ ...prevMailData, ...data }));
    }

    useEffect(() => {
        callApi(connectionEndpoints.getUserConnections, {});
        handleGetTag(tagEndpoints.get, {});
    }, []);

    const handleContact = (contact) => {
        SetContacts([...contacts, contact]);
    }

    const handleConnection = (items) => {
        SetContacts(contacts.filter((contact) => {
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

    const confirmSendMail = async () => {
        openConfirmation(sendMail, [], 'Are you sure to send this mail ?');
    }

    const sendMail = async () => {
        const modifiedContent = await saveContent();

        handleSendMail(sendMailEndpoints.sendMail,{
            method:"POST",
            data: {
                name : mailData.name,
                title: mailData.subject,
                type: mailData.type,
                content: modifiedContent,
                contactIds : getIds(contacts)
            }
        });
    }

    const handleSelectTemplate = (value) => {
        if(!value) {
            setMailData(defaultMailTemplate);
            setContent('');
            return;
        }
        

        setMailData({
            name: value.name ?? '',
            type: value.type,
            subject: value.subject
        });
        setContent(value.content);
    }

    return (
        <div className="grid grid-cols-10 gap-3">
            <Panel bordered shaded className="col-span-4">
                <div className="flex flex-col gap-3">
                    <p>Template review</p>
                    <div className="flex flex-col">
                        <MailTemplateSelect handleSelect={handleSelectTemplate} />
                    </div>
                    
                </div>
            </Panel>
            <Panel bordered shaded header="Mail editor" className="col-span-6">
                <div className="w-full h-full flex flex-col gap-4 ">
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
                    <InputGroup>
                        <InputGroup.Addon>Subject: </InputGroup.Addon>
                        <Input value={mailData.subject} onChange={(value) => handleMailData({ subject: value })} />
                    </InputGroup>

                    <div className="grid grid-cols-7 gap-2">
                        <InputGroup className="col-span-5">
                            <InputGroup.Addon>Name: </InputGroup.Addon>
                            <Input value={mailData.name} onChange={(value) => handleMailData({ name: value })} />
                        </InputGroup>
                        <div className="col-span-2">
                            <MailType value={mailData.type} onChange={(value) => handleMailData({ type: value })} />
                        </div>
                    </div>

                    {SunEditorComponent}

                    <div className="flex flex-row gap-4 justify-end pb-5">
                        <Button onClick={() => setContent('')} className="bg-gray-200">Cancel</Button>
                        <AutoLoader
                            display={!(saveContentLoading || sendMailLoading)}
                            component={
                                <Button color="blue" className='bg-blue-600' appearance="primary" startIcon={<SentToUserIcon />} onClick={confirmSendMail}>
                                    Send mail
                                </Button>
                            }
                        />
                    </div>
                </div>
            </Panel>
        </div>
        
    );
}
export default SendMail