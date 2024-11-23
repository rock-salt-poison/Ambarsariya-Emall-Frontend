import React, {useState} from 'react'
import { Box } from '@mui/material'
import ledBoard from '../../Utils/images/led-board.webp'
import Marquee from './MarqueeComponent';

function LEDNotice() {
    const val = 'Ambarsariya mall "An Ultimate place for your local shop to World Wide Market".';

    const [notice, setNotice] = useState(val);

    return ( 
        <Box className='ledNoticeParent'>
            <Box component='img' src={ledBoard} alt="LED-board" className='ledBoardImg' />
            <Box className='content'>
                
                <Marquee text={notice} speed='60'/>
            </Box>
        </Box>
    )
}

export default LEDNotice