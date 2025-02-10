import React from 'react'
import { Box, Typography } from '@mui/material'
import Button2 from '../../Components/Home/Button2';
import conversation_1 from '../../Utils/images/Sell/grab/conversation_1.svg'
import conversation_2 from '../../Utils/images/Sell/grab/conversation_2.svg'
import conversation_3 from '../../Utils/images/Sell/grab/conversation_3.svg'
import conversation_4 from '../../Utils/images/Sell/grab/conversation_4.svg'
import teenagers_whispering_secrete from '../../Utils/images/Sell/grab/teenagers_whispering_secrete.svg'
import man_and_women_friendly_conversation from '../../Utils/images/Sell/grab/man_and _women_friendly_conversation.svg'
import be_kind_to_everyone from '../../Utils/images/Sell/grab/be_kind_to_everyone.svg'
import { useSelector } from 'react-redux';
import UserBadge from '../../UserBadge';
import { Link } from 'react-router-dom';

function GrabConversationPage() {
    const token = useSelector((state) => state.auth.userAccessToken);

    return (
    <Box className="grab_conversation_wrapper" >
        <Box className="row">
            <Box className="col">
                <UserBadge
                    handleBadgeBgClick="../"
                    handleLogin="../login"
                    handleLogoutClick="../../AmbarsariyaMall"
                    />
            </Box>

            <Box className="col">
                <Box className="img_container">
                    <Box component="img" src={conversation_1} className="conversation" alt="Second hand" />
                    <Box component="img" src={teenagers_whispering_secrete} className="conversation" alt="Second hand" />
                    <Box component="img" src={conversation_2} className="conversation" alt="Second hand" />
                </Box>
                <Box className="img_container">
                <Box component="img" src={conversation_3} className="conversation" alt="Second hand" />
                <Box component="img" src={man_and_women_friendly_conversation} className="conversation" alt="Second hand" />
                <Link to='../user'><Box component="img" src={conversation_4} className="conversation" alt="Second hand" /></Link>
                </Box>
            </Box>

            <Box className="col">
                <Box component="img" src={be_kind_to_everyone} className="growImg" alt="Second hand" />
            </Box>
        </Box>
    </Box>
  )
}

export default GrabConversationPage