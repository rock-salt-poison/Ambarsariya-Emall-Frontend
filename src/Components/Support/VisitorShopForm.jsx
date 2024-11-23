import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import FormField from '../Form/FormField';
import { fetchDomains, fetchDomainSectors } from '../../API/fetchExpressAPI';

const VisitorShopForm = ({ userName, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: userName || '',
    domain: '',
    sector: '',
    purpose: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [domains, setDomains] = useState([]);
  const [sectors, setSectors] = useState([]);

  const [formFieldData, setFormFieldData] = useState([]); // Initialize formFieldData

  // Fetch domains once and set initial form field data
  useEffect(() => {
    const fetchDomainList = async () => {
      try {
        const domainList = await fetchDomains();
        setDomains(domainList.map(domain => domain.domain_name));

        // Set initial data for form fields
        setFormFieldData([
          {
            label: 'Visitor Mall001:',
            name: 'name',
            type: 'text',
            value: formData.name,
            readOnly: true,
          },
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
            options: sectors,
          },
          {
            label: 'Purpose for:',
            name: 'purpose',
            type: 'select',
            placeholder: 'Select your purpose',
            options:['Sell', 'Buy'],
          },
          {
            label: 'Message:',
            name: 'message',
            type: 'textarea',
            value: formData.message,
          },
        ]);
      } catch (error) {
        console.error('Error fetching domains:', error);
      }
    };

    fetchDomainList();
  }, []);  // Run this effect only once when the component mounts

  // Handle change in form fields
  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === 'domain') {
      try {
        // Update sectors when domain changes
        const selectedDomain = (await fetchDomains()).find(val => val.domain_name === value);
        if (selectedDomain) {
          const sectors = (await fetchDomainSectors(selectedDomain.domain_id)).map(data => data.sector_name);
          setSectors(sectors);

          // Update the formFieldData for 'sector' field options
          setFormFieldData(prevFields => prevFields.map(field =>
            field.name === 'sector' ? { ...field, options: sectors } : field
          ));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form Data:', formData);
      onSubmitSuccess(formData.domain, formData.sector);

      // Update formFieldData to remove domain and sector fields after submission
      const updatedFields = formFieldData.filter(
        (field) => field.name !== 'domain' && field.name !== 'sector' && field.name !== 'purpose'
      );
      setFormFieldData(updatedFields);
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
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
      <Box className="submit_button_container">
        <Button type="submit" variant="contained" className="submit_button">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default VisitorShopForm;
