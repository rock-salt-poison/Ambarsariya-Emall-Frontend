import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, ThemeProvider, Tooltip } from '@mui/material';
import Cards from '../../Components/Support/Cards';
import UserForm from '../../Components/Support/UserForm';
import Button2 from '../../Components/Home/Button2';
import VisitorFormBox from '../../Components/Support/VisitorFormBox';
import attachment_icon from '../../Utils/images/Sell/support/attachment_icon.png';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import FormField from '../../Components/Form/FormField';
import { useSelector } from 'react-redux';
import { get_visitorData, getMemberData, getShopUserData, getUser } from '../../API/fetchExpressAPI';
import CustomSnackbar from '../../Components/CustomSnackbar';
import UserBadge from '../../UserBadge';

function Support(props) {
  const [file, setFile] = useState(null); // State to hold the uploaded file
  const [isFormValid, setIsFormValid] = useState(false); // State to track form validation
  // const [userName, setUserName] = useState('');
  const [visitorData, setVisitorData] = useState(null);
  const [shopData, setShopData] = useState(null);
  const [memberData, setMemberData] = useState(null);
  const [userLoggedIn , setUserLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [loading, setLoading] = useState(false);
  
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const token = useSelector((state) => state.auth.userAccessToken);

  const themeProps = {
    popoverBackgroundColor: props.popoverBackgroundColor || 'var(--yellow)',
    scrollbarThumb : 'var(--brown)'
  };
  
  const theme = createCustomTheme(themeProps);


  const fetchData = async (visitor_token, sender_id) => {
    try {
      setLoading(true);
      const resp = (await get_visitorData(visitor_token, sender_id));
      if (resp.valid) {
        setVisitorData(resp.data[0]);
        setLoading(false);
      } else {
        console.error(resp);
        setVisitorData(null);
        setLoading(false);
        setSnackbar({ open: true, message: resp.message, severity: 'error' });
      }
    } catch (error) {
      console.error(error);
      
      setLoading(false);
      setSnackbar({ open: true, message: error.response.data.message, severity: 'error' });
      setVisitorData(null);
    }
  };

  const fetchShopData = async (shop_token, user_token) => {
    try{
      setLoading(true);
      const resp = await getShopUserData(shop_token);
      const shopUserData = resp?.[0] || {}; // Ensure an object even if API returns nothing

    // console.log(shopUserData);

    if (Object.keys(shopUserData).length > 0) {
      setShopData((prev) => ({
        ...shopUserData,
        user_type: "shop",
        access_token: user_token
      }));
    }
    }catch(e){
      console.log(e);
      setSnackbar({ open: true, message: e.response.data.message, severity: 'error' });
      setVisitorData(null);
      setShopData(null);
    }finally{
      setLoading(false);
    }
  }

  const fetchMemberData = async (user_access_token) => {
    try{
      setLoading(true);
      const resp = await getMemberData(user_access_token);
      const memberUserData = resp?.[0] || {}; // Ensure an object even if API returns nothing
      
      if (Object.keys(memberUserData).length > 0) {
      setMemberData((prev) => ({
        ...memberUserData,
        user_type: "member",
        access_token : user_access_token
      }));
    } 
    }catch(e){
      console.log(e);
      setSnackbar({ open: true, message: e.response.data.message, severity: 'error' });
      setVisitorData(null);
      setShopData(null);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    if(token){
      const verifyUser = async () => {
        const user = (await getUser(token))[0];
        
        setCurrentUser(user);
        // console.log(user);
        
          // if(user.support_id && user.visitor_id){
          //   fetchData(user.user_access_token);
          // }

          if(user.shop_access_token && user.user_type === 'shop'){
            fetchShopData(user.shop_access_token, user.user_access_token);
            if(user.support_id && user.visitor_id){
              fetchData(user.user_access_token, user.shop_no);
            }
            setUserLoggedIn(true);
          }

          else if(user.user_access_token && user.user_type === 'member'){
            fetchMemberData(user.user_access_token)
            if(user.support_id && user.visitor_id){
              fetchData(user.user_access_token, user.member_id);
            }
            setUserLoggedIn(true);
          }

          else if(user.user_access_token && user.user_type === 'visitor'){
            setUserLoggedIn(true);
            fetchData(user.user_access_token, user.visitor_id);
          } 

          else{
            setUserLoggedIn(false);
          }
      }
      verifyUser();
    }
  }, [token]);
  


  // Handle form validation callback
  const handleFormValidation = (isValid, data) => {
    setIsFormValid(isValid);
    setVisitorData(data);
  };
  

  return (
    <ThemeProvider theme={theme}>
      {loading && <Box className="loading">
                <CircularProgress />
              </Box>}
      <Box className="support_wrapper">
        <Box className="row">
          <Box className="col">
            <Cards />
            {/* <UserBadge
                handleBadgeBgClick="../"
                handleLogin="../login"
                handleLogoutClick="../../AmbarsariyaMall"
              /> */}
          </Box>
          <Box className="col second_wrapper">
            <Box className='col-1'>
              {!userLoggedIn && <UserForm onValidation={handleFormValidation} visitorData={visitorData} visibility={userLoggedIn ? 'hidden' : 'visible'}/>}
              {/* <Button2 text="Back" redirectTo="/AmbarsariyaMall/sell" /> */}
              <UserBadge
                handleBadgeBgClick="../"
                handleLogin="../login"
                handleLogoutClick="../../AmbarsariyaMall"
              />
            </Box>

          {/* (visitorData !== null && Object.keys(visitorData).length > 0) ||  */}
            { userLoggedIn  && (
              <>
                <Box className="col-2">
                  {/* <Box component="form" className="form_container" noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Tooltip title="Select pdf or gif file" className="tooltip" placement="bottom-end">
                      <Box>
                        <FormField
                          type="file"
                          name="fileUpload"
                          value={file}
                          onChange={handleFileChange} // Handle file selection
                          placeholder="Choose File"
                          uploadFileIcon={attachment_icon}
                          className="attachment_icon"
                        />
                      </Box>
                    </Tooltip>
                  </Box> */}
                </Box>
                <Box className="col-3">
                  <VisitorFormBox 
                    visitorData={visitorData ? visitorData : shopData ? shopData : memberData ? memberData : null} 
                    shopNo ={shopData?.shop_no}
                    currentUser={currentUser} />
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
      <CustomSnackbar
        open={snackbar.open}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </ThemeProvider>
  );
}

export default Support;
