import * as React from "react";
import Stack from "@mui/material/Stack";
import Imagetimeline from "assets/images/MỐC.png";
import { Typography } from "@mui/joy";
import { useSelector } from "react-redux";

export default function CustomizedSteppers() {
  const design = useSelector((state) => {
    return state.design;
  });
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <div style={{ position: "relative", display: "inline-block", marginTop: "-6rem" }}>
        <img
          style={{ paddingLeft: "10%", paddingRight: "7%", width: "90%" }}
          src={Imagetimeline}
          alt="Timeline"
        />
        <Typography
          variant="body1"
          sx={{
            position: "absolute",
            bottom: "10%",
            left: "10.5%",
            color: design.textColor,
            fontFamily: "UTM Swiss Condensed Regular",
            fontSize: 17,
            "@media (max-width: 600px)": {
              fontSize: "14px",
              bottom: "-40%",
              left: "5%",
            },
          }}
        >
          Mở cổng bình chọn
        </Typography>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            position: "absolute",
            bottom: "15%",
            left: "10%",
            color: design.textColor,
            fontFamily: "UTM Swiss Condensed Regular",
            fontSize: 30,
            "@media (max-width: 600px)": {
              fontSize: "14px",
              bottom: "30%",
              left: "5%",
            },
          }}
        >
          {design.time1}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            position: "absolute",
            bottom: "51%",
            left: "28.5%",
            color: design.textColor,
            fontFamily: "UTM Swiss Condensed Regular",
            fontSize: 16,
            "@media (max-width: 600px)": {
              fontSize: "14px",
              bottom: "-32%",
              left: "30%",
            },
          }}
        >
          Đóng cổng bình chọn
        </Typography>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            position: "absolute",
            bottom: "55%",
            left: "28%",
            color: design.textColor,
            fontFamily: "UTM Swiss Condensed Regular",
            fontSize: 30,
            "@media (max-width: 600px)": {
              fontSize: "14px",
              bottom: "37%",
              left: "28%",
            },
          }}
        >
          {design.time2}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            position: "absolute",
            bottom: "-9%",
            left: "49%",
            color: design.textColor,
            fontFamily: "UTM Swiss Condensed Regular",
            fontSize: 17,
            "@media (max-width: 600px)": {
              fontSize: "14px",
              bottom: "-20%",
              left: "52%",
            },
          }}
        >
          Công bố TOP 10
        </Typography>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            position: "absolute",
            bottom: "-5%",
            left: "48%",
            color: design.textColor,
            fontFamily: "UTM Swiss Condensed Regular",
            fontSize: 30,
            "@media (max-width: 600px)": {
              fontSize: "14px",
              bottom: "60%",
              left: "50%",
            },
          }}
        >
          {design.time3}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            position: "absolute",
            bottom: "39%",
            left: "73%",
            color: design.textColor,
            fontFamily: "UTM Swiss Condensed Regular",
            fontSize: 17,
            "@media (max-width: 600px)": {
              fontSize: "14px",
              bottom: "10%",
              left: "75%",
            },
          }}
        >
          Vinh danh TOP 10
        </Typography>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            position: "absolute",
            bottom: "43%",
            left: "72%",
            color: design.textColor,
            fontFamily: "UTM Swiss Condensed Regular",
            fontSize: 30,
            "@media (max-width: 600px)": {
              fontSize: "14px",
              bottom: "84%",
              left: "72%",
            },
          }}
        >
          {design.time4}
        </Typography>
      </div>
    </Stack>
  );
}
