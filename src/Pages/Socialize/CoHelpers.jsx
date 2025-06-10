import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import UserBadge from "../../UserBadge";
import { Link, useNavigate } from "react-router-dom";
import big_cloud from "../../Utils/images/Socialize/city_junctions/co_helpers/big_cloud.svg";
import small_cloud from "../../Utils/images/Socialize/city_junctions/co_helpers/small_cloud.svg";
import logistics_and_supply_chain_management from "../../Utils/images/Socialize/city_junctions/co_helpers/logistics_and_supply_chain_management.webp";
import environmental_and_waste_management from "../../Utils/images/Socialize/city_junctions/co_helpers/environmental_and_waste_management.webp";
import human_resources_and_staffing from "../../Utils/images/Socialize/city_junctions/co_helpers/human_resources_and_staffing.webp";
import facility_management from "../../Utils/images/Socialize/city_junctions/co_helpers/facility_management.webp";
import research_and_development from "../../Utils/images/Socialize/city_junctions/co_helpers/research_and_development.webp";
import engineering_and_design_services from "../../Utils/images/Socialize/city_junctions/co_helpers/engineering_and_design_services.webp";
import marketing_and_sales_department from "../../Utils/images/Socialize/city_junctions/co_helpers/marketing_and_sales_department.webp";
import finance_and_insurance from "../../Utils/images/Socialize/city_junctions/co_helpers/finance_and_insurance.webp";
import industrial_equipment_and_machinery from "../../Utils/images/Socialize/city_junctions/co_helpers/industrial_equipment_and_machinery.webp";
import quality_control_and_testing_services from "../../Utils/images/Socialize/city_junctions/co_helpers/quality_control_and_testing_services.webp";
import information_technology_and_automation from "../../Utils/images/Socialize/city_junctions/co_helpers/information_technology_and_automation.webp";
import health_and_safety_services from "../../Utils/images/Socialize/city_junctions/co_helpers/health_and_safety_services.webp";
import hornSound from "../../Utils/audio/horn-sound.mp3";
import CoHelperPopup from "../../Components/Socialize/CoHelperPopup";

function CoHelpers() {
  const navigate = useNavigate();
  const [audio] = useState(new Audio(hornSound));

  const cards = [
    {
      id: 1,
      title: "Logistics and Supply Chain Management",
      alt: "logistics-and-supply-chain-management",
      imgSrc: logistics_and_supply_chain_management,
      scope: "Management of the flow of goods from suppliers to manufacturers and from manufacturers to consumers.",
      services: ['Transportation', 'Warehousing', 'Inventory Management', 'Distribution'],
    },
    {
      id: 2,
      title: "Environmental and Waste Management",
      alt: "environmental-and-waste-management",
      imgSrc: environmental_and_waste_management,
      scope:
        "Managing waste and environmental impact of manufacturing activities.",
      services : ['Waste Disposal', 'Recycling', 'Pollution Control', 'Environmental Consulting'],
    },
    {
      id: 3,
      title: "Human Resources and Staffing",
      alt: "human-resources-and-staffing",
      imgSrc: human_resources_and_staffing,
      scope:
        "Providing workforce solutions to meet the labor needs of manufacturing sectors.",
      services : ['Recruitment', 'Staffing', 'Training', 'Workforce Management'],
    },
    {
      id: 4,
      title: "Research and Development",
      alt: "research-and-development",
      imgSrc: research_and_development,
      scope:
        "Conducting research and development to drive innovation in manufacturing processes and products.",
      services : ['Applied Research', 'Product Development', 'Testing', 'Innovation Consulting'],
    },
    {
      id: 5,
      title: "Engineering and Design Services",
      alt: "engineering-and-design-services",
      imgSrc: engineering_and_design_services,
      scope:
        "Providing engineering and design expertise for product development and manufacturing processes.",
      services : ['Product Design', 'Process Engineering', 'Prototyping', 'Simulation']
    },
    {
      id: 6,
      title: "Marketing and Sales Support",
      alt: "marketing-and-sales-support",
      imgSrc: marketing_and_sales_department,
      scope:
        "Supporting the marketing and sales efforts of manufacturing companies.",
      services : ['Market Research', 'Advertising', 'Sales Strategy Development', 'Customer Relationship Management'],
    },
    {
      id: 7,
      title: "Facility Management",
      alt: "facility-management",
      imgSrc: facility_management,
      scope:
        "Managing and maintaining manufacturing facilities to ensure optimal operation.",
      services : ['Building Maintenance', 'Janitorial Services', 'Security', 'Utilities Management']
    },
    {
      id: 8,
      title: "Finance and Insurance",
      alt: "finance-and-insurance",
      imgSrc: finance_and_insurance,
      scope:
        "Providing financial services and risk management solutions for manufacturing Operations.",
      services : ['Banking', 'Insurance', 'Leasing', 'Investment Services']
    },
    {
      id: 9,
      title: "Health and Safety Services",
      alt: "health-and-safety-services",
      imgSrc: health_and_safety_services,
      scope:
        "Ensuring the safety and well-being of workers in manufacturing environments.",
      services : ['Safety Training', 'Health Services', 'Risk Assessment', 'Compliance with Safety Regulations']
    },
    {
      id: 10,
      title: "Industrial Equipment and Machinery",
      alt: "industrial-equipment-and-machinery",
      imgSrc: industrial_equipment_and_machinery,
      scope:
        "Production and maintenance of equipment and machinery used in manufacturing processes.",
      services : ['Equipment Supply', 'Installation', 'Maintenance', 'Repair']
    },
    {
      id: 11,
      title: "Quality Control and Testing Services",
      alt: "quality-control-and-testing-services",
      imgSrc: quality_control_and_testing_services,
      scope:
        "Ensuring that products meet required standards and specifications.",
      services : ['Inspection', 'Testing', 'Certification', 'Compliance Auditing']
    },
    {
      id: 12,
      title: "Information Technology and Automation",
      alt: "information-technology-and-automation",
      imgSrc: information_technology_and_automation,
      scope:
        "Providing IT solutions and automation technologies to enhance manufacturing efficiency.",
      services : ['Software Development', 'Systems Integration', 'Robotics', 'IoT (Internet of Things) Solutions']
    },
  ];

  const handleClick = async (e, id) => {
    const target = e.target.closest(".card");
    const btn = e.target.closest(".btn");
    const heading_container = e.target.closest(".heading_container");

    if (target) {
      target.classList.toggle("reduceSize3");
      audio.play();

      setTimeout(() => {
        target.classList.toggle("reduceSize3");
      }, 300);

      setTimeout(() => {
        setOpenPopupId(id);
        // if(target.classList.contains('co_helpers')){
        //     navigate('../city-junctions/co-helpers')
        // }else if(target.classList.contains('work_from_home')){
        //     navigate('../../AmbarsariyaMall/serve/emotional/eshop/jobs-offered')
        // }
      }, 600);
    } else if (btn) {
      btn.classList.toggle("reduceSize3");
      audio.play();

      setTimeout(() => {
        btn.classList.toggle("reduceSize3");
      }, 300);

      setTimeout(() => {
        // if(target.classList.contains('co_helpers')){
        //     navigate('../city-junctions/co-helpers')
        // }
      }, 600);
    } else if (heading_container) {
      heading_container.classList.toggle("reduceSize3");
      audio.play();

      setTimeout(() => {
        heading_container.classList.toggle("reduceSize3");
      }, 300);
      setTimeout(() => {
        // if(target.classList.contains('co_helpers')){
        //     navigate('../city-junctions/co-helpers')
        // }
      }, 600);
    }
  };

  const [openPopupId, setOpenPopupId] = useState(null);

  const handleClose = () => {
    setOpenPopupId(false);
  };

  return (
    <Box className="co_helpers_wrapper">
      <Box>
        <Box
          component="img"
          src={big_cloud}
          className="big_cloud"
          alt="cloud"
        />
      </Box>
      <Box
        component="img"
        src={big_cloud}
        className="big_cloud cloud_2"
        alt="cloud"
      />
      <Box className="row">
        <Box className="col back-button-wrapper">
          <UserBadge
            handleLogoutClick="../../AmbarsariyaMall"
            handleBadgeBgClick={-1}
            handleLogin="login"
          />
        </Box>
        <Box className="col">
          <Box className="container">
            <Link className="heading_container" onClick={(e) => handleClick(e)}>
              <Typography className="heading" variant="h2">
                Co-Helpers
              </Typography>
            </Link>

            <Box className="sub_container">
              <Box className="col-group">
                <Box
                  component="img"
                  src={small_cloud}
                  alt="small_cloud"
                  className="small_cloud"
                />
                {cards?.slice(0, 3)?.map((card) => {
                  return (
                    <React.Fragment key={card?.id}>
                      <Link
                        className="card"
                        key={card?.id}
                        onClick={(e) => handleClick(e, card?.id)}
                      >
                        <Box
                          component="img"
                          src={card?.imgSrc}
                          alt={card?.alt}
                          className="card_img"
                        />
                        <Box className="title_container">
                          <Typography className="title">
                            {card?.title}
                          </Typography>
                        </Box>
                      </Link>

                      <CoHelperPopup
                        open={openPopupId === card?.id}
                        handleClose={handleClose}
                        content={card}
                      />
                    </React.Fragment>
                  );
                })}
              </Box>

              <Box className="col-group-2">
                {cards?.slice(3, 9)?.map((card) => {
                  return (
                    <React.Fragment key={card?.id}>
                      <Link
                        className="card"
                        key={card?.id}
                        onClick={(e) => handleClick(e, card?.id)}
                      >
                        <Box
                          component="img"
                          src={card?.imgSrc}
                          alt={card?.alt}
                          className="card_img"
                        />
                        <Box className="title_container">
                          <Typography className="title">
                            {card?.title}
                          </Typography>
                        </Box>
                      </Link>

                      <CoHelperPopup
                        open={openPopupId === card?.id}
                        handleClose={handleClose}
                        content={card}
                      />
                    </React.Fragment>
                  );
                })}
              </Box>

              <Box className="col-group">
                <Box
                  component="img"
                  src={small_cloud}
                  alt="small_cloud"
                  className="small_cloud cloud_2"
                />

                {cards?.slice(9)?.map((card) => {
                  return (
                    <React.Fragment key={card?.id}>
                      <Link
                        className="card"
                        key={card?.id}
                        onClick={(e) => handleClick(e, card?.id)}
                      >
                        <Box
                          component="img"
                          src={card?.imgSrc}
                          alt={card?.alt}
                          className="card_img"
                        />
                        <Box className="title_container">
                          <Typography className="title">
                            {card?.title}
                          </Typography>
                        </Box>
                      </Link>

                      <CoHelperPopup
                        open={openPopupId === card?.id}
                        handleClose={handleClose}
                        content={card}
                      />
                    </React.Fragment>
                  );
                })}
              </Box>
            </Box>
          </Box>
          <Box className="button_container">
            <Button className="btn" onClick={(e) => handleClick(e)}>
              Apply Now
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CoHelpers;
