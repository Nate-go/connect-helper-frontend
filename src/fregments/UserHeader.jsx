import { Avatar, Whisper, Popover, Dropdown, IconButton } from "rsuite";
import { NoticeIcon } from "@/components/icons";
const renderMenu = ({ onClose, left, top, className }, ref) => {
    const handleSelect = eventKey => {
        onClose();
        console.log(eventKey);
    };
    return (
        <Popover ref={ref} className={className} style={{ left, top }} full>
            <Dropdown.Menu onSelect={handleSelect}>
                <Dropdown.Menu title="New File">
                    <Dropdown.Item eventKey={1}>New File</Dropdown.Item>
                    <Dropdown.Item eventKey={2}>New File with Current Profile</Dropdown.Item>
                </Dropdown.Menu>
                <Dropdown.Item eventKey={3}>Download As...</Dropdown.Item>
                <Dropdown.Item eventKey={4}>Export PDF</Dropdown.Item>
                <Dropdown.Item eventKey={5}>Export HTML</Dropdown.Item>
                <Dropdown.Item eventKey={6}>Settings</Dropdown.Item>
                <Dropdown.Item eventKey={7}>About</Dropdown.Item>
            </Dropdown.Menu>
        </Popover>
    );
};

const UserHeader = () => {
    return (
        <div className="flex w-full h-full justify-end gap-3 pt-2 pr-2">
            <Avatar
                size="md"
                circle
                src="https://avatars.githubusercontent.com/u/12592949"
                alt="@SevenOutman"
            />

            <Whisper placement="bottomEnd" trigger="click" speaker={renderMenu}>
                <IconButton appearance="primary" icon={<NoticeIcon />} circle className="bg-blue-500 h-10 w-10" />
            </Whisper>
        </div>
    );
}
export default UserHeader