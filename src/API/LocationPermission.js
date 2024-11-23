// LocationUtils.js
import Swal from 'sweetalert2';

export const checkLocationPermission = async (setView) => {
  if ('permissions' in navigator) {
    try {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      if (result.state === 'granted') {
        setView('on');
      } else {
        setView('off');
      }
    } catch (error) {
      console.error('Error checking location permission:', error);
    }
  } else {
    console.error('Permissions API is not supported by this browser.');
  }
};

export const handleLocationRequest = (setView) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('User location:', position);
        setView('on');
      },
      (error) => {
        console.error('Geolocation error:', error);
        if (error.code === error.PERMISSION_DENIED) {
          // Check if permission has been blocked due to multiple dismissals
          navigator.permissions.query({ name: 'geolocation' }).then((result) => {
            console.log('Permission state:', result.state);
            if (result.state === 'denied') {
              Swal.fire({
                title: 'Location permission blocked',
                text: 'Location permission has been blocked due to multiple dismissals. You can reset this in your browser settings.',
                icon: 'warning',
                customClass: {
                  popup: 'swal2-popup'
                }
              });
            } else if (result.state === 'prompt') {
              // Handle case where user closes the permission prompt without taking action
              // No alert is shown in this case
              setView('off');
            } else {
              Swal.fire({
                title: 'Location permission denied.',
                text: 'You can change this in your browser settings at any time.',
                icon: 'info',
                customClass: {
                  popup: 'swal2-popup'
                }
              });
            }
            setView('off');
          }).catch((error) => {
            console.error('Error querying location permission:', error);
            setView('off');
          });
        } else {
          setView('off');
        }
      }
    );
  } else {
    Swal.fire({
      title: 'Location is not supported by this browser.',
      icon: 'error',
      customClass: {
        popup: 'swal2-popup'
      }
    });
    setView('off');
  }
};
