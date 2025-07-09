import React, { useEffect, useState } from 'react';
import GeneralLedgerForm from '../../../../Components/Form/GeneralLedgerForm';
import { ThemeProvider } from '@mui/material';
import createCustomTheme from '../../../../styles/CustomSelectDropdownTheme';
import { useParams } from 'react-router-dom';

function B2BFormComponent({ setSelectedMouType }) {
    const themeProps = {
        popoverBackgroundColor: '#f9deb1d9',
        scrollbarThumb: 'var(--brown)',
    };
    const theme = createCustomTheme(themeProps);
    const { type } = useParams();
    

    const mouOptions = ['New', 'Waiting', 'On-Going', 'Completed', 'Renew For Final'];

    const initialData = {
        mou_type: mouOptions[0], // ✅ Default to first
        date_range: '',
        purchaser: '',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    // ✅ Pass initial mou_type up on mount
    useEffect(() => {
        if (setSelectedMouType) {
            setSelectedMouType(initialData.mou_type);
        }
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        const updatedData = { ...formData, [name]: value };
        setFormData(updatedData);

        if (name === 'mou_type' && setSelectedMouType) {
            setSelectedMouType(value);
        }

        setErrors({ ...errors, [name]: null });
    };

    const validateForm = () => {
        const newErrors = {};
        ['mou_type', 'date_range', 'purchaser'].forEach((field) => {
            if (!formData[field]) {
                newErrors[field] = `${field} is required.`;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            console.log(formData);
        } else {
            console.log(errors);
        }
    };

    const formFields = [
        {
            id: 1,
            label: 'Mou Type',
            placeholder: 'Select Mou Type',
            name: 'mou_type',
            type: 'select',
            options: mouOptions,
        },
        {
            id: 2,
            label: 'Date',
            placeholder: 'Select Date',
            name: 'date_range',
            type: 'daterange',
        },
        {
            id: 3,
            label: type==='b2b' ? 'Merchant ID' : type === 'b2c' && 'Member ID',
            placeholder: type === 'b2b' ? 'Select Merchant ID' : type === 'b2c' && 'Select Member ID',
            name: 'purchaser',
            type: 'select',
            options: type==='b2b' ? ['Merchant 1', 'Merchant 2', 'Merchant 3', 'Merchant 4', 'Merchant 5'] : type === 'b2c' && ['Member 1', 'Member 2', 'Member 3', 'Member 4', 'Member 5'],
        },
    ];

    return (
        <ThemeProvider theme={theme}>
            <GeneralLedgerForm
                formfields={formFields}
                handleSubmit={handleSubmit}
                formData={formData}
                onChange={handleChange}
                errors={errors}
            />
        </ThemeProvider>
    );
}

export default B2BFormComponent;
