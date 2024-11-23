import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Button2 from '../../Components/Home/Button2';
import job_icon from '../../Utils/images/Serve/emotional/campaign/job_icon.svg';
import community_network_icon from '../../Utils/images/Serve/emotional/campaign/community_network.svg';
import social_media_icon from '../../Utils/images/Sell/like_share/social_media.webp';
import { Link } from 'react-router-dom';
import FormField from '../../Components/Form/FormField'; 
import icon_1 from '../../Utils/images/Serve/emotional/campaign/icon_1.svg';
import icon_2 from '../../Utils/images/Serve/emotional/campaign/icon_2.svg';

const more_options_data = [
    { id: 1, iconSrc: job_icon, redirect_to: '../emotional/campaign/job', alt: 'Job' },
    { id: 2, iconSrc: community_network_icon, redirect_to: '../emotional/analytics', alt: 'community network' },
    { id: 3, iconSrc: social_media_icon, redirect_to: '', alt: 'social media' },
];

function Campaign() {
  const [formData, setFormData] = React.useState({
    uploadField1: null,
    uploadField2: null,
  });
  
  const [errors, setErrors] = React.useState({
    uploadField1: '',
    uploadField2: '',
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); // Clear any existing error
    }
  };

  const validateFields = () => {
    let valid = true;
    let newErrors = {};
    if (!formData.uploadField1) {
      valid = false;
      newErrors.uploadField1 = 'Please upload a video for community blog.';
    }
    if (!formData.uploadField2) {
      valid = false;
      newErrors.uploadField2 = 'Please upload your self-introduction with skills.';
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      console.log(formData);
      
    }
  }

  return (
    <Box className="campaign_wrapper">
      <Box className="row">
        <Box className="col">
          <Button2 text="Back" redirectTo='../emotional/crm' />
          <Button2 text="Next" redirectTo={`../emotional/eshop`} />
        </Box>

        <Box className="col">
          <Box className="container">
            <Box className="row_2">
              <Link to='../emotional'>
                <Typography variant='h2' className='heading'>campaign</Typography>
              </Link>
              <Typography className='popular_text'>Popular</Typography>

              <Box component="form" className="form_container" noValidate autoComplete="off" onSubmit={handleSubmit}>
                <FormField
                  icon={icon_1}
                  name="uploadField1"
                  type="file"
                  uploadFileText="Upload your video for community blog"
                  value={formData.uploadField1}
                  onChange={handleFileChange}
                  error={!!errors.uploadField1}
                  errorMessage={errors.uploadField1}
                />
                <FormField
                  icon={icon_2}
                  name="uploadField2"
                  type="file"
                  uploadFileText="Upload your self-introduction with skills"
                  value={formData.uploadField2}
                  onChange={handleFileChange}
                  error={!!errors.uploadField2}
                  errorMessage={errors.uploadField2}
                />

                <Box className="submit_button_container">
                  <Button type="submit" variant="contained" className="submit_button">
                    Submit
                  </Button>
                </Box>
              </Box>

              <Box className="more_options_col">
                {more_options_data.map((item) => {
                  return (
                    <Link to={item.redirect_to} key={item.id}>
                      <Box component="img" src={item.iconSrc} alt={item.alt} className='icon' />
                    </Link>
                  );
                })}
              </Box>

            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Campaign;
