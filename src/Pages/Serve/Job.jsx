import React, { useState } from 'react';
import { Box, Button, ThemeProvider } from '@mui/material';
import Button2 from '../../Components/Home/Button2';
import jobs_icon from '../../Utils/images/Serve/emotional/campaign/job/jobs_icon.svg';
import hiring_banner from '../../Utils/images/Serve/emotional/campaign/job/we_are_hiring_banner.webp';
import FormField from '../../Components/Form/FormField';
import upload_icon from '../../Utils/images/Serve/emotional/campaign/job/upload_resume.svg';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import { Link } from 'react-router-dom';

function Job(props) {

const themeProps = {
  popoverBackgroundColor: props.popoverBackgroundColor || '#fdc976',
  scrollbarThumb: 'var(--brown)'
};

const theme = createCustomTheme(themeProps);

  const [formData, setFormData] = useState({
    sector: '',
    category: '',
    position: '',
    experience: '',
    resume: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.sector) newErrors.sector = 'Sector is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.position) newErrors.position = 'Position is required';
    if (!formData.experience) newErrors.experience = 'Experience is required';
    if (!formData.resume) newErrors.resume = 'Resume is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log(formData);
    }
  };

  return (
    <ThemeProvider theme={theme}>
    <Box className="job_apply_wrapper">
      <Box className="row">
        <Box className="col">
          <Button2 text="Back" redirectTo={-1} />
          <Link className="icon_container" to='../emotional'>
            <Box component="img" src={jobs_icon} alt="job" className="job_icon" />
          </Link>
          <Button2 text="Next" redirectTo="../emotional/campaign/community" />
        </Box>
        <Box className="col">
          <Box className="container">
            <Box component="form" className="form_container" noValidate autoComplete="off" onSubmit={handleSubmit}>
              <FormField
                name="sector"
                type="select"
                value={formData.sector}
                onChange={handleChange}
                options={['IT', 'Marketing', 'Finance']}
                placeholder="Select sector"
                error={!!errors.sector}
                errorMessage={errors.sector}
              />
              <FormField
                name="category"
                type="select"
                value={formData.category}
                onChange={handleChange}
                options={['Full-time', 'Part-time', 'Internship']}
                placeholder="Select category"
                error={!!errors.category}
                errorMessage={errors.category}
              />
              <FormField
                name="position"
                type="select"
                value={formData.position}
                onChange={handleChange}
                options={[
                  'Software Engineer',
                  'Product Manager',
                  'Data Analyst',
                  'Marketing Specialist',
                  'Sales Representative',
                  'Graphic Designer',
                  'Content Writer',
                  'Customer Support Specialist',
                  'Human Resources Manager',
                  'Financial Analyst',
                ]}
                placeholder="Enter position"
                error={!!errors.position}
                errorMessage={errors.position}
              />
              <FormField
                name="experience"
                type="select"
                value={formData.experience}
                onChange={handleChange}
                options={['Fresher', '1-3 years', '3-5 years']}
                placeholder="Select experience"
                error={!!errors.experience}
                errorMessage={errors.experience}
              />
              <FormField
                name="resume"
                type="file"
                value={formData.resume}
                onChange={handleFileChange}
                uploadFileIcon={upload_icon}
                error={!!errors.resume}
                errorMessage={errors.resume}
              />
              <Box className="submit_button_container">
                <Button type="submit" variant="contained" className="submit_button">
                  Submit
                </Button>
              </Box>
            </Box>
            <Box className="image_container">
              <Link to='jobs-offered'>
                <Box component="img" src={hiring_banner} alt="hiring" className="hiring_banner" />
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
    </ThemeProvider>
  );
}

export default Job;
