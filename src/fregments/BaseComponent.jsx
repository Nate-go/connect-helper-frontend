import { Container, Header, Content, Footer, Sidebar } from 'rsuite';

import BaseBody from './BaseBody';

const BaseComponent = ({ children }) => {
    return (
        <div className="show-container w-full">
            <Sidebar width={'w-full'} className='min-h-screen'>
                <BaseBody>
                    {children}
                </BaseBody>
                <Footer>Footer</Footer>
            </Sidebar>
        </div>
    );
};

export default BaseComponent