import React, { useState, useEffect } from 'react';
import {
    Container,
    Form,
    ButtonToolbar,
    Button,
    Panel,
    FlexboxGrid,
    Message,
    Loader
} from 'rsuite';

import { register_gif } from '@/assets/images'
import { authenticationEndpoints } from "@/apis";
import { useApi } from "@/hooks";
import { useNavigate } from 'react-router-dom';
import { setAuthentication } from '@/helpers/authenHelpers';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');

    const navigate = useNavigate();
    const { data, loading, error, callApi: handleSignUp } = useApi();

    const onSignUp = async () => {
        await handleSignUp(
            authenticationEndpoints.signup,
            {
                'method': 'POST',
                'data': {
                    'name': name,
                    'email': email,
                    'password': password,
                    'password_confirmation': confirmPassword
                },
            }
        );
    }

    useEffect(() => {
        if(data) {
            navigate('/verify-account');
        }
    }, [data]);

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
                                    <Form fluid onSubmit={onSignUp}>
                                        <Form.Group>
                                            <Form.ControlLabel>Name</Form.ControlLabel>
                                            <Form.Control name="name" type="text" autoComplete="off" value={name} placeholder="Name" onChange={setName} />
                                        </Form.Group>
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
                                        {error && (<Message type="error" className='mb-5' showIcon header>{error.data.message}</Message>)}
                                        <Form.Group>
                                            <ButtonToolbar>
                                                {!loading && <Button appearance="primary" type='submit' className='bg-blue-500'>Sign up</Button>}
                                                {loading && <Loader content="Loading..." />}
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