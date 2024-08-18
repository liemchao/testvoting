import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Link, useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import * as yup from "yup";

import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { useFormik } from "formik";
import { Box, Button, InputAdornment, Typography, IconButton } from "@mui/material";
import { LoginAthen, loginFirebase } from "../../../context/redux/action/action";
import { useDispatch, useSelector } from "react-redux";
import firebase, { auth } from "../../../config/Firebase/firebase.js";
import GoogleButton from "components/Control/GoogleButton";
import { useState } from "react";
import logo from "assets/images/Logo_main.png";
import Logo1 from "assets/images/logos/LogoFVS.svg";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useTheme, useMediaQuery } from "@mui/material";

const ggProvider = new firebase.auth.GoogleAuthProvider();
const schema = yup.object().shape({});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" to={"/"}>
        Voting system
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignInSide() {
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [idFireBase, setIdFireBase] = useState();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const hanldeLoginWithgg = async () => {
    const hihi = await auth.signInWithPopup(ggProvider);
    auth.onAuthStateChanged((user) => {
      dispatch(loginFirebase(user._delegate.accessToken, navigate));
    });
  };

  const formik = useFormik({
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: async (values) => {
      const adminData = {
        userName: formik.values.userName,
        password: formik.values.password,
      };
      setIsLoggedIn(true);
      dispatch(LoginAthen(adminData, navigate));
    },
  });
  const design = useSelector((state) => {
    return state.design;
  });

  return (
    <div
      style={{
        backgroundImage: `url("${design.backgroundImage}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh", // Sử dụng minHeight thay vì height để tránh tràn màn hình
      }}
    >
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
        <Grid item xs={12} sm={8} md={5}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: isMobile ? "0rem" : "2rem",
            }}
          >
            <img
              src={design.icon}
              alt="Logo"
              style={{
                width: isMobile ? "90%" : "85%", // Để hình ảnh lấp đầy chiều rộng của container
                height: "auto",
                marginRight: isMobile ? "1%" : "7%",
              }}
            />
          </Box>
          <Box
            sx={{
              my: 1,
              mx: 1,
              p: 3,
              display: "flex",
              backgroundImage:
                "url(https://res.cloudinary.com/ddrq4bfkk/image/upload/f_auto,q_auto/v1/2024/sjwd61p3aomt6edqu6sf)",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "10px",
              backgroundColor: "transparent",
              backgroundSize: "cover",
              position: "relative",
              marginLeft: isMobile ? "2%" : "0",
              marginRight: isMobile ? "3%" : "10%",
            }}
          >
            <Box
              type="row"
              sx={{
                visibility: "hidden",
              }}
            >
              <img
                src={Logo1}
                alt="Logo"
                style={{
                  width: "80px",
                  marginRight: "-2rem",
                  height: "80%",
                }}
              />
            </Box>
            <Box
              component="form"
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{ marginTop: "-1rem", marginRight: isMobile ? "4%" : "0" }}
            >
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
                onChange={formik.handleChange}
                error={formik.touched.userName && formik.errors.userName}
                helperText={formik.touched.userName && formik.errors.userName}
                onBlur={formik.handleBlur}
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
                  [defaultTheme.breakpoints.down("sm")]: {
                    marginBottom: "1rem",
                    marginLeft: "1rem",
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? (
                          <VisibilityIcon
                            sx={{
                              color: "white", // Đổi màu icon sang trắng
                            }}
                          />
                        ) : (
                          <VisibilityOffIcon
                            sx={{
                              color: "white", // Đổi màu icon sang trắng
                            }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
                onBlur={formik.handleBlur}
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
                  [defaultTheme.breakpoints.down("sm")]: {
                    marginBottom: "1rem",
                    marginLeft: "1rem", // Kiểu cho màn hình nhỏ hơn "sm"
                  },
                }}
              />
              <Grid container>
                <Grid
                  item
                  xs
                  sx={{
                    [defaultTheme.breakpoints.down("sm")]: {
                      marginBottom: "1rem",
                      marginLeft: "1rem", // Kiểu cho màn hình nhỏ hơn "sm"
                    },
                  }}
                >
                  <FormControlLabel
                    sx={{
                      color: "white", // Đổi màu checkbox sang trắng
                      "&.Mui-checked": {
                        color: "white", // Đổi màu checkbox khi được chọn sang trắng
                      },
                    }}
                    control={
                      <Checkbox
                        value="remember"
                        sx={{
                          color: "white", // Đổi màu checkbox sang trắng
                          "&.Mui-checked": {
                            color: "white", // Đổi màu checkbox khi được chọn sang trắng
                          },
                        }}
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                      />
                    }
                    label="Ghi nhớ tài khoản"
                  />
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                display={"flex"}
                justifyContent={"flex-end"}
                sx={{
                  [defaultTheme.breakpoints.down("sm")]: {
                    marginBottom: "1rem",
                    marginLeft: "1rem", // Kiểu cho màn hình nhỏ hơn "sm"
                  },
                }}
                mt={"3%"}
              >
                <ButtonLangding
                  type="submit"
                  variant="contained"
                  fullWidth
                  borderRadius="20px"
                  sx={{ mt: 3, mb: 2 }}
                  nameButton="Đăng nhập với tài khoản"
                />
              </Grid>
              <Grid
                item
                xs={12}
                display={"flex"}
                justifyContent={"flex-end"}
                sx={{
                  [defaultTheme.breakpoints.down("sm")]: {
                    marginBottom: "1rem",
                    marginLeft: "1rem", // Kiểu cho màn hình nhỏ hơn "sm"
                  },
                }}
                mt={"2%"}
              >
                <ButtonLangding
                  variant="contained"
                  fullWidth
                  borderRadius="20px"
                  sx={{
                    mt: 3,
                    mb: 2,

                    [defaultTheme.breakpoints.down("sm")]: {
                      fontSize: "10px", // Kiểu cho màn hình nhỏ hơn "sm"
                    },
                  }}
                  nameButton="Đăng nhập với Gmail"
                  onClick={hanldeLoginWithgg}
                />
              </Grid>
              <Copyright sx={{ mt: 2, visibility: "hidden" }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
