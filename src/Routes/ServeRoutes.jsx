import { Route, Routes } from 'react-router-dom'
import Serve from '../Pages/Serve';
import Emotional from '../Pages/Serve/Emotional';
import Campaign from '../Pages/Serve/Campaign';
import Job from '../Pages/Serve/Job';
import Jobs_offered from '../Pages/Serve/Jobs_offered';
import Community from '../Pages/Serve/Community';
import Discussion from '../Pages/Serve/Discussion';
import Votes from '../Pages/Serve/Votes';
import Eshop from '../Pages/Serve/Eshop';
import HR_management from '../Pages/Serve/HR_management';
import Suppliers_for_shop from '../Pages/Serve/Suppliers_for_shop';
import Supply_chain_sale_order from '../Pages/Serve/Supply_chain_sale_order';
import Supply_chain_management from '../Pages/Serve/Supply_chain_management';
import Analytics from '../Pages/Serve/Analytics';
import Forecast from '../Pages/Serve/Forecast';
import Stock_management from '../Pages/Serve/Stock_management';
import Stock_level from '../Pages/Serve/Stock_level';
import Stock_reports from '../Pages/Serve/Stock_reports';
import CRM from '../Pages/Serve/CRM';
import Unexpected from '../Pages/Serve/Unexpected';
import LeadGeneration from '../Pages/Serve/LeadGeneration';
import Capture from '../Pages/Serve/Capture';
import Suggestions from '../Pages/Serve/Suggestions';
import Confirmation from '../Pages/Serve/Confirmation';
import Suppliers_for_shop2 from '../Pages/Serve/Suppliers_for_shop2';
import Suppliers_for_shop3 from '../Pages/Serve/Suppliers_for_shop3';
import Financial_management from '../Pages/Serve/Financial_management';
import General_ledger from '../Pages/Serve/General_ledger';
import Accounts_payable from '../Pages/Serve/Accounts_payable';
import Accounts_receivable from '../Pages/Serve/Accounts_receivable';
import Budgeting_and_forecasting from '../Pages/Serve/Budgeting_and_forecasting';
import MerchantCampaign from '../Pages/Serve/MerchantCampaign';
import { useEffect, useState } from 'react';
import CustomerRecords from '../Pages/Serve/CustomerRecords';
import MemberGroupCreation from '../Pages/Serve/MemberGroupCreation';
import SalesPipeline from '../Pages/Serve/SalesPipeline';
import MarketingCampaigns from '../Pages/Serve/MarketingCampaigns';
import Login from '../Pages/Sell/Login';
import Overheads from '../Pages/Serve/Analytics_Merchant/Overheads';
import MarketPrice from '../Pages/Serve/Analytics_Merchant/MarketPrice';
import StockAlarm from '../Pages/Serve/Analytics_Merchant/StockAlarm';
import ForecastMarketPrice from '../Pages/Serve/Analytics_Merchant/ForecastMarketPrice';
import EmotionalMember from '../Pages/Serve/Member/EmotionalMember';
import EshopMember from '../Pages/Serve/Member/EshopMember';
import Budget from '../Pages/Sell/Budget';
import MemberRelations from '../Pages/Sell/MemberRelations';
import DietPlan from '../Pages/Serve/Member/DietPlan';


export default function ServeRoutes() {

   const [checkUser, setCheckUser] = useState(localStorage.getItem('access_token'));

   // Effect to listen to storage changes
   useEffect(() => {
      // Define the function that updates state when localStorage changes
      const handleStorageChange = (e) => {
         if (e.key === 'access_token') {
            setCheckUser(e.newValue);
         }
      };

      // Listen to the storage event
      window.addEventListener('storage', handleStorageChange);

      // Clean up the event listener when the component unmounts
      return () => {
         window.removeEventListener('storage', handleStorageChange);
      };
   }, []);

   return (
      <Routes>
         <Route path="/" element={<Serve />} />
         <Route path="login" element={<Login />} />
         <Route path="/emotional" element={checkUser === 'merchant' ? <Emotional /> : <EmotionalMember/>} />
         <Route path="/unexpected" element={<Unexpected />} />
         <Route path="/emotional/campaign" element={checkUser === 'merchant' ? <MerchantCampaign /> : <Campaign />} />
         <Route path="/emotional/campaign/job" element={<Job />} />
         <Route path="/emotional/eshop/soul" element={<Community />} />
         <Route path="/emotional/eshop/soul/discussion" element={<Discussion />} />
         <Route path="/emotional/eshop/soul/votes" element={<Votes />} />
         <Route path="/emotional/eshop" element={checkUser === 'merchant' ? <Eshop /> : <EshopMember />} />
         <Route path="/emotional/eshop/financial-management" element={<Financial_management />} />
         <Route path="/emotional/eshop/financial-management/general-ledger" element={<General_ledger />} />
         <Route path="/emotional/eshop/financial-management/accounts-payable" element={<Accounts_payable />} />
         <Route path="/emotional/eshop/financial-management/accounts-receivable" element={<Accounts_receivable />} />
         <Route path="/emotional/eshop/financial-management/budgeting-and-forecasting" element={<Budgeting_and_forecasting />} />
         <Route path="/emotional/eshop/hr-management" element={<HR_management />} />
         <Route path="/emotional/eshop/suppliers-for-shop" element={<Suppliers_for_shop />} />
         <Route path="/emotional/eshop/suppliers-for-shop2" element={<Suppliers_for_shop2 />} />
         <Route path="/emotional/eshop/suppliers-for-shop3" element={<Suppliers_for_shop3 />} />
         <Route path="/emotional/eshop/supply-chain-sale-order" element={<Supply_chain_sale_order />} />
         <Route path="/emotional/eshop/supply-chain" element={<Supply_chain_management />} />
         <Route path="/emotional/eshop/forecast" element={<Forecast />} />
         <Route path="/emotional/eshop/stock-management" element={<Stock_management />} />
         <Route path="/emotional/eshop/stock-level" element={<Stock_level />} />
         <Route path="/emotional/eshop/stock-reports" element={<Stock_reports />} />
         <Route path="/emotional/analytics" element={checkUser === 'merchant' ? <Analytics /> : <Budget />} />
         <Route path="/emotional/analytics/overheads" element={<Overheads/>} />
         <Route path="/emotional/analytics/market-price" element={<MarketPrice/>} />
         <Route path="/emotional/analytics/stock-alarm" element={<StockAlarm/>} />
         <Route path="/emotional/analytics/forecast-market-price" element={<ForecastMarketPrice/>} />
         <Route path="/emotional/crm" element={checkUser === 'merchant' ? <CRM /> : <MemberRelations />} />
         <Route path="/emotional/crm/customer-records" element={<CustomerRecords />} />
         <Route path="/emotional/crm/member-group-creation" element={<MemberGroupCreation />} />
         <Route path="/emotional/crm/sales-pipeline" element={<SalesPipeline />} />
         <Route path="/emotional/crm/marketing-campaigns" element={<MarketingCampaigns />} />
         <Route path="/unexpected/lead_generation" element={<LeadGeneration />} />
         <Route path="/unexpected/capture" element={<Capture />} />
         <Route path="/unexpected/suggestions" element={<Suggestions />} />
         <Route path="/unexpected/confirmation" element={<Confirmation />} />
         {/* <Route path="/emotional/campaign/job/jobs-offered" element={<Jobs_offered />} /> */}
         <Route path="/emotional/eshop/jobs-offered" element={<Jobs_offered />} />
         <Route path="/emotional/eshop/diet-plan" element={<DietPlan />} />
      </Routes>
   );
}

