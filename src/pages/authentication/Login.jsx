import {
    Container,
    Form,
    ButtonToolbar,
    Button,
    Panel,
    FlexboxGrid,
    Message
} from 'rsuite';
import React, { useState } from 'react';

import { vertical_bg } from '@/assets/images'
import { useDispatch, useSelector } from 'react-redux';
import { setAuthen, clearAuthen, selectAuthen } from '@/reduxs/AuthenSlice';
import { authenticationEndpoints } from "@/apis";
import { useFetch } from "@/hooks";

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isCall, setIsCall] = useState(false);

    const { data: authen, loading: authenLoading, error: authenError } = useFetch(
        authenticationEndpoints.login,
        {
            'method': 'POST',
            'data': {
                'email': email,
                'password': password
            },
        },
        isCall
    );

    const handleSetAuthen = async () => {
        console.log(isCall);
        setIsCall(true);
        console.log(isCall);
        
        if (authenLoading || !authen) return <h1>Loading</h1>;
        
    };

    const handleSubmit = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        await handleSetAuthen();
    };

    return (
        <div className="show-fake-browser login-page max-h-screen">
            {authenError && <Message type="error">{authenError.response}</Message>}
            <div className='grid md:grid-cols-7 col-span-4'>
                <div className='col-span-4 flex items-center'>
                    <Container>
                        <FlexboxGrid justify="center">
                            <FlexboxGrid.Item colspan={12}>
                                <Panel header={<h3>Login</h3>} bordered>
                                    <Form fluid onSubmit={handleSubmit}>
                                        <Form.Group>
                                            <Form.ControlLabel>Email address</Form.ControlLabel>
                                            <Form.Control name="email" type="email" autoComplete="on" value={email} placeholder="Email" onChange={setEmail} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.ControlLabel>Password</Form.ControlLabel>
                                            <Form.Control name="password" type="password" autoComplete="off" value={password} placeholder="Password" onChange={setPassword} />
                                        </Form.Group>
                                        <Form.Group>
                                            <ButtonToolbar>
                                                <Button appearance="primary" type='submit'>Sign in</Button>
                                                <Button appearance="link">Forgot password?</Button>
                                            </ButtonToolbar>
                                        </Form.Group>
                                    </Form>
                                </Panel>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </Container>

                </div>

                <div className='col-span-3 md:block hidden'>
                    <img src={vertical_bg} alt="" />
                </div>
            </div>

        </div>
    );

};

export default Login