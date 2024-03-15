import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
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
    },
  },
});

PrayerCards.propTypes = {
  name: PropTypes.string.isRequired,
  time: PropTypes.string,
  image: PropTypes.string.isRequired,
};

export default function PrayerCards({ name, time, image }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <ThemeProvider theme={theme}>
        <CardActionArea>
          <CardMedia component="img" height="140" image={image} alt={name} />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color="text.primary"
            >
              {name}
            </Typography>

            <Typography variant="h2" color="text.secondary">
              {time}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            sx={{ fontSize: "16px", color: "darkgray" }}
            onClick={() => {
              navigator.clipboard.writeText(`${name} ${time}`);
              alert("تم النسخ!");
            }}
          >
            نسخ
          </Button>
        </CardActions>
      </ThemeProvider>
    </Card>
  );
}
