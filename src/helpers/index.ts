import { notification } from "antd"

export const showErrorNotification = (title: string, message: string) => {
    notification.error({
        message: title,
        description: message
    })
}