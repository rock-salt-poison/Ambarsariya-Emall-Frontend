import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Tooltip, Typography } from "@mui/material";
import FormField from "../Form/FormField";
import {
  fetchDomains,
  fetchDomainSectors,
  fetchSectors,
  initializeWebSocket,
  put_visitorData,
} from "../../API/fetchExpressAPI";
import CustomSnackbar from "../CustomSnackbar";
import { Link } from "react-router-dom";
import attachment_icon from '../../Utils/images/Sell/support/attachment_icon.png';

const VisitorShopForm = ({ visitorData, onSubmitSuccess, showFields, setSelectedNotification, currentUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    sector: "",
    purpose: "",
    message: "",
    file: '',
    reply: "",
  });

  const [errors, setErrors] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [domains, setDomains] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyField, showReplyField] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const token = visitorData?.access_token || "";

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  

  const getCurrentUserId = () => {
    switch (currentUser.user_type) {
      case 'merchant':
        return currentUser.merchant_id;
      case 'shop':
        return currentUser.shop_no;
      case 'member':
        return currentUser.member_id;
      case 'visitor':
        return currentUser.visitor_id;
      default:
        return null;
    }
  };
  
  
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

    console.log(visitorData);
    

  // Fetch domains once and set initial form field data
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const domainList = await fetchDomains();
        // Filter out "Create" and add "Remote Jobs"
        const updatedDomains = domainList
          .map((domain) => domain.domain_name)
          .filter((name) => name !== "Create");
        console.log(updatedDomains)

        updatedDomains.push("Remote Jobs");
        
        setDomains(updatedDomains);
        console.log(visitorData?.domain_name, visitorData?.custom_domain);
  
        const selectedDomain = visitorData?.domain_name ? domainList.find(
          (d) => d.domain_name === visitorData?.domain_name
        ) : visitorData?.custom_domain;

        console.log(selectedDomain);
        
  
        let sectorList = [];

        if(selectedDomain === 'Co-helper'){
          sectorList = ['Logistics and Supply Chain Management', 'Environmental and Waste Management','Human Resources and Staffing','Research and Development','Engineering and Design Services','Marketing and Sales Support', 'Facility Management', 'Finance and Insurance','Health and Safety Services', 'Industrial Equipment and Machinery','Quality Control and Testing Services', 'Information Technology and Automation'];
          setSectors(sectorList);
        }else if(selectedDomain === 'Remote Jobs'){
          sectorList = ['Freelance Writing or Editing', 'Virtual Assistance', 'Graphic Design', 'Social Media Management', 'Online Tutoring or Teaching', 'E-commerce Management', 'Web Development or Programming', 'Data Entry or Analysis', 'Digital Marketing', 'Customer Support']
          setSectors(sectorList);
        }else if (visitorData?.domain_name) {
          sectorList = (await fetchDomainSectors(selectedDomain?.domain_id)).map(
            (s) => s.sector_name
          );
          setSectors(sectorList);
        } 
  
        const isFilled =
          visitorData?.domain_name && visitorData?.sector_name && visitorData?.purpose;
  
        setFormData({
          name: visitorData?.full_name || visitorData?.name || "",
          domain: visitorData?.domain_name || visitorData?.custom_domain || "",
          sector: visitorData?.sector_name || visitorData?.custom_sector || "",
          purpose: visitorData?.purpose || "",
          message: visitorData?.message || "",
          file: visitorData?.file_attached || '',
        });
  
        const formFields = [
          // {
          //   label: visitorData ? `${visitorData?.user_type}:` : "Visitor",
          //   name: "name",
          //   type: "text",
          //   value: visitorData?.full_name || visitorData?.name || "",
          //   readOnly: visitorData ? true :false,
          // },
          ...(showFields || !isFilled
            ? [
                {
                  label: "Purpose for:",
                  name: "purpose",
                  type: "select",
                  placeholder: "Select Purpose",
                  options: ["Sell", "Buy", "Subscriptions", "MoU", "Samples", "Knowledge", "Apply as Co-helper", "Remote Jobs"],
                  required: true,
                },
                {
                  label: "Domain:",
                  name: "domain",
                  type: "select",
                  placeholder: "Select domain",
                  options: updatedDomains,
                  required: true,
                },
                {
                  label: "Sector:",
                  name: "sector",
                  type: "select",
                  placeholder: "Select sector",
                  options: sectorList,
                  required: true,
                },
              ]
            : []),
          {
            label: "Message:",
            name: "message",
            type: "textarea",
            value: formData.message || visitorData?.message || "",
            required: true,
          },
        ];
  
        setFormFieldData(formFields);
  
        isFilled
          ? onSubmitSuccess(visitorData.domain_name, visitorData.sector_name, true)
          : onSubmitSuccess("domain", "sector", true);
  
      } catch (error) {
        console.log(error);
        
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
  }, [visitorData, showFields]);
  

  useEffect(() => {
    setFormFieldData((prevFields) =>
      prevFields.map((field) =>
        field.name === "message" ? { ...field, readOnly: replyField } : field
      )
    );
  }, [replyField]);

  // Handle change in form fields
  const handleChange = async (e) => {
  const { name, value } = e.target;

  if (name === "domain") {
    try {
      // Fetch all domains
      const domains = await fetchDomains();
      const selectedDomain = (value !== 'Co-helper' && value !== 'Remote Jobs') ? domains.find(
        (domain) => domain.domain_name === value
      ) : value;

      if (selectedDomain) {
        let sectorList = [];

        console.log(selectedDomain);
        
        // If domain is Co-Helper or Remote Jobs, define custom sectors
        if (selectedDomain === "Co-helper") {
          sectorList = ['Logistics and Supply Chain Management', 'Environmental and Waste Management','Human Resources and Staffing','Research and Development','Engineering and Design Services','Marketing and Sales Support', 'Facility Management', 'Finance and Insurance','Health and Safety Services', 'Industrial Equipment and Machinery','Quality Control and Testing Services', 'Information Technology and Automation'];
        } else if (selectedDomain === "Remote Jobs") {
          sectorList = ['Freelance Writing or Editing', 'Virtual Assistance', 'Graphic Design', 'Social Media Management', 'Online Tutoring or Teaching', 'E-commerce Management', 'Web Development or Programming', 'Data Entry or Analysis', 'Digital Marketing', 'Customer Support'];
        } else {
          // Otherwise fetch from API
          sectorList = (
            await fetchDomainSectors(selectedDomain.domain_id)
          ).map((data) => data.sector_name);
        }

        // Update local state
        setSectors(sectorList);

        // Update form field options dynamically
        setFormFieldData((prevFields) =>
          prevFields.map((field) =>
            field.name === "sector"
              ? { ...field, options: sectorList }
              : field
          )
        );
      }
    } catch (error) {
      console.error("Error fetching sectors:", error);
    }
  }

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


  // Handle file change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFormData((prevData) => ({
        ...prevData,
        [event.target.name]: selectedFile,
      }));
    } else {
      alert('Please upload a file.');
    }
  };

  const validate = () => {
    let valid = true;
    const newErrors = {};
    const newErrorMessages = {};

    if (!formData.name) {
      newErrors.name = true;
      newErrorMessages.name = "Name is required";
      valid = false;
    }

    if (!formData.domain) {
      newErrors.domain = true;
      newErrorMessages.domain = "Domain is required";
      valid = false;
    }

    if (!formData.sector) {
      newErrors.sector = true;
      newErrorMessages.sector = "Sector is required";
      valid = false;
    }

    if (!formData.purpose) {
      newErrors.purpose = true;
      newErrorMessages.purpose = "Purpose is required";
      valid = false;
    }

    if (!formData.message) {
      newErrors.message = true;
      newErrorMessages.message = "Message is required";
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
        const selectedDomain = (await fetchDomains()).find(
          (domain) => domain.domain_name === formData.domain
        );
        const selectedSector = (await fetchSectors()).find(
          (sector) => sector.sector_name === formData.sector
        );

        


        const resp = await put_visitorData({
          name: visitorData.full_name || visitorData.name || formData.name,
          phone_no: visitorData.phone_no_1 || visitorData.phone_no,
          domain: selectedDomain?.domain_id,
          domain_name: formData.domain,
          sector: selectedSector?.sector_id,
          sector_name: formData.sector,
          purpose: formData.purpose,
          message: formData.message,
          sending_from: getCurrentUserId(),
          file: formData.file,
          access_token: token,
          user_type: visitorData.user_type 
        });

        console.log(resp);
        
        setSnackbar({ open: true, message: resp.message, severity: "success" });
        setFormData((prevData) => ({
          ...prevData,
        }));
        onSubmitSuccess(formData.domain, formData.sector, true);
        setFormSubmitted(true);
        // Update formFieldData to remove domain and sector fields after submission
        const updatedFields = formFieldData.filter(
          (field) =>
            field.name !== "domain" &&
            field.name !== "sector" &&
            field.name !== "purpose"
        );
        setFormFieldData(updatedFields);
      } catch (e) {
        console.error(e);

        setSnackbar({
          open: true,
          message: e.response.data.message,
          severity: "error",
        });
        setFormSubmitted(false);
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
      <Typography variant="h3">Hi <Typography variant="span">{visitorData?.full_name || visitorData?.name || formData?.name} ! </Typography> Please select purpose in specific Domain & Sector</Typography>
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
      <Tooltip title="Select file" className="tooltip" placement="bottom-end">
        <Box>
          <FormField
            type="file"
            name="file"
            value={formData.file}
            onChange={handleFileChange} // Handle file selection
            placeholder="Choose File"
            uploadFileIcon={attachment_icon}
            className="attachment_icon"
          />
        </Box>
      </Tooltip>

      {visitorData?.response?.length>0 && (
        <Box className="notifications">
          {
            visitorData.response.map((merchant, index)=>{
              console.log(merchant);
              
              const selectedNotification = {
                visitor_id: visitorData.visitor_id,
                support_id: visitorData.support_id,
                id: merchant.notification_id,
                sent_from:merchant.sender_id,
                user_type: visitorData.user_type,
              }
            return <Link key={index}  onClick={()=>setSelectedNotification(selectedNotification)}>
            <Typography variant="h3">
              <Link to={`./shop?token=${merchant.shop_access_token}`}>{merchant.business_name} : </Link>
              <Typography variant="span">{merchant.sender_response}</Typography>
            </Typography>
          </Link>
          })

          }
        </Box>
      )}

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

export default VisitorShopForm;
