import React, { useState } from 'react';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import FormField from './FormField';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { DateRangePicker } from 'rsuite';

function GeneralLedgerForm({ cName, description, handleSubmit, formfields, formData, onChange, errors, handleIncrement, handleDecrement, handleAddMore, submitBtnVisibility = true, submitButtonText, radioItems }) {

    const { afterToday } = DateRangePicker;
    const handleNumeric = (e, behavior) => {
        if (behavior) {
            const { name, value } = e.target;
            const numericValue = value.replace(/[^\d.]/g, ''); // Allow numbers and dot
            onChange({ target: { name, value: numericValue } });
        }
    };

    return (
        <Box className={`container ${cName ? cName : ''}`}>
            {description && <Typography className='description'>{description}</Typography>}
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} >
                {formfields.map((field) => {
                    const name = field.name;
                    const placeholder = field.placeholder ? field.placeholder : field.label;
                    return (
                        <React.Fragment key={field.id}>
                            <Tooltip key={field.id} title={field.label} className="tooltip" placement="bottom-end">
                            
                            {/* Render the main field's input only if it doesn't have inner fields */}
                            {!field.innerField && field.type !== 'quantity' && field.type !== 'daterange' && field.type !== 'button' && field.type!== undefined &&(
                                <React.Fragment>
                                    <FormField
                                        label={field.label}
                                        name={name}
                                        type={field.type}
                                        value={field.value? field.value : formData[name]}
                                        onChange={(e) => {
                                            onChange(e);
                                            handleNumeric(e, field.behavior);
                                        }}
                                        error={!!errors[name]}
                                        errorMessage={errors[name]}
                                        options={field.options}
                                        readOnly={field.readOnly}
                                        handleFocus={field.handleFocus}
                                        placeholder={placeholder}
                                        rows={field.rows}
                                        adornmentValue={field.adornmentValue}
                                        radioItems={field.radioItems}
                                    />
                                    {field.addMoreButton && <Button onClick={handleAddMore} className='add_more_button'>Add more</Button>}
                                </React.Fragment>
                            )}

                            {/* Render inner fields if they exist */}
                            {field.innerField && (
                                <Box className="sub_fields">
                                    <Typography className='label'>{field.label}</Typography>
                                    {field.innerField.map((innerField) => {
                                        const innerName = innerField.name;
                                        const placeholder = innerField.placeholder ? innerField.placeholder : innerField.label;
                                        return (
                                            <React.Fragment key={innerField.id}>

                                                {!innerField.innerFields ?
                                                    <FormField

                                                        label={innerField.label}
                                                        name={innerName}
                                                        type={innerField.type}
                                                        value={formData[innerName]}
                                                        onChange={(e) => {
                                                            onChange(e);
                                                            handleNumeric(e, innerField.behavior);
                                                        }}
                                                        error={!!errors[innerName]}
                                                        errorMessage={errors[innerName]}
                                                        options={innerField.options}
                                                        readOnly={innerField.readOnly}
                                                        placeholder={placeholder}
                                                    /> :
                                                    <Box className="super_sub_fields" key={field.id}>
                                                        <Typography className='innerField label'>{innerField.label}</Typography>
                                                        {innerField.innerFields.map((field) => {
                                                            const placeholder = field.placeholder ? field.placeholder : field.label;
                                                            return <FormField
                                                                key={field.id}
                                                                label={field.label}
                                                                name={field.name}
                                                                type={field.type}
                                                                value={formData[field.name]}
                                                                onChange={(e) => {
                                                                    onChange(e);
                                                                    handleNumeric(e, field.behavior);
                                                                }}
                                                                error={!!errors[field.name]}
                                                                errorMessage={errors[field.name]}
                                                                options={field.options}
                                                                readOnly={field.readOnly}
                                                                placeholder={placeholder}
                                                            />
                                                        })}
                                                    </Box>

                                                }

                                            </React.Fragment>
                                        );
                                    })}
                                </Box>
                            )}

                            {/* Special handling for quantity field */}
                            {field.type === "quantity" && (
                                <Box className="sub_fields">
                                    <Typography className='label'>{field.label}</Typography>
                                    <Box className="counter_container">
                                        <Button className='decrement' onClick={handleDecrement}>
                                            <RemoveIcon />
                                        </Button>
                                        <Typography className="stock_count">
                                            {formData[name]}
                                        </Typography>
                                        <Button className='increment' onClick={handleIncrement}>
                                            <AddIcon />
                                        </Button>
                                    </Box>
                                </Box>
                            )}

                            {field.type === "daterange" && (
                                <Box className="sub_fields">
                                    <Typography className='label'>{field.label}</Typography>
                                    <DateRangePicker shouldDisableDate={afterToday()} format="MM/dd/yyyy hh:mm aa" showMeridian onChange={(value) => onChange({ target: { name: field.name, value } })} />
                                </Box>
                            )}

                            {field.type === "button" && (
                                <Box className="sub_fields">
                                    <Typography className='label'>{field.label}</Typography>
                                    <input type="button" onClick={field.handleButtonClick} value={field.value} className='fieldButton'/>
                                </Box>
                            )}

                            {field.type===undefined && (
                                <Typography className="w-100 label">{field.label}</Typography>
                            )}
                            </Tooltip>
                        </React.Fragment>
                    );
                })}

                {submitBtnVisibility &&
                    <Box className="submit_button_container">
                        <Button type="submit" variant="contained" className="submit_button" >
                            {submitButtonText ? submitButtonText : 'Submit'}
                        </Button>
                    </Box>}
            </Box>
        </Box>
    );
}

export default GeneralLedgerForm;
