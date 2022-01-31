export const initialNotificationState = {
  showNotification: false,
  message: "",
  status: "",
};

export const TURNON = "ON";

const notificationReducer = (notificationState, action) => {
  const { type, payload } = action;

  if (type === TURNON) {
    return {
      showNotification: true,
      message: payload.message,
      status: payload.status,
    };
  }
  return initialNotificationState;
};

export default notificationReducer;
