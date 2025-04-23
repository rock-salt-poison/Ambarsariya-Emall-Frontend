import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Button2 from '../Components/Home/Button2';
import paint_stroke from '../Utils/images/Socialize/paint_stroke.webp';
import { Link, useNavigate } from 'react-router-dom';
import hornSound from '../Utils/audio/horn-sound.mp3';
import { useSelector } from 'react-redux';
import UserBadge from '../UserBadge';

function Socialize() {
  const [audio] = useState(new Audio(hornSound));
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.userAccessToken);
  // const [userIcon, setUserIcon] = useState(null);

  const items = [
    {id:1, title:'Updates', linkTo:'', cName:'updates'},
    {id:2, title:'Feeds', linkTo:'', cName:'feeds'},
    {id:3, title:'Junction', linkTo:'', cName:'junction'},
    {id:4, title:'Banners', linkTo:'', cName:'banners'},
  ]


  const handleClick = (e, item) =>{
    const target = e.target.closest(".updates, .feeds, .junction, .banners, .citizens");
    if(target){
        target.classList.toggle('reduceSize3');
        audio.play();
        
        setTimeout(()=>{
            target.classList.toggle('reduceSize3');
        },300)

        // setTimeout(()=>{
        //     if(target.classList.contains('emotional')){
        //         navigate('../emotional')
        //     }
        //     else if(target.classList.contains('unexpected')){
        //         navigate('../unexpected')
        //     }
        //     else if(target.classList.contains('simple')){
        //         navigate('../simple')
        //     }
        // }, 600)
    }
}

  return (
    <Box className="socialize_wrapper">
      <Box className="row">
        <Box className="col">
          <Box></Box>
          <Box className="heading_col">
               <Typography className="heading" variant='h2'>Socialize</Typography> 
          </Box>
          <Box className="back-button-wrapper">
            <UserBadge
              handleLogoutClick="../../AmbarsariyaMall"
              handleBadgeBgClick={-1}
              handleLogin="login"
            />
          </Box>
        </Box>
        <Box className="col">
            <Box className="col_2">
              {items.slice(0,2)?.map((item)=>{
                return <Link key={item.id} className={`${item.cName} item`} onClick={(e)=>handleClick(e, item)}>
                <Box component="img" src={paint_stroke} alt="bg" className='item_bg'/>
                <Box className="title_container">
                  <Typography className='title'>{item.title}</Typography>
                </Box>
              </Link> 
              })}
            </Box>
            <Box className="col-auto">
              <Link className="heading_col citizens" onClick={(e)=> handleClick(e)} >
                <Typography className="heading citizens" variant='h3'>Citizens</Typography> 
              </Link>
            </Box>

            <Box className="col_2">
            {items.slice(2)?.map((item)=>{
                return <Link key={item.id} className={`${item.cName} item`} to={item.linkTo} onClick={(e)=> handleClick(e, item)}>
                <Box component="img" src={paint_stroke} alt="bg" className='item_bg'/>
                <Box className="title_container">
                  <Typography className='title'>{item.title}</Typography>
                </Box>
              </Link> 
              })}
            </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Socialize;
