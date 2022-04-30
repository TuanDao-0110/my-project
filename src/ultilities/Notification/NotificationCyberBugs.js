import { Button, message, notification, Space } from 'antd';



export const openNotificationWithIcon = (type, newMessage, newDescription) => {
    notification[type]({
        message: newMessage,
        description: newDescription
    });
};