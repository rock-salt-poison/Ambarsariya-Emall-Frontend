import React from "react";
import vendor_information from "../../Utils/images/Serve/emotional/eshop/financial_management/accounts_payable/vendor_information.webp";
import invoices from "../../Utils/images/Serve/emotional/eshop/financial_management/accounts_payable/invoices.png";
import purchase_orders_po from "../../Utils/images/Serve/emotional/eshop/financial_management/accounts_payable/purchase_orders_po.webp";
import accounts_payable_ledger from "../../Utils/images/Serve/emotional/eshop/financial_management/accounts_payable/accounts_payable_ledger.png";
import gst_tax_reporting from "../../Utils/images/Serve/emotional/eshop/financial_management/accounts_payable/gst_tax_reporting.webp";
import approval_workflow from "../../Utils/images/Serve/emotional/eshop/financial_management/accounts_payable/approval_workflow.png";
import payment_processing from "../../Utils/images/Serve/emotional/eshop/financial_management/accounts_payable/payment_processing.png";
import credits_and_adjustments from "../../Utils/images/Serve/emotional/eshop/financial_management/accounts_payable/credits_and_adjustments.webp";
import aging_of_payable from "../../Utils/images/Serve/emotional/eshop/financial_management/accounts_payable/aging_of_payable.png";
import financial_management_icon from "../../Utils/images/Serve/emotional/eshop/financial_management_icon.png";
import financial_management_icon2 from "../../Utils/images/Serve/emotional/eshop/financial_management_icon2.webp";
import CardsGrid from "../../Components/Serve/Unexpected/CardsGrid";
import { Box, Typography } from "@mui/material";
import Header from "../../Components/Serve/SupplyChain/Header";
import Button2 from "../../Components/Home/Button2";
import Vendor_PopupContent from "../../Components/Serve/FinancialManagement/AccountsPayable/VendorInformation/Vendor_PopupContent";
import Invoices_PopupContent from "../../Components/Serve/FinancialManagement/AccountsPayable/Invoices/Invoices_PopupContent";
import PurchaseOrders_PopupContent from "../../Components/Serve/FinancialManagement/AccountsPayable/PurchaseOrders/PurchaseOrders_PopupContent";
import AccountsPayableLedger_PopupContent from "../../Components/Serve/FinancialManagement/AccountsPayable/AccountsPayableLedger/AccountsPayableLedger_PopupContent";
import GstTaxReporting_PopupContent from "../../Components/Serve/FinancialManagement/AccountsPayable/GstTaxReporting/GstTaxReporting_PopupContent";
import PaymentProcessing_PopupContent from "../../Components/Serve/FinancialManagement/AccountsPayable/PaymentProcessing/PaymentProcessing_PopupContent";
import CreditsAndAdjustments_PopupContent from "../../Components/Serve/FinancialManagement/AccountsPayable/CreditsAndAdjustments/CreditsAndAdjustments_PopupContent";
import AgingOfPayable_PopupContent from "../../Components/Serve/FinancialManagement/AccountsPayable/AgingOfPayable/AgingOfPayable_PopupContent";
import ApprovalWorkflow_PopupContent from "../../Components/Serve/FinancialManagement/AccountsPayable/ApprovalWorkflow/ApprovalWorkflow_PopupContent";

function Accounts_payable() {
  const cards_data = [
    {
      id: 1,
      imgSrc: vendor_information,
      title: "Vendor Information",
      popupcontent: <Vendor_PopupContent />,
      texturedSheet: true,
      iconSrc: vendor_information,
    },
    {
      id: 2,
      imgSrc: invoices,
      title: "Invoices",
      popupcontent: <Invoices_PopupContent />,
      texturedSheet: true,
      iconSrc: vendor_information,
    },
    {
      id: 3,
      imgSrc: purchase_orders_po,
      title: "Purchase Orders (PO)",
      popupcontent: <PurchaseOrders_PopupContent />,
      texturedSheet: true,
      iconSrc: purchase_orders_po,
    },
    {
      id: 4,
      imgSrc: accounts_payable_ledger,
      title: "Accounts Payable Ledger",
      popupcontent: <AccountsPayableLedger_PopupContent />,
      texturedSheet: true,
      iconSrc: accounts_payable_ledger,
    },
    {
      id: 5,
      imgSrc: gst_tax_reporting,
      title: "GST Tax Reporting",
      popupcontent: <GstTaxReporting_PopupContent />,
      texturedSheet: true,
      iconSrc: gst_tax_reporting,
    },
    { id: 6,  
      imgSrc: approval_workflow, 
      title: "Approval Workflow",
      popupcontent: <ApprovalWorkflow_PopupContent />,
      texturedSheet:true,
      iconSrc: approval_workflow,
    },
    {
      id: 7,
      imgSrc: payment_processing,
      title: "Payment Processing",
      popupcontent: <PaymentProcessing_PopupContent />,
      texturedSheet: true,
      iconSrc: payment_processing,
    },
    {
      id: 8,
      imgSrc: credits_and_adjustments,
      title: "Credits and Adjustments",
      popupcontent: <CreditsAndAdjustments_PopupContent />,
      texturedSheet: true,
      iconSrc: credits_and_adjustments,
    },
    {
      id: 9,
      imgSrc: aging_of_payable,
      title: "Aging of Payable",
      popupcontent: <AgingOfPayable_PopupContent />,
      texturedSheet: true,
      iconSrc: aging_of_payable,
    },
  ];

  return (
    <Box className="accounts_payable_wrapper">
      <Box className="row">
        <Header
          icon_1={financial_management_icon}
          icon_2={financial_management_icon2}
          title="Financial Management"
          span_value="Accounts Payable"
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
            redirectTo="../emotional/eshop/financial-management/general-ledger"
          />
          <Button2
            text="Next"
            redirectTo="../emotional/eshop/financial-management/accounts-receivable"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Accounts_payable;
