import { useNavigate } from "react-router-dom";

import { Avatar, Whisper, Popover, Dropdown, IconButton, ButtonGroup, Badge } from "rsuite";
import { NoticeIcon, ArrowDownIcon, MemberIcon, UserChangeIcon } from "@/components/icons";
import { signOut } from '@/helpers/authenHelpers';
import { useApi } from '@/hooks'
import {AutoLoader} from '@/components'
import { useEffect } from "react";
import userEndpoints from "@/apis/enpoints/user";
import { getAuthentication } from "@/helpers/authenHelpers";

const userMenu = ({ onClose, left, top, className }, ref) => {
    const handleSelect = eventKey => {
        onClose();
    };

    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut();
        navigate('/login');
    }

    return (
        <Popover ref={ref} className={className} style={{ left, top }} full>
            <Dropdown.Menu onSelect={handleSelect}>
                <Dropdown.Item icon={<MemberIcon />}  eventKey={3}>Profile</Dropdown.Item>
                <Dropdown.Item icon={<UserChangeIcon />} onClick={handleSignOut} eventKey={4}>Sign out</Dropdown.Item>
            </Dropdown.Menu>
        </Popover>
    );
};

const notificationMenu = ({ onClose, left, top, className }, ref) => {
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
                <Dropdown.Item eventKey={3}>Download As... alllllllllllllllllll</Dropdown.Item>
                <Dropdown.Item eventKey={4}>Export PDF</Dropdown.Item>
                <Dropdown.Item eventKey={5}>Export HTML</Dropdown.Item>
                <Dropdown.Item eventKey={6}>Settings</Dropdown.Item>
                <Dropdown.Item eventKey={7}>About</Dropdown.Item>
            </Dropdown.Menu>
        </Popover>
    );
};

const UserHeader = () => {
    const user = getAuthentication()?.user ?? null;

    return (
        <div className="flex w-full h-full justify-end gap-5 pb-2 pt-4 pr-5">
            <ButtonGroup className="flex flex-row gap-4">
                <div className="flex flex-row items-center gap-3">
                    <Avatar
                        size="md"
                        circle
                        src={user?.image_url}
                    />
                    <div className='flex flex-col justify-center'>
                        <p className='text-base'>{user?.name}</p>
                        <p className='text-xs text-gray-400'>{user?.enterprise.name}</p>
                    </div>
                </div>
                <Whisper placement="bottomEnd" trigger="click" speaker={userMenu}>
                    <IconButton icon={<ArrowDownIcon />} />
                </Whisper>
            </ButtonGroup>

            <Whisper placement="bottomEnd" trigger="click" speaker={notificationMenu}>
                <Badge content={999} maxCount={5}>
                    <IconButton appearance="primary" icon={<NoticeIcon style={{ fontSize: '10em' }} />} circle className="bg-blue-500 h-10 w-10" />
                </Badge>
            </Whisper>
        </div>
    );
}
export default UserHeader