import React, { useState } from 'react'
import { Box, Tooltip, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import edit_form_icon from '../../../../Utils/images/Sell/dashboard/merchant_dashboard/edit_form_icon.png';
import shop_icon from '../../../../Utils/images/Sell/dashboard/merchant_dashboard/shop_icon.svg';
import Calendar from '../../../../Components/Home/AQIPopupComponents/Calendar';
import { useParams } from 'react-router-dom';
import CardBoardPopup from '../../../../Components/CardBoardPopupComponents/CardBoardPopup';
import EditShopForm_PopupContent from './EditShopForm_PopupContent';
import EditableCalendar from '../../../../Components/Home/AQIPopupComponents/EditableCalendar';

function DashboardHeader({data, setSelectedDate}) {
    const { token, edit } = useParams();
    const [ openPopup, setOpenPopup ] = useState(false);
    const navigate = useNavigate();
    
    const handleClose = () => {
        setOpenPopup(false);
    }
    
    const handleClick  = () => {
        setOpenPopup(true);
    }

    const handleRedirect = (e) => {
        if(e.target){
            if(edit){
                setTimeout(()=> {
                    navigate(`../support/shop/${token}/dashboard`);
                }, 300);
            }else{
                setTimeout(()=> {
                    navigate('edit');
                }, 300);
            }
        }
    }

  return (
    <Box className="col">
    <Box className="sub-col">
        <Link to={`../support/shop/shop-detail/${token}`}>
            <Box component="img" src={shop_icon} alt="shop" className='icon' />
        </Link>
    </Box>
    <Box className="sub-col">
        <Box className="title">
            <Link onClick={(e)=> handleRedirect(e)}><Typography className='shop_name'>{data?.business_name}</Typography></Link>

            <Box className="domain_sector">
            <Typography>
                <Typography component="span" className='heading'>Domain: </Typography>
                {data?.domain_name}
            </Typography>
            <Typography>
                <Typography component="span" className='heading'>Sector: </Typography>
                {data?.sector_name}
            </Typography>

            </Box>
        </Box>
    </Box>
    <Box className={edit ? `sub-col`: 'sub-col calendar'}>
        {!edit ? <EditableCalendar business_establishment_date={new Date(data?.establishment_date)} setDate={setSelectedDate}/>: 
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