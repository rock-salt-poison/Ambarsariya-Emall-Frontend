import React from 'react';
import { Box, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';

const DiscountField = ({
  name1,name2,
  label,
  handleOnChange,
  handleCheckboxChange,
  percentagePlaceholder,
  field2 = true,
  minOrderPlaceholder,
  additionalText,
  additionalText2,
  value = {},
  checked = false, // New prop for managing checkbox state
}) => {
  return (
    <Box className="form-control">
      <Box className="form-row">
        <FormControlLabel
          control={
            <Checkbox
              name={name1}
              checked={checked} // Controlled checkbox state
              onChange={handleCheckboxChange} // Separate handler for checkbox
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
                  name={name1}
                  type="text"
                  onChange={handleOnChange}
                  required
                  className="input_field"
                  placeholder={percentagePlaceholder}
                  value={value[name1] || ''}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                />
                <Typography variant="span" className="label2">
                  {additionalText}
                </Typography>
                {field2 && (
                  <>
                    <TextField
                      hiddenLabel
                      variant="outlined"
                      name={name2}
                      type="text"
                      onChange={handleOnChange}
                      required
                      className="input_field"
                      placeholder={minOrderPlaceholder}
                      value={value[name2] || ''}
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    />
                    <Typography variant="span" className="label2">
                      {additionalText2}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          }
        />
      </Box>
    </Box>
  );
};

export default DiscountField;
