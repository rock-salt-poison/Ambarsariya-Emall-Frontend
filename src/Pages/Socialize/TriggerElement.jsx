import { Box, Typography } from '@mui/material'
import React, { useMemo, useState } from 'react'
import UserBadge from '../../UserBadge'
import plus_icon from '../../Utils/images/Socialize/citizens_main/trigger_elements/plus_icon.svg'
import arrow_icon from '../../Utils/images/Socialize/citizens_main/trigger_elements/arrow_icon.svg'
import TriggerPopup from '../../Components/Socialize/TriggerPopup'

function TriggerElement() {

    const [openPopup, setOpenPopup] = useState(false);
    const [popupCard, setPopupCard] = useState(null);

    const popupFieldsByCardTitle = useMemo(
      () => ({
        Relations: [
          { label: 'RELATION', name: 'relation', type: 'select', placeholder: 'SELECT RELATION', options: [] },
          { label: 'OCCASION', name: 'occasion', type: 'select', placeholder: 'OCCASION', options: [] },
          { label: 'DATE & TIME', name: 'date_time', type: 'datetime-local', placeholder: '', options: [] },
          { label: 'NAME', name: 'name', type: 'text', placeholder: 'NAME', options: [] },
        ],

        Vehicles: [
          { label: 'MODEL : YEAR', name: 'vehicle_model_year', type: 'text', placeholder: 'MODEL : YEAR', options: [] },
          { label: 'MAKER : COMPANY', name: 'vehicle_maker_company', type: 'text', placeholder: 'MAKER : COMPANY', options: [] },
          { label: 'VARIATION : COMPACT SUV', name: 'vehicle_variation', type: 'text', placeholder: 'VARIATION : COMPACT SUV', options: [] },
          { label: 'UPLOAD ODOMETER : READING', name: 'vehicle_odometer_upload', type: 'file', placeholder: 'UPLOAD ODOMETER : READING', options: [] },
        ],

        Hobbies: [
          { label: 'HOBBY 1', name: 'hobby_1', type: 'text', placeholder: 'Enter hobby', options: [] },
          { label: 'HOBBY 2', name: 'hobby_2', type: 'text', placeholder: 'Enter hobby', options: [] },
          { label: 'HOBBY 3', name: 'hobby_3', type: 'text', placeholder: 'Enter hobby', options: [] },
          { label: 'HOBBY 4', name: 'hobby_4', type: 'text', placeholder: 'Enter hobby', options: [] },
        ],

        'Dream plans': [
          { label: 'ENTER PICTURE', name: 'dream_picture', type: 'file', placeholder: 'Enter picture', options: [] },
          { label: 'ENTER PRICE', name: 'dream_price', type: 'number', placeholder: 'Enter price', options: [] },
          { label: 'ENTER LOCATION', name: 'dream_location', type: 'address', placeholder: 'Enter location', options: [] },
          { label: 'ENTER AIM DATE', name: 'dream_aim_date', type: 'date', placeholder: 'Enter aim date', options: [] },
        ],
      }),
      []
    );

    const handleCardClick = (e, card) => {
      if (!card || card.main) return;

      const target = e?.currentTarget;
      if (!target) return;

      target.classList.add('reduceSize3');

      setTimeout(() => {
        target.classList.remove('reduceSize3');
      }, 300);

      setTimeout(() => {
        setPopupCard(card);
        setOpenPopup(true);
      }, 600);
    };

    const data = [ 
        {id:1, title: 'Relations'},
        {id:2, title: 'Vehicles'},
        {id:3, title: 'Hobbies'},
        {id:4, title: 'Dream plans'},
        {id:5, main:true, title: 'Trigger', arrow: [{id:'one', arrow:true},
            {id:'two', arrow:true},
            {id:'three', arrow:true},
            {id:'four', arrow:true},
            {id:'five', arrow:true},
            {id:'six', arrow:true},
            {id:'seven', arrow:true},
            {id:'eight', arrow:true},]},
        {id:6, title: 'Colors'},
        {id:7, title: 'Luxury'},
        {id:8, title: 'Home'},
        {id:9, title: 'Brands'},
    ]

  return (
    <Box className="trigger_element_wrapper">
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
                    {data?.map((card)=>{
                        return (
                          <Box
                            className="card"
                            key={card.id}
                            onClick={(e) => handleCardClick(e, card)}
                            style={{ cursor: card.main ? 'default' : 'pointer' }}
                            role="button"
                            aria-disabled={card.main}
                          >
                            <Box component="img" src={plus_icon} alt="icon" className={`icon ${card.main && 'main'}`}/>
                            <Box className={`title_container ${card.main && 'main'}`}>
                              <Typography className="text">
                                {card.title}
                              </Typography>
                            </Box>
                            {card.arrow &&
                              card?.arrow?.map((arrow) => (
                                <Box component="img" key={arrow.id} src={arrow_icon} alt="arrow" className={`arrow_icon ${arrow.id}`}/>
                              ))}
                          </Box>
                        )
                    })}
               </Box>
            </Box>
        </Box>

        <TriggerPopup
          open={openPopup}
          handleClose={() => setOpenPopup(false)}
          cardTitle={popupCard?.title || ''}
          fields={popupCard ? popupFieldsByCardTitle[popupCard.title] || [] : []}
        />
    </Box>
  )
}

export default TriggerElement