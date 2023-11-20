import { Panel, Drawer, InputGroup, Input, SelectPicker, Button, Whisper, Tooltip, CheckPicker } from "rsuite";
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

const SendMail = ({open, handleClose, openConfirmation}) => {
    const [connections, setConnections] = useState([]);
    const [tags, setTags] = useState([]);
    const { data, loading, callApi } = useApi();
    const { data: tagData, loading:tagLoading, callApi: handleGetTag } = useApi();
    const { loading: sendMailLoading, callApi: handleSendMail } = useApi();

    const { SunEditorComponent, saveContent, loading:saveContentLoading } = MailContentEdit();
    const [contacts, SetContacts] = useState([]);

    const [mailData, setMailData] = useState({
        subject: '',
        type: SendMailType.PERSONAL,
        name: ''
    });

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

    const getToolTip = () => {
        switch (mailData.type) {
            case SendMailType.CC:
                return 'The list of receiver the email is public'
            case SendMailType.BCC:
                return 'The list of receiver the email is private'
            default:
                return 'Send mail to multi people with the same template but different content\n{@name@, @note@, @title@, @content@, @username@, @enterprise@} = {connection name, connection note, contact title, contact content, your name, your enterprise}'
        }
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

    return (
        <Drawer size="full" placement="right" open={open} onClose={handleClose}>
            <Drawer.Header>
                <Drawer.Title>SendMail</Drawer.Title>
                <Drawer.Actions>
                    <Button onClick={handleClose} className="bg-gray-200">Cancel</Button>
                    <AutoLoader
                        display={!(saveContentLoading || sendMailLoading)}
                        component={
                            <Button color="blue" className='bg-blue-600' appearance="primary" startIcon={<SentToUserIcon />} onClick={confirmSendMail}>
                                Send mail
                            </Button>
                        }
                    />
                </Drawer.Actions>
            </Drawer.Header>
            <Drawer.Body>
                <Panel>
                    <div className="w-full h-full flex flex-col gap-4">
                        <InputGroup>
                            <InputGroup.Addon>Name: </InputGroup.Addon>
                            <Input value={mailData.name} onChange={(value) => handleMailData({name: value})} />
                        </InputGroup>
                        <CheckPicker className="w-full" label="Tag" data={tagData?.map(item => ({
                            label: item.name,
                            value: item.id
                        })) ?? []} value={tags} onChange={handleTags} loading={tagLoading} />
                        <ListConnection value={connections} setValue={handleConnection} data={data} loading={loading} />
                        <ListToContact connections={getConnections()} handleContact={handleContact}/>
                        <InputGroup>
                            <InputGroup.Addon>Subject: </InputGroup.Addon>
                            <Input value={mailData.subject} onChange={(value) => handleMailData({ subject: value })}/>
                        </InputGroup>
                        <div className="flex flex-row gap-4 w-full items-center">
                            <SelectPicker className="w-full" label="Type" value={mailData.type} onChange={(value) => handleMailData({ type: value })}  data={Object.entries(SendMailType).map(([label, value]) => ({
                                label,
                                value,
                            }))} />
                            <Whisper placement="topEnd" trigger="hover" speaker={<Tooltip>{getToolTip()}</Tooltip>}>
                                <div>
                                    <AiOutlineQuestionCircle style={{ fontSize: '2em' }} />
                                </div>
                            </Whisper>
                        </div>
                        
                        {SunEditorComponent}
                    </div>

                </Panel>
            </Drawer.Body>
        </Drawer>
    );
}
export default SendMail