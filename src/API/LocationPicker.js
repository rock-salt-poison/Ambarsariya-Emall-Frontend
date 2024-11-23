export async function LocationPicker() {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
  
      console.log("the main error is  : " , error);
      throw error;
    }
  }