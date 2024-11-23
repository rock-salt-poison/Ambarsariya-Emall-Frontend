import React, { useState } from "react";
import GeneralLedgerForm from "../../Form/GeneralLedgerForm";
import { ThemeProvider } from "@mui/material";
import createCustomTheme from "../../../styles/CustomSelectDropdownTheme";

function CampaignCTA_PopupContent({ formData, setFormData, handleClose }) {
  const themeProps = {
    popoverBackgroundColor: "#f8e3cc",
    scrollbarThumb: "var(--brown)",
  };

  const theme = createCustomTheme(themeProps);
  const [errors, setErrors] = useState({});


  const formFields = [
    {
      id: 1,
      label: "Choose Date/Time",
      name: "date_time",
      type: "datetime-local"
    },
    {
      id: 2,
      label: "Select Group (s)",
      name: "groups",
      type: "select-check",
      options:['Group 1', 'Group 2', 'Group 3', 'Group 4', 'Group 5']
    },
    {
      id: 3,
      label: "Select contact (s)",
      name: "contacts",
      type: "select-check",
      options: ['Contact 1', 'Contact 2', 'Contact 3', 'Contact 4']
    },
    {
      id:4,
      label: "Choose Media", 
      name :'media',
      type:'select-check',
      options:['Instagram', 'SMS', 'Whatsapp','Facebook', 'Snapchat','Youtube', 'Twitter'],
    },
    {
      id:5,
      label: "Repeat Action",
      name :'repeat_action',
      type : 'switch', 
    },
    {
      id:6,
      label: "Choose Date/Time",
      name :'repeat_action_date_time',
      type :'datetime-local'
    },
  ];

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    console.log(checked)
    setFormData({ ...formData, [name]: value, });
    if(type==='checkbox'){
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value, 
    });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleClose();
  }

  
  return (
    <ThemeProvider theme={theme}>
      <GeneralLedgerForm
        formfields={formFields}
        formData={formData}
        onChange={handleChange}
        errors={errors}
        handleSubmit={handleSubmit}
      />
    </ThemeProvider>
  );
}

export default CampaignCTA_PopupContent;
