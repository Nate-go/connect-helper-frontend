import { Navbar, Nav } from 'rsuite';
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

    return (
        <Navbar {...props}>
            <Navbar.Brand href="/">
                <img src={logo_image} alt="" className='w-28 -mt-5 h-14 -ml-3' />
            </Navbar.Brand>
            <Nav onSelect={onSelect} activeKey={activeKey}>
                <Nav.Item eventKey="/" icon={<IoIosHome />} onClick={() => navigate('/')}>
                    Home
                </Nav.Item>
                <Nav.Item eventKey="/about" onClick={() => navigate('/about')} icon={<InfoRoundIcon/>}>About</Nav.Item>
                <Nav.Item eventKey="/contact" onClick={() => navigate('/contact')} icon={<IoMdContacts/>}>Contact</Nav.Item>
                {!auth && (
                    <>
                        <Nav.Item eventKey="/login" onClick={() => navigate('/login')}  icon={<CgLogIn/>}>Login</Nav.Item>
                        <Nav.Item eventKey="/signup" onClick={() => navigate('/signup')} icon={<IoMdPersonAdd/>}>Sign Up</Nav.Item>
                    </>
                )}
                {auth && (
                    <>
                        <Nav.Item eventKey="/dashboard" onClick={() => navigate('/dashboard')} icon={<DashboardIcon />}>Dashboard</Nav.Item>
                    </>
                )}
                
            </Nav>
            <Nav pullRight>
                <Nav.Menu title="Setting" icon={<CogIcon />}>
                    <Nav.Item eventKey="/help" onClick={() => navigate('/help')} icon={<HelpOutlineIcon/>}>Help</Nav.Item>
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