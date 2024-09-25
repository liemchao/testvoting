import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import ShareIcon from "@mui/icons-material/Share";
import Iconify from "assets/theme/components/icon/Iconify";
const getIcon = (name) => <Iconify icon={name} width={40} height={40} />;
export default function MultipleInteractionCard(props) {
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
      <Card id={id} variant="outlined" sx={{ width: 320, bottom: 10 }}>
        <CardOverflow>
          <AspectRatio ratio="1">
            <img
              style={{ display: "over", objectFit: "cover" }}
              src={image}
              srcSet={image}
              loading="lazy"
              alt=""
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://loiphong.vn/uploaded/10.GOC-TU-VAN/100.anh-phat/anh-phat-01.jpg";
                alt = "";
              }}
            />
          </AspectRatio>
          <IconButton
            aria-label="Like minimal photography"
            size="md"
            variant="solid"
            color="success"
            onClick={onClickShare}
            sx={{
              position: "absolute",
              zIndex: 2,
              borderRadius: "50%",
              right: "1rem",
              bottom: 0,
              transform: "translateY(50%)",
              backgroundColor: "#D44FAC",
              "&:hover": {
                backgroundColor: "#D44FAC",
              },
            }}
          >
            <ShareIcon />
          </IconButton>
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
                transform: "translateY(50%)",
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
                backgroundColor: isVoted ? "#FFA500" : "#D44FAC",
                "&:hover": {
                  backgroundColor: isVoted ? "#D44FAC" : "#F7941D",
                },
                position: "absolute",
                zIndex: 2,
                borderRadius: "50%",
                right: "4rem",
                bottom: 0,
                transform: "translateY(50%)",
              }}
            >
              <HowToVoteIcon />
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
          <Typography level="h2" fontSize="md">
            <Link onClick={handleClick} overlay underline="none">
              {name}
            </Link>
          </Typography>
          <Typography level="body2" sx={{ mt: 0.5 }}>
            <Link href="#multiple-actions">{description}</Link>
          </Typography>
        </CardContent>
        <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
          <Divider inset="context" />
          <CardContent orientation="horizontal">
            <Typography level="body1" sx={{ fontWeight: "md", color: "text.secondary" }}>
              {
                <IconButton>
                  {getIcon("mdi:fire")} {score}
                </IconButton>
              }
            </Typography>
            <Divider orientation="vertical" />
            <Typography level="body1" sx={{ mt: 1, fontWeight: "md", color: "text.secondary" }}>
              {groupName}
            </Typography>
          </CardContent>
        </CardOverflow>
      </Card>
    </>
  );
}
