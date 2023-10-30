import React, { useState, useEffect } from 'react';
import {
    Container,
    Form,
    ButtonToolbar,
    Button,
    Panel,
    FlexboxGrid,
    Message,
    Loader,
    useToaster
} from 'rsuite';

import { register_gif } from '@/assets/images'
import { authenticationEndpoints } from "@/apis";
import { useApi } from "@/hooks";
import { useNavigate } from 'react-router-dom';
import { ToastMessage } from '@/components';

const CLIENT_ID = "359676249009-34tqpm71tj75n1t21ibcl7u2nr1kmsn3.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/userinfo.profile";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [emailToken, setEmailToken] = useState({});
    const [enterprise, setEnterprise] = useState('');
    const toaster = useToaster();

    const navigate = useNavigate();
    const { data, loading, error, callApi: handleSignUp } = useApi();

    const selectEmail = () => {
        emailToken.requestAccessToken();
    }

    const onSignUp = async () => {
        if(! email ) {
            toaster.push(ToastMessage('error', 'You have not selected email yet'), 'topEnd');
            return;
        }
        await handleSignUp(
            authenticationEndpoints.signup,
            {
                'method': 'POST',
                'data': {
                    'name': name,
                    'email': email,
                    'password': password,
                    'password_confirmation': confirmPassword,
                    'enterprise': enterprise,
                },
            }
        );
    }

    useEffect(() => {
        if(data) {
            console.log(data);
            navigate('/dashboard');
        }
    }, [data]);

    const responseGoogle = (response) => {
        setEmail(response);
        console.log(email);
    }

    useEffect(() => {
        const google = window.google;

        google.accounts.id.initialize({
            client_id: CLIENT_ID,
        });

        setEmailToken(
            google.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID,
                callback: responseGoogle,
                scope: SCOPES
            })
        );

    }, []);

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
                                    <Form.Group className='flex flex-col pb-5'>
                                        <Form.ControlLabel>Email address</Form.ControlLabel>
                                        {email?.access_token ? 
                                            <input type="submit" onClick={selectEmail} className='bg-green-500 rs-btn rs-btn-primary' value="Selected" />
                                            :
                                            <input type="submit" onClick={selectEmail} className='bg-blue-500 rs-btn rs-btn-primary' value="Select email" />
                                        }
                                    </Form.Group>
                                    <Form fluid onSubmit={onSignUp}>
                                        <Form.Group>
                                            <Form.ControlLabel>Name</Form.ControlLabel>
                                            <Form.Control name="name" type="text" autoComplete="off" value={name} placeholder="Name" onChange={setName} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.ControlLabel>Enterprise</Form.ControlLabel>
                                            <Form.Control name="name" type="text" autoComplete="off" value={enterprise} placeholder="Enterprise" onChange={setEnterprise} />
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