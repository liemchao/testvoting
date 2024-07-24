import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import jwt_decode from "jwt-decode";
import { Authen } from "context/authenToken/AuthenToken";
import { DeleteCampaignId } from "context/redux/action/action";
import API from "config/axios/API/API";
import { URL_API } from "config/axios/Url/URL";
import { CustomizedToast } from "components/toast/ToastCustom";
import { GetCampaignbyUserId } from "context/redux/action/action";
import { useDispatch } from "react-redux";

export default function (props) {
  const { OpenDialog, SetOpenDialog, id } = props;
  const dispatch = useDispatch();

  const { token } = React.useContext(Authen);
  const decode = jwt_decode(token);
  const handleClose = () => {
    SetOpenDialog(false);
  };

  const handDelete = async () => {
    const data = {
      userName: decode.Username,
    };
    await API("DELETE", URL_API + `/api/v1/campaigns/${id}`, data, token)
      .then((res) => {
        if (res) {
          CustomizedToast({
            message: "Xóa chiến dịch thành công ",
            type: "SUCCESS",
          });
          dispatch(GetCampaignbyUserId(decode.Username, token));
          SetOpenDialog(false);
        }
      })
      .catch((error) => {
        if (error.response.data.statusCode === 404) {
          CustomizedToast({
            message: `${error.response.data.message}`,
            type: "ERROR",
          });
        } else if (error.response.data.statusCode === 400) {
          CustomizedToast({
            message: `${error.response.data.message}`,
            type: "ERROR",
          });
        } else {
          CustomizedToast({
            message: "Lỗi mạng",
            type: "ERROR",
          });
        }
      });
  };

  return (
    <div>
      <Dialog
        maxWidth="md"
        open={OpenDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xác nhận xóa đi chiến dịch này"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn xóa phần tử này
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>
          <Button onClick={() => handDelete()} autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
