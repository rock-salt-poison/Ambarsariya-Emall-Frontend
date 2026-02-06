import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import UserBadge from '../../UserBadge'
import co_helpers from '../../Utils/images/Socialize/city_junctions/co_helpers.webp'  
import work_from_home from '../../Utils/images/Socialize/city_junctions/work_from_home.webp'  
import connect_with_utilities from '../../Utils/images/Socialize/city_junctions/connect_with_utilities.webp'  
import sales_mount from '../../Utils/images/Socialize/city_junctions/sales_mount.webp'  
import info from '../../Utils/images/Socialize/city_junctions/info.png'  
import road from '../../Utils/images/Socialize/city_junctions/road.png'  
import { Link, useNavigate } from 'react-router-dom'
import hornSound from '../../Utils/audio/horn-sound.mp3';

function CityJunctions() {

    const cards = [
        {id:1, title:'Co-Helpers', linkTo:'', img_src: co_helpers, cName:'co_helpers'},
        {id:2, title:'Work From Home', linkTo:'', img_src: work_from_home, cName:'work_from_home'},
        {id:3, title:'Connect with utilities', linkTo:'', img_src: connect_with_utilities, cName:'connect_with_utilities'},
        {id:4, title:'Sales Mount', linkTo:'', img_src: sales_mount, cName:'sales_mount'},
    ]

    const navigate = useNavigate();
    const [audio] = useState(new Audio(hornSound));

    const handleClick = (e, item) =>{
        const title = e.target.closest(".title");
        const target = e.target.closest(".image");
        const icon = e.target.closest(".icon");
        if(target){
            target.classList.toggle('reduceSize3');
            audio.play();
            
            setTimeout(()=>{
                target.classList.toggle('reduceSize3');
            },300)
    
            setTimeout(()=>{
                if(target.classList.contains('co_helpers')){
                    navigate('../city-junctions/co-helpers')
                }else if(target.classList.contains('work_from_home')){
                    navigate('../city-junctions/jobs-offered')
                }else if(target.classList.contains('connect_with_utilities')){
                    navigate('../city-junctions/utilities-main')
                }
            }, 600)
        }else if(title){
            title.classList.toggle('reduceSize3');
            audio.play();
            
            setTimeout(()=>{
                title.classList.toggle('reduceSize3');
            },300)
    
            setTimeout(()=>{
                // if(target.classList.contains('work_from_home')){
                    navigate('../../socialize')
                // }
            }, 1000)
        }else if(icon){
            icon.classList.toggle('reduceSize3');
            audio.play();
            
            setTimeout(()=>{
                icon.classList.toggle('reduceSize3');
            },300)
    
            setTimeout(()=>{
                // if(target.classList.contains('work_from_home')){
                    navigate('../city-junctions/terms-and-conditions')
                // }
            }, 1000)
        }
    }

    return (
        <Box className="city_junctions_wrapper">
            <Box className="row">
                <Box className="col">
                    <Link className='icon_container' onClick={(e)=>handleClick(e)}>
                        <Box component="img" src={info} alt="icon" className='icon'/>
                    </Link>

                    <Box className="title_container">
                        <Link onClick={(e)=>handleClick(e)} className='title_link'>
                            <Typography className="title">
                                City Junction
                            </Typography>
                        </Link>
                    </Box>

                    <UserBadge
                        handleLogoutClick="../../"
                        handleBadgeBgClick={-1}
                        handleLogin="login"
                    />
                </Box>

                <Box className="col">
                    {cards?.map((card, index)=> <Box className="card" key={index}>
                        <Link className="image_main_container" onClick={(e)=>handleClick(e)}>
                            <Box className="image_wrapper">
                                <Box component="img" src={card?.img_src} alt={card?.title} className={`${card?.cName} image`}/>
                            </Box>
                        </Link>
                        <Box className="container">
                            <Box component="img" src={road} alt="road" className="road"/>
                            <Box className="heading">
                                <Typography className="text" variant='h3'>{card?.title}</Typography>
                            </Box>
                        </Box>
                    </Box> )}
                </Box>
                
                
            </Box>
        </Box>
    )
}

export default CityJunctions