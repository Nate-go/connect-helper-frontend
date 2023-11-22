import { Drawer } from "rsuite";
import React from 'react';
import {TemplateGroup} from "@/pages/templateGroups";

const MailTemplateDrawer = ({open, handleClose, openConfirmation }) => {
    return (
        <Drawer size="full" placement="right" open={open} onClose={handleClose}>
            <Drawer.Header>
                <Drawer.Title className="text-white">Mail template</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
                <TemplateGroup />
            </Drawer.Body>
        </Drawer>
    );
}
export default MailTemplateDrawer