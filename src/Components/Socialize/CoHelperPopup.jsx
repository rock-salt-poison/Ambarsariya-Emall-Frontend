import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  ThemeProvider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import UserBadge from "../../UserBadge";
import star from "../../Utils/images/Socialize/city_junctions/co_helpers/star.svg";
import GeneralLedgerForm from "../Form/GeneralLedgerForm";
import createCustomTheme from "../../styles/CustomSelectDropdownTheme";
import { useDispatch, useSelector } from "react-redux";
import { get_coHelper, getUser } from "../../API/fetchExpressAPI";
import CustomSnackbar from "../CustomSnackbar";
import { addCoHelper } from "../../store/CoHelperSlice";

export default function CoHelperPopup({ open, handleClose, content }) {
  
  const themeProps = {
    popoverBackgroundColor: '#f8e3cc',
    scrollbarThumb: 'var(--brown)',
    dialogBackdropColor: 'var(--brown)',
  };
  
  const theme = createCustomTheme(themeProps);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm")); // Fullscreen on small screens
  const initialData = {
    member_id: "",
    experience:"",
    last_job_skills:"",
    key_services:"",
    average_salary:"",
    last_salary:""
  };

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const token = useSelector((state) => state.auth.userAccessToken);
  const coHelpers = useSelector((state) => state.co_helper.coHelpers);  

  useEffect(()=>{
    if(token){
      fetchUserDetails(token);
    }else{
      setSnackbar({
        open: true,
        message: 'Co-helper applications are exclusive to E-mall members. Join us today to get started !',
        severity: 'info',
      });
    }
  }, [token, coHelpers]);

  const fetchUserDetails = async (token) => {
    try{
      setLoading(true);
      const userData = (await getUser(token))?.find((u)=> u.member_id !== null);
      const member_id = (userData?.member_id)?.replace(/_/g,' ');
      if(member_id){
        setFormData((prev)=>({
          ...prev,
          member_id
        }))
        fetch_coHelper(userData?.member_id, content?.title);
      }
    }catch(e){
      console.log(e);
      setSnackbar({
          open: true,
          message: 'Co-helper applications are exclusive to E-mall members. Join us today to get started !',
          severity: 'info',
        });
    }finally{
      setLoading(false);
    }
  }

  const fetch_coHelper = async (member_id, co_helper_type) => {
    const updated_member_id = member_id?.replace(/_/g, ' ');
    try{
      setLoading(true);
      const co_helper_data = await get_coHelper(member_id, co_helper_type);
      console.log(co_helper_data);
      if(co_helper_data?.valid){
        const responseData = co_helper_data?.data?.[0];
        setFormData((prev)=>({
          ...prev,
          member_id: responseData?.member_id,
          experience: responseData?.experience_in_this_domain,
          last_job_skills: responseData?.last_job_fundamentals_or_skills_known,
          key_services: responseData?.key_services,
          average_salary: responseData?.average_salary,
          last_salary: responseData?.last_salary,
        }))
      }else{
        const existing = coHelpers.find(
          (c) => c.member_id === updated_member_id && c.co_helper_type === content?.title
        );
        if (existing) {
          setFormData((prev)=>({
            ...prev,
            ...existing
          }));
        }
      }
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  }
  

  const formFields = [
    {
      id: 1,
      label: "Member Id",
      name: "member_id",
      type: "text",
      placeholder:'Member ID',
    },
    {
      id: 2,
      label: "Experience In this Domain",
      name: "experience",
      type: "textarea",
      placeholder : "Please enter at least 50 characters (max 200)",
      maxLength: 200,
      minLength: 50,
    },
    {
      id: 3,
      label: "Last Job (Fundamentals and skills known)",
      name: "last_job_skills",
      type: "textarea",
      placeholder : "Please enter at least 50 characters (max 200)",
      maxLength: 200,
      minLength: 50,
    },
    {
      id: 4,
      label: "Key Services",
      name: "key_services",
      type: "select-check",
      options : content?.services,
      placeholder: "Key Services"
    },
    {
      id: 5,
      label: "Enter Average Salary",
      name: "average_salary",
      type: "text",
      behavior: "numeric",
      adornmentValue: 'per hour',
      adornmentPosition: 'end'
    },
    {
      id: 6,
      label: "Enter Last Salary",
      name: "last_salary",
      type: "text",
      behavior: "numeric",
      adornmentValue: 'per hour',
      adornmentPosition: 'end'
    },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    // Clear any previous error for this field
    setErrors({ ...errors, [name]: null });
  };

  const validateForm = () => {
    const newErrors = {};

    formFields.forEach((field) => {
      const name = field.name;
      // Validate main fields
      if (!formData[name]) {
        newErrors[name] = `${field.label} is required.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (event) => {
  event.preventDefault();

  if (validateForm()) {
    const dataWithType = {
      ...formData,
      member_id : (formData?.member_id)?.replace(/\s/g,'_'),
      co_helper_type: content?.title, // Important for identifying co-helper type
    };

    dispatch(addCoHelper(dataWithType)); // ✅ Store in Redux (and persist if set up)
    
    setSnackbar({
      open: true,
      message: "Co-helper info saved locally.",
      severity: "success",
    });

    setTimeout(()=>{
      handleClose(); // Optional: close dialog on submit
    }, 2000);

  } else {
    console.log(errors);
  }
};

  return (
    <>
    <ThemeProvider theme={theme}>
      {loading && <Box className="loading"><CircularProgress/></Box> }
      <Dialog
        open={open}
        onClose={handleClose}
        className="cohelper_popup"
        maxWidth="sm"
        fullScreen={fullScreen}
        fullWidth
      >
        <DialogContent className="cohelper_popup_content">
          <Box component="img" src={star} alt="star" className="star_img" />
          <Box className="content">
            <Box className="content-body">
              <Box className="header">
                <Typography variant="h2">{content?.title}</Typography>
              </Box>

              <Typography className="heading">
                Scope : <Typography variant="span">{content?.scope}</Typography>
              </Typography>

              <GeneralLedgerForm
                formfields={formFields}
                handleSubmit={handleSubmit}
                formData={formData}
                onChange={handleChange}
                errors={errors}
              />
            </Box>
          </Box>

          <Box
            component="img"
            src={star}
            alt="star"
            className="star_img bottom"
          />
        </DialogContent>
        
      </Dialog>
    </ThemeProvider>
      <CustomSnackbar
        open={snackbar.open}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
        disableAutoHide={true}
      />
      </>
  );
}
