import * as React from "react";
import Avatar from "@mui/material/Avatar";
import FormControlLabel from "@mui/material/FormControlLabel";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme } from "@mui/material/styles";

import { Link, useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import * as yup from "yup";

import TextField from "@mui/material/TextField";
import jwt_decode from "jwt-decode";
import Checkbox from "@mui/material/Checkbox";
import { useFormik } from "formik";
import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import { LoginCheck, loginFirebase } from "../../../context/redux/action/action";
import { useDispatch } from "react-redux";
import firebase, { auth } from "../../../config/Firebase/firebase.js";
import GoogleButton from "components/Control/GoogleButton";
import { CustomizedToast } from "components/toast/ToastCustom";
import API from "config/axios/API/API";
import { URL_API } from "config/axios/Url/URL";
import logo from "assets/images/full 3 logo.png";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";

const ggProvider = new firebase.auth.GoogleAuthProvider();
const schema = yup.object().shape({});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit">Voting system</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SigninPoppop(props) {
  const { OpenPopUp, SetOpenPopUp } = props;

  const handleClose = () => {
    SetOpenPopUp(false);
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const hanldeLoginWithgg = async () => {
    try {
      const hihi = await auth.signInWithPopup(ggProvider);
      auth.onAuthStateChanged(async (user) => {
        try {
          const res = await API(
            "POST",
            URL_API + `/api/v1/authen/firebase?idtoken=${user._delegate.accessToken}`
          );

          if (res) {
            localStorage.setItem("token", res.data.data.token);
            const token = localStorage.getItem("token");
            const detoken = jwt_decode(token);

            if (detoken.RoleName === "user") {
              CustomizedToast({
                message: "Đăng nhập thành công",
                type: "SUCCESS",
              });
              handleClose();
            } else {
              CustomizedToast({
                message: "Tài khoản của bạn không được phép đăng nhập vào hệ thống",
                type: "ERROR",
              });
              localStorage.removeItem("token"); // Xóa token đã lưu
              navigate("/");
            }
          }
        } catch (error) {
          CustomizedToast({
            message: `${error.response.data.message}`,
            type: "ERROR",
          });
          localStorage.removeItem("token"); // Xóa token đã lưu
          navigate("/");
        }
      });
    } catch (error) {
      CustomizedToast({
        message: "Tên tài khoản hoặc mật khẩu sai",
        type: "ERROR",
      });
      localStorage.removeItem("token"); // Xóa token đã lưu
      navigate("/");
    }
  };

  const formik = useFormik({
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      userName: "",
      password: "",
    },

    onSubmit: (values) => {
      const adminData = {
        userName: formik.values.userName,
        password: formik.values.password,
      };
      dispatch(LoginCheck(adminData, SetOpenPopUp));
    },
  });

  const handleLogin = async () => {
    const adminData = {
      userName: formik.values.userName,
      password: formik.values.password,
    };
    await API("POST", URL_API + `/api/v1/authen/login`, adminData)
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        const token = localStorage.getItem("token");
        const detoken = jwt_decode(token);
        if (detoken.RoleName === "user") {
          CustomizedToast({
            message: "Đăng nhập thành công",
            type: "SUCCESS",
          });
          handleClose();
        }
      })
      .catch((error) => {
        CustomizedToast({
          message: "Tên tài khoản hoặc mật khẩu sai",
          type: "ERROR",
        });
      });
  };

  return (
    <Dialog sx={{ borderRadius: "10%" }} maxWidth="ms" open={OpenPopUp} onClose={handleClose}>
      <DialogContent
        sx={{
          backgroundImage: `url("${"https://res.cloudinary.com/ddrq4bfkk/image/upload/f_auto,q_auto/v1/2024/ijbissnt3d2gu1gru8zc"}")`,
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container component="main">
            <Grid item xs={12} square>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center", bottom: "-2rem" }}>
                  <img
                    src="https://res.cloudinary.com/ddrq4bfkk/image/upload/f_auto,q_auto/v1/2024/txl65bqasmnaqlpjuoy9"
                    alt="Logo"
                    style={{ width: "80%", height: "100%" }}
                  />
                </Box>
                <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="userName"
                    label="Tài khoản"
                    name="userName"
                    autoComplete="email"
                    autoFocus
                    value={formik.values.userName}
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    sx={{
                      "& label": {
                        color: "white",
                      },
                      "& label.Mui-focused": {
                        color: "white",
                      },
                      "& .MuiInput-underline:after": {
                        borderBottomColor: "white",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                        "& input": {
                          color: "white",
                        },
                        "&::placeholder": {
                          color: "white",
                        },
                        "&.Mui-focused input": {
                          color: "white",
                        },
                      },
                    }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Mật khẩu"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={formik.values.password}
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    sx={{
                      "& label": {
                        color: "white",
                      },
                      "& label.Mui-focused": {
                        color: "white",
                      },
                      "& .MuiInput-underline:after": {
                        borderBottomColor: "white",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                        "& input": {
                          color: "white",
                        },
                        "&::placeholder": {
                          color: "white",
                        },
                        "&.Mui-focused input": {
                          color: "white",
                        },
                      },
                    }}
                  />
                  <Grid container>
                    <Grid item xs>
                      <FormControlLabel
                        sx={{
                          color: "white", // Đổi màu checkbox sang trắng
                          "&.Mui-checked": {
                            color: "white", // Đổi màu checkbox khi được chọn sang trắng
                          },
                        }}
                        control={
                          <Checkbox
                            sx={{
                              color: "white", // Đổi màu checkbox sang trắng
                              "&.Mui-checked": {
                                color: "white", // Đổi màu checkbox khi được chọn sang trắng
                              },
                            }}
                            value="remember"
                          />
                        }
                        label="Ghi nhớ tài khoản"
                      />
                    </Grid>
                    <Grid item mt={1}>
                      {/* <Link href="#" variant="body1">
                        Bạn quên mật khẩu?
                      </Link> */}
                    </Grid>
                  </Grid>

                  <ButtonLangding
                    variant="contained"
                    fullWidth
                    onClick={handleLogin}
                    borderRadius="20px"
                    sx={{ mt: 3, mb: 2 }}
                    nameButton="Đăng nhập với tài khoản"
                  />
                  <Grid item xs={12} display={"flex"} justifyContent={"flex-end"} mt={"2%"}>
                    <ButtonLangding
                      type="button"
                      variant="contained"
                      fullWidth
                      borderRadius="20px"
                      sx={{ mt: 3, mb: 2 }}
                      nameButton="Đăng nhập với Gmail"
                      onClick={hanldeLoginWithgg}
                    />
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}
