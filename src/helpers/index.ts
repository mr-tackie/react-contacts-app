import { notification } from "antd";

export const showErrorNotification = (title: string, message: string) => {
  notification.error({
    message: title,
    description: message
  });
};

export const getRandomColor = () => {
  const colors: string[] = [
    "#03A9F4",
    "#E91E63",
    "#F44336",
    "#9C27B0",
    "#673AB7",
    "#3F51B5"
  ];
  const selected_color = colors[Math.floor(Math.random() * colors.length)];

  return selected_color;
};

export const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const validatePhone = (phone: string) => {
  const re = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
  return re.test(phone);
}