import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API;

function loadScript(src, position, id) {
  if (!position) return;

  if (!document.querySelector(`#${id}`)) {
    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('defer', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
  }
}

const autocompleteService = { current: null };
const placesService = { current: null };

export default function Address_Google_Map_Field({ value, label, onChange, placeholder }) {
  const [inputValue, setInputValue] = React.useState('');
  const [updatedValue, setUpdatedValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && !loaded.current) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&loading=async`,
        document.querySelector('head'),
        'google-maps'
      );
      loaded.current = true;
    }
  }, []);

  const fetch = React.useMemo(
    () =>
      debounce((request, callback) => {
        if (autocompleteService.current) {
          autocompleteService.current.getPlacePredictions(request, callback);
        }
      }, 400),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) return;

    if (inputValue === '') {
      setOptions(updatedValue ? [updatedValue] : []);
      return;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = updatedValue ? [updatedValue, ...(results || [])] : results || [];
        
        // If no results, allow user input as a selectable option
        if (newOptions.length === 0) {
          newOptions = [{ description: inputValue, place_id: "no_match" }];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  React.useEffect(() => {
    if (value) {
      setUpdatedValue(value);
      setInputValue(value.description || value);
    }
  }, [value]);

  const handlePlaceSelect = (event, newValue) => {
    if (!newValue) {
      // Handle clearing the value
      setUpdatedValue(null);
      onChange(null);
      return;
    }
    if (newValue && newValue.place_id !== "no_match") {
      if (!placesService.current && window.google) {
        placesService.current = new window.google.maps.places.PlacesService(document.createElement('div'));
      }

      placesService.current.getDetails(
        { placeId: newValue.place_id },
        (placeDetails, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const placeData = {
              description: newValue.description,
              place_id: newValue.place_id,
              latitude: placeDetails.geometry?.location?.lat() || 31.6340, // Default Amritsar
              longitude: placeDetails.geometry?.location?.lng() || 74.8723, // Default Amritsar
              formatted_address: placeDetails.formatted_address || newValue.description,
            };

            onChange(placeData);
            setUpdatedValue(placeData);
          }
        }
      );
    } else {
      saveUserTypedLocation();
    }
  };

  // Saves the user-typed input if no option is selected
  const saveUserTypedLocation = () => {
    if (!inputValue.trim()) return;

    const defaultPlace = {
      description: inputValue, // Preserve user input
      place_id: "manual_entry",
      latitude: 31.6340, // Default Amritsar
      longitude: 74.8723, // Default Amritsar
      formatted_address: inputValue, // Use the user-typed address
    };

    onChange(defaultPlace);
    setUpdatedValue(defaultPlace);
  };

  return (
    <Autocomplete
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={updatedValue}
      size='small'
      fullWidth
      freeSolo={true}
      noOptionsText="No locations"
      className="input_field"
      isOptionEqualToValue={(option, value) => 
        option?.description === value?.description
      }
      placeholder={placeholder}
      onChange={handlePlaceSelect}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        if (!newInputValue.trim()) {
          setUpdatedValue(null);
          onChange(null);
        }
      }}
      onBlur={saveUserTypedLocation} // Handle case when user leaves input without selection
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault(); // Prevent form submission
          saveUserTypedLocation();
        }
      }}
      renderInput={(params) => (
        <TextField {...params} fullWidth placeholder={placeholder} className="input_field address" />
      )}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        const matches =
          option.structured_formatting?.main_text_matched_substrings || [];
        const parts = parse(
          option.structured_formatting?.main_text || '',
          matches.map((match) => [match.offset, match.offset + match.length])
        );

        return (
          <li key={key} {...optionProps}>
            <Grid container sx={{ alignItems: 'center' }}>
              <Grid item sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid>
              <Grid
                item
                sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}
              >
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {option.structured_formatting?.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
