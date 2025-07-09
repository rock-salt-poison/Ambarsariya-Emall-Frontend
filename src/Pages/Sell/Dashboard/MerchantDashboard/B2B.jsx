import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import UserBadge from '../../../../UserBadge';
import merchant_as_seller from '../../../../Utils/images/Sell/dashboard/merchant_dashboard/merchant_as_seller.png';
import button from '../../../../Utils/images/Sell/dashboard/merchant_dashboard/button.webp';
import hornSound from "../../../../Utils/audio/horn-sound.mp3";
import B2BFormComponent from './B2BFormComponent';
import B2BTable from './B2BTable';
import { Link, useParams } from 'react-router-dom';

function B2B() {
    const [audio] = useState(new Audio(hornSound));
    const [selectedMouType, setSelectedMouType] = useState('New'); // default
    const { type } = useParams();
  
    const handleClick = (e) => {
        const target = e.target.closest(".img_container");
        if (target) {
            target.classList.add("reduceSize3");
            setTimeout(() => target.classList.remove("reduceSize3"), 500);
            audio.play();
        }
    };

    return (
        <Box className={type === 'b2b' ? "b2b_wrapper" : type === 'b2c' && "b2c_wrapper"}>
            <Box className="row">
                <Box className="col">
                    <Box className="title_container">
                        <Typography className="title">{type === 'b2b' ? 'B2B' : type === 'b2c' && 'B2C' }</Typography>
                    </Box>
                    <Box component="img" src={merchant_as_seller} className="seller" />
                    <UserBadge handleBadgeBgClick={-1} handleLogin={'../login'} handleLogoutClick={'../../'} optionalcName={'align-right'} />
                </Box>

                <Box className="col">
                    <B2BFormComponent setSelectedMouType={setSelectedMouType} />
                </Box>

                <Box className="col">
                    <Link className="buyer_detail">
                        <Box component="img" src={button} alt="icon" className="icon" />
                        <Box className="buyer_container">
                            <Typography className="buyer">
                                {type==='b2b' ? 'Merchant_1': type==='b2c' && 'Member_1'}
                            </Typography>
                        </Box>
                    </Link>
                </Box>

                <B2BTable selectedMouType={selectedMouType.toLowerCase()} />
            </Box>
        </Box>
    );
}

export default B2B;
