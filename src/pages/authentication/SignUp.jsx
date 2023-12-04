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
} from 'rsuite';

import { authenticationEndpoints } from "@/apis";
import { useApi } from "@/hooks";
import { useNavigate, useSearchParams } from 'react-router-dom';
import {InputPassword} from '@/components/inputs';
import { decodeToken } from '@/helpers/dataHelpers';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [enterprise, setEnterprise] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();
    const { data, loading, error, callApi: handleSignUp } = useApi();
    const { data: tokenData, callApi: handleGetToken } = useApi();


    const selectEmail = () => {
        try {
            const clientId = import.meta.env.VITE_CLIENT_ID;
            const redirectUri = import.meta.env.VITE_APP_URL;
            const scopes = import.meta.env.VITE_SCOPES;

            const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(
                scopes
            )}&response_type=code&prompt=consent&access_type=offline`;
            window.location.href = authUrl;
        } catch (error) {
            console.error('Error initiating authorization flow:', error);
        }
    }

    const onSignUp = async () => {
        if(! email ) {
            return;
        }

        await handleSignUp(
            authenticationEndpoints.signup,
            {
                'method': 'POST',
                'data': {
                    'name': name,
                    'gmail_token': email,
                    'password': password,
                    'password_confirmation': confirmPassword,
                    'enterprise': enterprise,
                },
            }
        );
    }

    useEffect(() => {
        if(data) {
            navigate('/login');
        }
    }, [data]);

    useEffect(() => {
        if(!tokenData) return;

        setEmail(tokenData);

    }, [tokenData]);

    const getEmail = () => {
        const data = decodeToken(email?.id_token);

        return data?.email;
    }

    useEffect(() => {
        const fetchData = async () => {
            if (searchParams.has('code')) {
                const code = searchParams.get('code');
                await handleGetToken(
                    'https://oauth2.googleapis.com/token',
                    {
                        method: 'POST',
                        data: {
                            client_id: import.meta.env.VITE_CLIENT_ID,
                            client_secret: import.meta.env.VITE_CLIENT_SECRET,
                            code: code,
                            grant_type: 'authorization_code',
                            redirect_uri: import.meta.env.VITE_APP_URL,
                        },
                    }
                );
            } 
        };

        fetchData();
    }, []);

    return (
        <div className="show-fake-browser login-page max-h-screen">
            <div className='grid md:grid-cols-7 col-span-4'>
                <div className='col-span-3 md:block hidden'>
                    <img src="https://res.cloudinary.com/dsrtzowwc/image/upload/v1701227993/register_p61juw.webp" alt="" />
                </div>

                <div className='col-span-4 flex items-center'>
                    <Container>
                        <FlexboxGrid justify="center">
                            <FlexboxGrid.Item colspan={12}>
                                <Panel header={<h3>Sign up</h3>} bordered>
                                    {!email && <Form.Group className='flex flex-col pb-5'>
                                        <Form.ControlLabel>Select email to continute</Form.ControlLabel>
                                        <input type="submit" onClick={selectEmail} className='bg-blue-500 rs-btn rs-btn-primary' value="Select email to continue" />

                                    </Form.Group>}
                                    
                                    {email && 
                                        <Form fluid onSubmit={onSignUp}>
                                            <Form.Group>
                                                <Form.ControlLabel>Email address</Form.ControlLabel>
                                                <Form.Control name="email" type="text" readOnly value={getEmail()}/>
                                            </Form.Group>
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
                                                <InputPassword value={password} onChange={setPassword} placeholder='Password' />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.ControlLabel>Confirm Password</Form.ControlLabel>
                                                <InputPassword value={confirmPassword} onChange={setConfirmPassword} placeholder='Confirm password' />
                                            </Form.Group>
                                            {error && (<Message type="error" className='mb-5' showIcon header>{error.data.message}</Message>)}
                                            <Form.Group>
                                                <ButtonToolbar>
                                                    {!loading && <Button appearance="primary" type='submit' className='bg-blue-500'>Sign up</Button>}
                                                    {loading && <Loader content="Loading..." />}
                                                </ButtonToolbar>
                                            </Form.Group>
                                        </Form>
                                    }
                                    
                                    
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