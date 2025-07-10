import React, { useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import UserBadge from "../../UserBadge";
import { Link, useNavigate } from "react-router-dom";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import emall from "../../Utils/images/Socialize/terms_and_conditions/emall.webp";
import quote_start_purple from "../../Utils/images/Socialize/terms_and_conditions/quote_start_purple.png";
import quote_end_purple from "../../Utils/images/Socialize/terms_and_conditions/quote_end_purple.png";
import quote_start_blue from "../../Utils/images/Socialize/terms_and_conditions/quote_start_blue.png";
import quote_end_blue from "../../Utils/images/Socialize/terms_and_conditions/quote_end_blue.png";
import FormField from "../../Components/Form/FormField";

function MoURulesAndRegulations() {
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
            handleLogoutClick="../../"
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
              The Worst Enemy to Creativity is Self-Doubt, which yields
              confusion, not productivity.
            </Typography>
            <Typography className="author">
              — Ashwani Kumar, Author MoU{" "}
              <Typography variant="span">(E-Mall)</Typography>.
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
          <Typography className="title">
            Memorandum of Understanding (MoU)
          </Typography>
          <Typography className="text">
            This Memorandum of Understanding (MoU) is made and entered into on
            the 5th day of July, 2025,
          </Typography>
          <Typography className="text bold">BETWEEN :</Typography>
          <Typography className="text">
            <Typography className="bold text" variant="span">
              Party 1 :{" "}
            </Typography>
            Merchant_001 (hereinafter referred to as "the Seller"), and
          </Typography>
          <Typography className="text">
            <Typography className="bold text" variant="span">
              Party 2 :{" "}
            </Typography>
            Merchant_001 (hereinafter referred to as "the Purchaser").
          </Typography>
          <Typography className="text">
            Both Name of the Shop Merchant 1 (Seller) and Party 2 Name of the
            Shop 2 (purchaser) shall sign this document as a
            Business-to-Business (B2B) Deal, as per the terms outlined below:
          </Typography>
        </Box>

        <Box className="col">
          <Typography className="title bold">
            Terms and Conditions :{" "}
          </Typography>
          <ol>
            <li className="text bold">
              <Box className="item_container">
                <Typography className="text bold">Cost Conditions</Typography>
                <Typography className="text">
                  A detailed cost conditions will be conducted based on the
                  number of items per subscription. This comparison will
                  consider the following subscription frequencies:
                </Typography>

                <ul>
                  <li>
                    <Typography className="text">
                      Daily : Min Items/ Min Cost
                    </Typography>
                  </li>
                  <li>
                    <Typography className="text">Monthly</Typography>
                  </li>
                  <li>
                    <Typography className="text">Weekly</Typography>
                  </li>
                  <li>
                    <Typography className="text">
                      Editable (allowing for custom subscription durations) :
                      Min Items/ Min Cost
                    </Typography>
                  </li>
                </ul>
              </Box>
            </li>
            <li className="text bold">
              <Box className="item_container">
                <Typography className="text bold">
                  Expiry Date / End of Term (EoT)
                </Typography>
                <Typography className="text">
                  The document will include provisions regarding the days
                  remaining until the expiry date or the End of Term (EoT) for
                  each subscription.
                </Typography>
              </Box>
            </li>
            <li className="text bold">
              <Box className="item_container">
                <Typography className="text bold">
                  Storing Requirement
                </Typography>
                <Typography className="text">
                  Specific storing requirements for the items will be detailed
                  within the agreement.
                </Typography>
              </Box>
            </li>
            <li className="text bold">
              <Box className="item_container">
                <Typography className="text bold">Shipping Methods</Typography>
                <Typography className="text">
                  The agreed-upon shipping methods for the delivery of items
                  will be clearly defined.
                </Typography>
                <Typography className="text">
                  IN WITNESS WHEREOF, the parties have executed this MoU on the
                  date first above written.
                </Typography>
                <Typography className="text bold">
                  For and on behalf of Party 1 (Seller):
                </Typography>
                <Box>
                  <Typography className="text">
                    Business Name : Finance Mart
                  </Typography>
                  <Typography className="text">
                    Name : Ms. Muskan singh
                  </Typography>
                  <Typography className="text">
                    Domain - Sector : Daily Needs - Financial Services
                  </Typography>
                </Box>

                <Typography className="text bold">
                  For and on behalf of Party 2 (Purchaser):
                </Typography>
                <Box>
                  <Typography className="text">
                    Name : Ms. Muskan singh
                  </Typography>
                  <Typography className="text">Title :</Typography>
                </Box>

                <Typography className="text bold">
                  For and on behalf of Party 3 (Logistics & Transportation):
                </Typography>
                <Box>
                  <Typography className="text">
                    Name : Ms. Muskan singh
                  </Typography>
                  <Typography className="text">Title :</Typography>
                </Box>

                <Table>
                  <TableHead>
                    <TableRow className="bgColor">
                      <TableCell className="text">Mou Type</TableCell>
                      <TableCell className="text">Subscription Type</TableCell>
                      <TableCell className="text">
                        Start Date & End Date
                      </TableCell>
                      <TableCell className="text">Per Frequency Cost</TableCell>
                      <TableCell className="text">
                        Per Supply Logistics Cost
                      </TableCell>
                      <TableCell className="text">
                        Total Cost (Including GST)
                      </TableCell>
                      <TableCell className="text">Credit & Balance</TableCell>
                      <TableCell className="text">Renew Or Rebidding</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text">-</TableCell>
                      <TableCell className="text">-</TableCell>
                      <TableCell className="text">-</TableCell>
                      <TableCell className="text">-</TableCell>
                      <TableCell className="text">-</TableCell>
                      <TableCell className="text">-</TableCell>
                      <TableCell className="text">-</TableCell>
                      <TableCell className="text">-</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </li>
          </ol>
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

export default MoURulesAndRegulations;
