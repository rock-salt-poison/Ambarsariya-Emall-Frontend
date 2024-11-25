import React from 'react';
import { Box, Typography, TextField, Select, MenuItem, Checkbox, FormControlLabel, Button, Slider, ListItemText, Switch, InputAdornment, RadioGroup, Radio } from '@mui/material';
import MuiPhoneNumber from 'mui-phone-number';

const FormField = ({
  icon,
  uploadFileText,
  uploadFileIcon,
  emailLabelClassname,
  label,
  name,
  type,
  value,
  onChange,
  onSliderChange,
  error,
  errorMessage,
  placeholder,
  options,
  getSliderMarks,
  maxLength,
  readOnly,
  switch_checked, 
  handleSwitch,
  className,
  handleFocus,
  handleBlur, 
  adornmentValue, accept,rows,radioItems,
  additionalProps
}) => {

  const marks = getSliderMarks ? getSliderMarks(name) : [];

  const handleSelectChange = (event) => {
    const { value } = event.target;
    // Handle multi-select with checkboxes
    const updatedValue = Array.isArray(value) ? value : [];
    onChange({
      target: {
        name,
        value: updatedValue
      }
    });
  };
  const handleSelectChange2 = (event) => {
    const { value } = event.target;
    onChange({
      target: {
        name,
        value
      }
    });
  };

  return (
    <Box className="form-control">
      <Box className="form-row">
        {type === 'checkbox' ? (
          <FormControlLabel
            control={
              <Checkbox
                name={name}
                checked={value}
                onChange={onChange}
                className="checkbox"
              />
            }
            label={label}
          />
        ) : type === 'switch' ? (
          <>
            <Typography className="label">{label}</Typography>
            <FormControlLabel
              control={
                <Switch
                  name={name}
                  checked={value}
                  onChange={onChange}
                />
              }
              label={value ? 'On' : 'Off'}
            />
          </>
        ) : type === 'file' ? (
          <>
            {icon ? <Box component="img" src={icon} alt={label} className="icon" /> : <Typography className="label">{label}</Typography>}
            <Box className="field_container">
              <input
                accept={accept}
                style={{ display: 'none' }}
                id={name}
                type="file"
                name={name}
                onChange={onChange}
              />
              <label htmlFor={name} className='file_label'>
                <Button variant="contained" color="primary" component="span" className={`file_button ${className}`}>
                  {icon ? uploadFileText : uploadFileIcon ?
                    <Box component="img" src={uploadFileIcon} alt="upload_file" className='upload_file' />
                    : placeholder ? placeholder : "Choose File"}
                </Button>
              </label>
              {value && value.name && (
                <Typography variant="body2" className="file_name">
                  {value.name}
                </Typography>
              )}
            </Box>
          </>
        ) : type === 'range' ? (
          <>
            <Typography className="label">{label}</Typography>
            <Box className="field_container">
              <Slider
                name={name}
                value={Number(value)}
                onChange={(e, newValue) => onSliderChange(e, newValue, name)}
                min={0}
                max={marks.length - 1}
                step={0.1}
                marks={marks}
                size={"large"}
                className={`input_field ${className}`} // Apply the custom className
              />
            </Box>
          </>
        ) : (
          <>
            <Typography className={`label ${emailLabelClassname ? emailLabelClassname : ''}`}>
              {icon ? <Box component="img" src={icon} alt={label} className="icon" /> : label}
            </Typography>
            <Box className="field_container">
              {type === 'select' ? (
                <Select
                  name={name}
                  value={value || ''}
                  onChange={handleSelectChange2}
                  displayEmpty
                  className={`input_field ${className}`}
                  {...(error && { error: true })}
                >
                  <MenuItem value="" disabled key={0}>
                    {placeholder}
                  </MenuItem>
                  {options.map((option, index) => (
                    <MenuItem key={index+1} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              ) : type === 'select-check' ? (
                <Select
                  multiple
                  name={name}
                  value={Array.isArray(value) ? value : []}
                  onChange={handleSelectChange}
                  renderValue={(selected) => (
                    <Box>
                      {selected.length > 0 ? selected.join(', ') : placeholder}
                    </Box>
                  )}
                  displayEmpty
                  className={`input_field ${className}`}
                >
                  <MenuItem value="" disabled>
                    {placeholder}
                  </MenuItem>
                  {options.map((option) => (
                    <MenuItem key={option} value={option} className='members_list'>
                          <Checkbox checked={value.includes(option)} />
                          <ListItemText primary={option} className='members_name' />
                        
                    </MenuItem>
                  ))}
                </Select>
              ) : type === "textarea" ? (
                <TextField 
                  multiline 
                  variant="outlined" 
                  rows={rows ? rows : 3} 
                  placeholder={placeholder} 
                  value={value} 
                  onChange={onChange} 
                  required 
                  className='input_field'
                  inputProps={{ readOnly, maxLength }}
                  name={name} />
              ) : type === "phone_number" ? 
                    <MuiPhoneNumber defaultCountry={'in'} name={name}
                    value={value}
                    onChange={(value) => onChange({ target: { name, value } })}
                    variant="outlined"
                    error={error}
                    />
              : type==="radio" ? (
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  className='radio_button'
                >
                  {
                    radioItems.map((item)=>{
                      return <FormControlLabel value={item.value} control={<Radio />} label={item.value} className='label' key={item.id}/>
                    })
                  }
                </RadioGroup>
              )
              :(
                <TextField
                  hiddenLabel
                  variant="outlined"
                  name={name}
                  type={type}
                  value={value}
                  onChange={onChange}
                  required
                  className={`input_field ${className}`}
                  placeholder={placeholder}
                  inputProps={{ readOnly, maxLength }}
                  InputProps={adornmentValue ? { startAdornment: <InputAdornment position="start" className='adornmentText'>{adornmentValue}</InputAdornment> } : {}}
                  {...(error && { error: true })}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  autoCorrect="off"
                  autoCapitalize="none"
                  autoComplete="false"
                  spellCheck="false"
                  {...additionalProps}
                />
              )}
            </Box>
          </>
        )}
      </Box>
      {error && <span className="error_message">{errorMessage}</span>}
    </Box>
  );
};

export default FormField;