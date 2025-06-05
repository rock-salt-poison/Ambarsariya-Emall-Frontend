import { Navigate, Route, Routes } from "react-router-dom";
import Serve from "../Pages/Serve";
import Emotional from "../Pages/Serve/Emotional";
import Campaign from "../Pages/Serve/Campaign";
import Job from "../Pages/Serve/Job";
import Jobs_offered from "../Pages/Serve/Jobs_offered";
import Community from "../Pages/Serve/Community";
import Discussion from "../Pages/Serve/Discussion";
import Votes from "../Pages/Serve/Votes";
import Eshop from "../Pages/Serve/Eshop";
import HR_management from "../Pages/Serve/HR_management";
import Suppliers_for_shop from "../Pages/Serve/Suppliers_for_shop";
import Supply_chain_sale_order from "../Pages/Serve/Supply_chain_sale_order";
import Supply_chain_management from "../Pages/Serve/Supply_chain_management";
import Analytics from "../Pages/Serve/Analytics";
import Forecast from "../Pages/Serve/Forecast";
import Stock_management from "../Pages/Serve/Stock_management";
import Stock_level from "../Pages/Serve/Stock_level";
import Stock_reports from "../Pages/Serve/Stock_reports";
import CRM from "../Pages/Serve/CRM";
import Unexpected from "../Pages/Serve/Unexpected";
import LeadGeneration from "../Pages/Serve/LeadGeneration";
import Capture from "../Pages/Serve/Capture";
import Suggestions from "../Pages/Serve/Suggestions";
import Confirmation from "../Pages/Serve/Confirmation";
import Suppliers_for_shop2 from "../Pages/Serve/Suppliers_for_shop2";
import Suppliers_for_shop3 from "../Pages/Serve/Suppliers_for_shop3";
import Financial_management from "../Pages/Serve/Financial_management";
import General_ledger from "../Pages/Serve/General_ledger";
import Accounts_payable from "../Pages/Serve/Accounts_payable";
import Accounts_receivable from "../Pages/Serve/Accounts_receivable";
import Budgeting_and_forecasting from "../Pages/Serve/Budgeting_and_forecasting";
import MerchantCampaign from "../Pages/Serve/MerchantCampaign";
import { useEffect, useState } from "react";
import CustomerRecords from "../Pages/Serve/CustomerRecords";
import MemberGroupCreation from "../Pages/Serve/MemberGroupCreation";
import SalesPipeline from "../Pages/Serve/SalesPipeline";
import MarketingCampaigns from "../Pages/Serve/MarketingCampaigns";
import Login from "../Pages/Serve/Login";
import Overheads from "../Pages/Serve/Analytics_Merchant/Overheads";
import MarketPrice from "../Pages/Serve/Analytics_Merchant/MarketPrice";
import StockAlarm from "../Pages/Serve/Analytics_Merchant/StockAlarm";
import ForecastMarketPrice from "../Pages/Serve/Analytics_Merchant/ForecastMarketPrice";
import EmotionalMember from "../Pages/Serve/Member/EmotionalMember";
import EshopMember from "../Pages/Serve/Member/EshopMember";
import Budget from "../Pages/Sell/Budget";
import MemberRelations from "../Pages/Sell/MemberRelations";
import DietPlan from "../Pages/Serve/Member/DietPlan";
import { useSelector } from "react-redux";
import { getUser } from "../API/fetchExpressAPI";
import Simple from "../Pages/Serve/Simple";
import { Box, CircularProgress } from "@mui/material";

export default function ServeRoutes() {
  const token = useSelector((state) => state.auth.userAccessToken);
  const [checkUser, setCheckUser] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserType = async () => {
      if (token) {
        try {
          setLoading(true);
          const user_type = (await getUser(token))[0].user_type;

          if (user_type) {
            setCheckUser(user_type);
            console.log(user_type);
          }
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUserType();
  }, [token]);

  const ProtectedRoute = ({ shopElement, memberElement }) => {
      if (loading) {
        return (
          <Box className="loading">
            <CircularProgress />
          </Box>
        );
      }
  
      if (checkUser === "shop") {
        return shopElement;
      } else if (checkUser === "member") {
        return memberElement;
      } 
    };
  

  return (
    <Routes>
      <Route path="/" element={<Serve /> } />
      <Route path="/login" element={<Login />} />
      <Route
        path="/emotional"
        element={
          <ProtectedRoute
            shopElement={<Emotional />}
            memberElement={<EmotionalMember />}
          />
        }
      />
      <Route
        path="/unexpected"
        element={
          <ProtectedRoute
            shopElement={<Unexpected />}
            memberElement={<Unexpected />}
          />
        }
      />
      <Route
        path="/simple"
        element={
         <ProtectedRoute
            shopElement={<Simple />}
            memberElement={<Simple />}
          />
        }
      />
      <Route
        path="/emotional/campaign"
        element={
         <ProtectedRoute
            shopElement={<MerchantCampaign />}
            memberElement={<Campaign />}
          />
        }
      />

      <Route path="/emotional/campaign/job" element={<ProtectedRoute
            shopElement={<Job />}
            memberElement={<Job />}
          />} />
      <Route path="/emotional/community" element={<Community />} />
      <Route path="/emotional/eshop/soul/discussion" element={<Discussion />} />
      <Route path="/emotional/eshop/soul/votes" element={<Votes />} />
      <Route
        path="/emotional/eshop"
        element={

         <ProtectedRoute
            shopElement={<Eshop />}
            memberElement={<EshopMember />}
          />

        }
      />
      <Route
        path="/emotional/eshop/financial-management"
        element={
        <ProtectedRoute
            shopElement={<Financial_management />}
            memberElement={<Navigate to="../login" />}
          />}
      />
      <Route
        path="/emotional/eshop/financial-management/general-ledger"
        element={
        <ProtectedRoute
            shopElement={<General_ledger />}
            memberElement={<Navigate to="../login" />}
          />}
      />
      <Route
        path="/emotional/eshop/financial-management/accounts-payable"
        element={
        <ProtectedRoute
            shopElement={<Accounts_payable />}
            memberElement={<Navigate to="../login" />}
          />
        }
      />
      <Route
        path="/emotional/eshop/financial-management/accounts-receivable"
        element={
        <ProtectedRoute
            shopElement={<Accounts_receivable />}
            memberElement={<Navigate to="../login" />}
          />
        }
      />
      <Route
        path="/emotional/eshop/financial-management/budgeting-and-forecasting"
        element={
         <ProtectedRoute
            shopElement={<Budgeting_and_forecasting />}
            memberElement={<Navigate to="../login" />}
          />
        }
      />
      <Route
        path="/emotional/eshop/hr-management"
        element={
        <ProtectedRoute
            shopElement={<HR_management />}
            memberElement={<Navigate to="../login" />}
          />
        }
      />
      <Route
        path="/emotional/eshop/suppliers-for-shop"
        element={
        <ProtectedRoute
            shopElement={<Suppliers_for_shop />}
            memberElement={<Navigate to="../login" />}
          />
        }
      />
      <Route
        path="/emotional/eshop/suppliers-for-shop2"
        element={
        <ProtectedRoute
            shopElement={<Suppliers_for_shop2 />}
            memberElement={<Navigate to="../login" />}
          />
        }
      />
      <Route
        path="/emotional/eshop/suppliers-for-shop3"
        element={
        <ProtectedRoute
            shopElement={<Suppliers_for_shop3 />}
            memberElement={<Navigate to="../login" />}
          />
        }
      />
      <Route
        path="/emotional/eshop/supply-chain-sale-order"
        element={
        <ProtectedRoute
            shopElement={<Supply_chain_sale_order />}
            memberElement={<Navigate to="../login" />}
          />
        }
      />
      <Route
        path="/emotional/eshop/supply-chain"
        element={
        <ProtectedRoute
            shopElement={<Supply_chain_management />}
            memberElement={<Navigate to="../login" />}
          />
        }
      />
      <Route path="/emotional/eshop/forecast" element={
         <ProtectedRoute
            shopElement={<Forecast />}
            memberElement={<Navigate to="../login" />}
          />
         } />
      <Route
        path="/emotional/eshop/stock-management"
        element={
         <ProtectedRoute
            shopElement={<Stock_management />}
            memberElement={<Navigate to="../login" />}
          />
        }
      />
      <Route path="/emotional/eshop/stock-level" element={
         <ProtectedRoute
            shopElement={<Stock_level />}
            memberElement={<Navigate to="../login" />}
          />
         } />
      <Route
        path="/emotional/eshop/stock-reports"
        element={
        <ProtectedRoute
            shopElement={<Stock_reports />}
            memberElement={<Navigate to="../login" />}
          />}
      />
      <Route
        path="/emotional/analytics"
        element={
         <ProtectedRoute
            shopElement={<Analytics />}
            memberElement={<Budget />}
          />
        }
      />
      <Route path="/emotional/analytics/overheads" element={
         <ProtectedRoute
            shopElement={<Overheads />}
            memberElement={<Navigate to="../login" />}
          />} />
      <Route
        path="/emotional/analytics/market-price"
        element={
        <ProtectedRoute
            shopElement={<MarketPrice />}
            memberElement={<Navigate to="../login" />}
          />
        }
      />
      <Route path="/emotional/analytics/stock-alarm" element={
         <ProtectedRoute
            shopElement={<StockAlarm />}
            memberElement={<Navigate to="../login" />}
          />
         } />
      <Route
        path="/emotional/analytics/forecast-market-price"
        element={
        <ProtectedRoute
            shopElement={<ForecastMarketPrice />}
            memberElement={<Navigate to="../login" />}
          />
        }
      />
      <Route
        path="/emotional/crm"
        element={
         <ProtectedRoute
            shopElement={<CRM />}
            memberElement={<MemberRelations />}
          />
         }
      />
      <Route
        path="/emotional/crm/customer-records"
        element={
         <ProtectedRoute
            shopElement={<CustomerRecords />}
            memberElement={<Navigate to="../login" />}
          />
        }
      />
      <Route
        path="/emotional/crm/member-group-creation"
        element={
         <ProtectedRoute
            shopElement={<MemberGroupCreation />}
            memberElement={<Navigate to="../login" />}
          />
        
        }
      />
      <Route path="/emotional/crm/sales-pipeline" element={
         <ProtectedRoute
            shopElement={<SalesPipeline />}
            memberElement={<Navigate to="../login" />}
          />
         } />
      <Route
        path="/emotional/crm/marketing-campaigns"
        element={
        <ProtectedRoute
            shopElement={<MarketingCampaigns />}
            memberElement={<Navigate to="../login" />}
          />
        }
      />
      <Route path="/unexpected/lead_generation" element={
         <ProtectedRoute
            shopElement={<LeadGeneration />}
            memberElement={<Navigate to="../login" />}
          />
         } />
      <Route path="/unexpected/capture" element={
         <ProtectedRoute
            shopElement={<Capture />}
            memberElement={<Navigate to="../login" />}
          />
         } />
      <Route path="/unexpected/suggestions" element={
         <ProtectedRoute
            shopElement={<Suggestions />}
            memberElement={<Navigate to="../login" />}
          />
         } />
      <Route path="/unexpected/confirmation" element={
         <ProtectedRoute
            shopElement={<Confirmation />}
            memberElement={<Navigate to="../login" />}
          />
         } />
      {/* <Route path="/emotional/campaign/job/jobs-offered" element={<Jobs_offered />} /> */}
      <Route path="/emotional/eshop/jobs-offered" element={
         <ProtectedRoute
            shopElement={<Jobs_offered />}
            memberElement={<Jobs_offered />}
          />
         } />
      <Route path="/emotional/eshop/diet-plan" element={
          <ProtectedRoute
            shopElement={<DietPlan />}
            memberElement={<DietPlan />}
          />
         } />
    </Routes>
  );
}
