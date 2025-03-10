import React from "react"
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom';

function Boards(props) {
  return (
    <Link className={props.parentClassName} to="" onClick={props.handleClick}>
        <Box component='img' src={props.imgSrc} alt={props.alt} className={props.imgClassName}/>
        <Typography>{props.text}</Typography>
    </Link>
  )
}

export default Boards