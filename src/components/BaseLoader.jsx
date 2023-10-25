import { Loader } from 'rsuite';
import { SpinnerIcon } from './icons';
import { connection_bg } from '@/assets/images';

const BaseLoader = () => {
    const containerStyle = {
        position: 'relative',
        width: '100%',
        height: '100%',
    };

    const backgroundStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${connection_bg})`,
        backgroundSize: 'cover',
        opacity: '0.2',
    };

    const contentStyle = {
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    };

    return (
        <div style={containerStyle}>
            <div style={backgroundStyle}></div>
            <div className='text-blue-600'  style={contentStyle}>
                <SpinnerIcon pulse style={{ fontSize: '3em' }} />
                <div className='font-mono'>Loading...</div>
            </div>
        </div>
    );
};

export default BaseLoader;
