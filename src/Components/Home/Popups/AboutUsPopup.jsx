import React from "react";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Button2 from "../Button2";
import UserBadge from "../../../UserBadge";
import CloseIcon from '@mui/icons-material/Close';

export default function AboutUsPopup({ open, handleClose, handleBackClick }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm")); // Fullscreen on small screens

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="about-popup-dialog-paper"
      maxWidth="sm"
      fullScreen={fullScreen}
      fullWidth
    >
      <DialogContent className="aboutPopupDialogBoxContent">
        <Box className="content">
          <Box className="content-body">
            <Box className="header">
              <Typography variant="h2">About us</Typography>
              {/* <UserBadge
                handleClose={handleClose}
                handleLogin="sell/login"
                handleLogoutClick="../../"
              /> */}

              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Box className="descriptionContainer">
              <Typography className="description">
                We at Rock Salt Poison, Believe that world is made up of three
                basic things, that is Rock~Land, Salt~Life and, Poison~Man Made
                things.
              </Typography>
              <Typography className="description">
                To understand and achieve the sustained eco-system, we need to
                focus on these three elements by which we can attain a
                Sustainable, Safe and Eco Balanced Planet. To achieve this goal,
                we are finding numerous ways, to solve problems related to Rock
                Salt Poison. We have started with three verticals:
              </Typography>

              <ol>
                <li>
                  <Typography className="description">
                    E-Banners (An Advertisement Company) -It helps to minimize
                    the flex printing and avoid encroachments over the road,by
                    providing E-Shops to (all the Hawkers and to other Sales
                    Points) Manufacturer / Daily needs.
                    <Typography variant="span" className="blockLevelSpan">
                      <Typography
                        variant="span"
                        component="span"
                        className="bold"
                      >
                        Name of the Model -
                      </Typography>
                      E-Mall, which has slogan for local citizens, "Sell Serve
                      Socialize".
                    </Typography>
                    <Typography variant="span" className="blockLevelSpan">
                      <Typography
                        variant="span"
                        component="span"
                        className="bold"
                      >
                        Name of the Product -
                      </Typography>
                      www.e-ambarsariyamall.net
                    </Typography>
                  </Typography>
                </li>

                <li>
                  <Typography className="description">
                    Aurah Model (Smart Water Dowsing)- It helps To find out the
                    underground domestic use water, for municipal corporations
                    to find taluka for a habitat to provide Quality, Quantity
                    and Periodicity of Water.
                    <Typography variant="span" className="blockLevelSpan">
                      <Typography
                        variant="span"
                        component="span"
                        className="bold"
                      >
                        Name of the Model -
                      </Typography>
                      An Aurah Model, which has slogan "99.96 % efficiency by 4
                      years".
                    </Typography>
                    <Typography variant="span" className="blockLevelSpan">
                      <Typography
                        variant="span"
                        component="span"
                        className="bold"
                      >
                        Name of the Product -
                      </Typography>
                      Smart water dowsing method (iiot).
                    </Typography>
                  </Typography>
                </li>

                <li>
                  <Typography className="description">
                    Hardik Model (Domestic & Industrial waste) - It helps to
                    find out the policy to implement on garbage waste, for
                    municipal corporation to find out the way for using 3 R
                    principle (Reduce, Reuse, Recycle) and Doping for using
                    Landscaping Method.
                    <Typography variant="span" className="blockLevelSpan">
                      <Typography
                        variant="span"
                        component="span"
                        className="bold"
                      >
                        Name of the Model -
                      </Typography>
                      Hardik Model, which has slogan "Sorting, Recycle, Smoke
                      less Burning".
                    </Typography>
                    <Typography variant="span" className="blockLevelSpan">
                      <Typography
                        variant="span"
                        component="span"
                        className="bold"
                      >
                        Name of the Product -
                      </Typography>
                      Policy maker for Domestic and Industrial Waste.
                    </Typography>
                  </Typography>
                </li>
              </ol>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
