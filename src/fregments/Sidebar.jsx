import { Sidenav, Nav } from 'rsuite';
import React from 'react';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import { logo_image } from '@/assets/images'

const styles = {
    width: 240,
    display: 'inline-table',
    marginRight: 10
};

const CustomSidenav = ({ appearance, openKeys, expanded, onOpenChange, onExpand, ...navProps }) => {
    return (
        <div style={styles}>
            <Sidenav
                appearance={appearance}
                expanded={expanded}
                openKeys={openKeys}
                onOpenChange={onOpenChange}
            >
                <Sidenav.Header>
                    <div className='flex flex-row'>
                        <img src={logo_image} alt="" className='h-4'/>
                        <Sidenav.Toggle onToggle={onExpand} />
                    </div>
                </Sidenav.Header>
                <Sidenav.Body>
                    <Nav {...navProps}>
                        <Nav.Item eventKey="1" icon={<DashboardIcon />}>
                            Dashboard
                        </Nav.Item>
                        <Nav.Item eventKey="2" icon={<GroupIcon />}>
                            User Group
                        </Nav.Item>
                        <Nav.Menu eventKey="3" title="Advanced" icon={<MagicIcon />}>
                            <Nav.Item eventKey="3-1">Geo</Nav.Item>
                            <Nav.Item eventKey="3-2">Devices</Nav.Item>
                            <Nav.Item eventKey="3-3">Loyalty</Nav.Item>
                            <Nav.Item eventKey="3-4">Visit Depth</Nav.Item>
                        </Nav.Menu>
                        <Nav.Menu eventKey="4" title="Settings" icon={<GearCircleIcon />}>
                            <Nav.Item eventKey="4-1">Applications</Nav.Item>
                            <Nav.Item eventKey="4-2">Channels</Nav.Item>
                            <Nav.Item eventKey="4-3">Versions</Nav.Item>
                            <Nav.Menu eventKey="4-5" title="Custom Action">
                                <Nav.Item eventKey="4-5-1">Action Name</Nav.Item>
                                <Nav.Item eventKey="4-5-2">Action Params</Nav.Item>
                            </Nav.Menu>
                        </Nav.Menu>
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </div>
    );
};

const Sidebar = () => {
    const [activeKey, setActiveKey] = React.useState('1');
    const [openKeys, setOpenKeys] = React.useState(['3', '4']);
    const [expanded, setExpand] = React.useState(true);

    return (
        <>
            <CustomSidenav
                activeKey={activeKey}
                openKeys={openKeys}
                onOpenChange={setOpenKeys}
                onSelect={setActiveKey}
                expanded={expanded}
                onExpand={setExpand}
                appearance="subtle"
            />
            <h1></h1>
        </>
    );
};

export default Sidebar