import React, { useState } from 'react'
import { Box, Tooltip, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import edit_form_icon from '../../../../Utils/images/Sell/dashboard/merchant_dashboard/edit_form_icon.png';
import shop_icon from '../../../../Utils/images/Sell/dashboard/merchant_dashboard/shop_icon.svg';
import Calendar from '../../../../Components/Home/AQIPopupComponents/Calendar';
import { useParams } from 'react-router-dom';
import CardBoardPopup from '../../../../Components/CardBoardPopupComponents/CardBoardPopup';
import EditShopForm_PopupContent from './EditShopForm_PopupContent';

function DashboardHeader() {
    const { edit } = useParams();
    const [ openPopup, setOpenPopup ] = useState(false);

    const handleClose = () => {
        setOpenPopup(false);
    }
    
    const handleClick  = () => {
        setOpenPopup(true);
    }

  return (
    <Box className="col">
    <Box className="sub-col">
        <Link to='../shop'>
            <Box component="img" src={shop_icon} alt="shop" className='icon' />
        </Link>
    </Box>
    <Box className="sub-col">
        <Box className="title">
            <Typography className='shop_name'>Madhav Stationary</Typography>

            <Box className="domain_sector">
            <Typography>
                <Typography component="span" className='heading'>Domain: </Typography>
                Retail
            </Typography>
            <Typography>
                <Typography component="span" className='heading'>Sector: </Typography>
                Wholesale
            </Typography>

            </Box>
        </Box>
    </Box>
    <Box className={edit ? `sub-col`: 'sub-col calendar'}>
        {!edit ? <Calendar display="dateMonth"/>: 
            <Link className='align-right' onClick={handleClick}>
                <Tooltip title="Edit">
                    <Box component="img" className='icon' src={edit_form_icon} alt="edit shop form"/>
                </Tooltip>
            </Link>
        }
    </Box>

    <CardBoardPopup open={openPopup} handleClose={handleClose} customPopup={true} optionalCName="editShopForm" body_content={<EditShopForm_PopupContent/>}/>
</Box>
  )
}

export default DashboardHeader