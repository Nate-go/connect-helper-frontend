import { Container, Header, Content, Footer, Sidebar } from 'rsuite';

import BaseHeader from './BaseHeader';
import BaseFooter from './BaseFooter'

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
                    <BaseFooter/>
                </Footer>
            </Container>
        </div>
    );
    
};

export default GuestComponent