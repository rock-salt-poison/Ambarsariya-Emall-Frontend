import React from 'react'
import { Box, Typography } from '@mui/material'
import Button2 from '../../Components/Home/Button2';
import conversation_1 from '../../Utils/images/Sell/grow/conversation_1.svg'
import conversation_2 from '../../Utils/images/Sell/grow/conversation_2.svg'
import conversation_3 from '../../Utils/images/Sell/grow/conversation_3.svg'
import conversation_4 from '../../Utils/images/Sell/grow/conversation_4.svg'
import conversation_5 from '../../Utils/images/Sell/grow/conversation_5.svg'
import conversation_6 from '../../Utils/images/Sell/grow/conversation_6.svg'
import success_quote from '../../Utils/images/Sell/grow/success_quote.webp'
import Logo from '../../Components/Logo';
import { Link, useNavigate } from 'react-router-dom';

function GrowConversationPage() {

    const imgs = [
        {id:1,src:conversation_1, alt:"Ambarsariya Mall" },
        {id:2,src:conversation_2, alt:"Ambarsariya Mall" },
        {id:3,src:conversation_3, alt:"Ambarsariya Mall" },
        {id:4,src:conversation_4, alt:"Ambarsariya Mall" },
        {id:5,src:conversation_5, alt:"Ambarsariya Mall" },
        {id:6,src:conversation_6, alt:"Ambarsariya Mall" },
    ];

    const navigate = useNavigate();

    const handleClick = (e) => {
        const target = e.target.closest('.heading');
        if(target){
            target.parentElement.classList.add('reduceSize3');

            setTimeout(()=>{target.parentElement.classList.remove('reduceSize3')}, 300);
            setTimeout(()=>{navigate('../')}, 600);
        }
    }

    return (
    <Box className="grow_conversation_wrapper" >
        <Box className="row">
            <Box className="col">
                <Button2 text="Back" redirectTo="../" optionalcName='d-sm-none'/>
                <Link onClick={(e)=>handleClick(e)}><Typography variant='h2' className='heading'> Book Your E-shop</Typography></Link>
                <Button2 text="Next" redirectTo="../coupon-offering" optionalcName='d-sm-none'/>
            </Box>

            <Box className="container">
                <Box className="col">
                    {imgs.slice(0,3).map((img)=> <Box key={img.id} component="img" src={img.src} className="growImg" alt={img.alt} />)}                
                </Box>
                <Box className="col">
                    {imgs.slice(3).map((img)=> <Box key={img.id} component="img" src={img.src} className="growImg" alt={img.alt} />)}                
                </Box>
            </Box>
            <Box className="col quote">
                <Box component="img" src={success_quote} className="success_quote" alt="success" />
                <Button2 text="Back" redirectTo="/AmbarsariyaMall/sell" optionalcName="d-lg-none" />
                <Button2 text="Next" redirectTo="../coupon-offering" optionalcName="d-lg-none" />
            </Box>
        </Box>
    </Box>
  )
}

export default GrowConversationPage