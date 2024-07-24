import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Box,
} from "@mui/material";
import Input from "components/Control/Input";
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
import { useFormik } from "formik";
import * as yup from "yup";
import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";
import { getCampaignRatio } from "context/redux/action/action";

const schema = yup.object().shape({});

export function UpdateRatio(props) {
  const { OpenPopUp, SetOpenPopUp, id } = props;
  const dispacth = useDispatch();
  const { token } = useContext(Authen);

  useEffect(() => {
    const callAPI = async () => {
      await dispacth(getGroupId(id, token));
    };
    callAPI();
  }, [dispacth, token]);

  const listGroup = useSelector((state) => {
    return state.listGroup;
  });

  const getGroupVoterOption = () => {
    const GroupOption = [];
    for (var i = 0; i < listGroup.length; i++) {
      if (listGroup[i].isVoter === true) {
        GroupOption.push({
          id: listGroup[i].groupId,
          title: listGroup[i].name,
        });
      }
    }
    return GroupOption;
  };
  const onClose = () => {
    SetOpenPopUp(false);
  };
  const getGroupCanidateOption = () => {
    const GroupOption = [];
    for (var i = 0; i < listGroup.length; i++) {
      if (listGroup[i].isVoter === false) {
        GroupOption.push({
          id: listGroup[i].groupId,
          title: listGroup[i].name,
        });
      }
    }
    return GroupOption;
  };

  const formik = useFormik({
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      proportion: 0,
      groupVoterId: "",
      campaignId: "",
      groupCandidateId: "",
    },
    onSubmit: async (values) => {
      const data = {
        proportion: formik.values.percent,
        groupCandidateId: formik.values.groupId,
        campaignId: id,
        groupVoterId: formik.values.groupCandidateId,
      };
      try {
        const req = await API("POST", URL_API + `/api/v1/ratios`, data, token);
        if (req) {
          CustomizedToast({
            message: "Cập nhật tỉ lệ thành công",
            type: "SUCCESS",
          });
        }
        dispacth(getCampaignRatio(id, token));
        onClose();
      } catch (error) {
        // CustomizedToast({
        //   message: "Thêm tỉ lệ thất bại",
        //   type: "ERROR",
        // });
      }
    },
  });

  return (
    <Dialog open={OpenPopUp} onClose={onClose}>
      <DialogTitle>
        <PageHeader
          title="Cập nhật trọng số cho chiến dịch"
          subTitle="Nhóm ứng cử viên và người bình chọn"
          icon={getIcon("akar-icons:edit")}
        />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={3} ml={2} display={"flex"} mb={2} alignItems={"center"}>
            <form onSubmit={formik.handleSubmit}>
              <Box
                sx={{
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  m: 1,
                  display: "flex",
                  justifyContent: "center",
                  boxShadow: 12,
                  paddingLeft: "7%",
                  maxWidth: "xl",
                }}
              >
                <Box
                  sx={{ float: "left", width: "60%", flexGrow: 1, mt: "2rem" }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid container spacing={1.5}>
                    <Grid item xs={12}>
                      <Input
                        required
                        type="number"
                        variant="outlined"
                        name="percent"
                        label="Trọng số"
                        step="0.1"
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                      {/* nếu sai thì nó đỏ */}
                      {/* {formik.touched.title && formik.errors.title && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-username-login"
                        style={{ fontSize: "16px" }}
                      >
                        {formik.errors.title}
                      </FormHelperText>
                    )} */}
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          flexDirection: "row",
                        }}
                      >
                        <Select
                          name="groupId"
                          required
                          label="Nhóm ứng cử viên"
                          width="14rem"
                          height="10rem"
                          onChange={(e) => {
                            const a = listGroup.find((c) => c.groupId === e.target.value);
                            formik.setFieldValue("groupId", a.groupId);
                          }}
                          options={getGroupCanidateOption()}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Box
                        sx={{
                          flexDirection: "row",
                        }}
                      >
                        <Select
                          name="groupCandidateId"
                          required
                          label="Nhóm người bình chọn"
                          width="14rem"
                          height="10rem"
                          onChange={(e) => {
                            const a = listGroup.find((c) => c.groupId === e.target.value);
                            formik.setFieldValue("groupCandidateId", a.groupId);
                          }}
                          options={getGroupVoterOption()}
                        />
                      </Box>
                    </Grid>

                    <Box
                      width="200px"
                      marginTop={"10%"}
                      ml={"10rem"}
                      mr={"5rem"}
                      mb={"2rem"}
                      justifyItems={"center"}
                    >
                      <ButtonLangding
                        variant="contained"
                        type="submit"
                        nameButton="Thêm"
                        bgColor="#71C043"
                        hovercolor="#2BB557"
                      />
                    </Box>
                  </Grid>
                </Box>
              </Box>
            </form>
          </Grid>
        </Grid>
      </DialogContent>
      {/* <DialogActions>
          <Button  color="primary">
            Hủy bỏ
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Xác nhận
          </Button>
        </DialogActions> */}
    </Dialog>
  );
}
