import { Dialog, DialogContent, DialogTitle, Grid, Paper, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Select from "components/Control/Select";
import Input from "components/Control/Input";
import PageHeader from "components/Layout/PageHeader";
import Iconify from "assets/theme/components/icon/Iconify";
import { Authen } from "context/authenToken/AuthenToken";
import { useContext } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { CustomizedToast } from "components/toast/ToastCustom";
import { URL_API } from "config/axios/Url/URL";
import API from "config/axios/API/API";
import { getGroupId } from "context/redux/action/action";
import { getCandidatebyId } from "context/redux/action/action";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";
import { handleGetCandidateByIdCampaign } from "context/redux/action/action";
import TextArea from "components/Control/TextArea";
import { getSettingDesign } from "context/redux/action/action";
const schema = yup.object().shape({});
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export default function UpdateDesign(props) {
  const dispatch = useDispatch();
  const { token } = useContext(Authen);
  const { OpenDesign, SetOpenDesign, id } = props;
  const [imageBackgroud, setImageBackgroud] = useState([]);
  const [logo, setLogo] = useState([]);
  const [input1, setInput1] = useState([]);
  const [input2, setInput2] = useState([]);
  const [input3, setInput3] = useState([]);
  const [input4, setInput4] = useState([]);

  const [loading, setLoading] = useState(true);
  const formData = new FormData();
  const handleClose = () => {
    SetOpenDesign(false);
  };
  const decode = jwt_decode(token);

  function _treat_BackGroud(e) {
    const { files } = e.target;
    const selecteds = [...[...files]];
    const image = URL.createObjectURL(selecteds[0]);
    formik.setFieldValue("backgroundImage", selecteds[0]);
    setImageBackgroud([image]);
  }

  function _treat_Logo(e) {
    const { files } = e.target;
    const selecteds = [...[...files]];
    const image = URL.createObjectURL(selecteds[0]);
    formik.setFieldValue("icon", selecteds[0]);
    setLogo([image]);
  }

  function _treat1(e) {
    const { files } = e.target;
    const selecteds = [...[...files]];
    const image = URL.createObjectURL(selecteds[0]);
    formik.setFieldValue("logo1", selecteds[0]);
    setInput1([image]);
  }

  function _treat2(e) {
    const { files } = e.target;
    const selecteds = [...[...files]];
    const image = URL.createObjectURL(selecteds[0]);
    formik.setFieldValue("logo2", selecteds[0]);
    setInput2([image]);
  }

  function _treat3(e) {
    const { files } = e.target;
    const selecteds = [...[...files]];
    const image = URL.createObjectURL(selecteds[0]);
    formik.setFieldValue("logo3", selecteds[0]);
    setInput3([image]);
  }

  function _treat4(e) {
    const { files } = e.target;
    const selecteds = [...[...files]];
    const image = URL.createObjectURL(selecteds[0]);
    formik.setFieldValue("logo4", selecteds[0]);
    setInput4([image]);
  }

  useEffect(() => {
    const getAPIdata = async () => {
      try {
        setLoading(true);

        await Promise.all([dispatch(getSettingDesign(token))]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getAPIdata();
  }, [dispatch, id, token]);

  const object = useSelector((state) => {
    return state.designsetting;
  });
  useEffect(() => {
    setImageBackgroud(object.backgroundImage || []);
    setLogo(object.icon || []);
    setInput1(object.logo1 || []);
    setInput2(object.logo2 || []);
    setInput3(object.logo3 || []);
    setInput4(object.logo4 || []);
  }, [object.backgroundImage]);

  const listGroup = useSelector((state) => {
    return state.listGroup;
  });

  React.useEffect(() => {
    API("GET", URL_API + `/api/v1/designs`, null, token)
      .then((res) => {
        formik.setFieldValue("textColor", res.data.textColor);
        formik.setFieldValue("icon", res.data.icon);
        formik.setFieldValue("backgroundImage", res.data.backgroundImage);
        formik.setFieldValue("description1", res.data.description1);
        formik.setFieldValue("description2", res.data.description2);
        formik.setFieldValue("description3", res.data.description3);
        formik.setFieldValue("description4", res.data.description4);
        formik.setFieldValue("logo1", res.data.logo1);
        formik.setFieldValue("logo2", res.data.logo2);
        formik.setFieldValue("logo3", res.data.logo3);
        formik.setFieldValue("logo4", res.data.logo4);
        formik.setFieldValue("time1", res.data.time1);
        formik.setFieldValue("time2", res.data.time2);
        formik.setFieldValue("time3", res.data.time3);
        formik.setFieldValue("time4", res.data.time4);
      })
      .catch((error) => {});
  }, []);

  const formik = useFormik({
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      textColor: object.textColor,
      icon: object.icon,
      backgroundImage: object.backgroundImage,
      description1: object.description1,
      description2: object.description2,
      description3: object.description3,
      description4: object.description4,
      logo1: object.logo1,
      logo2: object.logo2,
      logo3: object.logo3,
      logo4: object.logo4,
      time1: object.time1,
      time2: object.time2,
      time3: object.time3,
      time4: object.time4,
    },

    onSubmit: async (values) => {
      formData.append("textColor", formik.values.textColor);
      formData.append("icon", formik.values.icon);
      formData.append("backgroundImage", formik.values.backgroundImage);
      formData.append("description1", formik.values.description1);
      formData.append("description2", formik.values.description2);
      formData.append("description3", formik.values.description3);
      formData.append("description4", formik.values.description4);
      formData.append("logo1", formik.values.logo1);
      formData.append("logo2", formik.values.logo2);
      formData.append("logo3", formik.values.logo3);
      formData.append("logo4", formik.values.logo4);
      formData.append("time1", formik.values.time1);
      formData.append("time2", formik.values.time2);
      formData.append("time3", formik.values.time3);
      formData.append("time4", formik.values.time4);

      try {
        const req = await API("PUT", URL_API + `/api/v1/designs`, formData, token);
        if (req) {
          CustomizedToast({
            message: "Chỉnh sửa thông tin thành công",
            type: "SUCCESS",
          });
          handleClose();
          await dispatch(handleGetCandidateByIdCampaign(token, id));
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

  if (!object || loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Paper>
        <Dialog maxWidth="md" open={OpenDesign} onClose={handleClose}>
          <DialogTitle>
            <PageHeader
              title="Chỉnh sửa thông tin trang chủ"
              subTitle="Cập nhật thông tin và thiết kế trang chủ"
              icon={getIcon("akar-icons:edit")}
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
                        name="textColor"
                        label="Màu chữ"
                        defaultValue={object.textColor}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Input
                        required
                        variant="outlined"
                        name="time1"
                        label="Thời gian mở cổng bình chọn"
                        defaultValue={object.time1}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Input
                        required
                        variant="outlined"
                        name="time2"
                        label="Thời gian đóng cổng bình chọn"
                        defaultValue={object.time2}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Input
                        required
                        variant="outlined"
                        name="time3"
                        label="Thời gian công bố top 10"
                        defaultValue={object.time3}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Input
                        required
                        variant="outlined"
                        name="time4"
                        label="Thời gian vinh danh top 10"
                        defaultValue={object.time4}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextArea
                        required
                        name="description1"
                        columns={12}
                        width="85%"
                        row={6}
                        maxRows={6}
                        multiline
                        label="Mô tả 1"
                        variant="outlined"
                        defaultValue={object.description1}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextArea
                        columns={12}
                        name="description2"
                        width="85%"
                        row={6}
                        maxRows={6}
                        multiline
                        variant="outlined"
                        label="Mô tả 2"
                        defaultValue={object.description2}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextArea
                        columns={12}
                        name="description3"
                        width="85%"
                        row={6}
                        maxRows={6}
                        multiline
                        variant="outlined"
                        required
                        label="Mô tả 3"
                        defaultValue={object.description3}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextArea
                        columns={12}
                        name="description4"
                        width="85%"
                        row={6}
                        maxRows={6}
                        multiline
                        variant="outlined"
                        label="Mô tả 4"
                        defaultValue={object.description4}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                    </Grid>

                    <Box width="200px" marginTop={"10%"} ml={"5rem"} mb={"2rem"}>
                      <ButtonLangding
                        variant="contained"
                        type="submit"
                        nameButton="Cập nhật"
                        bgColor="#FFA500"
                        hovercolor="#F7941D"
                      />
                    </Box>
                  </Grid>
                </Box>
                <Box sx={{ display: "grid" }}>
                  <Box sx={{ float: "left", width: "50%", mt: "2rem" }}>
                    <label>
                      <input
                        name="Backgroud"
                        accept="image/*"
                        type="file"
                        onChange={_treat_BackGroud}
                        style={{ display: "none" }}
                      />
                      <ButtonLangding
                        width="8rem"
                        variant="contained"
                        component="span"
                        nameButton="Ảnh nền"
                      ></ButtonLangding>

                      <Box
                        sx={{
                          height: 100,
                          width: 100,
                          maxHeight: { xs: 233, md: 167 },
                          maxWidth: { xs: 350, md: 250 },
                          marginTop: "10%",
                          marginLeft: "11%",
                          border: "2px solid #000", // Thêm đường viền
                          borderRadius: "50%", // Chuyển thành hình tròn
                          overflow: "hidden", // Ẩn phần nằm ngoài hình tròn
                        }}
                      >
                        {imageBackgroud !== null ? (
                          <img
                            src={imageBackgroud}
                            // alt="image"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} // Thay đổi kích thước và căn chỉnh hình ảnh
                          />
                        ) : (
                          <img
                            src="https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
                            // alt="image"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} // Thay đổi kích thước và căn chỉnh hình ảnh
                          />
                        )}
                      </Box>
                    </label>
                  </Box>
                  <Box sx={{ float: "left", width: "50%", mt: "2rem" }}>
                    <label>
                      <input
                        accept="image/*"
                        type="file"
                        onChange={_treat2}
                        style={{ display: "none" }}
                      />
                      <ButtonLangding
                        width="9rem"
                        variant="contained"
                        component="span"
                        nameButton="Ảnh logo 2"
                      ></ButtonLangding>

                      <Box
                        sx={{
                          height: 100,
                          width: 100,
                          maxHeight: { xs: 233, md: 167 },
                          maxWidth: { xs: 350, md: 250 },
                          marginTop: "10%",
                          marginLeft: "11%",
                          border: "2px solid #000", // Thêm đường viền
                          borderRadius: "50%", // Chuyển thành hình tròn
                          overflow: "hidden", // Ẩn phần nằm ngoài hình tròn
                        }}
                      >
                        {input2 !== null ? (
                          <img
                            src={input2}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} // Thay đổi kích thước và căn chỉnh hình ảnh
                          />
                        ) : (
                          <img
                            src="https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} // Thay đổi kích thước và căn chỉnh hình ảnh
                          />
                        )}
                      </Box>
                    </label>
                  </Box>
                </Box>
                <Box sx={{ display: "grid", marginLeft: "1%" }}>
                  <Box sx={{ float: "left", width: "50%", mt: "2rem" }}>
                    <label>
                      <input
                        accept="image/*"
                        type="file"
                        onChange={_treat_Logo}
                        style={{ display: "none" }}
                      />
                      <ButtonLangding
                        width="9rem"
                        variant="contained"
                        component="span"
                        nameButton="Ảnh icon"
                      ></ButtonLangding>

                      <Box
                        sx={{
                          height: 100,
                          width: 100,
                          maxHeight: { xs: 233, md: 167 },
                          maxWidth: { xs: 350, md: 250 },
                          marginTop: "10%",
                          marginLeft: "11%",
                          border: "2px solid #000", // Thêm đường viền
                          borderRadius: "50%", // Chuyển thành hình tròn
                          overflow: "hidden", // Ẩn phần nằm ngoài hình tròn
                        }}
                      >
                        {logo !== null ? (
                          <img
                            src={logo}
                            // alt="image"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} // Thay đổi kích thước và căn chỉnh hình ảnh
                          />
                        ) : (
                          <img
                            src="https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
                            // alt="image"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} // Thay đổi kích thước và căn chỉnh hình ảnh
                          />
                        )}
                      </Box>
                    </label>
                  </Box>
                  <Box sx={{ float: "left", width: "50%", mt: "2rem" }}>
                    <label>
                      <input
                        accept="image/*"
                        type="file"
                        onChange={_treat3}
                        style={{ display: "none" }}
                      />
                      <ButtonLangding
                        width="9rem"
                        variant="contained"
                        component="span"
                        nameButton="Ảnh logo 3"
                      ></ButtonLangding>

                      <Box
                        sx={{
                          height: 100,
                          width: 100,
                          maxHeight: { xs: 233, md: 167 },
                          maxWidth: { xs: 350, md: 250 },
                          marginTop: "10%",
                          marginLeft: "11%",
                          border: "2px solid #000", // Thêm đường viền
                          borderRadius: "50%", // Chuyển thành hình tròn
                          overflow: "hidden", // Ẩn phần nằm ngoài hình tròn
                        }}
                      >
                        {input3 !== null ? (
                          <img
                            src={input3}
                            // alt="image"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} // Thay đổi kích thước và căn chỉnh hình ảnh
                          />
                        ) : (
                          <img
                            src="https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
                            // alt="image"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} // Thay đổi kích thước và căn chỉnh hình ảnh
                          />
                        )}
                      </Box>
                    </label>
                  </Box>
                </Box>
                <Box sx={{ display: "grid", marginLeft: "1%" }}>
                  <Box sx={{ float: "left", width: "50%", mt: "2rem" }}>
                    <label>
                      <input
                        accept="image/*"
                        type="file"
                        onChange={_treat1}
                        style={{ display: "none" }}
                      />
                      <ButtonLangding
                        width="9rem"
                        variant="contained"
                        component="span"
                        nameButton="Ảnh logo 1"
                      ></ButtonLangding>

                      <Box
                        sx={{
                          height: 100,
                          width: 100,
                          maxHeight: { xs: 233, md: 167 },
                          maxWidth: { xs: 350, md: 250 },
                          marginTop: "10%",
                          marginLeft: "11%",
                          border: "2px solid #000", // Thêm đường viền
                          borderRadius: "50%", // Chuyển thành hình tròn
                          overflow: "hidden", // Ẩn phần nằm ngoài hình tròn
                        }}
                      >
                        {input1 !== null ? (
                          <img
                            src={input1}
                            // alt="image"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} // Thay đổi kích thước và căn chỉnh hình ảnh
                          />
                        ) : (
                          <img
                            src="https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
                            // alt="image"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} // Thay đổi kích thước và căn chỉnh hình ảnh
                          />
                        )}
                      </Box>
                    </label>
                  </Box>
                  <Box sx={{ float: "left", width: "50%", mt: "2rem" }}>
                    <label>
                      <input
                        accept="image/*"
                        type="file"
                        onChange={_treat4}
                        style={{ display: "none" }}
                      />
                      <ButtonLangding
                        width="9rem"
                        variant="contained"
                        component="span"
                        nameButton="Ảnh logo 4"
                      ></ButtonLangding>

                      <Box
                        sx={{
                          height: 100,
                          width: 100,
                          maxHeight: { xs: 233, md: 167 },
                          maxWidth: { xs: 350, md: 250 },
                          marginTop: "10%",
                          marginLeft: "11%",
                          border: "2px solid #000", // Thêm đường viền
                          borderRadius: "50%", // Chuyển thành hình tròn
                          overflow: "hidden", // Ẩn phần nằm ngoài hình tròn
                        }}
                      >
                        {input4 !== null ? (
                          <img
                            src={input4}
                            // alt="image"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} // Thay đổi kích thước và căn chỉnh hình ảnh
                          />
                        ) : (
                          <img
                            src="https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
                            // alt="image"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} // Thay đổi kích thước và căn chỉnh hình ảnh
                          />
                        )}
                      </Box>
                    </label>
                  </Box>
                </Box>
              </Box>
            </form>
          </DialogContent>
        </Dialog>
      </Paper>
    );
  }
}
