import { Box, Typography } from '@mui/material'
import React from 'react'
import LoginForm from './LoginForm'
import { Link } from 'react-router-dom'

function LoginPageCard({title, imgSrc, backButton, redirectTo}) {
    
    const handleClick = () => {
      console.log('button clicked');
    }

  return (
    <Box className="card">
        {backButton}
        <Typography variant='h2' className='title'> 
            {title}
        </Typography>
        <Box className="form_container">
          <Link onClick={()=>handleClick}>
            <Box component="img" src={imgSrc} className="icon" alt="icon" />
          </Link>
            <LoginForm redirectTo={redirectTo}/>
        </Box>
    </Box>
  )
}

export default LoginPageCard