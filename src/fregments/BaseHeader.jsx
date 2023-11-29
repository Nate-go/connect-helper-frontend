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
    InfoRoundIcon,
    BsPersonFillCheck
} from '@/components/icons.js';

const CustomNavbar = ({ onSelect, ...props }) => {
    const auth = getAuthentication();
    const navigate = useNavigate();
    const currentPath = getCurrentPath();
    const activeKey = (path) => {
        if(path !== '/') return currentPath.includes(path);
        return currentPath === path;
    };

    return (
        <Navbar {...props}>
            <Navbar.Brand href="/">
                <img src={logo_image} alt="" className='w-28 -mt-5 h-14 -ml-3' />
            </Navbar.Brand>
            <Nav onSelect={onSelect} >
                {/* <Nav.Item eventKey="/" active={activeKey('/')} icon={<IoIosHome />} onClick={() => navigate('/')}>
                    Home
                </Nav.Item>
                <Nav.Item eventKey="/about" active={activeKey('/about')}  onClick={() => navigate('/about')} icon={<InfoRoundIcon/>}>About</Nav.Item>
                <Nav.Item eventKey="/contact" active={activeKey('/contact')}  onClick={() => navigate('/contact')} icon={<IoMdContacts/>}>Contact</Nav.Item> */}
                {!auth && (
                    <>
                        <Nav.Item eventKey="/login" active={activeKey('/login')}  onClick={() => navigate('/login')}  icon={<CgLogIn/>}>Login</Nav.Item>
                        <Nav.Item eventKey="/signup" active={activeKey('/signup')}  onClick={() => navigate('/signup')} icon={<IoMdPersonAdd/>}>Sign Up</Nav.Item>
                        {/* <Nav.Item eventKey="/verify-account" active={activeKey('/verify-account')}  onClick={() => navigate('/verify-account')} icon={<BsPersonFillCheck />}>Verify Account</Nav.Item> */}
                    </>
                )}
                {auth && (
                    <>
                        <Nav.Item eventKey="/dashboard" active={activeKey('/dashboard')}  onClick={() => navigate('/dashboard')} icon={<DashboardIcon />}>Dashboard</Nav.Item>
                    </>
                )}
                
            </Nav>
            <Nav pullRight>
                <Nav.Menu title="Setting" icon={<CogIcon />}>
                    <Nav.Item eventKey="/help" active={activeKey('/help')}  onClick={() => navigate('/help')} icon={<HelpOutlineIcon/>}>Help</Nav.Item>
                </Nav.Menu>
            </Nav>
        </Navbar>
    );
};

const BaseHeader = () => {

    return (
        <CustomNavbar appearance="subtle"/>
    );
};

export default BaseHeader