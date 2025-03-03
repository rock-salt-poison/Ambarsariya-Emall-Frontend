import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

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
        <Typography>Class B</Typography>
      </Box>
      <Box className="shop_details">
        <Typography>Cost Sensitivity: </Typography>
        <Typography>{mapCostSensitivity(column.cost_sensitivity)}</Typography>
      </Box>
    </Box>
  );
}

export default ShopDetails;
