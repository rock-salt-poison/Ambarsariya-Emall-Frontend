import React, { useState } from "react";
import {
  Box,
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
    service:"",
    average_salary:"",
    last_salary:""
  };

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

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
      placeholder : "Experience in this domain with no of years you count on"
    },
    {
      id: 3,
      label: "Last Job (Fundamentals and skills known)",
      name: "last_job_skills",
      type: "textarea",
    },
    {
      id: 4,
      label: "Key Services",
      name: "service",
      type: "select",
      options : content?.services
    },
    {
      id: 5,
      label: "Enter Average Salary (per hour)",
      name: "average_salary",
      type: "text",
      behavior: "numeric",
    },
    {
      id: 6,
      label: "Enter Last Salary (per hour)",
      name: "last_salary",
      type: "text",
      behavior: "numeric",
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
    event.preventDefault(); // Prevent default form submission
    if (validateForm()) {
      console.log(formData);
      // Proceed with further submission logic, e.g., API call
    } else {
      console.log(errors);
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
  );
}
