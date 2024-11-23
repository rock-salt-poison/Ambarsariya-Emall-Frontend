import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import Button2 from '../../../Components/Home/Button2'
import fun from '../../../Utils/images/Serve/emotional/eshop_member/fun.webp';
import diet_plan from '../../../Utils/images/Serve/emotional/eshop_member/diet_plan.webp';
import e_members from '../../../Utils/images/Serve/emotional/eshop_member/e_members.webp';
import soul from '../../../Utils/images/Serve/emotional/eshop_member/soul.webp';
import life from '../../../Utils/images/Serve/emotional/eshop_member/life.webp';

import { Link, useNavigate } from 'react-router-dom';
import hornSound from '../../../Utils/audio/horn-sound.mp3';

function EshopMember() {
    const navigate = useNavigate();
    const [ audio ] = useState(new Audio(hornSound));

    const data = [
        { id: 1, imgSrc: fun, alt: 'fun', linkTo: '' },
        { id: 2, imgSrc: diet_plan, alt: 'diet-plan', linkTo:'diet-plan', optionalCname:'align-end'},
        { id: 3, imgSrc: e_members, alt: 'e-members', optionalCname:'w-100', linkTo:'../emotional'},
        { id: 4, imgSrc: soul, alt: 'soul', linkTo: 'soul'},
        { id: 5, imgSrc: life, alt: 'life', linkTo: 'jobs-offered', optionalCname:'align-end'},
    ];
    
    const handleClick = (e, linkTo) => {
        const target = e.target.closest(".img_link");
        
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
        <Box className="eshop_member_wrapper">
            <Box className="row">
                <Box className="col">
                    <Button2 text="Back" redirectTo="../" />
                    <Button2 text="Next" redirectTo="" />
                </Box>
                <Box className="container">
                    <Box className="col">
                        {data.map((item) => {
                            return <Link key={item.id} className={`${item.optionalCname} img_link`} onClick={(e)=>handleClick(e, item.linkTo)}>
                                <Box component="img" src={item.imgSrc} alt={item.alt} className={`${item.optionalCname} img`} />
                            </Link>
                        })}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default EshopMember