import React from 'react';
import { Route, Routes, Navigate, useParams } from 'react-router-dom';
import Sell from '../Pages/Sell';
import Support from '../Pages/Sell/Support';
import MerchantDetailsPage from '../Pages/Sell/MerchantDetailsPage';
import GrowConversationPage from '../Pages/Sell/GrowConversationPage';
import GrabConversationPage from '../Pages/Sell/GrabConversationPage';
import CouponOfferingPage from '../Pages/Sell/CouponOfferingPage';
import BuyEshop from '../Pages/Sell/BuyEshop';
import Login from '../Pages/Sell/Login';
import Eshop from '../Pages/Sell/Eshop';
import User_Portfolio from '../Pages/Sell/User_Portfolio';
import Shop from '../Pages/Sell/Shop';
import SingleShopPage from '../Pages/Sell/SingleShopPage';
import Products from '../Pages/Sell/Products';
import Cart from '../Pages/Sell/Cart';
import ProductDetails from '../Pages/Sell/ProductDetails';
import Order_Return_Review_Component from '../Pages/Sell/Order_Return_Review_Component';
import Subscribe from '../Pages/Sell/Subscribe';
import Mou from '../Pages/Sell/Mou';
import Like_share from '../Pages/Sell/Like_share';
import Esale from '../Pages/Sell/Esale';
import ShopSearchPage from '../Pages/Sell/ShopSearchPage';
import Budget from '../Pages/Sell/Budget';
import Esale_emotional from '../Pages/Sell/Esale_emotional';
import Esale_personal from '../Pages/Sell/Esale_personal';
import Esale_professional from '../Pages/Sell/Esale_professional';
import Life from '../Pages/Sell/Life';
import MemberRelations from '../Pages/Sell/MemberRelations';
import MerchantDashboard from '../Pages/Sell/Dashboard/MerchantDashboard/MerchantDashboard';
import Preview from '../Pages/Sell/Dashboard/MerchantDashboard/Preview';

function SellRoutes() {
  const ConditionalRoute = () => {
    const { owner, action } = useParams();
    const allowedActions = ['order', 'return', 'review'];

    return allowedActions.includes(action) ? (
      <Order_Return_Review_Component />
    ) : (
      <Navigate to="../" replace />
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Sell />} />
      <Route path="grow" element={<GrowConversationPage />} />
      <Route path="grab" element={<GrabConversationPage />} />
      <Route path="support" element={<Support />} />
      <Route path="support/shop" element={<SingleShopPage />} />
      <Route path="support/shops-near" element={<MerchantDetailsPage />} />
      <Route path="coupon-offering" element={<CouponOfferingPage />} />
      <Route path="book-eshop" element={<BuyEshop />} />
      <Route path="login" element={<Login />} />
      <Route path="eshop" element={<Eshop />} />
      <Route path="user" element={<User_Portfolio />} />
      <Route path="support/shop/shop-detail" element={<Shop />} />
      <Route path="support/shop/shop-detail/dashboard" element={<MerchantDashboard />} />
      <Route path="support/shop/shop-detail/dashboard/:edit" element={<MerchantDashboard />} />
      <Route path="support/shop/shop-detail/dashboard/:edit/preview" element={<Preview />} />
      <Route path="shop/products" element={<Products />} />
      <Route path="shop/:owner/products/:id" element={<ProductDetails />} />
      <Route path="shop/:owner/cart" element={<Cart />} />
      <Route path=":owner/subscribe" element={<Subscribe />} />
      <Route path=":owner/mou" element={<Mou />} />
      <Route path=":owner/:action" element={<ConditionalRoute />} />
      <Route path=":owner/like-and-share" element={<Like_share />} />
      <Route path="esale" element={<Esale />} />
      <Route path="esale/emotional" element={<Esale_emotional />} />
      <Route path="esale/personal" element={<Esale_personal />} />
      <Route path="esale/professional" element={<Esale_professional />} /> 
      <Route path="shops" element={<ShopSearchPage />} />
      {/* <Route path=":owner/:action/budget" element={<Budget />} /> */}
      <Route path=":owner/budget" element={<Budget />} />
      <Route path="esale/life" element={<Life />} />
      <Route path="esale/relations" element={<MemberRelations />} />
    </Routes>
  );
}

export default SellRoutes;
