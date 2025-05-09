import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button2 from '../../Home/Button2'
import UserBadge from '../../../UserBadge';

function Header({ icon_1, icon_2, title, span_value, icon_1_link, icon_2_link, back_btn_link, next_btn_link, title_container, heading_with_bg, redirectTo, iconWithHeading, nextBtn=true }) {

  const navigate = useNavigate();
  
  const handleRedirect = () => {
    setTimeout(()=>{navigate(redirectTo)},200)
  }

  return (
    <Box className="col header_badge">
      {
        icon_1 ?
          <Link to={icon_1_link} className='icon_link'>
            <Box component="img" src={icon_1} alt="suppliers_for_shop" className='icon' />
          </Link>
          :
          <Box className='col-1'></Box>
      }

      {title_container ?
        <Box className="title_container">
            <Link onClick={handleRedirect}>
            {iconWithHeading && <Box component="img" src={iconWithHeading} className='icon' alt="icon"/>}
              <Typography className="title">{title}</Typography>
            </Link>
        </Box>
        : heading_with_bg ? <Box className="title_container">
          <Box className="heading">
          <Link onClick={handleRedirect}>
            <Typography className="title">{title}</Typography>
            </Link>
          </Box>
        </Box> :
          <Box className="heading_container">
            <Link onClick={handleRedirect}>
            <Typography className="heading" variant='h2'>
              {title}
            </Typography>
            </Link>
            {span_value ? <Typography variant='span' className="span">
              {span_value}
            </Typography> : <Typography variant='span' className="span">
              Shop No: <Typography className="value" variant='span'>0001</Typography>
            </Typography>}
          </Box>
      }

      {
        icon_2 ? <Link to={icon_2_link} className='icon_link'>
          <Box component="img" src={icon_2} alt="icon" className='icon' />
        </Link> : nextBtn ?  <UserBadge
                            handleBadgeBgClick={back_btn_link}
                            handleLogin="../login"
                            handleLogoutClick="../../AmbarsariyaMall"
                        /> : <Typography></Typography>
      }

    </Box>

  )
}

export default Header