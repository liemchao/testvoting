import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Rating,
  Box,
} from "@mui/material";
import jwt_decode from "jwt-decode";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { CustomizedToast } from "components/toast/ToastCustom";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";
import { useTheme, useMediaQuery } from "@mui/material";

export default function FeedbackBubble(props) {
  const idCampainStore = localStorage.getItem("campaignId");
  const [open, setOpen] = useState(props.open); // Sửa dòng này
  const [feedbackText, setFeedbackText] = useState("");
  const [position, setPosition] = useState(0);
  const [rating, setRating] = useState(0);
  const token = localStorage.getItem("token");
  const decode = jwt_decode(token);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleFeedback = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);

    const feedbackData = {
      content: rating,
      userId: decode.Username || decode.userId,
      campaignId: idCampainStore,
    };

    axios
      .post("https://liemtroller-001-site1.jtempurl.com/api/v1/feedbacks", feedbackData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // other headers if needed
        },
      })
      .then((response) => {
        CustomizedToast({
          message: `Gửi đánh giá thành công`,
          type: "SUCCESS",
        });
      })
      .catch((error) => {
        CustomizedToast({
          message: `Gửi đánh giá thất bại`,
          type: "ERROR",
        });
      });
  };

  const handleTextChange = (event) => {
    setFeedbackText(event.target.value);
  };

  const handleRatingChange = (event) => {
    const newRating = event.target.value;
    setRating(newRating);
  };

  return (
    <>
      <Dialog maxWidth="lg" open={open} onClose={handleClose}>
        <DialogTitle
          sx={{
            color: "#929290",
            fontFamily: "UTM Swiss Condensed Regular",
            fontWeight: "bold",
            fontSize: isMobile ? "17px" : "30px",
          }}
        >
          Trải nghiệm khi tham gia bình chọn
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "16vh",
            }}
          >
            <Rating
              name="feedback-rating"
              value={rating}
              onChange={handleRatingChange}
              sx={{
                color: "#EBB600",
                fontSize: "3rem",
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <ButtonLangding onClick={handleSave} na nameButton="Lưu"></ButtonLangding>
        </DialogActions>
      </Dialog>
    </>
  );
}
