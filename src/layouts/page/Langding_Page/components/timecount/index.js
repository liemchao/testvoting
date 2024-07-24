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

  const gradient = "linear-gradient(to bottom, #df40af 45%, #ac0078 5%, #1e2024 50%)";
  const textShadow = "2px 5px 5px rgba(0, 0, 0, 0.3)";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    axios
      .get("https://thienva-001-site1.gtempurl.com/api/v1/campaigns/representative")
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
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: isMobile ? "2rem" : "6.2rem",
          marginBottom: "2rem",
        }}
      >
        <Typography
          display="inline"
          fontSize={{ xs: "4rem", md: "12rem" }}
          sx={{
            background: gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "Antique Book Cover",
            textShadow: textShadow,
          }}
        >
          {remainingTime.days}
        </Typography>
        <Typography
          display="inline"
          fontSize={{ xs: "4rem", md: "12rem" }}
          sx={{
            background: gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "Antique Book Cover",
            textShadow: textShadow,
          }}
        >
          {remainingTime.hours}
        </Typography>
        <Typography
          display="inline"
          fontSize={{ xs: "4rem", md: "12rem" }}
          sx={{
            background: gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "Antique Book Cover",
            textShadow: textShadow,
          }}
        >
          {remainingTime.minutes}
        </Typography>
        <Typography
          display="inline"
          fontSize={{ xs: "4rem", md: "12rem" }}
          sx={{
            background: gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "Antique Book Cover",
            textShadow: textShadow,
          }}
        >
          {remainingTime.seconds}
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "-1rem",
          marginBottom: "2rem",
        }}
      >
        <Typography
          variant="h5"
          display="inline"
          fontSize={{ xs: "2rem", md: "3rem" }}
          sx={{
            color: "#fffff",
            fontFamily: "VLABRAHAMLINCOLN",
            marginRight: isMobile ? "2rem" : "8rem", // Khoảng cách giữa các từ
          }}
        >
          Ngày
        </Typography>
        <Typography
          variant="h5"
          display="inline"
          fontSize={{ xs: "2rem", md: "3rem" }}
          sx={{
            color: "#fffff",
            fontFamily: "VLABRAHAMLINCOLN",
            marginRight: isMobile ? "2rem" : "8rem", // Khoảng cách giữa các từ
          }}
        >
          Giờ
        </Typography>
        <Typography
          variant="h5"
          display="inline"
          fontSize={{ xs: "2rem", md: "3rem" }}
          sx={{
            color: "#fffff",
            fontFamily: "VLABRAHAMLINCOLN",
            marginRight: isMobile ? "2rem" : "12rem", // Khoảng cách giữa các từ
          }}
        >
          Phút
        </Typography>
        <Typography
          variant="h5"
          display="inline"
          fontSize={{ xs: "2rem", md: "3rem" }}
          sx={{
            color: "#fffff",
            fontFamily: "VLABRAHAMLINCOLN",
          }}
        >
          Giây
        </Typography>
      </div>
    </div>
  );
};

export default CountdownTimer;
