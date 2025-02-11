import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import Header from "../Components/Serve/SupplyChain/Header";
import NoticeBoard from "../Components/Home/NoticeComponents/NoticeBoard";
import { useParams } from "react-router-dom";
import NoticeDetail from "../Components/Home/NoticeComponents/NoticeDetail";
import { get_notice } from "../API/fetchExpressAPI";

function Notice() {
  const { title } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const convert_case_to_capitalize = (title) => {
    if (title) {
      const title_array = title.split("-");
      const resp = title_array.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      );
      const heading = resp.join(" ");
      return heading;
    }
  };

  const fetch_notice_from_database = async () => {
    try{
      setLoading(true);
      const  resp = await get_notice();
      if(resp){
        setData(resp.data);
        setLoading(false);
      }
      console.log(resp.data);
    }catch(e){
      console.log(e);
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetch_notice_from_database();
  },[])
  // const data=[
  //       {id:1, title:'District Administration', desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique dolores quod praesentium voluptatibus sit possimus accusamus soluta doloribus quasi consequuntur.', date:'01/01/2025'},
  //       {id:2, title:'City Events', desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique dolores quod praesentium voluptatibus sit possimus accusamus soluta doloribus quasi consequuntur.', date:'01/10/2025'},
  //       {id:3, title:'Ambarsariya Mall Events', desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique dolores quod praesentium voluptatibus sit possimus accusamus soluta doloribus quasi consequuntur.', date:'01/21/2025'},
  //       {id:4, title:'Thought Of The Day', desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit.', date:'01/01/2025'},
  //   ]

  return (
    <Box className="notice_wrapper">
      {loading && (
        <Box className="loading">
          <CircularProgress />
        </Box>
      )}
      <Box className="row">
        <Header
          back_btn_link={
            title ? "../AmbarsariyaMall/notice" : "../AmbarsariyaMall"
          }
          nextBtn={true}
          title_container={true}
          title={title ? convert_case_to_capitalize(title) : "Notice"}
          redirectTo={title ? -1 : "../AmbarsariyaMall"}
        />
        {data?.length>0 ? (<Box className="col">
          {title ? (
            <NoticeDetail
              title={convert_case_to_capitalize(title)}
              data={data}
            />
          ) : (
            <NoticeBoard data={data} />
          )}
        </Box>) : <Box className="col error">
          <Typography className="desc">No New Notice</Typography>
        </Box> }
      </Box>
    </Box>
  );
}

export default Notice;
