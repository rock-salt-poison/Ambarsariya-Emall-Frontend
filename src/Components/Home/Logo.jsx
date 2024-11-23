import logo from '../../Utils/images/logo.webp'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom';

export default function Logo(props){
    return(
        <Box className="logoParent">
            <Link onClick={props.handleClickFunction} className='logo'> 
                <Box component='img' src={logo}></Box>
            </Link>
        </Box>
    )
}