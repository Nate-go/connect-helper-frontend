import { Modal, Button, InputPicker } from 'rsuite';
import { AiOutlineQuestionCircle } from '@/components/icons';
import ModalBody from 'rsuite/esm/Modal/ModalBody';
import { useState } from 'react';

const ConfirmActionSelect = ({confirmAction, message, open, setOpen, data, setValue}) => {
    const handleClose = () => {
        setOpen(false);
    };

    const handleAccept = () => {
        setOpen(false);
        if(!confirmAction) return;
        confirmAction(true);
    };

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title className='flex flex-row items-center gap-2'><AiOutlineQuestionCircle/> {message}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='flex justify-center'>
                    <InputPicker data={data} className='w-full' onChange={(value) => setValue(value)}/>
                </Modal.Body>
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

export default ConfirmActionSelect