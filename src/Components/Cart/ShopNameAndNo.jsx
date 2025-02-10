import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getShopUserData } from "../../API/fetchExpressAPI";

function ShopNameAndNo({token}) {

    const [data, setData] = useState(null);
      const navigate = useNavigate();
    
      const [loading, setLoading] = useState(false);
useEffect(() => {
    if (!token) {
      navigate("../login");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const resp = await getShopUserData(token);
        if (resp?.length > 0) {
          setData(resp[0]);
        } else {
          navigate("../login");
        }
      } catch (error) {
        console.error("Error fetching shop data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return (
    <>
    {data && <Typography variant="h2" className="heading">
      <Typography variant="span" className="span_1">
        {data?.business_name}
      </Typography>
      <Typography variant="span" className="span_1">
        Shop No:
        <Typography variant="span" className="span_2">
        {(data?.shop_no)?.split('_')?.[1]}
        </Typography>
      </Typography>
    </Typography>}
    
    </>
  );
}

export default ShopNameAndNo;
