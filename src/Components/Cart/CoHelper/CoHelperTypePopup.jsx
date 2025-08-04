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
import UserBadge from "../../../UserBadge";
import star from "../../../Utils/images/Socialize/city_junctions/co_helpers/star.svg";
import GeneralLedgerForm from "../../Form/GeneralLedgerForm";
import createCustomTheme from "../../../styles/CustomSelectDropdownTheme";
import { useDispatch, useSelector } from "react-redux";
import { get_coHelper, get_coHelpers_by_type_and_service, get_coHelper_by_type_service_member_id, getUser } from "../../../API/fetchExpressAPI";
import CustomSnackbar from "../../CustomSnackbar";
import { addCoHelper } from "../../../store/CoHelperSlice";

export default function CoHelperTypePopup({ open, handleClose, content }) {
  
  const themeProps = {
    popoverBackgroundColor: '#f8e3cc',
    scrollbarThumb: 'var(--brown)',
    dialogBackdropColor: 'var(--brown)',
  };
  
  const theme = createCustomTheme(themeProps);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm")); // Fullscreen on small screens
  const initialData = {
    key_services:"",
    members:"",
  };

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [memberDetails, setMemberDetails] = useState(null);
  const [members, setMembers] = useState([]);
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });


  

  const fetchCoHelpers = async (co_helper_type, service) => {
    try{
      setLoading(true);
      const resp = await get_coHelpers_by_type_and_service(co_helper_type, service);
      if(resp?.valid){
        const members = resp?.data?.map((m)=> m?.member_id);        
        setMembers(members);
      }
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  }

  const fetchMemberData = async (co_helper_type, service, member_id) => {
    try{
      setLoading(true);
      const resp = await get_coHelper_by_type_service_member_id(co_helper_type, service, member_id);
      console.log(resp?.data?.[0])
      if(resp?.valid){
        setMemberDetails(resp?.data?.[0]);
      }
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  }


  useEffect(()=>{
    if(formData?.key_services){
      fetchCoHelpers(content?.title, formData?.key_services);
    }
  }, [formData?.key_services]);

  useEffect(()=>{
    if(formData?.members && formData?.key_services){
      fetchMemberData(content?.title, formData?.key_services, formData?.members);
    }
  }, [formData?.members]);
  

  const formFields = [
    {
      id: 1,
      label: "Key Services",
      name: "key_services",
      type: "select",
      options : content?.services,
      placeholder: "Select Key Service"
    },
    {
      id: 2,
      label: "Members",
      name: "members",
      type: "select",
      options : members || ['Please select service first'],
      placeholder: "Members"
    },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    // Clear any previous error for this field
    setErrors({ ...errors, [name]: null });
  };



  

  return (
    <>
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={handleClose}
        className="cohelper_popup"
        maxWidth="sm"
        fullScreen={fullScreen}
        fullWidth
        >
        {loading && <Box className="loading"><CircularProgress/></Box> }
        <DialogContent className="cohelper_popup_content">
          <Box component="img" src={star} alt="star" className="star_img" />
          <Box className="content">
            <Box className="content-body">
              <Box className="header">
                <Box component="img" alt="img" className="icon" src={content?.imgSrc}/>
                <Typography variant="h2">{content?.title}</Typography>
              </Box>

              <Typography className="heading">
                Scope : <Typography variant="span">{content?.scope}</Typography>
              </Typography>

              <GeneralLedgerForm
                formfields={formFields}
                formData={formData}
                onChange={handleChange}
                errors={errors}
                submitBtnVisibility={false}
              />

            {memberDetails && <Box className="member_details">
              <Typography className="heading">
                Member ID : <Typography variant="span">{memberDetails?.member_id}</Typography>
              </Typography>
              <Typography className="heading">
                Name : <Typography variant="span">{memberDetails?.full_name}</Typography>
              </Typography>
              <Typography className="heading">
                Experience In this Domain : <Typography variant="span">{memberDetails?.experience_in_this_domain}</Typography>
              </Typography>
              <Typography className="heading">
                Average Salary : <Typography variant="span">{memberDetails?.average_salary}</Typography>
              </Typography>
            </Box>}

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
