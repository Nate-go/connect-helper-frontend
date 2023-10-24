import { Navbar, Nav } from 'rsuite';
import React from 'react';

import { getAuthentication } from '@/helpers/authenHelpers';
import { getCurrentPath } from '@/helpers/pathHelper';

import { logo_image } from '@/assets/images'
import {
    CogIcon,
    DashboardIcon,
    HelpOutlineIcon,
    IoMdContacts,
    IoMdPersonAdd,
    IoIosHome,
    CgLogIn,
    InfoRoundIcon
} from '@/components/icons.js';

const CustomNavbar = ({ onSelect, activeKey, ...props }) => {
    const auth = getAuthentication();

    return (
        <Navbar {...props}>
            <Navbar.Brand href="/">
                <img src={logo_image} alt="" className='w-28 -mt-5 h-14 -ml-3' />
            </Navbar.Brand>
            <Nav onSelect={onSelect} activeKey={activeKey}>
                <Nav.Item eventKey="/" icon={<IoIosHome />} href='/'>
                    Home
                </Nav.Item>
                <Nav.Item eventKey="/about" href='/about' icon={<InfoRoundIcon/>}>About</Nav.Item>
                <Nav.Item eventKey="/contact" href='/contact' icon={<IoMdContacts/>}>Contact</Nav.Item>
                {!auth && (
                    <>
                        <Nav.Item eventKey="/login" href='/login' icon={<CgLogIn/>}>Login</Nav.Item>
                        <Nav.Item eventKey="/signup" href='/signup' icon={<IoMdPersonAdd/>}>Sign Up</Nav.Item>
                    </>
                )}
                {auth && (
                    <>
                        <Nav.Item eventKey="/dashboard" href='/dashboard' icon={<DashboardIcon />}>Dashboard</Nav.Item>
                    </>
                )}
                
            </Nav>
            <Nav pullRight>
                <Nav.Menu title="Setting" icon={<CogIcon />}>
                    <Nav.Item eventKey="/help" href='/help' icon={<HelpOutlineIcon/>}>Help</Nav.Item>
                </Nav.Menu>
            </Nav>
        </Navbar>
    );
};

const BaseHeader = () => {
    const currentPath = getCurrentPath();
    const [activeKey, setActiveKey] = React.useState(currentPath);

    return (
        <CustomNavbar appearance="subtle" activeKey={activeKey} onSelect={setActiveKey} />
    );
};

export default BaseHeader