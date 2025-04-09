import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Tooltip, Typography } from "@mui/material";
import FormField from "../Form/FormField";
import {
  fetchDomains,
  fetchDomainSectors,
  fetchSectors,
  get_visitorData,
  initializeWebSocket,
  patch_merchantResponse,
  put_visitorData,
} from "../../API/fetchExpressAPI";
import CustomSnackbar from "../CustomSnackbar";
import { Link } from "react-router-dom";

const NotificationReplyForm = ({ visitorData, selectedNotification }) => {
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    sector: "",
    purpose: "",
    message: "",
    reply: "",
  });

  
  const [errors, setErrors] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [formFieldData, setFormFieldData] = useState([]); // Initialize formFieldData

  useEffect(() => {
      const socket = initializeWebSocket();
  
      socket.on('message', (newMessage) => {
        setSnackbar({
          open: true,
          message: newMessage,
          severity: "info", 
        });
      });
  
      return () => {
        socket.disconnect();
      };
    }, []); 

  // Fetch domains once and set initial form field data
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        
        setFormData({
          name: selectedNotification?.name || "",
          domain: selectedNotification?.domain_name || "",
          sector: selectedNotification?.sector_name || "",
          purpose: selectedNotification?.notification_purpose || "",
          message: selectedNotification?.notification || "",
        });
  
        const formFields = [
          {
            label: visitorData ? `${visitorData?.user_type}:` : "Visitor",
            name: "name",
            type: "text",
            value: selectedNotification?.name || "",
            readOnly: true,
          },
          {
            label: "Domain:",
            name: "domain",
            type: "text",
            value: selectedNotification?.domain_name || "",
            required: true,
            readOnly: true,
          },
          {
            label: "Sector:",
            name: "sector",
            type: "text",
            value: selectedNotification?.sector_name || "",
            required: true,
            readOnly: true,
          },
          {
            label: "Purpose for:",
            name: "purpose",
            type: "text",
            value: selectedNotification?.notification_purpose || "",
            required: true,
            readOnly: true,
          },
          {
            label: "Message:",
            name: "message",
            type: "textarea",
            value: selectedNotification?.notification || "",
            readOnly: true,
            readOnly: true,
          },

          {
            label: "Reply:",
            name: "reply",
            type: "textarea",
            required: true,
          },
        ];
  
        setFormFieldData(formFields);

      } catch (error) {
        setSnackbar({
          open: true,
          message: error?.response?.data?.message || "Error fetching data",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };
  
    fetchInitialData();
  }, [visitorData]);
  


  // Handle change in form fields
  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));

    setErrorMessages((prevMessages) => ({
      ...prevMessages,
      [name]: "",
    }));
  };


  const validate = () => {
    let valid = true;
    const newErrors = {};
    const newErrorMessages = {};

    if (!formData.reply) {
      newErrors.reply = true;
      newErrorMessages.reply = "Reply is required";
      valid = false;
    }

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);
    return valid;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        setLoading(true);
        
        const merchantResponse = {
          shop_no: visitorData.shop_no,
          response :formData.reply,
          business_name: visitorData.business_name,
          shop_access_token: visitorData.shop_access_token,
          timestamp :new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) 
        }        

        console.log(merchantResponse);
        
        const resp = await patch_merchantResponse(selectedNotification.support_id, merchantResponse);

        console.log(resp);
        
        setSnackbar({ open: true, message: resp.message, severity: "success" });
        
        
        // setFormData((prevData) => ({
        //   ...prevData,
        //   message: formData.reply ? formData.reply : formData.message, // Update the message with reply
        //   reply: "", // Reset reply field
        // }));
        // onSubmitSuccess(formData.domain, formData.sector, true);
      } catch (e) {
        console.log(e);

        // setSnackbar({
        //   open: true,
        //   message: e.response.data.message,
        //   severity: "error",
        // });
      }finally{
        setLoading(false);
      }
    }
  };

  

  return (
    <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
      {loading && (
        <Box className="loading">
          <CircularProgress />
        </Box>
      )}
      <Box className="form-group">
        {formFieldData.map(
          ({
            label,
            name,
            type,
            value,
            readOnly,
            placeholder,
            options,
            required,
          }) => (
            <FormField
              key={name}
              label={label}
              name={name}
              type={type}
              value={formData[name] || ""}
              onChange={handleChange}
              error={errors[name]}
              errorMessage={errorMessages[name]}
              placeholder={placeholder}
              options={options}
              className="input_field"
              readOnly={readOnly}
              required={required}
            />
          )
        )}
      </Box>
     

      <Box className="submit_button_container">
        <Button type="submit" variant="contained" className="submit_button">
          Submit
        </Button>
      </Box>

      <CustomSnackbar
        open={snackbar.open}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
        disableAutoHide={true}
      />
    </Box>
  );
};

export default NotificationReplyForm;
