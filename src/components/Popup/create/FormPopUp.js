import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Button,
  Box,
  Rating,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import jwt_decode from "jwt-decode";
import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";
import Select from "components/Control/Select";
import Input from "components/Control/Input";
import PageHeader from "components/Layout/PageHeader";
import Iconify from "assets/theme/components/icon/Iconify";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "context/redux/action/action";
import { Authen } from "context/authenToken/AuthenToken";
import { useContext } from "react";
import { URL_API } from "config/axios/Url/URL";
import API from "config/axios/API/API";
import { CustomizedToast } from "components/toast/ToastCustom";
import { getAllType } from "context/redux/action/action";
import { getformbyIdUser } from "context/redux/action/action";
import { callAPIgetListForm } from "context/redux/action/action";
import QuestionForm from "layouts/page/user/icontop/Question";
import Page from "components/Layout/Page";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";

const schema = yup.object().shape({});

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export default function FormPopup(props) {
  const { OpenPopUp, SetOpenPopUp } = props;
  const dispatch = useDispatch();
  const [display, setDisplay] = useState();
  const [typeId, setTypeId] = useState();
  const [input, setInput] = useState([]);
  const [formId, setformId] = useState();
  const [rate, setRate] = useState();
  const [answer, setAnsewer] = useState();
  const [rate1, setRate1] = useState();
  const [answer1, setAnsewer1] = useState();
  const [rate2, setRate2] = useState();
  const [answer2, setAnsewer2] = useState();
  const [rate3, setRate3] = useState();
  const [answer3, setAnsewer3] = useState();
  const [rateSao, setrateSao] = useState();

  const handleClose = () => {
    SetOpenPopUp(false);
  };

  const { token } = useContext(Authen);
  const detoken = jwt_decode(token);

  useEffect(() => {
    const getAPIcatagory = async () => {
      await dispatch(getAllCategory(token));
      await dispatch(getAllType(token));
    };
    getAPIcatagory();
  }, []);
  const getRate = () => [
    { id: "1", title: "1" },
    { id: "2", title: "2" },
    { id: "3", title: "3" },
    { id: "4", title: "4" },
    { id: "5", title: "5" },
  ];

  const getOptions = () => [
    { id: "public", title: "Công khai" },
    { id: "private", title: "Không công khai" },
  ];
  const handlegetRate = (e) => {
    setRate(e.target.value);
  };
  const handlegetRate1 = (e) => {
    setRate1(e.target.value);
  };
  const handlegetRate2 = (e) => {
    setRate2(e.target.value);
  };
  const handlegetRate3 = (e) => {
    setRate3(e.target.value);
  };
  const handlegetRateSao = (e) => {
    setrateSao(e.target.value);
  };

  // useEffect(() => {}, []);

  const category = useSelector((state) => {
    return state.category;
  });
  const type = useSelector((state) => {
    return state.type;
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
  const getTypeOption = () => {
    const TypeOption = [];
    for (var i = 0; i < type.length; i++) {
      TypeOption.push({
        id: type[i].typeId,
        title: type[i].name,
      });
    }
    return TypeOption;
  };

  const formik = useFormik({
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      name: "",
      visibility: "",
      categoryId: "",
      userId: "",
    },
    onSubmit: async (values) => {
      const data = {
        name: formik.values.name,
        visibility: display,
        categoryId: formik.values.categoryId,
        userId: detoken.Username,
      };

      try {
        const req = await API("POST", URL_API + `/api/v1/forms`, data, token);
        if (req) {
          setformId(req.data.data.formId);
          dispatch(getformbyIdUser(detoken.Username, token));
          dispatch(callAPIgetListForm(token));
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
  return (
    <Paper>
      <Dialog maxWidth="md" open={OpenPopUp} onClose={handleClose}>
        <DialogTitle>
          <PageHeader
            title={formId ? "Tạo câu hỏi " : "Tạo mới biểu mẫu"}
            subTitle={formId ? "Thêm câu hỏi cho biểu mẩu " : "Tạo biểu mẫu cho riêng bạn"}
            icon={getIcon("gala:add")}
          />
        </DialogTitle>
        <DialogContent>
          {formId ? (
            // thêm dạng list câu hỏi cho
            <Page>
              <QuestionForm formId={formId} />
            </Page>
          ) : (
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
                        name="name"
                        label="Tên Biểu Mẫu"
                        value={formik.values.name}
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
                          name="categoryId"
                          required
                          label="Loại biểu mẫu"
                          width="14rem"
                          height="12.5rem"
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
                          label="Hiển thị"
                          width="14rem"
                          height="12.5rem"
                          onChange={(e) => {
                            setDisplay(e.target.value);
                          }}
                          options={getOptions()}
                        />
                      </Box>
                    </Grid>
                    <Box width="200px" marginTop={"5%"} ml={"12.5rem"} mb={"2rem"}>
                      <ButtonLangding
                        variant="contained"
                        type="submit"
                        nameButton="Thêm"
                        bgColor="#F6911B"
                      />
                    </Box>
                  </Grid>
                </Box>
              </Box>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
