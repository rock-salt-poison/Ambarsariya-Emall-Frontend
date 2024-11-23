import React from 'react';
import { Box, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';

const DiscountField = ({ name, label, handleOnChange, percentagePlaceholder, field2 = true, minOrderPlaceholder, additionalText, additionalText2 }) => {

    const handleNumericInput = (event) => {
        const { value } = event.target;
        const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
        event.target.value = numericValue; // Set the input value to the numeric one
        handleOnChange(event); // Trigger the onChange handler with the cleaned value
    };

    return (
        <Box className="form-control">
            <Box className="form-row">
                <FormControlLabel
                    control={
                        <Checkbox
                            name={name}
                            onChange={handleOnChange}
                            className="checkbox"
                        />
                    }
                    label={
                        <Box className="label-content">
                            <Typography variant="span" className="label2">{label}</Typography>
                            <Box className="content2">
                                <TextField
                                    hiddenLabel
                                    variant="outlined"
                                    name="percentage"
                                    type="text"
                                    onChange={handleNumericInput} // Custom onChange to handle only numeric input
                                    required
                                    className="input_field"
                                    placeholder={percentagePlaceholder}
                                    autoCorrect="off"
                                    autoCapitalize="none"
                                    spellCheck="false"
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                />
                                <Typography variant="span" className="label2">
                                    {additionalText}
                                </Typography>
                                {field2 && <>
                                    <TextField
                                        hiddenLabel
                                        variant="outlined"
                                        name="min_order"
                                        type="text"
                                        onChange={handleNumericInput} // Custom onChange for second input
                                        required
                                        className="input_field"
                                        placeholder={minOrderPlaceholder}
                                        autoCorrect="off"
                                        autoCapitalize="none"
                                        spellCheck="false"
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    />
                                    <Typography variant="span" className="label2">
                                        {additionalText2}
                                    </Typography>
                                </>}
                            </Box>
                        </Box>
                    }
                />
            </Box>
        </Box>
    );
};

export default DiscountField;
