import React from 'react'
import { Box, Typography } from '@mui/material'
import Button2 from '../../Components/Home/Button2'
import Board from '../../Components/CouponOffering/Board'
import boardImg from '../../Utils/images/Sell/eshop/board.svg'
import female_user from '../../Utils/images/Sell/user_portfolio/female_user.png'
import gif_1 from '../../Utils/gifs/shopping.gif';
import relationship_img from '../../Utils/images/Sell/esale/relationship.png'
import location_img from '../../Utils/images/Sell/esale/location.svg'
import life_img from '../../Utils/images/Sell/esale/life.png'
import personal_care_img from '../../Utils/images/Sell/esale/personal_care.svg'
import emotional_care_img from '../../Utils/images/Sell/esale/emotional.svg'
import professional_gif from '../../Utils/gifs/professional.gif'
import bg_img from '../../Utils/images/Sell/esale/bg_img.png'
import { Link, useParams } from 'react-router-dom'

const data = [
    { id: 1, title: "Emotional", imgSrc: emotional_care_img, linkTo:'emotional' },
    { id: 2, title: "Personal", imgSrc: personal_care_img, linkTo:'personal' },
    { id: 3, title: "Professional", imgSrc: professional_gif, linkTo:'professional' },
]

const imgData = [
    { id: 1, imgSrc: life_img, linkTo:'life' },
    { id: 2, imgSrc: relationship_img, linkTo:'relations' },
    { id: 3, imgSrc: location_img, linkTo:'' },
]




function Esale() {
    const { owner } = useParams();
    return (
        <Box className="border">
            <Box className="esale_wrapper">
                <Box className="row">
                    <Box className="col">
                        <Box className="container">
                            <Button2 text="Back" redirectTo='../' />
                        </Box>
                        <Box className="container">
                            <Box className="header_board">
                                <Board text="E-sale" imgSrc={boardImg} />
                            </Box>
                        </Box>
                        <Box className="container" display="flex" justifyContent="flex-end">
                            <Button2 text="Next" redirectTo='../shops' />
                        </Box>
                    </Box>
                    <Box className="row_2">
                        <Box className="col">
                            <Box className="sub_col">
                                <Box className="profile_col">
                                    <Box component="img" src={female_user} alt="avatar" className='avatar' />
                                </Box>
                            </Box>
                            <Box className="sub_col cards">
                                <Box className="card">
                                    <Box className="card_bg_img" src={bg_img} alt="card_bg_img" component="img" />
                                    {data.map((item) => {
                                        return <Link className="card_body" key={item.id} to={item.linkTo}>
                                            <Typography className='title'>{item.title}</Typography>
                                            <Box component="img" src={item.imgSrc} alt="image" className='img' />
                                        </Link>
                                    })}

                                </Box>
                            </Box>
                        </Box>
                        <Box className="col">
                            <Box className="sub_col">
                                <Box className="life">
                                    {imgData.map((item)=>{
                                        return <Link to={item.linkTo} key={item.id}>
                                        <Box component="img" alt="img" src={item.imgSrc} className='img' />
                                    </Link>
                                    })}
                                    
                                </Box>
                            </Box>
                            <Box className="sub_col">
                                <Link to={`../${owner}/budget`}>
                                    <Box component="img" src={gif_1} className='shopping_gif' alt='shopping' />
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Esale