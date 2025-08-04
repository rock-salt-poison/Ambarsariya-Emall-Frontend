import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get_vendor_details } from "../../API/fetchExpressAPI";

function ShopDetails({ column }) {
  function mapCostSensitivity(value) {
    if (value >= 0 && value <= 0.75) {
      return "easy";
    } else if (value > 0.75 && value <= 1.5) {
      return "moderate";
    } else if (value > 1.5 && value <= 2.25) {
      return "effective";
    } else if (value > 2.25 && value <= 3) {
      return "luxury";
    } else {
      return "unknown"; // In case of values outside the 0 - 3 range
    }
  }

  const [shopClassData, setShopClassData] = useState(null);

  console.log(column);

  const fetchShopClass = async (shopNo) => {
    try{
        // setLoading(true);
        const resp = await get_vendor_details([shopNo]);
        if(resp?.valid){
          setShopClassData(resp?.data?.[0]);
        }
    }catch(e){
        console.log(e);
    }finally{
        // setLoading(false);
    }
  }

  useEffect(()=>{
      if(column?.shop_no){
          fetchShopClass(column?.shop_no);
      }
  },[column?.shop_no]);
  

  return (
    <Box className="shop_details_col">
      <Box className="shop_details">
        <Typography>Domain: </Typography>
        <Typography>{column.domain_name}</Typography>
      </Box>
      <Box className="shop_details">
        <Typography>Sector: </Typography>
        <Typography>{column.sector_name}</Typography>
      </Box>
      {/* {column.similar_options_name && (
        <Box className="shop_details">
          <Typography>Similar Options: </Typography>

          <Box className="options">
            {column.similar_options_name.map((name, index) => (
              <React.Fragment key={index}>
                <Link
                  to={`../support/shop?token=${column.similar_options_token[index]}`}
                >
                  <Typography>
                    {name}
                    {index < column.similar_options_name.length - 1 && ", "}
                  </Typography>
                </Link>
              </React.Fragment>
            ))}
          </Box>
        </Box>
      )} */}

      <Box className="shop_details">
        <Typography>Shop Type: </Typography>
        <Typography>{shopClassData?.shop_class ? `Class ${shopClassData?.shop_class}`: <CircularProgress/>}</Typography>
      </Box>
      <Box className="shop_details">
        <Typography>Cost Sensitivity: </Typography>
        <Typography>{mapCostSensitivity(column.cost_sensitivity)}</Typography>
      </Box>
    </Box>
  );
}

export default ShopDetails;
