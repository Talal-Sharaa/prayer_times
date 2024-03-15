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
const CitySelect = ({cities, city, onCityChange }) => { 
  return (
    <ThemeProvider theme={theme}>
    <FormControl sx={{ m: 1, minWidth: 80 }}>
      <InputLabel id="city-select-label">المدينة</InputLabel>
      <Select
        labelId="city-select-label"
        id="city-select"
        value={city.display} 
        onChange={onCityChange}
        autoWidth
        label="المدينة"
      >
        {cities.map((city) => (
          <MenuItem key={city.api} value={city.display}>
            {city.display}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    </ThemeProvider>
  );
};
CitySelect.propTypes = {
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      api: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
    })
  ).isRequired,
  onCityChange: PropTypes.func.isRequired,
  city: PropTypes.object.isRequired, // Adjust this based on the actual shape of your 'city' prop
};
export default CitySelect;
