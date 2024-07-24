import { Dialog, DialogContent, DialogTitle, Grid, Paper, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";
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
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { getGroupId } from "context/redux/action/action";
import ExcelTable from "layouts/page/exportfile/TableExport";
import { handleGetCandidateByIdCampaign } from "context/redux/action/action";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";

const schema = yup.object().shape({});

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export default function NewAccount(props) {
  const dispatch = useDispatch();
  const { token } = useContext(Authen);
  const { OpenPopUp, SetOpenPopUp, id } = props;

  useEffect(() => {
    const getListGroup = async () => {
      await dispatch(getGroupId(id, token));
    };
    getListGroup();
  }, []);

  const listGroup = useSelector((state) => {
    return state.listGroup;
  });

  const getGroupOption = () => {
    const GroupOption = [];
    for (var i = 0; i < listGroup.length; i++) {
      if (listGroup[i].isVoter === false) {
        GroupOption.push({
          id: listGroup[i].name,
          title: listGroup[i].name,
        });
      }
    }
    return GroupOption;
  };
  const formData = new FormData();
  const handleClose = () => {
    SetOpenPopUp(false);
  };
  const decode = jwt_decode(token);

  const formik = useFormik({
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      campaignId: "",
      listAccountCandidate: [
        {
          description: "",
          // userName: "",
          // password: "",
          fullName: "",
          groupId: "",
        },
      ],
    },
    onSubmit: async (values) => {
      const data = {
        campaignId: id,
        listCandidate: [
          {
            description: formik.values.description,
            fullName: formik.values.fullName,
            groupName: formik.values.groupName,
          },
        ],
      };
      try {
        const req = await API("POST", URL_API + `/api/v1/candidates/list-candidate`, data, token);
        if (req) {
          CustomizedToast({
            message: "Thêm một ứng cử viên thành công",
            type: "SUCCESS",
          });
        }
        dispatch(handleGetCandidateByIdCampaign(token, id));
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
    <Paper>
      <Dialog maxWidth="md" open={OpenPopUp} onClose={handleClose}>
        <DialogTitle>
          <PageHeader
            title="Tạo ứng cử viên"
            subTitle="Vui lòng điền đầy đủ thông tin"
            icon={getIcon("gala:add")}
          />
          <Tabs aria-label="Basic tabs" defaultValue={0} sx={{ borderRadius: "lg" }}>
            <TabList
              style={{ width: "100%", display: "flex", justifyContent: "center" }}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                }}
                maxWidth="lg"
              >
                Tạo ứng cử viên
              </Tab>
              <Tab
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                Tạo bằng file excel
              </Tab>
            </TabList>
            <TabPanel maxWidth="md" value={0} sx={{ p: 2 }}>
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
                        <Grid item xs={11}>
                          <Input
                            required
                            variant="outlined"
                            name="fullName"
                            label="Họ và tên "
                            value={formik.values.fullName}
                            onChange={(event) => {
                              formik.handleChange(event);
                            }}
                          />
                        </Grid>
                        {/* <Grid item xs={12}>
                          <Input
                            required
                            variant="outlined"
                            name="fullName"
                            label="Họ và tên "
                            value={formik.values.fullName}
                            onChange={(event) => {
                              formik.handleChange(event);
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Input
                            // sx={{ width: "rem" }}
                            id="password"
                            autoComplete="current-password"
                            type="password"
                            name="password"
                            label="Mật khẩu"
                            value={formik.values.password}
                            onChange={(e) => {
                              formik.handleChange(e);
                            }}
                          />
                        </Grid> */}
                        <Grid item xs={11}>
                          <Input
                            required
                            variant="outlined"
                            name="description"
                            label="Mô tả"
                            value={formik.values.description}
                            onChange={(event) => {
                              formik.handleChange(event);
                            }}
                          />
                        </Grid>
                        <Grid item xs={11}>
                          <Box
                            sx={{
                              flexDirection: "row",
                            }}
                          >
                            <Select
                              name="groupName"
                              required
                              label="Nhóm ứng cử viên"
                              width="14rem"
                              height="10rem"
                              onChange={(e) => {
                                formik.setFieldValue("groupName", e.target.value);
                              }}
                              options={getGroupOption()}
                            />
                          </Box>
                        </Grid>

                        <Box width="200px" marginTop={"6%"} ml={"12rem"} mb={"2rem"}>
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
              </DialogContent>
            </TabPanel>
            <TabPanel maxWidth="md" value={1} sx={{ p: 2 }}>
              <DialogContent>
                <ExcelTable />
              </DialogContent>
            </TabPanel>
          </Tabs>
        </DialogTitle>
      </Dialog>
    </Paper>
  );
}
