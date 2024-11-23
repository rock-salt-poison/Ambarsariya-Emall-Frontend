import React from 'react'
import { Box, Typography } from '@mui/material';
import {Link} from 'react-router-dom';


 function Buttons(props){

    return(
        <Box className={props.cName}>
            <Box component='img' src={props.imgSrc} alt={props.alt}  />
            <Link onClick={props.handleClickFunction}>
                <Typography variant="p" component="p">
                    {props.text}
                </Typography>
            </Link>

        </Box>
    )
}
export default Buttons