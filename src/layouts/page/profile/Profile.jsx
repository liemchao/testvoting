import React from "react";
import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
// import { useState } from "react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "components/Card/Card";
import CardAvatar from "components/Card/CardAvatar";
import CardBody from "components/Card/CardBody";
import GridContainer from "components/Grid/GridContainer";
import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";
import GridItem from "components/Grid/GridItem";
import CardHeader from "components/Card/CardHeader";
import Controls from "components/Control/Controls";
import CardFooter from "components/Card/CardFooter";
import { callAPIProfile } from "context/redux/action/action";
import jwtDecode from "jwt-decode";
import Input from "components/Control/Input";
import { CustomizedToast } from "components/toast/ToastCustom";
import API from "config/axios/API/API";
import { URL_API } from "config/axios/Url/URL";
import { FormControl } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useEffect } from "react";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/joy/IconButton";

const styles = {
  cardCategoryWhite: {
    color: "#2BB557",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
};

const schema = yup.object().shape({});

const useStyles = makeStyles(styles);
export default function Profile() {
  const navigate = useNavigate();

  const [input, setInput] = useState([]);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [dateEnd, setDateEnd] = useState(dayjs("2000-05-22T00:00:00"));

  const decode = jwtDecode(token);
  const [gender, setGender] = useState();
  const formData = new FormData();
  const dispatch = useDispatch();
  const Navigate = useNavigate();

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

  React.useEffect(() => {
    const callAPI = async () => {
      await dispatch(callAPIProfile(decode.Username, token));
      setLoading(false);
    };
    callAPI();
  }, [dispatch, token]);

  const handleChange = (newValue) => {
    const dayjsValue = dayjs(newValue);
    setDateEnd(dayjsValue);
  };
  const getGender = () => [
    { id: "female", title: "Nam" },
    { id: "male", title: "Nữ" },
    { id: "other", title: "Khác" },
  ];

  React.useEffect(() => {
    API("GET", URL_API + `/api/v1/users/id?id=${decode.Username}`, null, token)
      .then((res) => {
        formik.setFieldValue("fullName", res.data.data.fullName);
        formik.setFieldValue("phone", res.data.data.phone);
        setGender(res.data.data.gender);
        formik.setFieldValue("Address", res.data.data.address);
        setDateEnd(dayjs(res.data.data.dob));
      })
      .catch((error) => {
        CustomizedToast({
          message: `${error.response.data.message}`,
          type: "ERROR",
        });
      });
  }, [decode.Username, setGender, setDateEnd]);

  const profiles = useSelector((state) => {
    return state.profile;
  });

  useEffect(() => {
    setInput(profiles.avatarUrl || []);
  }, [profiles.avatarUrl]);

  const goBack = () => {
    window.history.back();
  };

  const formik = useFormik({
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      FullName: profiles.fullName,
      Phone: profiles.phone,
      Gender: profiles.gender,
      Address: profiles.address,
      Dob: profiles.dob,
      ImageFile: null,
    },

    onSubmit: async (values) => {
      formData.append("FullName", formik.values.fullName);
      formData.append("Phone", formik.values.phone);
      formData.append("Gender", gender);
      formData.append("Address", formik.values.Address);
      formData.append("Dob", dateEnd.add(1, "day"));
      formData.append("ImageFile", formik.values.ImageFile);
      try {
        const req = await API(
          "PUT",
          URL_API + `/api/v1/users?id=${decode.Username}`,
          formData,
          token
        );

        if (req) {
          CustomizedToast({
            message: "Cập nhật thông tin thành công",
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
    },
  });
  console.log("🚀 ~ file: Profile.jsx:176 ~ Profile ~ formik:", formik);

  const classes = useStyles();
  if (!profiles || loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Paper>
        {/* <form onClick={formik.onSubmit} */}
        <IconButton onClick={goBack}>
          <ArrowBackIcon />
        </IconButton>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4} sx={{ marginTop: "3%", marginLeft: "2%" }}>
                <Card profile>
                  <CardAvatar profile>
                    {input !== null ? (
                      <img src={input} alt="image" />
                    ) : (
                      <img src={input} alt="image" />
                    )}
                  </CardAvatar>

                  <CardBody profile>
                    <label htmlFor="contained-button-file">
                      <input
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        name="image"
                        type="file"
                        display="none"
                        style={{ opacity: 0, position: "absolute", zIndex: -1 }}
                        onChange={_treat}
                      />
                      <Stack width="200px" marginTop={"2rem"} ml={"9rem"} mb={"1rem"}>
                        <ButtonLangding
                          width="10rem"
                          variant="contained"
                          bgColor="#FFA500"
                          hovercolor="#F7941D"
                          component="span"
                          nameButton="Tải ảnh"
                        />
                      </Stack>
                    </label>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={7.5}>
                <Card>
                  <CardHeader color="#F7941D">
                    <h4 className={classes.cardTitleWhite}>Chỉnh sửa thông tin cá nhân</h4>

                    <p>FVS Voting System</p>
                  </CardHeader>
                  <CardBody>
                    <Box
                      sx={{
                        float: "left",
                        width: "50%",
                        flexGrow: 1,
                        mt: "2rem",
                        marginLeft: "8rem",
                      }}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Grid container spacing={1.5}>
                        <Grid item xs={12}>
                          <Grid item xs={12} mb={2}>
                            <Controls.Input
                              variant="outlined"
                              name="fullName"
                              label="Họ và tên"
                              width="24rem"
                              values={formik.values.fullName}
                              onChange={(e) => {
                                formik.handleChange(e);
                              }}
                            />
                          </Grid>
                          <Controls.Input
                            variant="outlined"
                            name="phone"
                            type="number"
                            label="Số điện thoại"
                            width="24rem"
                            values={formik.values.phone}
                            disabled
                            onChange={(e) => {
                              formik.handleChange(e);
                            }}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Controls.Select
                            label="Giới tính"
                            name="gender" // Change this to "Gender"
                            width="86%"
                            value={gender} // Change this to "Gender"
                            onChange={(e) => {
                              console.log(
                                "🚀 ~ file: Profile.jsx:278 ~ Profile ~ e:",
                                e.target.value
                              );
                              setGender(e.target.value); // Change this to "Gender"
                            }}
                            options={getGender()}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Controls.Input
                            variant="outlined"
                            name="Address"
                            label="Địa chỉ"
                            width="24rem"
                            values={formik.values.Address}
                            defaultValue={formik.values.Address}
                            onChange={(e) => {
                              formik.handleChange(e);
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl
                            sx={{
                              display: "grid",
                              gridTemplateColumns: { sm: "6fr 1fr" },
                            }}
                          >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DesktopDatePicker
                                label="Ngày tháng năm sinh"
                                inputFormat="MM/DD/YYYY"
                                value={dateEnd}
                                disableFuture
                                maxDate={dayjs().subtract(3600, "day")}
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                              />
                            </LocalizationProvider>
                          </FormControl>
                        </Grid>

                        <Box>
                          <Stack width="200px" marginTop={"2rem"} ml={"5rem"} mb={"1rem"}>
                            <ButtonLangding
                              bgColor="#FFA500"
                              hovercolor="#F7941D"
                              variant="contained"
                              type="submit"
                              nameButton="Cập nhật"
                            />
                          </Stack>
                        </Box>
                      </Grid>
                    </Box>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </form>
        </div>
      </Paper>
    );
  }
}
