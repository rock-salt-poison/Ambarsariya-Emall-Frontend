import React, { useState, useEffect } from 'react';
import { Autocomplete, InputAdornment, TextField, ThemeProvider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import '../../styles/variables.scss';
import { useDebounce } from "@uidotdev/usehooks";

function AutoCompleteSearchField(props) {
    const [inputValue, setInputValue] = useState('');
    const debouncedInputValue = useDebounce(inputValue, 300);

    

    const themeProps = {
        popoverBackgroundColor: props.popoverBackgroundColor || 'var(--yellow)',
    };

    useEffect(() => {
        const filterData = (searchTerm) => {
            if (!searchTerm) {
                props.onFilter(props.data);
                return;
            }

            const filtered = props.data.filter(row => {
                const values = Object.values(row).map(value => value.toString().toLowerCase());
                return values.some(value => value.includes(searchTerm.toLowerCase()));
            });
            props.onFilter(filtered);
        };

        filterData(debouncedInputValue);
    }, [debouncedInputValue, props]);

    const handleInputChange = (event, newInputValue) => {
        event.preventDefault();
        setInputValue(newInputValue);
    };

    const theme = createCustomTheme(themeProps);
    return (
        <ThemeProvider theme={theme}>
            <Autocomplete
                freeSolo
                options={props.suggestions.length>0?props.suggestions:[]}
                filterOptions={(options, state) => 
                    options.filter(option => 
                        option.toLowerCase().includes(state.inputValue.toLowerCase())
                    )
                }
                inputValue={inputValue}
                onInputChange={handleInputChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        type={props.type}
                        placeholder={props.placeholder}
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
            />
        </ThemeProvider>
    );
}

export default AutoCompleteSearchField;
