import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import UserBadge from '../../../../UserBadge';
import hornSound from "../../../../Utils/audio/horn-sound.mp3";
import { Link, useParams } from 'react-router-dom';
import shop_icon from '../../../../Utils/images/Sell/dashboard/merchant_dashboard/shop_icon.svg';
import mou_assign from '../../../../Utils/images/Sell/dashboard/merchant_dashboard/mou_assign.png';
import mou_reject from '../../../../Utils/images/Sell/dashboard/merchant_dashboard/mou_reject.webp';
import mou_hold from '../../../../Utils/gifs/mou_hold.gif';
import MoUDetailsTable from './MoUDetailsTable';


function MoUDetail() {
    const [audio] = useState(new Audio(hornSound));
    const { token, type } = useParams();
  
    const handleClick = (e) => {
        const target = e.target.closest(".img_container");
        if (target) {
            target.classList.add("reduceSize3");
            setTimeout(() => target.classList.remove("reduceSize3"), 500);
            audio.play();
        }
    };

    return (
        <Box className="mou_detail_wrapper">
            <Box className="row">
                <Box className="col">
                    <Link to={`../support/shop/shop-detail/${token}`}>
                        <Box component="img" src={shop_icon} alt="shop" className='icon' />
                    </Link>                    
                    <Box className="title_container">
                        <Typography className="title">Business/Member Name</Typography>
                        <Typography className="desc">Shop/Member :
                            <Typography className="span" variant="span">member_1</Typography>
                        </Typography>
                    </Box>
                    <UserBadge handleBadgeBgClick={-1} handleLogin={'../login'} handleLogoutClick={'../../'} optionalcName={'align-right'} />
                </Box>
                
                <Box className="col">
                    {/* <Box className="icons">
                        <Link className="icon_container">
                            <Box component="img" src={mou_assign} alt="mou-assign" className='icon'/>
                        </Link>
                        <Link className="icon_container">
                            <Box component="img" src={mou_reject} alt="mou-reject" className='icon'/>
                        </Link>
                        <Link className="icon_container">
                            <Box component="img" src={mou_hold} alt="mou-hold" className='icon'/>
                        </Link>
                    </Box> */}
                    <MoUDetailsTable data={'data'} />
                </Box>

            </Box>
        </Box>
    );
}

export default MoUDetail;
