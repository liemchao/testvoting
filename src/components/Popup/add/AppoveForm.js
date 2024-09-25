import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";
import { Box } from "@mui/joy";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import API from "config/axios/API/API";
import { URL_API } from "config/axios/Url/URL";
import { CustomizedToast } from "components/toast/ToastCustom";
import { GetCampaignbyUserId } from "context/redux/action/action";
import jwt_decode from "jwt-decode";
import { getformbyIdUser } from "context/redux/action/action";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";
export default function AppoveForm(props) {
  const { OpenAlret, SetOpenAlret, id } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const decode = jwt_decode(token);

  const handleUnderstand = async () => {
    try {
      const req = await API("PUT", URL_API + `/api/v1/forms/approve/${id}`, token);
      await dispatch(getformbyIdUser(decode.Username, token));
      SetOpenAlret(false);
    } catch (error) {
      CustomizedToast({
        message: `${error}`,
        type: "ERROR",
      });
    }
  };
  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={OpenAlret}
        onClose={() => SetOpenAlret(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 800,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: "calc(-1/4 * var(--IconButton-size))",
              right: "calc(-1/4 * var(--IconButton-size))",
              boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
              borderRadius: "50%",
              bgcolor: "background.surface",
            }}
          />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Qui định kích hoạt biểu mẫu
          </Typography>
          <Typography fontWeight="lg" level="body2" id="modal-desc" textColor="text.tertiary">
            <strong>1. Cập nhật:</strong>
            <br />
            Sau khi biểu mẫu tuân thủ chính sách trên thì không được chỉnh sửa lại biểu mẫu của bạn.{" "}
            <br />
            <strong>2. Vi phạm:</strong>
            <br />
            Mọi hình thức vi phạm pháp luật sẽ xóa biểu mẫu của bạn.
            <br />
            biểu mẫu nhận phản hồi không hợp lý sẽ được xem xét và cảnh cáo hoặc xóa luôn biểu mẫu
            nếu cần thiết.
          </Typography>
          <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
            <ButtonLangding
              width="10rem"
              nameButton="Tôi đã rõ"
              bgColor="#FFA500"
              hovercolor="#F7941D"
              onClick={() => {
                handleUnderstand();
              }}
            />
          </Box>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
