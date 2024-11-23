// NotificationUtils.js
import Swal from 'sweetalert2';

export const checkNotificationPermission = async (setView) => {
  if ('permissions' in navigator) {
    try {
      const result = await navigator.permissions.query({ name: 'notifications' });
      if (result.state === 'granted') {
        setView('on');
      } else {
        setView('off');
      }
    } catch (error) {
      console.error('Error checking notification permission:', error);
    }
  } else {
    console.error('Permissions API is not supported by this browser.');
  }
};

export const handleNotificationRequest = (setView) => {
  if ('Notification' in window) {
    Notification.requestPermission()
      .then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          setView('on');
        } else if (permission === 'default') {
          setView('off');
        } else if (permission === 'denied') {
          // Check if permission has been blocked due to multiple dismissals
          if (Notification.permission === 'denied') {
            Swal.fire({
              title: 'Notifications permission blocked',
              text: 'Notifications permission has been blocked due to multiple dismissals. You can reset this in your browser settings.',
              icon: 'warning',
              customClass: {
                popup: 'swal2-popup'
              }
            });
          } else {
            Swal.fire({
              title: 'Notification permission denied.',
              text: 'You can change this in your browser settings at any time.',
              icon: 'info',
              customClass: {
                popup: 'swal2-popup'
              }
            });
          }
          setView('off');
        }
      })
      .catch((error) => {
        console.error('Error requesting notification permission:', error);
        setView('off');
      });
  } else {
    Swal.fire({
      title: 'Notifications are not supported by this browser.',
      icon: 'error',
      customClass: {
        popup: 'swal2-popup'
      }
    });
    setView('off');
  }
};
