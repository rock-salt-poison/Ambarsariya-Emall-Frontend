import { getUser } from "./API/fetchExpressAPI";
import member_icon from "./Utils/images/member.webp";
import shop_icon from "./Utils/images/shop.webp";
import merchant_icon from "./Utils/images/merchant.webp";
import visitor_icon from "./Utils/images/visitor.webp";
import login_icon from "./Utils/images/login.webp";
import crown_bg from "./Utils/images/crown_bg.webp";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLogout } from "./customHooks/useLogout";
import { useNavigate } from "react-router-dom";

function UserBadge({
  handleLogin,
  handleLogoutClick,
  handleBadgeBgClick,
}) {
  const [userIcon, setUserIcon] = useState(null);
  const token = useSelector((state) => state.auth.userAccessToken);
  const handleLogout = useLogout();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const set_badge = async () => {
    if (!token) {
      setUserIcon(login_icon);
      return;
    }

    try {
      setLoading(true);
      const user = (await getUser(token))?.[0];
      const userType = user?.user_type;
      const isVisitor = Boolean(user?.visitor_id);

      const iconMap = {
        member: isVisitor ? visitor_icon : member_icon,
        shop: isVisitor ? visitor_icon : shop_icon,
        merchant: isVisitor ? visitor_icon : merchant_icon,
        visitor: visitor_icon,
      };

      setUserIcon(iconMap[userType] || login_icon);
    } catch (error) {
      console.error("Error fetching user type:", error);
      setUserIcon(login_icon);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    set_badge();
  }, [token]);

  const handleIconClick = (e) => {
    const target = e.target.closest(".badge_icon");
    const actionTarget = e.target.closest(".logoutBtn, .loginBtn");

    if (target) {
      target.classList.add("reduceSize3");
      setTimeout(() => target.classList.remove("reduceSize3"), 300);

      if (actionTarget) {
        setTimeout(() => {
          if (actionTarget.classList.contains("logoutBtn")) {
            handleLogout(handleLogoutClick);
            actionTarget.classList.replace("logoutBtn", "loginBtn");
          } else if (actionTarget.classList.contains("loginBtn")){
            navigate(handleLogin);
          }
        }, 600);
      }
    }
  };

  const handleCrownClick = (e) => {
    const target = e.target.closest(".badge_bg");
    if (target) {
      target.classList.add("reduceSize3");
      setTimeout(() => {
        target.classList.remove("reduceSize3");
      }, 300);
      setTimeout(() => {
        navigate(handleBadgeBgClick);
      }, 600);
    }
  };

  return (
    <>
      {!loading && (
        <Box className={`${token ? 'logoutBtn' : 'loginBtn'} badge`}>
          <Box
            className="badge_bg"
            component="img"
            src={crown_bg}
            onClick={handleCrownClick}
          />
          <Box
            className="badge_icon"
            component="img"
            src={userIcon}
            onClick={handleIconClick}
          />
        </Box>
      )}
    </>
  );
}

export default UserBadge