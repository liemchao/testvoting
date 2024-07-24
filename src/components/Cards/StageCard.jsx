import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import moment from "moment/moment";
import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";

export default function StageCard(props) {
  const { title, onClickJoin, process, content, starttime, endtime, admin, onClickViewDetail } =
    props;
  return (
    <Card sx={{ width: 400, maxWidth: "100%", boxShadow: "lg", gap: "2rem" }}>
      <CardOverflow>
        <AspectRatio sx={{ minWidth: 180 }}>
          <img
            src="https://nhadepso.com/wp-content/uploads/2023/02/tang-ban-50-hinh-nen-iphone-x-full-hd-dep-sang-chanh-nhat-1.jpg"
            srcSet="https://nhadepso.com/wp-content/uploads/2023/02/tang-ban-50-hinh-nen-iphone-x-full-hd-dep-sang-chanh-nhat-1.jpg&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="h3" fontWeight="xl" color="neutral" textColor="text.primary" overlay>
          {title}
        </Typography>
        <Typography href="#product-card" level="body2">
          "{content}"
        </Typography>

        <Typography
          fontSize="xl"
          fontWeight="xl"
          sx={{ mt: 1 }}
          endDecorator={
            <Chip
              sx={{
                color:
                  process === "Chưa diễn ra"
                    ? "warning"
                    : process === "Đang diễn ra"
                    ? "green"
                    : "black",
              }}
              component="span"
              size="sm"
              variant="soft"
            >
              {process}
            </Chip>
          }
        ></Typography>
        <Typography level="body3">
          <strong>
            {moment(starttime).format("DD-MM-YYYY HH:mm:ss")} đến{" "}
            {moment(endtime).format("DD-MM-YYYY HH:mm:ss")}
          </strong>
        </Typography>
      </CardContent>
      <CardOverflow>
        {admin === undefined && (
          <Button
            sx={{
              backgroundColor: "#FFA500",
              "&:hover": {
                backgroundColor: "#F7941D",
              },
            }}
            variant="solid"
            size="lg"
            onClick={onClickJoin}
            disabled={process === "Chưa diễn ra" || process === "Đã kết thúc"}
          >
            Tham gia
          </Button>
        )}
        {admin === false && (
          <>
            <Button
              sx={{
                backgroundColor: "#FFA500",
                "&:hover": {
                  backgroundColor: "#F7941D",
                },
              }}
              variant="solid"
              size="lg"
              onClick={onClickViewDetail}
            >
              xem
            </Button>
            {/* <Button
              sx={{
                backgroundColor: "#FFA500",
                "&:hover": {
                  backgroundColor: "#F7941D",
                },
              }}
              variant="solid"
              size="lg"
              onClick={onClickViewDetail}
            >
              Kết thúc
            </Button> */}
          </>
        )}
      </CardOverflow>
    </Card>
  );
}
