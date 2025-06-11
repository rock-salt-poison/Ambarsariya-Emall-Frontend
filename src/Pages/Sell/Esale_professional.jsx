import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, ThemeProvider, Typography } from '@mui/material';
import Button2 from '../../Components/Home/Button2';
import EsalePersonalForm from '../../Components/Form/EsalePersonalForm';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import professional_gif from '../../Utils/gifs/professional.gif';
import UserBadge from '../../UserBadge';
import { get_memberProfessional, getUser, post_memberProfessional } from '../../API/fetchExpressAPI';
import { useSelector } from 'react-redux';
import CustomSnackbar from '../../Components/CustomSnackbar';

function Esale_professional() {
  const themeProps = {
    dialogBackdropColor: 'var(--brown-4)',
    textColor: 'black',
    scrollbarThumb: 'var(--brown)',
  };

  const theme = createCustomTheme(themeProps);

  const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  const initialFormData = {
    full_name: '',
    address: '',
    phone_no_1: '',
    username: '',
    linkedin: '',
    portfolio: '',
    name_and_contact_information: '',
    title: '',
    summary: '',
    skills: '',
    work_experience_in_years: '',
    education: [],
    institution_1: '',
    qualification_1: '',
    startDate_1: '',
    endDate_1: '',
    certification_and_licenses: '',
    certification_name: '',
    license_number: '',
    issuing_organization: '',
    issue_date: '',
    personal_attributes: '',
    achievements_and_awards: '',
    professional_affiliations: '',
    publications_and_presentations: '',
    projects_and_portfolios: [],
    projectName_1: '',
    description_1: '',
    link_1: '',
    reference: '',
    reference_name: '',
    reference_contact: '',
    reference_relation: '',
    languages: '',
    volunteer_experience: '',
    professional_goals: '',
  };

  const fieldData = [
    {
      id: 1, label: 'Name and Contact Information', name: 'name_and_contact_information', showDialog: true, dialogFields: [
        { name: 'full_name', label: 'Name', type: 'text', readOnly: true },
        { name: 'address', label: 'Address', type: 'address', readOnly: true },
        { name: 'phone_no_1', label: 'Phone Number', type: 'tel', readOnly: true },
        { name: 'username', label: 'Email', type: 'email', readOnly: true },
        { name: 'linkedin', label: 'LinkedIn', type: 'text' },
        { name: 'portfolio', label: 'Portfolio', type: 'url' },
      ]
    },
    { id: 2, label: 'Professional Title', name: 'title', showDialog: false },
    { id: 3, label: 'Professional Summary', name: 'summary', showDialog: false },
    { id: 4, label: 'Skills', name: 'skills', showDialog: false },
    { id: 5, label: 'Work Experience (in years)', type: 'number', name: 'work_experience_in_years', showDialog: false },
    {
      id: 6, label: 'Education', name: 'education', showDialog: true, dialogFields: [
        { name: 'institution_1', label: 'Institution', type: 'text' },
        { name: 'qualification_1', label: 'Qualification', type: 'text' },
        { name: 'startDate_1', label: 'Start Date', type: 'date' },
        { name: 'endDate_1', label: 'End Date', type: 'date' }
      ], addmoreButton: true,
    },
    {
      id: 7, label: 'Certification and Licenses', name: 'certification_and_licenses', showDialog: true, dialogFields: [
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
    {
      id: 12, label: 'Projects and Portfolios', name: 'projects_and_portfolios', showDialog: true, dialogFields: [
        { name: 'projectName_1', label: 'Project Name', type: 'text' },
        { name: 'description_1', label: 'Description', type: 'textarea' },
        { name: 'link_1', label: 'Link to Project', type: 'url' }
      ], addmoreButton: true,
    },
    {
      id: 13, label: 'References', name: 'reference', showDialog: true, dialogFields: [
        { name: 'reference_name', label: 'Reference Name', type: 'text' },
        { name: 'reference_contact', label: 'Reference Contact', type: 'text' },
        { name: 'reference_relation', label: 'Reference Relation', type: 'text' }
      ]
    },
    { id: 14, label: 'Languages', name: 'languages', showDialog: false },
    { id: 15, label: 'Volunteer Experience', name: 'volunteer_experience', type: 'number', showDialog: false },
    { id: 16, label: 'Professional Goals', name: 'professional_goals', showDialog: false },
  ];

  const [formData, setFormData] = useState(initialFormData);
  const [dialogData, setDialogData] = useState({});
  const [fields, setFields] = useState(fieldData);
  const [dialogErrors, setDialogErrors] = useState({});
  const [user, setUser] = useState({});
  const [data, setData] = useState({});
  const token = useSelector((state) => state.auth.userAccessToken);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  

  const fetchCurrentUserData = async (token) => {
    if (token) {
      try {
        setLoading(true);
        const resp = await getUser(token);
        if (resp?.[0].user_type === "member") {
          const userData = resp?.[0];
          setUser(userData);
  
          const professionalresp = await get_memberProfessional(userData?.member_id, userData?.user_id);
          if (professionalresp?.valid) {
            const fetchedData = professionalresp?.data?.[0];
            setData(fetchedData);
            console.log(fetchedData);
            
  
            // Update fields based on fetched data
            const updatedFields = generateDynamicFields(fetchedData);
            setFields(updatedFields);
  
            // Fill formData as well
            setFormData((prev) => ({ ...prev, ...fetchedData }));
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      const updatedFields = generateDynamicFields(data);
      setFields(updatedFields);
    }
  }, [data]);
  
  

  useEffect(() => {
    if (token) {
      fetchCurrentUserData(token);
    }
  }, [token])

  const generateDynamicFields = (data) => {
    const updatedFields = [...fieldData];
  
    updatedFields.forEach((field) => {
      if (field.name === 'education' && data?.education?.length > 0) {
        field.dialogFields = [];
        data?.education.forEach((_, index) => {
          const idx = index + 1;
          field.dialogFields.push(
            { name: `institution_${idx}`, label: 'Institution', type: 'text' },
            { name: `qualification_${idx}`, label: 'Qualification', type: 'text' },
            { name: `startDate_${idx}`, label: 'Start Date', type: 'date' },
            { name: `endDate_${idx}`, label: 'End Date', type: 'date' }
          );
        });
      }
  
      if (field.name === 'projects_and_portfolios' && data.projects_and_portfolios?.length > 0) {
        field.dialogFields = [];
        data.projects_and_portfolios.forEach((_, index) => {
          const idx = index + 1;
          field.dialogFields.push(
            { name: `projectName_${idx}`, label: 'Project Name', type: 'text' },
            { name: `description_${idx}`, label: 'Description', type: 'textarea' },
            { name: `link_${idx}`, label: 'Link to Project', type: 'url' }
          );
        });
      }
    });
  
    return updatedFields;
  };
  

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
    console.log(name);
    
    setDialogData({
      ...dialogData,
      [name]: value
    });
    setDialogErrors((prev) => ({ ...prev, [name]: undefined })); // Clear error for that field
  };

  const handleAddMoreButton = (e, fieldName, dialogFields) => {
    setFields((prev) => {
      const newFields = [...prev];
      const fieldIndex = newFields.findIndex((item) => item.name === fieldName);
      if (fieldIndex === -1) return prev;

      const fieldItem = newFields[fieldIndex];
      console.log('fieldItem', fieldItem);

      const baseField = dialogFields[0];

      const count = fieldItem.dialogFields.filter(
        (df) => df.name.startsWith(baseField.name.split('_')[0])
      ).length;
      const nextIndex = count + 1;

      let newDialogField = [];
      if (fieldName === 'education') {
        newDialogField = [
          { name: `institution_${nextIndex}`, label: 'Institution', type: 'text' },
          { name: `qualification_${nextIndex}`, label: 'Qualification', type: 'text' },
          { name: `startDate_${nextIndex}`, label: 'Start Date', type: 'date' },
          { name: `endDate_${nextIndex}`, label: 'End Date', type: 'date' },
        ];
      } else if (fieldName === 'projects_and_portfolios') {
        newDialogField = [
          { name: `projectName_${nextIndex}`, label: 'Project Name', type: 'text' },
          { name: `description_${nextIndex}`, label: 'Description', type: 'textarea' },
          { name: `link_${nextIndex}`, label: 'Link to Project', type: 'url' },
        ];
      } else {
        newDialogField = [];
      }

      fieldItem.dialogFields = [...fieldItem.dialogFields, ...newDialogField];
      if (newDialogField) {
        fieldItem.removeButton = true;
      }
      newFields[fieldIndex] = { ...fieldItem };
      return newFields;
    });
  };

  const handleRemoveButton = (fieldName, groupIndex) => {
    setFields(prev => {
      const newFields = [...prev];
      const fieldIndex = newFields.findIndex(item => item.name === fieldName);
      if (fieldIndex === -1) return prev;

      const fieldItem = newFields[fieldIndex];
      const baseName = fieldItem.dialogFields[0].name.split('_')[0];

      // Identify how many fields in a single group
      const fieldsPerGroup = fieldItem.name === 'education' ? 4 :
        fieldItem.name === 'projects_and_portfolios' && 3;

      // Remove only the fields for the groupIndex
      const updatedDialogFields = fieldItem.dialogFields.filter((f, i) => {
        const match = f.name.match(/_(\d+)$/);
        const index = match ? parseInt(match[1], 10) : 1;
        return index !== groupIndex;
      });

      const remainingGroups = updatedDialogFields.reduce((acc, field) => {
        const match = field.name.match(/_(\d+)$/);
        if (match) acc.add(match[1]);
        return acc;
      }, new Set());

      fieldItem.dialogFields = updatedDialogFields;
      fieldItem.removeButton = remainingGroups.size > 1;

      newFields[fieldIndex] = { ...fieldItem };
      return newFields;
    });

    // Also remove dialogData for that group
    setDialogData(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(key => {
        if (key.endsWith(`_${groupIndex}`)) {
          delete updated[key];
        }
      });
      return updated;
    });
  };

  useEffect(() => {
    if (data) {
      setFormData(prev => ({
        ...prev,
        ...Object.fromEntries(
          Object.entries(data).filter(([key]) => key in initialFormData)
        )
      }));
    }
  }, [data]);


  const handleDialogSubmit = (e, dialogFields, name) => {
    e.preventDefault();
    console.log(name);

    const errors = validateDialogFields();
    if (Object.keys(errors).length > 0) {
      setDialogErrors(errors);
      return;
    }

    const updatedData = {};
    dialogFields.forEach(field => {
      updatedData[field.name] = dialogData[field.name] || '';
    });

    // Group fields by index (e.g., 1, 2, 3)
    const grouped = {};

    dialogFields.forEach(field => {
      const match = field.name.match(/(.*)_(\d+)$/);
      if (match) {
        const key = match[1];
        const index = match[2];
    
        if (!grouped[index]) grouped[index] = {};
        grouped[index][key] = dialogData[field.name] || '';
      } else {
        // If no _index is found, treat as a single group
        if (!grouped[0]) grouped[0] = {};
        grouped[0][field.name] = dialogData[field.name] || '';
      }
    });

    const groupedArray = Object.values(grouped); // [{institute: "...", qualification: "..."}, {...}]

    // Update formData with dynamic key (education / projects_and_portfolios)
    setFormData(prevData => {
      const newFormData = {
        ...prevData,
        ...(groupedArray.length === 0 ? updatedData : {}), // Spread updatedData only if groupedArray is empty
        [name]: groupedArray 
      };
      console.log("Updated formData:", newFormData);
      return newFormData;
    });

    setDialogErrors({});
};




const renderField = (id, label, type, name, showDialog, dialogFields, addmoreButton, removeButton, readOnly) => {
  const value = formData.hasOwnProperty(name) ? formData[name] : data?.[name] || "";

  let mappedDialogFields = [];

  if (name === 'certification_and_licenses') {
    mappedDialogFields = dialogFields?.map((field, index) => ({
      ...field,
      value: dialogData.hasOwnProperty(field.name)
        ? dialogData[field.name]
        : data?.certification_and_licenses?.[0]?.[field.name] || formData[field.name] || '',
      readOnly: field.readOnly ,
    }));
  } else if (name === 'reference') {
    mappedDialogFields = dialogFields?.map((field) => ({
      ...field,
      value: dialogData.hasOwnProperty(field.name)
        ? dialogData[field.name]
        : data?.reference?.[0]?.[field.name] || formData[field.name] || "",
      readOnly: field.readOnly ,
    }));
  } else if (name === 'education' || name === 'projects_and_portfolios') {
    mappedDialogFields = dialogFields?.map((field) => {
      const baseKey = field.name.split('_')[0];
      const fieldIndex = parseInt(field.name.split('_')[1]) || 0;
      console.log(name, baseKey, fieldIndex, data?.[name]?.[fieldIndex-1]?.[baseKey]);
      
      return {
        ...field,
        value: dialogData.hasOwnProperty(field.name)
          ? dialogData[field.name]
          : data?.[name]?.[fieldIndex-1]?.[baseKey] || formData[field.name] || "",
        readOnly: field.readOnly,
      };
    });
  } else {
    mappedDialogFields = dialogFields?.map((field) => ({
      ...field,
      value: dialogData.hasOwnProperty(field.name)
        ? dialogData[field.name]
        : data?.[field.name] || formData[field.name] || "",
      readOnly: field.readOnly ,
    }));
  }

  return (
    <EsalePersonalForm
      key={id}
      label={label}
      type={type}
      name={name}
      value={value}
      onChange={handleOnChange}
      placeholder={label}
      error={dialogErrors[name]}
      showDialog={showDialog}
      dialogFields={mappedDialogFields}
      readOnly={readOnly}
      handleDialogChange={handleDialogChange}
      onDialogSubmit={(e) => handleDialogSubmit(e, dialogFields, name)}
      dialogErrors={dialogErrors}
      addmoreButton={addmoreButton}
      removeButton={removeButton}
      fieldsPerGroup={name === 'projects_and_portfolios' ? 3 : name === 'education' && 4}
      handleAddMoreButton={(e) => handleAddMoreButton(e, name, dialogFields)}
      handleRemoveButton={(e, groupIndex) => handleRemoveButton(name, groupIndex)}
    />
  );
};




  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);

    try {
      setLoading(true);
      const data = {
        linkedin: formData.linkedin,
        portfolio: formData.portfolio,
        title: formData.title,
        summary: formData.summary,
        skills: formData.skills,
        work_experience_in_years: formData.work_experience_in_years,
        education: JSON.stringify(formData.education),
        certification_and_licenses: JSON.stringify(formData.certification_and_licenses || [{
          certification_name: formData.certification_name,
          license_number: formData.license_number,
          issuing_organization: formData.issuing_organization,
          issue_date: formData.issue_date,
        }]),
        personal_attributes: formData.personal_attributes,
        achievements_and_awards: formData.achievements_and_awards,
        professional_affiliations: formData.professional_affiliations,
        publications_and_presentations: formData.publications_and_presentations,
        projects_and_portfolios: JSON.stringify(formData.projects_and_portfolios),
        reference: JSON.stringify(formData.reference || {name: formData.reference_name,
          contact: formData.reference_contact,
          relation: formData.reference_relation}),
        language: formData.languages,
        volunteer_experience: formData.volunteer_experience,
        professional_goals: formData.professional_goals
      }

      if(data){
        const resp = await post_memberProfessional(user.member_id, user.user_id, data );
        setSnackbar({ open: true, message: resp.message, severity: 'success' });
        console.log(resp);
      }
      console.log(data)
    } catch (e) {
      console.error(e);
      setSnackbar({ open: true, message: e.response.data.message, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };




  useEffect(() => {
    const updatedData = {};

    if (formData.name || formData.phone_number || formData.email) {
      updatedData.name_and_contact_information = `${formData.name} | ${formData.phone_number} | ${formData.email}`;
    }

    if (formData.qualification_1) {
      updatedData.education = `${formData.qualification_1}`;
    }

    if (formData.reference_name || formData.reference_contact) {
      updatedData.references = `${formData.reference_name} - ${formData.reference_contact}`;
    }

    if (formData.certification_name || formData.license_number) {
      updatedData.certification_and_licenses = `${formData.certification_name} - ${formData.license_number}`;
    }

    if (formData.project_name_1) {
      updatedData.projects_and_portfolios = `${formData.project_name_1}`;
    }

    if (Object.keys(updatedData).length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        ...updatedData,
      }));
    }
  }, [
    formData.name,
    formData.phone_number,
    formData.email,
    formData.qualification_1,
    formData.reference_name,
    formData.reference_contact,
    formData.certification_name,
    formData.license_number,
    formData.project_name_1,
  ]);


  return (
    <ThemeProvider theme={theme}>
      {loading && <Box className="loading"><CircularProgress /></Box>}
      <Box className="esale_professional_wrapper">
        <Box className="row">
          <Box className="col">
            <Box className="container">
              {/* <Button2 text="Back" redirectTo="../esale/personal" /> */}
            </Box>
            <Box className="container title">
              <Box className="heading">
                <Typography className="title">Professional</Typography>
              </Box>
            </Box>
            <Box className="container" display="flex" justifyContent="flex-end">
              {/* <Button2 text="Next" redirectTo="../esale/emotional" /> */}
              <UserBadge
                handleBadgeBgClick={`../esale`}
                handleLogin="../login"
                handleLogoutClick="../../"
              />
            </Box>
          </Box>

          <Box className="col col_auto">
            <Box className="boards_container">
              <Box component="form" noValidate autoComplete="off" className="esale_personal_form" >
                {fields.map(({ id, label, type, name, showDialog, dialogFields, addmoreButton, removeButton, readOnly }) => {
                  return renderField(id, label, type, name, showDialog, dialogFields, addmoreButton, removeButton, readOnly);
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
      <CustomSnackbar
              open={snackbar.open}
              handleClose={() => setSnackbar({ ...snackbar, open: false })}
              message={snackbar.message}
              severity={snackbar.severity}
            />
    </ThemeProvider>
  );
}

export default Esale_professional;
