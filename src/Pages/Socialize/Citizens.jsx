import React from 'react'
import { Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import UserBadge from '../../UserBadge';
import title_bg from '../../Utils/images/Socialize/citizens/title_bg.webp';

function Citizens() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('../');
  };

  const handleTileClick = (e, path) => {
    const target = e.currentTarget;
    if (!target) return;

    target.classList.add('reduceSize3');
    setTimeout(() => {
      target.classList.remove('reduceSize3');
    }, 300);

    setTimeout(() => {
      if (path) {
        navigate(path);
      }
    }, 600);
  };

  return (
    <Box className="citizen_wrapper">
        <Box className="row">
            <Box className="col sale">
                <Box className="empty">
                </Box>
                  <Box className="back_button back_button_first" onClick={handleBackClick}>
                    <UserBadge
                        handleLogoutClick="../../"
                        handleBadgeBgClick={-1}
                        handleLogin="login"
                    />
                  </Box>
                <Box className="content">
                    <Link
                      className="title_container"
                      onClick={(e) => handleTileClick(e, '../citizens/sale')}
                    >
                    <Box component="img" className="title_bg" src={title_bg} alt="bg"/>

                        <Typography className="title">
                            Sale
                        </Typography>
                    </Link>
                </Box>
            </Box>
            <Box className="col promotions">
                <Box className="empty"></Box>
                <Box className="content">
                    <Link
                      className="title_container"
                      onClick={(e) => handleTileClick(e, '../citizens/promotions')}
                    >
                    <Box component="img" className="title_bg" src={title_bg} alt="bg"/>

                        <Typography className="title">
                            Promotion
                        </Typography>
                    </Link>
                </Box>
            </Box>
            <Box className="col booths">
                <Box className="empty"></Box>
                <Box className="back_button back_button_third" onClick={handleBackClick}>
                    <UserBadge
                        handleLogoutClick="../../"
                        handleBadgeBgClick={-1}
                        handleLogin="login"
                    />
                </Box>
                <Box className="content">
                    <Link
                      className="title_container"
                      onClick={(e) => handleTileClick(e, null)}
                    >
                        <Box component="img" className="title_bg" src={title_bg} alt="bg"/>
                        <Typography className="title">
                            Booths
                        </Typography>
                    </Link>
                </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default Citizens