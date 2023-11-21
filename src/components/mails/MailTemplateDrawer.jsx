import { Drawer } from "rsuite";
import React from 'react';
import MailTemplate from "./MailTemplate";

const MailTemplateDrawer = ({open, handleClose, openConfirmation }) => {
    return (
        <Drawer size="full" placement="right" open={open} onClose={handleClose}>
            <Drawer.Header>
                <Drawer.Title>Mail template</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
                <MailTemplate openConfirmation={openConfirmation}/>
            </Drawer.Body>
        </Drawer>
    );
}
export default MailTemplateDrawer