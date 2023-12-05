import { Container, Sidebar, Sidenav, Content, Navbar, Nav, Row, Col, Panel, Affix } from 'rsuite';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CogIcon,
    AngleLeftIcon,
    AngleRightIcon,
    DashboardIcon,
    GroupIcon,
    HelpOutlineIcon,
    PeopleBranchIcon,
    TreemapIcon,
    CalendarIcon,
    ModelIcon,
    EmailIcon
} from '@/components/icons.js';

import { logo_image } from '@/assets/images'
import { getCurrentPath } from '@/helpers/pathHelper';
import UserHeader from './UserHeader';
import QuickAccess from './QuickAccess';
import { getAuthentication } from "@/helpers/authenHelpers";
import { UserRole } from "@/constants";

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

    const handleNavigate = (path) => {
        navigate(path);
    };

    const itemStyle = (path) => {
        return activeKey(path) ? 'border-x-4 border-blue-600' : 'border-r-4 border-blue-100';
    }

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
                            <Nav appearance="subtle">
                                <Nav.Item className={itemStyle('/dashboard')} eventKey="/dashboard" onClick={() => handleNavigate('/dashboard')} active={activeKey('/dashboard')} icon={<DashboardIcon />}>
                                    Dashboard
                                </Nav.Item>
                                {
                                    getAuthentication().user.role == UserRole.OWNER &&
                                    <>
                                        <Nav.Item className={itemStyle('/users')} eventKey="/users" onClick={() => handleNavigate('/users')} active={activeKey('/users')} icon={<GroupIcon />}>
                                            Users
                                        </Nav.Item>
                                    </>
                                    
                                }
                                {
                                    getAuthentication().user.role == UserRole.ADMIN && 
                                    <Nav.Item className={itemStyle('/enterprises')} eventKey="/users" onClick={() => handleNavigate('/enterprises')} active={activeKey('/enterprises')} icon={<ModelIcon />}>
                                        Enterprises
                                    </Nav.Item>
                                }
                                {
                                    getAuthentication().user.role !== UserRole.ADMIN &&
                                    <>
                                        <Nav.Item className={itemStyle('/connections')} eventKey="/connections" onClick={() => handleNavigate('/connections')} active={activeKey('/connections')} icon={<PeopleBranchIcon />}>
                                            Connections
                                        </Nav.Item>
                                        <Nav.Item className={itemStyle('/email-schedules')} eventKey="/email-schedules" onClick={() => handleNavigate('/email-schedules')} active={activeKey('/email-schedules')} icon={<EmailIcon />}>
                                            Email Schedules
                                        </Nav.Item>
                                        <Nav.Item className={itemStyle('/mail-templates')} eventKey="/mail-templates" onClick={() => handleNavigate('/mail-templates')} active={activeKey('/mail-templates')} icon={<TreemapIcon />}>
                                            Mail templates
                                        </Nav.Item>
                                        <Nav.Item className={itemStyle('/schedules')} eventKey="/schedules" onClick={() => handleNavigate('/schedules')} active={activeKey('/schedules')} icon={<CalendarIcon />}>
                                            Schedules
                                        </Nav.Item>
                                    </>
                                }
                                {/* <Nav.Menu
                                    eventKey="3"
                                    trigger="hover"
                                    title="Advanced"
                                    icon={<AppSelectIcon />}
                                    placement="rightStart"
                                    className='border-r-4 border-blue-100'
                                >
                                    <Nav.Item eventKey="3-1" onClick={() => handleNavigate('/')}>Home</Nav.Item>
                                    <Nav.Item eventKey="3-2" onClick={() => handleNavigate('/about')} >About</Nav.Item>
                                    <Nav.Item eventKey="3-3" onClick={() => handleNavigate('/contact')}>Contact</Nav.Item>
                                </Nav.Menu> */}
                            </Nav>
                        </Sidenav.Body>
                    </Sidenav>
                    <NavToggle expand={expand} onChange={() => setExpand(!expand)} handleSignOut={() => handleSignOut()} />
                </Sidebar>
                
                <Container className='w-full'>
                    <Row className="show-grid">
                        <Col sm={24} md={24} lg={24} className='relative'>
                            <Affix top={0} className='bg-white'>
                                <UserHeader />
                            </Affix>
                            <Content className='p-4'>
                                {children}
                            </Content>
                            <div className='fixed top-[85vh] right-[5vh]'>
                                <QuickAccess/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </div>
    );
};



export default BaseBody