import * as React from "react";

import { Box } from "@mui/joy";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";
import VotingRules from "layouts/page/Langding_Page/components/rules";
import { Container, Dialog } from "@mui/material";
import jwt_decode from "jwt-decode";
import { getScorebyStage } from "context/redux/action/action";

export default function Policy(props) {
  const { id } = useParams();
  const { OpenAlret, SetOpenAlret } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const decode = jwt_decode(token);
  const handleUnderstand = async () => {
    await dispatch(getScorebyStage(id, decode.Username || decode.userId, token));
    SetOpenAlret(false);
  };
  return (
    <Dialog
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={OpenAlret}
      onClose={() => SetOpenAlret(false)}
      sx={{
        borderRadius: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        // Thêm thuộc tính backgroundSize với giá trị "cover"
      }}
      maxWidth="xl" // Thiết lập độ rộng mong muốn, ví dụ "lg" cho độ rộng lớns
    >
      <Box
        sx={{
          backgroundImage: `url("https://res.cloudinary.com/ddrq4bfkk/image/upload/f_auto,q_auto/v1/2024/ijbissnt3d2gu1gru8zc")`,
          backgroundSize: "cover", // Thêm thuộc tính backgroundSize với giá trị "cover"
        }}
      >
        <Box visibility="hidden" sx={{ mt: "-1rem", display: "flex", justifyContent: "center" }}>
          <ButtonLangding
            nameButton="Tôi đồng ý"
            bgColor="#FFA500"
            hovercolor="#F7941D"
            onClick={() => {
              handleUnderstand();
            }}
          />
        </Box>
        <VotingRules />
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <ButtonLangding
            nameButton="Tôi đồng ý"
            bgColor="#FFA500"
            hovercolor="#F7941D"
            onClick={() => {
              handleUnderstand();
            }}
          />
        </Box>
        <Box visibility="hidden" sx={{ mt: "-1rem", display: "flex", justifyContent: "center" }}>
          <ButtonLangding
            nameButton="Tôi đồng ý"
            bgColor="#FFA500"
            hovercolor="#F7941D"
            onClick={() => {
              handleUnderstand();
            }}
          />
        </Box>
      </Box>
    </Dialog>
  );
}
