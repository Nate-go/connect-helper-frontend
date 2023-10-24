import { Container, Header, Sidebar, Sidenav, Content, Navbar, Nav } from 'rsuite';
import React from 'react';
import {
    CogIcon,
    AngleLeftIcon,
    AngleRightIcon,
    DashboardIcon,
    GroupIcon,
    MagicIcon,
    UserInfoIcon,
    HelpOutlineIcon,
    NoticeIcon,
    MemberIcon,
    UserChangeIcon
} from '@/components/icons.js';

import { logo_image } from '@/assets/images'
import { getCurrentPath } from '@/helpers/pathHelper';

const NavToggle = ({ expand, onChange }) => {
    return (
        <Navbar appearance="subtle" className="nav-toggle">
            <Nav>
                <Nav.Menu
                    noCaret
                    placement="topStart"
                    trigger="click"
                    title={<CogIcon style={{ width: 24, height: 20 }} size="sm" />}
                >
                    <Nav.Item icon={<HelpOutlineIcon/>}>Help</Nav.Item>
                </Nav.Menu>
                
            </Nav>
            <Nav>
                <Nav.Menu
                    noCaret
                    placement="topStart"
                    trigger="click"
                    title={<UserInfoIcon style={{ width: 24, height: 20 }} size="sm" />}
                >
                    <Nav.Item icon={<MemberIcon/>}>Profile</Nav.Item>
                    <Nav.Item icon={<NoticeIcon/>}>Notification</Nav.Item>
                    <Nav.Item icon={<UserChangeIcon/>}>Sign out</Nav.Item>
                </Nav.Menu>

            </Nav>

            <Nav pullRight>
                <Nav.Item onClick={onChange} style={{ width: 40, textAlign: 'center' }}>
                    {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
                </Nav.Item>
            </Nav>
        </Navbar>
    );
};

const BaseBody = ({ children }) => {
    const [expand, setExpand] = React.useState(true);
    const currentPath = getCurrentPath();
    const activeKey = (path) => {
        return currentPath.includes(path);
    };

    return (
        <div className="show-fake-browser sidebar-page">
            <Container>
                <Sidebar
                    style={{ display: 'flex', flexDirection: 'column' }}
                    width={expand ? 210 : 60}
                    collapsible
                >
                    <Sidenav.Header>
                        <div className='flex flex-row'>
                            <img src={logo_image} alt="" />
                        </div>
                    </Sidenav.Header>
                    <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
                        <Sidenav.Body>
                            <Nav>
                                <Nav.Item eventKey="/dashboard" href='/dashboard' active={activeKey('/dashboard')} icon={<DashboardIcon />}>
                                    Dashboard
                                </Nav.Item>
                                <Nav.Item eventKey="/users" href='/users' active={activeKey('/users')} icon={<GroupIcon />}>
                                    Users
                                </Nav.Item>
                                <Nav.Menu
                                    eventKey="3"
                                    trigger="hover"
                                    title="Advanced"
                                    icon={<MagicIcon />}
                                    placement="rightStart"
                                >
                                    <Nav.Item eventKey="3-1">Geo</Nav.Item>
                                    <Nav.Item eventKey="3-2">Devices</Nav.Item>
                                    <Nav.Item eventKey="3-3">Brand</Nav.Item>
                                    <Nav.Item eventKey="3-4">Loyalty</Nav.Item>
                                    <Nav.Item eventKey="3-5">Visit Depth</Nav.Item>
                                </Nav.Menu>
                            </Nav>
                        </Sidenav.Body>
                    </Sidenav>
                    <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
                </Sidebar>

                <Container>
                    <Content className='p-8'>{children}</Content>
                </Container>
            </Container>
        </div>
    );
};

export default BaseBody