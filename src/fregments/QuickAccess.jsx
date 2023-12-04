import { Dropdown, IconButton, Whisper, Tooltip } from "rsuite";
import { PlusIcon, SortUpIcon, LuMail, LuLayoutTemplate, CalendarIcon } from "@/components/icons";
import React, { useState } from "react";
import { SendMailDrawer, MailTemplateDrawer } from "@/components/mails";
import { useConfirmation } from '@/hooks';
import { PopupConfirm } from '@/components/popups';
import { getAuthentication } from '@/helpers/authenHelpers';
import { UserRole} from '@/constants'

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

const QuickAccess = () => {
    const [open, setOpen] = useState(false);
    const [openSendMail, setOpenSendMail] = useState(false);
    const [openMailTemplate, setOpenMailTemplate] = useState(false);
    const {
        isConfirmationOpen,
        openConfirmation,
        handleConfirm,
        handleCancel,
        confirmType,
        confirmData,
        confirmValue,
        setConfirmValue,
        message
    } = useConfirmation();

    const renderIconButton = () => {

        const Icon = () => {
            if (open) return (<PlusIcon rotate={45} style={{ fontSize: '10em' }}/>);
            
            return (
                <PlusIcon style={{ fontSize: '10em' }} />
            );
        } 

        return (
            <IconButton icon={<Icon />} circle color="blue" className="bg-blue-500 h-11 w-11" appearance="primary"/>
        );
    };

    return (
        <>
            <PopupConfirm
                handleConfirm={handleConfirm}
                handleCancel={handleCancel}
                type={confirmType}
                data={confirmData}
                message={() => message()}
                setValue={setConfirmValue}
                open={isConfirmationOpen}
            />
            {openSendMail && <SendMailDrawer open={openSendMail} handleClose={() => setOpenSendMail(false)} openConfirmation={openConfirmation} />}
            {openMailTemplate && <MailTemplateDrawer open={openMailTemplate} handleClose={() => setOpenMailTemplate(false)} openConfirmation={openConfirmation} />}
            <Dropdown className="quick-access flex flex-col gap-3 items-center pt-4" renderToggle={renderIconButton} placement="topEnd" trigger={"hover"} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
                {
                    getAuthentication()?.user.role !== UserRole.ADMIN &&
                    <>
                        <Whisper placement="left" trigger="hover" speaker={<Tooltip>schedule</Tooltip>}>
                            <IconButton icon={<CalendarIcon style={{ fontSize: '10em' }} />} circle color="blue" className="bg-blue-500 h-11 w-11" appearance="primary" onClick={() => setOpenMailTemplate(true)} />
                        </Whisper>
                        <Whisper placement="left" trigger="hover" speaker={<Tooltip>mail template</Tooltip>}>
                            <IconButton icon={<LuLayoutTemplate style={{ fontSize: '10em' }} />} circle color="blue" className="bg-blue-500 h-11 w-11" appearance="primary" onClick={() => setOpenMailTemplate(true)} />
                        </Whisper>
                        <Whisper placement="left" trigger="hover" speaker={<Tooltip>send mail</Tooltip>}>
                            <IconButton icon={<LuMail style={{ fontSize: '10em' }} />} circle color="blue" className="bg-blue-500 h-11 w-11" appearance="primary" onClick={() => setOpenSendMail(true)} />
                        </Whisper>
                    </>
                }
                <Whisper placement="left" trigger="hover" speaker={<Tooltip>scroll to top</Tooltip>}>
                    <IconButton icon={<SortUpIcon style={{ fontSize: '10em' }} />} circle color="blue" className="bg-blue-500 h-11 w-11" appearance="primary" onClick={scrollToTop} />
                </Whisper>
            </Dropdown>
        </>
    );
}
export default QuickAccess

