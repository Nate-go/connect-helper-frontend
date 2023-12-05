import { InputGroup, Input, Button, Panel } from "rsuite";
import React from 'react';
import { useState } from "react";
import { useApi } from '@/hooks'
import { SentToUserIcon } from '@/components/icons';
import { AutoLoader } from "@/components";
import { SendMailType } from "@/constants";
import MailContentEdit from "./MailContentEdit";
import { sendMailEndpoints } from "@/apis";
import { getIds } from '@/helpers/dataHelpers'
import MailType from "./MailType";
import { MailTemplateSelect, SelectContact } from "@/components/selects";
import ModalScheduleMail from "./ModalScheduleMail";
import { ScheduleMailAfter } from "@/constants";

const SendMail = ({openConfirmation}) => {
    const { loading: sendMailLoading, callApi: handleSendMail } = useApi();

    const { SunEditorComponent, saveContent, loading:saveContentLoading, setContent } = MailContentEdit();
    const [contacts, setContacts] = useState([]);
    const [openSchedule, setOpenSchedule] = useState(false);
    const [scheduleMail, setScheduleMail] = useState({
        started_at: new Date(),
        number: 1,
        after:  ScheduleMailAfter.WEEK
    });

    const defaultMailTemplate = {
        subject: '',
        type: SendMailType.PERSONAL,
        name: ''
    }

    const [mailData, setMailData] = useState(defaultMailTemplate);

    const handleMailData = (data) => {
        setMailData((prevMailData) => ({ ...prevMailData, ...data }));
    }

    const confirmSendMail = async (isSchedule=false) => {
        openConfirmation(sendMail, [isSchedule], 'Are you sure to send this mail ?');
    }

    const sendMail = async (isSchedule) => {
        const modifiedContent = await saveContent();

        handleSendMail(sendMailEndpoints.sendMail,{
            method:"POST",
            data: {
                name : mailData.name,
                title: mailData.subject,
                type: mailData.type,
                content: modifiedContent,
                contactIds : getIds(contacts),
                schedule: isSchedule ? {
                    started_at: scheduleMail.started_at,
                    after_second: scheduleMail.number * scheduleMail.after
                } : null
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
                    <SelectContact contacts={contacts} setContacts={setContacts}/>
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
                    {openSchedule && <ModalScheduleMail
                        open={openSchedule}
                        handleClose={() => setOpenSchedule(false)}
                        schedule={scheduleMail}
                        setSchedule={setScheduleMail}
                        onClick={() => confirmSendMail(true)}
                    />}
                    <div className="flex flex-row gap-2 justify-end pb-2">
                        <Button onClick={() => setContent('')} className="bg-gray-200">Cancel</Button>
                        <AutoLoader
                            display={!(saveContentLoading || sendMailLoading)}
                            component={
                                <Button color="orange" className='bg-orange-500' appearance="primary" onClick={() => setOpenSchedule(true)}>
                                    Schedule mail
                                </Button>
                            }
                        />
                        <AutoLoader
                            display={!(saveContentLoading || sendMailLoading)}
                            component={
                                <Button color="blue" className='bg-blue-600' appearance="primary" startIcon={<SentToUserIcon />} onClick={() => confirmSendMail()}>
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