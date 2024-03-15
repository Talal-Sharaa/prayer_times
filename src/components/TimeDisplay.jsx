import Box from "@mui/material/Box";
import PropTypes from "prop-types";

const TimeDisplay = ({ time, city }) => {
  return (
    <Box display="flex" justifyContent="center">
      <div>
        <h2 style={{ lineHeight: "0.2" }}>{time}</h2>
        <h1 style={{ lineHeight: "0.2" }}>{city}</h1>
      </div>
    </Box>
  );
};
TimeDisplay.propTypes = {
  time: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
};
export default TimeDisplay;
