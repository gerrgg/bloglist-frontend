import React from "react";

const Notification = ({ notificationMessage, notificationClass }) => {
  if (!notificationMessage || !notificationClass) return null;

  return (
    <p className={`notifications ${notificationClass}`}>
      {notificationMessage}
    </p>
  );
};

export default Notification;
