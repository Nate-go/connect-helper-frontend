import React, { useState, useEffect } from 'react';
import {
    Container,
    Form,
    ButtonToolbar,
    Button,
    Panel,
    FlexboxGrid,
    Message, 
    Nav,
    Loader
} from 'rsuite';

import { authenticationEndpoints } from "@/apis";
import { useApi } from "@/hooks";
import { useNavigate } from 'react-router-dom';
import { active_account_img } from '@/assets/images';

const Navbar = ({ active, onSelect, ...props }) => {
    return (
        <Nav {...props} activeKey={active} onSelect={onSelect} style={{ marginBottom: 10 }}>
            <Nav.Item eventKey="activeAccount">Active account</Nav.Item>
            <Nav.Item eventKey="sendVerify">Send verify code</Nav.Item>

        </Nav>
    );
};

const VerifyAccount = () => {
    const activeAccount = 'activeAccount';
    const [active, setActive] = React.useState(activeAccount);
    const [email, setEmail] = useState('');
    const [verifyCode, setVerifyCode] = useState('');

    const navigate = useNavigate();
    const { data: activeAccountData, loading: activeAccountLoading, error: activeAccountError, callApi: handleActiveAccount } = useApi();
    const { data: sendVerifyData, loading: sendVerifyLoading, error: sendVerifyError, callApi: handleSendVerify } = useApi();

    useEffect(() => {
        if(activeAccountData) {
            navigate('/login');
        }
    }, [activeAccountData]);

    const onAcctiveAccount = async () => {
        await handleActiveAccount(
            authenticationEndpoints.activeAccount,
            {
                'method': 'POST',
                'data': {
                    'email': email,
                    'verify_code': verifyCode
                },
            }
        );
    }

    const onSendVerify = async () => {
        await handleSendVerify(
            authenticationEndpoints.sendVerify,
            {
                'method': 'POST',
                'data': {
                    'email': email,
                },
            }
        );
    }

    return (
        <div className="show-fake-browser login-page max-h-screen">
            <div className='grid md:grid-cols-7 col-span-4'>
                <div className='col-span-4 flex items-center'>
                    <Container>
                        <FlexboxGrid justify="center">
                            <FlexboxGrid.Item colspan={12}>
                                <Navbar appearance="subtle" active={active} onSelect={setActive} />
                                <Panel bordered>
                                    <Form fluid onSubmit={active == activeAccount ? onAcctiveAccount : onSendVerify}>
                                        <Form.Group>
                                            <Form.ControlLabel>Email address</Form.ControlLabel>
                                            <Form.Control name="email" type="email" autoComplete="on" value={email} placeholder="Email" onChange={setEmail} />
                                        </Form.Group>
                                        {active == activeAccount ? 
                                        <>
                                            <Form.Group>
                                                <Form.ControlLabel>Verify code</Form.ControlLabel>
                                                <Form.Control name="verifyCode" type="text" autoComplete="off" value={verifyCode} placeholder="Verify code" onChange={setVerifyCode} />
                                            </Form.Group>
                                                {activeAccountError && (<Message type="error" className='mb-5' showIcon header>{activeAccountError.data.message}</Message>)}
                                            <Form.Group>
                                                <ButtonToolbar>
                                                    {!activeAccountLoading && <Button appearance="primary" type='submit' className='bg-blue-500'>Active</Button>}
                                                    {activeAccountLoading && <Loader content="Loading..." />}
                                                </ButtonToolbar>
                                            </Form.Group>
                                        </> : 
                                        <>
                                            {sendVerifyError && (<Message type="error" className='mb-5' showIcon header>{sendVerifyError.data.message}</Message>)}
                                                {sendVerifyData && (<Message type="success" className='mb-5' showIcon header>{sendVerifyData.message}</Message>)}
                                            <Form.Group>
                                                <ButtonToolbar>
                                                    {!sendVerifyLoading && <Button appearance="primary" type='submit' className='bg-blue-500'>Send verify code</Button>}
                                                    {sendVerifyLoading && <Loader content="Loading..." />}
                                                </ButtonToolbar>
                                            </Form.Group>
                                        </>
                                        }
                                        
                                    </Form>
                                </Panel>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </Container>

                </div>

                <div className='col-span-3 md:block hidden'>
                    <img src={active_account_img} alt="" />
                </div>
            </div>

        </div>
    );
};

export default VerifyAccount