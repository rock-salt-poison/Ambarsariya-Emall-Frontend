import React, { useState } from 'react';
import { Box, TextField, Tooltip, Typography, SpeedDial, Dialog, DialogTitle, DialogContent, Button } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import form_field_bg from '../../Utils/images/Sell/esale/personal/form_field_bg.png';
import form_field_bg_dark from '../../Utils/images/Sell/esale/personal/form_field_bg_dark.webp';
import { Link } from 'react-router-dom';

function EsalePersonalForm({
    id, label, type, name, value, onChange, placeholder, readOnly, maxLength, dialogErrors,error, tooltip, onFileUpload, 
    fileName, showSpeedDial, showTooltip, showDialog, dialogFields, onDialogSubmit, handleDialogChange, addmoreButton, handleAddMoreButton
}) {
    const [isSpeedDialVisible, setIsSpeedDialVisible] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleMouseEnter = () => setIsSpeedDialVisible(true);
    const handleMouseLeave = () => setIsSpeedDialVisible(false);
    const triggerFileUpload = () => document.getElementById(`file-upload-${name}`).click();
    const handleDialogClose = () => {
            setIsDialogOpen(false)
    };

    const handleDialogSubmit = () => {
        if(Object.keys(dialogErrors).length === 0){
            setIsDialogOpen(false)
        }
    }
    const handleClick = () => setIsDialogOpen(true);
    
    const formGroupTextField = (form_field_bg, field, onChange) => (
        <>
            {showTooltip ? (
                <Tooltip title={tooltip || ''} placement='bottom-end'>
                    <Typography className="label">{field.label || label}</Typography>
                </Tooltip>
            ) : (
                <Typography className="label">{field.label || label}</Typography>
            )}

            <Box className="input_field_bg" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
                <Box component="img" src={form_field_bg} alt="form_field_bg" className="form_field_bg" />
                <TextField
                    hiddenLabel
                    variant="outlined"
                    name={field.name || name}
                    type={field.type || type || 'text'}
                    value={field.value || value}
                    onChange={onChange} 
                    placeholder={field.label || placeholder}
                    inputProps={{ readOnly, maxLength }}
                    {...(error && { error: true })} // Show error message
                    multiline={field.type === "textarea" || type === "textarea"} 
                    rows={field.type === "textarea" || type === "textarea" ? 4 : undefined}
                    className="input_field"
                     autoComplete="off"
                />
                {showSpeedDial && isSpeedDialVisible && (
                    <SpeedDial
                        ariaLabel="SpeedDial for file upload"
                        icon={<AttachFileIcon />}
                        onClick={triggerFileUpload}
                        className="speedDialLink"
                        sx={{ position: 'absolute', right: 0 }}
                    />
                )}
                <input
                    type="file"
                    id={`file-upload-${name}`}
                    className="file-upload"
                    onChange={(e) => onFileUpload(name, e.target.files[0])}
                />
            </Box>
        </>
    );

    return (
        <Box className="form-group" key={id}>
            {formGroupTextField(form_field_bg, { name, label, type, placeholder }, onChange)}

            {fileName && <Typography className="file_name">Uploaded file: {fileName}</Typography>}

            {showDialog && (
                <Dialog open={isDialogOpen} onClose={handleDialogClose} className="professional_field_dialog">
                    <DialogTitle className="heading">{label}</DialogTitle>
                    <DialogContent className="content">
                        <Box component="form" noValidate autoComplete="off" className="esale_personal_form" onSubmit={onDialogSubmit}>
                            {dialogFields && dialogFields.map((field, index) => (
                                <Box key={index} className="form-group">
                                    {formGroupTextField(form_field_bg_dark, field, (e) => handleDialogChange(e, field.name))}

                                    {dialogErrors && <Typography className='error_message'>{dialogErrors[field.name]}</Typography>} {/* Show dialog field error */}
                                </Box>
                            ))}
                        {
                            addmoreButton && <Link className='add_more_link' onClick={handleAddMoreButton}>
                                    <Typography className='add_more'>
                                        Add More
                                    </Typography>
                                </Link>
                        }
                        

                            <Box className="submit_button_container">
                                <Button type="submit" variant="contained" className="submit_button" onClick={handleDialogSubmit}>
                                    Submit
                                </Button>
                            </Box>
                        </Box>
                    </DialogContent>
                </Dialog>
            )}
        </Box>
    );
}

export default EsalePersonalForm;
