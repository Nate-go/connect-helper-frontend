import React from 'react';
import { not_found_image } from '@/assets/images';

const NotFound = () => {
    return (
        <div className='h-screen w-screen -mt-7 overflow-' style={{ backgroundColor: '#FDFAF5',
                    }}>
            <h1 className='pt-32' style={{
                textAlign: 'center',
                fontSize: '50px',
                fontFamily: 'Catamaran, sans-serif',
                fontWeight: '800',
                margin: '30px 15px'
            }}>404 Not found</h1>
            <p style={{
                maxWidth: '490px',
                margin: '30px auto 30px',
                fontSize: '19px',
                textAlign: 'center'
            }}><b>Connection helper</b> can not find out this page </p>
            <section style={{
                textAlign: 'center',
                maxWidth: '490px',
                margin: '30px auto 30px',
                fontSize: '19px'
            }}>
                <img src={not_found_image} alt="" style={{
                    maxWidth: '100%',
                    height: 'auto'
                }} />
            </section>
            <div style={{
                textAlign: 'center'
            }}>
                <a target="_blank" href="/" style={{
                    textTransform: 'uppercase',
                    fontSize: '13px',
                    backgroundColor: '#de7e85',
                    padding: '10px 15px',
                    borderRadius: '0',
                    color: '#fff',
                    display: 'inline-block',
                    marginRight: '5px',
                    marginBottom: '5px',
                    lineHeight: '1.5',
                    textDecoration: 'none',
                    marginTop: '50px',
                    letterSpacing: '1px'
                }}>Go home</a>
            </div>
        </div>
    );
}

export default NotFound;
