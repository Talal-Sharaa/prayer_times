import Box from "@mui/material/Box";
import moment from "moment";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
const prayerNamesInArabic = {
  Fajr: "الفجر",
  Dhuhr: "الظهر",
  Asr: "العصر",
  Maghrib: "المغرب",
  Sunset: "المغرب",
  Isha: "العشاء",
};
const Countdown = ({ prayerTimes }) => {
  const [remainingTime, setRemainingTime] = useState("00:00:00");
  const [nextPrayer, setNextPrayer] = useState("");

  useEffect(() => {
    const calculateRemainingTime = () => {
      const now = moment();
      console.log("Current time:", now.format("HH:mm:ss"));
      // Find the next prayer time
      let nextPrayerTime = null;
      let nextPrayerName = "";

      for (const prayer in prayerTimes) {
        const prayerTime = moment(prayerTimes[prayer], "HH:mm");
        console.log(
          `Prayer time for ${prayer}:`,
          prayerTime.format("HH:mm:ss")
        );
        if (prayerTime.isAfter(now)) {
          nextPrayerTime = prayerTime;
          nextPrayerName = prayer;
          break;
        }
      }
      setNextPrayer(prayerNamesInArabic[nextPrayerName]);
      console.log(
        "Next prayer time:",
        nextPrayerTime ? nextPrayerTime.format("HH:mm") : "None"
      );
      console.log("Next prayer name:", nextPrayerName);

      if (nextPrayerTime) {
        const duration = moment.duration(nextPrayerTime.diff(now));
        const remainingTime = `${duration.hours()}:${duration.minutes()}:${duration.seconds()}`;
        console.log("Remaining time:", remainingTime);
        setRemainingTime(remainingTime);
      } else {
        console.log("All prayers have passed for today");
        setRemainingTime("0:00:00"); // Or handle the case when all prayers have passed
      }
    };

    calculateRemainingTime(); // Call initially

    // Optionally, set an interval to update the countdown periodically
    const intervalId = setInterval(calculateRemainingTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [prayerTimes]);
  return (
    <Box display="flex" justifyContent="center">
      <div>
        <h2 style={{ lineHeight: "0.2" }}>متبقي حتى صلاة {nextPrayer}</h2>
        <h1 style={{ lineHeight: "0.2" }}>{remainingTime}</h1>
      </div>
    </Box>
  );
};
Countdown.propTypes = {
  prayerTimes: PropTypes.object.isRequired, // Assuming prayerTimes is an object
};
export default Countdown;
