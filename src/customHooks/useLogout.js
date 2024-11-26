import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearTokens } from "../store/authSlice";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (redirectTo) => {

    // Clear token from Redux
    dispatch(clearTokens());
    
    // Remove token from localStorage
    localStorage.removeItem("accessToken");
    
    // Redirect to specified route
    navigate(redirectTo);
  };

  return handleLogout;
};
