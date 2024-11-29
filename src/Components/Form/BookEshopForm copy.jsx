import React, { useEffect, useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import FormField from '../Form/FormField'; 
import { useNavigate } from 'react-router-dom';
import {postEshop, fetchDomains, fetchDomainSectors, fetchSectors, getShopUserData, getUser} from '../../API/fetchExpressAPI'
import { useDispatch, useSelector } from 'react-redux';
import { setUserToken } from '../../store/authSlice';
import CustomSnackbar from '../CustomSnackbar';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { debounce } from 'lodash';
import L from 'leaflet';

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
    domain:0,
    domain_create: '',
    sector:0,
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
    merchant:false,
    member_detail:'',
    member_otp: '',
  };

  delete L.Icon.Default.prototype._getIconUrl;

  const icon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [showUsernameOtp, setShowUsernameOtp] = useState(false);
  const [showPhoneOtp, setShowPhoneOtp] = useState(false);
  const [showMemberOtp, setShowMemberOtp] = useState(false);
  const [user_type, set_user_type] = useState('shop');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [submitBtnDisable, setSubmitBtnDisable] = useState(!!formData);
  
  const [mapPosition, setMapPosition] = useState([31.6356659, 74.8787496]); 

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.userAccessToken);
  
  const navigate = useNavigate();

  // Simulated OTP for demonstration purposes
  const validUsernameOtp = '123456';
  const validPhoneOtp = '123456';
  const validMemberOtp = '123456';

  const fetchAddressCoordinates = debounce(async (address) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${address}&APPID=b4703c5739dc882d1914309fe326a70e`);
      const { lat, lon } = response.data.coord;
  
      if (lat && lon) {
        setMapPosition([lat, lon]);
        setFormData((prevData) => ({
          ...prevData,
          address: response.data.name, // Set the address from the API
        }));
      } else {
        throw new Error('Address not found');
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
      setSnackbar({
        open: true,
        message: 'Address could not be found. Please try again.',
        severity: 'error',
      });
    }
  }, 1000);

  function MapClick() {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMapPosition([lat, lng]);

        // Reverse geocode to get address (optional)
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=b4703c5739dc882d1914309fe326a70e`)
          .then(response => {
            const address = response.data.name;
            setFormData({
              ...formData,
              address: address // Update address field when clicking on the map
            });
          })
          .catch(error => {
            console.error('Error retrieving address from coordinates:', error);
            setSnackbar({
              open: true,
              message: 'Unable to retrieve address for selected location.',
              severity: 'error',
            });
          });
      },
    });

    return;
  }

  const fetchUserAndShopData = async (shop_access_token) => {
    const response = await getShopUserData(shop_access_token);
    if (response) {
      const data = response[0];
      // Fetch sectors to get the sector name based on sector_id
      const sectors = await fetchSectors();
      const selectedSector = sectors.find((sector) => sector.sector_name === data.sector_name);
      console.log(selectedSector)
  
      setFormData({
        ...formData,
        username: data.username || '',
        password: data.password || '',
        confirm_password: data.password || '',
        title: data.title || '',
        fullName: data.full_name || '',
        phone1: data.phone_no_1 || '',
        phone2: data.phone_no_2 || '',
        address: data.address || '',
        domain: data.domain_name || 0,
        domain_create: data.created_domain || '',
        sector: selectedSector ? selectedSector.sector_name : 0, // Use sector name if available
        sector_create: data.created_sector || '',
        onTime: data.ontime || 0,
        offTime: data.offtime || 0,
        pickup: data.type_of_service.includes("Pickup") || false,
        delivery: data.type_of_service.includes("Delivery") || false,
        homeVisit: data.type_of_service.includes("Home Visit") || false,
        gst: data.gst || '',
        msme: data.msme || '',
        pan_no: data.pan_no || '',
        cin_no: data.cin_no || '',
        paidVersion: data.paid_version || false,
        premiumVersion: data.premium_service || false,
        merchant: data.is_merchant || false,
        member_detail: data.member_username_or_phone_no || ''
      });
    }
  };
  
  useEffect(() => {
    const initializeForm = async () => {
      try {
        // Fetch the list of domains
        const domainsResp = await fetchDomains();
        const domainNames = domainsResp.map((data) => data.domain_name);
        setDomains(domainNames);
  
        // Fetch data if token exists
        if (token) {
          let shop_token = (await getUser(token))[0].shop_access_token;
          if(shop_token){
            await fetchUserAndShopData(shop_token);
          }
        }
      } catch (error) {
        console.error('Error initializing form:', error);
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
            sector: 0, // Reset sector field to default value
          }));
        }
  
        // Add 'Create' to the list of sectors and update the formData state
        setSectors(sectors);
  
      } catch (error) {
        console.error('Error fetching sectors:', error);
      }
    }
  
    // Handle sector change
    if (name === 'sector') {
      try {
        const selectedSector = (await fetchSectors()).find((val) => val.sector_name === value);
  
        if (selectedSector) {
          setFormData((prevData) => ({
            ...prevData,
            sector: selectedSector.sector_id, // Update sector_id in form data
          }));
        }
      } catch (error) {
        console.error('Error fetching sectors:', error);
      }
    }
  
    // Validate OTP fields
    if ((name === 'phone1_otp' || name === 'phone2_otp' || name === 'username_otp' || name === 'member_otp') && !/^\d{0,6}$/.test(value)) {
      return;
    }
  

    if (name === 'address') {
      fetchAddressCoordinates(value);
    }

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? !!checked : value,
    });
  
    // Reset errors and error messages
    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    setErrorMessages((prevMessages) => ({ ...prevMessages, [name]: '' }));
  };

  function MapClick() {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMapPosition([lat, lng]);
  
        // Reverse geocode to get address (optional)
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=b4703c5739dc882d1914309fe326a70e`)
          .then(response => {
            const address = response.data.name;
            setFormData({
              ...formData,
              address: address // Update address field when clicking on the map
            });
          })
          .catch(error => {
            console.error('Error retrieving address from coordinates:', error);
            setSnackbar({
              open: true,
              message: 'Unable to retrieve address for selected location.',
              severity: 'error',
            });
          });
      },
    });
  
    return <Marker position={mapPosition}></Marker>;
  }
  
  
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
      requiredFields.push('gst', 'pan_no', 'cin_no');
      if (formData.merchant) {
        requiredFields.push('member_detail');
      }
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

    if((formData.phone2).length>3){
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

    if(formData.phone2){
      if (formData.phone2_otp !== validPhoneOtp) {
        newErrors.phone2_otp = true;
        newErrorMessages.phone2_otp = 'Invalid OTP for Phone No. 2';
        valid = false;
      }
    }


    if(formData.merchant){
      if (formData.member_otp !== validMemberOtp) {
        newErrors.member_otp = true;
        newErrorMessages.member_otp = 'Invalid OTP';
        valid = false;
      }
      if(formData.member_otp == validMemberOtp){
        set_user_type('shop');
      }
    }

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loggedIn = !!localStorage.getItem('access_token');
  
    if (!showUsernameOtp) {
      // Validate initial form fields
      if (validateInitialForm()) {
        // Show OTP fields if initial validation is successful
        setShowUsernameOtp(true);
        setShowPhoneOtp(true);
        setShowMemberOtp(true);
      }
    } else {
      // Validate OTP fields
      if (validateOtp()) {
        if (validateInitialForm()) {
          try {
            const selectedDomain = (await fetchDomains()).find(domain => domain.domain_name === formData.domain);
            const selectedSector = (await fetchSectors()).find(sector => sector.sector_name === formData.sector);
  
            const postData = {
              title: formData.title,
              fullName: formData.fullName,
              username: (formData.username).toLowerCase(),
              password: formData.password,
              address: formData.address,
              phone1: formData.phone1,
              domain: selectedDomain?.domain_id,
              sector: selectedSector?.sector_id,
              domain_create: formData.domain_create ? formData.domain_create :'',
              sector_create: formData.sector_create ? formData.sector_create:'',
              onTime: formData.onTime,
              offTime: formData.offTime,
              paidVersion: formData.paidVersion,
              merchant: formData.merchant,
              pickup: formData.pickup,
              homeVisit: formData.homeVisit,
              delivery: formData.delivery,
              user_type: user_type,
              premiumVersion: formData.premiumVersion,
  
              // Add phone2 if present
              ...(formData.phone2 && { phone2: formData.phone2 }),
  
              // Add paid version details if applicable
              ...(formData.paidVersion && {
                gst: formData.gst,
                pan_no: formData.pan_no,
                cin_no: formData.cin_no,
                ...(formData.msme && { msme: formData.msme }),
              }),
  
              // Add member detail if paid version and merchant are true
              ...(formData.paidVersion && formData.merchant && {
                member_detail: formData.member_detail,
              }),
            };
  
            const response = await postEshop(postData);
  
            // Store the userAccessToken in localStorage
            if (response) {
              const user_access_token = response.user_access_token;
              dispatch(setUserToken(user_access_token));

              localStorage.setItem('accessToken', user_access_token);
              
              
            }
            
            setSnackbar({ open: true, message: 'Form submitted successfully!', severity: 'success' });
            console.log('Form Data:', formData);
            if (formData.premiumVersion) {
              setTimeout(() => {
                loggedIn ? navigate('../eshop') : navigate('../login');
              }, 2500);
            } else {
              setTimeout(() => {
                loggedIn ? navigate('../eshop') : navigate('../login');
              }, 2500);
            }
          } catch (error) {
            if (error.response.data.error === 'duplicate key value violates unique constraint "users_phone_no_1_key"') {
              setSnackbar({
                open: true,
                message: 'The phone number you entered already exists. Please use a different phone number.',
                severity: 'error',
              });
            }else if (error.response.data.error.includes('Username') &&  error.response.data.error.includes('already exists')) {
              setSnackbar({
                open: true,
                message: 'Username already exists.',
                severity: 'error',
              });
            }else{
              setSnackbar({
                open: true,
                message: 'Error while submitting the form. Please try again.',
                severity: 'error',
              });
            }
            
            console.error("Error submitting form:", error.response.data.error);
          }
        }
      }
    }
  };
  

  const [domains, setDomains] = useState([]); 
  const [sectors, setSectors] = useState([]);
  const titleOptions = ['Mr.', 'Ms.', 'Mrs.'];

  const renderFormField = (label, name, type, options = [], placeholder = '', additionalProps = {}) => (
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
      {...additionalProps}
    />
  );

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Box className="form-group">
        {renderFormField('Username / email id :', 'username', 'email')}
        {showUsernameOtp && (
          <Box className="form-group2">
            {renderFormField('Username OTP:', 'username_otp', 'text')}
          </Box>
        )}
        <Box className="form-group2">
          {renderFormField('Password :', 'password', 'password', [], '', { autoComplete: "new-password" })}
          {renderFormField('Confirm Password :', 'confirm_password', 'password',[], '', { autoComplete: "new-password" })}
          
        </Box>
        <Box className="form-group3">
          {renderFormField('Full Name :', 'title', 'select', titleOptions)}
          {renderFormField('Full Name :', 'fullName', 'text')}
        </Box>
        {renderFormField('Address :', 'address', 'text')} 
        <MapContainer center={mapPosition} zoom={13} style={{ height: "150px", width: "100%" }}>
        <TileLayer  />
        <Marker position={mapPosition} icon={icon} />
        <MapClick />
      </MapContainer>
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
        {formData.paidVersion &&  <><Box className="form-group2">
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
          {formData.merchant && 
          renderFormField('', 'member_detail', 'text', '', 'Member username or Phone no.')}
          {formData.merchant && showMemberOtp && renderFormField('Member OTP:', 'member_otp', 'text')}
        </>
        }
        
       
        
       
        <Box className="form-group-switch">
        {renderFormField('Do you want premium version', 'premiumVersion', 'switch')}
        </Box>

      </Box>
      <Box className="submit_button_container">
        <Button type="submit" variant="contained" className="submit_button" disabled={submitBtnDisable}>
          Submit
        </Button>
      </Box>

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