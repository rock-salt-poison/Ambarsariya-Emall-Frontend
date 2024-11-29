import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import "../../styles/variables.scss";
import shop_detail_book_img from "../../Utils/images/Sell/merchant_details/books.webp";
import shop_detail_prepair_services_img from "../../Utils/images/Sell/merchant_details/stationry_img_1.png";
import shop_detail_service_type_img from "../../Utils/images/Sell/merchant_details/paint_palette_img.webp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CardBoardPopup from "../CardBoardPopupComponents/CardBoardPopup";
import PrepaidPostpaid from "../Cart/Prepaid_Postpaid/PrepaidPostpaid";
import ServiceType from "../Cart/ServiceType/ServiceType";

function ServicesTypeCard({ token }) {
  const [openPopup, setOpenPopup] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Use location to preserve the query parameter

  const handleClick = (e, service) => {
    e.preventDefault();
    setOpenPopup((prev) => (prev === service.id ? null : service.id));
  };

  const data = [
    {
      id: 1,
      type: "Products",
      link: `../shop/${token}/products`, // This is where navigation happens
      imgSrc: shop_detail_book_img,
    },
    {
      id: 2,
      type: "Prepaid / Postpaid",
      imgSrc: shop_detail_prepair_services_img,
      popupContent: <PrepaidPostpaid />,
      cName: "prepaid_postpaid_offer_popup",
    },
    {
      id: 3,
      type: "Service Type",
      imgSrc: shop_detail_service_type_img,
      popupContent: <ServiceType />,
      cName: "service_type_popup",
    },
  ];

  const handleClose = () => {
    setOpenPopup(false);
  };

  return (
    <Box className="services_type_wrapper">
      {data.map((service) => {
        return (
          <React.Fragment key={service.id}>
            {/* Use Link for "Products" (no popup) */}
            {service.id === 1 ? (
              <Link
                to={service.link}
                className="card"
                state={{ fromPopup: true }} // Pass state to maintain URL
              >
                <Box className="card_body">
                  <Box
                    component="img"
                    src={service.imgSrc}
                    className="product_img"
                  />
                  <Typography className="text">{service.type}</Typography>
                </Box>
              </Link>
            ) : (
              // Handle popups for Prepaid/Postpaid and Service Type
              <Link
                to={service.link}
                className="card"
                onClick={(e) => {
                  handleClick(e, service); // Open popup and preserve token in URL
                }}
                state={{ fromPopup: true }} // Pass state with the link
              >
                <Box className="card_body">
                  <Box
                    component="img"
                    src={service.imgSrc}
                    className="product_img"
                  />
                  <Typography className="text">{service.type}</Typography>
                </Box>
              </Link>
            )}

            <CardBoardPopup
              open={openPopup === service.id}
              handleClose={handleClose}
              customPopup={true}
              body_content={service.popupContent}
              optionalCName={service.cName}
            />
          </React.Fragment>
        );
      })}
    </Box>
  );
}

export default ServicesTypeCard;
