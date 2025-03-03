import { Box, CircularProgress, FormControlLabel, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Checkbox from "@mui/joy/Checkbox";
import Close from "@mui/icons-material/Close";
import { Link, useNavigate, useParams } from "react-router-dom";
import { get_purchaseOrderDetails } from "../../API/fetchExpressAPI";

// Reusable DetailRow component
const DetailRow = ({ title, checked, onChange, name, disabled }) => (
  <Box className="detail_row">
    <Box className="col_1">
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            name={name}
            disabled
            uncheckedIcon={<Close />}
          />
        }
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

  const { owner } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e) => {
    if(e.target){
      const target = e.target.closest('.btn');
      if(target){
        target.classList.add('reduceSize3');
        setTimeout(()=> {target.classList.remove('reduceSize3')}, 300);
        setTimeout(()=> {navigate(`../${owner}/review`)}, 600);
      } 
    }
  }


  const fetchOrderDetails = async (access_token) => {
      try {
        setLoading(true);
        if (access_token) {
          const resp = await get_purchaseOrderDetails(access_token);
          if (resp.valid) {
            if (resp.data[0]) {
              setOrderDetails(resp.data[0]);
            }
          }
        }
      } catch (e) {
        console.log(e);
      }finally{
        setLoading(false);
      }
    };
 
    useEffect(()=> {
      if(owner){
        fetchOrderDetails(owner);
      }
    }, [owner]);

  return (
    <Box className="details">
      {loading && <Box className="loading"><CircularProgress/></Box>}
      <Typography variant="h3" className="order_id">
        Order Id:{" "}
        <Typography variant="span">
          <Link to={`../${owner}/cart`}>{orderDetails?.po_no}</Link>
        </Typography>
      </Typography>
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

      <Link className="btn"  onClick={(e)=>handleClick(e)}>
        <Typography className="link">
          Review
        </Typography> 
      </Link>
    </Box>
  );
}

export default ReturnDetails;
