import { Box, Button, FormControlLabel, Rating, styled, Typography } from '@mui/material';
import React from 'react';
import price_effective from '../../Utils/images/Sell/order_details/price_effective.svg';
import quality_of_compliance from '../../Utils/images/Sell/order_details/quality_of_compliance.svg';
import quality_of_service from '../../Utils/images/Sell/order_details/quality_of_service.svg';
import subscribe_gif from '../../Utils/gifs/subscribe.gif';
import { Link, useParams } from 'react-router-dom';
 
// Custom icon component

const CustomIcon = ({ size, imgSrc }) => (
  <Box
    component="img"
    src={imgSrc}
    alt="rating"
    sx={{
      width: size,
      height: size,
    }}
  />
);

// Custom Rating component with custom icon and styles
const StyledRating = styled(Rating)({
  '& .MuiRating-iconEmpty': {
    opacity: 0.6, // Default opacity for empty icons
  },
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const iconSizes = [35, 45, 55, 65];

const RenderRow = ({ imgSrc, title, subscribe, id }) => {
  const handleRatingChange = (event, newValue) => {
    event.preventDefault();
    console.log(`${title} Rating:`, newValue);
  };

  return (
    <Box className="detail_row">
      <Box className="col_1">
        <Typography className="return_steps">{title}</Typography>
      </Box>
      <Box className="col_1" textAlign="right">
        {imgSrc && 
          <StyledRating
            name="customized-color"
            defaultValue={0}
            getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
            precision={1}
            className="styledRatings"
            max={4}
            icon={<CustomIcon size={iconSizes[0]} imgSrc={imgSrc} />}
            emptyIcon={<CustomIcon size={iconSizes[0]} sx={{ opacity: 0.6 }} imgSrc={imgSrc} />}
            IconContainerComponent={({ value, ...props }) => {
              const size = iconSizes[value - 1];
              return <span {...props}><CustomIcon size={size} imgSrc={imgSrc} /></span>;
            }}
            onChange={handleRatingChange}
          />
        }

        {
          subscribe && <Link to={`../id/subscribe`}>
            <Box component="img" src={subscribe_gif} className='subscribe' alt="subscribe"/>
          </Link>
        }
        
      </Box>
    </Box>
  );
};

function Review() {
  const {id, action} = useParams();


  return (
    <Box className="details">
      <RenderRow title="Price Effective" imgSrc={price_effective} />
      <RenderRow title="Quality of Compliance" imgSrc={quality_of_compliance} />
      <RenderRow title="Quality of Service" imgSrc={quality_of_service} />
      <RenderRow title="Presentable to Share"  subscribe={true} id={id}/>
    </Box>
  );
}

export default Review;
