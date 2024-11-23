import React from 'react'
import { Box, Typography } from '@mui/material'
import Button2 from '../../Components/Home/Button2'
import hanging_board from '../../Utils/images/Serve/emotional/eshop/hanging_board.webp'
import hanging_board2 from '../../Utils/images/Serve/emotional/eshop/hanging_board2.webp'
import { Link } from 'react-router-dom';
import financial_management_icon from '../../Utils/images/Serve/emotional/eshop/financial_management_icon.png'
import financial_management_icon2 from '../../Utils/images/Serve/emotional/eshop/financial_management_icon2.webp'
import HR_management_icon from '../../Utils/images/Serve/emotional/eshop/HR_management_icon.png'
import HR_management_icon2 from '../../Utils/images/Serve/emotional/eshop/HR_management_icon2.png'
import stock_management from '../../Utils/images/Serve/emotional/eshop/stock_management.png'
import stock_management_icon2 from '../../Utils/images/Serve/emotional/eshop/stock_management_icon2.png'
import suppliers_for_shop_icon from '../../Utils/images/Serve/emotional/eshop/suppliers_for_shop_icon.webp'
import supply_chain_management_icon from '../../Utils/images/Serve/emotional/eshop/supply_chain_management_icon.webp'
import supply_chain_management_icon2 from '../../Utils/images/Serve/emotional/campaign/community/icon_1.webp'

function Eshop() {

    const header = [
        { id: 1, title: 'Shop No: 001' },
        { id: 2, title: 'Wholesale' },
        { id: 3, title: 'Industrial and Manufacturing Supplies' },
    ];

    const data = [
        {id:1, imgSrc1:financial_management_icon, title:'Financial Management', imgSrc2: financial_management_icon2, link1: 'financial-management', link2:''},
        {id:2, imgSrc1:HR_management_icon, title:'HR Management', imgSrc2: HR_management_icon2, link1: 'hr-management', link2:''},
        {id:3, imgSrc1:suppliers_for_shop_icon, title:'Suppliers for shop', imgSrc2: financial_management_icon2, link1: 'suppliers-for-shop', link2:''},
        {id:4, imgSrc1:supply_chain_management_icon, title:'Supply Chain Management', imgSrc2: supply_chain_management_icon2, link1: 'supply-chain-sale-order', link2:''},
        {id:5, imgSrc1:stock_management, title:'Stock Management', imgSrc2: stock_management_icon2, link1: 'stock-management', link2:''},
    ]

    return (
        <Box className="serve_eshop_wrapper">
            <Box className="row">
                <Box className="col d_md_none">
                    {
                        header.map((item) => {
                            return <Box className="title_container" key={item.id}>
                                <Box component="img" src={hanging_board} alt="board" className='hanging_board' />
                                <Typography className='title'>{item.title}</Typography>
                            </Box>
                        })
                    }

                </Box>
                <Box className="col d_lg_none">
                     <Box className="title_container">
                                <Box component="img" src={hanging_board2} alt="board" className='hanging_board2' />
                                <Typography className='title' variant='h2'>
                                    <Typography className="heading" variant='span'>
                                        Shop No: <Typography variant='span' className='values'>001</Typography>
                                    </Typography>
                                    <Typography className="heading" variant='span'>
                                        Domain: <Typography variant='span' className='values'>Wholesale</Typography>
                                    </Typography>
                                    <Typography className="heading" variant='span'>
                                        Sector: <Typography variant='span' className='values'>Industrial and Manufacturing Supplies</Typography>
                                    </Typography>
                                    
                                </Typography>
                            </Box>

                </Box>
                <Box className="col">
                    <Box className="col-8">
                        <Box className="board_pins">
                            <Box className="circle"></Box>
                            <Box className="circle"></Box>
                        </Box>

                        <Box className="container">
                            {
                                data.map((item)=>{
                                    return <Box key={item.id} className="sub_wrapper">
                                    <Box className="col-auto">
                                        <Link to={item.link1}>
                                            <Box component="img" src={item.imgSrc1} alt="icon" className='icon_1'/>
                                        </Link>
                                    </Box>
                                    <Box className="col-auto">
                                        <Link to={item.link1}>
                                            <Typography className='title'>{item.title}</Typography>
                                        </Link>
                                    </Box>
                                    <Box className="col-auto">
                                        <Link to={item.link2}>
                                            <Box component="img" src={item.imgSrc2} alt="icon" className='icon_2'/>
                                        </Link>
                                    </Box>
                                </Box>
                                })
                            }
                            
                        </Box>


                        <Box className="board_pins">
                            <Box className="circle"></Box>
                            <Box className="circle"></Box>
                        </Box>
                    </Box>
                </Box>
                <Box className="col">
                    <Button2 text="Back" redirectTo='../emotional' />
                    <Button2 text="Next" redirectTo='../emotional/analytics' />
                </Box>
            </Box>
        </Box>
    )
}

export default Eshop