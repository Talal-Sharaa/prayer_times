import { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import CountriesData from "./CountriesData"; // replace with your CountriesData import
import PropTypes from "prop-types";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";

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

const LocationButton = ({ onCountryCitySelect }) => {
  const [loading, setLoading] = useState(false);

  const getUserLocation = async () => {
    setLoading(true);
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await axios.get(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        const { city, countryCode } = response.data;
        const lowerCaseCity = city.charAt(0).toLowerCase() + city.slice(1);
        const countryData = Object.values(CountriesData).find(
          (c) =>
            c.api === countryCode &&
            c.cities.some((cityObj) => cityObj.api === lowerCaseCity)
        );
        if (countryData) {
          onCountryCitySelect(countryData);
        } else {
          alert("بلدك غير مدعوم حالياً!");
        }
      });
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" justifyContent="center">
        <Button
          onClick={getUserLocation}
          disabled={loading}
          sx={{ backgroundColor: "#566B68", color: "white" }}
        >
          {loading ? "Loading..." : "احصل على موقعي الحالي"}
        </Button>
      </Box>
    </ThemeProvider>
  );
};

LocationButton.propTypes = {
  onCountryCitySelect: PropTypes.func.isRequired,
};

export default LocationButton;
