import React from 'react';
import { Box, Dialog, DialogContent, Typography, TextField, MenuItem, ThemeProvider } from '@mui/material';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import { useParams } from 'react-router-dom';

export default function BudgetPopup({ open, handleClose, obj, popoverBackgroundColor }) {
    const themeProps = {
        popoverBackgroundColor: popoverBackgroundColor || 'var(--brown-2)',
        textColor: 'var(--text-color-light)'
    };

    const theme = createCustomTheme(themeProps);
    const { action } = useParams();

    const getDefaultOption = (action, options) => {
        const mappedAction = {
            daily: 'per day',
            weekly: 'per week',
            monthly: 'per month',
            edit: '',
        }[action];
        return options.includes(mappedAction) ? mappedAction : options[0];
    };

    return (
        <ThemeProvider theme={theme}>
            <Dialog
                open={open}
                onClose={handleClose}
                className="budget_popup_dialog_paper"
            >
                <DialogContent className='budget_popup_dialog_box_content'>
                    <Box className="content">
                        <Box className="content_header">
                            <Typography className='title'>{obj?.title}</Typography>
                        </Box>
                        <Box className="content_body">
                            {obj?.fields.map((field, index) => (
                                <Box key={index} className="form_field">
                                    <Typography className='label'>{field.label}</Typography>
                                    <Box className="field_container">
                                        {field.selectOptions && 
                                            <TextField
                                                select
                                                fullWidth
                                                className='input_field'
                                                defaultValue={getDefaultOption(action, field.selectOptions)}
                                            >
                                                {field.selectOptions.map((option, i) => (
                                                    <MenuItem key={i} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        }
                                        {field.costfield && (
                                            <TextField
                                                type="number"
                                                fullWidth
                                                placeholder='Enter Cost'
                                                className='input_field'
                                            />
                                        )}
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </ThemeProvider>
    );
}
