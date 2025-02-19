import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import VisitorShopForm from "./VisitorShopForm";
import { Link, useNavigate } from "react-router-dom";

const VisitorFormBox = ({ visitorData }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [value, setValue] = useState({ domain: "domain", sector: "sector" });

  const [showFields, setShowFields] = useState(true);

  const navigate = useNavigate();
  // console.log(visitorData);
  

  const handleFormSubmitSuccess = (domain, sector, submit) => {
    if (submit) {
      setFormSubmitted(true);
    } else {
      setFormSubmitted(false);
    }
    setValue((prevData) => ({ ...prevData, domain, sector }));
  };
  
  const handleHeadingClick = () => {
    setShowFields((prev) => !prev); // Toggle visibility
  };


  return (
    <Box className="container">
      <Box className="circle"></Box>
      <Box className="content">
        <Typography variant="h2">
          E-Ambarsariya:
          <Link onClick={handleHeadingClick}> {/* Toggle form on click */}
            <Typography variant="span">
              {formSubmitted && visitorData?.domain_name && visitorData?.sector_name
                ? `${visitorData.domain_name} - ${visitorData.sector_name}`
                : `${value.domain} - ${value.sector}`}
            </Typography>
          </Link>
        </Typography>
        <Box className="form_container">
          <VisitorShopForm
            visitorData={visitorData}
            onSubmitSuccess={handleFormSubmitSuccess}
            showFields={showFields}
          />
        </Box>
        {/* {formSubmitted && (
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
        )} */}
      </Box>
    </Box>
  );
};

export default VisitorFormBox;
