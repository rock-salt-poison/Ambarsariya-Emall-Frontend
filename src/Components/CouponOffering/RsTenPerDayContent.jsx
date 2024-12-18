import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import DiscountField from '../Form/DiscountField';
import PercentIcon from '@mui/icons-material/Percent';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

function RsTenPerDayContent() {

    const handleOnChange = (event) => {
        // Handle input changes here
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submit logic here
    }

    return (
        <Box component="form" noValidate autoComplete="off" className="offerings_popup_form" onSubmit={handleSubmit}>
             <Typography className="description" sx={{textAlign:'center'}}>
                A paid version which has minimum 4 months period.
            </Typography>
            <Box className="checkbox-group">
                <DiscountField
                    name="discount_1"
                    label="10 Rs. per day  x"
                    handleOnChange={handleOnChange}
                    percentagePlaceholder="4"
                    field2={false}
                    additionalText="months"                      
                />
            </Box>

            <Typography className="description" sx={{textAlign:'center'}}>
               Total = 10 x 120 = 1200 + tax
            </Typography>

            <Typography className="description">
            *FIRST QUARTER IS DEMO USE SERVE SECTION
            </Typography>

            <Box className="submit_button_container">
                <Button type="submit" variant="contained" className="submit_button">
                    Submit
                </Button>
            </Box>
        </Box>
    );
}

export default RsTenPerDayContent;
