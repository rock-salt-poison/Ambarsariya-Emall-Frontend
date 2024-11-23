import React, { useState } from "react";
import GeneralLedgerForm from "../../../Components/Form/GeneralLedgerForm";
import { ThemeProvider } from "@mui/material";
import createCustomTheme from "../../../styles/CustomSelectDropdownTheme";

function CampaignHeader_PopupContent({ formData, setFormData, handleClose }) {
  const themeProps = {
    popoverBackgroundColor: "#f8e3cc",
    scrollbarThumb: "var(--brown)",
  };

  const theme = createCustomTheme(themeProps);
  const [errors, setErrors] = useState({});


  const formFields = [
    { id: 1, label: "Shop Name", name: "shop_name", type: "text" },
    { id: 2, label: "Domain", name: "domain", type: "text" },
    { id: 3, label: "Sector", name: "sector", type: "text" },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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

export default CampaignHeader_PopupContent;
