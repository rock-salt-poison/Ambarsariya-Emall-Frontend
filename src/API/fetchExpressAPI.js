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
        console.error("Error posting e-shop data:", error);
        throw error; 
    }
};

export const updateEshopData = async (eshopData, shopAccessToken) => {
    try {
      const response = await axios.put(
        `${link}/api/ambarsariya/sell/buyeshop/${shopAccessToken}`, 
        eshopData
      );
      console.log('E-shop data updated:', response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating e-shop data:", error);
      throw error; 
    }
};

export const getShopUserData = async (shopAccessToken) => {
    try{
      const response = await axios.get(`${link}/api/ambarsariya/sell/shop-user-data?shop_access_token=${shopAccessToken}`);
      console.log('Shop and user data : ', response.data);
      return response.data;
    }catch(error){
      console.log('Error fetching shop-user data', error);
      throw error;
    }
}
  

export const authenticateUser = async (data) => {
    try{
      const response = await axios.post(`${link}/api/ambarsariya/sell/login`, data);
      console.log(response.data);
      return response.data;
    }catch(error){
      console.log('Error while login', error);
      throw error;
    }
}
  
export const otherShops = async (shopAccessToken) => {
  try{
    const response = await axios.get(`${link}/api/ambarsariya/sell/shops?shopAccessToken=${shopAccessToken}`);
    return response.data;
  }catch(error){
    console.log("Error fetching other shops", error);
    throw error;
  }
}


export const getCategories = async (data) => {
  try{
    const response = await axios.get(`${link}/api/ambarsariya/categories?domain_id=${data.domain_id}&sector_id=${data.sector_id}`);
    return response.data;
  }catch(e){
    console.log("Error fetching categories : ", e);
    throw e;
  }
}

export const getAllCategories = async () => {
  const response = await axios.get(`${link}/api/ambarsariya/allCategories`);
  return response.data;
};