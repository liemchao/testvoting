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

export function AddGroup(props) {
  const { OpenPopUp, SetOpenPopUp, id } = props;
  const dispatch = useDispatch();
  const { token } = useContext(Authen);
  const decode = jwt_decode(token);
  const [display, setDisplay] = useState(true);

  const getOptions = () => [
    { id: true, title: "Nhóm bình chọn", nametitle: "Trạng thái người bình chọn" },
    { id: false, title: "Nhóm ứng cử viên", nametitle: "Trạng thái người bình chọn" },
  ];

  const onClose = () => {
    SetOpenPopUp(false);
  };

  const formik = useFormik({
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      name: "",
      description: "",
      isVoter: true,
      campaignId: id,
    },
    onSubmit: async (values) => {
      const data = {
        name: formik.values.name,
        description: formik.values.description,
        isVoter: display,
        campaignId: id,
      };
      try {
        const req = await API("POST", URL_API + `/api/v1/groups`, data, token);

        if (req) {
          CustomizedToast({
            message: "Thêm nhóm thành công",
            type: "SUCCESS",
          });
        }
        dispatch(getGroupId(id, token));
        dispatch(getCampaignRatio(id, token));
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
    },
  });

  return (
    <Dialog open={OpenPopUp} onClose={onClose}>
      <DialogTitle>
        <PageHeader
          title="Thêm nhóm cho chiến dịch"
          subTitle="Nhóm ứng cử viên và người bình chọn"
          icon={getIcon("akar-icons:edit")}
        />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item>
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
                  maxWidth: "lg",
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
                        variant="outlined"
                        name="name"
                        label="Tên nhóm"
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
                      <Input
                        required
                        placeholder="Điền CN- hoặc NC- với tên nhóm: CN-Tên Nhóm"
                        variant="outlined"
                        name="description"
                        label="Mô tả"
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          flexDirection: "row",
                        }}
                      >
                        <Select
                          name="isVoter"
                          required
                          defaultValue="0"
                          label="Loại nhóm"
                          width="14rem"
                          height="10rem"
                          onChange={(e) => {
                            setDisplay(e.target.value);
                          }}
                          options={getOptions()}
                        />
                      </Box>
                    </Grid>

                    <Box
                      width="200px"
                      marginTop={"2%"}
                      ml={"10rem"}
                      mr={"5rem"}
                      mb={"2rem"}
                      justifyItems={"center"}
                    >
                      <ButtonLangding
                        variant="contained"
                        type="submit"
                        nameButton="Thêm"
                        bgColor="#FFA500"
                        hovercolor="#F7941D"
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
