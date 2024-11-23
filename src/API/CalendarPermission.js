// CalendarUtils.js
import Swal from 'sweetalert2';

export const checkCalendarPermission = async (setView) => {
  if ('permissions' in navigator) {
    try {
      const result = await navigator.permissions.query({ name: 'calendar' });
      if (result.state === 'granted') {
        setView('on');
      } else {
        setView('off');
      }
    } catch (error) {
      console.error('Error checking calendar permission:', error);
    }
  } else {
    console.error('Permissions API is not supported by this browser.');
  }
};

export const handleCalendarRequest = (setView) => {
  if ('calendar' in navigator) {
    navigator.calendar.requestPermission()
      .then((permissionStatus) => {
        console.log('Calendar permission status:', permissionStatus);
        if (permissionStatus === 'granted') {
          console.log('Calendar permission granted.');
          setView('on');
        } else if (permissionStatus === 'denied') {
          Swal.fire({
            title: 'Calendar permission denied.',
            text: 'You can change this in your browser settings at any time.',
            icon: 'info',
            customClass: {
              popup: 'swal2-popup'
            }
          });
          setView('off');
        } else if (permissionStatus === 'default') {
          // User dismissed the permission prompt without taking any action
          // No action needed here
          setView('off');
        }
      })
      .catch((error) => {
        console.error('Error requesting calendar permission:', error);
        setView('off');
      });
  } else {
    Swal.fire({
      title: 'Calendar access is not supported by this browser.',
      icon: 'error',
      customClass: {
        popup: 'swal2-popup'
      }
    });
    setView('off');
  }
};
