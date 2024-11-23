import React, { useState } from 'react';
import { Box, LinearProgress } from '@mui/material';
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
import TimeTablePopup from '../Components/Home/Popups/TimeTablePopup';
import AQIPopup from '../Components/Home/Popups/AQIPopup';
import { useNavigate } from 'react-router-dom';
import LogoPopup from '../Components/Home/Popups/LogoPopup';
import { useLoadingContext } from '../contexts/LoadingContext'; // Import the loading context
import LoadingIndicator from '../Components/LoadingIndicator';

export default function Home() {
    const navigate = useNavigate();
    const { startLoading, stopLoading } = useLoadingContext(); // Use loading context functions
    const [audio] = useState(new Audio(hornSound));
    const [openPopup, setOpenPopup] = useState(null);

    const handleClose = () => {
        setOpenPopup(null);
    };

    const handleClick = (e, popupType) => {
        e.preventDefault();
        const loggedIn = !!localStorage.getItem('access_token');
        const timeTableOrAqiElement = e.target.closest('.timeTable, .aqi');
        const logoParentElement = e.target.closest('.logoParent');
        const btnsParentElement = e.target.closest('.sell, .serve, .socialize');
        const clockParentElement = e.target.closest('.sub-wrapper');


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
            startLoading(); // Start global loading

            setTimeout(() => {
                stopLoading(); // Stop global loading after 800ms
                if (btnsParentElement.classList.contains('sell')) {
                    navigate('/AmbarsariyaMall/sell');
                }
                else if (btnsParentElement.classList.contains('serve')) {
                    navigate(loggedIn ? '/AmbarsariyaMall/serve':'/AmbarsariyaMall/serve/login');
                }
            }, 1000);
        } else if (clockParentElement) {
            clockParentElement.parentElement.previousElementSibling.classList.add('reduceSize3');
            setTimeout(() => {
                clockParentElement.parentElement.previousElementSibling.classList.remove('reduceSize3');
            }, 300);
            startLoading();

            setTimeout(() => {
                stopLoading();
                navigate('/AmbarsariyaMall/clock');
            }, 800);
            audio.play();
        }

        setTimeout(() => setOpenPopup(popupType), 1200);
    };

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
            <LoadingIndicator />

            <Box className="row">
                {/* Logo */}
                <Logo handleClickFunction={(e) => handleClick(e, 'logo')} />

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
                    <Boards parentClassName="noticeBoardParent" text="Notice" imgClassName="noticeBoardImg" imgSrc={noticeBoardImg} alt="notice-board" />
                    <Boards parentClassName="radioBoardParent" text="Radio" imgClassName="radioBoardImg" alt="radio-board" imgSrc={RadioboardImg} />
                </Box>

                {/* Fifth Row Song Playing */}
                <Box className="row2">
                    {
                        buttonsData.slice(2).map((data) => {
                            return <Buttons key={data.id} cName={data.cName} text={data.text} imgSrc={data.imgSrc} alt={data.alt} handleClickFunction={data.handleClickFunction} />
                        })
                    }
                </Box>

                {/* Sixth Row Notice */}
                <Box sx={{ flexDirection: 'column' }}>
                    <Box>
                        <RadioSong />
                    </Box>
                    <Box>
                        <LEDNotice />
                    </Box>
                </Box>
            </Box>

            {openPopup === 'logo' && <LogoPopup open={true} handleClose={handleClose} />}
            {openPopup === 'TimeTable' && <TimeTablePopup open={true} handleClose={handleClose} />}
            {openPopup === 'AQI' && <AQIPopup open={true} handleClose={handleClose} />}
        </Box>
    );
}
