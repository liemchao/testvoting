import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { useState } from "react";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";

export default function CampaignCard(props) {
  const {
    title,
    url,
    creater,
    onClickJoin,
    onView,
    dayEnd,
    onClickReslut,
    startTime,
    check,
    process,
    totalCandidate,
    visibilityCandidate,
  } = props;

  const [isButtonDisabled, setIsButtonDisabled] = useState(process === "Chưa bắt đầu");
  React.useEffect(() => {
    setIsButtonDisabled(process === "Chưa bắt đầu");
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

          left: "200px",
          top: "-24px",
          bottom: "-24px",
          "&::before": {
            top: "4px",
            // content: '"vertical"',
            display: "block",
            position: "absolute",
            right: "0.5rem",
            color: "text.tertiary",
            fontSize: "sm",
            fontWeight: "lg",
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
        <AspectRatio ratio="1" maxHeight={182} sx={{ minWidth: 182, flex: 1 }}>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
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
        </AspectRatio>
        <CardContent>
          <Typography
            fontWeight="bold"
            sx={{
              fontSize: "30px",
              color: "#B83490",
              fontFamily: "UTM Swiss Condensed Regular", // Đặt font chữ tùy chỉnh
            }}
          >
            {title}
          </Typography>

          <Sheet
            sx={{
              bgcolor: "background.level1",
              borderRadius: "sm",
              p: 1.5,
              my: 1.5,
              display: "flex",
              gap: 1,
              "& > div": { flex: 1 },
            }}
          >
            {visibilityCandidate ? (
              <div>
                <Typography level="body3" fontWeight="lg">
                  Ứng cử viên
                </Typography>
                <Typography fontWeight="lg">{totalCandidate}</Typography>
              </div>
            ) : (
              <div>
                <Typography level="body3" fontWeight="lg">
                  Thời gian bắt đầu
                </Typography>
                <Typography fontWeight="lg">
                  {startTime.substring(0, 10).replace("-", "/")}
                </Typography>
              </div>
            )}

            {visibilityCandidate ? (
              <div>
                <Typography level="body3" fontWeight="lg">
                  Thời gian bắt đầu
                </Typography>
                <Typography fontWeight="lg">
                  {startTime.substring(0, 10).replace("-", "/")}
                </Typography>
                <Typography level="body3" fontWeight="lg" sx={{ whiteSpace: "nowrap" }}>
                  Thời gian kết thúc
                </Typography>
                <Typography fontWeight="lg">{dayEnd.substring(0, 10).replace("-", "/")}</Typography>
              </div>
            ) : (
              <div>
                <Typography level="body3" fontWeight="lg" sx={{ whiteSpace: "nowrap" }}>
                  Thời gian kết thúc
                </Typography>
                <Typography fontWeight="lg">{dayEnd.substring(0, 10)}</Typography>
                <div style={{ visibility: "hidden" }}>
                  <Typography level="body3" fontWeight="lg" sx={{ whiteSpace: "nowrap" }}>
                    Thời gian kết thúc
                  </Typography>
                  <Typography fontSize={22}>{dayEnd}</Typography>
                </div>
              </div>
            )}
            <div>
              <Typography level="body3" fontWeight="lg">
                Trạng thái
              </Typography>
              <Typography
                sx={{
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
          </Sheet>
          {check === false ? (
            <Box sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}>
              <ButtonLangding
                nameButton="Tham gia"
                bgColor={isButtonDisabled ? "#CCCCCC" : "#FFA500"}
                hovercolor={isButtonDisabled ? "#CCCCCC" : "#F7941D"}
                onClick={onClickJoin}
                disabled={isButtonDisabled}
              />
              <ButtonLangding
                nameButton="Chia sẻ"
                bgColor="#FFA500"
                hovercolor="#F7941D"
                onClick={onView}
              />
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}>
              <ButtonLangding
                nameButton="Xem kết quả"
                bgColor="#FFA500"
                hovercolor="#F7941D"
                onClick={onClickReslut}
              />
              <ButtonLangding
                nameButton="Ứng cử viên"
                bgColor="#FFA500"
                hovercolor="#F7941D"
                onClick={onView}
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
