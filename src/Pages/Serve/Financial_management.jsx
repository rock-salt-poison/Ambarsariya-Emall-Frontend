import React from 'react'
import general_ledger from'../../Utils/images/Serve/emotional/eshop/financial_management/general_ledger.webp'
import accounts_payable from'../../Utils/images/Serve/emotional/eshop/financial_management/accounts_payable.webp'
import accounts_receivable from'../../Utils/images/Serve/emotional/eshop/financial_management/accounts_receivable.png'
import budgeting_and_forecasting from'../../Utils/images/Serve/emotional/eshop/financial_management/budgeting_and_forecasting.png'
import asset_management from'../../Utils/images/Serve/emotional/eshop/financial_management/asset_management.webp'
import financial_management_icon from '../../Utils/images/Serve/emotional/eshop/financial_management_icon.png'
import financial_management_icon2 from '../../Utils/images/Serve/emotional/eshop/financial_management_icon2.webp'
import CardsGrid from '../../Components/Serve/Unexpected/CardsGrid'
import { Box, Typography } from '@mui/material'
import Header from '../../Components/Serve/SupplyChain/Header'
import Button2 from '../../Components/Home/Button2'

function Financial_management() {

  const cards_data = [
    {id:1, imgSrc : general_ledger, title:'General Ledger', linkTo:'general-ledger'},
    {id:2, imgSrc : accounts_payable, title:'Accounts Payable', linkTo:'accounts-payable'},
    {id:3, imgSrc : accounts_receivable, title:'Accounts Receivable', linkTo:'accounts-receivable'},
    {id:4, imgSrc : budgeting_and_forecasting, title:'Budgeting and Forecasting', linkTo:'budgeting-and-forecasting'},
    {id:5, imgSrc : asset_management, title:'Asset Management', linkTo:'asset-management'},
  ]

  return (
    
    <Box className="financial_management_wrapper">
      <Box className="row">
      <Header 
            icon_1={financial_management_icon} 
            icon_2={financial_management_icon2} 
            title="Financial Management" 
            icon_1_link='../emotional/eshop' 
            icon_2_link='../emotional/eshop'
            redirectTo='../emotional/eshop' 
          />
        <Box className="col">
            <CardsGrid backLink="../unexpected/capture" nextLink="" cards_data={cards_data}/>
        </Box>  

        <Box className="col">
                <Button2 text="Back" redirectTo='../emotional/eshop/'/>
                <Button2 text="Next" redirectTo='../emotional/eshop/hr-management/'/>
            </Box>
      </Box>  
    </Box>
  )
}

export default Financial_management