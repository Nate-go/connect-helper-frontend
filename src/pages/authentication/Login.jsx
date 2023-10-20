import React from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
}
    from 'mdb-react-ui-kit';

import { logo_image, vertical_bg } from '@/assets/images'

function Login() {
    return (
        <MDBContainer fluid>
            <div className='grid-cols-2 grid'>

                <div className='col-span-1'>

                    <div className='flex items-center'>
                        <img src={logo_image}
                            alt="Login image" className="w-50"/>
                    </div>

                    <div className='flex items-center'>

                        <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Log in</h3>

                        <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' type='email' size="lg" />
                        <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type='password' size="lg" />

                        <MDBBtn className="mb-4 px-5 w-100" color='info' size='lg'>Login</MDBBtn>
                        <p className="small mb-5 pb-lg-3 "><a class="text-muted" href="#!">Forgot password?</a></p>
                        <p className=''>Don't have an account? <a href="#!" class="link-info">Register here</a></p>

                    </div>

                </div>

                <div className='d-none d-sm-block px-0 col-span-1'>
                    <img src={vertical_bg}
                        alt="Login image" className="w-100 h-50" style={{ objectFit: 'cover', objectPosition: 'left' }} />
                </div>

            </div>

        </MDBContainer>
    );
}

export default Login;