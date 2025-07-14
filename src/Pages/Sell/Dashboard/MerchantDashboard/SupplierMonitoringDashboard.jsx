import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import UserBadge from '../../../../UserBadge';
import hornSound from "../../../../Utils/audio/horn-sound.mp3";
import { Link, useLocation, useParams } from 'react-router-dom';
import SupplierMonitoringTable from './SupplierMonitoringTable';
import order_now from '../../../../Utils/images/Sell/dashboard/merchant_dashboard/order_now.png'
import track_delivery from '../../../../Utils/images/Sell/dashboard/merchant_dashboard/track_delivery.webp'
import out_stock from '../../../../Utils/images/Sell/dashboard/merchant_dashboard/out_of_stock.webp'
import ready_stock from '../../../../Utils/images/Sell/dashboard/merchant_dashboard/ready_stock.webp'
import supply_chain from '../../../../Utils/images/Serve/emotional/eshop/supply_chain_management_icon.webp'

function SupplierMonitoringDashboard() {
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

    const icons = [
        {id:1, src: order_now, alt:'order_now'},
        {id:2, src: track_delivery, alt:'track_delivery'},
        {id:3, src: ready_stock, alt:'ready_stock'},
        {id:4, src: supply_chain, alt:'supply_chain'},
        {id:5, src: out_stock, alt:'out_of_stock'},
    ]

    return (
        <Box className={"supplier_monitoring_dashboard_wrapper"}>
            <Box className="row">
               <Box className="col">
                {
                    icons?.map((i)=>{
                        return <Link className="icon_container" key={i.id}>
                        <Box component="img" src={i.src} alt={i.alt} className='icon'/>
                    </Link>
                    })
                }

                    <UserBadge handleBadgeBgClick={-1} handleLogin={'../login'} handleLogoutClick={'../../'} optionalcName={'align-right'}/>
               </Box>

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
                    <SupplierMonitoringTable selectedMouType={selectedMouType.toLowerCase()} />
                </Box>
            </Box>
        </Box>
    );
}

export default SupplierMonitoringDashboard;
