import React, { useState } from 'react';
import {
    Container,
    Form,
    ButtonToolbar,
    Button,
    Panel,
    FlexboxGrid,
    Message
} from 'rsuite';

import { register_gif } from '@/assets/images'
import { authenticationEndpoints } from "@/apis";
import { useApi } from "@/hooks";
import { useNavigate } from 'react-router-dom';
import { setAuthentication } from '@/helpers/authenHelpers';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { data, loading, error, callApi: handleSignUp } = useApi();

    useEffect(() => {
        if (data) {
            setAuthentication(data);
        }
        navigate('/dashboard');
    }, [data]);

    const onLogin = async () => {
        await handleLogin(authenticationEndpoints.login,
            {
                'method': 'POST',
                'data': {
                    'email': email,
                    'password': password
                },
            });
    }

    const handleError = (error) => {
        switch (error.status) {
            case 401:
                return "Your login information is not true";
            case 422:
                return error.data.password ? error.data.password : error.data.email
        }
    };

    return (
        <div className="show-fake-browser login-page max-h-screen">
            <div className='grid md:grid-cols-7 col-span-4'>
                <div className='col-span-3 md:block hidden'>
                    <img src={register_gif} alt="" />
                </div>

                <div className='col-span-4 flex items-center'>
                    <Container>
                        <FlexboxGrid justify="center">
                            <FlexboxGrid.Item colspan={12}>
                                <Panel header={<h3>Sign up</h3>} bordered>
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
                                            <Form.ControlLabel>Confirm Password</Form.ControlLabel>
                                            <Form.Control name="confirm password" type="password" autoComplete="off" value={confirmPassword} placeholder="Confirm Password" onChange={setConfirmPassword} />
                                        </Form.Group>
                                        {error && (<Message type="error" className='mb-5' closable>{handleError(error)}</Message>)}
                                        <Form.Group>
                                            <ButtonToolbar>
                                                <Button appearance="primary" className='bg-blue-500' type='submit'>Sign up</Button>
                                            </ButtonToolbar>
                                        </Form.Group>
                                    </Form>
                                </Panel>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </Container>

                </div>
            </div>

        </div>
    );

};

export default SignUp