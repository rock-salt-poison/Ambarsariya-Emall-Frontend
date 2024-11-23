import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import DiscountField from '../Form/DiscountField';
import PercentIcon from '@mui/icons-material/Percent';
import DateRangePicker from 'rsuite/esm/DateRangePicker';

function SubscriptionPopupContent() {

    const handleOnChange = (event) => {
        // Handle input changes here
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submit logic here
    }


    return (
        <Box component="form" noValidate autoComplete="off" className="offerings_popup_form subscription" onSubmit={handleSubmit}>
            <Box className="checkbox-group">
                <DiscountField
                    name="discount_1"
                    label="Daily"
                    handleOnChange={handleOnChange}
                    percentagePlaceholder="10"
                    additionalText={
                        <>
                          <PercentIcon className="icon_2" /> Off
                        </>
                      }
                      field2={false}
                      
                />
                <DiscountField
                    name="discount_2"
                    label="Weekly"
                    handleOnChange={handleOnChange}
                    percentagePlaceholder="10"
                    minOrderPlaceholder="1000"
                    field2={false}
                    additionalText={
                        <>
                          <PercentIcon className="icon_2" /> Off
                        </>
                      }
                      />
                <DiscountField
                    name="discount_3"
                    label="Monthly"
                    handleOnChange={handleOnChange}
                    percentagePlaceholder="10"
                    minOrderPlaceholder="1000"
                    additionalText={
                        <>
                          <PercentIcon className="icon_2" /> Off
                        </>
                      }
                    field2={false}
                />
                <DiscountField
                    name="discount_4"
                    label={
                        <>
                          {/* Edit <EditCalendarIcon className="icon_2" onClick={handleEdit} /> */}

                           <DateRangePicker/>
                        </>
                      }
                    handleOnChange={handleOnChange}
                    field2={false}
                    percentagePlaceholder="10"
                    minOrderPlaceholder="1000"
                    additionalText={<>
                         <PercentIcon className="icon_2" /> Off
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

export default SubscriptionPopupContent;
