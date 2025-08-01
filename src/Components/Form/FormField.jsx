import React from 'react';
import { Box, Typography, TextField, Select, MenuItem, Checkbox, FormControlLabel, Button, Slider, ListItemText, Switch, InputAdornment, RadioGroup, Radio, OutlinedInput, Autocomplete } from '@mui/material';
import MuiPhoneNumber from 'mui-phone-number';
import Address_Google_Map_Field from './Address_Google_Map_Field';
import { Link } from 'react-router-dom';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';


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
  minLength,
  readOnly,
  switch_checked,
  handleSwitch,
  className,
  handleFocus,
  handleBlur,
  adornmentValue, accept, rows, radioItems,
  additionalProps,
  handleDownload, required,
  btn_text,
  defaultChecked,
  disable = false,
  adornmentPosition = "start",
  handleAddClick,
  handleRemoveClick, 
  btn
}) => {

  const marks = getSliderMarks ? getSliderMarks(name) : [];
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const icon2 = <CheckBoxOutlineBlankIcon fontSize="small" />;


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

  const handleSearchSelectChange = (event, newValue) => {
    // Since the `Autocomplete` `onChange` gives the newValue directly
    onChange({
      target: {
        name,
        value: newValue // newValue is directly the selected value
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
                onChange={!readOnly ? onChange : undefined}
                className="checkbox"
              />
            }
            label={label}
            className={className}
            required={required}
          />
        ) : type === 'switch' ? (
          <>
            <Typography className="label">{label}</Typography>
            <FormControlLabel
              control={
                <Switch
                  name={name}
                  checked={value}
                  onChange={!readOnly ? onChange : undefined}
                />
              }
              label={value ? 'On' : 'Off'}
            />
          </>
        ) : type === 'address' ?
          <>
            <Typography className="label">{label}</Typography>
            <Box className="field_container">
              <Address_Google_Map_Field
                value={value ? value : ""} // Ensure value is set if it exists
                onChange={(data) => {
                  onChange({ target: { name, value: data } }); console.log(data);
                }}
                placeholder={placeholder}
                disable={disable}
              />
            </Box>
          </>
          : type === 'file' ? (
            <>
              {icon ? <Box component="img" src={icon} alt={label} className="icon" /> : <Typography className="label">{label}</Typography>}
              <Box className="field_container">
                <input
                  accept={accept}
                  style={{ display: 'none' }}
                  id={name}
                  type="file"
                  name={name}
                  onChange={!readOnly ? onChange : undefined}
                  disabled={disable}
                />
                <label htmlFor={name} className='file_label'>
                  <Button variant="contained" color="primary" component="span" className={`file_button ${className}`} disabled={readOnly || disable}>
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
                  disabled={readOnly}
                  className={`input_field ${className}`} // Apply the custom className
                />
              </Box>
            </>
          ) : type === "Download file" ? (
            <>
              <Typography className="label">{label}</Typography>
              <Button disabled={disable} onClick={(e) => handleDownload(e, name)} className='btn-download field_container'>
                {btn_text}
              </Button>
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
                    onChange={!readOnly ? handleSelectChange2 : undefined}
                    displayEmpty
                    className={`input_field ${className}`}
                    {...(error && { error: true })}
                    required={required}
                    disabled={disable}
                  >
                    <MenuItem value="" disabled key={0}>
                      {placeholder}
                    </MenuItem>

                    {options.map((option, index) => {
                      const isObject = typeof option === 'object' && option !== null;
                      const optionValue = isObject ? option.value : option;
                      const optionLabel = isObject ? option.label : option;

                      return (
                        <MenuItem key={index + 1} value={optionValue}>
                          {optionLabel}
                        </MenuItem>
                      );
                    })}
                  </Select>
                ) : type === 'select-check' ? (
                  <Select
                    multiple
                    name={name}
                    value={defaultChecked
                      ? options.map(opt => (typeof opt === 'object' ? opt.value : opt))  // all values if defaultChecked
                      : Array.isArray(value)
                        ? value
                        : []}
                    onChange={!readOnly ? handleSelectChange : undefined}
                    // input={<OutlinedInput label="Name" />}
                    renderValue={(selected) => (
                      <Box>
                        {selected.length > 0
                          ? selected
                            .map(sel =>
                              typeof sel === 'string'
                                ? (options.find(opt => (typeof opt === 'object' ? opt.value === sel : opt === sel))?.label || sel)
                                : sel
                            )
                            .join(', ')
                          : placeholder}
                      </Box>
                    )}
                    displayEmpty
                    className={`input_field ${className}`}
                    disabled={disable}
                  >
                    <MenuItem value="" disabled>
                      {placeholder}
                    </MenuItem>
                    {options.map((option, index) => {
                      const isObject = typeof option === 'object' && option !== null;

                      const optionValue = isObject ? option.value : option;
                      const optionLabel = isObject ? option.label : option;

                      return <MenuItem key={index + 1} value={optionValue} className='members_list'>
                        <Checkbox checked={defaultChecked ? true : value.includes(optionValue)} />
                        {/* <ListItemText primary={optionLabel} className='members_name' /> */}
                        {optionLabel}
                      </MenuItem>
                    })}
                  </Select>
                ) : type === 'search-select-check' ? (

                  <Autocomplete
                    multiple
                    name={name}
                    className={`search_input_field ${className}`}
                    value={Array.isArray(value) ? value : []}
                    options={options || []}
                    onChange={(event, newValue) => {
                      handleSearchSelectChange(event, newValue);  // Pass both event and newValue
                    }}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option}
                    renderOption={(props, option, { selected }) => {
                      const { key, ...optionProps } = props;
                      return (
                        <li key={key} {...optionProps}>
                          <Checkbox
                            icon={icon2}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={value.includes(option)}
                          />
                          {option}
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField {...params} placeholder={placeholder} className={`input_field ${className}`} />
                    )}
                  />


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
                    onChange={!readOnly ? (value) => onChange({ target: { name, value } }) : undefined}
                    variant="outlined"
                    error={error}
                    disabled={readOnly}
                  />
                  : type === "radio" ? (
                    <RadioGroup
                      aria-labelledby="radio-buttons-group-label"
                      defaultValue="female"
                      name={name}
                      value={value}
                      className='radio_button'
                      onChange={(e) => onChange(e)}
                    >
                      {
                        radioItems.map((item) => {
                          return <FormControlLabel value={item.value} control={<Radio />} label={item.value} className='label' key={item.id} />
                        })
                      }
                    </RadioGroup>
                  )
                    : type ? (
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
                        inputProps={{ readOnly, maxLength, minLength }}
                        InputProps={{
                          ...(adornmentValue && adornmentPosition === 'start' && {
                            startAdornment: (
                              <InputAdornment position="start" className="adornmentText">
                                {adornmentValue}
                              </InputAdornment>
                            ),
                          }),
                          ...(adornmentValue && adornmentPosition === 'end' && {
                            endAdornment: (
                              <InputAdornment position="end" className="adornmentText">
                                {adornmentValue}
                              </InputAdornment>
                            ),
                          }),
                        }}
                        {...(error && { error: true })}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        autoCorrect="off"
                        autoCapitalize="none"
                        autoComplete="false"
                        spellCheck="false"
                        {...additionalProps}
                        disabled={disable}
                      />
                    ):btn && (
                      (btn==="Add" || btn==="add") ? (
                                  <Link className="btn-link" onClick={handleAddClick}>
                                    {btn}
                                  </Link>
                                ): (btn==="Remove" || btn==="remove") && (
                                  <Link className="btn-link remove" onClick={handleRemoveClick}>
                                    {btn}
                                  </Link>)
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