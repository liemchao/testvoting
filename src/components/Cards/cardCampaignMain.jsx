import * as React from "react";
import Box from "@mui/joy/Box";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { useState } from "react";
import { useEffect } from "react";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";
import { Card } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

export default function MainCard(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    title,
    process,
    totalCandidate,
    description,
    url,
    creater,
    onClickJoin,
    onClickShare,
    dayEnd,
    onClickResult,
    startTime,
    visibilityCandidate,
  } = props;

  const [isButtonDisabled, setIsButtonDisabled] = useState(
    process === "Chưa bắt đầu" || process === "Đã kết thúc"
  );
  const design = useSelector((state) => {
    return state.design;
  });
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
          marginTop: "2%",
          width: "96%",
          "@media (max-width: 1250px)": {
            width: "100%",
          },
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

          backgroundImage: `url("https://res.cloudinary.com/ddrq4bfkk/image/upload/f_auto,q_auto/v1/2024/sjwd61p3aomt6edqu6sf")`,
          backgroundSize: "100% 100%",
        }}
      >
        <CardContent>
          {/* <Typography level="body1" fontWeight="lg" textColor="text.tertiary">
                                      {creater}
                                    </Typography> */}{" "}
          <Sheet
            sx={{
              borderRadius: "sm",
              p: 7,
              "@media (max-width: 1250px)": {
                p: 3,
              },

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
                  color: design.textColor,

                  fontFamily: "UTM Swiss Condensed Regular", // Đặt font chữ tùy chỉnh
                }}
              >
                ‟
              </Typography>
              <Typography
                level="body"
                fontWeight="normal"
                fontSize={isMobile ? 10 : 32}
                sx={{
                  color: design.textColor,
                  fontFamily: "UTM Swiss Condensed Regular",
                  // Đặt font chữ tùy chỉnh
                  marginTop: "-1rem",
                  textAlign: "center", // Căn giữa nội dung
                  "@media (max-width: 1250px)": {
                    fontSize: 26,
                  },
                }}
              >
                {/* {description} */}
                Danh hiệu <strong>Inspiring Instructor Awards 2024</strong> nhằm tôn vinh những nỗ
                lực, cống hiến của Giảng viên trong hành trình định hướng, giúp đỡ sinh viên thu
                nhận kiến thức và truyền cảm hứng đến sinh viên <strong>FPTU HCMC</strong> trong 3
                học kỳ: <strong>Fall 2023, Spring 2024 và Summer 2024.</strong>
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: isMobile ? 1 : 3,
                  mt: 2,
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                {process === "Đã kết thúc" ? (
                  <ButtonLangding
                    nameButton="TOP 10"
                    height={isMobile ? "3.5rem" : "3.5rem"}
                    width={isMobile ? "8rem" : "12rem"}
                    bgColor={design.textColor}
                    hovercolor={design.textColor}
                    onClick={onClickResult}
                    borderRadius={"50px"}
                  />
                ) : (
                  <ButtonLangding
                    nameButton="THAM GIA"
                    height={isMobile ? "3.5rem" : "3.5rem"}
                    width={isMobile ? "8rem" : "12rem"}
                    bgColor={isButtonDisabled ? "#CCCCCC" : "#FFA500"}
                    hovercolor={isButtonDisabled ? "#CCCCCC" : "#F7941D"}
                    onClick={onClickJoin}
                    disabled={isButtonDisabled}
                    borderRadius={"50px"}
                  />
                )}
                <ButtonLangding
                  height={isMobile ? "3.5rem" : "3.5rem"}
                  width={isMobile ? "8rem" : "12rem"}
                  nameButton="CHIA SẺ"
                  bgColor={design.textColor}
                  onClick={onClickShare}
                  borderRadius={"50px"}
                  disabled={process === "Đã kết thúc"}
                />
              </Box>
              <div style={{ visibility: "hidden" }}>
                <ButtonLangding
                  height={isMobile ? "2.5rem" : "3.5rem"}
                  width={isMobile ? "8rem" : "15rem"}
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
