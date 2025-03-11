import axios from 'axios';

const link = `${process.env.REACT_APP_EXPRESS_API_LINK}/api/ambarsariya`;
const admin_link = `${process.env.REACT_APP_EXPRESS_API_LINK}/admin/api`;
const drive_link = `${process.env.REACT_APP_EXPRESS_API_LINK}/api/drive`;
const photo_link = `${process.env.REACT_APP_EXPRESS_API_LINK}/api/google-photo`;

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
  try{
    if(id){
      const  response = await axios.get(`${link}/service/${id}`);
      return response.data;
    }
  }catch(e){
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

export const getShopUserData = async (shopAccessToken) => {
    try{
      const response = await axios.get(`${link}/sell/shop-user-data?shop_access_token=${shopAccessToken}`);
      return response.data;
    }catch(error){
      throw error;
    }
}
  

export const authenticateUser = async (data) => {
    try{
      const response = await axios.post(`${link}/sell/login`, data);
      return response.data;
    }catch(error){
      throw error;
    }
}

export const put_forgetPassword = async (data) => {
  try{
    if(data){
      const response = await axios.put(`${link}/sell/forget-password`, data);
      return response.data;
    }
  }catch(error){
    throw error;
  }
}

export const post_verify_otp = async (data) => {
  try{
    if(data){
      const response = await axios.post(`${link}/sell/verify_otp`, data);
      return response.data;
    }
  }catch(error){
    throw error;
  }
}

export const allShops = async () => {
  try{
    const response = await axios.get(`${link}/sell/shops`);
    return response.data;
  }catch(error){
    throw error;
  }
}
  
export const otherShops = async (shopAccessToken) => {
  try{
    const response = await axios.get(`${link}/sell/other-shops?shopAccessToken=${shopAccessToken}`);
    return response.data;
  }catch(error){
    throw error;
  }
}

export const getUser = async (userAccessToken) => {
  try{
    const response = await axios.get(`${link}/sell/user?userAccessToken=${userAccessToken}`);
    return response.data;
  }catch(error){
    throw error;
  }
}


export const getCategories = async (data) => {
  try{
    const response = await axios.get(`${link}/categories?domain_id=${data.domain_id}&sector_id=${data.sector_id}`);
    return response.data;
  }catch(e){
    throw e;
  }
}

export const getCategoryName = async (category_id) => {
  const response = await axios.get(`${link}/category/${category_id}`);
  return response.data;
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

export const getMemberData = async (memberAccessToken) => {
  try{
    const response = await axios.get(`${link}/sell/member?memberAccessToken=${memberAccessToken}`);
    return response.data;
  }catch(error){
    throw error;
  }
}

export const post_support_name_password = async(data)=> {
  try{
    const response = await axios.post(`${link}/sell/support`, data);
    return response.data;
  }catch(error){
    throw error;
  }
}

export const get_visitorData = async (access_token) => {
  try{
    const response = await axios.get(`${link}/sell/support/${access_token}`);
    return response.data;
  }catch(e){
    throw e;
  }
}

export const put_visitorData = async (data) => {
    try{
      if(data){
        const response = await axios.put(`${link}/sell/support`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data;
      }
    }catch(e){
      throw e;
    }
}


export const put_otp = async (data) => {
  try{
    const response = await axios.put(`${link}/sell/send-otp`, data);
    return response.data; 
  }catch(e){
    throw e;
  }
}

export const post_discount_coupons = async (data, shopNo) => {
  try{
    const response = await axios.post(`${link}/sell/coupons/${shopNo}`, data);
    return response.data;
  }catch(e){
    throw e;
  }
}


export const get_discount_coupons = async (shop_no) => {
  try{
    const response = await axios.get(`${link}/sell/discount-coupons/${shop_no}`);
    return response.data;
  }catch(e){
    throw e;
  }
}

export const get_travel_time = async (data) => {
  try{
      const response = await axios.get(`${admin_link}/travel-time/${data.mode}/${data.travel_type}`);
      return response.data;
  }catch(e){
      throw e;
  }
}

export const get_countries = async () => {
  try{
      const response = await axios.get(`${admin_link}/countries`);
      return response.data;
  }catch(e){
      throw e;
  }
}

export const get_notice = async (title, id) => {
  try{
      if(title){
          const response = await  axios.get(`${admin_link}/notice/${title}/${id}`);
          return response.data;
      }else{
          const response = await  axios.get(`${admin_link}/notices`);
          return response.data;
      }
  }catch(e){
      throw e;
  }
}

export const get_led_board_message = async () => {
  try{
      const response = await axios.get(`${admin_link}/led-board-messages`);
      return response.data;
  }catch(e){
      throw e;
  }
} 

export const post_products = async (data) => {
  try{
    const response = await axios.post(`${link}/sell/products`, data);
    return response.data;
  }catch(e){
    throw e;
  }
}

export const get_products = async (shop_no) => {
  try{
    if(shop_no){
      const response = await axios.get(`${link}/sell/products/${shop_no}`);
      return response.data;
    }
  }catch(e){
    throw e;
  }
}

export const get_product = async (shop_no, product_id) => {
  try{
    if(shop_no && product_id){
      const response = await axios.get(`${link}/sell/products/${shop_no}/${product_id}`);
      return response.data;
    }
  }catch(e){
    throw e;
  }
}

export const get_product_names = async (shop_no) => {
  try{
    if(shop_no){
      const response = await axios.get(`${link}/sell/product-names/${shop_no}`);
      return response.data;
    }
  }catch(e){
    throw e;
  }
}

export const get_product_variants = async (shop_no, variant_group) => {
  try{
    if(shop_no){
      const response = await axios.get(`${link}/sell/product-variants/${shop_no}/${variant_group}`);
      return response.data;
    }
  }catch(e){
    throw e;
  }
}


export const send_otp_to_email = async (data) => {
  try{
    if(data){
      const response = await axios.post(`${link}/sell/username-otp`, data);
      return response.data;
    }
  }catch(e){
    throw e;
  }
}

export const get_advt = async (advt_page) => {
  try{
      if(advt_page){
          const response = await  axios.get(`${admin_link}/advt/${advt_page}`);
          return response.data;
      }else{
          const response = await  axios.get(`${admin_link}/advt`);
          return response.data;
      }
  }catch(e){
      throw e;
  }
}

export const get_support_page_famous_areas = async () => {
  try{
      const response = await axios.get(`${admin_link}/famous-areas`);
      return response.data;
  }catch(e){
      throw e;
  }
} 


export const get_nearby_shops = async (token) => {
  try{
    const response = await axios.get(`${admin_link}/sell/famous-areas/${token}`);
    return response.data;
  }catch(e){
    throw e;
  }
}

export const post_open_file = async (email)=>{
  try{
    if(email){
      const response = await axios.post(`${drive_link}/open-file/${email}`);
      return response.data; 
    }
  }catch(e){
    throw e;
  }
}


export const get_checkDriveAccess = async (email) => {
  try{
    if(email){
      const response = await axios.get(`${drive_link}/check-drive-access/${email}`);
      return response.data;
    }
  }catch(e){  
    throw e;
  }
}

export const get_requestDriveAccess = () => {
  window.location.href = `${drive_link}/request-drive-access`;
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
          try{
            const response = await axios.get(`${drive_link}/sheet/${sheetId}`);
            return response.data;
          }catch(e){  
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
  try{
    if(data){
      const response = await axios.post(`${link}/purchase_order`, {data});
      return response.data;
    }
  }catch(e){
    throw e;
  }
}

export const post_saleOrder = async (data) => {
  try{
    if(data){
      const response = await axios.post(`${link}/sale_order`,  {data});
      return response.data;
    }
  }catch(e){
    throw e;
  }
}

export const get_purchaseOrderDetails = async (po_access_token) => {
  try{
    if(po_access_token){
      const resp = await axios.get(`${link}/purchase_order/${po_access_token}`);
      return resp.data;
    }
  }catch(e){
    throw e;
  }
} 

export const get_purchaseOrders = async (shop_no) => {
  try{
    if(shop_no){
      const resp = await axios.get(`${link}/purchase_orders/${shop_no}`);
      return resp.data;
    }
  }catch(e){
    throw e;
  }
} 
