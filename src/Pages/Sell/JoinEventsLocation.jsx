import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import hornSound from '../../Utils/audio/horn-sound.mp3';
import UserBadge from '../../UserBadge';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { NumbersOutlined } from '@mui/icons-material';
import { get_member_events, getUser } from '../../API/fetchExpressAPI';
import { useSelector } from 'react-redux';

function JoinEventsLocation() {
  const [audio] = useState(new Audio(hornSound));
  const navigate = useNavigate();
  const [relations , setRelations] = useState([]);
  const [loading , setLoading] = useState(false);
  const [user , setUser] = useState({});
  const token = useSelector((state) => state.auth.userAccessToken);
  

  const handleClick = async (e, type) => {
    if(type){
      e.preventDefault();
      const target = e.target.closest(".card");
      if(target){
          target.classList.toggle('reduceSize3');
          audio.play();
          
          setTimeout(()=>{
              target.classList.toggle('reduceSize3');
          },300)
  
          setTimeout(()=>{
              if(type==='Join'){
                navigate('../esale/locations/events/join')
              } else if(type==='Create'){
                navigate('../esale/locations/events/create')
              }
          }, 600)
      }
    }
  }

const fetchCurrentUserData = async (token) => {
        if (token) {
          try {
            setLoading(true);
            const resp = await getUser(token);
            if (resp?.[0].user_type === "member") {
              const userData = resp?.[0];
              setUser(userData);

              const relationsResp = await fetchMemberEvents(
                    userData?.member_id,
                );
                if (relationsResp?.valid) {
                    console.log(relationsResp?.data);
                    setRelations(relationsResp?.data);
                }
      
            }
          } catch (e) {
            console.error(e);
          } finally {
            setLoading(false);
          }
        }
      };      

  
  useEffect(() => {
      if (token) {
        fetchCurrentUserData(token);
      }
    }, [token])

  const fetchMemberEvents = async (member_id) => {
    if(member_id){
      try{
        setLoading(true);
        const resp = await get_member_events(member_id);
        if(resp.valid){
          setRelations(resp.data);
        }
      }catch(e){

      }finally{
        setLoading(false);
      }
    }
  }

  return (
    <Box className='member_location_join_event_wrapper'>
      {loading && <Box className="loading"><CircularProgress/></Box>}
      <Box className="row">
        <Box className="col header_badge">
          <Box className="heading_container">
            <Typography className="title">Join</Typography>
          </Box>
          <Box className="title_container">
              <Link to='../../sell/esale/locations/events'>
                <Typography className="title">events</Typography>
              </Link>
          </Box>

          <UserBadge
              handleBadgeBgClick="../esale/locations/events"
              handleLogin="../login"
              handleLogoutClick="../../"
          />
        </Box>

         <Box className="col">
            <Box className="container">
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={40}
                    loop={true}
                    autoplay={{
                      delay: 1200,
                      disableOnInteraction: false,
                    }}
                    speed={1500}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                  >
                    {relations?.map((r, index) => {return <SwiperSlide className="frame" key={index}>
                      <Box className="outer-frame">
                          <Box className="inner-frame">
                              <Box component='img' src={r.uploaded_file_link} alt='img' className="img"/>
                          </Box>
                      </Box>
        
                      <Box className="details">
                          <Box className="group">
                            <Typography className="heading">Time : </Typography>
                            <Typography className="description">{r.time}</Typography>
                          </Box>
                          <Box className="group">
                            <Typography className="heading">Date : </Typography>
                            <Typography className="description">{(r.date)?.split('T')?.[0]}</Typography>
                          </Box>
                          <Box className="group">
                            <Typography className="heading">Location : </Typography>
                            <Typography className="description">{r.location}</Typography>
                          </Box>
                          <Box className="group">
                            <Typography className="heading">Engagement : </Typography>
                            <Typography className="description">{r.engagement}</Typography>
                          </Box>
                          <Box className="group">
                            <Typography className="heading">Status : </Typography>
                            <Typography className="description">{r.event_type}</Typography>
                          </Box>
                          <Box className="group">
                            <Typography className="heading">Purpose : </Typography>
                            <Typography className="description">{r.purpose}</Typography>
                          </Box>
                          <Box className="group">
                            <Typography className="heading">Rules and Description : </Typography>
                            <Typography className="description"> {r.rules_or_description} </Typography>
                          </Box>
                      </Box>
                    </SwiperSlide> })}
                  </Swiper>
                  </Box>
            </Box>
      </Box>
    </Box>
  );
}

export default JoinEventsLocation;
