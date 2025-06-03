import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../SupplyChain/Header'
import CardBoardPopup from '../../CardBoardPopupComponents/CardBoardPopup'

function CardsGrid({cards_data, title, component_className, backLink, nextLink, redirectTo}){

  const navigate = useNavigate();

  const handleClick = (e, id, link, popup)=>{
    e.preventDefault();
    if(link){
      navigate(link)
    }
    else if (popup){
      setOpenPopupId((prevId) => (prevId === id ? null : id));  
    }
  }

  const [openPopupId, setOpenPopupId] = useState(null);

  const handleClose = () => {
    setOpenPopupId(false);
  }

  return (
    <Box className={component_className}>

      {title ?  <Box className="row">
            <Header back_btn_link={backLink} next_btn_link={nextLink} heading_with_bg={true} title={title} redirectTo={redirectTo}/>

            <Box className="col">
                <Box className="container">
                  {cards_data.map((card)=>{
                    return <Link className="card" key={card.id} to={card.linkTo}>
                    <Box component="img" src={card.imgSrc} className='card_icon' alt={card.title}/>
                    <Typography className='card_title'>{card.title}</Typography>
                  </Link>
                  })}
                    
                </Box>
            </Box>
        </Box> : <Box className="col">
                <Box className="container">
                  {cards_data.map((card)=>{
                    return <React.Fragment key={card.id}><Link className="card"  onClick={(e)=>handleClick(e, card.id, card.linkTo, card.popupcontent)}>
                    <Box component="img" src={card.imgSrc} className='card_icon' alt={card.title}/>
                    <Typography className='card_title'>{card.title}</Typography>
                  </Link>
                  <CardBoardPopup open={openPopupId===card.id} handleClose={handleClose} title={card.title} body_content={card.popupcontent} optionalCName="financial" iconSrc={card.iconSrc} texturedSheet={card.texturedSheet}/>
                  </React.Fragment>
                  })}
                </Box>
            </Box>}
    </Box>
  )
}

export default CardsGrid