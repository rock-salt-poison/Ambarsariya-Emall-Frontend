// CameraUtils.js
import Swal from 'sweetalert2';

export const checkCameraPermission = async (setView) => {
  if ('permissions' in navigator) {
    try {
      const result = await navigator.permissions.query({ name: 'camera' });
      if (result.state === 'granted') {
        setView('on');
      } else {
        setView('off');
      }
    } catch (error) {
      console.error('Error checking camera permission:', error);
    }
  } else {
    console.error('Permissions API is not supported by this browser.');
  }
};

export const handleCameraRequest = (setView) => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(() => {
          console.log('Camera access granted.');
          setView('on');
        })
        .catch((error) => {
          if (error.message === 'Permission dismissed') {
            
          }else if (error.message === 'Permission denied') {
            Swal.fire({
              title: 'Camera permission denied.',
              text: 'You can change this in your browser settings at any time.',
              icon: 'info',
              customClass: {
                popup: 'swal2-popup'
              }
            });
          }  else {
            Swal.fire({
              title: 'Error accessing camera.',
              text: `${error.message}`,
              icon: 'error',
              customClass: {
                popup: 'swal2-popup'
              }
            });
          }
          setView('off');
        });
    } else {
      Swal.fire({
        title: 'Camera access is not supported by this browser.',
        icon: 'error',
        customClass: {
          popup: 'swal2-popup'
        }
      });
      setView('off');
    }
  };
  
