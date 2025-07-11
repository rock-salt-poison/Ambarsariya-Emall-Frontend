import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import Button2 from '../../Components/Home/Button2';
import emotionalIcon from '../../Utils/images/Sell/esale/emotional/emotional.png';
import emotional_range from '../../Utils/images/Sell/esale/emotional/emotional_range.webp';
import emotional_reactivity from '../../Utils/images/Sell/esale/emotional/emotional_reactivity.png';
import emotional_regulation from '../../Utils/gifs/emotional_regulation.gif';
import emotional_resolution from '../../Utils/images/Sell/esale/emotional/emotional_resolution.png';
import thumb_up from '../../Utils/images/Sell/esale/emotional/thumb_up.png';
import thumb_down from '../../Utils/images/Sell/esale/emotional/thumb_down.png';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Switch_On_Off from '../../Components/Form/Switch_On_Off';
import clock from '../../Utils/images/Sell/esale/emotional/clock.png'
import timetable from '../../Utils/images/Sell/esale/emotional/timetable.png'
import UserBadge from '../../UserBadge';
import { get_memberEmotional, getUser, post_memberEmotional } from '../../API/fetchExpressAPI';
import { useSelector } from 'react-redux';

function Esale_emotional() {
  const [data, setData] = useState(null);
  const [joyBarCount, setJoyBarCount] = useState(1);
  const [sadnessBarCount, setSadnessBarCount] = useState(1);
  const token = useSelector((state) => state.auth.userAccessToken);
  const [memberId, setMemberId] = useState('');
  const [loading , setLoading] = useState(false);

  // State to manage like/dislike for each question
  const [selectedIcons, setSelectedIcons] = useState({
    advice: false,
    share: false,
  });

  // State to manage switch on/off states
  const [stressSwitch, setStressSwitch] = useState(false);
  const [angerSwitch, setAngerSwitch] = useState(false);

  const handleAddBar = (setter, currentCount) => {
    if (currentCount < 10) {
      setter(currentCount + 1);
    }
  };

  const handleRemoveBar = (setter, currentCount) => {
    if (currentCount > 0) {
      setter(currentCount - 1);
    }
  };

   // Prepare data for API call
   const prepareData = () => {
    return {
      emotional_range_joy_to_excitement: joyBarCount,
      emotional_range_sadness_to_anger: sadnessBarCount,
      emotional_reactivity_like_advice: selectedIcons.advice,
      emotional_reactivity_share_experiences: selectedIcons.share,
      emotional_regulations_recall_adverse_emotions: stressSwitch,
      emotional_regulations_control_anger_and_crying: angerSwitch,
    };
  };

  // Call the API when state changes
  useEffect(() => {

    if(memberId){
      const sendEmotionalData = async () => {
        const payload = prepareData();
        console.log(payload);
        
        try {
          setLoading(true);
          const response = await post_memberEmotional(payload, memberId);
          console.log('Emotional data submitted:', response);
        } catch (error) {
          console.error('Failed to submit emotional data:', error);
        }finally{
          setLoading(false);
        }
      };
  
      // Trigger API call on any state change
      sendEmotionalData();
    }
  }, [joyBarCount, sadnessBarCount, selectedIcons, stressSwitch, angerSwitch]); 


  const fetchCurrentUserData = async (token) => {
    if(token){
      const resp = (await getUser(token))?.find(u => u?.member_id !== null);
      if(resp?.user_type === "member" || resp?.user_type === "merchant"){
        setMemberId(resp?.member_id);
        console.log(resp?.member_id);
        

        const emotionalresp = await get_memberEmotional(resp?.member_id);
        if(emotionalresp?.valid){
          setData(emotionalresp?.data?.[0]);
          console.log(emotionalresp?.data?.[0]);
        }
      }
    }
  }

  useEffect(() => {
    if (data) {
      setJoyBarCount(data?.emotional_range_joy_to_excitement || 1);
      setSadnessBarCount(data?.emotional_range_sadness_to_anger || 1);
      setSelectedIcons({
        advice: data?.emotional_reactivity_like_advice || false,
        share: data?.emotional_reactivity_share_experiences || false,
      });
      setStressSwitch(data?.emotional_regulations_recall_adverse_emotions || false);
      setAngerSwitch(data?.emotional_regulations_control_anger_and_crying || false);
    }
  }, [data]);
  
  useEffect (()=>{
    if(token){
      fetchCurrentUserData(token);
    }
  },[token])

  const renderBars = (barCount) => (
    <Box className="bars_container">
      {Array(barCount)
        .fill()
        .map((_, i) => (
          <Box key={i} className="bar" />
        ))}
    </Box>
  );

  // Handle icon click for specific question
  const handleIconClick = (question, icon) => {
    setSelectedIcons((prevState) => ({
      ...prevState,
      [question]: icon,
    }));
  };

  return (
    <Box className="esale_emotional_wrapper">
      {loading && <Box className="loading"><CircularProgress/></Box> }
      <Box className="row">
        <Box className="col">
          <Box className="container">
            {/* <Button2 text="Back" redirectTo="../esale" /> */}
          </Box>
          <Box className="container title">
            <Box className="heading">
              <Box component="img" src={emotionalIcon} alt="icon" className="icon" />
              <Typography className="title">Emotional</Typography>
            </Box>
          </Box>
          <Box className="container" display="flex" justifyContent="flex-end">
            {/* <Button2 text="Next" redirectTo="../esale/personal" /> */}
            <UserBadge
                handleBadgeBgClick={`../esale`}
                handleLogin="../login"
                handleLogoutClick="../../"
            />
          </Box>
        </Box>

        <Box className="col col_auto">
          <Box className="boards_container">
            <Box className="board_pins">
              <Box className="circle"></Box>
              <Box className="circle"></Box>
            </Box>

            <Box className="card">
              <Box className="card_header">
                <Box component="img" src={emotional_range} alt="emotional-range" className="icon" />
                <Typography className="heading" variant="h3">
                  Emotional Range
                </Typography>
              </Box>
              <Box className="card_body">
                <Box className="col">
                  <Typography className="title">Joy</Typography>
                  <Box className="range">
                    <RemoveIcon onClick={() => handleRemoveBar(setJoyBarCount, joyBarCount)} />
                    {renderBars(joyBarCount)}
                    <AddIcon onClick={() => handleAddBar(setJoyBarCount, joyBarCount)} />
                  </Box>
                  <Typography className="title">Excitement</Typography>
                </Box>

                <Box className="col">
                  <Typography className="title">Sadness</Typography>
                  <Box className="range">
                    <RemoveIcon onClick={() => handleRemoveBar(setSadnessBarCount, sadnessBarCount)} />
                    {renderBars(sadnessBarCount)}
                    <AddIcon onClick={() => handleAddBar(setSadnessBarCount, sadnessBarCount)} />
                  </Box>
                  <Typography className="title">Anger</Typography>
                </Box>
              </Box>
            </Box>

            <Box className="board_pins">
              <Box className="circle"></Box>
              <Box className="circle"></Box>
            </Box>
          </Box>

          <Box className="boards_container">
            <Box className="board_pins">
              <Box className="circle"></Box>
              <Box className="circle"></Box>
            </Box>

            <Box className="card card-2">
              <Box className="card_header">
                <Box component="img" src={emotional_reactivity} alt="emotional-reactivity" className="icon" />
                <Typography className="heading" variant="h3">
                  Emotional Reactivity
                </Typography>
              </Box>
              <Box className="card_body">
                <Box className="col">
                  <Typography className="title">Do you like advices</Typography>
                  <Box className="like_dislike">
                    <Box
                      component="img"
                      src={thumb_up}
                      alt="thumb-up"
                      className="thumb_icon"
                      style={{ opacity: selectedIcons.advice === true ? 1 : 0.5 }}
                      onClick={() => handleIconClick('advice', true)}
                    />
                    <Box
                      component="img"
                      src={thumb_down}
                      alt="thumb-down"
                      className="thumb_icon"
                      style={{ opacity: selectedIcons.advice === false ? 1 : 0.5 }} // Update based on selection
                      onClick={() => handleIconClick('advice', false)}
                    />
                  </Box>
                </Box>
                <Box className="col">
                  <Typography className="title">Do you share your experiences</Typography>
                  <Box className="like_dislike">
                    <Box
                      component="img"
                      src={thumb_up}
                      alt="thumb-up"
                      className="thumb_icon"
                      style={{ opacity: selectedIcons.share === true ? 1 : 0.5 }} // Update based on selection
                      onClick={() => handleIconClick('share', true)}
                    />
                    <Box
                      component="img"
                      src={thumb_down}
                      alt="thumb-down"
                      className="thumb_icon"
                      style={{ opacity: selectedIcons.share === false ? 1 : 0.5 }} // Update based on selection
                      onClick={() => handleIconClick('share', false)}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box className="board_pins">
              <Box className="circle"></Box>
              <Box className="circle"></Box>
            </Box>
          </Box>

          <Box className="boards_container">
            <Box className="board_pins">
              <Box className="circle"></Box>
              <Box className="circle"></Box>
            </Box>
        <Box className="card card-2">
          <Box className="card_header">
            <Box component="img" src={emotional_regulation} alt="emotional-regulation" className="icon" />
            <Typography className="heading" variant="h3">
              Emotional Regulation
            </Typography>
          </Box>
          <Box className="card_body">
            <Box className="col">
              <Typography className="title">
                Do You Manage Stress by Recalling Last Adverse Emotions
              </Typography>
              <Box className="like_dislike">
                <Switch_On_Off
                  name="stressSwitch"
                  checked={stressSwitch}
                  onChange={() => setStressSwitch(!stressSwitch)}
                  text1='Yes' text2='No'
                />
              </Box>
            </Box>
            <Box className="col">
              <Typography className="title">Do you wish to control Anger and Crying</Typography>
              <Box className="like_dislike">
                <Switch_On_Off
                  name="angerSwitch"
                  checked={angerSwitch}
                  onChange={() => setAngerSwitch(!angerSwitch)}
                  text1='Yes' text2='No'
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="board_pins">
              <Box className="circle"></Box>
              <Box className="circle"></Box>
            </Box>
      </Box>

      <Box className="boards_container">
        <Box className="board_pins">
              <Box className="circle"></Box>
              <Box className="circle"></Box>
            </Box>
        <Box className="card card-2">
          <Box className="card_header">
            <Box component="img" src={emotional_resolution} alt="emotional-resolution" className="icon" />
            <Typography className="heading" variant="h3">
              Emotional Resolution
            </Typography>
          </Box>
          <Box className="card_body">
            <Box className="col">
              <Box component="img" src={clock} alt="icon" className='clock_icon'/>
              <Typography className='title'>create a Resolution for Mental Intimation</Typography>
              <Box component="img" src={timetable} alt="icon" className='timetable_icon'/>
            </Box>
           
          </Box>
        </Box>
        <Box className="board_pins">
              <Box className="circle"></Box>
              <Box className="circle"></Box>
            </Box>
      </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Esale_emotional;
