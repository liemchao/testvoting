import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Box,
  FormHelperText,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";
import Select from "components/Control/Select";
import Input from "components/Control/Input";
import PageHeader from "components/Layout/PageHeader";
import Iconify from "assets/theme/components/icon/Iconify";
import DateTime from "components/Control/DateTime";
import { Authen } from "context/authenToken/AuthenToken";
import { useContext } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "context/redux/action/action";
import { CustomizedToast } from "components/toast/ToastCustom";
import { URL_API } from "config/axios/Url/URL";
import API from "config/axios/API/API";
import moment from "moment";
import { GetCampaignbyUserId } from "context/redux/action/action";
import dayjs from "dayjs";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";

const schema = yup.object().shape({
  title: yup.string().required("Tên chiến dịch không được để trống"),
});

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export default function NewPopUp(props) {
  const dispatch = useDispatch();
  const { token } = useContext(Authen);
  const { OpenPopUp, SetOpenPopUp } = props;
  const [input, setInput] = useState([]);
  const [display, setDisplay] = useState();
  const [display1, setDisplay1] = useState();
  const [dateCreate, setDateCreate] = useState();
  const [dateEnd, setDateEnd] = useState();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const formData = new FormData();
  const handleClose = () => {
    SetOpenPopUp(false);
  };

  const BasicModal = ({ open, setOpen, onConfirm, title, message }) => {
    const handleCloseModel = () => {
      setOpen(false);
    };

    const handleConfirm = () => {
      onConfirm();
    };

    return (
      <>
        <Dialog open={open} onClose={handleCloseModel}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <Typography>{message}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModel}>Hủy bỏ</Button>
            <Button onClick={handleConfirm}>Đồng ý</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };
  const decode = jwt_decode(token);

  function _treat(e) {
    const { files } = e.target;
    let images = [];
    const selecteds = [...[...files]];
    formik.setFieldValue("ImageFile", e.target.files[0]);
    return (
      selecteds.forEach((i) => images.push(URL.createObjectURL(i))),
      formData.append("File", selecteds),
      setInput(images)
    );
  }

  useEffect(() => {
    const getAPIcatagory = async () => {
      await dispatch(getAllCategory(token));
    };
    getAPIcatagory();
  }, []);

  const getOptions = () => [
    { id: "public", title: "Công khai", nametitle: "Trạng thái chiến dịch được công khai" },
    { id: "private", title: "Không công khai", nametitle: "Trạng thái chiến dịch không công khai" },
  ];
  const getOptions1 = () => [
    { id: "true", title: "Công khai", nametitle: "Số ứng cử viên được công khai" },
    { id: "false", title: "Không công khai", nametitle: "Số ứng cử viên không công khai" },
  ];

  const category = useSelector((state) => {
    return state.category;
  });

  const getCategoryOption = () => {
    const CategoryOption = [];
    for (var i = 0; i < category.length; i++) {
      CategoryOption.push({
        id: category[i].categoryId,
        title: category[i].name,
      });
    }
    return CategoryOption;
  };

  const formik = useFormik({
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      title: "",
      visibility: "",
      startTime: "",
      userId: "",
      categoryId: "",
      endTime: "",
      ImageFile: "",
      VisibilityCandidate: "",
    },

    onSubmit: async (values) => {
      setShowConfirmation(true);
      formData.append("title", formik.values.title);
      formData.append("startTime", moment(dateCreate).format("YYYY-MM-DD HH:mm:ss.SSS"));
      formData.append("endTime", moment(dateEnd).format("YYYY-MM-DD HH:mm:ss.SSS"));
      formData.append("visibility", display);
      formData.append("categoryId", formik.values.categoryId);
      formData.append("VisibilityCandidate", display1);
      formData.append("userId", decode.Username);
      formData.append("ImageFile", formik.values.ImageFile);

      try {
        const req = await API("POST", URL_API + `/api/v1/campaigns`, formData, token);
        setShowConfirmation(false);
        if (req) {
          dispatch(GetCampaignbyUserId(decode.Username, token));

          CustomizedToast({
            message: "Thêm chiến dịch thành công",
            type: "SUCCESS",
          });
          setShowConfirmation(false);
          SetOpenPopUp(false);
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
    },
  });

  const handleConfirmation = () => {
    handleClose();
    setShowConfirmation(false);
  };
  return (
    <Paper>
      <Dialog maxWidth="md" open={OpenPopUp} onClose={handleClose}>
        <DialogTitle>
          <PageHeader
            title="Tạo mới chiến dịch"
            subTitle="Tạo chiến dịch cho riêng bạn"
            icon={getIcon("gala:add")}
          />
        </DialogTitle>
        <DialogContent>
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
                      variant="outlined"
                      name="title"
                      label="Tên chiến dịch"
                      value={formik.values.title}
                      onChange={(event) => {
                        formik.handleChange(event);
                      }}
                    />

                    {formik.touched.title && formik.errors.title && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-username-login"
                        style={{ fontSize: "16px" }}
                      >
                        {formik.errors.title}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={10.3}>
                    <DateTime
                      required
                      variant="outlined"
                      name="startTime"
                      disablePast
                      label="Thời gian bắt đầu"
                      onChange={(event) => {
                        setDateCreate(event.$d);
                      }}
                    />
                  </Grid>
                  <Grid item xs={10.3}>
                    <DateTime
                      required
                      variant="outlined"
                      disablePast
                      name="endTime"
                      label="Thời gian kết thúc"
                      onChange={(event) => {
                        setDateEnd(event.$d);
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
                        name="categoryId"
                        required
                        label="Loại chiến dịch"
                        width="14rem"
                        height="10rem"
                        onChange={(e) => {
                          const a = category.find((c) => c.categoryId === e.target.value);
                          formik.setFieldValue("categoryId", a.categoryId);
                        }}
                        options={getCategoryOption()}
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
                        name="visibility"
                        required
                        label="Trạng thái chiến dịch"
                        width="14rem"
                        height="10rem"
                        onChange={(e) => {
                          setDisplay(e.target.value);
                        }}
                        options={getOptions()}
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
                        name="VisibilityCandidate"
                        required
                        label="Trạng thái số ứng cử viên"
                        width="14rem"
                        height="10rem"
                        onChange={(e) => {
                          setDisplay1(e.target.value);
                        }}
                        options={getOptions1()}
                      />
                    </Box>
                  </Grid>
                  <Box width="200px" marginTop={"5%"} ml={"12rem"} mb={"2rem"}>
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

              <Box sx={{ float: "left", width: "30%", mt: "2rem" }}>
                <label htmlFor="contained-button-file">
                  <input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={_treat}
                    style={{ display: "none" }}
                  />
                  <ButtonLangding
                    width="12.4rem"
                    variant="contained"
                    component="span"
                    nameButton=" Tải lên 1 ảnh"
                  ></ButtonLangding>

                  <Box
                    sx={{
                      border: "1px solid black",
                      height: 200,
                      width: 200,
                      maxHeight: { xs: 400, md: 200 },
                      maxWidth: { xs: 400, md: 300 },
                      marginTop: "10%",
                      marginLeft: "1%",
                    }}
                  >
                    {input.map((i) => (
                      <img key={i} src={i} alt="hihi" />
                    ))}
                  </Box>
                </label>
              </Box>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
      {/* <BasicModal
        open={showConfirmation}
        setOpen={setShowConfirmation}
        onConfirm={handleConfirmation}
        title="Điều khoản sử dụng"
        message="Bạn có chắc chắn những thông tin của bạn điền phù hợp với tiểu chuẩn của chúng tôi"
      /> */}
    </Paper>
  );
}
