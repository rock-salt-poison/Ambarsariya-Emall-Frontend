import { Box, Typography, Slider, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import cost_sensitivity_icon from '../../Utils/images/Sell/shop_details/cost_sensitivity_icon.webp'
import CardBoardPopup from '../CardBoardPopupComponents/CardBoardPopup';
import { Link } from 'react-router-dom';
import ShopClassComponent from './ShopClassComponent';
import { get_vendor_details } from '../../API/fetchExpressAPI';

function ShopDetails2({data}) {
  // Define the slider marks
  const marks = [
    { value: 0, label: 'A' },
    { value: 1, label: 'B' },
    { value: 2, label: 'C' },
    { value: 3, label: 'D' }
  ];

  const costSensitivity = [
    { value: 0, label: 'Easy' },
    { value: 1, label: 'Moderate' },
    { value: 2, label: 'Effective' },
    { value: 3, label: 'Luxury' }
  ];

  const [openPopup, setOpenPopup] = useState(false);
  const [title, setTitle] = useState('');
  const [shopData, setShopData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpenPopup(false);
  }

  const handleClick = (e, id, title) => {
    setOpenPopup((prev)=> prev===id? null : id);
    setTitle(title);
  }

  console.log(data);
  

  const fetchShopClass = async (shopNo) => {
          try{
              setLoading(true);
              const resp = await get_vendor_details([shopNo]);
              if(resp?.valid){
                  console.log(resp?.data?.[0])
                  setShopData(resp?.data?.[0]);
              }
          }catch(e){
              console.log(e);
          }finally{
              setLoading(false);
          }
      }
      
      useEffect(()=>{
          if(data?.shop_no){
              fetchShopClass(data?.shop_no);
          }
      },[data?.shop_no]);

    const getClassIndex = (score) => {
      if (score >= 4) return 0; // A
      if (score >= 3) return 1; // B
      if (score >= 2) return 2; // C
      return 3; // D
    };


  return (
    <Box className="shop_details_col2">
      {loading && <Box className="loading"><CircularProgress/></Box> }
      <Link className="shop_details" onClick={(e)=>handleClick(e,1,`Class ${shopData?.shop_class}`)}>
        <Typography className="title">Class</Typography>
        <Slider
          value={getClassIndex(shopData?.average_score)} 
          step={1} 
          min={0} 
          max={3} 
          marks={marks}
          className="slider"
        />
      </Link>

      <Box className="shop_details">
        <Box component="img" src={cost_sensitivity_icon} alt="cost_sensitivity" className='cost_sensitivity_icon'/>
        <Slider
          value={data.cost_sensitivity} // Default value (optional)
          step={1} // Step between marks
          min={0} // Minimum value
          max={3} // Maximum value
          marks={costSensitivity} // Marks array
          className="slider"
        />
      </Box>

      <CardBoardPopup open={openPopup} handleClose={handleClose} title={title} body_content={<ShopClassComponent shopData={shopData}/>} optionalCName='shop_class'/>

    </Box>
  );
}

export default ShopDetails2;
