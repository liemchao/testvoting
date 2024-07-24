import { Dialog, DialogContent, DialogTitle, Grid, Paper, Button, Box } from "@mui/material";
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
import moment from "moment";
import { GetCampaignbyUserId } from "context/redux/action/action";
import dayjs from "dayjs";
import { getCampaignId } from "context/redux/action/action";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";
import API from "config/axios/API/API";
import TextArea from "components/Control/TextArea";
const schema = yup.object().shape({});

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export default function UpdateCampaign(props) {
  const dispatch = useDispatch();
  const { token } = useContext(Authen);
  const { OpenEditCampaign, SetOpenEditCampaign, id } = props;
  const [input, setInput] = useState([]);
  const [display, setDisplay] = useState();
  const [dateCreate, setDayCreate] = useState();
  const [dateEnd, setDateEnd] = useState();
  const [loading, setLoading] = useState(true);
  const formData = new FormData();
  const handleClose = () => {
    SetOpenEditCampaign(false);
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

        await Promise.all([dispatch(getAllCategory(token)), dispatch(getCampaignId(id, token))]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getAPIdata();
  }, [dispatch, id, token]);

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

  const object = useSelector((state) => {
    return state.getcampaignById;
  });

  useEffect(() => {
    setInput(object.imgUrl || []);
  }, [object.imgUrl]);

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
      title: object.title,
      visibility: object.visibility,
      startTime: object.startTime,
      userId: decode.Username,
      categoryId: object.categoryId,
      endTime: object.endTime,
      description: object.description,
      ImageFile: "",
    },

    onSubmit: async (values) => {
      formData.append("title", formik.values.title);
      formData.append("startTime", moment(dateCreate).format("YYYYY-MM-DD HH:mm:ss.SSS"));
      formData.append("endTime", moment(dateEnd).format("YYYY-MM-DD HH:mm:ss.SSS"));
      formData.append("visibility", display);
      formData.append("categoryId", formik.values.categoryId);
      formData.append("userId", decode.Username);
      formData.append("description", formik.values.description);
      formData.append("ImageFile", formik.values.ImageFile);
      try {
        const req = await API(
          "PUT",
          URL_API + `/api/v1/campaigns/${object.campaignId}`,
          formData,
          token
        );
        console.log(req);
        if (req) {
          CustomizedToast({
            message: "Chỉnh sửa chiến dịch thành công",
            type: "SUCCESS",
          });

          dispatch(GetCampaignbyUserId(decode.Username, token));
          dispatch(getCampaignId(id, token));
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
        <Dialog maxWidth="md" open={OpenEditCampaign} onClose={handleClose}>
          <DialogTitle>
            <PageHeader
              title="Chỉnh sửa chiến dịch"
              subTitle="Cập nhật thông tin cho chiến dịch"
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
                  sx={{ float: "left", width: "60%", flexGrow: 1, mt: "1rem" }}
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
                        defaultValue={object.title}
                        label="Tên chiến dịch"
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                    </Grid>
                    <Grid item xs={10.3}>
                      <DateTime
                        required
                        variant="outlined"
                        name="startTime"
                        disablePast
                        value={dayjs(object.startTime)}
                        label="Thời gian bắt đầu"
                        onChange={(event) => {
                          setDayCreate(event.$d);
                        }}
                      />
                    </Grid>
                    <Grid item xs={10.3}>
                      <DateTime
                        required
                        variant="outlined"
                        name="endTime"
                        value={dayjs(object.endTime)}
                        disablePast
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
                          defaultValue={object.categoryId}
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
                          defaultValue={object.visibility}
                          label="Trạng thái"
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
                      <TextArea
                        columns={12}
                        width="85%"
                        row={6}
                        maxRows={6}
                        multiline
                        defaultValue={object.description}
                        marginRight="4rem"
                        variant="outlined"
                        label="Mô tả"
                        name="description"
                        onChange={(event) => {
                          formik.handleChange(event);
                        }}
                      />
                    </Grid>
                    <Box width="200px" marginTop={"1%"} ml={"10rem"} mb={"2rem"}>
                      <ButtonLangding
                        width="10rem"
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
                      }}
                    >
                      {input !== null ? (
                        <img src={input} alt="image" />
                      ) : (
                        <img src={input} alt="image" />
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
