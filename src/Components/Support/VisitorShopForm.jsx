import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import FormField from '../Form/FormField';
import { fetchDomains, fetchDomainSectors, fetchSectors, get_visitorData, put_visitorData } from '../../API/fetchExpressAPI';
import CustomSnackbar from '../CustomSnackbar';
import { Link } from 'react-router-dom';

const VisitorShopForm = ({ visitorData, onSubmitSuccess, showFields }) => {
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    sector: '',
    purpose: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [domains, setDomains] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);


  const token = visitorData.access_token || '';

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [formFieldData, setFormFieldData] = useState([]); // Initialize formFieldData

  
  // Fetch domains once and set initial form field data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch domains
        const domainList = await fetchDomains();
        setDomains(domainList.map(domain => domain.domain_name));
  
          setFormData({
            name: visitorData.name || '',
            domain: visitorData.domain_name || '',
            sector: visitorData.sector_name || '',
            purpose: visitorData.purpose || '',
            message: visitorData.message || '',
          });
          
          // Fetch sectors for the pre-filled domain
          const selectedDomain = domainList.find(domain => domain.domain_name === visitorData.domain_name);
          if (selectedDomain) {
            const sectorList = (await fetchDomainSectors(selectedDomain.domain_id)).map(sector => sector.sector_name);
            setSectors(sectorList);
          }
  
          // Determine which fields to include in formFieldData
          const isFilled = visitorData.domain_name && visitorData.sector_name && visitorData.purpose;
          const initialFields = [
            {
              label: 'Visitor Mall001:',
              name: 'name',
              type: 'text',
              value: visitorData.name || '',
              readOnly: true,
            },
            ...(showFields || !isFilled
              ? [
                  {
                    label: 'Domain:',
                    name: 'domain',
                    type: 'select',
                    placeholder: 'Select your domain',
                    options: domainList.map(domain => domain.domain_name),
                  },
                  {
                    label: 'Sector:',
                    name: 'sector',
                    type: 'select',
                    placeholder: 'Select your sector',
                    options: sectors || [],
                  },
                  {
                    label: 'Purpose for:',
                    name: 'purpose',
                    type: 'select',
                    placeholder: 'Select your purpose',
                    options: ['Sell', 'Buy'],
                  },
                ]
              : []),
            {
              label: 'Message:',
              name: 'message',
              type: 'textarea',
              value: visitorData.message || '',
              readOnly: formSubmitted 
            },
          ];

          isFilled ? onSubmitSuccess(visitorData.domain_name, visitorData.sector_name, true):onSubmitSuccess('domain', 'sector', false);
          setFormFieldData(initialFields);

        } catch (error) {
        setLoading(false);
        setSnackbar({ open: true, message: error.response.data.message, severity: 'error' });
        console.error('Error fetching initial data:', error);
      }
    };
  
    fetchInitialData();
  }, [visitorData, showFields]);
  
   // Run this effect only once when the component mounts

  // Handle change in form fields
  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === 'domain') {
      try {
        // Fetch sectors for the selected domain
        const selectedDomain = (await fetchDomains()).find(domain => domain.domain_name === value);
        if (selectedDomain) {
          const sectorList = (await fetchDomainSectors(selectedDomain.domain_id)).map(data => data.sector_name);
          setSectors(sectorList);
  
          // Update formFieldData for the sector field
          setFormFieldData(prevFields =>
            prevFields.map(field =>
              field.name === 'sector' ? { ...field, options: sectorList } : field
            )
          );
        }
      } catch (error) {
        console.error('Error fetching sectors:', error);
      }
    }

    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: false,
    }));

    setErrorMessages(prevMessages => ({
      ...prevMessages,
      [name]: '',
    }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = {};
    const newErrorMessages = {};

    if (!formData.name) {
      newErrors.name = true;
      newErrorMessages.name = 'Name is required';
      valid = false;
    }

    if (!formData.domain) {
      newErrors.domain = true;
      newErrorMessages.domain = 'Domain is required';
      valid = false;
    }

    if (!formData.sector) {
      newErrors.sector = true;
      newErrorMessages.sector = 'Sector is required';
      valid = false;
    }

    if (!formData.purpose) {
      newErrors.purpose = true;
      newErrorMessages.purpose = 'Purpose is required';
      valid = false;
    }

    if (!formData.message) {
      newErrors.message = true;
      newErrorMessages.message = 'Message is required';
      valid = false;
    }

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try{
        setLoading(true);
        const selectedDomain = (await fetchDomains()).find(domain => domain.domain_name === formData.domain);
        const selectedSector = (await fetchSectors()).find(sector => sector.sector_name === formData.sector);

        const resp = await put_visitorData({
          domain: selectedDomain?.domain_id,
          sector: selectedSector?.sector_id,
          purpose: formData.purpose,
          message: formData.message,
          access_token: token
        })
        setLoading(false);
        setSnackbar({ open: true, message: resp.message, severity: 'success' });

        onSubmitSuccess(formData.domain, formData.sector, true);
        setFormSubmitted(true);
        
      }catch(e){
        setSnackbar({ open: true, message: e.resp.data.error, severity: 'success' });
        setFormSubmitted(false);
      }
      

      // Update formFieldData to remove domain and sector fields after submission
      const updatedFields = formFieldData.filter(
        (field) => field.name !== 'domain' && field.name !== 'sector' && field.name !== 'purpose'
      );
      setFormFieldData(updatedFields);
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
       {loading && <Box className="loading">
                <CircularProgress />
              </Box>}
      <Box className="form-group">
        {formFieldData.map(({ label, name, type, value, readOnly, placeholder, options }) => (
          <FormField
            key={name}
            label={label}
            name={name}
            type={type}
            value={value || formData[name]}
            onChange={handleChange}
            error={errors[name]}
            errorMessage={errorMessages[name]}
            placeholder={placeholder}
            options={options}
            className="input_field"
            readOnly={readOnly}
          />
        ))}
      </Box>

      {formSubmitted && (
          <Box className="notifications">
            <Link >
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
      />
    </Box>
  );
};

export default VisitorShopForm;
