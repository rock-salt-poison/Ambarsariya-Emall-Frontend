import React, { useState } from 'react';
import { Box, TextField, Tooltip, Typography, SpeedDial, Dialog, DialogTitle, DialogContent, Button } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import form_field_bg from '../../Utils/images/Sell/esale/personal/form_field_bg.png';
import form_field_bg_dark from '../../Utils/images/Sell/esale/personal/form_field_bg_dark.webp';
import { Link } from 'react-router-dom';
import { Close } from '@mui/icons-material';

function EsalePersonalForm({
    id, label, type, name, value, onChange, placeholder, readOnly, maxLength, dialogErrors,error, tooltip, onFileUpload, fileName, showSpeedDial, showTooltip, showDialog, dialogFields, onDialogSubmit, handleDialogChange, addmoreButton, handleAddMoreButton, onFieldReset
}) {
    const [isSpeedDialVisible, setIsSpeedDialVisible] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [filename, setFileName] = useState(fileName || ''); // Manage file name with state


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

    const handleFileRemove = () => {
        setFileName('');
      
        // Clear uploaded file data in parent
        onFileUpload(`${name}_file`, '');
      
        // Also clear the related field value in parent
        if (onFieldReset) {
          onFieldReset(`${name}_file`, '');
        }
        console.log(`${name}_file`);
        
      
        // Clear the actual input
        const input = document.getElementById(`file-upload-${name}`);
        if (input) input.value = '';
      };
      
    
    const formGroupTextField = (form_field_bg, field) => (
        <>
            {showTooltip ? (
                <Tooltip title={tooltip || ''} placement='bottom-end'>
                    <Typography className="label">{field.label || label}</Typography>
                </Tooltip>
            ) : (
                <Typography className="label">{field.label || label}</Typography>
            )}

            {showDialog ? (
                <Box className="input_field_bg" onClick={handleClick}>
                <Box component="img" src={form_field_bg} alt="form_field_bg" className="form_field_bg" />
                <Button className="label_btn">{label}</Button>
            </Box>
            )
            :(

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
                    onChange={(e) => {
                        onFileUpload(name, e.target.files[0]);
                        setFileName(e.target.files[0].name); // Update fileName state
                    }}/>
            </Box>
            )}

        </>
    );

    return (
        <Box className="form-group" key={id}>
            {formGroupTextField(form_field_bg, { name, label, type, placeholder }, onChange)}

            {filename && <Box className="btn-wrapper">
                <Typography className="file_name">Uploaded file: {filename}</Typography>
                <Button onClick={handleFileRemove} size="small">
                    <Close/>
                </Button>
            </Box>}

            {showDialog && (
                <Dialog open={isDialogOpen} onClose={handleDialogClose} className="professional_field_dialog">
                    <DialogTitle className="heading">{label}</DialogTitle>
                    <DialogContent className="content">
                        <Box component="form" noValidate autoComplete="off" className="esale_personal_form" onSubmit={onDialogSubmit}>
                            {dialogFields && dialogFields.map((field, index) => (
                                <Box key={index} className="form-group">
                                    <Typography className="label">{field.label || label}</Typography>
                                    <Box className="input_field_bg" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
                                     <Box component="img" src={form_field_bg_dark} alt="form_field_bg" className="form_field_bg" />
                                    <TextField
                                        hiddenLabel
                                        variant="outlined"
                                        name={field.name}
                                        type={field.type}
                                        value={field.value }
                                        onChange={handleDialogChange} 
                                        placeholder={field.label}
                                        inputProps={{ readOnly, maxLength }}
                                        {...(error && { error: true })} // Show error message
                                        multiline={field.type === "textarea" } 
                                        rows={field.type === "textarea" ? 4 : undefined}
                                        className="input_field"
                                        autoComplete="off"
                                    />
                                    </Box>

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
