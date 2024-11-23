import React, { useState } from 'react';
import { Box, Button, ThemeProvider, Tooltip, Typography } from '@mui/material';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import ribbon from '../../Utils/images/Serve/emotional/eshop/hr_management/ribbon.svg';
import Header from '../../Components/Serve/SupplyChain/Header';
import GeneralLedgerForm from '../../Components/Form/GeneralLedgerForm';

function MarketingCampaigns(props) {
  const initialData = {
    date:'',
    marketing_campaign:'', 
};

const [formData, setFormData] = useState(initialData);
const [errors, setErrors] = useState({});
const [campaignResult, setCampaignResult] = useState();

const handleClick = () => {
  console.log("hi")
}

const formFields = [
    {
        id: 1,
        label: 'Select Date',
        name: 'date',
        type: 'daterange',
    },
    {
        id: 2,
        label: 'Select Marketing Campaign',
        name: 'marketing_campaign',
        type: 'select',
        options:['Campaign 1', 'Campaign 2','Campaign 3','Campaign 4'],
    },
];



const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    // Clear any previous error for this field
    setErrors({ ...errors, [name]: null });
};

const validateForm = () => {
    const newErrors = {};

    formFields.forEach(field => {
        const name = field.name;
        // Validate main fields
        if (!formData[name]) {
            newErrors[name] = `${field.label} is required.`;
        }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
};

const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    if (validateForm()) {
        setCampaignResult(campaign_data);
    } else {
        console.log(errors);
    }
};

const themeProps = {
  popoverBackgroundColor: 'var(--yellow)',
  scrollbarThumb: 'var(--brown)',
};

const theme = createCustomTheme(themeProps);

const campaign_data = {
  campaign_name: formData.marketing_campaign,
  total_response: '120',
  lead_creation: '4',
  lead_qualified: '4',
  lead_confirmation: '',
  merchant_creation: '2', 
  subscription_choose: '',
  upto_date: '2024-10-15',
  member_creation: '10', 
  repeat_the_campaign: 'Yes',
  date: '2024-10-18',
  set_frequency: 'Monthly',
};


  return (
    <ThemeProvider theme={theme}>
      <Box className="crm_sub_wrapper">
        <Box className="row">
        <Header back_btn_link='../emotional/crm/sales-pipeline' next_btn_link="../emotional/crm/customer-records" heading_with_bg={true} title="Marketing Campaigns" redirectTo='../emotional/crm' />


          <Box className="col">
            <Box className="container">
                <Box className="col-3">
                  <Box component="img" src={ribbon} alt="ribbon" className="ribbon" />
                  <GeneralLedgerForm
                      formfields={formFields}
                      handleSubmit={handleSubmit}
                      formData={formData}
                      onChange={handleChange}
                      errors={errors}
                      submitButtonText="Show Results"
                  />
                  
                </Box>

              <Box className="sub_container">
                { 
                campaignResult ? (
                  <Box className="campaign_result">
                      <Typography className="campaign_name">{campaignResult.campaign_name}</Typography>

                      <Box className="campaign_data">
                        {Object.entries(campaignResult).map(([key, value], index) => (
                          key !== 'campaign_name' && ( // Skip campaign_name since it's already shown
                            <Box className="c_row" key={index}>
                              <Box className="title">
                                {/* Format the key to make it readable */}
                                {key.replace(/_/g, ' ').toUpperCase()}
                              </Box>
                              <Box className="value">
                                {/* Display value or 'N/A' if value is empty */}
                                {value || 'N/A'}
                              </Box>
                            </Box>
                          )
                        ))}
                      </Box>
                  </Box>
                ) 
                :(
                  <Box className="show_message">
                    <Typography className='blank'>
                        Marketing campaigns data
                    </Typography>  
                  </Box>
                )
                }
                
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default MarketingCampaigns;
