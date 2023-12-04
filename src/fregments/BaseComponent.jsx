import { Container, Header, Content, Footer, Sidebar } from 'rsuite';

import BaseBody from './BaseBody';
import BaseFooter from './BaseFooter';

const BaseComponent = ({ children }) => {
    return (
        <div className="show-container w-full">
            <Sidebar width={'w-full'} className='min-h-screen'>
                <BaseBody>
                    {children}
                </BaseBody>
                <Footer>
                    <BaseFooter/>
                </Footer>
            </Sidebar>
        </div>
    );
};

export default BaseComponent