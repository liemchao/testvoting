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
import TextArea from "components/Control/TextArea";
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
import { getFormId } from "context/redux/action/action";
import { getformbyIdUser } from "context/redux/action/action";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";

const schema = yup.object().shape({});

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export default function UpdateFormPopup(props) {
  const { Open, SetOpen, formdetail } = props;
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
  const [loading, setLoading] = useState(true);
  const [rateSao, setrateSao] = useState();

  const handleClose = () => {
    SetOpen(false);
  };

  const { token } = useContext(Authen);
  const detoken = jwt_decode(token);

  // useEffect(() => {
  //   const getAPIcatagory = async () => {
  //     dispatch(getFormId(idform));
  //     await dispatch(getAllCategory(token));
  //     await dispatch(getAllType(token));
  //   };
  //   getAPIcatagory();
  // }, []);

  useEffect(() => {
    const getAPIdata = async () => {
      try {
        setLoading(true);

        await Promise.all([dispatch(getAllCategory(token))]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getAPIdata();
  }, [dispatch, token]);

  React.useEffect(() => {
    formik.setFieldValue("name", formdetail.name);
    formik.setFieldValue("visibility", formdetail.visibility);
    formik.setFieldValue("categoryId", formdetail.categoryId);
  }, [formdetail]);

  const getRate = () => [
    { id: "1", title: "1" },
    { id: "2", title: "2" },
    { id: "3", title: "3" },
    { id: "4", title: "4" },
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

  const formikAddQuestion = useFormik({
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      title: "",
      content: "",
      formId: formId,
      typeId: "",
      element: [
        {
          answer: "",
          rate: " ",
        },
      ],
    },
    onSubmit: async (values) => {
      if (typeId === "284a18e0-6d3b-4f71-83de-aa79513a3cd7") {
        const dataquetion = {
          content: formik.values.content,
          formId: formId,
          typeId: typeId,
          score: rateSao,
        };

        try {
          const res = await API("POST", URL_API + `/api/v1/questions`, dataquetion, token);
          if (res) {
            CustomizedToast({
              message: "Thêm câu hỏi thành công",
              type: "SUCCESS",
            });
          }
        } catch (error) {
          CustomizedToast({
            message: `${error.response.data.message}`,
            type: "ERROR",
          });
        }
      } else {
        const dataquetion = {
          title: formik.values.title,
          content: formik.values.content,
          formId: formId,
          typeId: typeId,
          element: [
            {
              answer: answer,
              rate: rate,
            },
            {
              answer: answer1,
              rate: rate1,
            },
            {
              answer: answer2,
              rate: rate2,
            },
            {
              answer: answer3,
              rate: rate3,
            },
          ],
        };

        try {
          const res = await API("POST", URL_API + `/api/v1/questions/elements`, dataquetion, token);
          if (res) {
            CustomizedToast({
              message: "Thêm câu hỏi thành công",
              type: "SUCCESS",
            });
          }
        } catch (error) {
          CustomizedToast({
            message: "Thêm câu hỏi thất bại",
            type: "ERROR",
          });
        }
      }
    },
  });
  const formik = useFormik({
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      name: formdetail.name,
      visibility: formdetail.visibility,
      categoryId: formdetail.categoryId,
      userId: detoken.Username,
    },
    onSubmit: async (values) => {
      const data = {
        name: formik.values.name,
        visibility: display,
        categoryId: formik.values.categoryId,
        userId: detoken.Username,
      };

      try {
        const req = await API("PUT", URL_API + `/api/v1/forms/${formdetail.formId}`, data, token);
        if (req) {
          CustomizedToast({
            message: "Chỉnh sửa biểu mẫu thành công",
            type: "SUCCESS",
          });
        }
        await dispatch(getFormId(formdetail.formId, token));
      } catch (error) {
        CustomizedToast({
          message: `${error.response.data.message}`,
          type: "ERROR",
        });
      }
    },
  });
  return (
    <Paper>
      <Dialog maxWidth="md" open={Open} onClose={handleClose}>
        <DialogTitle>
          <PageHeader
            title={"Chỉnh sửa biểu mẫu"}
            subTitle={"Chỉnh sửa mẫu cho riêng bạn"}
            icon={getIcon("tabler:edit")}
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
                      name="name"
                      defaultValue={formdetail.name}
                      value={formdetail.name}
                      label="Tên Biểu Mẫu"
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
                        width="10rem"
                        defaultValue={formdetail.categoryName}
                        value={formdetail.categoryId}
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
                        width="10rem"
                        defaultValue={formdetail.visibility}
                        value={formdetail.visibility}
                        height="12.5rem"
                        onChange={(e) => {
                          setDisplay(e.target.value);
                        }}
                        options={getOptions()}
                      />
                    </Box>
                  </Grid>
                  <Box width="200px" marginTop={"3%"} ml={"12.5rem"} mb={"2rem"}>
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
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
