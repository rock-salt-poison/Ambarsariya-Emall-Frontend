import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import final_demand from '../../../../Utils/images/Sell/dashboard/merchant_dashboard/final_demand.webp'
import hornSound from "../../../../Utils/audio/horn-sound.mp3";
import B2BFormComponent from './B2BFormComponent';
import B2BTable from './B2BTable';
import { Link, useLocation, useParams } from 'react-router-dom';
import Header from '../../../../Components/Serve/SupplyChain/Header';
import SupplierPurchasesTable from './SupplierPurchasesTable';

function SupplierPurchases() {
    const [audio] = useState(new Audio(hornSound));
    const [selectedMouType, setSelectedMouType] = useState('New'); // default
    const { type } = useParams();
    const location = useLocation();
    
     
  
    const handleClick = (e) => {
        const target = e.target.closest(".img_container");
        if (target) {
            target.classList.add("reduceSize3");
            setTimeout(() => target.classList.remove("reduceSize3"), 500);
            audio.play();
        }
    };

    return (
        <Box className={"supplier_purchases_wrapper" }>
            <Box className="row">
                <Header
                    back_btn_link={-1}
                    icon_1={final_demand}
                    title="Purchases"
                    heading_with_bg={true}
                    redirectTo={-1}
                />

                {/* <Box className="col">
                    <Link className="buyer_detail" to={type === 'b2b' ? 'merchant_1': type === 'b2c' && 'member_1'}>
                        <Box component="img" src={button} alt="icon" className="icon" />
                        <Box className="buyer_container">
                            <Typography className="buyer">
                                {type==='b2b' ? 'Merchant_1': type==='b2c' && 'Member_1'}
                            </Typography>
                        </Box>
                    </Link>
                </Box> */}

                <Box className="col">
                    <SupplierPurchasesTable />
                </Box>
            </Box>
        </Box>
    );
}

export default SupplierPurchases;
