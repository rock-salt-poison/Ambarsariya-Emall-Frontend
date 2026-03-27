import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, CircularProgress, ImageList, ImageListItem, Typography } from '@mui/material';
import UserBadge from '../../UserBadge';
import { fetchDomains, fetchDomainSectors } from '../../API/fetchExpressAPI';
import { getSectorImage } from '../../Utils/sector_images';
import BoothsPopup from '../../Components/Socialize/BoothsPopup';

function srcset(image) {
  return {
    src: image,
    srcSet: image,
  };
}

function Booths() {
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooth, setSelectedBooth] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [clickedBoothId, setClickedBoothId] = useState(null);
  const clickAnimTimerRef = useRef(null);
  const popupTimerRef = useRef(null);

  useEffect(() => {
    const fetchBoothSectors = async () => {
      try {
        const domains = await fetchDomains();
        const targetDomains = (domains || []).filter((domain) => {
          const domainName = (domain?.domain_name || '').trim().toLowerCase();
          return domainName === 'daily needs' || domainName === 'maintenance';
        });

        const domainIds = targetDomains
          .map((domain) => domain?.domain_id || domain?.id)
          .filter(Boolean);

        if (!domainIds.length) {
          setSectors([]);
          return;
        }

        const sectorsByDomain = await Promise.all(
          domainIds.map((domainId) => fetchDomainSectors(domainId))
        );

        const mergedSectors = sectorsByDomain.flat().filter(Boolean);
        const uniqueSectorsMap = new Map();
        mergedSectors.forEach((sector) => {
          const key = sector?.sector_id || sector?.id || sector?.sector_name;
          if (key && !uniqueSectorsMap.has(key)) {
            uniqueSectorsMap.set(key, sector);
          }
        });

        setSectors(Array.from(uniqueSectorsMap.values()));
      } catch (error) {
        console.error('Error fetching booth sectors:', error);
        setSectors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBoothSectors();
  }, []);

  useEffect(() => {
    return () => {
      if (clickAnimTimerRef.current) clearTimeout(clickAnimTimerRef.current);
      if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
    };
  }, []);

  const handleBoothImageClick = (item) => {
    if (clickAnimTimerRef.current) clearTimeout(clickAnimTimerRef.current);
    if (popupTimerRef.current) clearTimeout(popupTimerRef.current);

    setOpenPopup(false);
    setSelectedBooth(null);
    setClickedBoothId(item.id);

    clickAnimTimerRef.current = setTimeout(() => {
      setClickedBoothId(null);
    }, 300);

    popupTimerRef.current = setTimeout(() => {
      setSelectedBooth(item);
      setOpenPopup(true);
    }, 600);
  };

  const handleClosePopup = () => {
    if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
    setOpenPopup(false);
    setSelectedBooth(null);
  };

  const imageTiles = useMemo(() => {
    const patterns = [
      { rows: 1, cols: 1 },
      { rows: 2, cols: 1 },
      { rows: 2, cols: 1 },
      { rows: 2, cols: 1 },
      { rows: 2, cols: 1 },
      { rows: 1, cols: 1 },
      { rows: 1, cols: 1 },
      { rows: 2, cols: 1 },
      { rows: 2, cols: 1 },
      { rows: 2, cols: 1 },
      { rows: 2, cols: 2 },
      { rows: 1, cols: 1 },
    ];

    return sectors
      .map((sector, index) => {
        const sectorName = sector?.sector_name || '';
        const img = getSectorImage(sectorName);
        if (!img) return null;
        return {
          id: sector?.sector_id || sector?.id || `${sectorName}-${index}`,
          sectorId: sector?.sector_id || sector?.id || null,
          domainId: sector?.domain_id || null,
          sectorName,
          img,
          ...patterns[index % patterns.length],
        };
      })
      .filter(Boolean);
  }, [sectors]);

  return (
    <Box className="booths_wrapper">
      <Box className="booths_header">
        <Box></Box>
        <Typography className="booths_title">Booths</Typography>
        <Box className="booths_badge">
          <UserBadge
            handleLogoutClick="../../"
            handleBadgeBgClick={-1}
            handleLogin="login"
          />
        </Box>
      </Box>

      <Box className="booths_body">
        {loading ? (
          <Box className="loading"><CircularProgress/></Box>
        ) : imageTiles.length === 0 ? (
          <Typography className="booths_state_text">No sectors found for booths.</Typography>
        ) : (
          <ImageList
            variant="quilted"
            cols={6}
            rowHeight={115}
            gap={2}
            className="booths_quilted_list"
          >
            {imageTiles.map((item) => (
              <ImageListItem
                key={item.id}
                cols={item.cols}
                rows={item.rows}
                className={`booths_list_item ${clickedBoothId === item.id ? 'reduceSize3' : ''}`}
                onClick={() => handleBoothImageClick(item)}
              >
                <img
                  {...srcset(item.img)}
                  alt={item.sectorName}
                  loading="lazy"
                />
                <Box className="sector_hover_overlay">
                  <Typography className="sector_name_text">{item.sectorName}</Typography>
                </Box>
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Box>

      <BoothsPopup
        open={Boolean(selectedBooth && openPopup)}
        onClose={handleClosePopup}
        selectedBooth={selectedBooth}
      />
    </Box>
  );
}

export default Booths;
