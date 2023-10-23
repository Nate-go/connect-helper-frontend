import { Container, Header, Content, Footer, Sidebar } from 'rsuite';

import BaseBody from './BaseBody';

const BaseComponent = ({ children }) => {
    return (
        <div className="show-container">
            <Container>
                <Container>
                    <Sidebar>
                        <BaseBody>
                            {children}
                        </BaseBody>
                        <Footer>Footer</Footer>
                    </Sidebar>
                </Container>
            </Container>
        </div>
    );
};

export default BaseComponent