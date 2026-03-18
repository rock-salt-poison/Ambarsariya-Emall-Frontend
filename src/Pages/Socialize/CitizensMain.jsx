import React from 'react'
import { Box, Typography } from '@mui/material'
import UserBadge from '../../UserBadge'
import exit from '../../Utils/images/Socialize/citizens_main/exit_icon.svg'
import { useNavigate } from 'react-router-dom'

function CitizensMain() {
    const navigate = useNavigate();
    
    const data = [
        {id:1, type:'text', title: 'Socialize Community', link:'socialize-community'},
        {id:2, type:'text', title: 'Trigger Element', link:'trigger_element'},
        {id:3, type:'img', imgSrc: exit, link:'exit'},
        {id:4, type:'text', title: 'Shopping', link:'shopping'},
    ]

    const handleClick = (e, link) => {
        e.preventDefault();
        const target = e.currentTarget;
        if (!target) return;

        target.classList.add('reduceSize3');
        setTimeout(() => {
            target.classList.remove('reduceSize3');
        }, 300);

        setTimeout(() => {
            if (link === 'exit') {
                navigate(-1);
            } else {
                navigate(link);
            }
        }, 600);
    }
  return (
    <Box className="citizen_main_wrapper">
        <Box className="row">
            <Box className="col">
                <UserBadge
                    handleLogoutClick="../../"
                    handleBadgeBgClick={-1}
                    handleLogin="login"
                />
            </Box>

            <Box className="col">
                <Box className="card_container">
                    {data?.map((item, index)=>{
                        return <Box 
                            className="card" 
                            key={index}
                            onClick={(e) => handleClick(e, item.link)}
                            sx={{ cursor: 'pointer' }}
                        >
                            {item.type === 'text'? <Typography className="text">{item.title}</Typography> : <Box component="img" src={item.imgSrc} className="img" alt="exit"/>}
                        </Box>
                    })}
                </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default CitizensMain