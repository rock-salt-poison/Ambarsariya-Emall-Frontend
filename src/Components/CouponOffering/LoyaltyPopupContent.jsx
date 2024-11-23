import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import DiscountField from '../Form/DiscountField';
import PercentIcon from '@mui/icons-material/Percent';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

function LoyaltyPopupContent() {

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
                    label="Unlock"
                    handleOnChange={handleOnChange}
                    percentagePlaceholder="10"
                    minOrderPlaceholder="1000"
                    additionalText={
                        <>
                          <PercentIcon className="icon_2" /> discount for last purchase above <CurrencyRupeeIcon className="icon_2" />
                        </>
                      }
                      
                />
                <DiscountField
                    name="discount_2"
                    label="Loyalty bonus flat"
                    handleOnChange={handleOnChange}
                    percentagePlaceholder="10"
                    field2={false}
                    additionalText={
                        <>
                          <PercentIcon className="icon_2" /> Off
                        </>
                      }
                      />
                <DiscountField
                    name="discount_3"
                    label={<>
                         Pre-Paid Coupons: Pay <CurrencyRupeeIcon className="icon_2" />
                    </>}
                    handleOnChange={handleOnChange}
                    percentagePlaceholder="10"
                    minOrderPlaceholder="1000"
                    additionalText={<>
                        , get  <CurrencyRupeeIcon className="icon_2" />
                   </>}
                    additionalText2="value"
                />
                <DiscountField
                    name="discount_4"
                    label="Referred by a Loyal Customer? Save"
                    handleOnChange={handleOnChange}
                    field2={false}
                    percentagePlaceholder="10"
                    additionalText={<>
                         <PercentIcon className="icon_2" /> Now !
                   </>}
                />
            </Box>

            <Box className="submit_button_container">
                <Button type="submit" variant="contained" className="submit_button">
                    Submit
                </Button>
            </Box>
        </Box>
    );
}

export default LoyaltyPopupContent;
