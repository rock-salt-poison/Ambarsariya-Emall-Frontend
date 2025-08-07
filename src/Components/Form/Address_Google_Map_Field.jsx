import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';
import { useLoadScript } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_API;
const libraries = ['places'];

const autocompleteService = { current: null };
const placesService = { current: null };

export default function Address_Google_Map_Field({ value, label, onChange, placeholder, disable, readOnly }) {
  const [inputValue, setInputValue] = React.useState('');
  const [updatedValue, setUpdatedValue] = React.useState('');
  const [options, setOptions] = React.useState([]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

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
    if (!isLoaded) return;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }

    if (inputValue === '') {
      setOptions(updatedValue ? [updatedValue] : []);
      return;
    }

    fetch({ input: inputValue }, (results) => {
      let newOptions = updatedValue ? [updatedValue, ...(results || [])] : results || [];
      if (newOptions.length === 0) {
        newOptions = [{ description: inputValue, place_id: "no_match" }];
      }
      setOptions(newOptions);
    });
  }, [isLoaded, inputValue, fetch]);

  React.useEffect(() => {
    if (value) {
      setUpdatedValue(value);
      setInputValue(value.description || value);
    }
  }, [value]);

  const handlePlaceSelect = (event, newValue) => {
    if (!newValue) {
      setUpdatedValue(null);
      onChange(null);
      return;
    }

    if (newValue.place_id !== "no_match") {
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
              latitude: placeDetails.geometry?.location?.lat() || 31.6340,
              longitude: placeDetails.geometry?.location?.lng() || 74.8723,
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

  const saveUserTypedLocation = () => {
    if (!inputValue.trim() || (updatedValue && updatedValue.place_id !== "manual_entry")) return;

    const defaultPlace = {
      description: inputValue,
      place_id: "manual_entry",
      latitude: 31.6340,
      longitude: 74.8723,
      formatted_address: inputValue,
    };

    onChange(defaultPlace);
    setUpdatedValue(defaultPlace);
  };

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading Google Maps...</div>;

  return (
    <Autocomplete
      getOptionLabel={(option) => typeof option === 'string' ? option : option.description}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={updatedValue}
      size='small'
      fullWidth
      freeSolo
      noOptionsText="No locations"
      className="input_field"
      disabled={disable}
      readOnly={readOnly}
      isOptionEqualToValue={(option, value) => option?.description === value?.description}
      placeholder={placeholder}
      onChange={handlePlaceSelect}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        if (!newInputValue.trim()) {
          setUpdatedValue(null);
          onChange(null);
        }
      }}
      onBlur={saveUserTypedLocation}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          saveUserTypedLocation();
        }
      }}
      renderInput={(params) => (
        <TextField {...params} fullWidth placeholder={placeholder} className="input_field address" />
      )}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        const matches = option.structured_formatting?.main_text_matched_substrings || [];
        const parts = parse(option.structured_formatting?.main_text || '', matches.map(match => [match.offset, match.offset + match.length]));

        return (
          <li key={key} {...optionProps}>
            <Grid container sx={{ alignItems: 'center' }}>
              <Grid item sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid>
              <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                {parts.map((part, index) => (
                  <Box key={index} component="span" sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}>
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
