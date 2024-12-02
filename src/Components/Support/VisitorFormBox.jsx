import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import VisitorShopForm from './VisitorShopForm';
import { Link, useNavigate } from 'react-router-dom';

const VisitorFormBox = ({ visitorData }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [value, setValue] = useState({domain:'domain', sector:'sector'});
  
  const [showFields, setShowFields] = useState(false);

  const navigate = useNavigate();

  const handleFormSubmitSuccess = (domain, sector, submit) => {
    if(submit){
      setFormSubmitted(true);
    }else{
      setFormSubmitted(false);
    }
    setValue((prevData)=>({...prevData, domain, sector}))
  };

  const handleClick = (e, id) => {
    e.preventDefault();
    navigate(`../support/${id}`);
  }

  return (
    <Box className="container">
      <Box className="circle"></Box>
      <Box className="content">
        <Typography variant='h2'>
          E-Ambarsariya:
          <Link onClick={()=>setShowFields(true)}><Typography variant="span">{value.domain} - {value.sector}</Typography></Link>
        </Typography>
        <Box className="form_container">
          <VisitorShopForm visitorData={visitorData} onSubmitSuccess={handleFormSubmitSuccess} showFields={showFields}/>
        </Box>
        {formSubmitted && (
          <Box className="notifications">
            <Link onClick={(e)=>{handleClick(e, 'stationary')}}>
              <Typography variant="h3">
                Merchant 1230:
                <Typography variant="span">Hi, I am from UCB</Typography>
                <Typography variant="span">Shop from Trilium Mall</Typography>
              </Typography>
            </Link>

            <Link onClick={(e)=>{handleClick(e, 'fashion')}}>
              <Typography variant="h3">
                Merchant 1230:
                <Typography variant="span">Hi, I am from UCB</Typography>
                <Typography variant="span">Shop from Trilium Mall</Typography>
              </Typography>
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default VisitorFormBox;
