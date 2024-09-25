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
export default function PolicyOwer(props) {
  const { OpenAlret, SetOpenAlret, id } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const decode = jwt_decode(token);

  const handleUnderstand = async () => {
    try {
      const req = await API("PUT", URL_API + `/api/v1/campaigns/approve/${id}`, token);
      await dispatch(GetCampaignbyUserId(decode.Username, token));
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
            Thể lệ bình chọn của chiến dịch
          </Typography>
          <Typography fontWeight="lg" level="body2" id="modal-desc" textColor="text.tertiary">
            <strong>1. Mục đích:</strong>
            <br />
            Ghi rõ thể lệ cho những người tham gia chiến dịch đều được hiểu rõ.
            <br />
            Mục đích của chính sách này là thiết lập các hướng dẫn và thủ tục cho hệ thống bỏ phiếu
            để đảm bảo các cuộc bầu cử công bằng và minh bạch.
            <br />
            <strong>2. Sự đăng ký:</strong>
            <br />
            Thiết lập quy trình đăng ký cho chiến dịch để đảm bảo họ đủ điều kiện để cho 1 chiến
            dịch đã tạo được bắt đầu.
            <br />
            Ghi rõ thời hạn đăng ký và các thông tin cần thiết để đăng ký. <br />
            <strong>3. Kết quả và Báo cáo:</strong>
            <br />
            Xác định quy trình công bố và báo cáo kết quả bầu cử. Chỉ định thời gian công bố kết quả
            và các kênh thông qua đó kết quả sẽ được công khai. <br />
            <strong>4. Bảo mật dữ liệu:</strong>
            <br />
            Thiết lập các giao thức để bảo vệ quyền riêng tư và tính bảo mật của thông tin cử tri.
            <br />
            Đảm bảo tuân thủ luật bảo vệ dữ liệu và chỉ định cách dữ liệu cử tri sẽ được lưu trữ, sử
            dụng và bảo mật. <br />
            <strong>5. Tuân thủ quy định pháp luật:</strong>
            <br />
            Đảm bảo rằng chiến dịch bình chọn tuân thủ đầy đủ quy định pháp luật hiện hành và các
            quy định liên quan khác. <br />
            <strong>6. Cập nhật:</strong>
            <br />
            Sau khi chiến dịch tuân thủ chính sách trên thì không được chỉnh sửa lại chiến dịch của
            bạn. <br />
            <strong>7. Vi phạm:</strong>
            <br />
            Mọi hình thức vi phạm pháp luật sẽ xóa chiến dịch của bạn.
            <br />
            Chiến dịch nhận phản hồi không hợp lý sẽ được xem xét và cảnh cáo hoặc xóa luôn chiến
            dịch nếu cần thiết.
          </Typography>
          <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
            <ButtonCustomize
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
