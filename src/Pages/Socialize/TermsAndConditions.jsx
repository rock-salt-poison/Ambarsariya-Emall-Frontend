import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import UserBadge from "../../UserBadge";
import { Link, useNavigate } from "react-router-dom";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import emall from "../../Utils/images/Socialize/terms_and_conditions/emall.webp";
import quote_start_purple from "../../Utils/images/Socialize/terms_and_conditions/quote_start_purple.png";
import quote_end_purple from "../../Utils/images/Socialize/terms_and_conditions/quote_end_purple.png";
import quote_start_blue from "../../Utils/images/Socialize/terms_and_conditions/quote_start_blue.png";
import quote_end_blue from "../../Utils/images/Socialize/terms_and_conditions/quote_end_blue.png";
import FormField from "../../Components/Form/FormField";

function TermsAndConditions() {
  const navigate = useNavigate();

  const [isAgreed, setIsAgreed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
   
    // navigate or other logic
    console.log("Form submitted");
  };

  const handleCheckboxChange = (e) => {
    setIsAgreed(e.target.checked);
  };


  return (
    <Box className="terms_and_conditions_wrapper">
      <Box className="row">
        <Box className="col">
          <UserBadge
              handleBadgeBgClick={-1}
              handleLogin="../login"
              handleLogoutClick="../../AmbarsariyaMall"
          />
        </Box>
        <Box className="col quote_container">
          <Box
            component="img"
            src={quote_start_blue}
            alt="quotes"
            className="quotes"
          />
          <Box className="blockquote">
            <Typography className="quote">
              When you are alone, you are the master. When you are among many,
              you want to be a leader. When you are among several, you are an
              individual.
            </Typography>
            <Typography className="author">
              — Ashwani Kumar, Author of{" "}
              <Typography variant="span">E-Mall</Typography>.
            </Typography>
          </Box>
          {/* <FormatQuoteIcon className="quote_end" /> */}
          <Box
            component="img"
            src={quote_end_blue}
            alt="quotes"
            className="quotes end"
          />
        </Box>

        <Box className="col">
          <Typography className="title">E-MALL (Junction)</Typography>
          <Typography className="text">
            E-Mall is a bridge between daily needs and daily income. As you Grow
            or Grab in E-Mall, you will find numerous ways to earn income and
            spend on your daily needs, and enjoy leisure time with your friends
            and loved ones.
          </Typography>
          <Typography className="text">
            Members of E-Mall will also get the opportunity to take on work or
            task-based jobs.
          </Typography>
        </Box>

        <Box className="col">
          <Box component="img" src={emall} alt="emall" className="emall_img" />
        </Box>

        <Box className="col">
          <Typography className="text bold">Co-Helpers:</Typography>
          <Typography className="text">
            Sector-specific jobs can be joined with shops.
          </Typography>
          <Typography className="text bold">Work From Home:</Typography>
          <Typography className="text">
            Online jobs are offered by E-Mall.
          </Typography>
          <Typography className="text bold">Sales Mount:</Typography>
          <Typography className="text">
            Post your requirements in E-Mall.
          </Typography>
          <Typography className="text bold">Connect With Utilities:</Typography>
          <Typography className="text">
            Offer your shop to E-Mall to create and deliver E-Mall services.
          </Typography>
          <Typography className="text bold">Rules & Regulations:</Typography>
          <ol>
            <li className="text">
              Your Digi-Locker (Authentication level 7 is required), KYC of your
              certificates.
            </li>
            <li className="text">
              Your personal and professional records must be self-attested via a
              Video CV.
            </li>
            <li className="text">
              The hours and charges you mention are taxable.
            </li>
            <li className="text">
              Your Member ID or Shop ID grants you rights based on
              Authentication Level 7. Any cheating, misinformation, or
              manipulation of skills/experience, poor quality, or late delivery
              will be handled by the employer or task manager.
            </li>
            <li className="text">
              While offering your shop services through E-Mall to gain more
              business—either directly via E-Mall or through the "Sales Mount"
              (Auto Lead Generator) service by E-Mall which helps take your
              “Local Business To World Wide Markets” via the Serve section,
              module “Unexpected”.
            </li>
            <li className="text">
              You need to make an MOU with E-Mall for Generating leads,
              Confirmation, Delivery, and Feedback.
            </li>
            <li className="text">
              Trust, Truth, Time ship. Quality And Faith are key measures for
              the performance of your Work.
            </li>
            <li className="text">
              Any false or incorrect information may be considered a violation
              under the Cybersecurity Act, as governed by the Punjab & Haryana
              High Court.
            </li>
            <li className="text">
              E-mail is only an Authenticator for your Qualifications, Merits,
              and other information registered with Digi-Locker and E-mail.
            </li>
            <li className="text">
              The IT Manager is not authorized to change your Digi-Locker,
              E-Mall member status, or shop attributes.
            </li>
          </ol>
        </Box>

        <Box className="col quote_container quote_2">
          <Box
            component="img"
            src={quote_start_purple}
            alt="quotes"
            className="quotes"
          />
          <Box className="blockquote">
            <Typography className="quote">
              An empty glass can be filled, but a full glass cannot. To truly
              gain knowledge, one must first be willing to empty themselves.
            </Typography>
            <Typography className="author">
              — Ashwani Kumar, Author of{" "}
              <Typography variant="span">E-Mall</Typography>.
            </Typography>
          </Box>
          <Box
            component="img"
            src={quote_end_purple}
            alt="quotes"
            className="quotes end"
          />
        </Box>

        <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
          <FormField
            label={"I have read and agree to the Terms and Conditions."}
            name={"checkbox"}
            type={"checkbox"}
            onChange={(e) => {
              handleCheckboxChange(e);
            }}
            className="text"
            required={true}
          />

          <Box className="submit_button_container">
            <Button type="submit" variant="contained" className="submit_button">
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TermsAndConditions;
