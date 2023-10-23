import { Container, Header, Sidebar, Sidenav, Content, Navbar, Nav } from 'rsuite';
import React from 'react';
import CogIcon from '@rsuite/icons/legacy/Cog';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import DashboardIcon from '@rsuite/icons/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import UserInfoIcon from '@rsuite/icons/UserInfo';

import { logo_image } from '@/assets/images'

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
                    <Nav.Item>Help</Nav.Item>
                    <Nav.Item>Settings</Nav.Item>
                    <Nav.Item>Sign out</Nav.Item>
                </Nav.Menu>
                
            </Nav>
            <Nav>
                <Nav.Menu
                    noCaret
                    placement="topStart"
                    trigger="click"
                    title={<UserInfoIcon style={{ width: 24, height: 20 }} size="sm" />}
                >
                    <Nav.Item>Help</Nav.Item>
                    <Nav.Item>Settings</Nav.Item>
                    <Nav.Item>Sign out</Nav.Item>
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
                                <Nav.Item eventKey="1" active icon={<DashboardIcon />}>
                                    Dashboard
                                </Nav.Item>
                                <Nav.Item eventKey="2" icon={<GroupIcon />}>
                                    User Group
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