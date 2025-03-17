import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getNotifications } from '../../services/api';

const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #ffcc00;
  color: black;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await getNotifications();
      setNotifications(data);
    };

    fetchNotifications();
  }, []);

  return (
    <NotificationContainer>
      {notifications.length > 0 ? (
        notifications.map((notif, index) => <p key={index}>{notif.message}</p>)
      ) : (
        <p>Aucune alerte</p>
      )}
    </NotificationContainer>
  );
};

export default Notifications;
