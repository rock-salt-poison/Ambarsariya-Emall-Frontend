import React, { useEffect, useState } from 'react';
import { Box, Button, ThemeProvider, Typography } from '@mui/material';
import Button2 from '../../Components/Home/Button2';
import EsalePersonalForm from '../../Components/Form/EsalePersonalForm';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import professional_gif from '../../Utils/gifs/professional.gif';

function Esale_professional() {
  const themeProps = {
    dialogBackdropColor: 'var(--brown-4)',
    textColor: 'black',
    scrollbarThumb: 'var(--brown)',
  };

  const theme = createCustomTheme(themeProps);

  const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  const initialFormData = {
    name: '',
    phone_number: '',
    email: '',
    linkedin_profile:'',
    portfolio_website:'',
    name_and_contact_information:'',
    professional_title: '',
    professional_summary: '',
    skills: '',
    work_experience: '',
    education: [],
    institution:'',
    qualification:'',
    start_date:'',
    end_date:'',
    certification_and_licenses: '',
    certification_name:'',
    license_number:'',
    issuing_organization:'',
    issue_date:'',
    personal_attributes: '',
    achievements_and_awards: '',
    professional_affiliations: '',
    publications_and_presentations: '',
    projects_and_portfolios: '',
    project_name:'',
    description:'',
    link:'',
    references: '',
    reference_name:'',
    reference_contact:'',
    reference_relation:'',
    languages: '',
    volunteer_experience: '',
    professional_goals: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [dialogData, setDialogData] = useState({});
  const [dialogErrors, setDialogErrors] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateDialogFields = () => {
    const errors = {};
    if (dialogData.email && !gmailPattern.test(dialogData.email)) {
      errors.email = "Invalid Gmail address";
    }
    if (dialogData.phone_number && dialogData.phone_number.length !== 10) {
      errors.phone_number = "Phone number must be exactly 10 digits";
    }
    return errors;
  };

  const handleDialogChange = (e) => {
    const { name, value } = e.target;
    setDialogData({
      ...dialogData,
      [name]: value
    });
    setDialogErrors((prev) => ({ ...prev, [name]: undefined })); // Clear error for that field
  };

  const handleDialogSubmit = (e, dialogFields) => {
    e.preventDefault();
    const errors = validateDialogFields();
  
    if (Object.keys(errors).length > 0) {
      setDialogErrors(errors);
      return; 
    } else {
      const updatedData = {};
      dialogFields.forEach(field => {
        updatedData[field.name] = dialogData[field.name] || '';
      });
  
      // Immediately update the formData with new dialogData
      setFormData(prevData => {
        const newFormData = {
          ...prevData,
          ...updatedData,
        };
  
        console.log("Updated formData:", newFormData); // Log the updated formData directly after merging
  
        return newFormData;
      });
      setDialogErrors({});
  
      // Optionally close dialog here if you are using one
    }
  };
  
  const handleAddMoreButton = (e, name, dialogFields) => {
    e.preventDefault(); // Prevent default action if needed
  
    // Create a new education entry based on current dialogData
    const newEntry = {
      institution: dialogData.institution || '',
      qualification: dialogData.qualification || '',
      start_date: dialogData.start_date || '',
      end_date: dialogData.end_date || '',
    };
  
    // Update the formData with the new education entry
    setFormData(prevData => ({
      ...prevData,
      [name]: [...prevData[name], newEntry] // Append the new entry to the existing education array
    }));
  
    // Clear dialogData after adding
    setDialogData({});
    console.log(formData[name]); // Log the updated education array
  };
  


  const renderField = (id, label, type, name, showDialog, dialogFields, addmoreButton) => {
    const value = formData[name] || ''; // Ensure value is never undefined
    return (
        <EsalePersonalForm
            key={id}
            label={label}
            type={type}
            name={name}
            value={value}
            onChange={handleOnChange}
            placeholder={label}
            error={true} // Pass the error for the main field
            showDialog={showDialog}
            dialogFields={dialogFields && dialogFields.map(field => ({
                ...field,
                value: dialogData[field.name] || formData[field.name] || ''
            }))}
            handleDialogChange={handleDialogChange}
            onDialogSubmit={(e) => handleDialogSubmit(e, dialogFields)}
            dialogErrors={dialogErrors}
            addmoreButton={addmoreButton}
            handleAddMoreButton={(e) => handleAddMoreButton(e,name, dialogFields)}
        />
    );
};


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  const fieldData = [
    { id: 1, label: 'Name and Contact Information', name: 'name_and_contact_information', showDialog: true, dialogFields: [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'phone_number', label: 'Phone Number', type: 'tel' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'linkedin_profile', label: 'LinkedIn', type: 'text' },
        { name: 'portfolio_website', label: 'Portfolio', type: 'url' },
      ]
    },
    { id: 2, label: 'Professional Title', name: 'professional_title', showDialog: false },
    { id: 3, label: 'Professional Summary', name: 'professional_summary', showDialog: false },
    { id: 4, label: 'Skills', name: 'skills', showDialog: false },
    { id: 5, label: 'Work Experience (in years)',type:'number', name: 'work_experience', showDialog: false },
    { id: 6, label: 'Education', name: 'education', showDialog: true, dialogFields: [
        { name: 'institution', label: 'Institution', type: 'text' },
        { name: 'qualification', label: 'Qualification', type: 'text' },
        { name: 'start_date', label: 'Start Date', type: 'date' },
        { name: 'end_date', label: 'End Date', type: 'date' }
      ], addmoreButton:true,
    },
    { id: 7, label: 'Certification and Licenses', name: 'certification_and_licenses', showDialog: true, dialogFields: [
        { name: 'certification_name', label: 'Certification Name', type: 'text' },
        { name: 'license_number', label: 'License Number', type: 'text' },
        { name: 'issuing_organization', label: 'Issuing Organization', type: 'text' },
        { name: 'issue_date', label: 'Issue Date', type: 'date' }
      ]
    },
    { id: 8, label: 'Personal Attributes', name: 'personal_attributes', showDialog: false },
    { id: 9, label: 'Achievements And Awards', name: 'achievements_and_awards', showDialog: false },
    { id: 10, label: 'Professional Affiliations', name: 'professional_affiliations', showDialog: false },
    { id: 11, label: 'Publications And Presentations', name: 'publications_and_presentations', showDialog: false },
    { id: 12, label: 'Projects and Portfolios', name: 'projects_and_portfolios', showDialog: true, dialogFields: [
        { name: 'project_name', label: 'Project Name', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'link', label: 'Link to Project', type: 'url' }
      ],addmoreButton:true,
    },
    { id: 13, label: 'References', name: 'references', showDialog: true, dialogFields: [
      { name: 'reference_name', label: 'Reference Name', type: 'text' },
      { name: 'reference_contact', label: 'Reference Contact', type: 'text' },
      { name: 'reference_relation', label: 'Reference Relation', type: 'text' }
    ]},
    { id: 14, label: 'Languages', name: 'languages', showDialog: false },
    { id: 15, label: 'Volunteer Experience', name: 'volunteer_experience',type:'number',showDialog: false },
    { id: 16, label: 'Professional Goals', name: 'professional_goals', showDialog: false },
  ];


  useEffect(() => {
    const { name, phone_number, email, qualification, reference_name, reference_contact, license_number, certification_name, project_name } = formData;
  
    const updatedData = {};
  
    if (name || phone_number || email) {
      updatedData.name_and_contact_information = `${name} | ${phone_number} | ${email}`;
    }
  
    if (qualification) {
      updatedData.education = `${qualification}`;
    }
  
    if (reference_name || reference_contact) {
      updatedData.references = `${reference_name} - ${reference_contact}`;
    }

    if (certification_name || license_number) {
      updatedData.certification_and_licenses = `${certification_name} - ${license_number}`;
    }

    if (project_name) {
      updatedData.projects_and_portfolios = `${project_name}`;
    }
  
    // Only update if there's any change
    if (Object.keys(updatedData).length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        ...updatedData,
      }));
    }
  }, [formData.name, formData.phone_number, formData.email, formData.qualification, formData.reference_name, formData.reference_contact, formData.certification_name, formData.issuing_organization, formData.license_number, formData.project_name]);
  

  return (
    <ThemeProvider theme={theme}>
      <Box className="esale_professional_wrapper">
        <Box className="row">
          <Box className="col">
            <Box className="container">
              <Button2 text="Back" redirectTo="../esale/personal" />
            </Box>
            <Box className="container title">
              <Box className="heading">
                <Typography className="title">Professional</Typography>
              </Box>
            </Box>
            <Box className="container" display="flex" justifyContent="flex-end">
              <Button2 text="Next" redirectTo="../esale/emotional" />
            </Box>
          </Box>

          <Box className="col col_auto">
            <Box className="boards_container">
              <Box component="form" noValidate autoComplete="off" className="esale_personal_form" >
                {fieldData.map(({ id, label,type, name, showDialog, dialogFields, addmoreButton }) => {
                  return renderField(id, label, type, name, showDialog, dialogFields, addmoreButton );
                })}

                <Box className="submit_button_container">
                  <Button type="submit" variant="contained" className="submit_button" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Box>
              </Box>

              <Box component="img" src={professional_gif} alt="professional" className="gif" />
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Esale_professional;
