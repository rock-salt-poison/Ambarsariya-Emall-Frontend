import { createTheme } from '@mui/material/styles';
import '../styles/variables.scss';

const createCustomTheme = (themeProps) => {
  const { popoverBackgroundColor, textColor, scrollbarThumb,scrollbarThumbTabs, checkboxColor, dialogBackdropColor, selectedListItemBgColor } = themeProps;

  return createTheme({
    components: {
      MuiPopover: {
        styleOverrides: {
          root: {
            '& .MuiBackdrop-root': {
              backgroundColor: 'transparent !important',
            },
          },
          paper: {
            backgroundColor: `${popoverBackgroundColor} !important`,
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            padding: '0px',
            maxHeight:'180px',

            '.members_list': {
              padding:'2px 5px',

              '.members_name span':{
                fontFamily: 'var(--Bobby-Jones-Soft) !important',
                color: `${textColor ? textColor : 'var(--text-color)'}`,
              }
            },
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontFamily: 'var(--Bobby-Jones-Soft) !important',
            color: `${textColor ? textColor : 'var(--text-color)'}`,
            whiteSpace:'normal',
            '&.Mui-selected': {
              backgroundColor: `${selectedListItemBgColor ? selectedListItemBgColor : 'var(--selected-bg-color)'}`,
              '&:hover': {
                backgroundColor: 'var(--selected-bg-color)',
              },
            },
          },
        },
      },
      MuiTimePicker: {
        styleOverrides: {
          root: {
            '& .MuiInputBase-root': {
              fontFamily: 'var(--Bobby-Jones-Soft)',
              color: 'var(--text-color)',
            },
            '& .MuiInputBase-input': {
              padding: '10px',
              backgroundColor: 'var(--input-bg-color)',
            },
            '& .MuiPickersToolbar-toolbar': {
              backgroundColor: 'var(--toolbar-bg-color)',
              color: 'var(--toolbar-text-color)',
            },
            '& .MuiPickersClock-pin': {
              backgroundColor: 'var(--clock-pin-color)',
            },
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          popper: {
            '& .MuiAutocomplete-listbox': {
              backgroundColor: 'var(--autocomplete-bg-color)',
              fontFamily: 'var(--Bobby-Jones-Soft)',
              color: 'var(--text-color)',
              '& .MuiAutocomplete-option': {
                backgroundColor: 'transparent',
                '&[aria-selected="true"]': {
                  backgroundColor: 'var(--autocomplete-search-selected-bg-color) !important',
                  '&:hover': {
                    backgroundColor: 'var(--autocomplete-search-selected-bg-color) !important',
                  },
                },
                '&[data-focus="true"]': {
                  backgroundColor: 'var(--autocomplete-search-hover-bg-color)',
                },
              },
            },
          },
        },
      },
      MuiSlider: {
        styleOverrides: {
          root: {
            '&.parking-availability-slider .MuiSlider-rail': {
              background: 'rgb(229 183 96)', // Custom gradient for parking availability slider
            },
          },
          track: {
            background: 'transparent',
            border: 'none',
          },
          thumb: {
            backgroundColor: '#fff',
          },
          rail: {
            opacity: 1,
            background: 'linear-gradient(90deg, rgb(164 169 93), rgb(229 183 96), rgb(243 164 76), rgb(243 106 65))',
          },
          mark: {
            backgroundColor: 'currentColor',
            height: '8px', // Height of the slider mark
            width: '2px',
          },
          markLabel: {
            color: 'currentColor',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: '0.75rem',
            position: 'absolute',
            transform: 'translateX(-50%)', // Center the label
            '&.MuiSlider-markLabel[data-index="0"]': {
              left: '2% !important', // Position first mark at 2%
            },
            '&.MuiSlider-markLabel[data-index="3"]': {
              left: '98% !important', // Position last mark at 98%
            },
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            padding: '0px',
          },
        },
      },

      MuiDialog:{
        styleOverrides:{
          root:{
            '& .MuiBackdrop-root':{
              backgroundColor: `${dialogBackdropColor} !important`,
              opacity:'.35 !important'
            }
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: `${scrollbarThumb ? `${scrollbarThumb} !important`: 'var(--yellow)'}`,
            }
          },
        },
      },

      MuiTabPanel:{
        styleOverrides:{
          root:{
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: `${scrollbarThumbTabs ? `${scrollbarThumbTabs} !important`: 'var(--yellow)'}`,
            }
          }
        }
      },
      
      MuiTooltip:{
        styleOverrides:{
          popper:{
            opacity:'.95'
          },
          tooltip: {
            backgroundColor: `var(--tooltipBgColor) !important`, // Background color of the tooltip
            // Styles for the Tooltip content
            color: 'var(--light-yellow) !important', // Text color inside the tooltip
            fontSize: '0.85rem', // Font size of the text
            borderRadius: '4px', // Rounded corners of the tooltip
            padding: '5px 10px', // Padding inside the tooltip
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
            fontFamily:'Bobby-Jones-Soft !important',
            marginTop:'0px !important',
            textAlign:'center',
          },
        }
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: `${checkboxColor ? checkboxColor  : 'var(--brown-2)'} !important`, // Default color
            '&.Mui-checked': {
              color: `${checkboxColor ? checkboxColor : 'var(--brown-2)'} !important`, // Color when checked
            },
            '&.Mui-disabled': {
              color: `${checkboxColor ? checkboxColor : 'var(--brown-2)'} !important`, // Color when disabled
            },
          },
        },
      },
     
      
    },
  });
};

export default createCustomTheme;
