import axios from 'axios';
import { io } from 'socket.io-client';

const link = `${process.env.REACT_APP_EXPRESS_API_LINK}/api/ambarsariya`;
const admin_link = `${process.env.REACT_APP_EXPRESS_API_LINK}/admin/api`;
const drive_link = `${process.env.REACT_APP_EXPRESS_API_LINK}/api/drive`;
const payment_link = `${process.env.REACT_APP_EXPRESS_API_LINK}/api/payment`;
const photo_link = `${process.env.REACT_APP_EXPRESS_API_LINK}/api/google-photo`;
const SOCKET_SERVER_URL = process.env.REACT_APP_EXPRESS_API_LINK;

export const initializeWebSocket = (roomId) => {
  const socket = io(SOCKET_SERVER_URL, {
    path: "/socket.io",
    transports: ['websocket'],
  });

  socket.on('connect', () => {
    console.log('Connected to WebSocket server');
    if (roomId) {
      socket.emit('join_room', roomId); // Join a specific room
      console.log(`Joined room: ${roomId}`);
    }
  });

  // Listen for broadcast messages from backend
  socket.on('message', (message) => {
    console.log('Received message:', message);
    // You can trigger UI updates or toast notifications here
  });

  return socket;
};


export const fetchDomains = async () => {
  const response = await axios.get(`${link}/domains`);
  return response.data;
};

export const fetchSectors = async () => {
  const response = await axios.get(`${link}/sectors`);
  return response.data;
};

export const fetchDomainSectors = async (domain_id) => {
  const response = await axios.get(`${link}/domain-sectors/${domain_id}`);
  return response.data;
};

export const fetchService = async (id) => {
  try {
    if (id) {
      const response = await axios.get(`${link}/service/${id}`);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const get_checkIfMemberExists = async (username, phone_no1, phone_no2) => {
  try {
    if (username || phone_no1 || phone_no2) {
      const response = await axios.get(`${link}/sell/check-member-exists?username=${username}&phone1=${phone_no1}&phone2=${phone_no2}`, );
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const get_checkIfShopExists = async (username) => {
  try {
    if (username) {
      const response = await axios.get(`${link}/sell/check-shop-exists?username=${username}`, );
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const get_checkIfPaidShopExists = async (username) => {
  try {
    if (username) {
      const response = await axios.get(`${link}/sell/check-paid-shop-exists?username=${username}`, );
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const postEshop = async (eshopData) => {
  try {
    const response = await axios.post(`${link}/sell/eshop`, eshopData);
    console.log(response.data.shop_access_token, response.data.user_access_token);
    return response.data;
  } catch (error) {
    throw error
  }
};

export const updateEshopData = async (eshopData, shopAccessToken) => {
  try {
    const response = await axios.put(
      `${link}/sell/buyeshop/${shopAccessToken}`,
      eshopData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateEshopLocation = async (eshopData) => {
  try {
    const response = await axios.put(
      `${link}/sell/eshop/update-location`,
      eshopData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateEshopStatus = async (data) => {
  try {
    const response = await axios.put(
      `${link}/sell/eshop/update-status`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getShopUserData = async (shopAccessToken) => {
  try {
    const response = await axios.get(`${link}/sell/shop-user-data?shop_access_token=${shopAccessToken}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}


export const authenticateUser = async (data) => {
  try {
    const response = await axios.post(`${link}/sell/login`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const put_forgetPassword = async (data) => {
  try {
    if (data) {
      const response = await axios.put(`${link}/sell/forget-password`, data);
      return response.data;
    }
  } catch (error) {
    throw error;
  }
}

export const post_verify_otp = async (data) => {
  try {
    if (data) {
      const response = await axios.post(`${link}/sell/verify_otp`, data);
      return response.data;
    }
  } catch (error) {
    throw error;
  }
}

export const allShops = async () => {
  try {
    const response = await axios.get(`${link}/sell/shops`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const otherShops = async (shopAccessToken) => {
  try {
    const response = await axios.get(`${link}/sell/other-shops?shopAccessToken=${shopAccessToken}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getUser = async (userAccessToken) => {
  try {
    const response = await axios.get(`${link}/sell/user?userAccessToken=${userAccessToken}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}


export const getCategories = async (data) => {
  try {
    const response = await axios.get(`${link}/categories?domain_id=${data.domain_id}&sector_id=${data.sector_id}`);
    return response.data;
  } catch (e) {
    throw e;
  }
}

export const getCategoryName = async (category_id) => {
  const response = await axios.get(`${link}/category/${category_id}`);
  return response.data;
};

export const getCategoryId = async (category_name) => {
  try {
    const response = await axios.get(
      `${link}/category/name/${category_name}`
    );
    return response.data?.[0]?.category_id || null;
  } catch (error) {
    console.error("Error fetching category ID:", error);
    return null;
  }
};


export const postMemberData = async (userData) => {
  try {
    const response = await axios.post(`${link}/sell/member`, userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error
  }
};


export const updateShopUserToMerchant = async (data) => {
  try {
    const response = await axios.put(
      `${link}/sell/update-merchant`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMemberData = async (memberAccessToken) => {
  try {
    const response = await axios.get(`${link}/sell/member?memberAccessToken=${memberAccessToken}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const post_support_name_password = async (data) => {
  try {
    const response = await axios.post(`${link}/sell/support`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const get_visitorData = async (access_token, sender_id) => {
  try {
    const response = await axios.get(`${link}/sell/support/${access_token}/${sender_id}`);
    return response.data;
  } catch (e) {
    throw e;
  }
}

export const put_visitorData = async (data) => {
  try {
    if (data) {
      const response = await axios.put(`${link}/sell/support`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}


export const put_otp = async (data) => {
  try {
    const response = await axios.put(`${link}/sell/send-otp`, data);
    return response.data;
  } catch (e) {
    throw e;
  }
}

export const post_discount_coupons = async (data, shopNo) => {
  try {
    const response = await axios.post(`${link}/sell/coupons/${shopNo}`, data);
    return response.data;
  } catch (e) {
    throw e;
  }
}


export const get_discount_coupons = async (shop_no) => {
  try {
    const response = await axios.get(`${link}/sell/discount-coupons/${shop_no}`);
    return response.data;
  } catch (e) {
    throw e;
  }
}

export const get_travel_time = async (data) => {
  try {
    const response = await axios.get(`${admin_link}/travel-time/${data.mode}/${data.travel_type}`);
    return response.data;
  } catch (e) {
    throw e;
  }
}

export const get_countries = async () => {
  try {
    const response = await axios.get(`${admin_link}/countries`);
    return response.data;
  } catch (e) {
    throw e;
  }
}

export const get_notice = async (title, id) => {
  try {
    if (title) {
      const response = await axios.get(`${admin_link}/notice/${title}/${id}`);
      return response.data;
    } else {
      const response = await axios.get(`${admin_link}/notices`);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const get_led_board_message = async () => {
  try {
    const response = await axios.get(`${admin_link}/led-board-messages`);
    return response.data;
  } catch (e) {
    throw e;
  }
}

export const post_products = async (data) => {
  try {
    const response = await axios.post(`${link}/sell/products`, data);
    return response.data;
  } catch (e) {
    throw e;
  }
}

export const post_items = async (data) => {
  try {
    const response = await axios.post(`${link}/sell/items`, data);
    return response.data;
  } catch (e) {
    throw e;
  }
}

export const post_sku = async (data) => {
  try {
    const response = await axios.post(`${link}/sell/sku`, data);
    return response.data;
  } catch (e) {
    throw e;
  }
}

export const post_rku = async (data) => {
  try {
    const response = await axios.post(`${link}/sell/rku`, data);
    return response.data;
  } catch (e) {
    throw e;
  }
}

export const get_products = async (shop_no) => {
  try {
    if (shop_no) {
      const response = await axios.get(`${link}/sell/products/${shop_no}`);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const get_product = async (shop_no, product_id, item_id) => {
  try {
    if (shop_no && product_id) {
      const encodedItemID = encodeURIComponent(item_id);
      console.log(encodedItemID);
      
      const response = await axios.get(`${link}/sell/products/${shop_no}/${product_id}/${encodedItemID}`);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const get_product_names = async (shop_no) => {
  try {
    if (shop_no) {
      const response = await axios.get(`${link}/sell/product-names/${shop_no}`);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const get_product_variants = async (product_id) => {
  try {
    if (product_id) {
      const response = await axios.get(`${link}/sell/product-variants/${product_id}`);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}


export const get_items = async (shop_no) => {
  try {
    if (shop_no) {
      const response = await axios.get(`${link}/sell/items/${shop_no}`);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}


export const get_sku = async (shop_no) => {
  try {
    if (shop_no) {
      const response = await axios.get(`${link}/sell/sku/${shop_no}`);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}


export const send_otp_to_email = async (data) => {
  try {
    if (data) {
      const response = await axios.post(`${link}/sell/username-otp`, data);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const get_advt = async (advt_page) => {
  try {
    if (advt_page) {
      const response = await axios.get(`${admin_link}/advt/${advt_page}`);
      return response.data;
    } else {
      const response = await axios.get(`${admin_link}/advt`);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const get_support_page_famous_areas = async () => {
  try {
    const response = await axios.get(`${admin_link}/famous-areas`);
    return response.data;
  } catch (e) {
    throw e;
  }
}

export const get_nearby_areas_for_shop = async (shop_access_token, shop_no) => {
  try {
    const response = await axios.get(`${link}/sell/near-by-area/${shop_access_token}/${shop_no}`);
    return response.data;
  } catch (e) {
    throw e;
  }
}

export const get_nearby_shops = async (token) => {
  try {
    const response = await axios.get(`${admin_link}/sell/famous-areas/${token}`);
    return response.data;
  } catch (e) {
    throw e;
  }
}

export const post_open_file = async (email) => {
  try {
    if (email) {
      const response = await axios.post(`${drive_link}/open-file/${email}`);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const post_open_items_csv_file = async (email, shop_no, rackData) => {
  try {
    if (email && shop_no && rackData) {
      const response = await axios.post(`${drive_link}/open-items-file/${email}/${shop_no}`, rackData);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const post_open_sku_csv_file = async (email, shop_no, rackWallData) => {
  try {
    if (email && shop_no && rackWallData) {
      const response = await axios.post(`${drive_link}/open-sku-file/${email}/${shop_no}`, rackWallData);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const post_open_rku_csv_file = async (email, shop_no) => {
  try {
    if (email && shop_no) {
      const response = await axios.post(`${drive_link}/open-rku-file/${email}/${shop_no}`);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}


export const get_checkDriveAccess = async (email) => {
  try {
    if (email) {
      const response = await axios.get(`${drive_link}/check-drive-access/${email}`);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const get_checkGoogleAccess = async (email) => {
  try {
    if (email) {
      const response = await axios.get(`${drive_link}/check-google-access/${email}`);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const get_requestDriveAccess = () => {
  window.location.href = `${drive_link}/request-drive-access`;
};

export const get_requestGoogleAccess = (username) => {
  window.location.href = `${drive_link}/request-google-access/${username}`;
};

export const post_requestDynamicGoogleAccess = async (data) => {
    try{
      if(data){
          const resp = await axios.post(`${drive_link}/request-dynamic-google-access`, data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          return resp.data;
      }
    }catch(e){
      throw e;
    }
};

export const get_googleContacts = async (member_id, user_id) => {
  try {
    if (member_id && user_id) {
      const resp = await axios.get(`${drive_link}/google/contacts/${member_id}/${user_id}`);
      return resp.data;
    }
  } catch (e) {
    throw e;
  }
};

export const get_userScopes = async (oauth_access_token, oauth_refresh_token) => {
  try {
    if (oauth_access_token && oauth_refresh_token) {
      const resp = await axios.get(`${drive_link}/user-scopes?oauth_access_token=${oauth_access_token}&oauth_refresh_token=${oauth_refresh_token}`);
      return resp.data;
    }
  } catch (e) {
    throw e;
  }
};

// export const post_convertGooglePhotos = async (data) => {
//   try{
//     console.log(data);

//     if(data){
//       const response = await axios.post(`${photo_link}/convert-google-photos`, data);
//       return response.data;
//     }
//   }catch(e){
//     throw e;
//   }
// }

export const convertDriveLink = (link) => {
  if (link.includes("drive.google.com")) {
    const match = link.match(/\/d\/([^\/?]+)/); // Extract File ID
    if (match) {
      const fileId = match[1];

      return `${drive_link}/image/${fileId}`; // Return backend-served link
    }
  }
  return link; // Return original link if not a Google Drive link
};


export const get_sheetsData = async (link) => {
  try {
    if (link.includes("docs.google.com/spreadsheets")) {
      const match = link.match(/\/d\/([^\/?]+)/); // Extract File ID
      if (match) {
        const sheetId = match[1];
        if (sheetId) {
          try {
            const response = await axios.get(`${drive_link}/sheet/${sheetId}`);
            return response.data;
          } catch (e) {
            throw e;
          }
        }
      }
    }
    console.warn("⚠️ Invalid Google Sheets link:", link);
    return link; // Return original link if it's not a valid Google Sheet link
  } catch (error) {
    console.error("❌ Error fetching sheet data:", error.message);
    return null;
  }
};

export const post_purchaseOrder = async (data) => {
  try {
    if (data) {
      const response = await axios.post(`${link}/purchase_order`, { data });
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const post_saleOrder = async (data) => {
  try {
    if (data) {
      const response = await axios.post(`${link}/sale_order`, { data });
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const get_purchaseOrderDetails = async (po_access_token) => {
  try {
    if (po_access_token) {
      const resp = await axios.get(`${link}/purchase_order/${po_access_token}`);
      return resp.data;
    }
  } catch (e) {
    throw e;
  }
}

export const get_allPurchaseOrderDetails = async (buyer_id) => {
  try {
    if (buyer_id) {
      const resp = await axios.get(`${link}/purchased_orders/${buyer_id}`);
      return resp.data;
    }
  } catch (e) {
    throw e;
  }
}

export const get_purchasedOrder = async (po_no) => {
  try {
    if (po_no) {
      const encodedPoNo = encodeURIComponent(po_no);
      const resp = await axios.get(`${link}/purchased-order/${encodedPoNo}`);
      return resp.data;
    }
  } catch (e) {
    throw e;
  }
}

export const get_purchaseOrders = async (po_no) => {
  try {
    if(po_no){
      const encodedPoNo = encodeURIComponent(po_no);
      if (encodedPoNo) {
        const resp = await axios.get(`${link}/purchase_orders/${encodedPoNo}`);
        return resp.data;
      }
    }
  } catch (e) {
    throw e;
  }
}


export const get_purchaseOrderNo = async (shop_no, date) => {
  try {
    if (shop_no && date) {
      const resp = await axios.get(`${link}/purchase_order_no/${shop_no}/${date}`);
      return resp.data;
    }
  } catch (e) {
    throw e;
  }
}

export const get_member_buyer_data = async (po_no) => {
  try {
    if (po_no) {
      const encodedPoNo = encodeURIComponent(po_no);
      const resp = await axios.get(`${link}/buyer-details/${encodedPoNo}`);
      return resp.data;
    }
  } catch (e) {
    throw e;
  }
}


export const get_saleOrderNo = async (shop_no) => {
  try {
    if (shop_no) {
      const resp = await axios.get(`${link}/sale_order_no/${shop_no}`);
      return resp.data;
    }
  } catch (e) {
    throw e;
  }
}

export const get_saleOrders = async (shop_no) => {
  try {
    if (shop_no) {
      const resp = await axios.get(`${link}/sale_orders/${shop_no}`);
      return resp.data;
    }
  } catch (e) {
    throw e;
  }
}

export const get_supportChatNotifications = async (shop_no) => {
  try {
    const response = await axios.get(`${link}/sell/support-chat-notifications/${shop_no}`);
    return response.data;
  } catch (e) {
    throw e;
  }
}

export const get_supportChatMessages = async (support_id, notification_id) => {
  try {
    const response = await axios.get(`${link}/sell/support-chat-messages/${support_id}/${notification_id}`);
    return response.data;
  } catch (e) {
    throw e;
  }
}


export const delete_supportChatNotification = async (id) => {
  try {
    if (id) {
      const response = await axios.delete(`${link}/sell/support-chat-notifications/${id}`);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const patch_merchantResponse = async (supportId, response) => {
  try {
    if (supportId && response) {
      const resp = await axios.patch(`${link}/sell/support/${supportId}/response`, response);
      return resp.data;
    }
  } catch (error) {
    throw error;
  }
};

export const post_supportChatMessage = async (data) => {
  try {
    if (data) {
      const response = await axios.post(`${link}/sell/support/chat`, { data });
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const post_memberEmotional = async (data, member_id) => {
  try {
    if (data) {
      const response = await axios.post(`${link}/sell/emotional/${member_id}`, { data });
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const get_memberEmotional = async (member_id) => {
  if(member_id){
    try {
      const response = await axios.get(`${link}/sell/emotional/${member_id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const get_memberProfessional = async (member_id, user_id) => {
  if(member_id, user_id){
    try {
      const response = await axios.get(`${link}/sell/professional/${member_id}/${user_id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

// export const post_memberPersonal = async (memberData, member_id) => {
//   if(memberData){
//     try {
//       const response = await axios.post(`${link}/sell/personal/${member_id}`, memberData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       return response.data;
//     } catch (error) {
//       throw error
//     }
//   }
// };

export const post_memberPersonal = async (memberData, member_id) => {
  if(memberData){
    try {
      const response = await axios.post(`${link}/sell/personal/${member_id}`, memberData);
      return response.data;
    } catch (error) {
      throw error
    }
  }
};

export const get_memberPersonal = async (member_id) => {
  if(member_id){
    try {
      const response = await axios.get(`${link}/sell/personal/${member_id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const post_memberProfessional = async (member_id, user_id, data) => {
  if(member_id, user_id, data){
    try {
      const response = await axios.post(`${link}/sell/professional/${member_id}/${user_id}`, {data});
      return response.data;
    } catch (error) {
      throw error
    }
  }
};

export const post_memberRelations = async (member_id, user_id, data) => {
  if(member_id, user_id, data){
    try {
      const response = await axios.post(`${link}/sell/relations/${member_id}/${user_id}`, {data});
      return response.data;
    } catch (error) {
      throw error
    }
  }
};

export const get_memberRelations = async (member_id, user_id, relation) => {
  if (member_id && user_id) {
    try {
      const url = relation 
        ? `${link}/sell/relations/${member_id}/${user_id}?relation=${relation}`
        : `${link}/sell/relations/${member_id}/${user_id}`;

      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  } else {
    throw new Error("member_id and user_id are required");
  }
};

export const get_memberRelationDetail = async (member_id, access_token) => {
  if (member_id && access_token) {
    try {
      const response = await axios.get(`${link}/sell/relation/${member_id}/${access_token}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const get_memberRelationTypes = async (member_id) => {
  if (member_id) {
    try {
      const response = await axios.get(`${link}/sell/relation-types/${member_id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const get_memberRelationSpecificGroups = async (member_id, selectedRelation) => {
  if (member_id && selectedRelation) {
    try {
      const response = await axios.get(`${link}/sell/relation-specific-groups/${member_id}/${selectedRelation}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const delete_memberRelation = async (id, access_token) => {
  try {
    if (id && access_token) {
      const response = await axios.delete(`${link}/sell/member-relation/${id}/${access_token}`);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}


export const put_member_share_level = async (data) => {
  if(data){
  try{
      const resp = await axios.put(`${link}/sell/member-share-level`, data);
      return resp.data;
    }catch(e){
      throw e;
    }
  }
}


export const get_member_share_level = async (member_id) => {
  if(member_id){
  try{
      const resp = await axios.get(`${link}/sell/member-share-level/${member_id}`);
      return resp.data;
    }catch(e){
      throw e;
    }
  }
}

export const get_member_event_purpose = async (event_type) => {
  if(event_type){
  try{
      const resp = await axios.get(`${link}/event-purpose/${event_type}`);
      return resp.data;
    }catch(e){
      throw e;
    }
  }
}


export const get_member_event_purpose_engagement = async (event_type, event_purpose_id) => {
  if(event_type && event_purpose_id){
  try{
      const resp = await axios.get(`${link}/event-purpose-engagement/${event_type}/${event_purpose_id}`);
      return resp.data;
    }catch(e){
      throw e;
    }
  }
}

export const get_member_events = async (member_id) => {
  if(member_id){
  try{
      const resp = await axios.get(`${link}/sell/events/${member_id}`);
      return resp.data;
    }catch(e){
      throw e;
    }
  }
}

export const post_eventsData = async (member_id, data) => {
  try {
    const response = await axios.post(
      `${link}/sell/events/${member_id}`,
      data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const post_memberCommunity = async (data) => {
  try {
    const response = await axios.post(
      `${link}/sell/community`,
      data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const put_near_by_shops= async (data) => {
  if(data){
  try{
      const resp = await axios.put(`${link}/sell/near-by-shop`, data);
      return resp.data;
    }catch(e){
      throw e;
    }
  }
}

export const post_invoiceOrder = async (data) => {
  try {
    if (data) {
      const response = await axios.post(`${link}/create-invoice`, { data });
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const get_invoiceOrder = async (invoice_no) => {
  try {
    if (invoice_no) {
      const encodedInvoiceNo =  encodeURIComponent(invoice_no)
      const response = await axios.get(`${link}/invoice/${encodedInvoiceNo}`);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const get_buyer_data = async (user_id) => {
  try {
    if (user_id) {
      const response = await axios.get(`${link}/buyer-data/${user_id}`);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const get_seller_data = async (shop_no) => {
  try {
    if (shop_no) {
      const response = await axios.get(`${link}/seller-data/${shop_no}`);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const get_purchased_products_details = async (product_id, item_id) => {
  try {
    if (product_id && item_id) {
      const encodedItemId =  encodeURIComponent(item_id)
      const response = await axios.get(`${link}/purchased-products-data/${product_id}/${encodedItemId}`);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const get_existing_domains = async () => {
  try {
      const response = await axios.get(`${link}/sell/product-search/domains`);
      return response.data;
  } catch (e) {
    throw e;
  }
}

export const get_existing_sectors = async (domain_id) => {
  try {
    if (domain_id) {
      const response = await axios.get(`${link}/sell/product-search/sectors?domain_id=${domain_id}`);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const get_searched_products = async (domain_id, sector_id, product) => {
  try {
    let query = `${link}/sell/product-search/product?`;
    const params = [];

    if (domain_id) params.push(`domain_id=${domain_id}`);
    if (sector_id) params.push(`sector_id=${sector_id}`);
    if (product) params.push(`product=${product}`);

    query += params.join('&');

    const response = await axios.get(query);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const get_shop_categories = async (shop_no) => {
  try {
    if (shop_no) {
      const response = await axios.get(`${link}/shop/categories?shop_no=${shop_no}`);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}


export const get_shop_products = async (shop_no, category) => {
  try {
    if (shop_no && category) {
      const response = await axios.get(`${link}/shop/products?shop_no=${shop_no}&category=${category}`);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const get_shop_product_items = async (product_id) => {
  try {
    if (product_id) {
      const response = await axios.get(`${link}/shop/product-items?product_id=${product_id}`);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const get_category_wise_shops = async (shop_no,purchaser_shop_no) => {
  try {
    if (shop_no) {
      console.log(shop_no, purchaser_shop_no);
      
      // const response = await axios.get(`${link}/category-wise-shops?category=${category}&product=${product}`);
      const response = await axios.get(`${link}/category-wise-shops?shop_no=${shop_no}&purchaser_shop_no=${purchaser_shop_no}`);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const get_mou_selected_shops_products = async (category, product, shop_nos) => {
  try {
    if (category && product && shop_nos) {
      console.log(category, product, shop_nos);
      
      const response = await axios.get(`${link}/mou-selected-shops-products?shop_nos=${shop_nos?.join(',')}&category=${category}&product=${product}`);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const get_in_stock_updates = async (shop_no) => {
  try {
    if (shop_no) {
      const response = await axios.get(`${link}/in-stock-products/${shop_no}`);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const post_identification_of_mou = async (mou) => {
  try {
    if (mou) {
      const response = await axios.post(`${link}/sell/identification-of-mou`, { mou });
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const get_vendor_details = async (shop_no) => {
  try {
    if (shop_no) {
      const query = shop_no.join(',');
      console.log(query);
      
      const response = await axios.get(`${link}/sell/mou/vendor-details?shop_no=${query}`);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const get_mou = async (access_token) => {
  try {
    if (access_token) {      
      const response = await axios.get(`${link}/sell/mou?access_token=${access_token}`);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const post_createOrder = async (amount) => {
  try {
    if (amount) {      
      const response = await axios.post(`${payment_link}/create-order`, {amount});
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const post_createFundAccount = async (data) => {
  try {
    if (data) {      
      const response = await axios.post(`${payment_link}/create-fund-account`, data);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const post_payoutToShopkeeper = async (data) => {
  try {
    if (data) {      
      const response = await axios.post(`${payment_link}/payout`, data);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}

export const postEshopReview = async (data) => {
  try {
    const response = await axios.post(`${link}/sell/shop-review`, {data});
    return response.data;
  } catch (error) {
    throw error
  }
};

export const postEshopReviewComment = async (data) => {
  try {
    const response = await axios.post(`${link}/sell/shop-comment`, {data});
    return response.data;
  } catch (error) {
    throw error
  }
};

export const postEshopReviewCommentReply = async (data) => {
  try {
    const response = await axios.post(`${link}/sell/shop-comment-reply`, {data});
    return response.data;
  } catch (error) {
    throw error
  }
};

export const getMemberEshopReview = async (data) => {
  try {
    const response = await axios.get(`${link}/sell/shop-review/${data?.shop_no}/${data?.reviewer_id}`);
    return response.data;
  } catch (error) {
    throw error
  }
};

export const getEshopCommentsAndReplies = async (shop_no) => {
  try {
    const response = await axios.get(`${link}/sell/shop-comments-and-replies?shop_no=${shop_no}`);
    return response.data;
  } catch (error) {
    throw error
  }
};

export const delete_shopReview = async (id) => {
  try {
    if (id) {
      const response = await axios.delete(`${link}/sell/shop-review/${id}`);
      return response.data;
    }
  } catch (e) {
    throw e;
  }
}