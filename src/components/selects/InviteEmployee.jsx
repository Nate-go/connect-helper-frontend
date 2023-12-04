import { useEffect, useState } from "react";
import { Modal, TagInput, Button, Whisper, Tooltip} from "rsuite";
import { useApi } from '@/hooks';
import { AutoLoader } from '@/components';
import { AiOutlineQuestionCircle } from "@/components/icons";
import { toast } from 'react-toastify';
import userEndpoints from "@/apis/enpoints/user";

const InviteEmployee = ({ open, handleClose }) => {
    const [emails, setEmails] = useState([]);
    const {data, loading, callApi} = useApi();

    const invites = () => {
        callApi(
            userEndpoints.invites,
            {
                method: "POST",
                data:{
                    emails
                }
            }
        )
    }

    useEffect(() => {
        if(!data) return;

        setEmails([]);
    }, [data])

    const isValidEmail = (inputEmail) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(inputEmail);
    }

    const handleInputMail = (values) => {
        let validEmails = []
        values.forEach(element => {
            if(isValidEmail(element)) {
                validEmails.push(element);
            } else {
                toast.warning(element + ' is not a valid email');
            }
        });

        setEmails(validEmails);
    }

    const removeEmail = (email) => {
        setEmails(emails.filter((value) => value !== email));
    }

    return (
        <Modal size='md' open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Invite employee</Modal.Title>
            </Modal.Header>
            <Modal.Body className="w-full">
                <div className="flex flex-col items-start w-full gap-2">
                    <label>Employee's emails</label>
                    <div className="flex flex-row gap-3 items-center w-full">
                        <TagInput className="w-full"
                            trigger={(['Enter', 'Space'])}
                            placeholder="Input emails"
                            menuStyle={{ width: 500 }}
                            onCreate={(value, item) => {
                                handleInputMail(value)
                            }}
                            value={emails}
                            onClean={() => setEmails([])}
                            onTagRemove={(value, event) => removeEmail(value)}
                        />
                        <Whisper placement="topEnd" trigger="hover" speaker={<Tooltip>press space for complete an email</Tooltip>}>
                            <div>
                                <AiOutlineQuestionCircle style={{ fontSize: '2em' }} />
                            </div>
                        </Whisper>
                    </div>
                </div>
                            
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} appearance="subtle">
                    Cancel
                </Button>
                <AutoLoader
                    display={!loading}
                    component={
                        <Button onClick={invites} appearance="primary" className='bg-blue-500'>
                            Invite
                        </Button>
                    }
                />
            </Modal.Footer>
        </Modal>
    );
}
export default InviteEmployee