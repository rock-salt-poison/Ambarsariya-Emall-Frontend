import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Button2 from '../../Components/Home/Button2';
import { Link, useParams } from 'react-router-dom';
import ReactCurvedText from 'react-curved-text';
import tab_bg_img from '../../Utils/images/Sell/budget/tab_bg_img.png';
import energy_icon from '../../Utils/images/Sell/budget/energy.svg';
import food_icon from '../../Utils/images/Sell/budget/food.svg';
import daily_workers_icon from '../../Utils/images/Sell/budget/daily_workers.svg';
import fees_gif from '../../Utils/images/Sell/budget/fees.gif';
import leisure_icon from '../../Utils/images/Sell/budget/leisure.svg';
import home_icon from '../../Utils/images/Sell/budget/home.svg';
import dreams_icon from '../../Utils/images/Sell/budget/dreams.svg';
import family_icon from '../../Utils/images/Sell/budget/family.svg';
import BudgetPopup from '../../Components/Sell/BudgetPopup';

function Budget() {
  const { owner, action } = useParams();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const updateDimensions = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const calculateResponsiveValues = () => {
    const { width, height } = dimensions;

    const responsiveWidth = Math.min(width * 0.9, 220); // Example max width limit
    const responsiveHeight = Math.min(height * 0.1, 85); // Example max height limit
    const responsiveCx = responsiveWidth / 2; // Example calculation
    const responsiveCy = responsiveHeight / 2 + 40; // Example calculation
    const responsiveRx = responsiveWidth / 3 + 10; // Example calculation
    const responsiveRy = responsiveHeight / 2 - 65; // Example calculation

    return {
      width: responsiveWidth,
      height: responsiveHeight,
      cx: responsiveCx,
      cy: responsiveCy,
      rx: responsiveRx,
      ry: responsiveRy,
    };
  };

  const { width, height, cx, cy, rx, ry } = calculateResponsiveValues();

  const data = [
    {
      id: 1,
      imgSrc: energy_icon,
      title: "Energy",
      fields: [
        { label: 'Solar Energy', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
        { label: 'Fuel For Vehicles', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
        { label: 'Cooking Gas', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
        { label: 'Power Consumption Bills', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
      ]
    },
    {
      id: 2,
      imgSrc: food_icon,
      title: "Food",
      fields: [
        { label: 'Food', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
        { label: 'Daily Pickup', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
        { label: 'Delivery Apps', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
        { label: 'Outside Restaurants', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
      ]
    },
    {
      id: 3, imgSrc: daily_workers_icon, title: "Daily Workers", linkTo: '#', fields: [
        { label: 'Maids', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
        { label: 'Gardener', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
        { label: 'Waste Management', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
        { label: 'Car Cleaner', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
        { label: 'Security', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
      ]
    },
    {
      id: 4, imgSrc: fees_gif, title: "Fees", linkTo: '#', 
      fields: [
        { label: 'Subscriptions', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
        { label: 'Consumers', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
        { label: 'Generic Hospital Needs', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
        { label: 'Insurance', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
        { label: 'EMI', selectOptions: ['per month', 'per year'], costfield: true },
        { label: 'Utility Services', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
        { label: 'Investment', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
      ]
    },
    {
      id: 5, imgSrc: leisure_icon, title: "Leisure", linkTo: '#',
      fields: [
        { label: 'Touring Ideas', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
        { label: 'Functions and Parties', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
        { label: 'Festival Planning', costfield: true },
      ]
    },
    {
      id: 6, imgSrc: home_icon, title: "Home", linkTo: '#',
      fields: [
        { label: 'Home Decor', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
        { label: 'Pickup', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
        { label: 'Clothing and Accessories', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
        { label: 'Seasons Planning', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
        { label: 'Wardrobe Accessories', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
      ]
    },
    { id: 7, imgSrc: family_icon, title: "Family", linkTo: '#', 
      fields: [
      { label: 'Spouse ', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
      { label: 'Children', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
      { label: 'Parents', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
      { label: 'Neighbours', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
      { label: 'Friends ', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
      { label: 'Siblings ', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
      { label: 'Community ', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
      { label: 'Peace', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
      { label: 'Hangover', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
    ] },
    {
      id: 8, imgSrc: dreams_icon, title: "Earnings", linkTo: '#', fields: [
        { label: 'Job ', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
        { label: 'Business', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
        { label: 'Consultancy', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
        { label: 'Share Your Experiences', selectOptions: ['per day', 'per week', 'per month', 'per year'], costfield: true },
      ]
    },
    
  ];


  const handleItemClick = (item) => {
    setSelectedItem(item);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedItem(null);
  };

  return (
    <Box className="budget_wrapper">
      <Box className="row">
        <Box className="col">
          <Button2 text="Back" redirectTo={`../${owner}/subscribe`} />
          <Button2 text="Next" redirectTo={`../${owner}/subscribe`} />
        </Box>
        <Box className="col">
          <Box className="container">
            <Box className="col-4">
              <Box className="bg_img" component="img" src={tab_bg_img} />
              {data.slice(0, 4).map((item) => (
                <Link className="card" key={item.id} onClick={() => handleItemClick(item)}>
                  <Typography className="card_title">{item.title}</Typography>
                  <Box component="img" src={item.imgSrc} className='card_img' />
                </Link>
              ))}
            </Box>
            <Box className="col-2">
              <ReactCurvedText
                width={width}
                height={height}
                cx={cx}
                cy={cy}
                rx={rx}
                ry={ry}
                startOffset={12}
                reversed={true}
                text="budget"
                textPathProps={null}
                tspanProps={null}
                ellipseProps={null}
                svgProps={{ className: 'span' }}
              />
            </Box>
            <Box className="col-4">
              <Box className="bg_img" component="img" src={tab_bg_img} />
              {data.slice(4, 9).map((item) => (
                <Link className="card" key={item.id} onClick={() => handleItemClick(item)}>
                  <Typography className="card_title">{item.title}</Typography>
                  <Box component="img" src={item.imgSrc} className='card_img' />
                </Link>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      <BudgetPopup open={popupOpen} handleClose={handleClosePopup} obj={selectedItem} />
    </Box>
  );
}

export default Budget;
