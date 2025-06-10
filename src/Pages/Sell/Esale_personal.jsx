import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, ThemeProvider, Typography } from '@mui/material';
import Button2 from '../../Components/Home/Button2';
import personalIcon from '../../Utils/images/Sell/esale/personal_care.webp';
import EsalePersonalForm from '../../Components/Form/EsalePersonalForm';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import UserBadge from '../../UserBadge';
import { get_memberPersonal, getUser, post_memberPersonal } from '../../API/fetchExpressAPI';
import { useSelector } from 'react-redux';
import CustomSnackbar from '../../Components/CustomSnackbar';

function Esale_personal(props) {

  const themeProps = {
    popoverBackgroundColor: props.popoverBackgroundColor || 'var(--text-color-light)',
    textColor: 'black', scrollbarThumb: 'var(--brown)'
  };

  const theme = createCustomTheme(themeProps);

  const initialFormData = {
    personal_traits: '',
    personal_traits_file: '',
    values_and_beliefs: '',
    values_and_beliefs_file: '',
    hobbies_and_interests: '',
    hobbies_and_interests_file: '',
    life_philosophy: '',
    life_philosophy_file: '',
    goal_and_aspirations: '',
    goal_and_aspirations_file: '',
    background_information: '',
    background_information_file: '',
    favorite_quotes_and_mottos: '',
    favorite_quotes_and_mottos_file: '',
    unique_personal_facts: '',
    unique_personal_facts_file: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [fileData, setFileData] = useState({});
  const [loading, setLoading] = useState(false);
  const [memberId, setMemberId] = useState('');
  const [data, setData] = useState(null);
  const token = useSelector((state) => state.auth.userAccessToken); 
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
   

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
        [`${fieldName}_file`]: file,
      });
    }
  };

  const fetchCurrentUserData = async (token) => {
    if(token){
      try{
        setLoading(true);
        const resp = await getUser(token);
        if(resp?.[0].user_type === "member"){
          setMemberId(resp?.[0]?.member_id);
          console.log(resp?.[0]?.member_id);
          
          const personalresp = await get_memberPersonal(resp?.[0]?.member_id);
          
          if(personalresp?.valid){
            setData(personalresp?.data?.[0]);
            console.log(personalresp?.data?.[0]);
          }
        }
      }catch(e){
        console.error(e);
      }finally{
        setLoading(false);
      }
    }
  }

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
  

  useEffect (()=>{
    if(token){
      fetchCurrentUserData(token);
    }
  },[token])

  const handleFieldReset = (fieldName, value) => {
    console.log(`${fieldName}`);
    
    setFileData(prev => ({
      ...prev,
      [`${fieldName}`]: value,
    }));
  };
  

  const renderField = (id, label, name, placeholder, tooltip, innerFields) => {
    return (
      <EsalePersonalForm
        key={id}
        label={label}
        name={name}
        value={formData.hasOwnProperty(name) ? formData[name] : data?.[name] || ""}
        onChange={handleOnChange}
        placeholder={placeholder}
        error={false}
        tooltip={tooltip}
        onFileUpload={handleFileUpload}
        onFieldReset={handleFieldReset}
        fileName={fileData[`${name}_file`]?.name}
        showSpeedDial={true}
        showTooltip={true}
        innerFields={innerFields}
        formData={formData}
      />
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData, fileData);
    
    const memberData = {
      ...formData,
      ...fileData
    }

    console.log(memberData);
    if(memberData){
      try{
        setLoading(true);
        const resp = await post_memberPersonal(memberData, memberId);
        console.log(resp);
        setSnackbar({ open: true, message: resp.message, severity: 'success' });
      }catch(e){
        console.log(e);
        setSnackbar({ open: true, message: e.response.data.message, severity: 'error' });
      }finally{
        setLoading(false);
      }
    }

  };

  console.log(fileData);
  

  const fieldData = [
    {id:1, label:'Personal Traits', tooltip:'Personality traits like outgoing, empathetic, creative, and analytical define you.', innerFields: [
      {id:1, placeholder:'Personal Traits', name :'personal_traits', type:'text'},
      {id:2, placeholder:'Personal Traits File', name :'personal_traits_file', type:'url'},
    ]},

    {id:2, label:'Values & Beliefs', tooltip:'Core principles like honesty, integrity, kindness, and sustainability.', innerFields: [
      {id:1, placeholder:'Values & Beliefs', name :'values_and_beliefs', type:'text'},
      {id:2, placeholder:'Values & Beliefs File', name :'values_and_beliefs_file', type:'url'},
    ]},
    
    {id:3, label:'Hobbies & Interests', tooltip:'Activities you enjoy, such as hiking, reading mystery novels, painting, sports or cooking.', innerFields: [
      {id:1, placeholder:'Hobbies & Interests', name :'hobbies_and_interests', type:'text'},
      {id:2, placeholder:'Hobbies & Interests File', name :'hobbies_and_interests_file', type:'url'},
    ]},
    
    {id:4, label:'Life Philosophy', tooltip:'Your outlook on life, emphasizing continuous learning, personal growth or helping others.',innerFields: [
      {id:1, placeholder:'Life Philosophy', name :'life_philosophy', type:'text'},
      {id:2, placeholder:'Life Philosophy File', name :'life_philosophy_file', type:'url'},
    ]},
    
    {id:5, label:'Goals and Aspirations', tooltip:'Ambitions like traveling to new countries, learning a new language, or achieving a promotion at work.', innerFields: [
      {id:1, placeholder:'Goals and Aspirations', name :'goal_and_aspirations', type:'text'},
      {id:2, placeholder:'Goals and Aspirations File', name :'goal_and_aspirations_file', type:'url'},
    ]},
    
    {id:6, label:'Background Information', tooltip:'Key details about your upbringing such as growing up in a small town or significant life experiences that have influenced who you are.', innerFields: [
      {id:1, placeholder:'Background Information', name :'background_information', type:'text'},
      {id:2, placeholder:'Background Information File', name :'background_information_file', type:'url'},
    ]},
    
    {id:7, label:'Favorite Quotes or Mottos', tooltip:'A quote or personal motto that reflect your mindset.', innerFields: [
      {id:1, placeholder:'Favorite Quotes or Mottos', name :'favorite_quotes_and_mottos', type:'text'},
      {id:2, placeholder:'Favorite Quotes or Mottos File', name :'favorite_quotes_and_mottos_file', type:'url'},
    ]},
    
    {id:8, label:'Unique Personal Facts', tooltip:'Unique facts that make you stand out, including unusual talents and interesting experiences.', innerFields: [
      {id:1, placeholder:'Unique Personal Facts', name :'unique_personal_facts', type:'text'},
      {id:2, placeholder:'Unique Personal Facts File', name :'unique_personal_facts_file', type:'url'},
    ]},
  ]

  return (
    <ThemeProvider theme={theme}>
      {
        loading && <Box className="loading"><CircularProgress/></Box>
      }
      <Box className="esale_personal_wrapper">
        <Box className="row">
          <Box className="col">
            <Box className="container">
              {/* <Button2 text="Back" redirectTo="../esale/emotional" /> */}
            </Box>
            <Box className="container title">
              <Box className="heading">
                <Box component="img" src={personalIcon} alt="icon" className="icon" />
                <Typography className="title">Personal</Typography>
              </Box>
            </Box>
            <Box className="container" display="flex" justifyContent="flex-end">
              {/* <Button2 text="Next" redirectTo="../esale/professional" /> */}
              <UserBadge
                handleBadgeBgClick={`../esale`}
                handleLogin="../login"
                handleLogoutClick="../../AmbarsariyaMall"
            />
            </Box>
          </Box>

          <Box className="col col_auto">
            <Box className="boards_container">
              <Box className="board_pins">
                <Box className="circle"></Box>
                <Box className="circle"></Box>
              </Box>

              <Box component="form" autoComplete="off" className="esale_personal_form" onSubmit={handleSubmit}>
                {fieldData.map(({id, label, name, tooltip, innerFields, placeholder})=>{
                  return renderField(id, label, name, label || placeholder , tooltip, innerFields)
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
      <CustomSnackbar
        open={snackbar.open}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </ThemeProvider>
  );
}

export default Esale_personal;
