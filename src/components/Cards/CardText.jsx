import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";
import { useState } from "react";
import { useEffect } from "react";
import boderimage from "../../assets/images/GIOI THIEU - KHUNG TEXT 1.png";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";

export default function CardText(props) {
  const {
    title,
    process,
    totalCandidate,
    url,
    creater,
    onClickJoin,
    onClickShare,
    dayEnd,
    startTime,
    visibilityCandidate,
  } = props;
  const [isButtonDisabled, setIsButtonDisabled] = useState(
    process === "Chưa bắt đầu" || process === "Đã kết thúc"
  );
  useEffect(() => {
    setIsButtonDisabled(process === "Chưa bắt đầu" || process === "Đã kết thúc");
  }, [process]);
  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        overflow: { xs: "auto", sm: "initial" },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          display: "block",
          width: "1px",
          left: "500px",
          top: "-24px",
          bottom: "-24px",
          "&::before": {
            top: "4px",
            display: "block",
            position: "absolute",
            right: "0.5rem",
            color: "text.tertiary",
            fontSize: "sm",
            fontWeight: "lg",
          },
          "&::after": {
            top: "4px",
            display: "block",
            position: "absolute",
            left: "0.5rem",
            color: "white",
            fontSize: "sm",
            fontWeight: "lg",
          },
        }}
      />
      <Card
        orientation="horizontal"
        sx={{
          width: "96%",
          flexWrap: "wrap",
          [`& > *`]: {
            "--stack-point": "500px",
            minWidth:
              "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
          },
          overflow: "auto",
          resize: "horizontal",
          position: "relative", // Thêm thuộc tính position: "relative"
          backgroundColor: "transparent", // Đặt màu nền của card là trong suốt
          boxShadow: "none",

          backgroundImage: `url("https://i.imgur.com/dqFqy9W.png")`,
          backgroundSize: "100% 100%",
        }}
      >
        <CardContent>
          <Typography level="body1" fontWeight="lg" textColor="text.tertiary">
            {creater}
          </Typography>
          <Sheet
            sx={{
              borderRadius: "sm",
              p: 7,
              my: 1.5,
              mt: 0,
              display: "flex",
              alignItems: "center", // Canh giữa dọc
              justifyContent: "center", // Canh giữa ngang
              gap: 2,
              "& > div": { flex: 1 },
              backgroundColor: "transparent",
              position: "relative",
            }}
          >
            <div style={{ marginTop: "-2rem" }}>
              <Typography
                level="h1"
                variant="h1"
                fontWeight="lg"
                sx={{
                  textAlign: "center",
                  color: "#B83490",

                  fontFamily: "UTM Swiss Condensed Regular", // Đặt font chữ tùy chỉnh
                }}
              >
                ‟
              </Typography>

              <Typography
                level="body"
                fontWeight="normal"
                fontSize={32}
                sx={{
                  color: "#B83490",
                  fontFamily: "UTM Swiss Condensed Regular",
                  // Đặt font chữ tùy chỉnh
                  marginTop: "-1rem",
                  textAlign: "center", // Căn giữa nội dung
                }}
              >
                Danh hiệu <strong>Inspiring Instructor Awards 2023</strong> nhằm tôn vinh những nỗ
                lực, cống hiến của Giảng viên trong hành trình trao truyền kiến thức và cảm hứng đến
                sinh viên <strong>FPTU HCMC</strong> trong 3 học kỳ:{" "}
                <strong>Fall 2022, Spring 2023 và Summer 2023.</strong>
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  mt: 2,
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              ></Box>
              <div style={{ visibility: "hidden" }}>
                <ButtonLangding
                  height={"3.5rem"}
                  width={"15rem"}
                  nameButton="THAM GIA"
                  bgColor="#d44fac"
                  // onClick={onClickJoin}
                  borderRadius={"50px"}
                />
              </div>
            </div>
          </Sheet>
        </CardContent>
      </Card>
    </Box>
  );
}
