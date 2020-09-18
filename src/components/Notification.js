import React from "react";

const Notification = ({ notification }) => {
  if (!notification.message) return null;

  return (
    <p className={`notifications ${notification.type}`}>
      {notification.message}
    </p>
  );
};

export default Notification;
