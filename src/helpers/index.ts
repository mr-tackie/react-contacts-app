import { notification } from "antd"

export const showErrorNotification = (title: string, message: string) => {
    notification.error({
        message: title,
        description: message
    })
}

export const getRandomColor = () => {
    const colors: string[] = ['#03A9F4', '#E91E63', '#F44336', '#9C27B0', '#673AB7', '#3F51B5'];
    const selected_color = colors[Math.floor(Math.random() * colors.length)];

    return selected_color;
}