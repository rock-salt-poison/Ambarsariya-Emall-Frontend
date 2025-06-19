import React, { useEffect, useState } from "react";
import { Button, Box, Typography, CircularProgress } from "@mui/material";
import FormField from "./FormField";
import { Link, useNavigate } from "react-router-dom";
import {
  get_checkGoogleAccess,
  get_checkIfPaidShopExists,
  get_checkIfShopExists,
  get_requestGoogleAccess,
  getMemberData,
  getUser,
  postMemberData,
  send_otp_to_email,
  updateShopUserToMerchant,
} from "../../API/fetchExpressAPI";
import CustomSnackbar from "../CustomSnackbar";
import { useDispatch, useSelector } from "react-redux";
import {
  setMemberToken,
  setMemberTokenValid,
  setUserToken,
  setUserTokenValid,
} from "../../store/authSlice";
import { setUsernameOtp } from "../../store/otpSlice";
import ConfirmationDialog from "../ConfirmationDialog";

const UserPortfolioForm = () => {
  const initialFormData = {
    name: "",
    phoneNumber: "",
    gender: "",
    dob: "",
    address: "",
    username: "",
    password: "",
    username_otp: "",
    phone_otp: "",
    confirm_password: "",
    displayPicture: null,
    backgroundPicture: null,
  };

  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormData);
  const [userType, setUserType] = useState('');
  const [memberData, setMemberData] = useState(null);
  const [isPaidShop, setIsPaidShop] = useState(false);
  const [shopUserAccessToken, setShopUserAccessToken] = useState('');
  const [errors, setErrors] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [openDialog, setOpenDialog] = useState(false); // State for dialog
  const [selectedDisplayFileName, setSelectedDisplayFileName] = useState("");
  const [selectedBackgroundFileName, setSelectedBackgroundFileName] =
    useState("");
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [showUsernameOtp, setShowUsernameOtp] = useState(false);
  const [showPhoneOtp, setShowPhoneOtp] = useState(false);
  const [initialPhoneNumber, setInitialPhoneNumber] = useState(null);
  const [initialUsername, setInitialUsername] = useState(null);

  const [loading, setLoading] = useState(false);

  const otp_token = useSelector((state) => state.otp.usernameOtp);
  const token = useSelector((state) => state.auth.userAccessToken);
  
  const [isUsernameOtpSent, setIsUsernameOtpSent] = useState(false);
  const [isPhoneOtpSent, setIsPhoneOtpSent] = useState(false);

  const fetchMemberData = async (memberToken) => {
    setLoading(true);
    const user = await getMemberData(memberToken);

    if (user) {
      setMemberData(user[0]);
      setFormData({
        ...formData,
        name: user[0].full_name,
        phoneNumber: user[0].phone_no_1,
        gender: user[0].gender,
        dob: new Date(user[0].dob).toLocaleDateString("en-CA"),
        address: user[0].address,
        username: user[0].username,
        latitude: user[0].latitude,
        longitude: user[0].longitude,
        displayPicture: user[0].profile_img,
        backgroundPicture: user[0].bg_img,
      });
      setInitialPhoneNumber(user[0].phone_no_1);
      setInitialUsername(user[0].username);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const user = await getUser(token);
        const memberUser = user.find((u) => u.member_id !== null);
        if (
          memberUser?.user_type === "member" ||
          memberUser?.user_type === "merchant"
        ) {
          fetchMemberData(memberUser.user_access_token);
          setUserType(memberUser?.user_type);
        }
      }
    };
    fetchData();
  }, [token]);

  const validUsernameOtp = otp_token;
  const validPhoneOtp = "123456";

  const handleChange = (e) => {
    const { name, value } = e.target;
    // if (name === 'phoneNumber' && !/^\d{0,10}$/.test(value)) {
    //   return; // Only allow up to 10 digits
    // }

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Reset errors and error messages
    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    setErrorMessages((prevMessages) => ({ ...prevMessages, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fieldName = e.target.name;

    if (file) {
      setFormData((prev) => ({ ...prev, [fieldName]: file }));
      if (fieldName === "displayPicture") {
        setSelectedDisplayFileName(file.name);
      } else if (fieldName === "backgroundPicture") {
        setSelectedBackgroundFileName(file.name);
      }
    }
  };

  const validateOtp = () => {
    let valid = true;
    const newErrors = {};
    const newErrorMessages = {};

    // Validate OTP for username
    if (formData.username_otp !== validUsernameOtp) {
      newErrors.username_otp = true;
      newErrorMessages.username_otp = "Invalid OTP for username";
      valid = false;
    }

    // Validate OTP for phone numbers
    if (initialPhoneNumber !== formData.phoneNumber && showPhoneOtp) {
      if (formData.phone_otp !== validPhoneOtp) {
        newErrors.phone_otp = true;
        newErrorMessages.phone_otp = "Invalid OTP for Phone No.";
        valid = false;
      }
    }

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);
    return valid;
  };

  const validate = () => {
    let valid = true;
    const newErrors = {};
    const newErrorMessages = {};
    const requiredFields =
      initialUsername === null
        ? [
            "name",
            "phoneNumber",
            "gender",
            "dob",
            "address",
            "username",
            "password",
            "confirm_password",
          ]
        : ["name", "phoneNumber", "gender", "dob", "address", "username"];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = true;
        newErrorMessages[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required.`;
        valid = false;
      }
    });

    const passwordPattern = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordPattern.test(formData.password) && initialUsername === null) {
      newErrors.password = true;
      newErrorMessages.password =
        "Password must be at least 8 characters long and include a special character";
      valid = false;
    }

    const phonePattern = /^\+91\s\d{5}-\d{5}$/;
    if (!phonePattern.test(formData.phoneNumber)) {
      newErrors.phoneNumber = true;
      newErrorMessages.phoneNumber =
        "Phone No. must be +91 followed by 10 digits";
      valid = false;
    }

    // if (!/^\d+$/.test(formData.age)) {
    //   newErrors.age = true;
    //   newErrorMessages.age = 'Age must be a number.';
    //   valid = false;
    // }

    if (formData.confirm_password !== formData.password) {
      newErrors.confirm_password = true;
      newErrorMessages.confirm_password = "Passwords do not match.";
      valid = false;
    }

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);
    return valid;
  };

  const handlePostSubmit = async (isMerchant = true) => {
    let shouldShowPhoneOtp =
      formData.phoneNumber.length > 0 &&
      initialPhoneNumber !== formData.phoneNumber;

    setShowPhoneOtp(shouldShowPhoneOtp);

    // Send OTP for username if required and not already sent
    if (!showUsernameOtp && !isUsernameOtpSent) {
      try {
        setLoading(true);
        const data = { username: formData.username.toLowerCase() };

        const otp_resp = await send_otp_to_email(data);
        dispatch(setUsernameOtp(otp_resp.otp));

        setIsUsernameOtpSent(true); // Mark OTP as sent for username

        setSnackbar({
          open: true,
          message:
            otp_resp.message === "OTP sent successfully"
              ? "OTP sent successfully. Please check and verify."
              : "Failed to send OTP. Try again.",
          severity:
            otp_resp.message === "OTP sent successfully" ? "success" : "error",
        });
      } catch (e) {
        setSnackbar({
          open: true,
          message: "Failed to send OTP. Try again.",
          severity: "error",
        });
      }finally{
        setLoading(false);
      }
      setShowUsernameOtp(true);
      return; // Stop execution until OTP is verified
    }

    // Send OTP for phone number if required and not already sent
    if (shouldShowPhoneOtp && !isPhoneOtpSent) {
      setShowPhoneOtp(true);
      setIsPhoneOtpSent(true); // Mark OTP as sent for phone number
      return; // Stop execution until phone OTP is verified
    }

    // Validate OTP if both username and phone OTPs are required
    if (validateOtp()) {
      try {
        setLoading(true);

        const baseUserData = {
          name: formData.name,
          username: formData.username.toLowerCase(),
          password: formData.password,
          address: formData.address.description || formData.address,
          latitude: formData.address?.latitude || formData.latitude,
          longitude: formData.address?.longitude || formData.longitude,
          phone: formData.phoneNumber,
          gender: formData.gender,
          dob: formData.dob,
          profile_img: formData.displayPicture,
          bg_img: formData.backgroundPicture,
        };

        let userData = {
          ...baseUserData, 
          access_token : isMerchant ? (shopUserAccessToken || token || "") : (token || ""),
          ...(isMerchant ? { is_merchant: true, merchant_access_token: shopUserAccessToken } : {is_merchant: false}),
        }
        console.log(userData)
        const response = await postMemberData(userData);
        console.log(response)
        if (response) {
          if(userType !== 'merchant'){
            const userdata = {
              user_access_token: response.user_access_token,
              member_id: response.member_id,
              is_merchant: response.isMerchant
            }
  
            await updateShopUserToMerchant(userdata);
          }
            dispatch(setUserToken(response.user_access_token));
            localStorage.setItem("accessToken", response.user_access_token);
            dispatch(setUserTokenValid(true));
  
            const checkAccess = await get_checkGoogleAccess(formData?.username);
  
            if (!checkAccess.accessGranted) {
              setSnackbar({
                open: true,
                message: `Redirecting for Google access`,
                severity: "info",
              });
              get_requestGoogleAccess(formData?.username);
              return;
            }
            setSnackbar({
              open: true,
              message: `Access granted`,
              severity: "success",
            });
  
            setSnackbar({
              open: true,
              message: response.message,
              severity: "success",
            });
            setTimeout(() => navigate("../esale"), 2500);
          
        }
     } catch (error) {
        console.log(error);

        let errorMessage = "Error while submitting the form. Please try again.";
 
        if (
          error.response?.data?.error === "File size exceeds the 1MB limit."
        ) {
          errorMessage = "File size should not exceed the 1MB limit.";
        } else if (
          error.response?.data?.error?.includes("duplicate key value") &&
          error.response?.data?.error?.includes("users_phone_no_1_key")
        ) {
          errorMessage =
            "The phone number you entered already exists. Please use a different phone number.";
        } else if (
          error.response?.data?.error?.includes("Username") &&
          error.response?.data?.error?.includes("already exists")
        ) {
          errorMessage = "Username already exists.";
        }

        setSnackbar({ open: true, message: errorMessage, severity: "error" });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleConfirm = async () => {
    setOpenDialog(false);
    if(isPaidShop){
      await handlePostSubmit(true); // merchant = true
    }else{
      navigate('../login');
    }

  };

  const handleClose = async () => {
    // await handlePostSubmit(postData, false);
    setOpenDialog(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure form validation passes before proceeding
    if (!validate()) {
      return;
    }
    if(userType !== 'merchant'){
      if (formData?.username) {
        try {
          setLoading(true);
          const check_shop_exists_resp = await get_checkIfPaidShopExists(
            formData?.username
          );
          console.log(check_shop_exists_resp);
  
          if (
            check_shop_exists_resp?.exists === true &&
            check_shop_exists_resp?.isPaid === true
          ) {
            setIsPaidShop(true);
            setShopUserAccessToken(check_shop_exists_resp?.access_token);
            setOpenDialog(true);
          } else if (
            check_shop_exists_resp?.exists === true &&
            check_shop_exists_resp?.isPaid === false
          ) {
            setIsPaidShop(false);
            setShopUserAccessToken(check_shop_exists_resp?.access_token);
            setOpenDialog(true);
          } else if(check_shop_exists_resp?.exists === false){
            handlePostSubmit(false);
          }
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      }
    }else{
      handlePostSubmit(false);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!showUsernameOtp) {
  //         // Validate initial form fields
  //         if (validate()) {
  //           // Show OTP fields if initial validation is successful
  //           try{
  //             const data ={
  //               username:(formData.username).toLowerCase(),
  //             }
  //             setLoading(true);

  //             const otp_resp = await send_otp_to_email(data)
  //             console.log(otp_resp)
  //             dispatch(setUsernameOtp(otp_resp.otp));
  //             setLoading(false);
  //             if(otp_resp.message === "OTP sent successfully"){
  //               setSnackbar({ open: true, message: 'OTP sent successfully. Please check and verify.', severity: 'success' });
  //             }else{
  //               setSnackbar({ open: true, message: 'Failed to send OTP. Try again.', severity: 'error' });
  //             }
  //               console.log('Form Data:', formData);

  //           }catch(e){
  //             console.log(e);
  //             setLoading(false);
  //             setSnackbar({ open: true, message: 'Failed to send OTP. Try again.', severity: 'error' });
  //           }
  //           setShowUsernameOtp(true);
  //           setShowPhoneOtp(true);
  //         }
  //       }else{
  //         if(validateOtp()){
  //           if (validate()) {
  //             try{
  //               const userData = {
  //                 name:formData.name,
  //                 username:(formData.username).toLowerCase(),
  //                 password:formData.password,
  //                 address:formData.address.description || formData.address,
  //                 latitude: formData.address?.latitude || formData.latitude ,
  //                 longitude: formData.address?.longitude || formData.longitude,
  //                 phone:formData.phoneNumber,
  //                 gender:formData.gender,
  //                 dob:formData.dob,
  //                 profile_img: formData.displayPicture,
  //                 bg_img: formData.backgroundPicture,
  //                 access_token: token ? token : ''
  //               }
  //               console.log('userData', userData);

  //               const response = await postMemberData(userData);
  //               if(response){

  //                 dispatch(setUserToken(response.user_access_token));

  //               localStorage.setItem('accessToken', response.user_access_token);

  //               // Store token validity in Redux
  //               dispatch(setUserTokenValid(true));

  //                 setSnackbar({
  //                   open: true,
  //                   message: response.message,
  //                   severity: 'success',
  //                 });
  //               }
  //               setTimeout(()=>{navigate('../esale')}, 2500);
  //             }catch(error){
  //               console.log(error);
  //               if(error.response?.data?.error==="File size exceeds the 1MB limit."){
  //                 setSnackbar({
  //                   open: true,
  //                   message: "File size should not exceed the 1MB limit.",
  //                   severity: "error",
  //                 });
  //               }else if (error.response.data.error === 'duplicate key value violates unique constraint "users_phone_no_1_key"') {
  //                 setSnackbar({
  //                   open: true,
  //                   message: 'The phone number you entered already exists. Please use a different phone number.',
  //                   severity: 'error',
  //                 });
  //               }else if (error.response.data.error.includes('Username') &&  error.response.data.error.includes('already exists')) {
  //                 setSnackbar({
  //                   open: true,
  //                   message: 'Username already exists.',
  //                   severity: 'error',
  //                 });
  //               }else{
  //                 setSnackbar({
  //                   open: true,
  //                   message: 'Error while submitting the form. Please try again.',
  //                   severity: 'error',
  //                 });
  //               }
  //             }
  //              // Navigate to the appropriate page
  //           }
  //         }
  //       }
  // };

  const genderOptions = ["Male", "Female"];

  const renderFormField = (
    name,
    type,
    options = [],
    placeholder = "",
    readOnly = false
  ) => (
    <FormField
      name={name}
      type={type}
      value={formData[name]}
      onChange={handleChange}
      error={!!errors[name]}
      errorMessage={errorMessages[name]}
      options={options}
      placeholder={placeholder}
      readOnly={readOnly}
    />
  );

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      {loading && (
        <Box className="loading">
          <CircularProgress />
        </Box>
      )}
      <Box className="form-group">
        <Box className="form-group-2">
          {renderFormField("name", "text", [], "Enter your name")}
          {renderFormField("gender", "select", genderOptions, "Select gender")}
        </Box>

        <Box className="form-group-2">
          {renderFormField(
            "phoneNumber",
            "phone_number",
            [],
            "Enter your phone number"
          )}
          {showPhoneOtp &&
            renderFormField("phone_otp", "text", [], "Enter Phone OTP")}
          {renderFormField("dob", "date", [], "Enter your dob")}
        </Box>

        {renderFormField("address", "address", [], "Enter your address")}
        <Box className="form-group-2">
          {renderFormField(
            "username",
            "text",
            [],
            "Enter your username",
            initialUsername === null ? false : true
          )}
          {showUsernameOtp &&
            renderFormField("username_otp", "text", [], "Enter Username OTP")}
        </Box>
        {initialUsername === null && (
          <Box className="form-group-2">
            {renderFormField("password", "password", [], "Enter your password")}
            {renderFormField(
              "confirm_password",
              "password",
              [],
              "Confirm password"
            )}
          </Box>
        )}

        {/* File upload inputs */}
        <Box className="form-group">
          <input
            type="file"
            name="displayPicture"
            id="display-picture-upload"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <Button
            variant="contained"
            component="label"
            htmlFor="display-picture-upload"
          >
            Upload Display Picture
          </Button>
          {selectedDisplayFileName && (
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              Display Picture: {selectedDisplayFileName}
            </Typography>
          )}
        </Box>

        <Box className="form-group">
          <input
            type="file"
            name="backgroundPicture"
            id="background-picture-upload"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <Button
            variant="contained"
            component="label"
            htmlFor="background-picture-upload"
          >
            Upload Background Picture
          </Button>
          {selectedBackgroundFileName && (
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              Background Picture: {selectedBackgroundFileName}
            </Typography>
          )}
        </Box>
      </Box>

      <Box className="submit_button_container">
        {memberData !== null && (
          <Button variant="contained" className="submit_button">
            <Link to="../esale">Dashboard</Link>
          </Button>
        )}
        <Button type="submit" variant="contained" className="submit_button">
          Submit
        </Button>
      </Box>

      <ConfirmationDialog
        open={openDialog}
        onClose={(e) => handleClose()}
        onConfirm={(e) => handleConfirm()}
        title="Are you sure you want to become a merchant?"
        message={
          isPaidShop ? (
            `The username you're using is already registered with a shop.
You can continue with this account or try a different username.`
          ) : (
            <Typography className="text-light" variant="span">
              This username is already linked to a shop account. However, the
              shop is not using the paid version. To proceed as a merchant, you
              must first upgrade the shop to the paid version. Would you like to
              upgrade now or use a different username?
            </Typography>
          )
        }
        optionalCname="logoutDialog"
        confirmBtnText="Yes, continue as Merchant"
        closeBtnText="Use a different username"
      />

      <CustomSnackbar
        open={snackbar.open}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
  );
};

export default UserPortfolioForm;
