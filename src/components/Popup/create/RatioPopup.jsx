import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Box,
} from "@mui/material";
import Select from "components/Control/Select";
import PageHeader from "components/Layout/PageHeader";
import Iconify from "assets/theme/components/icon/Iconify";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Authen } from "context/authenToken/AuthenToken";
import { getGroupId } from "context/redux/action/action";
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
import jwt_decode from "jwt-decode";
import { useCallback } from "react";
import { CustomizedToast } from "components/toast/ToastCustom";
import { URL_API } from "config/axios/Url/URL";
import API from "config/axios/API/API";

export function RatioPopup(props) {
  const { isOpen, SetisOpen, idCampaign } = props;
  const dispatch = useDispatch();
  const { token } = useContext(Authen);
  const decode = jwt_decode(token);
  const [groupid, setGroupId] = useState();

  useEffect(() => {
    const callAPI = async () => {
      await dispatch(getGroupId(token));
    };
    callAPI();
  }, [dispatch, token]);

  const listGroup = useSelector((state) => {
    return state.listGroup;
  });

  const getGroupOption = () => {
    const GroupOption = [];
    for (var i = 0; i < listGroup.length; i++) {
      GroupOption.push({
        id: listGroup[i].groupId,
        title: listGroup[i].name,
      });
    }
    return GroupOption;
  };
  const handleChange = useCallback((e) => {
    const a = listGroup.find((c) => c.groupId === e.target.value);
    setGroupId(a.groupId);
  }, []);

  const onClose = () => {
    SetisOpen(false);
  };

  const handleConfirm = async () => {
    const data = {
      percent: "",
      groupId: "",
      campaignId: idCampaign,
      groupCandidateId: "",
    };

    try {
      const req = await API("PUT", URL_API + `/api/v1/ratios`, data, token);
      if (req) {
        CustomizedToast({
          message: "Thêm tỉ lệ thành công",
          type: "SUCCESS",
        });
      }
    } catch (error) {
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
    }
    onClose();
    // history.push('/new-page');
  };

  return (
    <Dialog maxWidth="md" open={isOpen} onClose={onClose}>
      <DialogTitle>
        <PageHeader
          title="Thêm tỉ lệ"
          subTitle="Thêm tỉ lệ nhóm cho chiến dịch của bạn"
          icon={getIcon("akar-icons:edit")}
        />
      </DialogTitle>
      <DialogContent>
        <Grid item xs={12} mt={2} ml={3}>
          <Box
            sx={{
              // display: "flex",
              flexDirection: "row",
            }}
          >
            <Select
              name="visibility"
              required
              label="Nhóm bình chọn"
              width="14rem"
              height="10rem"
              onChange={(e) => {
                handleChange(e);
              }}
              options={getGroupOption()}
            />
          </Box>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Hủy bỏ
        </Button>
        <Button onClick={handleConfirm} color="primary">
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}
