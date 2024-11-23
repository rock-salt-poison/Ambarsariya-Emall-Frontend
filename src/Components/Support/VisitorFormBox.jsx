import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import VisitorShopForm from './VisitorShopForm';
import { Link, useNavigate } from 'react-router-dom';

const VisitorFormBox = ({userName}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [value, setValue] = useState({domain:'domain', sector:'sector'}); 
  const navigate = useNavigate();

  const handleFormSubmitSuccess = (domain, sector) => {
    setFormSubmitted(true);
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
          <Typography variant="span">{value.domain} - {value.sector}</Typography>
        </Typography>
        <Box className="form_container">
          <VisitorShopForm userName={userName} onSubmitSuccess={handleFormSubmitSuccess} />
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
