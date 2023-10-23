import { Navbar, Nav } from 'rsuite';
import HomeIcon from '@rsuite/icons/legacy/Home';
import CogIcon from '@rsuite/icons/legacy/Cog';
import React from 'react';

import { logo_image } from '@/assets/images'

const CustomNavbar = ({ onSelect, activeKey, ...props }) => {
    return (
        <Navbar {...props}>
            <Navbar.Brand href="/home">
                <img src={logo_image} alt="" className='w-28 -mt-5 h-14 -ml-3' />
            </Navbar.Brand>
            <Nav onSelect={onSelect} activeKey={activeKey}>
                <Nav.Item eventKey="1" icon={<HomeIcon />}>
                    Home
                </Nav.Item>
                <Nav.Item eventKey="2">News</Nav.Item>
                <Nav.Item eventKey="3">Products</Nav.Item>
                <Nav.Menu title="About">
                    <Nav.Item eventKey="4">Company</Nav.Item>
                    <Nav.Item eventKey="5">Team</Nav.Item>
                    <Nav.Item eventKey="6">Contact</Nav.Item>
                </Nav.Menu>
            </Nav>
            <Nav pullRight>
                <Nav.Item icon={<CogIcon />}>Settings</Nav.Item>
            </Nav>
        </Navbar>
    );
};

const BaseHeader = () => {
    const [activeKey, setActiveKey] = React.useState(null);

    return (
        <CustomNavbar appearance="subtle" activeKey={activeKey} onSelect={setActiveKey} />
    );
};

export default BaseHeader