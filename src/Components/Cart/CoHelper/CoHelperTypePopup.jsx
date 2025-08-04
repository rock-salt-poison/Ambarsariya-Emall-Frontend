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
import {
  get_coHelper,
  get_coHelpers_by_type_and_service,
  get_coHelper_by_type_service_member_id,
  getUser,
  post_coHelperNotification,
} from "../../../API/fetchExpressAPI";
import CustomSnackbar from "../../CustomSnackbar";
import { addCoHelper } from "../../../store/CoHelperSlice";
import { toBeRequired } from "@testing-library/jest-dom/matchers";
import { Link } from "react-router-dom";

export default function CoHelperTypePopup({ open, handleClose, content }) {
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
    experience: "",
    last_job_skills: "",
    average_salary: "",
    last_salary: "",
    task_date: "",
    task_time: "",
    details_of_task: "",
    estimated_hr: "",
    offerings: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [memberDetails, setMemberDetails] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [members, setMembers] = useState([]);
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const token = useSelector((state) => state.auth.userAccessToken);
  
  const fetchUser = async (token) => {
    try{
      setLoading(true);
      const resp= (await getUser(token))?.find((u)=>u?.member_id !== null);
      if(resp){
        setCurrentUser(resp);
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
          setMemberDetails(data);
          setFormData((prev) => ({
            ...prev,
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
    if (formData?.key_services && currentUser?.member_id) {
      fetchCoHelpers(content?.title, formData?.key_services, currentUser?.member_id);
    }
  }, [formData?.key_services, currentUser?.member_id]);

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
      options: content?.services,
      placeholder: "Select Key Service",
    },
    {
      id: 2,
      label: "Members",
      name: "members",
      type: "select",
      options: members?.length>0 ? members : [],
      placeholder: formData?.key_services !== null ? members?.length>0 ? 'Select Member' : 'No Member exists' : "Members",
    },
    ...(memberDetails
      ? [
          {
            id: 3,
            label: "Experience In this Domain",
            name: "experience",
            type: "textarea",
            placeholder: "Please enter at least 50 characters (max 200)",
            maxLength: 200,
            minLength: 50,
            readOnly: true,
          },
          {
            id: 4,
            label: "Last Job (Fundamentals and skills known)",
            name: "last_job_skills",
            type: "textarea",
            placeholder: "Please enter at least 50 characters (max 200)",
            maxLength: 200,
            minLength: 50,
            readOnly: true,
          },
          {
            id: 5,
            label: "Enter Average Salary",
            name: "average_salary",
            type: "text",
            behavior: "numeric",
            adornmentValue: "per hour",
            adornmentPosition: "end",
            readOnly: true,
          },
          {
            id: 6,
            label: "Enter Last Salary",
            name: "last_salary",
            type: "text",
            behavior: "numeric",
            adornmentValue: "per hour",
            adornmentPosition: "end",
            readOnly: true,
          },
          {
            id: 7,
            label: "Task date",
            name: "task_date",
            type: "date",
            required:true,
          },
          {
            id: 8,
            label: "Task Time",
            name: "task_time",
            type: "time",
            required:true,
          },
          {
            id: 9,
            label: "Details of the task",
            name: "details_of_task",
            type: "text",
            required:true,
          },
          {
            id: 10,
            label: "Estimated hour",
            name: "estimated_hr",
            type: "number",
            adornmentValue: "hour",
            adornmentPosition: "end",
          },
          {
            id: 11,
            label: "Offerings",
            name: "offerings",
            type: "text",
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
        co_helper_id: memberDetails?.id,
        task_date: formData?.task_date,
        task_time: formData?.task_time,
        task_details: formData?.task_details,
        estimated_hours: formData?.estimated_hr,
        offerings: formData?.offerings
      };
      if(data){
        try{
          setLoading(true);
          const resp = await post_coHelperNotification(data);
          if(resp){
            setSnackbar({
              open: true,
              message: resp?.message,
              severity: "success",
            });
          }
        }catch(e){
          console.log(e);
          setSnackbar({
            open: true,
            message: e.response.data.error,
            severity: "error",
          });
        }finally{
          setLoading(false);
        }
      }
    }
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
                  <Link to={`../esale/${memberDetails?.access_token}`}><Typography variant="span">{memberDetails?.member_id}</Typography></Link>
                </Typography>}

                <GeneralLedgerForm
                  formfields={formFields}
                  handleSubmit={handleSubmit}
                  formData={formData}
                  onChange={handleChange}
                  errors={errors}
                  // submitBtnVisibility={false}
                />

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
      </ThemeProvider>
    </>
  );
}
