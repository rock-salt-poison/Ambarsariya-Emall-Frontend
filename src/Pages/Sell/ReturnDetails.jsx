import { Box, FormControlLabel, Typography } from '@mui/material';
import React, { useState } from 'react';
import Checkbox from '@mui/joy/Checkbox';
import Close from '@mui/icons-material/Close';
import { Link, useParams } from 'react-router-dom';

// Reusable DetailRow component
const DetailRow = ({ title, checked, onChange, name, disabled }) => (
  <Box className="detail_row">
    <Box className="col_1">
      <FormControlLabel
        control={<Checkbox checked={checked} name={name} disabled uncheckedIcon={<Close />} />}
        label={<Typography className="return_steps">{title}</Typography>}
      />
    </Box>
  </Box>
);

// Main ReturnDetails component
function ReturnDetails() {
  const [checkboxStates, setCheckboxStates] = useState({
    refundPolicy: true,
    pickupBegin: true,
    checking: false,
    replaceRefundDeny: false,
    returnToOriginal: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxStates({
      ...checkboxStates,
      [name]: checked,
    });
  };

  const {owner} = useParams();
  const order_id ="00046597"

  return (
    <Box className="details">
          <Typography variant='h3' className='order_id'>Order Id: <Typography variant="span">
              <Link to={`../${owner}/cart`}>{order_id}</Link>
            </Typography></Typography>
      <DetailRow
        title="Refund Policy and Return Status"
        checked={checkboxStates.refundPolicy}
        // onChange={handleCheckboxChange}
        name="refundPolicy"
      />
      <DetailRow
        title="Pickup Begin"
        checked={checkboxStates.pickupBegin}
        // onChange={handleCheckboxChange}
        name="pickupBegin"
      />
      <DetailRow
        title="Checking"
        checked={checkboxStates.checking}
        // onChange={handleCheckboxChange}
        name="checking"
        uncheckedIcon={<Close />}
      />
      <DetailRow
        title="Replace / Refund / Deny"
        checked={checkboxStates.replaceRefundDeny}
        name="replaceRefundDeny"
        disabled
        uncheckedIcon={<Close />}
      />
      <DetailRow
        title="Return to Original Method"
        checked={checkboxStates.returnToOriginal}
        name="returnToOriginal"
        disabled
        uncheckedIcon={<Close />}
      />
    </Box>
  );
}

export default ReturnDetails;
