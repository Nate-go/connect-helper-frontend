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
                <Footer>Footer</Footer>
            </Container>
        </div>
    );
    
};

export default GuestComponent