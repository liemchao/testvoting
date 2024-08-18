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
import ButtonLangding from "assets/theme/components/button/ButtonLangding";
import dayjs from "dayjs";
import { Description } from "@mui/icons-material";
import { useTheme, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

export default function UserCard(props) {
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
    admin,
    onClickViewDetail,
    onClickDelete,
    onClickUnDe,
    publishTheResult,
    status,
    onClickResult,
    description,
  } = props;
  const [isButtonDisabled, setIsButtonDisabled] = useState(
    process === "Chưa bắt đầu" || process === "Đã kết thúc"
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
        mt: "1%",
        backgroundColor: "transparent",
        border: "none",
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
          "@media (max-width: 500px)": {
            left: "unset",
            right: "0",
            top: "4px",
            bottom: "unset",
            "&::before": {
              content: '""',
              width: "1px",
              height: "calc(100% - 8px)",
              position: "absolute",
              right: "0.5rem",
              color: "text.tertiary",
              fontSize: "sm",
              fontWeight: "lg",
            },
          },
          "&::after": {
            top: "4px",
            // content: '"horizontal"',
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
          backgroundImage: `url("https://res.cloudinary.com/ddrq4bfkk/image/upload/f_auto,q_auto/v1/2024/ijbissnt3d2gu1gru8zc")`,
          backgroundSize: "cover",
          backgroundColor: "transparent",
          border: "none",
          width: "100%",
          flexWrap: "wrap",
          [`& > *`]: {
            "--stack-point": "500px",
            minWidth:
              "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
          },
          overflow: "auto",
          resize: "horizontal",
        }}
      >
        <div
          style={{
            aspectRatio: "1/1", // Thay thế tỷ lệ khung hình ở đây
            maxHeight: 210,
            backgroundColor: "transparent",
            minWidth: 200,
            flex: 1,
            borderRadius: "10px",
            marginTop: "2%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
          borderRadius={"50px"}
        >
          <img
            src={url}
            srcSet={url}
            loading="lazy"
            alt=""
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </div>
        <CardContent>
          <Typography
            fontWeight="bold"
            sx={{
              fontSize: isMobile ? "23px" : "40px",
              color: design.textColor,
              fontFamily: "UTM Swiss Condensed Regular", // Đặt font chữ tùy chỉnh
            }}
          >
            {title}
          </Typography>
          {/* <Typography level="body1" fontWeight="lg" textColor="text.tertiary">
            {creater}
          </Typography> */}
          <Sheet
            sx={{
              backgroundColor: "transparent",
              borderRadius: "sm",
              p: 1.5,
              my: 1.5,
              display: "flex",

              "& > div": { flex: 1.2 },
            }}
          >
            <div>
              <Typography level="body3" fontWeight="lg"></Typography>
              {visibilityCandidate ? (
                <Typography></Typography>
              ) : (
                <Typography>{description}</Typography>
              )}
            </div>

            <div
              style={{
                marginRight: "70%",
                display: "flex",
                flexDirection: "row",
                gap: isMobile ? "14%" : "15%",
              }}
            >
              <div style={{ flex: 5, marginRight: "10px" }}>
                <Typography
                  sx={{
                    whiteSpace: "nowrap",
                    color: design.textColor,
                    fontFamily: "UTM Swiss Condensed Regular",
                  }}
                  fontWeight="lg"
                >
                  Thời gian bắt đầu
                </Typography>
                <Typography
                  sx={{ color: design.textColor, fontFamily: "UTM Swiss Condensed Regular" }}
                  fontWeight="lg"
                >
                  {startTime}
                </Typography>
              </div>
              <div
                style={{
                  flex: 5,
                  marginRight: "30px",
                  color: design.textColor,
                  fontFamily: "UTM Swiss Condensed Regular",
                }}
              >
                <Typography
                  sx={{
                    whiteSpace: "nowrap",
                    color: design.textColor,
                    fontFamily: "UTM Swiss Condensed Regular",
                  }}
                  fontWeight="lg"
                >
                  Thời gian kết thúc
                </Typography>
                <Typography
                  sx={{ color: design.textColor, fontFamily: "UTM Swiss Condensed Regular" }}
                  fontWeight="lg"
                >
                  {dayEnd}
                </Typography>
              </div>
              <div style={{ flex: 5, marginRight: "30px" }}>
                <Typography
                  sx={{
                    whiteSpace: "nowrap",
                    color: design.textColor,
                    fontFamily: "UTM Swiss Condensed Regular",
                  }}
                  fontWeight="lg"
                >
                  Trạng thái
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "UTM Swiss Condensed Regular",
                    whiteSpace: "nowrap",
                    color:
                      process === "Chưa diễn ra"
                        ? "black"
                        : process === "Đang diễn ra"
                        ? "green"
                        : "black",
                  }}
                  fontWeight="lg"
                >
                  {process}
                </Typography>
              </div>
            </div>
          </Sheet>
          <Box sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}>
            {admin === false ? (
              <Box sx={{ display: "flex", gap: 2, marginTop: 6 }}>
                <ButtonLangding
                  nameButton="Xem"
                  height={"3.5  rem"}
                  width={"16rem"}
                  bgColor="#FFA500"
                  hovercolor="#F7941D"
                  onClick={onClickViewDetail}
                  borderRadius={"50px"}
                />
                {status ? (
                  <ButtonLangding
                    nameButton="Xoá"
                    bgColor="#FFA500"
                    height={"3.5rem"}
                    width={"16rem"}
                    hovercolor="#F7941D"
                    onClick={onClickDelete}
                    borderRadius={"50px"}
                  />
                ) : (
                  <ButtonLangding
                    nameButton="Khôi phục"
                    bgColor="#FFA500"
                    height={"3.5rem"}
                    width={"16rem"}
                    hovercolor="#F7941D"
                    onClick={onClickUnDe}
                    borderRadius={"50px"}
                  />
                )}
              </Box>
            ) : (
              <Box sx={{ display: "flex", gap: 5, marginTop: "1%" }}>
                <ButtonLangding
                  height={isMobile ? "3.5rem" : "3.5rem"}
                  width={isMobile ? "8rem" : "16rem"}
                  nameButton="Chia sẻ"
                  bgColor={isButtonDisabled ? "#CCCCCC" : "#FFA500"}
                  hovercolor={isButtonDisabled ? "#CCCCCC" : "#F7941D"}
                  onClick={onClickShare}
                  disabled={isButtonDisabled}
                  borderRadius={"50px"}
                />
                {process === "Đã kết thúc" ? (
                  <ButtonLangding
                    nameButton="Top 10"
                    height={isMobile ? "3.5rem" : "3.5rem"}
                    width={isMobile ? "8rem" : "16rem"}
                    bgColor={"#FFA500"}
                    hovercolor={"#F7941D"}
                    onClick={onClickResult}
                    borderRadius={"50px"}
                  />
                ) : (
                  <ButtonLangding
                    nameButton="Tham gia"
                    height={isMobile ? "3.5rem" : "3.5rem"}
                    width={isMobile ? "8rem" : "16rem"}
                    bgColor={isButtonDisabled ? "#CCCCCC" : "#FFA500"}
                    hovercolor={isButtonDisabled ? "#CCCCCC" : "#F7941D"}
                    onClick={onClickJoin}
                    disabled={isButtonDisabled}
                    borderRadius={"50px"}
                  />
                )}
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
