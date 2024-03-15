import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PropTypes from 'prop-types';

const theme = createTheme({
  typography: {
    fontFamily: ["Arapix", "IBM Plex Sans Arabic", "sans-serif"].join(","),
  },
  palette: {
    text: {
      primary: "#275851", // your color here
      secondary: "#7D9A96", // your color here
    },
  },
});

const CountrySelect = ({ countries, country, onCountryChange }) => {
  return (
    <ThemeProvider theme={theme}>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="country-select-label">الدولة</InputLabel>
        <Select
          labelId="country-select-label"
          id="country-select"
          value={country} 
          onChange={onCountryChange}
          autoWidth
          label="الدولة"
        >
          {Object.values(countries).map((country) => (
            <MenuItem key={country.api} value={country.api}>
              {country.display}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ThemeProvider>
  );
};

CountrySelect.propTypes = {
  countries: PropTypes.object.isRequired,
  country: PropTypes.string,
  onCountryChange: PropTypes.func.isRequired,
};

export default CountrySelect;