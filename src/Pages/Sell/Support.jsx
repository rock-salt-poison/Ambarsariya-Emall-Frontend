import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, ThemeProvider, Tooltip } from '@mui/material';
import Cards from '../../Components/Support/Cards';
import UserForm from '../../Components/Support/UserForm';
import Button2 from '../../Components/Home/Button2';
import VisitorFormBox from '../../Components/Support/VisitorFormBox';
import attachment_icon from '../../Utils/images/Sell/support/attachment_icon.png';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import FormField from '../../Components/Form/FormField';
import { useSelector } from 'react-redux';
import { get_visitorData } from '../../API/fetchExpressAPI';
import CustomSnackbar from '../../Components/CustomSnackbar';

function Support(props) {
  const [file, setFile] = useState(null); // State to hold the uploaded file
  const [isFormValid, setIsFormValid] = useState(false); // State to track form validation
  // const [userName, setUserName] = useState('');
  const [visitorData, setVisitorData] = useState('');

  const [loading, setLoading] = useState(false);
  
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const token = useSelector((state) => state.auth.visitorAccessToken);

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

  useEffect(() => {
    if(token){
      const fetchData = async () => {
        try {
          setLoading(true);
          const resp = (await get_visitorData(token));
          if (resp.valid) {
            setVisitorData(resp.data[0]);
            setLoading(false);
          } else {
            console.error(resp);
            setVisitorData({});
            setLoading(false);
            setSnackbar({ open: true, message: resp.message, severity: 'error' });
          }
        } catch (error) {
          setLoading(false);
          setSnackbar({ open: true, message: error.response.data.message, severity: 'error' });
          setVisitorData({});
        }
      };
      fetchData();
    }
  }, [token]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(file);
  };

  // Handle form validation callback
  const handleFormValidation = (isValid, data) => {
    setIsFormValid(isValid);
    setVisitorData(data);
  };


  return (
    <ThemeProvider theme={theme}>
      {loading && <Box className="loading">
                <CircularProgress />
              </Box>}
      <Box className="support_wrapper">
        <Box className="row">
          <Box className="col">
            <Cards />
          </Box>
          <Box className="col second_wrapper">
            <Box className="col-1">
              <UserForm onValidation={handleFormValidation} visitorData={visitorData} />
              <Button2 text="Back" redirectTo="/AmbarsariyaMall/sell" />
            </Box>
            {visitorData && Object.keys(visitorData).length > 0 && (
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
                  <VisitorFormBox visitorData={visitorData}/>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
      <CustomSnackbar
        open={snackbar.open}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </ThemeProvider>
  );
}

export default Support;
