import React, { useState } from 'react'
import { Box, ThemeProvider } from '@mui/material';
import createCustomTheme from '../../../styles/CustomSelectDropdownTheme';
import board from '../../../Utils/images/Sell/cart/prepaid_postpaid/board.webp';
import credit from '../../../Utils/images/Sell/cart/prepaid_postpaid/credit_img.webp';
import paid from '../../../Utils/images/Sell/cart/prepaid_postpaid/paid_img.webp';
import { Link } from 'react-router-dom';
import CardBoardPopup from '../../CardBoardPopupComponents/CardBoardPopup';
import Prepaid from './Prepaid';
import Postpaid from './Postpaid';

function PrepaidPostpaid() {

    const themeProps = {
      scrollbarThumb: 'var(--brown)',
      popoverBackgroundColor: '#f8e3cc',
    };
  
    const theme = createCustomTheme(themeProps);

    const [openPopup, setOpenPopup] = useState(null);

    const handleClick = (e, item) => {
      if(item.popup){
        setOpenPopup((prev)=> prev===item.id ? null : item.id);
      }
    }

    const data=[
      {id:1, imgSrc:board, cName:'board_img', popup:false},
      {id:2, imgSrc:credit, cName:'img', popup:true, body_content:<Postpaid icon={credit}/>, popupCname:'postpaid'},
      {id:3, imgSrc:paid, cName:'img', popup:true, body_content:<Prepaid icon={paid}/>, popupCname:'prepaid'},
      {id:4}
    ];

    const handleClose = (e) => {
      setOpenPopup(false);
    }

  return (
    <ThemeProvider theme={theme}>
        <Box className="body_container">
            <Box className="row">
              {
                data.map((item)=> {
                  return <Box className="col">
                 {item.imgSrc && <Link onClick={(e)=>handleClick(e, item)}><Box component="img" src={item.imgSrc} alt="prepaid_postpaid" className={item.cName}/></Link>}

                 <CardBoardPopup open={openPopup === item.id} handleClose={(e)=>handleClose(e)} customPopup={true} optionalCName={item.popupCname} body_content={item.body_content}/>
                </Box>
                })
              }
              
            </Box>
        </Box>
    </ThemeProvider>
  )
}

export default PrepaidPostpaid