import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  FormControlLabel,
  FormGroup,
  Box,
} from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Switch } from "@mui/material";
import { Authen } from "context/authenToken/AuthenToken";
import { useDispatch } from "react-redux";
import API from "config/axios/API/API";
import { CustomizedToast } from "components/toast/ToastCustom";
import { URL_API } from "config/axios/Url/URL";
import PageHeader from "components/Layout/PageHeader";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";
import { getAccount } from "context/redux/action/action";

const schema = yup.object().shape({});

export default function UpdatePermission(props) {
  const dispatch = useDispatch();
  const { token } = useContext(Authen);
  const { OpenEditPermission, SetOpenEditPermission, Username } = props;

  const [display, setDisplay] = useState(false);
  const [display1, setDisplay1] = useState(false);
  const [display2, setDisplay2] = useState(false);
  const [loading, setLoading] = useState(true);
  const formData = new FormData();
  const handleClose = () => {
    SetOpenEditPermission(false);
  };

  useEffect(() => {
    const getAPIdata = async () => {
      try {
        setLoading(true);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getAPIdata();
  }, [dispatch, Username, token]);

  const formik = useFormik({
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      Voter: "",
      Candidate: "",
      moderator: "",
    },

    onSubmit: async (values) => {
      formData.append("Voter", display.toString());
      formData.append("Candidate", display1.toString());
      formData.append("Moderator", display2.toString());
      try {
        const req = await API("PUT", URL_API + `/api/v1/users/${Username}`, formData, token);
        if (req) {
          CustomizedToast({
            message: "Cập nhật vai trò thành công",
            type: "SUCCESS",
          });
        }
        await dispatch(getAccount(token));
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

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Paper>
        <Dialog maxWidth="md" open={OpenEditPermission} onClose={handleClose}>
          <DialogTitle>
            <PageHeader title="Cập nhật vai trò" />
          </DialogTitle>
          <DialogContent>
            <form onSubmit={formik.handleSubmit}>
              <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        color="secondary"
                        checked={display}
                        onChange={(e) => {
                          setDisplay(e.target.checked);
                        }}
                      />
                    }
                    label="Người bình chọn"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        color="secondary"
                        checked={display1}
                        onChange={(e) => {
                          setDisplay1(e.target.checked);
                        }}
                      />
                    }
                    label="Ứng cử viên"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        color="secondary"
                        checked={display2}
                        onChange={(e) => {
                          setDisplay2(e.target.checked);
                        }}
                      />
                    }
                    label="Người điều hành"
                  />
                </FormGroup>
              </Grid>
              <Box sx={{ marginLeft: "4rem" }}>
                <ButtonLangding
                  type="submit"
                  nameButton="Cập nhật"
                  bgColor="#FFA500"
                  hovercolor="#F7941D"
                />
              </Box>
            </form>
          </DialogContent>
        </Dialog>
      </Paper>
    );
  }
}
