import React, { useEffect, useMemo, useState } from 'react';
import { Box, ThemeProvider, Typography } from '@mui/material';
import CardBoardPopup from '../CardBoardPopupComponents/CardBoardPopup';
import FormField from '../Form/FormField';
import relationsBg from '../../Utils/images/Socialize/citizens_main/trigger_elements/relations_bg.webp';
import plusGif from '../../Utils/gifs/plus.gif';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';

function TriggerPopup({ open, handleClose, cardTitle, fields }) {
  const themeProps = {
    popoverBackgroundColor: '#F8DED4',
    scrollbarThumb: 'var(--pink2)',
    dialogBackdropColor: 'var(--brown-4)',
  };
  const theme = createCustomTheme(themeProps);

  const initialFormData = useMemo(() => {
    const data = {};
    (fields || []).forEach((f) => {
      if (!f?.name) return;
      if (f.type === 'select-check') data[f.name] = [];
      else data[f.name] = '';
    });
    return data;
  }, [fields]);

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData, open]);

  const handleChange = (e) => {
    const { name, value } = e?.target || {};
    if (!name) return;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const plusBgStyle = useMemo(
    () => ({
      '--plus-bg-img': `url(${relationsBg})`,
    }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CardBoardPopup
        open={open}
        handleClose={handleClose}
        customPopup={true}
        optionalCName="trigger_element_popup"
        body_content={
          <Box className="trigger_element_popup_body" aria-label="Trigger element form">
            <Box className="plus" style={plusBgStyle}>
            {/* Top center */}
            {fields?.[0] ? (
              <Box className="trigger_field trigger_field_top">
                <FormField
                  label={fields[0].label}
                  name={fields[0].name}
                  type={fields[0].type}
                  value={formData[fields[0].name]}
                  onChange={handleChange}
                  options={fields[0].options || []}
                  placeholder={fields[0].placeholder}
                />
              </Box>
            ) : null}

            {/* Right center */}
            {fields?.[1] ? (
              <Box className="trigger_field trigger_field_right">
                <FormField
                  label={fields[1].label}
                  name={fields[1].name}
                  type={fields[1].type}
                  value={formData[fields[1].name]}
                  onChange={handleChange}
                  options={fields[1].options || []}
                  placeholder={fields[1].placeholder}
                />
              </Box>
            ) : null}

            {/* Bottom center */}
            {fields?.[2] ? (
              <Box className="trigger_field trigger_field_bottom">
                <FormField
                  label={fields[2].label}
                  name={fields[2].name}
                  type={fields[2].type}
                  value={formData[fields[2].name]}
                  onChange={handleChange}
                  options={fields[2].options || []}
                  placeholder={fields[2].placeholder}
                  additionalProps={{
                    ...(fields[2].type === 'datetime-local' ? { step: 60 } : null),
                  }}
                />
              </Box>
            ) : null}

            {/* Left center */}
            {fields?.[3] ? (
              <Box className="trigger_field trigger_field_left">
                <FormField
                  label={fields[3].label}
                  name={fields[3].name}
                  type={fields[3].type}
                  value={formData[fields[3].name]}
                  onChange={handleChange}
                  options={fields[3].options || []}
                  placeholder={fields[3].placeholder}
                />
              </Box>
            ) : null}

            <Box className="trigger_plus_center" aria-hidden="true">
              <Box className="trigger_plus_btn">
                <Box component="img" src={plusGif} alt="plus 1" className="trigger_plus_gif" />
                <Typography className="trigger_plus_text">ADD MORE</Typography>
              </Box>
              <Box className="trigger_plus_btn">
                <Box component="img" src={plusGif} alt="plus 2" className="trigger_plus_gif" />
                <Typography className="trigger_plus_text">TRIGGER</Typography>
              </Box>
            </Box>

            {/* Card title for accessibility only */}
            <Typography className="trigger_popup_sr_only">{cardTitle}</Typography>
            </Box>
          </Box>
        }
      />
    </ThemeProvider>
  );
}

export default TriggerPopup;

