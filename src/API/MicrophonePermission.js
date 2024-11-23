// MicrophoneUtils.js
import Swal from 'sweetalert2';

export const checkMicrophonePermission = async (setView) => {
  if ('permissions' in navigator) {
    try {
      const result = await navigator.permissions.query({ name: 'microphone' });
      if (result.state === 'granted') {
        setView('on');
      } else {
        setView('off');
      }
    } catch (error) {
      console.error('Error checking microphone permission:', error);
    }
  } else {
    console.error('Permissions API is not supported by this browser.');
  }
};

export const handleMicrophoneRequest = (setView) => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => {
        console.log('Microphone access granted.');
        setView('on');
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error.message);
        if (error.message === 'Permission denied') {
          Swal.fire({
            title: 'Microphone permission denied.',
            text: 'You can change this in your browser settings at any time.',
            icon: 'info',
            customClass: {
              popup: 'swal2-popup'
            }
          });
        }
        else if (error.message === 'Permission dismissed') {
          setView('off')
        }
        setView('off');
      });
  } else {
    Swal.fire({
      title: 'Microphone access is not supported by this browser.',
      icon: 'error',
      customClass: {
        popup: 'swal2-popup'
      }
    });
    setView('off');
  }
};


