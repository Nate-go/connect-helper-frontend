import { Dropdown, Popover, ButtonGroup, Whisper, IconButton, Button, Panel } from "rsuite";
import { ArrowDownIcon, CloseIcon } from '@/components/icons'
import { useState } from "react";

const ConnectionElement = ({connection, handleContact}) => {
    const [contact, setContact] = useState(null);

    const renderMenu = ({ onClose, left, top, className }, ref) => {
        const handleSelect = eventKey => {
            onClose();
        };

        const select = (contact) => {
            setContact(contact);
            handleContact(contact);
            onClose();
        }

        return (
            <Popover ref={ref} className={className} style={{ left, top }} full>
                <Dropdown.Menu onSelect={handleSelect}>
                    {
                        connection.contacts?.map((contact) => (
                            <Dropdown.Item eventKey={contact.id} key={'contact-' + contact.id} onClick={() => select(contact)}>{contact.content}</Dropdown.Item>
                        ))
                    }
                </Dropdown.Menu>
            </Popover>
        );
    };

    return (
        <div className="flex flex-col w-full">
            <ButtonGroup className="flex flex-row gap-1 w-full border-2 border-blue-500 rounded-lg">
                <div className='flex flex-col justify-center w-40 pl-1'>
                    <div className='truncate hover:text-clip text-base'>{connection.name}</div>
                    <div className='truncate text-xs text-gray-400'>{contact?.content}</div>
                </div>
                <Whisper placement="bottomEnd" trigger="click" speaker={renderMenu}>
                    <IconButton className="bg-blue-500 hover:bg-blue-600" icon={<ArrowDownIcon className="text-white" />} />
                </Whisper>
            </ButtonGroup>
        </div>
    );
}

const ListToContact = ({connections, handleContact}) => {

    return (
        <Panel bordered bodyFill>
            <div className="flex flex-row gap-5 items-center px-3 py-2">
                <div>To: </div>
                <div className="flex flex-row gap-4 items-center overflow-x-auto overflow-y-hidden">
                    {connections?.map((connection) => (
                        <ConnectionElement connection={connection} key={'connection-' + connection.id} handleContact={handleContact}/>
                    ))}
                </div>
            </div>
        </Panel>
        
    );
}
export default ListToContact