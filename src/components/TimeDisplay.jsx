import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Arapix", "IBM Plex Sans Arabic", "sans-serif"].join(","),
  },
  palette: {
    text: {
      primary: "#275851", // your color here
      secondary: "#7D9A96", // your color here
      tertiary: "#F8F8F8", // your color here
    },
  },
});
const TimeDisplay = ({ time, city }) => {
  return (
    <ThemeProvider theme={theme}>
    <Box display="flex" justifyContent="center">
      <div>
        <h2 style={{ lineHeight: "0.2", color: theme.palette.text.tertiary }}>
          {time}
        </h2>
        <h1 style={{ lineHeight: "0.2", color: theme.palette.text.tertiary }}>
          {city}
        </h1>
      </div>
    </Box>
    </ThemeProvider>
  );
};
TimeDisplay.propTypes = {
  time: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
};
export default TimeDisplay;
