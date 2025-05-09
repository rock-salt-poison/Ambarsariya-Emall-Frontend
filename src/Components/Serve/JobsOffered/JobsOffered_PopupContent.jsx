import React, { useState } from "react";
import GeneralLedgerForm from "../../../Components/Form/GeneralLedgerForm";
import { Box, ThemeProvider } from "@mui/material";
import createCustomTheme from '../../../styles/CustomSelectDropdownTheme'

function JobsOffered_PopupContent(props) {

    const initialData = {
            work_or_task: "",
            experience: "",
            cost: "",
            professional_profile: "",
        };
    
        const [formData, setFormData] = useState(initialData);
        const [errors, setErrors] = useState({});

        const themeProps = {
            popoverBackgroundColor: props.popoverBackgroundColor || 'var(--yellow)',
            scrollbarThumb: 'var(--brown)',
            };
        
            const theme = createCustomTheme(themeProps);

    
        const formFields = [
            {
                id: 1,
                label: "Work & task skills required",
                name: "work_or_task",
                type: "text"
            },
            {
                id: 2,
                label: "Enter your experience",
                name: "experience",
                type: "number"
            },
            {
                id: 3,
                label: "Enter your cost",
                placeholder:'Enter your cost',
                name: "cost",
                type: "text",
                behavior: "numeric",
            },
            {
                id: 4,
                label: "Share your professional profile",
                name: "professional_profile",
                type: "text"
            },
            {
                id: 5,
                label: "View Task",
                name: "work_or_task",
                type: "text"
            },
            {
                id: 6,
                label: "View Time Required",
                name: "time",
                type: "time",
            },
            {
                id: 7,
                label: "View Cost",
                name: "cost",
                type: "number",
            }
        ];
    
        const handleChange = (event) => {
            const { name, value } = event.target;
            setFormData({ ...formData, [name]: value });
    
            // Clear any previous error for this field
            setErrors({ ...errors, [name]: null });
        };
    
        const validateForm = () => {
            const newErrors = {};
            formFields.forEach((field) => {
                const name = field.name;
                if (!formData[name]) {
                    newErrors[name] = `${field.label} is required.`;
                }
            });
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0; // Return true if no errors
        };
    
        const handleSubmit = (event) => {
            event.preventDefault(); // Prevent default form submission
            if (validateForm()) {
                console.log(formData);
                // Proceed with further submission logic, e.g., API call
            }
        };
    
        return (
            <ThemeProvider theme={theme}>
            
            <Box className="tab_panel"sx={{padding:'0px !important'}}>
                <GeneralLedgerForm
                    cName="cash"
                    formfields={formFields}
                    handleSubmit={handleSubmit}
                    formData={formData}
                    onChange={handleChange}
                    errors={errors}
                />
            </Box>
            </ThemeProvider>
        );
    }
    

export default JobsOffered_PopupContent;
