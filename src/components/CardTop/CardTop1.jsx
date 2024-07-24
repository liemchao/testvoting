import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import ShareIcon from "@mui/icons-material/Share";
import Iconify from "assets/theme/components/icon/Iconify";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Favorite from "@mui/icons-material/Favorite";
import "./Fire.css";
const getIcon = (name) => <Iconify icon={name} width={40} height={40} />;
export default function CardTop1(props) {
  const {
    name,
    image,
    description,
    score,
    onClickUnVote,
    onClickVote,
    onClickShare,
    handleClick,
    groupName,
    id,
    isVoted,
  } = props;

  return (
    <>
      <div class="pyro">
        <div class="before"></div>
        <div class="after"></div>
      </div>
      <Card
        id={id}
        variant="outlined"
        sx={{ width: 320, bottom: 10, borderWidth: "4px", borderColor: "#FFD700" }}
      >
        <CardOverflow>
          <AspectRatio ratio="1">
            <img
              style={{ display: "over", objectFit: "cover" }}
              src={image}
              srcSet={image}
              loading="lazy"
              alt={image}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://loiphong.vn/uploaded/10.GOC-TU-VAN/100.anh-phat/anh-phat-01.jpg";
              }}
            />
          </AspectRatio>

          {isVoted ? (
            <IconButton
              aria-label="Like minimal photography"
              size="md"
              variant="solid"
              color="success"
              onClick={onClickUnVote}
              sx={{
                backgroundColor: isVoted ? "#FFA500" : "#D44FAC",
                "&:hover": {
                  backgroundColor: isVoted ? "#D44FAC" : "#F7941D",
                },
                position: "absolute",
                zIndex: 2,
                borderRadius: "50%",
                right: "4rem",
                bottom: 0,
                transform: "translateY(10%)",
              }}
            >
              <HowToVoteIcon />
            </IconButton>
          ) : (
            <IconButton
              aria-label="Like minimal photography"
              size="md"
              variant="solid"
              color="success"
              onClick={onClickVote}
              sx={{
                backgroundColor: "#FFD700",
                "&:hover": {
                  backgroundColor: "#FFD700",
                },
                position: "absolute",
                zIndex: 2,
                borderRadius: "50%",
                right: "4rem",
                bottom: 0,
                color: "white",

                transform: "translateY(-690%)",
              }}
            >
              #1
            </IconButton>
          )}

          {/* <IconButton
          aria-label="Like minimal photography"
          size="md"
          variant="solid"
          color="success"
          onClick={onClickLike}
          sx={{
            position: "absolute",
            zIndex: 2,
            borderRadius: "50%",
            right: "1rem",
            bottom: 0,
            transform: "translateY(50%)",
          }}
        >
          <Favorite />
        </IconButton> */}
        </CardOverflow>
        <CardContent>
          <Typography
            level="h2"
            fontSize="md"
            sx={{
              color: "#B83490",
            }}
          >
            <Link onClick={handleClick} overlay underline="none" color="#B83490">
              {name}
            </Link>
          </Typography>
        </CardContent>
        <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
          <Divider inset="context" />
          <CardContent orientation="horizontal">
            <Typography level="body3" sx={{ fontWeight: "md", color: "#B83490" }}>
              {
                <IconButton info>
                  <Favorite sx={{ color: "#D44FAC" }} /> {score}
                </IconButton>
              }
            </Typography>
          </CardContent>
        </CardOverflow>
      </Card>
      <div class="pyro">
        <div class="before"></div>
        <div class="after"></div>
      </div>
    </>
  );
}
