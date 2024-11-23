import { Box, ThemeProvider } from '@mui/material'
import React from 'react'
import Button2 from '../../Components/Home/Button2'
import Board from '../../Components/CouponOffering/Board'
import boardImg from '../../Utils/images/Sell/eshop/board.svg'
import EshopForm from '../../Components/Form/EshopForm'
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';


function Eshop(props) {
  const themeProps = {
    popoverBackgroundColor: props.popoverBackgroundColor || 'var(--pink2)',
};

const theme = createCustomTheme(themeProps);
  return (
    <ThemeProvider theme={theme}>
    <Box className="eshop_wrapper">
      <Box className="row">
        <Box className="col">
          <Button2 text="Back" redirectTo="/AmbarsariyaMall/sell" />
          <Box className="header_board">
            <Board text="E-shop" imgSrc={boardImg} />
          </Box>
          <Box></Box>
        </Box>
        <Box className="col">
        <Box></Box>
        <Box className="container">
          <Box className="child">
            <EshopForm/>
          </Box>
        </Box>
        <Box></Box>
        </Box>
      </Box>
    </Box>
    </ThemeProvider>
  )
}

export default Eshop