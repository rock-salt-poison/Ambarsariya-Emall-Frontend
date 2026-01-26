import React, { useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import UserBadge from "../../UserBadge";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import hornSound from "../../Utils/audio/horn-sound.mp3";
import quote from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/quotes.png";
import CheckIcon from '@mui/icons-material/Check';

function ConnectWithUtilities() {
  const [audio] = useState(new Audio(hornSound));
  const [activeFit, setActiveFit] = useState("standard"); // Default to first card

  const handleCardClick = (fitType) => {
    audio.play();
    setActiveFit(fitType);
  };

  const handleRadioClick = (fitType, e) => {
    e.stopPropagation();
    audio.play();
    setActiveFit(fitType);
  };

  const fitCards = [
    {
      id: "standard",
      title: "Standard Fit",
      subtitle: "Perfect for general business needs.",
      features: [
        "Product Listings",
        "GST Invoice",
        "Inventory Management",
        "SHOP QR"
      ]
    },
    {
      id: "custom",
      title: "Custom Fit",
      subtitle: "Tailored to your specific requirements.",
      features: [
        "Product Identifiers",
        "MoU, Selection Process, Ranking",
        "40 % Growth SET",
        "Finance, Co-helpers, Price-Books, Store."
      ]
    },
    {
      id: "taylor",
      title: "Taylor Fit",
      subtitle: "Premium solution for enterprise needs.",
      features: [
        "Domain Sector Category Specific",
        "Synthetic, Real, Scientific Data",
        "CRM, MOU, ERP 100% Growth SET",
        "Formulated and Pre-Fault Detections",
        "4 Years ERP SET Target Achievement ~97%"
      ]
    }
  ];

  const tableData = [
    {
      fit: "Standard Fit",
      connect: "",
      services: ["Table Away", "Parking", "Delivery", "Home Visit"],
      enhanced: "Inventory Management",
      edge: "Connect your payable / Receivable via Bank UPI",
      spark: "Curated your invoices for daily sale & purchase"
    },
    {
      fit: "Custom Fit",
      connect: "",
      services: ["Co-Workers", "For-Paid", "Post Paid", "SKU"],
      enhanced: "Shop Management Financial / HR / \nSuppliers / Supply Stock Management",
      edge: "Analytics & Relations / CRM / Campaigns",
      spark: "Create \"Mall\" Supply & Supplier's Chain."
    },
    {
      fit: "Taylor Fit",
      connect: "",
      services: ["Domains", "Social", "Category Specific"],
      enhanced: "Bond, Scientific Data.",
      edge: "M-I, CRM, Sure 100 % Growth",
      spark: "4 Years ERP, But Flag After 4 Years"
    }
  ];

  return (
    <Box className="connect_with_utilities_wrapper">
      <Box className="row">
        <Box className="col">
          <UserBadge
            handleLogoutClick="../../"
            handleBadgeBgClick={-1}
            handleLogin="../login"
          />
        </Box>

        {/* Top Quote Section */}
        <Box className="col quote_container quote_2">
          <Box
            component="img"
            src={quote}
            alt="quotes"
            className="quotes"
          />
          <Box className="blockquote">
            <Typography className="quote">
            The future of business belongs to enterprises that Integrate, Automate, and Adapt.
            </Typography>
            <Typography className="author">
              — Ashwani Kumar, Author of{" "}
              <Typography variant="span">E-Mall</Typography>.
            </Typography>
          </Box>
          <Box
            component="img"
            src={quote}
            alt="quotes"
            className="quotes end"
          />
        </Box>

        {/* Three Fit Cards */}
        <Box className="col fit_cards_container">
          {fitCards.map((card) => (
            <Box
              key={card.id}
              className={`fit_card ${activeFit === card.id ? "active" : ""}`}
              onClick={() => handleCardClick(card.id)}
            >
              <Box className="card_header">
                <Typography className="card_title">{card.title}</Typography>
                <Box 
                  className={`card_icon_wrapper ${activeFit === card.id ? "active" : ""}`}
                  onClick={(e) => handleRadioClick(card.id, e)}
                >
                  {activeFit === card.id ? (
                    <CheckCircleIcon className="radio_icon" />
                  ) : (
                    <RadioButtonUncheckedIcon className="radio_icon" />
                  )}
                </Box>
              </Box>
              <Typography className="card_subtitle">{card.subtitle}</Typography>
              <Box className="card_features">
                {card.features.map((feature, index) => (
                  <Box key={index} className="feature_item">
                    <CheckIcon className="check_icon" />
                    <Typography className="feature_text">{feature}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Feature Table */}
        <Box className="col table_container">
          <TableContainer component={Paper} className="feature_table">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="table_header">
                    <Box className="cell_col">
                    Connect
                    <Typography variant="span">Your Shop with Utilities</Typography>
                    </Box>
                  </TableCell>
                  <TableCell className="table_header">
                    <Box className="cell_col">
                    Services
                    <Typography variant="span">Provided by E-mall</Typography>
                    </Box>
                  </TableCell>
                  <TableCell className="table_header">
                    <Box className="cell_col">
                    Enhanced
                    <Typography variant="span">Invoice Connect</Typography>
                    </Box>
                  </TableCell>
                  <TableCell className="table_header">
                    <Box className="cell_col">
                    Edge
                    <Typography variant="span">Store Connect</Typography>
                    </Box>
                  </TableCell>
                  <TableCell className="table_header">
                    <Box className="cell_col">
                    Spark
                    <Typography variant="span">Sales Mount Connect</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="table_fit_name">{row.fit || ""}</TableCell>
                    <TableCell>
                      {Array.isArray(row.services) ? (
                        <Box>
                          {row.services.map((service, idx) => (
                            <Typography key={idx} className="service_item">
                              {service}
                            </Typography>
                          ))}
                        </Box>
                      ) : (
                        row.services
                      )}
                    </TableCell>
                    <TableCell>{row.enhanced}</TableCell>
                    <TableCell>{row.edge}</TableCell>
                    <TableCell>{row.spark}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Bottom Quote Section */}
        <Box className="col quote_container quote_2">
          <Box
            component="img"
            src={quote}
            alt="quotes"
            className="quotes"
          />
          <Box className="blockquote">
            <Typography className="quote">
            Sales creates Customers, Services creates Relationship and Deliverance evoke Bonds.
            </Typography>
            <Typography className="author">
              — Ashwani Kumar, Author of{" "}
              <Typography variant="span">E-Mall</Typography>.
            </Typography>
          </Box>
          <Box
            component="img"
            src={quote}
            alt="quotes"
            className="quotes end"
          />
        </Box>
        
      </Box>
    </Box>
  );
}

export default ConnectWithUtilities;
