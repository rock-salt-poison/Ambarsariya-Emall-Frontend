import React from "react";

import assets from "../../Utils/images/Serve/emotional/eshop/financial_management/general_ledger/assets.webp";
import liabilities from "../../Utils/images/Serve/emotional/eshop/financial_management/general_ledger/liabilities.webp";
import equity from "../../Utils/images/Serve/emotional/eshop/financial_management/general_ledger/equity.webp";
import revenue from "../../Utils/images/Serve/emotional/eshop/financial_management/general_ledger/revenue.png";
import expenses from "../../Utils/images/Serve/emotional/eshop/financial_management/general_ledger/expenses.webp";
import gains_and_losses from "../../Utils/images/Serve/emotional/eshop/financial_management/general_ledger/gains_and_losses.webp";
import drawings_or_dividends from "../../Utils/images/Serve/emotional/eshop/financial_management/general_ledger/drawings_or_dividends.webp";

import financial_management_icon from "../../Utils/images/Serve/emotional/eshop/financial_management_icon.png";
import financial_management_icon2 from "../../Utils/images/Serve/emotional/eshop/financial_management_icon2.webp";
import CardsGrid from "../../Components/Serve/Unexpected/CardsGrid";
import { Box, Typography } from "@mui/material";
import Header from "../../Components/Serve/SupplyChain/Header";
import Button2 from "../../Components/Home/Button2";
import Assets_PopupContent from "../../Components/Serve/FinancialManagement/GeneralLedger/Assets/Assets_PopupContent";
import Liability_PopupContent from "../../Components/Serve/FinancialManagement/GeneralLedger/Liabilities/Liability_PopupContent";
import Equity_PopupContent from "../../Components/Serve/FinancialManagement/GeneralLedger/Equity/Equity_PopupContent";
import Revenue_PopupContent from "../../Components/Serve/FinancialManagement/GeneralLedger/Revenue/Revenue_PopupContent";
import Expenses_PopupContent from "../../Components/Serve/FinancialManagement/GeneralLedger/Expenses/Expenses_PopupContent";
import GainsAndLosses_PopupContent from "../../Components/Serve/FinancialManagement/GeneralLedger/GainsAnd_losses/GainsAndLosses_PopupContent";
import DrawingsOrDividends_PopupContent from "../../Components/Serve/FinancialManagement/GeneralLedger/DrawingsOrDividends/DrawingsOrDividends_PopupContent";
import UserBadge from "../../UserBadge";

function General_ledger() {
  const cards_data = [
    {
      id: 1,
      imgSrc: assets,
      title: "Assets",
      popupcontent: <Assets_PopupContent />,
    },
    {
      id: 2,
      imgSrc: liabilities,
      title: "Liabilities",
      popupcontent: <Liability_PopupContent/>,
    },
    {
      id: 3,
      imgSrc: equity,
      title: "Equity",
      popupcontent: <Equity_PopupContent />,
    },
    {
      id: 4,
      imgSrc: revenue,
      title: "Revenue",
      popupcontent: <Revenue_PopupContent />,
    },
    {
      id: 5,
      imgSrc: expenses,
      title: "Expenses",
      popupcontent: <Expenses_PopupContent />,
    },
    {
      id: 6,
      imgSrc: gains_and_losses,
      title: "Gains and Losses",
      popupcontent: 
        <GainsAndLosses_PopupContent />
      ,
    },
    {
      id: 7,
      imgSrc: drawings_or_dividends,
      title: "Drawings or Dividends",
      popupcontent: 
        <DrawingsOrDividends_PopupContent />
      ,
    },
  ];

  return (
    <Box className="general_ledger_wrapper">
      <Box className="row">
        <Header
          icon_1={financial_management_icon}
          icon_2={financial_management_icon2}
          title="Financial Management"
          span_value="General Ledger"
          icon_1_link="../emotional/eshop/financial-management"
          icon_2_link="../emotional/eshop/financial-management"
          redirectTo="../emotional/eshop/financial-management"
        />
        <Box className="col">
          <CardsGrid
            backLink="../unexpected/capture"
            nextLink=""
            cards_data={cards_data}
          />
        </Box>

        <Box className="col">
          {/* <Button2 text="Back" redirectTo='../emotional/eshop/financial-management'/>
          <Button2 text="Next" redirectTo='../emotional/eshop/financial-management/accounts-payable'/> */}
          <UserBadge
            handleBadgeBgClick={-1}
            handleLogin="../login"
            handleLogoutClick="../../"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default General_ledger;
