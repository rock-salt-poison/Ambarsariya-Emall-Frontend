import React from "react";

import customer_information from "../../Utils/images/Serve/emotional/eshop/financial_management/accounts_receivable/customer_information.webp";
import invoices from "../../Utils/images/Serve/emotional/eshop/financial_management/accounts_payable/invoices.png";
import sales_orders_payment from "../../Utils/images/Serve/emotional/eshop/financial_management/accounts_payable/purchase_orders_po.webp";
import accounts_receivable_ledger from "../../Utils/images/Serve/emotional/eshop/financial_management/accounts_payable/accounts_payable_ledger.png";
import aging_of_receivable from "../../Utils/images/Serve/emotional/eshop/financial_management/accounts_payable/aging_of_payable.png";
import credits_and_adjustments from "../../Utils/images/Serve/emotional/eshop/financial_management/accounts_payable/credits_and_adjustments.webp";
import write_offs_and_bad_debts from "../../Utils/images/Serve/emotional/eshop/financial_management/accounts_receivable/write_offs_and_bad_debts.png";
import approval_workflow from "../../Utils/images/Serve/emotional/eshop/financial_management/accounts_payable/approval_workflow.png";

import financial_management_icon from "../../Utils/images/Serve/emotional/eshop/financial_management_icon.png";
import financial_management_icon2 from "../../Utils/images/Serve/emotional/eshop/financial_management_icon2.webp";
import CardsGrid from "../../Components/Serve/Unexpected/CardsGrid";
import { Box } from "@mui/material";
import Header from "../../Components/Serve/SupplyChain/Header";
import Button2 from "../../Components/Home/Button2";
import CustomerInformation_Popup from "../../Components/Serve/FinancialManagement/AccountsReceivable/CustomerInformation/CustomerInformation_Popup";
import Invoices_Popup from "../../Components/Serve/FinancialManagement/AccountsReceivable/Invoices/Invoices_Popup";
import Sales_Popup from "../../Components/Serve/FinancialManagement/AccountsReceivable/SalesOrderPayment/Sales_Popup";
import AgingOfReceivableLedger_Popup from "../../Components/Serve/FinancialManagement/AccountsReceivable/AgingOfReceivableLedger/AgingOfReceivableLedger_Popup";
import AccountsReceivableLedger_PopupContent from "../../Components/Serve/FinancialManagement/AccountsReceivable/AccountsReceivableLedger/AccountsReceivableLedger_PopupContent";

function Accounts_receivable() {
  const cards_data = [
    {
      id: 1,
      imgSrc: customer_information,
      title: "Customer Information",
      popupcontent: <CustomerInformation_Popup />,
      texturedSheet: true,
      iconSrc: customer_information,
    },
    { id: 2, 
      imgSrc: invoices, 
      title: "Invoices",
      popupcontent: <Invoices_Popup />,
      texturedSheet: true,
      iconSrc: invoices,
     },
    { id: 3, 
      imgSrc: sales_orders_payment, 
      title: "Sales Orders Payment",
      popupcontent: <Sales_Popup />,
      texturedSheet: true,
      iconSrc: sales_orders_payment,
     },
    {
      id: 4,
      imgSrc: accounts_receivable_ledger,
      title: "Accounts Receivable Ledger",
      popupcontent: <AccountsReceivableLedger_PopupContent />,
      texturedSheet: true,
      iconSrc: accounts_receivable_ledger,
    },
    { id: 5, 
      imgSrc: aging_of_receivable, 
      title: "Aging of Receivable", 
      popupcontent: <AgingOfReceivableLedger_Popup />,
      texturedSheet: true,
      iconSrc: aging_of_receivable,
    },
    {
      id: 6,
      imgSrc: credits_and_adjustments,
      title: " Credits and Adjustments",
    },
    {
      id: 7,
      imgSrc: write_offs_and_bad_debts,
      title: "Write-offs and Bad Debts",
    },
    {
      id:8,
      imgSrc: approval_workflow, 
      title: "Approval Workflow",
    }
  ];

  return (
    <Box className="accounts_receivable_wrapper">
      <Box className="row">
        <Header
          icon_1={financial_management_icon}
          icon_2={financial_management_icon2}
          title="Financial Management"
          span_value="Accounts Receivable"
          icon_1_link="../emotional/eshop/financial-management"
          icon_2_link="../emotional/eshop"
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
          <Button2
            text="Back"
            redirectTo="../emotional/eshop/financial-management/accounts-payable"
          />
          <Button2
            text="Next"
            redirectTo="../emotional/eshop/financial-management/budgeting-and-forecasting"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Accounts_receivable;
