import { Panel, Drawer, InputGroup, Input, SelectPicker, Button, Whisper, Tooltip } from "rsuite";
import SunEditor from 'suneditor-react';
import React from 'react';
import ListConnection from "./ListConnection";
import { useState, useEffect } from "react";
import { useApi } from '@/hooks'
import connectionEndpoints from "@/apis/enpoints/connection";
import ListToContact from "./ListToContact";
import { SentToUserIcon, AiOutlineQuestionCircle } from '@/components/icons';
import { AutoLoader } from "@/components";
import { SendMailType } from "@/constants";

const buttonList = [
    [
        'undo',
        'redo',
    ],
    [
        'font',
        'fontSize',
        'fontColor',
        'hiliteColor',
    ],
    [
        'align',
        'bold',
        'underline',
        'italic',
        'strike',
    ],
    [
        'list',

        'subscript',
        'superscript',
        'indent',
        'outdent',
        'removeFormat',
    ],
    [
        'link',
        'image',
    ],
    [
        'fullScreen',
        'codeView',
        'preview',
    ]
];

const SendMail = ({open, handleClose}) => {
    const [connections, setConnections] = useState([]);
    const { data, loading, callApi } = useApi();
    const [contacts, SetContacts] = useState([]);
    const [mailData, setMailData] = useState({
        subject: '',
        type: SendMailType.PERSONAL,
        name: ''
    });
    const [content, setContent] = useState('')

    const handleMailData = (data) => {
        setMailData((prevMailData) => ({ ...prevMailData, ...data }));
    }

    useEffect(() => {
        callApi(connectionEndpoints.getUserConnections, {});
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

    const handleChange = (content) => {
        setContent(content);
    }

    const getToolTip = () => {
        switch (mailData.type) {
            case SendMailType.CC:
                return 'The list of receiver the email is public'
            case SendMailType.BCC:
                return 'The list of receiver the email is private'
            default:
                return 'Send mail to multi people with the same template but different content\n{@name@, @note@, @title@, @content@} = {connection name, connection note, contact title, contact content}'
        }
    }

    return (
        <Drawer size="full" placement="right" open={open} onClose={handleClose}>
            <Drawer.Header>
                <Drawer.Title>SendMail</Drawer.Title>
                <Drawer.Actions>
                    <Button onClick={handleClose} className="bg-gray-200">Cancel</Button>
                    <AutoLoader
                        display={!false}
                        component={
                            <Button color="blue" className='bg-blue-600' appearance="primary" startIcon={<SentToUserIcon />} onClick={() => { }}>
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
                        
                        <SunEditor
                            onChange={handleChange}
                            height="30em"
                            placeholder="Please type here..."
                            setOptions={{
                                buttonList: buttonList,
                            }}
                        />
                    </div>

                </Panel>
            </Drawer.Body>
        </Drawer>
    );
}
export default SendMail