import React, { useState } from 'react';
import { Box, Button, ThemeProvider, Typography } from '@mui/material';
import Button2 from '../../Components/Home/Button2';
import personalIcon from '../../Utils/images/Sell/esale/personal_care.svg';
import EsalePersonalForm from '../../Components/Form/EsalePersonalForm';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';

function Esale_personal(props) {

  const themeProps = {
    popoverBackgroundColor: props.popoverBackgroundColor || 'var(--text-color-light)',
    textColor: 'black', scrollbarThumb: 'var(--brown)'
  };

  const theme = createCustomTheme(themeProps);

  const initialFormData = {
    personal_traits: '',
    values_and_beliefs: '',
    hobby_and_interests: '',
    life_philosophy: '',
    goals_and_aspirations: '',
    background_information: '',
    favorite_quotes_or_mottos: '',
    unique_personal_facts: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [fileData, setFileData] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileUpload = (fieldName, file) => {
    if (file) {
      setFileData({
        ...fileData,
        [fieldName]: file.name,
      });
    }
  };

  const renderField = (id, label, name, placeholder, tooltip) => {
    return (
      <EsalePersonalForm
        key={id}
        label={label}
        name={name}
        value={formData[name]}
        onChange={handleOnChange}
        placeholder={placeholder}
        error={false}
        tooltip={tooltip}
        onFileUpload={handleFileUpload}
        fileName={fileData[name]}
        showSpeedDial={true}
        showTooltip={true}
      />
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData, fileData);
  };

  const fieldData = [
    {id:1, label:'Personal Traits', name :'personal_traits', tooltip:'Personality traits like outgoing, empathetic, creative, and analytical define you.'},

    {id:2, label:'Values & Beliefs', name :'values_and_beliefs', tooltip:'Core principles like honesty, integrity, kindness, and sustainability.'},
    
    {id:3, label:'Hobbies & Interests', name :'hobby_and_interests', tooltip:'Activities you enjoy, such as hiking, reading mystery novels, painting, sports or cooking.'},
    
    {id:4, label:'Life Philosophy', name :'life_philosophy', tooltip:'Your outlook on life, emphasizing continuous learning, personal growth or helping others.'},
    
    {id:5, label:'Goals and Aspirations', name :'goals_and_aspirations', tooltip:'Ambitions like traveling to new countries, learning a new language, or achieving a promotion at work.'},
    
    {id:6, label:'Background Information', name :'background_information', tooltip:'Key details about your upbringing such as growing up in a small town or significant life experiences that have influenced who you are.'},
    
    {id:7, label:'Favorite Quotes or Mottos', name :'favorite_quotes_or_mottos', tooltip:'A quote or personal motto that reflect your mindset.'},
    
    {id:8, label:'Unique Personal Facts', name :'unique_personal_facts', tooltip:'Unique facts that make you stand out, including unusual talents and interesting experiences.'},
  ]

  return (
    <ThemeProvider theme={theme}>
      <Box className="esale_personal_wrapper">
        <Box className="row">
          <Box className="col">
            <Box className="container">
              <Button2 text="Back" redirectTo="../esale/emotional" />
            </Box>
            <Box className="container title">
              <Box className="heading">
                <Box component="img" src={personalIcon} alt="icon" className="icon" />
                <Typography className="title">Personal</Typography>
              </Box>
            </Box>
            <Box className="container" display="flex" justifyContent="flex-end">
              <Button2 text="Next" redirectTo="../esale/professional" />
            </Box>
          </Box>

          <Box className="col col_auto">
            <Box className="boards_container">
              <Box className="board_pins">
                <Box className="circle"></Box>
                <Box className="circle"></Box>
              </Box>

              <Box component="form" noValidate autoComplete="off" className="esale_personal_form" onSubmit={handleSubmit}>
                {fieldData.map(({id, label, name, tooltip})=>{
                  return renderField(id, label, name, label, tooltip)
                })}

                <Box className="submit_button_container">
                  <Button type="submit" variant="contained" className="submit_button">
                    Submit
                  </Button>
                </Box>
              </Box>

              <Box className="board_pins">
                <Box className="circle"></Box>
                <Box className="circle"></Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Esale_personal;
