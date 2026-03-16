import { Box } from '@mui/material'
import React, { useState } from 'react'
import UserBadge from '../../UserBadge'
import daily_delivery from '../../Utils/images/Socialize/citizens/sale/daily_delivery_icon.webp';
import location from '../../Utils/images/Socialize/citizens/sale/location_icon.webp';
import memo from '../../Utils/images/Socialize/citizens/sale/memo_icon.webp';
import sale from '../../Utils/images/Socialize/citizens/sale/sale_icon.webp';
import { Link } from 'react-router-dom';
import CardBoardPopup from '../../Components/CardBoardPopupComponents/CardBoardPopup';
import MemoPopup from '../../Components/Socialize/MemoPopup';


function Sale() {
  const [openMemoPopup, setOpenMemoPopup] = useState(false);

  const handleMemoClick = (e) => {
    const target = e.currentTarget;
    if (!target) return;

    target.classList.add('reduceSize3');
    setTimeout(() => {
      target.classList.remove('reduceSize3');
    }, 300);

    setTimeout(() => {
      setOpenMemoPopup(true);
    }, 600);
  };

  const handleCloseMemoPopup = () => {
    setOpenMemoPopup(false);
  };

  const data = [
    {id:1, icon: daily_delivery},
    {id:2, icon: memo},
    {id:3, icon: location},
    {id:4, icon: sale},
  ]
  return (
    <Box className="sale_wrapper">
        <Box className="row">
            <Box className="col">
                <UserBadge
                    handleLogoutClick="../../"
                    handleBadgeBgClick={-1}
                    handleLogin="login"
                />
            </Box>
            <Box className="col">
              <Box className="card_container">
                {data?.slice(0, 2)?.map((card)=>{
                  return (
                    <Link
                      key={card.id}
                      className="card"
                      onClick={card.id === 2 ? handleMemoClick : undefined}
                    >
                      <Box component="img" src={card?.icon} alt="icon" className='icon'/>
                    </Link>
                  );
                })}
              </Box>
              <Box className="card_container">
                {data?.slice(2)?.map((card)=>{
                  return (
                    <Link key={card.id} className="card">
                      <Box component="img" src={card?.icon} alt="icon" className='icon'/>
                    </Link>
                  );
                })}
              </Box>
            </Box>
        </Box>

        <CardBoardPopup
          open={openMemoPopup}
          handleClose={handleCloseMemoPopup}
          customPopup={true}
          optionalCName="mou"
          body_content={<MemoPopup />}
        />
    </Box>
  )
}

export default Sale