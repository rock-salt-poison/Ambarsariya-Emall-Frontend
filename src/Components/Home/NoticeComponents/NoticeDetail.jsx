import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { get_notice } from "../../../API/fetchExpressAPI";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

function NoticeDetail() {
  const [noticeList, setNoticeList] = useState([]); // All notices for the slider
  const [loading, setLoading] = useState(false);
  const { title, id } = useParams(); // Get title and id from URL params

  // Fetch notice details and other notices with the same title
  const fetchNotices = async () => {
    try {
      setLoading(true);
  
      // Fetch the specific notice by id
      const specificNoticeResp = await get_notice(title, id);
  
      // Extract the specific notice
      const specificNotice =
        specificNoticeResp?.data && specificNoticeResp.data.length > 0
          ? specificNoticeResp.data[0]
          : null;
  
      // Fetch all other notices
      const allNoticesResp = await get_notice(); // Assuming this fetches all notices
  
      const allNotices = allNoticesResp?.data || [];
  
      // Filter out the notices where both title and id match the params
      const otherNotices = allNotices.filter(
        (notice) =>
          notice.title == title && notice.id !== parseInt(id) // Exclude matching title and id
      );
  
      // Combine the specific notice and the other notices
      const combinedNotices = specificNotice
        ? [specificNotice, ...otherNotices]
        : otherNotices;
  
      setNoticeList(combinedNotices); // Set the combined notices for the slider
    } catch (e) {
      console.error("Error fetching notices:", e);
      setNoticeList([]);
    } finally {
      setLoading(false);
    }
  };
  

  // Fetch notices when `title` or `id` changes
  useEffect(() => {
    if (title && id) {
      fetchNotices();
    }
  }, [title, id]);

  return (
    <>
      {loading && (
        <Box className="loading">
          <CircularProgress />
        </Box>
      )}

      {!loading && noticeList.length > 0 && (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          speed={2000}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Navigation]}
          className="mySwiper"
        >
          {noticeList.map((notice, index) => (
            <SwiperSlide key={index} className="card">
              <Box className="board">
                <Box className="board_pins">
                  <Box className="circle"></Box>
                  <Box className="circle"></Box>
                </Box>
                <Box className="container">
                  <Box className="details">
                    {notice?.notice_to && (
                      <Box className="col-auto">
                        <Typography className="heading">To</Typography>
                        <Typography className="desc">
                          {notice.notice_to}
                        </Typography>
                      </Box>
                    )}
                    {notice?.location && (
                      <Box className="col-auto">
                        <Typography className="heading">Location</Typography>
                        <Typography className="desc">
                          {notice.location}
                        </Typography>
                      </Box>
                    )}
                    {notice?.time && (
                      <Box className="col-auto">
                        <Typography className="heading">Time</Typography>
                        <Typography className="desc">{notice.time}</Typography>
                      </Box>
                    )}
                    {notice?.entry_fee && (
                      <Box className="col-auto">
                        <Typography className="heading">Entry Fee</Typography>
                        <Typography className="desc">
                          {notice.entry_fee}
                        </Typography>
                      </Box>
                    )}
                    {notice?.shop_name && (
                      <Box className="col-auto">
                        <Typography className="heading">Shop Name</Typography>
                        <Typography className="desc">
                          {notice.shop_name}
                        </Typography>
                      </Box>
                    )}
                    {notice?.member_name && (
                      <Box className="col-auto">
                        <Typography className="heading">Member Name</Typography>
                        <Typography className="desc">
                          {notice.member_name}
                        </Typography>
                      </Box>
                    )}
                    {notice?.community && (
                      <Box className="col-auto">
                        <Typography className="heading">Community</Typography>
                        <Typography className="desc">
                          {notice.community}
                        </Typography>
                      </Box>
                    )}
                    <Box className="col-auto">
                      <Typography className="heading">Date</Typography>
                      <Typography className="desc">
                        {notice?.from_date?.split("T")[0]} -{" "}
                        {notice?.to_date?.split("T")[0]}
                      </Typography>
                    </Box>
                  </Box>
                  {notice?.image_src && (
                    <Box
                      className="img"
                      component="img"
                      src={`${process.env.REACT_APP_EXPRESS_API_LINK}/notice_images/${notice.image_src}`}
                    />
                  )}
                  <Box className="notice">
                    <Box className="col-auto">
                      <Typography className="heading">Message</Typography>
                      <Box
                        className="desc"
                        dangerouslySetInnerHTML={{
                          __html: `${notice?.message || ""}`,
                        }}
                      ></Box>
                    </Box>
                  </Box>
                  {notice?.notice_from && (
                    <Box className="col-auto">
                      <Typography className="heading">From</Typography>
                      <Typography className="desc">
                        {notice.notice_from}
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Box className="board_pins">
                  <Box className="circle"></Box>
                  <Box className="circle"></Box>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}

export default NoticeDetail;
