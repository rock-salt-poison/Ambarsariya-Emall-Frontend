import axios from 'axios';

const link = process.env.REACT_APP_EXPRESS_API_LINK;

export const fetchDomains = async () => {
    const response = await axios.get(`${link}/api/ambarsariya/domains`);
    return response.data;
};

export const fetchSectors = async () => {
    const response = await axios.get(`${link}/api/ambarsariya/sectors`);
    return response.data;
};

export const fetchDomainSectors = async (domain_id) => {
    const response = await axios.get(`${link}/api/ambarsariya/domain-sectors/${domain_id}`);
    return response.data;
};

export const postEshop = async (eshopData) => {
    try {
        const response = await axios.post(`${link}/api/ambarsariya/sell/eshop`, eshopData);
        console.log(response.data.shop_access_token, response.data.user_access_token);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const updateEshopData = async (eshopData, shopAccessToken) => {
    try {
      const response = await axios.put(
        `${link}/api/ambarsariya/sell/buyeshop/${shopAccessToken}`, 
        eshopData
      );
      return response.data;
    } catch (error) {
      throw error; 
    }
};

export const getShopUserData = async (shopAccessToken) => {
    try{
      const response = await axios.get(`${link}/api/ambarsariya/sell/shop-user-data?shop_access_token=${shopAccessToken}`);
      return response.data;
    }catch(error){
      throw error;
    }
}
  

export const authenticateUser = async (data) => {
    try{
      const response = await axios.post(`${link}/api/ambarsariya/sell/login`, data);
      return response.data;
    }catch(error){
      throw error;
    }
}
  
export const otherShops = async (shopAccessToken) => {
  try{
    const response = await axios.get(`${link}/api/ambarsariya/sell/shops?shopAccessToken=${shopAccessToken}`);
    return response.data;
  }catch(error){
    throw error;
  }
}

export const getUser = async (userAccessToken) => {
  try{
    const response = await axios.get(`${link}/api/ambarsariya/sell/user?userAccessToken=${userAccessToken}`);
    return response.data;
  }catch(error){
    throw error;
  }
}


export const getCategories = async (data) => {
  try{
    const response = await axios.get(`${link}/api/ambarsariya/categories?domain_id=${data.domain_id}&sector_id=${data.sector_id}`);
    return response.data;
  }catch(e){
    throw e;
  }
}

export const getAllCategories = async () => {
  const response = await axios.get(`${link}/api/ambarsariya/allCategories`);
  return response.data;
};

export const postMemberData = async (userData) => {
  try {
      const response = await axios.post(`${link}/api/ambarsariya/sell/member`, userData);
      return response.data;
  } catch (error) {
      throw error
  }
}; 

export const getMemberData = async (memberAccessToken) => {
  try{
    const response = await axios.get(`${link}/api/ambarsariya/sell/member?memberAccessToken=${memberAccessToken}`);
    return response.data;
  }catch(error){
    throw error;
  }
}