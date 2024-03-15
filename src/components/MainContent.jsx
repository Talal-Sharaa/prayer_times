import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "moment/dist/locale/ar-dz";
moment.locale("ar");

// Other Imports
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import PrayerCards from "./PrayerCards";
import { PrayerImages } from "./PrayerImages";
import CountrySelect from "./CountrySelect";
import CitySelect from "./CitySelect";
import TimeDisplay from "./TimeDisplay";
import Countdown from "./Countdown";
import countries from "./CountriesData";
import LocationButton from "./LocationButton";
const getRandomImage = (prayer) => {
  const images = PrayerImages[prayer];
  if (!images || images.length === 0) {
    return null;
  }
  return images[Math.floor(Math.random() * images.length)];
};

const prayerKeys = [
  { english: "Fajr", arabic: "الفجر" },
  { english: "Dhuhr", arabic: "الظهر" },
  { english: "Asr", arabic: "العصر" },
  { english: "Maghrib", arabic: "المغرب" },
  { english: "Isha", arabic: "العشاء" },
];
const MainContent = () => {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [country, setCountry] = useState(countries.JO.api);
  const [city, setCity] = useState(countries.JO.cities[0]);
  const [time, setTime] = useState(moment().format("Do MMM YY | h:mm:ss a"));
  const [isLoading, setIsLoading] = useState(false);

  const handleCountryCitySelect = (countryData) => {
    setCountry(countryData.api);
    setCity(countryData.cities[0]); // Select the first city
  };

  const handleCountryChange = (event) => {
    const selectedCountry = Object.values(countries).find(
      (c) => c.api === event.target.value
    );
    setCountry(selectedCountry.api);
    setCity(selectedCountry.cities[0]);
  };

  const handleCityChange = (event) => {
    const selectedCity = countries[country].cities.find(
      (c) => c.display === event.target.value
    );
    setCity(selectedCity);
  };

  const [images, setImages] = useState({});

  useEffect(() => {
    const newImages = {};
    Object.keys(prayerTimes).forEach((prayer) => {
      newImages[prayer] = getRandomImage(prayer);
    });
    setImages(newImages);
  }, [city, prayerTimes]);
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      if (city && country) {
        setIsLoading(true);

        try {
          const response = await axios.get(
            `https://api.aladhan.com/v1/timingsByCity/14-03-2024?city=${city.api}&country=${country}&method=13`
          );
          setPrayerTimes(response.data.data.timings);
        } catch (error) {
          console.log("Error:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchPrayerTimes();
  }, [city, country]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(moment().format("Do MMM YY | h:mm:ss a"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Grid container>
        <Grid item="true" xs={12} sm={6}>
          <TimeDisplay time={time} city={city.display} />
        </Grid>
        <Grid item="true" xs={12} sm={6}>
          <Countdown prayerTimes={prayerTimes} />
        </Grid>
      </Grid>

      {isLoading ? (
        <div>Loading Prayer Times...</div>
      ) : (
        <>
          <Divider
            style={{
              width: "100%",
              borderColor: "whitesmoke",
              opacity: "0.1",
              marginTop: "1vh",
            }}
          />

          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            marginTop={5}
          >
            <Grid container spacing={2} justifyContent="space-around">
              {prayerKeys.map((prayer, index) => (
                <Grid
                  item={true}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={2}
                  key={`${prayer.english}-${index}`}
                >
                  <PrayerCards
                    name={prayer.arabic}
                    time={prayerTimes[prayer.english]}
                    image={images[prayer.english]}
                  />
                </Grid>
              ))}
            </Grid>
          </Stack>

          <Stack direction="row" justifyContent={"center"} marginTop={5}>
            <Box mr={2}>
              <CountrySelect
                countries={countries}
                country={country}
                onCountryChange={handleCountryChange}
              />
            </Box>
            <Box ml={2}>
              <CitySelect
                cities={countries[country].cities}
                onCityChange={handleCityChange}
                city={city}
              />
            </Box>
          </Stack>
          <LocationButton onCountryCitySelect={handleCountryCitySelect} />
        </>
      )}
    </>
  );
};

export default MainContent;
