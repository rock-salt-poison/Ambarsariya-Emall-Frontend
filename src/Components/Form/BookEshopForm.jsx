import React, { useEffect, useState } from 'react';
import { Button, Box, Typography, CircularProgress } from '@mui/material';
import FormField from '../Form/FormField';
import { useNavigate, useParams } from 'react-router-dom';
import { postEshop, fetchDomains, fetchDomainSectors, fetchSectors, getShopUserData, getUser, send_otp_to_email, postMemberData, get_checkIfMemberExists, get_checkIfShopExists, updateShopUserToMerchant } from '../../API/fetchExpressAPI'
import { useDispatch, useSelector } from 'react-redux';
import { setShopToken, setShopTokenValid, setUserToken } from '../../store/authSlice';
import CustomSnackbar from '../CustomSnackbar';
import { setUsernameOtp } from '../../store/otpSlice';
import ConfirmationDialog from '../ConfirmationDialog';


const BookEshopForm = () => {
  const initialFormData = {
    title: 'Mr.',
    fullName: '',
    username: '',
    password: '',
    confirm_password: '',
    address: '',
    phone1: '',
    phone1_otp: '',
    phone2: '',
    phone2_otp: '',
    domain: 0,
    domain_create: '',
    sector: 0,
    sector_create: '',
    onTime: '',
    offTime: '',
    gst: '',
    msme: '',
    pan_no: '',
    cin_no: '',
    pickup: false,
    delivery: false,
    homeVisit: false,
    paidVersion: false,
    premiumVersion: false,
    username_otp: '',
    merchant: false,
    member_detail: '',
    member_otp: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [shopUser, setShopUser] = useState({});
  const [showUsernameOtp, setShowUsernameOtp] = useState(false);
  const [showPhoneOtp, setShowPhoneOtp] = useState(false);
  const [showMemberOtp, setShowMemberOtp] = useState(false);
  const [user_type, set_user_type] = useState('shop');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [submitBtnDisable, setSubmitBtnDisable] = useState(!!formData);
  const { edit } = useParams();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); // State for dialog
  const [eshopData, setEshopData] = useState(null);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.userAccessToken);
  const otp_token = useSelector((state) => state.otp.usernameOtp);

  const navigate = useNavigate();

  // Simulated OTP for demonstration purposes
  const validUsernameOtp = otp_token;
  const validPhoneOtp = '123456';
  const validMemberOtp = '123456';

  const fetchUserAndShopData = async (shop_access_token) => {
    const response = await getShopUserData(shop_access_token);
    if (response && response.length > 0) {
      const data = response[0];
      setShopUser(data);
      console.log(data);
      
      
      // Fetch domains and sectors
      const domainResp = await fetchDomains();
      const sectors = await fetchSectors();
      setDomains(domainResp.map((data) => data.domain_name)); 
  
      // Find matching domain and sector
      const selectedDomain = domainResp.find((domain) => domain.domain_name === data.domain_name);
  let sectorList = [];
          if (selectedDomain) {
            sectorList = (await fetchDomainSectors(selectedDomain.domain_id)).map(s => s.sector_name);
            setSectors(sectorList);
          }
  
      const selectedSector = sectors.find((sector) => sector.sector_name === data.sector_name);
  
      setFormData((prevData) => ({
        ...prevData,
        username: data.username || '',
        password: data.password || '',
        confirm_password: data.password || '',
        title: data.title || '',
        fullName: data.full_name || '',
        phone1: data.phone_no_1 || '',
        phone2: data.phone_no_2 || '',
        address: data.address || '',
        domain: selectedDomain ? selectedDomain.domain_name : prevData.domain, // Preserve if exists
        domain_create: data.created_domain || '',
        sector: selectedSector ? selectedSector.sector_name : prevData.sector, // Preserve if exists
        sector_create: data.created_sector || '',
        onTime: data.ontime || '',
        offTime: data.offtime || '',
        pickup: data.type_of_service?.includes("Pickup") || false,
        delivery: data.type_of_service?.includes("Delivery") || false,
        homeVisit: data.type_of_service?.includes("Home Visit") || false,
        gst: data.gst || '',
        msme: data.msme || '',
        pan_no: data.pan_no || '',
        cin_no: data.cin_no || '',
        paidVersion: data.paid_version || false,
        premiumVersion: data.premium_service || false,
        merchant: data.is_merchant || false,
        member_detail: data.member_username_or_phone_no || ''
      }));
    }
  };
  
  console.log(formData);
  

  useEffect(() => {
    const initializeForm = async () => {
      try {
        // Fetch the list of domains
        setLoading(true);
        const domainResp = await fetchDomains();
      setDomains(domainResp.map((data) => data.domain_name)); 
  
      

        // Fetch data if token exists
        if (token) {
          let shop_token = (await getUser(token))?.find((u)=>u.shop_no !== null)?.shop_access_token;
          if (shop_token) {
            await fetchUserAndShopData(shop_token);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error initializing form:', error);
        setLoading(false);
      }
    };

    initializeForm();
  }, [token]);



  const handleChange = async (e) => {
    if (!e.target) return;
    const { name, value, type, checked } = e.target;
    setSubmitBtnDisable(false);
    if (name === 'domain') {
      try {
        setLoading(true);
        // Fetch domains and find the selected domain
        const domains = await fetchDomains();
        const selectedDomain = domains.find((val) => val.domain_name === value);

        // Prepare the sectors list based on the selected domain
        let sectors = [];
        if (selectedDomain) {
          sectors = (await fetchDomainSectors(selectedDomain.domain_id)).map((data) => data.sector_name);
          setFormData((prevData) => ({
            ...prevData,
            domain: selectedDomain.domain_id, // Set domain_id
            // sector: 0, // Reset sector field to default value
          }));
        }
        
        // Add 'Create' to the list of sectors and update the formData state
        setSectors(sectors);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching sectors:', error);
        setLoading(false);
      }
    }

    // Handle sector change
    if (name === 'sector') {
      try {
        setLoading(true);
        const selectedSector = (await fetchSectors()).find((val) => val.sector_name === value);
        
        if (selectedSector) {
          setFormData((prevData) => ({
            ...prevData,
            sector: selectedSector.sector_id, // Update sector_id in form data
          }));
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sectors:', error);
        setLoading(false);
      }
    }

    // Validate OTP fields
    if ((name === 'phone1_otp' || name === 'phone2_otp' || name === 'username_otp' || name === 'member_otp') && !/^\d{0,6}$/.test(value)) {
      return;
    }

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? !!checked : value,
    });

    // Reset errors and error messages
    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    setErrorMessages((prevMessages) => ({ ...prevMessages, [name]: '' }));
  };


  // console.log((formData.phone2).length)

  const validateInitialForm = () => {
    let valid = true;
    const newErrors = {};
    const newErrorMessages = {};
    const requiredFields = [
      'username',
      'password',
      'confirm_password',
      'fullName',
      'address',
      'phone1',
      'domain',
      'sector',
      'onTime',
      'offTime',
    ];

    if (formData.paidVersion) {
      requiredFields.push('gst', 'pan_no');
    }

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = true;
        newErrorMessages[field] = `${field.replace(/_/g, ' ')} is required`;
        valid = false;
      }
    });

    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailPattern.test(formData.username)) {
      newErrors.username = true;
      newErrorMessages.username = 'Please enter a valid Gmail address';
      valid = false;
    }

    const passwordPattern = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordPattern.test(formData.password)) {
      newErrors.password = true;
      newErrorMessages.password = 'Password must be at least 8 characters long and include a special character';
      valid = false;
    }


    const phonePattern = /^\+91\s\d{5}-\d{5}$/;
    if (!phonePattern.test(formData.phone1)) {
      newErrors.phone1 = true;
      newErrorMessages.phone1 = 'Phone No. 1 must be +91 followed by 10 digits';
      valid = false;
    }

    // Only validate phone2 if it's filled out
    if (formData.phone2 && !phonePattern.test(formData.phone2)) {
      newErrors.phone2 = true;
      newErrorMessages.phone2 = 'Phone No. 2 must be +91 followed by 10 digits';
      valid = false;
    }

    if ((formData.phone2).length > 3) {
      if (formData.phone1 === formData.phone2) {
        newErrors.phone2 = true;
        newErrorMessages.phone2 = 'Phone No. 2 must be unique';
        valid = false;
      }
    }

    // if (!phonePattern.test(formData.phone2)) {
    //   newErrors.phone2 = true;
    //   newErrorMessages.phone2 = 'Phone No. 2 must be +91 followed by 10 digits';
    //   valid = false;
    // }

    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = true;
      newErrorMessages.confirm_password = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);
    return valid;
  };

  const validateOtp = () => {
    let valid = true;
    const newErrors = {};
    const newErrorMessages = {};

    // Validate OTP for username
    if (formData.username_otp !== validUsernameOtp) {
      newErrors.username_otp = true;
      newErrorMessages.username_otp = 'Invalid OTP for username';
      valid = false;
    }

    // Validate OTP for phone numbers
    if (formData.phone1_otp !== validPhoneOtp) {
      newErrors.phone1_otp = true;
      newErrorMessages.phone1_otp = 'Invalid OTP for Phone No. 1';
      valid = false;
    }

    if (formData.phone2) {
      if (formData.phone2_otp !== validPhoneOtp) {
        newErrors.phone2_otp = true;
        newErrorMessages.phone2_otp = 'Invalid OTP for Phone No. 2';
        valid = false;
      }
    }

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);
    return valid;
  };

  console.log(formData?.address);
  
const handlePostSubmit = async (postData, shouldIncludeMember = true, is_merchant) => {
  const loggedIn = !!localStorage.getItem('access_token');
  try {
    setLoading(true);
    const updatedPostData = {...postData , merchant: is_merchant ||  shouldIncludeMember || formData?.merchant}
    const response = await postEshop(updatedPostData);
    if (response) {
      const { user_access_token } = response;
      dispatch(setUserToken(user_access_token));
      localStorage.setItem('accessToken', user_access_token);
      console.log(user_access_token);
      
      if (shouldIncludeMember) {
        const memberData = {
          name: formData.fullName,
          username: formData.username.toLowerCase(),
          password: formData.password,
          address: formData.address.description || formData.address,
          latitude: formData.address?.latitude || formData.latitude,
          longitude: formData.address?.longitude || formData.longitude,
          phone: formData.phone1,
          gender: formData.title === 'Mr.' ? 'Male' : 'Female',
          is_merchant : true,
          merchant_access_token : user_access_token
        };

        const resp = await postMemberData(memberData);

        if(resp){
          const updateData = {
            user_access_token: resp?.user_access_token,
            member_id: resp?.member_id,
            is_merchant: resp?.isMerchant
          }
          const update_shop_merchant = await updateShopUserToMerchant(updateData);
          if(update_shop_merchant){
            setSnackbar({
              open: true,
              message: update_shop_merchant?.message,
              severity: 'success',
            });
          }

        }
      }

      setSnackbar({
        open: true,
        message: 'Form submitted successfully!',
        severity: 'success',
      });

      console.log('Form Data:', formData);
      setTimeout(() => {
        loggedIn ? navigate('../eshop') : navigate('../login');
      }, 2500);
    }
  } catch (error) {
    const msg = error?.response?.data?.error || '';
    if (msg.includes('users_phone_no_1_key')) {
      setSnackbar({
        open: true,
        message: 'The phone number you entered already exists. Please use a different phone number.',
        severity: 'error',
      });
    } else if (msg.includes('Username') && msg.includes('already exists')) {
      setSnackbar({
        open: true,
        message: 'Username already exists.',
        severity: 'error',
      });
    } else {
      setSnackbar({
        open: true,
        message: 'Error while submitting the form. Please try again.',
        severity: 'error',
      });
    }
    console.error("Error submitting form:", msg);
  } finally {
    setLoading(false);
    setOpenDialog(false);
  }
};
console.log(shopUser);

const handleConfirm = async (postData) => {
  await handlePostSubmit(postData, true); // merchant = true
};

const handleClose = async (postData) => {
  setFormData((prev) => ({ ...prev, merchant: false }));
  await handlePostSubmit(postData, false); // merchant = false
};


console.log(errorMessages);

const proceedOtpAndPostData = async () => {
  if (!showUsernameOtp) {
    if (validateInitialForm()) {
      try {
        const data = { username: formData.username };
        const otp_resp = await send_otp_to_email(data);

        dispatch(setUsernameOtp(otp_resp.otp));
        setShowUsernameOtp(true);
        setShowPhoneOtp(true);
        setShowMemberOtp(true);

        if (otp_resp.message === "OTP sent successfully") {
          setSnackbar({ open: true, message: 'OTP sent successfully. Please check and verify.', severity: 'success' });
        } else {
          setSnackbar({ open: true, message: 'Failed to send OTP. Try again.', severity: 'error' });
        }
      } catch (e) {
        console.log(e);
        setSnackbar({ open: true, message: 'Failed to send OTP. Try again.', severity: 'error' });
      }
    }
  } else {
    if (validateOtp() && validateInitialForm()) {
      try {
        const selectedDomain = (await fetchDomains()).find(domain => domain.domain_name === formData.domain);
        const selectedSector = (await fetchSectors()).find(sector => sector.sector_name === formData.sector);

        const postData = {
          title: formData.title,
          fullName: formData.fullName,
          username: formData.username.toLowerCase(),
          password: formData.password,
          address: formData.address.description,
          latitude: formData.address?.latitude,
          longitude: formData.address?.longitude,
          phone1: formData.phone1,
          domain: selectedDomain?.domain_id,
          sector: selectedSector?.sector_id,
          domain_create: formData.domain_create || '',
          sector_create: formData.sector_create || '',
          onTime: formData.onTime,
          offTime: formData.offTime,
          paidVersion: formData.paidVersion,
          merchant: formData.merchant,
          pickup: formData.pickup,
          homeVisit: formData.homeVisit,
          delivery: formData.delivery,
          user_type: user_type,
          premiumVersion: formData.premiumVersion,
          shop_access_token: shopUser?.shop_access_token || null,
          ...(formData.phone2 && { phone2: formData.phone2 }),
          ...(formData.paidVersion && {
            gst: formData.gst,
            pan_no: formData.pan_no,
            cin_no: formData.cin_no,
            ...(formData.msme && { msme: formData.msme }),
          }),
        };

        
        if(shopUser?.is_merchant && shopUser?.member_id !== null){
          setEshopData(postData);
          handlePostSubmit(postData, false, false)
        }else{
          setOpenDialog(true);
          setEshopData(postData);
        }
      } catch (error) {
        if (error.response.data.error === 'duplicate key value violates unique constraint "users_phone_no_1_key"') {
          setSnackbar({
            open: true,
            message: 'The phone number you entered already exists. Please use a different phone number.',
            severity: 'error',
          });
        } else if (error.response.data.error.includes('Username') && error.response.data.error.includes('already exists')) {
          setSnackbar({
            open: true,
            message: 'Username already exists.',
            severity: 'error',
          });
        } else {
          setSnackbar({
            open: true,
            message: error.response.data.error,
            severity: 'error',
          });
        }

        console.error("Error submitting form:", error.response.data.error);
      }
    }
  }
};



const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData?.username || formData?.phone1) {
    try {
      setLoading(true);

      // Only check for existing shop/member if shop_access_token is NOT present
      if (!shopUser?.shop_access_token) {
        const check_shop_exists_resp = await get_checkIfShopExists(formData?.username);
        if (check_shop_exists_resp?.exists === false) {
          const check_member_exists_resp = await get_checkIfMemberExists(
            formData?.username,
            formData?.phone1,
            formData?.phone2
          );

          if (check_member_exists_resp?.exists === false) {
            // Proceed to OTP logic and final postData construction
            await proceedOtpAndPostData();
          } else {
            setSnackbar({ open: true, message: check_member_exists_resp?.message, severity: 'error' });
          }
        } else {
          setSnackbar({ open: true, message: check_shop_exists_resp?.message, severity: 'error' });
        }
      } else {
        // Bypass existence check, directly proceed to OTP logic and postData construction
        await proceedOtpAndPostData();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }
};



  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if(formData?.username || formData?.phone1) {
  //     try{
  //       setLoading(true);
  //       const check_shop_exists_resp = await get_checkIfShopExists(formData?.username);
  //       if(check_shop_exists_resp?.exists === false){
  //         const check_member_exists_resp = await get_checkIfMemberExists(formData?.username, formData?.phone1, formData?.phone2);
  //         console.log(check_member_exists_resp);
          
  //             if(check_member_exists_resp?.exists===false){
  //               if (!showUsernameOtp) {
  //                 // Validate initial form fields
  //                 if (validateInitialForm()) {
  //                   // Show OTP fields if initial validation is successful
  //                   try{
  //                     const data ={
  //                       username:formData.username,
  //                     }
  //                     setLoading(true);
            
  //                     const otp_resp = await send_otp_to_email(data)
  //                     console.log(otp_resp)
  //                     dispatch(setUsernameOtp(otp_resp.otp));
  //                     setLoading(false);
  //                     if(otp_resp.message === "OTP sent successfully"){
  //                       setSnackbar({ open: true, message: 'OTP sent successfully. Please check and verify.', severity: 'success' });
  //                     }else{
  //                       setSnackbar({ open: true, message: 'Failed to send OTP. Try again.', severity: 'error' });
  //                     }
  //                       console.log('Form Data:', formData);
            
  //                   }catch(e){
  //                     console.log(e);
  //                     setLoading(false);
  //                     setSnackbar({ open: true, message: 'Failed to send OTP. Try again.', severity: 'error' });
  //                   }
  //                   setShowUsernameOtp(true);
  //                   setShowPhoneOtp(true);
  //                   setShowMemberOtp(true);
  //                 }
  //               } else {
  //                 // Validate OTP fields
  //                 if (validateOtp()) {
  //                   if (validateInitialForm()) {
  //                     try {
  //                       const selectedDomain = (await fetchDomains()).find(domain => domain.domain_name === formData.domain);
  //                       const selectedSector = (await fetchSectors()).find(sector => sector.sector_name === formData.sector);
            
  //                       const postData = {
  //                         title: formData.title,
  //                         fullName: formData.fullName,
  //                         username: (formData.username).toLowerCase(),
  //                         password: formData.password,
  //                         address: formData.address.description,
  //                         latitude: formData.address?.latitude,
  //                         longitude: formData.address?.longitude,
  //                         phone1: formData.phone1,
  //                         domain: selectedDomain?.domain_id,
  //                         sector: selectedSector?.sector_id,
  //                         domain_create: formData.domain_create ? formData.domain_create : '',
  //                         sector_create: formData.sector_create ? formData.sector_create : '',
  //                         onTime: formData.onTime,
  //                         offTime: formData.offTime,
  //                         paidVersion: formData.paidVersion,
  //                         merchant: formData.merchant,
  //                         pickup: formData.pickup,
  //                         homeVisit: formData.homeVisit,
  //                         delivery: formData.delivery,
  //                         user_type: user_type,
  //                         premiumVersion: formData.premiumVersion,
  //                         shop_access_token: shopUser?.shop_access_token || null,
  //                         // Add phone2 if present
  //                         ...(formData.phone2 && { phone2: formData.phone2 }),
            
  //                         // Add paid version details if applicable
  //                         ...(formData.paidVersion && {
  //                           gst: formData.gst,
  //                           pan_no: formData.pan_no,
  //                           cin_no: formData.cin_no,
  //                           ...(formData.msme && { msme: formData.msme }),
  //                         }),
            
  //                         // Add member detail if paid version and merchant are true
  //                         // ...(formData.paidVersion && formData.merchant && {
  //                         //   member_detail: formData.member_detail,
  //                         // }),
  //                       };
            
  //                       setEshopData(postData);
  //                       setOpenDialog(true);
                        
  //                     } catch (error) {
  //                       if (error.response.data.error === 'duplicate key value violates unique constraint "users_phone_no_1_key"') {
  //                         setSnackbar({
  //                           open: true,
  //                           message: 'The phone number you entered already exists. Please use a different phone number.',
  //                           severity: 'error',
  //                         });
  //                       } else if (error.response.data.error.includes('Username') && error.response.data.error.includes('already exists')) {
  //                         setSnackbar({
  //                           open: true,
  //                           message: 'Username already exists.',
  //                           severity: 'error',
  //                         });
  //                       } else {
  //                         setSnackbar({
  //                           open: true,
  //                           message: error.response.data.error,
  //                           severity: 'error',
  //                         });
  //                       }
            
  //                       console.error("Error submitting form:", error.response.data.error);
  //                     }
  //                   }
  //                 }
  //               }
  //             }else{
  //               setSnackbar({ open: true, message: check_member_exists_resp?.message, severity: 'error' });
  //             }
  //       }else{
  //         setSnackbar({ open: true, message: check_shop_exists_resp?.message, severity: 'error' });
  //       }
  //     }catch(e){
  //       console.error(e);
  //     }finally{
  //       setLoading(false);
  //     }
  //   }
  // };


  const [domains, setDomains] = useState([]);
  const [sectors, setSectors] = useState([]);
  const titleOptions = ['Mr.', 'Ms.', 'Mrs.'];

  const renderFormField = (label, name, type, options = [], placeholder = '', additionalProps = {}, adornmentValue, adornmentPosition) => (
    <FormField
      label={label}
      name={name}
      type={type}
      value={formData[name]}
      onChange={handleChange}
      error={!!errors[name]}
      errorMessage={errorMessages[name]}
      options={options}
      placeholder={placeholder}
      readOnly={edit ? true : false}
      adornmentValue={adornmentValue}
      adornmentPosition={adornmentPosition}
      {...additionalProps}
    />
  );

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      {loading && <Box className="loading">
                <CircularProgress />
              </Box>}
      <Box className="form-group">
        {renderFormField('Username / email id :', 'username', 'email')}
        {showUsernameOtp && (
          <Box className="form-group2">
            {renderFormField('Username OTP:', 'username_otp', 'text')}
          </Box>
        )}
        <Box className="form-group2">
          {renderFormField('Password :', 'password', 'password', [], '', { autoComplete: "new-password" })}
          {renderFormField('Confirm Password :', 'confirm_password', 'password', [], '', { autoComplete: "new-password" })}

        </Box>
        <Box className="form-group3">
          {renderFormField('Full Name :', 'title', 'select', titleOptions)}
          {renderFormField('Full Name :', 'fullName', 'text')}
        </Box>
        {renderFormField('Address :', 'address', 'address')}
        <Box className="form-group2">
          <Box className="form-subgroup">
            {renderFormField('Phone No. 1:', 'phone1', 'phone_number', [], '', { maxLength: 10 })}
            {showPhoneOtp && renderFormField('OTP for Phone No. 1:', 'phone1_otp', 'text')}
          </Box>
          <Box className="form-subgroup">
            {renderFormField('Phone No. 2:', 'phone2', 'phone_number', [], '', { maxLength: 10 })}
            {formData.phone2 && showPhoneOtp && renderFormField('OTP for Phone No. 2:', 'phone2_otp', 'text')}
          </Box>
        </Box>
        <Box className="form-group2">
          <Box className="form-subgroup">
            {renderFormField('Domain :', 'domain', 'select', domains, 'Choose or create')}
            {formData.domain === 'Create' && renderFormField('Custom Domain:', 'domain_create', 'text')}
          </Box>
          <Box className="form-subgroup">
            {renderFormField('Sector :', 'sector', 'select', sectors, 'Choose or create')}
            {formData.sector === 'Create' && renderFormField('Custom Sector:', 'sector_create', 'text')}
          </Box>
        </Box>
        <Box className="form-group2">
          {renderFormField('On Time :', 'onTime', 'time')}
          {renderFormField('Off Time :', 'offTime', 'time')}
        </Box>
        <Box className="form-group-checkbox">
          <Typography className="label">Type of Service :</Typography>
          <Box className="checkbox-group">
            {renderFormField('Pickup', 'pickup', 'checkbox')}
            {renderFormField('Delivery', 'delivery', 'checkbox')}
            {renderFormField('Home Visit', 'homeVisit', 'checkbox')}
          </Box>
        </Box>
        <Box className="form-group-switch">
          {renderFormField('Do you want paid version', 'paidVersion', 'switch')}
        </Box>
        {formData.paidVersion && <><Box className="form-group2">
          {renderFormField('GST :', 'gst', 'text')}
          {renderFormField('MSME :', 'msme', 'text')}
        </Box>
          <Box className="form-group2">
            {renderFormField('Pan No.', 'pan_no', 'text')}
            {renderFormField('CIN No.', 'cin_no', 'text')}
          </Box>

          <Box className="form-group-switch">
            {renderFormField('Be a merchant', 'merchant', 'switch')}
          </Box>
          
          {/* {formData.merchant &&
            renderFormField('', 'member_detail', 'text', '', 'Member username or Phone no.')}
          {formData.merchant && showMemberOtp && renderFormField('Member OTP:', 'member_otp', 'text')} */}
        </>
        }




        <Box className="form-group-switch">
          {renderFormField('Do you want premium version', 'premiumVersion', 'switch')}
        </Box>
      </Box>
      {
        !edit ? (
          <Box className="submit_button_container">
            <Button type="submit" variant="contained" className="submit_button" disabled={submitBtnDisable}>
              Submit
            </Button>
          </Box>
        ) : ("")
      }

      <ConfirmationDialog
        open={openDialog}
        onClose={(e) => handleClose(eshopData)}
        onConfirm={(e)=>handleConfirm(eshopData)}
        title="Become a Merchant"
        message={`Are you sure you want to become a merchant`}
        optionalCname="logoutDialog"
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

export default BookEshopForm;