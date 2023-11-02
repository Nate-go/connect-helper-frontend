import { Container, Header, Sidebar, Sidenav, Content, Navbar, Nav, Row, Col, Panel } from 'rsuite';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    CogIcon,
    AngleLeftIcon,
    AngleRightIcon,
    DashboardIcon,
    GroupIcon,
    AppSelectIcon,
    UserInfoIcon,
    HelpOutlineIcon,
    NoticeIcon,
    MemberIcon,
    UserChangeIcon,
    PeopleBranchIcon
} from '@/components/icons.js';

import { logo_image } from '@/assets/images'
import { getCurrentPath } from '@/helpers/pathHelper';
import { signOut } from '@/helpers/authenHelpers';

const NavToggle = ({ expand, onChange, handleSignOut }) => {
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
                    <Nav.Item icon={<UserChangeIcon/>} onClick={handleSignOut}>Sign out</Nav.Item>
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
    const [expand, setExpand] = useState(true);
    const currentPath = getCurrentPath();
    const activeKey = (path) => {
        return currentPath.includes(path);
    };
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut();
        navigate('/login');
    }

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="show-fake-browser sidebar-page w-full min-h-screen">
            <Container className='w-full'>
                <Sidebar
                    style={{ display: 'flex', flexDirection: 'column' }}
                    width={expand ? 210 : 60}
                    collapsible
                    className='min-h-screen'
                >
                    <Sidenav.Header onClick={() => navigate('/')} className='cursor-pointer'>
                        <div className='flex flex-row'>
                            <img src={logo_image} alt="" />
                        </div>
                    </Sidenav.Header>
                    <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
                        <Sidenav.Body>
                            <Nav>
                                <Nav.Item eventKey="/dashboard" onClick={() => handleNavigate('/dashboard')} active={activeKey('/dashboard')} icon={<DashboardIcon />}>
                                    Dashboard
                                </Nav.Item>
                                <Nav.Item eventKey="/users" onClick={() => handleNavigate('/users')} active={activeKey('/users')} icon={<GroupIcon />}>
                                    Users
                                </Nav.Item>
                                <Nav.Item eventKey="/connections" onClick={() => handleNavigate('/connections')} active={activeKey('/connections')} icon={<PeopleBranchIcon />}>
                                    Connection
                                </Nav.Item>
                                <Nav.Menu
                                    eventKey="3"
                                    trigger="hover"
                                    title="Advanced"
                                    icon={<AppSelectIcon />}
                                    placement="rightStart"
                                >
                                    <Nav.Item eventKey="3-1" onClick={() => handleNavigate('/')}>Home</Nav.Item>
                                    <Nav.Item eventKey="3-2" onClick={() => handleNavigate('/about')} >About</Nav.Item>
                                    <Nav.Item eventKey="3-3" onClick={() => handleNavigate('/contact')}>Contact</Nav.Item>
                                </Nav.Menu>
                            </Nav>
                        </Sidenav.Body>
                    </Sidenav>
                    <NavToggle expand={expand} onChange={() => setExpand(!expand)} handleSignOut={() => handleSignOut()}/>
                </Sidebar>

                <Container className='w-full'>
                    <Row className="show-grid">
                        <Col sm={24} md={24} lg={24}>
                            <div className='w-full h-full bg-black'>
                                haha
                            </div>
                        </Col>
                    </Row>
                    <Content className='p-4'>
                        {children}
                    </Content>
                </Container>
            </Container>
        </div>
    );
};



export default BaseBody