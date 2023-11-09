import { Modal, Input, List, Panel, Button, Drawer } from "rsuite";
import { TrashIcon } from '@/components/icons';
import { useApi } from "@/hooks";
import { useEffect, useState } from "react";
import { AutoLoader } from '@/components';
import tagEndpoints from "@/apis/enpoints/tag";
import connectionEndpoints from "@/apis/enpoints/connection";

const ContactForm = (data) => {
    const [newContact, setNewContact] = useState({
        content:'',
        type: null,
    });

    const updateContact = () => {

    }

    return (
        <Panel header='Contacts'>

        </Panel>
    );
}

const DrawerCreateConnection = ({ open, handleClose, openConfirmation }) => {

    return (
        <Drawer size='full' placement='right' open={open} onClose={handleClose}>
            <Drawer.Header>
                <Drawer.Title>Create Connection</Drawer.Title>
                <Drawer.Actions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button className="bg-blue-400"  onClick={() => setOpen(false)} appearance="primary">
                        Create
                    </Button>
                </Drawer.Actions>
            </Drawer.Header>
            <Drawer.Body>
            </Drawer.Body>
        </Drawer>
    );
}

export default DrawerCreateConnection