import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import tbody_vector from '../../Utils/images/Sell/products/tbody_vector.webp';
import Button2 from '../../Components/Home/Button2';
import { Link, useParams } from 'react-router-dom';
import CardBoardPopup from '../../Components/CardBoardPopupComponents/CardBoardPopup';
import MOU_Popup from '../../Components/Sell/MOU/MOU_Popup';
import IdentifyItem from '../../Components/Sell/MOU/IdentifyItem';
import ComparePricesQuality from '../../Components/Sell/MOU/ComparePricesQuality';
import ContractProcess from '../../Components/Sell/MOU/ContractProcess';
import ProductSaleLastYear from '../../Components/Sell/MOU/ProductSaleLastYear';
import EvaluationProcess from '../../Components/Sell/MOU/EvaluationProcess';
import AwardProcess from '../../Components/Sell/MOU/AwardProcess';
import SigningMou from '../../Components/Sell/MOU/SigningMou';

export default function Mou() {
    const { owner } = useParams();

    const [openPopup , setOpenPopup] = useState(null);

    const handleClose = () => {
        setOpenPopup(false);
    }

    const handleClick = (e, id) => {
        setOpenPopup((prev)=> prev === id ? null : id);
    }

    const mou_tabs = [
        {id:1, title:'Identification of item / product', bodyContent:<IdentifyItem/>},
        {id:2, title:'Compare prices and quality', bodyContent:<ComparePricesQuality/>},
        {id:3, title:'Contract process', bodyContent:<ContractProcess/>},
        {id:4, title:'Last year prices & market prices', bodyContent:<ProductSaleLastYear/>},
        {id:5, title:'Evaluation process', bodyContent:<EvaluationProcess/>},
        {id:6, title:'Award process', bodyContent: <AwardProcess/>},
        {id:7, title:'Signing mou', bodyContent: <SigningMou/>},
    ];
    
    return (
        <Box className="mou_wrapper">
            <Box className="row">
                <Box className="col">
                <Button2 text={"Back"} redirectTo={`../${owner}/subscribe`}/>
                    <Typography variant='h2' className='heading'>
                        <Typography variant='span' className="span_1">
                            MOU</Typography>
                    </Typography>
                    <Box className="empty_next"></Box>
                </Box>
                <Box className="col">
                    <Box className="sub_col"></Box>
                    <Box className="subscribe_wrapper mou">
                        <Box className="board_pins">
                            <Box className="circle"></Box>
                            <Box className="circle"></Box>
                        </Box>
                        
                        <Box className="subscribe_row mou">
                            {mou_tabs.map((tab)=>{
                                return <React.Fragment key={tab.id}>
                                    <Link className="subscribe_col" onClick={(e)=>handleClick(e, tab.id)}>
                                <Box className="title_container">
                                    <Box component="img" src={tbody_vector}/>
                                    <Typography className="title">{tab.title}</Typography>
                                </Box>
                            </Link>

                            <CardBoardPopup open={openPopup === tab.id} handleClose={handleClose} customPopup={true} optionalCName="mou" body_content={<MOU_Popup title={tab.title} sNo={tab.id} bodyContent={tab.bodyContent}/>}/>
                                </React.Fragment>
                            })}
                        </Box>

                        
                       
                        <Box className="board_pins">
                            <Box className="circle"></Box>
                            <Box className="circle"></Box>
                        </Box>
                    </Box>
                    <Box className="sub_col"></Box>
                </Box>
                
            </Box>
        </Box>
    )
}
