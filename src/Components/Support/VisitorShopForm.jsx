import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Tooltip, Typography } from "@mui/material";
import FormField from "../Form/FormField";
import {
  fetchDomains,
  fetchDomainSectors,
  fetchSectors,
  get_visitorData,
  initializeWebSocket,
  put_visitorData,
} from "../../API/fetchExpressAPI";
import CustomSnackbar from "../CustomSnackbar";
import { Link } from "react-router-dom";
import attachment_icon from '../../Utils/images/Sell/support/attachment_icon.png';

const VisitorShopForm = ({ visitorData, onSubmitSuccess, showFields }) => {
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
        const domainList = await fetchDomains();
        setDomains(domainList.map((domain) => domain.domain_name));
  
        const selectedDomain = domainList.find(
          (d) => d.domain_name === visitorData?.domain_name
        );
  
        let sectorList = [];
        if (selectedDomain) {
          sectorList = (await fetchDomainSectors(selectedDomain.domain_id)).map(
            (s) => s.sector_name
          );
          setSectors(sectorList);
        }
  
        const isFilled =
          visitorData?.domain_name && visitorData?.sector_name && visitorData?.purpose;
  
        setFormData({
          name: visitorData?.full_name || visitorData?.name || "",
          domain: visitorData?.domain_name || "",
          sector: visitorData?.sector_name || "",
          purpose: visitorData?.purpose || "",
          message: visitorData?.message || "",
          file: visitorData?.file_attached || '',
        });
  
        const formFields = [
          {
            label: visitorData ? `${visitorData?.user_type}:` : "Visitor",
            name: "name",
            type: "text",
            value: visitorData?.full_name || visitorData?.name || "",
            readOnly: visitorData ? true :false,
          },
          ...(showFields || !isFilled
            ? [
                {
                  label: "Domain:",
                  name: "domain",
                  type: "select",
                  placeholder: "Select your domain",
                  options: domainList.map((d) => d.domain_name),
                  required: true,
                },
                {
                  label: "Sector:",
                  name: "sector",
                  type: "select",
                  placeholder: "Select your sector",
                  options: sectorList,
                  required: true,
                },
                {
                  label: "Purpose for:",
                  name: "purpose",
                  type: "select",
                  placeholder: "Select your purpose",
                  options: ["Sell", "Buy"],
                  required: true,
                },
              ]
            : []),
          {
            label: "Message:",
            name: "message",
            type: "textarea",
            value: formData.reply || formData.message || visitorData?.message || "",
            readOnly: replyField,
            required: true,
          },
        ];
  
        setFormFieldData(formFields);
  
        isFilled
          ? onSubmitSuccess(visitorData.domain_name, visitorData.sector_name, true)
          : onSubmitSuccess("domain", "sector", true);
  
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
        // Fetch sectors for the selected domain
        const selectedDomain = (await fetchDomains()).find(
          (domain) => domain.domain_name === value
        );
        if (selectedDomain) {
          const sectorList = (
            await fetchDomainSectors(selectedDomain.domain_id)
          ).map((data) => data.sector_name);
          setSectors(sectorList);

          // Update formFieldData for the sector field
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
          sector: selectedSector?.sector_id,
          purpose: formData.purpose,
          message: formData.reply ? formData.reply : formData.message,
          file: formData.file,
          access_token: token,
          user_type: visitorData.user_type 
        });


        showReplyField(true);
        setSnackbar({ open: true, message: resp.message, severity: "success" });
        setFormData((prevData) => ({
          ...prevData,
          message: formData.reply ? formData.reply : formData.message, // Update the message with reply
          reply: "", // Reset reply field
        }));
        onSubmitSuccess(formData.domain, formData.sector, true);
        setFormSubmitted(true);
      } catch (e) {
        console.log(e);

        setSnackbar({
          open: true,
          message: e.response.data.message,
          severity: "error",
        });
        setFormSubmitted(false);
      }finally{
        setLoading(false);
      }

      // Update formFieldData to remove domain and sector fields after submission
      const updatedFields = formFieldData.filter(
        (field) =>
          field.name !== "domain" &&
          field.name !== "sector" &&
          field.name !== "purpose"
      );
      setFormFieldData(updatedFields);
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

      {formSubmitted && replyField && (
        <Box className="notifications">
          <Link>
            <Typography variant="h3">
              Merchant 1230:
              <Typography variant="span">Hi, I am from UCB</Typography>
              <Typography variant="span">Shop from Trilium Mall</Typography>
            </Typography>
          </Link>

          <Link>
            <Typography variant="h3">
              Merchant 1230:
              <Typography variant="span">Hi, I am from UCB</Typography>
              <Typography variant="span">Shop from Trilium Mall</Typography>
            </Typography>
          </Link>
        </Box>
      )}

      {formSubmitted && replyField && (
        <Box className="form-group">
          <FormField
            label="Reply:"
            name="reply"
            type="textarea"
            value={"" || formData["reply"]}
            onChange={handleChange}
            error={errors["reply"]}
            errorMessage={errorMessages["reply"]}
            className="input_field"
            required={true}
          />
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
