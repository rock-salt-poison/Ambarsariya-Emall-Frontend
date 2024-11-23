import React from 'react'

import revenue_projections from'../../Utils/images/Serve/emotional/eshop/financial_management/budgeting_and_forecasting/revenue_projections.webp'
import expenses from'../../Utils/images/Serve/emotional/eshop/financial_management/general_ledger/expenses.webp'
import profit_and_loss_statement from'../../Utils/images/Serve/emotional/eshop/financial_management/budgeting_and_forecasting/profit_and_loss_statement.png'
import cash_flow from'../../Utils/images/Serve/emotional/eshop/financial_management/budgeting_and_forecasting/cash_flow.webp'
import balance_sheet_forecast from'../../Utils/images/Serve/emotional/eshop/financial_management/budgeting_and_forecasting/balance_sheet_forecast.webp'
import scenario_analysis from'../../Utils/images/Serve/emotional/eshop/financial_management/budgeting_and_forecasting/scenario_analysis.webp'
import budget_variance_analysis from'../../Utils/images/Serve/emotional/eshop/financial_management/budgeting_and_forecasting/budget_variance_analysis.webp'
import financial_ratios_and_metrics from'../../Utils/images/Serve/emotional/eshop/financial_management/budgeting_and_forecasting/financial_ratios_and_metrics.png'
import kpis from'../../Utils/images/Serve/emotional/eshop/financial_management/budgeting_and_forecasting/kpis.webp'
import assumptions from'../../Utils/images/Serve/emotional/eshop/financial_management/budgeting_and_forecasting/assumptions.png'
import budget_approval_and_monitoring from'../../Utils/images/Serve/emotional/eshop/financial_management/budgeting_and_forecasting/budget_approval_and_monitoring.webp'
import departmental_budgets from'../../Utils/images/Serve/emotional/eshop/financial_management/budgeting_and_forecasting/departmental_budgets.png'
import financial_management_icon from '../../Utils/images/Serve/emotional/eshop/financial_management_icon.png'
import financial_management_icon2 from '../../Utils/images/Serve/emotional/eshop/financial_management_icon2.webp'
import CardsGrid from '../../Components/Serve/Unexpected/CardsGrid'
import { Box, Typography } from '@mui/material'
import Header from '../../Components/Serve/SupplyChain/Header'
import Button2 from '../../Components/Home/Button2'

function Budgeting_and_forecasting() {

  const cards_data = [
    {id:1, imgSrc : revenue_projections, title:'Revenue Projections'},
    {id:2, imgSrc : expenses, title:'Expense Projections'},
    {id:3, imgSrc : profit_and_loss_statement, title:'Profit & Loss Statement (P&L)'},
    {id:4, imgSrc : cash_flow, title:'Cash Flow Projections'},
    {id:5, imgSrc : balance_sheet_forecast, title:'Balance Sheet Forecast'},
    {id:6, imgSrc : scenario_analysis, title:'Scenario Analysis'},
    {id:7, imgSrc : budget_variance_analysis, title:'Budget Variance Analysis'},
    {id:8, imgSrc : financial_ratios_and_metrics, title:'Financial Ratios & Metrics'},
    {id:9, imgSrc : kpis, title:'Key Performance Indicators (KPIs)'},
    {id:10, imgSrc : assumptions, title:'Assumptions'},
    {id:11, imgSrc : budget_approval_and_monitoring, title:'Budget Approval and Monitoring'},
    {id:12, imgSrc : departmental_budgets, title:'Departmental Budgets'},
  ]

  return (
    
    <Box className="budgeting_and_forecasting_wrapper">
      <Box className="row">
      <Header 
            icon_1={financial_management_icon} 
            icon_2={financial_management_icon2} 
            title="Financial Management" 
            span_value="Budgeting and Forecasting"
            icon_1_link='../emotional/eshop/financial-management' 
            icon_2_link='../emotional/eshop' 
            redirectTo='../emotional/eshop/financial-management'
          />
        <Box className="col">
            <CardsGrid backLink="../unexpected/capture" nextLink="" cards_data={cards_data}/>
        </Box>  

        <Box className="col">
                <Button2 text="Back" redirectTo='../emotional/eshop/financial-management/accounts-receivable'/>
                <Button2 text="Next" redirectTo='../emotional/eshop/financial-management/asset-management'/>
            </Box>
      </Box>  
    </Box>
  )
}

export default Budgeting_and_forecasting