import React from 'react'
import { Box, Typography } from '@mui/material'
import card_bottom_img from '../../../Utils/images/Sell/user_portfolio/card_bottom_img.png'
import card_top_img from '../../../Utils/images/Sell/user_portfolio/card_top_img.png'
import RoutineCardHeader from './RoutineCardHeader'
import MorningData from './MorningData'
import Notification from './Notification'
import diet_planning_icon from '../../../Utils/images/Sell/user_portfolio/diet_planning_icon.png'
import location_pin from '../../../Utils/images/Sell/user_portfolio/location_pin_icon.svg'

function Card() {
    return (
        <Box className="right_wrapper">
            <Box className="routine_card">
                <Box component="img" src={card_top_img} className="card_top" alt="image" />
                <Box className="card_middle">
                    <RoutineCardHeader text="Morning" routineText={"true"} />

                    <Box className="details">
                        <MorningData heading="Wake up time" component="clock" />
                        <MorningData heading="Hit road time" component="clock" />
                        <MorningData heading="Location reached" component="location" />
                    </Box>
                </Box>
                <Box component="img" src={card_bottom_img} className="card_bottom" alt="image" />


            </Box>
            <Box className="routine_card">
                <Box component="img" src={card_top_img} className="card_top" alt="image" />
                <Box className="card_middle">
                    <RoutineCardHeader text="Lunch" routineText={"true"} />

                    <Box className="details">
                        <MorningData heading="Mark Location" component="location" />
                        <MorningData heading="Diet Planning" component="link" linkText="Enter stats" linkIcon={diet_planning_icon}/>
                        <MorningData heading="Hit road time" component="clock" />
                        <MorningData heading="Location reached" component="location" />
                    </Box>
                </Box>
                <Box component="img" src={card_bottom_img} className="card_bottom" alt="image" />
            </Box>

            <Box className="routine_card">
                <Box component="img" src={card_top_img} className="card_top" alt="image" />
                <Box className="card_middle">
                    <RoutineCardHeader text="Coffee Break" routineText={"true"} />
                    <Box className="details">
                        <MorningData heading="Location Mapping" component="link" linkText="Location" linkIcon={location_pin}/>
                        <MorningData heading="Hit road time" component="clock" />

                        <Notification text="Daily Shopping for day needs, Memo-prices, nearby-discount." number="1" />
                        {/* <Typography className='heading'>C</Typography> */}
                        <Notification text="Integrate your account with DigiLocker and get the benefits of postpaid services." number="2" />
                    </Box>
                </Box>
                <Box component="img" src={card_bottom_img} className="card_bottom" alt="image" />
            </Box>

            <Box className="routine_card">
                <Box component="img" src={card_top_img} className="card_top" alt="image" />
                <Box className="card_middle">
                    <RoutineCardHeader text="Details" routineText={"false"} />

                    <Box className="details">
                        <Notification text="Services section (Aadhaar, Digilocker, KYC, Insurance, Bank UPI, integrate for finacial constraints)" number="2" />
                        <Notification text="Gmail services for avoid heavy traffic,parking as a Appointment." number="2" />
                        <Notification text="Youtube/Instagram/Facebook or any  Social media network can be connected to the network society catalog which is known as Socialize." number="2" />
                        {/* <Notification text="Location Reached" number="2" /> */}
                    </Box>

                </Box>
                <Box component="img" src={card_bottom_img} className="card_bottom" alt="image" />
            </Box>
        </Box>
    )
}

export default Card