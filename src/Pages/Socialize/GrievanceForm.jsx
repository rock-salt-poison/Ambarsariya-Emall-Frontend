import React, { useState, useEffect } from "react";
import { Box, Typography, Button, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserBadge from "../../UserBadge";
import GeneralLedgerForm from "../../Components/Form/GeneralLedgerForm";
import mca_logo from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/municipal_corporation/mca_logo.webp";
import qr_code from "../../Utils/images/Sell/cart/qr_code.svg";
import hornSound from "../../Utils/audio/horn-sound.mp3";
import CustomSnackbar from "../../Components/CustomSnackbar";
import { getShopUserData, getUser } from "../../API/fetchExpressAPI";
import createCustomTheme from "../../styles/CustomSelectDropdownTheme";

function GrievanceForm() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.userAccessToken);
  const [audio] = useState(new Audio(hornSound));
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    complainant_name: "",
    shop_no: "",
    vendor_business_name: "",
    mobile_number: "",
    email_id: "",
    mca_registration_id: "",
    category_of_grievance: "",
    description_of_grievance: "",
    supporting_documents_attached: "",
    preferred_resolution: "",
    declaration: false,
    signature: "",
    date: "",
  });

  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const themeProps = {
    popoverBackgroundColor: 'var(--lightYellow)',
    scrollbarThumb: 'var(--brown)',
    arialFont: true,
  };

  const theme = createCustomTheme(themeProps);

  // Fetch shop user data and populate form fields
  useEffect(() => {
    const fetchShopUserData = async () => {
      if (token) {
        try {
          setLoading(true);
          const userData = (await getUser(token))?.find((u) => u.shop_access_token !== null);
          
          if (userData?.shop_access_token) {
            const shopData = await getShopUserData(userData.shop_access_token);
            
            if (shopData && shopData[0]) {
              const shopUserData = shopData[0];
              setFormData((prev) => ({
                ...prev,
                complainant_name: shopUserData.full_name || "",
                shop_no: (shopUserData.shop_no)?.split('_')?.[1] || "",
                vendor_business_name: shopUserData.business_name || "",
                mobile_number: shopUserData.phone_no_1 || "",
                email_id: shopUserData.username || "",
              }));
            }
          }
        } catch (error) {
          console.error("Error fetching shop user data:", error);
          setSnackbar({
            open: true,
            message: "Failed to load shop user data",
            severity: "error",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchShopUserData();
  }, [token]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.complainant_name.trim()) {
      newErrors.complainant_name = "Complainant Name is required";
    }
    if (!formData.vendor_business_name.trim()) {
      newErrors.vendor_business_name = "Vendor / Business Name is required";
    }
    if (!formData.mobile_number.trim()) {
      newErrors.mobile_number = "Mobile Number is required";
    } else {
      // Remove any non-digit characters for validation (phone_number type may include country code)
      const phoneDigits = formData.mobile_number.replace(/\D/g, '');
      if (phoneDigits.length < 10) {
        newErrors.mobile_number = "Please enter a valid mobile number";
      }
    }
    if (!formData.email_id.trim()) {
      newErrors.email_id = "Email ID is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_id)) {
      newErrors.email_id = "Please enter a valid email address";
    }
    if (!formData.mca_registration_id.trim()) {
      newErrors.mca_registration_id = "MCA Registration ID is required";
    }
    if (!formData.category_of_grievance) {
      newErrors.category_of_grievance = "Category of Grievance is required";
    }
    if (!formData.description_of_grievance.trim()) {
      newErrors.description_of_grievance = "Description of Grievance is required";
    }
    if (!formData.supporting_documents_attached) {
      newErrors.supporting_documents_attached = "Please select an option";
    }
    if (!formData.preferred_resolution.trim()) {
      newErrors.preferred_resolution = "Preferred Resolution is required";
    }
    if (!formData.declaration) {
      newErrors.declaration = "Please accept the declaration";
    }
    if (!formData.signature.trim()) {
      newErrors.signature = "Signature is required";
    }
    if (!formData.date.trim()) {
      newErrors.date = "Date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      audio.play();
      // TODO: Add API call to submit grievance
      setSnackbar({
        open: true,
        message: "Grievance submitted successfully!",
        severity: "success",
      });

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          complainant_name: "",
          shop_no: "",
          vendor_business_name: "",
          mobile_number: "",
          email_id: "",
          mca_registration_id: "",
          category_of_grievance: "",
          description_of_grievance: "",
          supporting_documents_attached: "",
          preferred_resolution: "",
          declaration: false,
          signature: "",
          date: "",
        });
      }, 2000);
    } else {
      setSnackbar({
        open: true,
        message: "Please fill all required fields correctly",
        severity: "error",
      });
    }
  };

  const grievanceCategories = [
    "Trade License",
    "Vendor Registration",
    "Payment",
    "Technical",
    "Service Delay",
    "Other",
  ];

  const formFields = [
    {
      id: 1,
      label: "Complainant Name",
      name: "complainant_name",
      type: "text",
      placeholder: "Enter complainant name",
      required: true,
    },
    {
      id: 2,
      label: "Shop No",
      name: "shop_no",
      type: "text",
      placeholder: "Enter shop no",
      required: true,
    },
    {
      id: 3,
      label: "Vendor / Business Name",
      name: "vendor_business_name",
      type: "text",
      placeholder: "Enter vendor or business name",
      required: true,
    },
    {
      id: 4,
      label: "Mobile Number",
      name: "mobile_number",
      type: "phone_number",
      placeholder: "Enter 10-digit mobile number",
      maxLength: 10,
      required: true,
    },
    {
      id: 5,
      label: "Email ID",
      name: "email_id",
      type: "email",
      placeholder: "Enter email address",
      required: true,
    },
    {
      id: 6,
      label: "MCA Registration ID",
      name: "mca_registration_id",
      type: "text",
      placeholder: "Enter MCA registration ID",
      required: true,
    },
    {
      id: 7,
      label: "Category of Grievance",
      name: "category_of_grievance",
      type: "select",
      placeholder: "Select Category of Grievance",
      options: grievanceCategories,
      required: true,
    },
    {
      id: 8,
      label: "Description of Grievance",
      name: "description_of_grievance",
      type: "textarea",
      placeholder: "Please provide detailed description of your grievance",
      rows: 4,
      required: true,
    },
    {
      id: 9,
      label: "Supporting Documents Attached",
      name: "supporting_documents_attached",
      type: "radio",
      radioItems: [
        { id: 1, value: "Yes" },
        { id: 2, value: "No" },
      ],
      required: true,
    },
    {
      id: 10,
      label: "Preferred Resolution",
      name: "preferred_resolution",
      type: "textarea",
      placeholder: "Describe your preferred resolution",
      rows: 4,
      required: true,
    },
    
    {
      id: 11,
      label: "Signature",
      name: "signature",
      type: "text",
      placeholder: "Enter your full name as signature",
      required: true,
    },
    {
      id: 12,
      label: "Date",
      name: "date",
      type: "date",
      placeholder: "YYYY/MM/DD",
      required: true,
    },
    {
      id: 13,
      label: "Declaration: I hereby declare that the above information is true and correct.",
      name: "declaration",
      type: "checkbox",
      required: true,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box className="grievance_form_wrapper">
        <Box className="back_button">
          <UserBadge
            handleLogoutClick="../../"
            handleBadgeBgClick={-1}
            handleLogin="login"
          />
        </Box>
        <Box className="grievance_form_content">
          {/* Header */}
          <Box className="grievance_form_header">
            <Box className="header_left">
              <Box component="img" src={mca_logo} alt="MCA Logo" className="mca_logo" />
              <Box className="header_text">
                <Typography variant="h2" className="mca_title">
                  Municipal Corporation Amritsar (MCA)
                </Typography>
                <Typography variant="body1" className="mca_subtitle">
                  AMRUT 2.0 - Urban Reforms & Capacity Building E-Mall Project - Digital
                  Grievance Redressal Form
                </Typography>
              </Box>
            </Box>
            <Box className="header_right">
              <Box className="qr_code_container">
                <Box component="img" src={qr_code} alt="QR Code" className="qr_code" />
                <Typography variant="caption" className="qr_text">
                  Scan to Track
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Quote Banner */}
          <Box className="quote_banner">
            <Typography variant="body1" className="quote_text">
              "The future of business belongs to enterprises that Integrate, Automate,
              and Adapt."
            </Typography>
            <Typography variant="caption" className="quote_author">
              - Ashwani Kumar, Author of E-Mall
            </Typography>
          </Box>

          {/* Form Section */}
          <Box className="grievance_form_section">
            <GeneralLedgerForm
              formfields={formFields}
              formData={formData}
              onChange={handleChange}
              handleSubmit={handleSubmit}
              errors={errors}
              submitButtonText="Submit Grievance"
            />
          </Box>

          {/* Footer Quote */}
          <Box className="footer_quote">
            <Typography variant="body1" className="quote_text">
              "Sales creates Customers, Services creates Relationship and Deliverance
              evoke Boosts."
            </Typography>
            <Typography variant="caption" className="quote_author">
              - Ashwani Kumar, Author of E-Mall
            </Typography>
          </Box>
        </Box>

        <CustomSnackbar
          open={snackbar.open}
          handleClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
          severity={snackbar.severity}
        />
      </Box>
    </ThemeProvider>
  );
}

export default GrievanceForm;
