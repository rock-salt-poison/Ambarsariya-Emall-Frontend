import {
  setUserToken,
  setUserTokenValid,
  setVisitorToken,
  setVisitorTokenValid,
} from './authSlice';

export const restoreTokens = (dispatch) => {
  const userToken = localStorage.getItem('accessToken');
  
  if (userToken) {
    dispatch(setUserToken(userToken));
    dispatch(setUserTokenValid(true));
  }

  const visitorToken = localStorage.getItem('visitorAccessToken');
  if (visitorToken) {
    dispatch(setVisitorToken(visitorToken));
    dispatch(setVisitorTokenValid(true));
  }
};
