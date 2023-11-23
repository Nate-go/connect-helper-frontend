import { Drawer } from "rsuite";
import React from 'react';
import SendMail from "./SendMail";

const SendMailDrawer = ({open, handleClose, openConfirmation }) => {
    return (
        <Drawer size="full" placement="right" open={open} onClose={handleClose}>
            <Drawer.Header>
                <Drawer.Title>Send mail</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
                <SendMail openConfirmation={openConfirmation}/>
            </Drawer.Body>
        </Drawer>
    );
}
export default SendMailDrawer