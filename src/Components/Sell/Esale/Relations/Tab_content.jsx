import React, { useState } from 'react';
import GeneralLedgerForm from '../../../Form/GeneralLedgerForm';
import { ThemeProvider } from '@mui/material';
import createCustomTheme from '../../../../styles/CustomSelectDropdownTheme';

function Tab_content() {

    const themeProps = {
        popoverBackgroundColor: '#f8e3cc',
        scrollbarThumb: 'var(--brown)',
      };
    
      const theme = createCustomTheme(themeProps);

    const initialData = {
        place_name:'',
        address:'',
        work_yrs:'',
        ongoing_or_left:'',
        people:'',
        group:'',
        mentor:'',
        member_no:'',
        people_list:'',
        community:'',
        last_topic:'',
        last_event:'',
        total_score:'',
        position_score:'',
        arrange_event:'',
        next_event:'',
        passed_event:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const handleButtonClick = () =>{
        console.log('clicked')
    }

    const handleSkuFocus = (e) => {
        console.log('hi')
        e.target.style.cursor='pointer'
    }

    const formFields = [
        {
            id: 1,
            label: 'Name of the place',
            placeholder:'name',
            name: 'place_name',
            type: 'text',
        },
        {
            id: 2,
            label: 'Address of location and pin drop on map',
            name: 'address',
            type: 'text',
            placeholder:'Address',
        },
        {
            id: 3,
            label: 'Work Years',
            name: 'work_yrs',
            type: 'number',
        },
        {
            id: 4,
            label: 'On going / left',
            name: 'ongoing_or_left',
            type: 'radio',
            radioItems: [
                {id:1, value:'On going'},
                {id:2, value:'Left'},
            ]
        }, 
        {
            id: 5,
            label: 'People',
            name: 'people',
            type: 'text',
            placeholder:'Add from gmail contacts',
        },    
        {
            id: 6,
            label: 'Name of group',
            name: 'group',
            type: 'text',
        },
        {
            id: 7,
            label: 'Mentor',
            name: 'mentor',
            type: 'text',
            placeholder:'mentor_name',
        },
        {
            id: 8,
            label: 'Member no.',
            name: 'member_no',
            type: 'phone_number',
        },
        {
            id: 9,
            label: 'Show people',
            name: 'people_list',
            type: 'select_check',
            placeholder:'List of people',
            options:['Person 1','Person 2','Person 3','Person 4','Person 5'],
        },
        {
            id: 10,
            label: 'Community',
            name: 'community',
            type: 'select',
            placeholder:'Create or Select community',
            options:['Community 1','Community 2','Community 3','Community 4','Create community'],
        },    
        {
            id: 11,
            label: 'Last topic (s)',
            name: 'last_topic',
            type: 'select',
            options:['Cigarettes in office is necessity'],
        },    
        {
            id: 12,
            label: 'Last event',
            name: 'last_event',
            type: 'text',
        },    
        {
            id: 13,
            label: 'Total Score',
            name: 'total_score',
            type: 'text',
            behavior:'numeric',
        },    
        {
            id: 14,
            label: 'Position Score',
            name: 'position_score',
            type: 'text',
        },  
        {
            id: 15,
            label: 'Arrange Event',
            name: 'arrange_event',
            type: 'text',
        },  
        {
            id: 16,
            label: 'Next Event',
            name: 'next_event',
            type: 'text',
        }, 
        {
            id: 17,
            label: 'Passed Event',
            name: 'passed_event',
            type: 'text',
        }, 
        
    ];

    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });

        // Clear any previous error for this field
        setErrors({ ...errors, [name]: null });
    };

    const validateForm = () => {
        const newErrors = {};

        formFields.forEach(field => {
            const name = field.name;
            // Validate main fields
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
        } else {
            console.log(errors);
        }
    };

    return (
        <ThemeProvider theme={theme}>
        <GeneralLedgerForm
            formfields={formFields}
            handleSubmit={handleSubmit}
            formData={formData}
            onChange={handleChange}
            errors={errors}
            submitBtnVisibility={false}
            // submit button text payment detail
        />
        </ThemeProvider>
    );
}

export default Tab_content;
