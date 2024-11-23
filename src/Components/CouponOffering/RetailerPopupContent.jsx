import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import DiscountField from '../Form/DiscountField';
import PercentIcon from '@mui/icons-material/Percent';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

function RetailerPopupContent() {

    const handleOnChange = (event) => {
        // Handle input changes here
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submit logic here
    }

    return (
        <Box component="form" noValidate autoComplete="off" className="offerings_popup_form" onSubmit={handleSubmit}>
            <Box className="checkbox-group">
                <DiscountField
                    name="discount_1"
                    label="Percentage"
                    handleOnChange={handleOnChange}
                    percentagePlaceholder="10"
                    minOrderPlaceholder="1000"
                    additionalText={
                        <>
                          <PercentIcon className="icon_2" /> Off on minimum order of <CurrencyRupeeIcon className="icon_2" />
                        </>
                      }
                      
                />
                <DiscountField
                    name="discount_2"
                    label="Flat"
                    handleOnChange={handleOnChange}
                    percentagePlaceholder="10"
                    minOrderPlaceholder="1000"
                    additionalText={
                        <>
                          <PercentIcon className="icon_2" /> Off on minimum order of <CurrencyRupeeIcon className="icon_2" />
                        </>
                      }
                      />
                <DiscountField
                    name="discount_3"
                    label="Buy"
                    handleOnChange={handleOnChange}
                    percentagePlaceholder="10"
                    minOrderPlaceholder="1000"
                    additionalText="Get"
                    additionalText2="Free"
                />
            </Box>

            <Typography className="description">
                Coupons expire after 1 year. The discount will apply on top of the total.
            </Typography>

            <Box className="submit_button_container">
                <Button type="submit" variant="contained" className="submit_button">
                    Submit
                </Button>
            </Box>
        </Box>
    );
}

export default RetailerPopupContent;
