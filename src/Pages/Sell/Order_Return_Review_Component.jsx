import React from 'react'
import { Box, Typography } from '@mui/material'
import Button2 from '../../Components/Home/Button2'
import { Link, useParams } from 'react-router-dom'
import OrderDetails from './OrderDetails'
import ReturnDetails from './ReturnDetails'
import Review from './Review'
import reviewBg from '../../Utils/images/Sell/order_details/reviewBg.webp';

export default function Order_Return_Review_Component() {

  const { owner, action } = useParams();
  const order_id = "00045687";

  const renderHeading = () => {
    if (action === "order") {
      return "Order";
    }
    else if (action === "return") {
      return "Return";
    }
    else if (action === "review") {
      return "Review";
    }
  }

  const renderComponent = () => {
    if (action === "order") {
      return <OrderDetails />
    }
    else if (action === "return") {
      return <ReturnDetails />
    }
    else if (action === "review") {
      return <Review />
    }
  }


  const redirectNextPageTo = () =>{
    if(action==="order"){
      return `../${owner}/review`
    }else if(action === "return"){
      return `../${owner}/review`
    }else if(action === "review"){
      return `../${owner}/like-and-share`
    }
  }

  const redirectBackPageTo = () =>{
    if(action==="order"){
      return `../${owner}/products`
    }else if(action === "return"){
      return `../${owner}/order`
    }else if(action === "review"){
      return `../${owner}/order`
    }
  }

  return (
    <Box className="order_details_wrapper" sx={action == "review" ? { backgroundImage: `url(${reviewBg})` } : {}}>
      <Box className="row">
        <Box className="col">
          <Box className="container">
            <Button2 text="Back" redirectTo={redirectBackPageTo()} />
          </Box>
          <Box className="container">
            <Typography className='heading' variant='h2'>{renderHeading()}</Typography>
          </Box>
          <Box className="container" >
            <Button2 text="Next" redirectTo={redirectNextPageTo()}/>
          </Box>
        </Box>

        <Box className="col">
          <Box className="container"></Box>
          <Box className={`board_container ${action == 'review' && 'light'}`}>
            <Box className="board_pins">
              <Box className="circle"></Box>
              <Box className="circle"></Box>
            </Box>

            {
              renderComponent()
            }

            <Box className="board_pins">
              <Box className="circle"></Box>
              <Box className="circle"></Box>
            </Box>
          </Box>
          <Box className="container"></Box>

        </Box>
      </Box>

    </Box>
  )
}
