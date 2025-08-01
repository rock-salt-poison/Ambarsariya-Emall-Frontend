import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, LinearProgress } from '@mui/material';
import Logo from '../Components/Home/Logo';
import Clock from '../Components/Home/Clock';
import Compass from '../Components/Home/Compass';
import RadioSong from '../Components/Home/RadioSong';
import LEDNotice from '../Components/Home/LEDNotice';
import Buttons from '../Components/Home/Buttons';
import Boards from '../Components/Home/Boards';
import noticeBoardImg from '../Utils/images/notice-board.png';
import RadioboardImg from '../Utils/images/radio-board.png';
import timeTableButtonImg from '../Utils/images/timetable-button-bg.png';
import AQIButtonImg from '../Utils/images/aqi-button-bg.png';
import hornSound from '../Utils/audio/horn-sound.mp3';
import _3SbgImg from '../Utils/images/3s-button-bg.png';
import hall_gate from '../Utils/images/hall_gate_mobile.webp';
import TimeTablePopup from '../Components/Home/Popups/TimeTablePopup';
import AQIPopup from '../Components/Home/Popups/AQIPopup';
import { useNavigate } from 'react-router-dom';
import LogoPopup from '../Components/Home/Popups/LogoPopup';
// import { useLoadingContext } from '../contexts/LoadingContext'; // Import the loading context
import LoadingIndicator from '../Components/LoadingIndicator';
import { useSelector } from 'react-redux';
import Button2 from '../Components/Home/Button2';
import { useLogout } from '../customHooks/useLogout';
import { getUser } from '../API/fetchExpressAPI';
import UserBadge from '../UserBadge';

export default function Home() {
    const navigate = useNavigate();
    // const { startLoading, stopLoading } = useLoadingContext(); // Use loading context functions
    const [audio] = useState(new Audio(hornSound));
    const [openPopup, setOpenPopup] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = useSelector((state) => state.auth.userAccessToken);
    const [userType, setUserType] = useState('');
    const handleLogout = useLogout();
    const [userIcon, setUserIcon] = useState(null);
    

    // useEffect(()=> {
    //     fetchUserType(token, setUserIcon);
    //   }, [token]);

    const handleClose = () => {
        setOpenPopup(null);
    };

    const handleClick = (e, popupType) => {
        e.preventDefault(); 

        const timeTableOrAqiElement = e.target.closest('.timeTable, .aqi');
        const logoParentElement = e.target.closest('.logoParent');
        const btnsParentElement = e.target.closest('.sell, .serve, .socialize');
        const clockParentElement = e.target.closest('.sub-wrapper');
        const noticeParentElement = e.target.closest('.noticeBoardParent');


        if (timeTableOrAqiElement) {
            e.target.parentElement.parentElement.classList.add('reduceSize');
            setTimeout(() => {
                e.target.parentElement.parentElement.classList.remove('reduceSize');
            }, 500);
            audio.play();
        } else if (logoParentElement) {
            const parentElement = e.target.parentElement;
            parentElement.classList.add('reducedLogo');
            setTimeout(() => {
                parentElement.classList.remove('reducedLogo');
            }, 500);
            audio.play();
        } else if (btnsParentElement) {
            const superParentElement = e.target.parentElement.parentElement;
            const parentElement = e.target.parentElement;
            superParentElement.classList.add('reduceSize2');
            parentElement.classList.add('reduceSize3');
            setTimeout(() => {
                superParentElement.classList.remove('reduceSize2');
                parentElement.classList.remove('reduceSize3');
            }, 500);

            audio.play();
            setLoading(true); // Start global loading

            setTimeout(() => {
                if (btnsParentElement.classList.contains('sell')) {
                    navigate('/sell');
                }
                else if (btnsParentElement.classList.contains('serve')) {
                    navigate(token ? '/serve' : '/serve/login');
                }
                else if (btnsParentElement.classList.contains('socialize')) {
                    navigate(token ? '/socialize':'/socialize/login');
                }
                setLoading(false); // Stop global loading after 800ms
            }, 1000);
        } else if (clockParentElement) {
            clockParentElement.parentElement.previousElementSibling.classList.add('reduceSize3');
            setTimeout(() => {
                clockParentElement.parentElement.previousElementSibling.classList.remove('reduceSize3');
            }, 300);
            setLoading(true);

            setTimeout(() => {
                navigate('/clock');
                setLoading(false);
            }, 800);
            audio.play();
        }else if (noticeParentElement){
            e.target.parentElement.classList.add('reduceSize3');
            setTimeout(() => {
                e.target.parentElement.classList.remove('reduceSize3');
            }, 500);
            setTimeout(() => {
                navigate('notice');
            }, 1000);
            audio.play();
        }

        setTimeout(() => setOpenPopup(popupType), 1200);
    };

    useEffect(()=> {
        if(token){
            const fetch_user_type = async () => {
                const user = (await getUser(token))[0];
                setUserType(user.user_type);
            } 
            fetch_user_type();
        }
    }, [token]);

    const buttonsData = [
        { id: 1, text: "Time Table", cName: 'timeTable', imgSrc: timeTableButtonImg, alt: "time-table", handleClickFunction: (e) => handleClick(e, 'TimeTable') },
        { id: 2, text: "AQI", cName: 'aqi', imgSrc: AQIButtonImg, alt: "air-quality-index", handleClickFunction: (e) => handleClick(e, 'AQI') },
        { id: 3, text: "Sell", cName: 'sell', imgSrc: _3SbgImg, alt: "sell", handleClickFunction: (e) => handleClick(e, 'Sell') },
        { id: 4, text: "Serve", cName: 'serve', imgSrc: _3SbgImg, alt: 'serve', handleClickFunction: (e) => handleClick(e, 'Serve') },
        { id: 5, text: "Socialize", cName: 'socialize', imgSrc: _3SbgImg, alt: 'socialize', handleClickFunction: (e) => handleClick(e, 'Socialize') }
    ];

    return (
        <Box className="bg banner">
            {/* Global Loading Indicator */}
            {loading && <Box className="loading"><CircularProgress/></Box>}

            <Box className="row">
                {/* Logo */}
                <Logo handleClickFunction={(e) => handleClick(e, 'logo')} />

                
                <Box className="img_container">
                    <Box component="img" src={hall_gate} alt="hall-gate" className='hall_gate'/>
                    <Box className="body_content">
    {/* Second Row Time Table & AQI */}
                    <Box>
                        {
                            buttonsData.slice(0, 2).map((data) => {
                                return <Buttons key={data.id} cName={data.cName} text={data.text} imgSrc={data.imgSrc} alt={data.alt} handleClickFunction={data.handleClickFunction} />
                            })
                        }
                    </Box>

                    {/* Third Row Clock & Compass */}
                    <Box>
                        <Clock handleClick={(e) => { handleClick(e) }} />
                        <Compass />
                    </Box>

                    {/* Fourth Row Notice & Radio Board */}
                    <Box>
                        <Boards parentClassName="noticeBoardParent" text="Notice" imgClassName="noticeBoardImg" imgSrc={noticeBoardImg} alt="notice-board" handleClick = {(e) => { handleClick(e) }}/>
                        <Boards parentClassName="radioBoardParent" text="Radio" imgClassName="radioBoardImg" alt="radio-board" imgSrc={RadioboardImg} />
                    </Box>

                    {/* Fifth Row Song Playing */}
                    {/* <Box className="row2">
                        {
                            buttonsData.slice(2).map((data) => {
                                return <Buttons key={data.id} cName={data.cName} text={data.text} imgSrc={data.imgSrc} alt={data.alt} handleClickFunction={data.handleClickFunction} />
                            })
                        }
                    </Box> */}

                    {/* Sixth Row Notice */}
                    {/* <Box sx={{ flexDirection: 'column' }} className="container_group">
                        <Box>
                            <RadioSong />
                        </Box>
                        <Box className="led_board_container">
                            <LEDNotice />
                        </Box>
                    </Box> */}

                    <Box className="row2">
                        <Box></Box>
                        <Box className="container">
                            {
                                buttonsData.slice(2).map((data) => {
                                    return <Buttons key={data.id} cName={data.cName} text={data.text} imgSrc={data.imgSrc} alt={data.alt} handleClickFunction={data.handleClickFunction} />
                                })
                            }
                        </Box>
                        {/* <Box> */}
                            <RadioSong />
                        {/* </Box> */}
                    </Box>

                        
                        <Box className="led_board_container">
                            <LEDNotice />
                        </Box>
                    </Box>

                </Box>

                

            {/* {token ? <Button2 optionalcName='logoutBtn' text={`Logged in as ${userType}`} onClick={() => handleLogout('../')}/>:<Button2 optionalcName='logoutBtn' text={`Login`} redirectTo='sell/login'/>} */}
            <UserBadge handleLogin="sell/login" handleLogoutClick="../../" optionalDialogCname='home'/>
            </Box>
            


            {openPopup === 'logo' && <LogoPopup open={true} handleClose={handleClose} />}
            {openPopup === 'TimeTable' && <TimeTablePopup open={true} handleClose={handleClose} />}
            {openPopup === 'AQI' && <AQIPopup open={true} handleClose={handleClose} />}
        </Box>
    );
}
