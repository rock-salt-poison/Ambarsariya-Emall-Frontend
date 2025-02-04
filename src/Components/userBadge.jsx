import { getUser } from '../API/fetchExpressAPI'; // Adjust the import path as needed
import member_icon from '../Utils/images/member.webp';
import shop_icon from '../Utils/images/shop.webp';
import merchant_icon from '../Utils/images/merchant.webp';
import visitor_icon from '../Utils/images/visitor.webp';

// Utility function to fetch the user type and set the icon
export const fetchUserType = async (token, setUserIcon) => {
  if (token) {
    try {
      const user = await getUser(token);
      const user_type = user?.[0].user_type;

      // Set the user icon based on the user type
      if (user_type === 'member') {
        setUserIcon(member_icon);
      } else if (user_type === 'shop') {
        setUserIcon(shop_icon);
      } else if (user_type === 'merchant') {
        setUserIcon(merchant_icon);
      } else if (user_type === 'visitor') {
        setUserIcon(visitor_icon);
      } else {
        setUserIcon(null); // Default icon if user type doesn't match
      }
    } catch (error) {
      console.error('Error fetching user type:', error);
      setUserIcon(null); // Handle error gracefully
    }
  }
};
