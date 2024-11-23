import React, { useState } from 'react';
import { Box, ThemeProvider, Tooltip } from '@mui/material';
import Cards from '../../Components/Support/Cards';
import UserForm from '../../Components/Support/UserForm';
import Button2 from '../../Components/Home/Button2';
import VisitorFormBox from '../../Components/Support/VisitorFormBox';
import attachment_icon from '../../Utils/images/Sell/support/attachment_icon.png';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import FormField from '../../Components/Form/FormField';

function Support(props) {
  const [file, setFile] = useState(null); // State to hold the uploaded file
  const [isFormValid, setIsFormValid] = useState(false); // State to track form validation
  const [userName, setUserName] = useState('');

  const themeProps = {
    popoverBackgroundColor: props.popoverBackgroundColor || 'var(--yellow)',
    scrollbarThumb : 'var(--brown)'
  };
  
  const theme = createCustomTheme(themeProps);

  // Handle file change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && (selectedFile.type === 'application/pdf' || selectedFile.type === 'image/gif')) {
      setFile(selectedFile); // Update state with selected file
    } else {
      alert('Please upload a PDF or GIF file.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(file);
  };

  // Handle form validation callback
  const handleFormValidation = (isValid, name) => {
    setIsFormValid(isValid);
    setUserName(name);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="support_wrapper">
        <Box className="row">
          <Box className="col">
            <Cards />
          </Box>
          <Box className="col second_wrapper">
            <Box className="col-1">
              <UserForm onValidation={handleFormValidation} />
              <Button2 text="Back" redirectTo="/AmbarsariyaMall/sell" />
            </Box>
            {isFormValid && (
              <>
                <Box className="col-2">
                  <Box component="form" className="form_container" noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Tooltip title="Select pdf or gif file" className="tooltip" placement="bottom-end">
                      <Box>
                        <FormField
                          type="file"
                          name="fileUpload"
                          value={file}
                          onChange={handleFileChange} // Handle file selection
                          placeholder="Choose File"
                          uploadFileIcon={attachment_icon}
                          className="attachment_icon"
                        />
                      </Box>
                    </Tooltip>
                  </Box>
                </Box>
                <Box className="col-3">
                  <VisitorFormBox userName={userName}/>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Support;
