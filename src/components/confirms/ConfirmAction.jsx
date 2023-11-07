import { Modal, Button, ButtonToolbar, Placeholder } from 'rsuite';
import { AiOutlineQuestionCircle } from '@/components/icons';
import { useEffect } from 'react';

const ConfirmAction = ({confirmAction, message, open, setOpen}) => {

    const handleClose = () => {
        setOpen(false);
    };

    const handleAccept = () => {
        setOpen(false);
        if(!confirmAction) return;
        confirmAction();
    };

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title className='flex flex-row items-center gap-2'><AiOutlineQuestionCircle/> {message}</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button onClick={() => handleAccept()} appearance="primary" className='bg-blue-500'>
                        Ok
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ConfirmAction