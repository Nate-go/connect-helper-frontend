import { Dropdown, IconButton, Whisper, Tooltip } from "rsuite";
import { PlusIcon, SortUpIcon, LuMail } from "@/components/icons";
import React, { useState } from "react";

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

const QuickAccess = () => {
    const [open, setOpen] = useState(false);

    const renderIconButton = () => {

        const Icon = () => {
            if (open) return (<PlusIcon rotate={45} style={{ fontSize: '10em' }} />);
            
            return (
                <PlusIcon style={{ fontSize: '10em' }} />
            );
        } 

        return (
            <IconButton icon={<Icon />} circle color="blue" className="bg-blue-500 h-11 w-11" appearance="primary" onClick={scrollToTop}/>
        );
    };

    return (
        <Dropdown className="quick-access flex flex-col gap-5 items-center pt-4" renderToggle={renderIconButton} placement="topEnd" trigger={"hover"} onOpen={() => setOpen(true)} onClose={() => setOpen(false)} onClick={scrollToTop}>
            <Whisper placement="left" trigger="hover" speaker={<Tooltip>send mail</Tooltip>}>
                <IconButton icon={<LuMail style={{ fontSize: '10em' }} />} circle color="blue" className="bg-blue-500 h-11 w-11" appearance="primary" />
            </Whisper>
            <Whisper placement="left" trigger="hover" speaker={<Tooltip>scroll to top</Tooltip>}>
                <IconButton icon={<SortUpIcon style={{ fontSize: '10em' }} />} circle color="blue" className="bg-blue-500 h-11 w-11" appearance="primary" onClick={scrollToTop} />
            </Whisper>
        </Dropdown>
    );
}
export default QuickAccess

