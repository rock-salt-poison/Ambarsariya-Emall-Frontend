import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
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
import {
  get_coHelper,
  get_coHelpers_by_type_and_service,
  get_coHelper_by_type_service_member_id,
  getUser,
  post_coHelperNotification,
  post_scheduleGoogleCalendarAppointment,
  getMemberData,
  get_requestGoogleAccess,
  get_co_helper_details_popup,
  post_updateGoogleCalendarEventResponse,
  delete_googleCalendarEvent,
  get_userScopes,
} from "../../../API/fetchExpressAPI";
import CustomSnackbar from "../../CustomSnackbar";
import { addCoHelper } from "../../../store/CoHelperSlice";
import { toBeRequired } from "@testing-library/jest-dom/matchers";
import { Link, useParams } from "react-router-dom";
import ConfirmationDialog from "../../ConfirmationDialog";

export default function CoHelperTypePopup({ open, handleClose, content, id }) {
  const themeProps = {
    popoverBackgroundColor: "#f8e3cc",
    scrollbarThumb: "var(--brown)",
    dialogBackdropColor: "var(--brown)",
  };

  const theme = createCustomTheme(themeProps);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm")); // Fullscreen on small screens
  const initialData = {
    key_services: "",
    members: "",
    member_name: "",
    experience: "",
    last_job_skills: "",
    average_salary: "",
    last_salary: "",
    task_date: "",
    task_time: "",
    task_location: "",
    task_details: "",
    estimated_hr: "",
    offerings: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [memberDetails, setMemberDetails] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [coHelperDetail, setCoHelperDetail] = useState(null);
  const [members, setMembers] = useState([]);
  const [openDialog, setOpenDialog] = useState({open: false, status:'', text:''});
  const {owner} = useParams();
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const token = useSelector((state) => state.auth.userAccessToken);

  useEffect(()=>{
    if(id && currentUser?.member_id){
      console.log(id, currentUser?.member_id);
      fetchCoHelperDetail(id, currentUser?.member_id);
    }
  }, [id, currentUser?.member_id]);

  const fetchCoHelperDetail = async (id, member_id) => {
    try{
      setLoading(true);
      const resp = await get_co_helper_details_popup(id, member_id);
      console.log(resp);
      
      if(resp?.valid){
        const details = resp?.data?.[0];
        console.log(details);
        
        setCoHelperDetail(details);
        
        setFormData((prev)=>({
          ...prev,
          key_services: details?.service,
          members: details?.member_id,
          member_name: details?.member_name,
          experience: details?.experience_in_this_domain,
          last_job_skills: details?.last_job_fundamentals_or_skills_known,
          average_salary: details?.average_salary,
          last_salary: details?.last_salary,
          task_date: details?.task_date,
          task_time: details?.task_time,
          task_location: details?.task_location,
          task_details: details?.task_details,
          estimated_hr: details?.estimated_hours,
          offerings: details?.offerings,
        }));

        
      }
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  }

  console.log(coHelperDetail);
  
 
  const fetchUser = async (token) => {
    try{
      setLoading(true);
      const resp= (await getUser(token))?.find((u)=>u?.member_id !== null);
      console.log('currentUser ', resp);
      
      if(resp){

        const memberData = await getMemberData(resp?.user_access_token);
        if(memberData?.length>0){
          setCurrentUser(()=>({
            ...resp,
            username: memberData?.[0]?.username,
            oauth_access_token: memberData?.[0]?.oauth_access_token,
            oauth_refresh_token: memberData?.[0]?.oauth_refresh_token,
          }));
        }
      }
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    if(token){
      fetchUser(token);
    }
  }, [token]);

  const fetchCoHelpers = async (co_helper_type, service, buyer_member_id) => {
    console.log(buyer_member_id);
    
    try {
      setLoading(true);
      const resp = await get_coHelpers_by_type_and_service(
        co_helper_type,
        service, buyer_member_id
      );
      if (resp?.valid) {
        const members = resp?.data?.map((m) => m?.member_id);
        setMembers(members);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchMemberData = async (co_helper_type, service, member_id) => {
    try {
      setLoading(true);
      const resp = await get_coHelper_by_type_service_member_id(
        co_helper_type,
        service,
        member_id
      );
      console.log(resp?.data?.[0]);
      if (resp?.valid) {
        const data = resp?.data?.[0];
        if (data) {
          console.log(data);
          
          setMemberDetails(data);
          console.log('co_helper_data', data);
          
          setFormData((prev) => ({
            ...prev,
            member_name: data?.member_name,
            experience: data?.experience_in_this_domain,
            last_job_skills: data?.last_job_fundamentals_or_skills_known,
            average_salary: data?.average_salary,
            last_salary: data?.last_salary,
          }));
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const requesterId =
    id?.member_role === 'receiver'
      ? id?.member_id
      : currentUser?.member_id;

  if (formData?.key_services && requesterId) {
    fetchCoHelpers(content?.title, formData?.key_services, requesterId);
  }
}, [formData?.key_services, currentUser?.member_id, id?.requester_id, id?.member_role]);


  useEffect(() => {
    if (formData?.members && formData?.key_services) {
      fetchMemberData(
        content?.title,
        formData?.key_services,
        formData?.members
      );
    }
  }, [formData?.members]);

  
  const formFields = [
    {
      id: 1,
      label: "Key Services",
      name: "key_services",
      type: "select",
      options: content?.services || [],
      placeholder: "Select Key Service",
      readOnly: id && true,
    },
    {
      id: 2,
      label: "Members",
      name: "members",
      type: "select",
      options: members?.length>0 ? members : [],
      placeholder: formData?.key_services !== null ? members?.length>0 ? 'Select Member' : 'No Member exists' : "Members",
      readOnly: id && true,
    },
    ...(memberDetails
      ? [
          {
            id: 3,
            label: "Member name",
            name: "member_name",
            type: "text",
            placeholder: "Member Name",
            readOnly: true,
          },
          {
            id: 4,
            label: "Experience In this Domain",
            name: "experience",
            type: "textarea",
            placeholder: "Please enter at least 50 characters (max 200)",
            maxLength: 200,
            minLength: 50,
            readOnly: true,
          },
          {
            id: 5,
            label: "Last Job (Fundamentals and skills known)",
            name: "last_job_skills",
            type: "textarea",
            placeholder: "Please enter at least 50 characters (max 200)",
            maxLength: 200,
            minLength: 50,
            readOnly: true,
          },
          {
            id: 6,
            label: "Enter Average Salary",
            name: "average_salary",
            type: "text",
            behavior: "numeric",
            adornmentValue: "per hour",
            adornmentPosition: "end",
            readOnly: true,
          },
          {
            id: 7,
            label: "Enter Last Salary",
            name: "last_salary",
            type: "text",
            behavior: "numeric",
            adornmentValue: "per hour",
            adornmentPosition: "end",
            readOnly: true,
          },
          {
            id: 8,
            label: "Task date",
            name: "task_date",
            type: "date",
            required:true,
            readOnly: id && true,
          },
          {
            id: 9,
            label: "Task Time",
            name: "task_time",
            type: "time",
            required:true,
            readOnly: id && true,
          },
          {
            id: 10,
            label: "Task Location",
            name: "task_location",
            type: "address",
            required:true,
            readOnly: id && true,
          },
          {
            id: 11,
            label: "Details of the task",
            name: "task_details",
            type: "text",
            required:true,
            readOnly: id && true,
          },
          {
            id: 12,
            label: "Estimated hour",
            name: "estimated_hr",
            type: "number",
            adornmentValue: "hour",
            adornmentPosition: "end",
            readOnly: id && true,
          },
          {
            id: 13,
            label: "Offerings",
            name: "offerings",
            type: "text",
            readOnly: id && true,
          },
        ]
      : []),
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

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(validateForm()){
      const data = {
        requester_id: currentUser?.member_id,
        requester_name: currentUser?.name,
        co_helper_id: memberDetails?.id,
        service: formData?.key_services,
        scope: content?.scope,
        task_date: formData?.task_date,
        task_time: formData?.task_time,
        task_details: formData?.task_details,
        task_location: formData?.task_location?.description,
        estimated_hours: formData?.estimated_hr,
        offerings: formData?.offerings
      };
      if(data){
        try{
          setLoading(true);
          // const calendarData = {
          //     co_helper_email: memberDetails?.username,
          //     co_helper_id: memberDetails?.id,
          //     task_date: formData?.task_date,
          //     task_time: formData?.task_time,
          //     task_details: formData?.task_details,
          //     task_location: formData?.task_location?.description,
          //     estimated_hours: formData?.estimated_hr,
          //     offerings: formData?.offerings,
          //     requester_email: currentUser?.username,
          //     requester_name: (currentUser?.name)?.split(' ').map((word)=>word.at(0).toUpperCase()+word.slice(1)).join(' '),
          //     co_helper_type: content?.title,
          //   }
          // const calendarResp = await post_scheduleGoogleCalendarAppointment(calendarData);
          console.log(currentUser?.oauth_access_token , currentUser?.oauth_refresh_token);
          
          if(currentUser?.oauth_access_token && currentUser?.oauth_refresh_token){
            const resp = await get_userScopes(currentUser?.oauth_access_token, currentUser?.oauth_refresh_token);
            if(resp){
              const scopeArray = resp?.scopes?.split(' ') || [];

              const hasCalendarScope = scopeArray.includes("https://www.googleapis.com/auth/calendar");
              const hasEventsScope = scopeArray.includes("https://www.googleapis.com/auth/calendar.events");

              if (hasCalendarScope && hasEventsScope) {
                const resp = await post_coHelperNotification(data);
                if(resp){
                  setSnackbar({
                    open: true,
                    message: resp?.message,
                    severity: "success",
                  });
      
                  setTimeout(()=>{
                    handleClose();
                  }, 2000)
                }
              }else{
                get_requestGoogleAccess(currentUser?.username, `${process.env.REACT_APP_FRONTEND_LINK}/sell/shop/${owner}/cart`);
              }
            }
          }else{
            get_requestGoogleAccess(currentUser?.username, `${process.env.REACT_APP_FRONTEND_LINK}/sell/shop/${owner}/cart`);
          }

          // if(calendarResp?.success){
          
          // }else{
          //   setTimeout(()=>{
          //     setSnackbar({
          //       open: true,
          //       message: `Redirecting for Google access`,
          //       severity: "info",
          //     });
          //     setTimeout(()=>{
          //       get_requestGoogleAccess(currentUser?.username, `${process.env.REACT_APP_FRONTEND_LINK}/sell/shop/${owner}/cart`);
          //       return;
          //     }, 1500);
          //   }, 2000)
          // }
        }catch(e){
          console.log(e);
          setSnackbar({
            open: true,
            message: e.response.data.message,
            severity: "error",
          });
        }finally{
          setLoading(false);
        }
      }
    }
  };

  const handleAccept = async (e) =>{
    setOpenDialog({
      open: true,
      status:'accepted',
      text: 'Are you sure you want to accept this calendar invitation?',
    });
  }

  const handleDeny = async (e) =>{
    setOpenDialog({
      open: true,
      status:'declined',
      text: 'Are you sure you want to decline this event?'
    })
  }

  const handleTentative = async (e) =>{
    setOpenDialog({
      open: true,
      status:'tentative',
      text: `Do you want to mark this event as 'Maybe'?`
    })
  }

  const handleDelete = async (e) =>{
    setOpenDialog({
      open: true,
      status:'delete',
      text: `Are you sure you want to delete this event?`
    })
  }

  const handleConfirm = async (e, status) => {
    console.log(status);
    if((status !== 'delete') && (status === 'accepted' || status === 'declined' || status === 'tentative')){
      const data = {
        // member_email: currentUser?.username,
        // member_id: currentUser?.member_id,
        // event_id: coHelperDetail?.calendar_event_id,
        // response_status: status,     
        // notification_id: coHelperDetail?.notification_id ,


        requester_email: coHelperDetail?.requester_email,
        requester_id: coHelperDetail?.requester_id,
        co_helper_email: currentUser?.username,
        co_helper_id: currentUser?.member_id,
        task_date: formData?.task_date,
        task_time: formData?.task_time,
        estimated_hours: formData?.estimated_hr,
        task_details: formData?.task_details,
        task_location: formData?.task_location,
        requester_name: coHelperDetail?.requester_name,
        response_status: status,
        notification_id: coHelperDetail?.notification_id,
        co_helper_type: content?.title,
        service: coHelperDetail?.service,
        offerings: formData?.offerings,
      }

      if(data){
        try{
          setLoading(true);
          const calendarResp = await post_scheduleGoogleCalendarAppointment(data);
          console.log(calendarResp);
          if(calendarResp?.success){
            setSnackbar({
            open: true,
            message: calendarResp?.message,
            severity: "success",
          });
          setCoHelperDetail((prev)=>({
            ...prev,
            status: status
          }))
          }        
        }catch(e){
          console.log(e);
           setSnackbar({
            open: true,
            message: e.response.data.message,
            severity: "error",
          });
        }finally{
          setLoading(false);
        }
      }
    }else if (status === 'delete'){
      const data = {
        organizer_email: currentUser?.username,
        organizer_id: currentUser?.member_id,
        event_id: coHelperDetail?.calendar_event_id,
        notification_id: coHelperDetail?.notification_id 
      }

      if(data){
        try{
          setLoading(true);
          const calendarResp = await delete_googleCalendarEvent(data);
          if(calendarResp?.success){
            setSnackbar({
            open: true,
            message: calendarResp?.message,
            severity: "success",
          });
          } 
        }catch(e){
          console.log(e);
           setSnackbar({
            open: true,
            message: e.response.data.message,
            severity: "error",
          });
        }finally{
          setLoading(false);
        }
      }
    }
    setOpenDialog(false);
  }
  console.log(coHelperDetail);

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
          {loading && (
            <Box className="loading">
              <CircularProgress />
            </Box>
          )}
          <DialogContent className="cohelper_popup_content">
            <Box component="img" src={star} alt="star" className="star_img" />
            <Box className="content">
              <Box className="content-body">
                <Box className="header">
                  <Box
                    component="img"
                    alt="img"
                    className="icon"
                    src={content?.imgSrc}
                  />
                  <Typography variant="h2">{content?.title}</Typography>
                </Box>

                <Typography className="heading">
                  Scope :{" "}
                  <Typography variant="span">{content?.scope}</Typography>
                </Typography>

                {memberDetails && <Typography className="heading">
                  Selected Co-Helper :{" "}
                  <Link to={`../esale/${memberDetails?.access_token}`}><Typography variant="span">{memberDetails?.member_name}</Typography></Link>
                </Typography>}

                <GeneralLedgerForm
                  formfields={formFields}
                  handleSubmit={handleSubmit}
                  formData={formData}
                  onChange={handleChange}
                  errors={errors}
                  submitBtnVisibility={id && false}
                  // submitBtnVisibility={false}
                />

                {(id && coHelperDetail?.member_role === 'receiver' && coHelperDetail?.status === 'pending') ? <Box className="submit_button_container">
                  <Button className="submit_button" onClick={handleAccept}>
                    Accept
                  </Button>
                  <Button className="submit_button" onClick={handleDeny}>
                    Deny
                  </Button>
                  <Button className="submit_button" onClick={handleTentative}>
                    May be
                  </Button>
                </Box> : (id && coHelperDetail?.member_role === 'receiver' && coHelperDetail?.status !== 'pending') && <Box className="submit_button_container">
                  <Button className="submit_button" sx={{cursor:'not-allowed'}}>
                    {coHelperDetail?.status}
                  </Button>
                </Box>}

                {(id && coHelperDetail?.member_role === 'sender') && <Box className="submit_button_container">
                  <Button className="submit_button" onClick={handleDelete}>
                    Delete
                  </Button>
                </Box>}

                {/* {memberDetails && <Box className="member_details">
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
            </Box>} */}
              </Box>
            </Box>

            <Box
              component="img"
              src={star}
              alt="star"
              className="star_img bottom"
            />
            <CustomSnackbar
              open={snackbar.open}
              handleClose={() => setSnackbar({ ...snackbar, open: false })}
              message={snackbar.message}
              severity={snackbar.severity}
              disableAutoHide={true}
            />
          </DialogContent>
        </Dialog>
            <ConfirmationDialog
              open={openDialog.open}
              onClose={() => setOpenDialog(false)}
              onConfirm={(e) => handleConfirm(e, openDialog?.status)}
              title="Confirm Event"
              message={openDialog.text}
              optionalCname="logoutDialog"
              confirmBtnText='Confirm'
            />
      </ThemeProvider>
    </>
  );
}
