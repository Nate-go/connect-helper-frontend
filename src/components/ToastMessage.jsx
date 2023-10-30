import {
    Notification,
} from 'rsuite';

const ToastMessage = (type, content) => {
    return (
        <Notification type={type} header={content} closable>
        </Notification>
    );
}

export default ToastMessage