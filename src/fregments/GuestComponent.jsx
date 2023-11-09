import { Container, Header, Content, Footer, Sidebar } from 'rsuite';

import BaseHeader from './BaseHeader';

const GuestComponent = ({ children }) => {
    return (
        <div className="show-container">
            <Container>
                <Header>
                    <BaseHeader></BaseHeader>
                </Header>
                <Content>
                    { children }
                </Content>
                <Footer>
                    <div className='w-full bg-black h-full'>haha</div>
                </Footer>
            </Container>
        </div>
    );
    
};

export default GuestComponent