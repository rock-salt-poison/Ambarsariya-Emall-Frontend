import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import Button2 from '../../../Components/Home/Button2'
import online_shopping from '../../../Utils/images/Serve/emotional/online_shopping.webp';
import analytics from '../../../Utils/images/Serve/emotional/analytics.webp';
import crm from '../../../Utils/images/Serve/emotional/crm_member.webp';
import campaign from '../../../Utils/images/Serve/emotional/campaign.webp';
import frame from '../../../Utils/images/Serve/emotional/frame.webp';
import { Link, useNavigate } from 'react-router-dom';
import arrow_gif from '../../../Utils/gifs/arrow.gif'; 
import hornSound from '../../../Utils/audio/horn-sound.mp3';

function EmotionalMember() {
    const navigate = useNavigate();
    const [ audio ] = useState(new Audio(hornSound));
    const data = [
        { id: 1, imgSrc: online_shopping, alt: 'online shopping', linkTo: 'eshop' },
        { id: 2, imgSrc: arrow_gif, alt: 'arrow', optionalCname:'arrow' },
        { id: 3, imgSrc: analytics, alt: 'analytics', linkTo: 'analytics' },
        { id: 4, imgSrc: crm, alt: 'crm', linkTo: 'crm' },
        { id: 5, imgSrc: arrow_gif, alt: 'arrow', optionalCname:'arrow rotate180' },
        { id: 6, imgSrc: campaign, alt: 'campaign', linkTo: 'campaign' },
    ];
    
    const handleClick = (e, linkTo) => {
        const target = e.target.closest(".title_container") || e.target.closest(".img_link");
        
        if (target) {
            target.classList.add('reduceSize3');
            audio.play();
            
            setTimeout(() => {
                target.classList.remove('reduceSize3');
            }, 300);
            setTimeout(() => {
                if (linkTo) {
                    navigate(linkTo);
                }else{
                    navigate('../')
                }
            }, 600);
        }
    };

    return (
        <Box className="emotional_wrapper member">
            <Box className="row">
                <Box className="col">
                    <Button2 text="Back" redirectTo="../" />
                    <Box className="title_container d-lg-none">
                        <Box component="img" src={frame} alt="frame" className='frame' />
                        <Link className="heading" onClick={(e)=>handleClick(e)}>
                            <Typography className="title">Emotional</Typography>
                        </Link>
                    </Box>
                    <Button2 text="Next" redirectTo="../unexpected" />
                </Box>
                <Box className="container">
                    <Box className="col">
                        {data.slice(0, 3).map((item) => {
                            return <Link key={item.id} className="img_link" onClick={(e)=> handleClick(e,item.linkTo)}>
                                <Box component="img" src={item.imgSrc} alt={item.alt} className={item.optionalCname ? item.optionalCname :'img'} />
                            </Link>
                        })}
                    </Box>
                    <Box className="col title_col">
                        <Box component="img" src={arrow_gif} alt="arrow" className='arrow rotate270' />
                        <Box className="title_container d-sm-none">
                            <Box component="img" src={frame} alt="frame" className='frame' />
                            <Link className="heading" onClick={(e)=>handleClick(e)}>
                                <Typography className="title">Emotional</Typography>
                            </Link>
                        </Box>
                        <Box component="img" src={arrow_gif} alt="arrow" className='arrow rotate90' />
                    </Box>
                    <Box className="col">
                        {data.slice(3, 6).map((item) => {
                            return <Link key={item.id} className="img_link" onClick={(e)=> handleClick(e,item.linkTo)}>
                                <Box component="img" src={item.imgSrc} alt={item.alt} className={item.optionalCname ? item.optionalCname : 'img'} />
                            </Link>
                        })}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default EmotionalMember