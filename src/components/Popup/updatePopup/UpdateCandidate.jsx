import { Dialog, DialogContent, DialogTitle, Grid, Paper, Box, IconButton } from "@mui/material";
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
import CloseIcon from "@mui/icons-material/Close";
const schema = yup.object().shape({});

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export default function UpdateCandidate(props) {
  const dispatch = useDispatch();
  const { token } = useContext(Authen);
  const { OpenEditCandidate, SetOpenEditCandidate, id, idCampaign } = props;
  const [input, setInput] = useState([]);
  const [display, setDisplay] = useState();

  const [loading, setLoading] = useState(true);
  const formData = new FormData();
  const handleClose = () => {
    SetOpenEditCandidate(false);
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
    const getAPIdata = async () => {
      try {
        setLoading(true);

        await Promise.all([
          dispatch(getCandidatebyId(id, token)),
          dispatch(getGroupId(idCampaign, token)),
        ]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getAPIdata();
  }, [dispatch, id, token]);

  const object = useSelector((state) => {
    return state.candidateonedetail;
  });

  const listGroup = useSelector((state) => {
    return state.listGroup;
  });

  useEffect(() => {
    setInput(object.avatarUrl || []);
  }, [object.avatarUrl]);

  const getGroupOption = () => {
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

  React.useEffect(() => {
    API("GET", URL_API + `/api/v1/candidates/${id}`, null, token)
      .then((res) => {
        formik.setFieldValue("FullName", res.data.data.fullName);
        formik.setFieldValue("Description", res.data.data.description);

        setDisplay(res.data.data.groupId);
      })
      .catch((error) => {});
  }, [id]);

  const formik = useFormik({
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      FullName: object.FullName,
      Description: object.description,
      GroupId: object.groupId,
      ImageFile: null,
    },

    onSubmit: async (values) => {
      formData.append("FullName", formik.values.FullName);
      formData.append("Description", formik.values.Description);
      formData.append("GroupId", display);
      formData.append("ImageFile", formik.values.ImageFile);
      try {
        const req = await API(
          "PUT",
          URL_API + `/api/v1/candidates/${object.candidateId}`,
          formData,
          token
        );
        if (req) {
          CustomizedToast({
            message: "Chỉnh sửa thông tin thành công",
            type: "SUCCESS",
          });
        }
        await dispatch(handleGetCandidateByIdCampaign(token, idCampaign));
        handleClose();
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
        <Dialog maxWidth="md" open={OpenEditCandidate} onClose={handleClose}>
          <DialogTitle>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton style={{ color: "#D44FAC" }} onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
            <PageHeader
              title="Chỉnh sửa thông tin ứng cử viên"
              subTitle="Cập nhật thông tin ứng cử viên"
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
                        name="FullName"
                        label="Họ và Tên"
                        values={formik.values.FullName}
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Input
                        required
                        variant="outlined"
                        name="Description"
                        label="Mô tả"
                        values={formik.values.Description}
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
                          name="visibility"
                          required
                          value={display}
                          label="Trạng thái"
                          width="14rem"
                          height="10rem"
                          onChange={(e) => {
                            setDisplay(e.target.value);
                          }}
                          options={getGroupOption()}
                        />
                      </Box>
                    </Grid>

                    <Box width="200px" marginTop={"10%"} ml={"12rem"} mb={"2rem"}>
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
                        height: 165,
                        width: 165,
                        maxHeight: { xs: 233, md: 167 },
                        maxWidth: { xs: 350, md: 250 },
                        marginTop: "10%",
                        marginLeft: "11%",
                        border: "2px solid #000", // Thêm đường viền
                        borderRadius: "50%", // Chuyển thành hình tròn
                        overflow: "hidden", // Ẩn phần nằm ngoài hình tròn
                      }}
                    >
                      {input !== null ? (
                        <img
                          src={input}
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
            </form>
          </DialogContent>
        </Dialog>
      </Paper>
    );
  }
}
