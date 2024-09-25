import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./custom-fonts.css";
import { useTheme, useMediaQuery } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";

const CountdownTimer = () => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());
  const [timerId, setTimerId] = useState(null);

  const gradient = "white";
  const textShadow = "2px 5px 5px rgba(0, 0, 0, 0.3)";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    axios
      .get("https://liemtroller-001-site1.jtempurl.com/api/v1/campaigns/representative")
      .then((response) => {
        const now = new Date();
        const endTimeValue = dayjs(response.data.data.endTime).format("DD-MM-YYYY HH:mm:ss");

        setStartTime(dayjs(now).format("DD-MM-YYYY HH:mm:ss"));
        setEndTime(endTimeValue);
      })
      .catch((error) => {
        console.error("Error fetching API data:", error);
      });

    return () => {
      // Clear the interval when the component is unmounted
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    if (endTime) {
      const now = new Date();
      const timeDifference = dayjs(endTime, "DD-MM-YYYY HH:mm:ss").diff(now, "millisecond");
      setRemainingTime(calculateRemainingTime(timeDifference));

      // Start the countdown timer
      const id = setInterval(() => {
        const updatedTimeDifference = dayjs(endTime, "DD-MM-YYYY HH:mm:ss").diff(
          new Date(),
          "millisecond"
        );
        setRemainingTime(calculateRemainingTime(updatedTimeDifference));
      }, 1000);

      setTimerId(id);
    }
  }, [endTime]);

  function calculateRemainingTime(timeDifference) {
    if (timeDifference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "-2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          paddingLeft: "5%",
          paddingRight: "5%",
          justifyContent: "center",
          gap: isMobile ? "2rem" : "6.2rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: isMobile ? "2%" : "5%",
            paddingRight: isMobile ? "3%" : "5%",
            height: isMobile ? "10rem" : "17rem",
            backgroundImage: `url("https://res.cloudinary.com/ddrq4bfkk/image/upload/f_auto,q_auto/v1/2024/pzi2antdfpox6zoloxk5")`,
            backgroundSize: "100% 100%",
          }}
        >
          <Typography
            alignItems="center"
            fontSize={{ xs: "3rem", md: "7rem" }}
            fontWeight="bold"
            sx={{
              background: gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "white",
              fontFamily: "UTM Swiss Condensed Regular",
              textShadow: textShadow,
            }}
          >
            {remainingTime.days < 10 ? `0${remainingTime.days}` : remainingTime.days}
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: isMobile ? "2%" : "5%",
            paddingRight: isMobile ? "3%" : "5%",
            width: "50%",
            height: isMobile ? "10rem" : "17rem",
            backgroundImage: `url("https://res.cloudinary.com/ddrq4bfkk/image/upload/f_auto,q_auto/v1/2024/pzi2antdfpox6zoloxk5")`,
            backgroundSize: "100% 100%",
          }}
        >
          <Typography
            fontWeight="bold"
            display="inline"
            fontSize={{ xs: "3rem", md: "7rem" }}
            sx={{
              background: gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "white",
              fontFamily: "UTM Swiss Condensed Regular",
              textShadow: textShadow,
            }}
          >
            {remainingTime.hours < 10 ? `0${remainingTime.hours}` : remainingTime.hours}
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: isMobile ? "2%" : "5%",
            paddingRight: isMobile ? "3%" : "5%",
            width: "100%",
            height: isMobile ? "10rem" : "17rem",
            backgroundImage: `url("https://res.cloudinary.com/ddrq4bfkk/image/upload/f_auto,q_auto/v1/2024/pzi2antdfpox6zoloxk5")`,
            backgroundSize: "100% 100%",
          }}
        >
          <Typography
            fontWeight="bold"
            display="inline"
            fontSize={{ xs: "3rem", md: "7rem" }}
            sx={{
              background: gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "white",
              fontFamily: "UTM Swiss Condensed Regular",
              textShadow: textShadow,
            }}
          >
            {remainingTime.minutes < 10 ? `0${remainingTime.minutes}` : remainingTime.minutes}
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: isMobile ? "2%" : "5%",
            paddingRight: isMobile ? "3%" : "5%",
            backgroundImage: `url("https://res.cloudinary.com/ddrq4bfkk/image/upload/f_auto,q_auto/v1/2024/pzi2antdfpox6zoloxk5")`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: isMobile ? "10rem" : "17rem",
            // overflow: hidden,
            // position: relative,
          }}
        >
          <Typography
            fontWeight="bold"
            display="flex"
            textAlign={"center"}
            fontSize={{ xs: "3rem", md: "7rem" }}
            sx={{
              background: gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "white",
              fontFamily: "UTM Swiss Condensed Regular",
              textShadow: textShadow,
            }}
          >
            {remainingTime.seconds < 10 ? `0${remainingTime.seconds}` : remainingTime.seconds}
          </Typography>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: isMobile ? "-1rem" : "-1.5rem",
          marginBottom: "2rem",
          gap: isMobile ? "21%" : "25%",
        }}
      >
        <Typography
          variant="h5"
          display="inline"
          fontSize={{ xs: "13px", md: "2rem" }}
          sx={{
            color: "white",
            fontFamily: "UTM Swiss Condensed Regular",
            marginRight: isMobile ? "2rem" : "6rem", // Khoảng cách giữa các từ
          }}
        >
          NGÀY
        </Typography>
        <Typography
          variant="h5"
          display="inline"
          fontSize={{ xs: "13px", md: "2rem" }}
          sx={{
            color: "white",
            fontFamily: "UTM Swiss Condensed Regular",
            marginRight: isMobile ? "2rem" : "6rem", // Khoảng cách giữa các từ
          }}
        >
          GIỜ
        </Typography>
        <Typography
          variant="h5"
          display="inline"
          fontSize={{ xs: "13px", md: "2rem" }}
          sx={{
            color: "white",
            fontFamily: "UTM Swiss Condensed Regular",
            marginRight: isMobile ? "2rem" : "6rem", // Khoảng cách giữa các từ
          }}
        >
          PHÚT
        </Typography>
        <Typography
          variant="h5"
          display="inline"
          fontSize={{ xs: "13px", md: "2rem" }}
          sx={{
            color: "white",
            fontFamily: "UTM Swiss Condensed Regular",
          }}
        >
          GIÂY
        </Typography>
      </div>
    </div>
  );
};

export default CountdownTimer;
