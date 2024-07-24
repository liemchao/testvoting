import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Box,
  TextField,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

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
import API from "config/axios/API/API";
import moment from "moment";

import dayjs from "dayjs";
import { getCampaignId } from "context/redux/action/action";
import { callAPIgetDetailQuestion } from "context/redux/action/action";
import { getFormId } from "context/redux/action/action";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";
const schema = yup.object().shape({});

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export default function UpdateQuestion(props) {
  const dispatch = useDispatch();
  const { token } = useContext(Authen);
  const { OpenEditCandidate, SetOpenEditCandidate, id, formId } = props;

  const [input, setInput] = useState([]);
  const [content, setContent] = useState();
  const [dateCreate, setDayCreate] = useState();
  const [dateEnd, setDateEnd] = useState();
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState();
  const formData = new FormData();
  const [total, setTotal] = useState();
  const handleClose = () => {
    SetOpenEditCandidate(false);
  };
  const decode = jwt_decode(token);

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

  useEffect(() => {
    const callAPI = async () => {
      dispatch(callAPIgetDetailQuestion(id, token));
    };
    callAPI();
  }, [dispatch, id]);

  const detailQuestion = useSelector((state) => {
    return state.detailQuestion;
  });

  const handleSave = async () => {
    const elements = detailQuestion.element?.map((element) => ({
      elementId: element.elementId,
      answer: element.answer,
      rate: element.score,
    }));

    const data = {
      content: content || detailQuestion.content,

      typeId: detailQuestion.typeId,
      element: elements,
      totalScore: total,
    };
    await API("PUT", URL_API + `/api/v1/questions/${id}`, data, token)
      .then((res) => {
        CustomizedToast({
          message: "Cập nhập  thành công",
          type: "SUCCESS",
        });
        dispatch(getFormId(formId, token));
        handleClose();
      })
      .catch((err) => {});
  };

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

  const handleAnswerChange = (index, value) => {
    const updatedElements = [...detailQuestion.element];
    updatedElements[index].answer = value;

    setQuestion((prevState) => ({
      ...prevState,
      element: updatedElements,
    }));
  };

  const handleScoreChange = (index, value) => {
    const updatedElements = [...detailQuestion.element];
    updatedElements[index].score = value;

    setQuestion((prevState) => ({
      ...prevState,
      element: updatedElements,
    }));
  };

  if (loading) {
  } else {
    return (
      <Paper>
        <Dialog maxWidth="lg" open={OpenEditCandidate} onClose={handleClose}>
          <DialogTitle>
            <PageHeader
              title="Chỉnh sửa câu hỏi"
              subTitle="Cập nhật câu hỏi"
              icon={getIcon("akar-icons:edit")}
            />
          </DialogTitle>
          <DialogContent>
            <Box>
              <TextField
                label="Câu hỏi"
                name="content"
                variant="standard"
                defaultValue={detailQuestion.content}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              {detailQuestion.typeName === "Bình chọn sao" ? (
                <>
                  <TextField
                    sx={{ mt: 8 }}
                    id={detailQuestion.questionId}
                    label="Số điểm trên mỗi sao"
                    variant="outlined"
                    name="answer"
                    defaultValue={detailQuestion.scoreOfRatingQuestion}
                    value={total}
                    fullWidth
                    onChange={(e) => setTotal(e.target.value)}
                  />
                </>
              ) : (
                <Grid container spacing={0} sx={{ mt: 4 }}>
                  {detailQuestion.element?.map((element, index) => {
                    return (
                      <>
                        <Grid item xs={8}>
                          <Box sx={{ width: "80%", mb: 2 }}>
                            <TextField
                              id={element.questionId}
                              label="Câu trả lời"
                              variant="outlined"
                              name="answer"
                              value={element.answer}
                              fullWidth
                              onChange={(e) => handleAnswerChange(index, e.target.value)}
                            />
                          </Box>
                        </Grid>
                        <Box sx={{ width: "30%" }}>
                          <Grid item xs={4}>
                            <TextField
                              id={element.questionId}
                              label="Điểm"
                              name="rate"
                              variant="outlined"
                              value={element.score}
                              fullWidth
                              onChange={(e) => handleScoreChange(index, e.target.value)}
                            />
                          </Grid>
                        </Box>
                      </>
                    );
                  })}
                </Grid>
              )}
              <Box mt={1}>
                <ButtonLangding
                  nameButton="Cập nhật"
                  bgColor="#FFA500"
                  hovercolor="#F7941D"
                  onClick={() => {
                    handleSave();
                  }}
                ></ButtonLangding>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </Paper>
    );
  }
}
