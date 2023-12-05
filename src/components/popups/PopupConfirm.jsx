import { Modal, Button, InputPicker, CheckPicker } from 'rsuite';
import { AiOutlineQuestionCircle } from '@/components/icons';
import ConfirmType from '@/constants/ConfirmType';

const PopupConfirm = ({ handleConfirm, handleCancel, message, open, setValue, data, type}) => {

    const body = () => {
        switch (type()) {
            case ConfirmType.MULTI_SELECTION:
                return (
                    <>
                        <CheckPicker label="Tags" data={data()} className='w-full' onChange={(value) => setValue(value)} />
                    </>
                );
            case ConfirmType.ONE_SELECTION:
                return (
                    <>
                        <InputPicker data={data()} className='w-full' onChange={(value) => setValue(value)} />
                    </>
                );
            default:
                return (
                    <></>
                );
        }
    }

    return (
        <>
            <Modal open={open} onClose={handleCancel}>
                <Modal.Header>
                    <Modal.Title className='flex flex-row items-center gap-2'><AiOutlineQuestionCircle />{message()}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='flex justify-center'>
                    {body()}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleConfirm} appearance="primary" className='bg-blue-500'>
                        Ok
                    </Button>
                    <Button onClick={handleCancel} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PopupConfirm