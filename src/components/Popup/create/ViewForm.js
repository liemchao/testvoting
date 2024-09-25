import { Container, Dialog, DialogContent, DialogTitle, Paper, Rating } from "@mui/material";
import Box from "@mui/material/Box";
import Iconify from "assets/theme/components/icon/Iconify";
import PageHeader from "components/Layout/PageHeader";
import { Authen } from "context/authenToken/AuthenToken";
import { getFormId } from "context/redux/action/action";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Height } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateQuestion from "../updatePopup/UpdateQuestion";
import API from "config/axios/API/API";
import { URL_API } from "config/axios/Url/URL";
import { CustomizedToast } from "components/toast/ToastCustom";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
export default function ViewForm(props) {
  const { view, setView, formId } = props;
  const [OpenUpdate, SetOpenUpdate] = useState(false);
  const [idQuestion, setIdQuestion] = useState("");

  const { token } = useContext(Authen);
  const { question, answers } = props;

  const [selectedAnswer, setSelectedAnswer] = React.useState("");

  const handleChange = (event) => {
    setSelectedAnswer(event.target.value);
  };
  const dispath = useDispatch();

  useEffect(() => {
    const callAPI = async () => {
      dispath(getFormId(formId, token));
    };
    callAPI();
  }, [dispath, formId]);

  const formByid = useSelector((state) => {
    return state.formByid;
  });

  const handleClose = () => {
    setView(false);
  };
  const handleEditQuestion = (id) => {
    SetOpenUpdate(true);
    setIdQuestion(id);
  };

  const handleDelete = async (id) => {
    await API("DELETE", URL_API + `/api/v1/questions/${id}`, null, token)
      .then((res) => {
        CustomizedToast({
          message: "Cập nhập trạng thái thành công",
          type: "SUCCESS",
        });
        dispath(getFormId(formId, token));
        // handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Dialog
        fullWidth
        maxWidth="md"
        open={view}
        onClose={handleClose}
        PaperProps={{
          style: {
            height: "100%", // Chiều cao của dialog bằng 100% màn hình
            width: "100%", // Chiều rộng của dialog bằng 100% màn hình
          },
        }}
      >
        <DialogTitle>
          <PageHeader
            title="Xem thông tin chi tiết câu hỏi "
            subTitle="Thông tin chi tiết của biếu mẫu"
            icon={getIcon("carbon:view-filled")}
          />
        </DialogTitle>
        <DialogContent>
          {formByid.questions?.length === 0 ? (
            <>
              <Card sx={{ maxWidth: 900, mb: 2 }}>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {formByid.name}
                  </Typography>
                  <FormControl component="fieldset">
                    <Typography>Người tạo - {formByid.userId}</Typography>
                  </FormControl>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              {formByid.questions?.map((question) => (
                <Card key={question.questionId} sx={{ maxWidth: 900, mb: 2 }}>
                  <CardContent>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#B83490",
                        fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                      }}
                    >
                      Tên câu hỏi: {question.content}
                      <IconButton
                        sx={{
                          display: "inline",
                          top: "2px",
                          left: "2rem",
                          color: "#B83490",
                        }}
                        onClick={() => handleEditQuestion(question.questionId)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        sx={{
                          display: "inline",
                          top: "2px",
                          left: "2rem",
                          color: "#B83490",
                        }}
                        onClick={() => handleDelete(question.questionId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Typography>

                    <FormControl component="fieldset">
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          width: "fit-content",
                        }}
                      >
                        <Typography
                          variant="h4"
                          fontWeight="bold"
                          sx={{
                            color: "#B83490",
                            fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
                          }}
                        >
                          {question.typeId === "283a18e0-6d3b-4f71-83de-aa79513a3cd7" ? (
                            <Typography
                              variant="h5"
                              component="h2"
                              sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                width: "fit-content",
                              }}
                            >
                              Bình chọn 1 câu trả lời
                            </Typography>
                          ) : question.typeId === "285a18e0-6d3b-4f71-83de-aa79513a3cd7" ? (
                            <Typography
                              variant="h5"
                              component="h2"
                              sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                width: "fit-content",
                              }}
                            >
                              Bình chọn nhiều câu trả lời
                            </Typography>
                          ) : (
                            <Typography
                              variant="h5"
                              component="h2"
                              sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                width: "fit-content",
                              }}
                            >
                              Bình chọn sao
                            </Typography>
                          )}
                        </Typography>
                      </Box>
                      <Grid container spacing={3}>
                        {question.typeId === "284a18e0-6d3b-4f71-83de-aa79513a3cd7" ? (
                          <div style={{ marginTop: "1rem" }}>
                            {question.elements
                              ?.map((answer) => {
                                // Trích xuất số từ chuỗi "3 star" và tạo đối tượng chứa số sao và số điểm
                                const starRating = parseInt(answer.answer.split(" ")[0]);
                                return { starRating, rate: answer.rate };
                              })
                              .sort((a, b) => a.starRating - b.starRating) // Sắp xếp mảng sao từ bé đến lớn
                              .map((answer, index) => (
                                <div key={index}>
                                  <Rating
                                    name="rating"
                                    readOnly
                                    value={answer.starRating}
                                    style={{ width: "10rem", fontSize: "2.5rem" }}
                                  />
                                  <Typography>Điểm: {answer.rate}</Typography>
                                </div>
                              ))}
                          </div>
                        ) : (
                          question.elements?.map((answer, index) => (
                            <Grid item xs={6} key={index}>
                              <FormControlLabel
                                value={answer.answer}
                                control={<Radio />}
                                label={answer.answer}
                              />
                              <Typography>Điểm: {answer.rate}</Typography>
                            </Grid>
                          ))
                        )}
                      </Grid>
                    </FormControl>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </DialogContent>
      </Dialog>
      <UpdateQuestion
        OpenEditCandidate={OpenUpdate}
        SetOpenEditCandidate={SetOpenUpdate}
        id={idQuestion}
        formId={formId}
      />
    </Container>
  );
}
