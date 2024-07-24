import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import { Rating } from "@mui/material";
import jwt_decode from "jwt-decode";
import { CustomizedToast } from "components/toast/ToastCustom";
import API from "config/axios/API/API";
import { URL_API } from "config/axios/Url/URL";
import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";
import Select from "components/Control/Select";

const QuestionForm = (props) => {
  const token = localStorage.getItem("token");
  const detoken = jwt_decode(token);

  const getTypeQuestion = () => [
    {
      id: "283a18e0-6d3b-4f71-83de-aa79513a3cd7",
      title: "Bình chọn 1 câu trả lời",
      nametitle: "Bình chọn 1 câu trả lời",
    },
    {
      id: "284a18e0-6d3b-4f71-83de-aa79513a3cd7",
      title: "Bình chọn sao",
      nametitle: "Bình chọn sao",
    },
    {
      id: "285a18e0-6d3b-4f71-83de-aa79513a3cd7",
      title: "Bình chọn nhiều câu trả lời",
      nametitle: "Loại câu hỏi",
    },
  ];

  const [formData, setFormData] = useState({
    formId: props.formId,
    listQuestion: [
      {
        content: "",
        typeId: "",
        element: [
          {
            answer: "",
            score: 0,
          },
        ],
      },
    ],
  });

  const addQuestion = () => {
    const newQuestion = {
      content: "",
      typeId: "",
      element: [
        {
          answer: "",
          score: 0,
        },
      ],
    };
    const updatedFormData = { ...formData };
    updatedFormData.listQuestion.push(newQuestion);
    setFormData(updatedFormData);
  };

  const handleQuestionTypeChange = (questionIndex, value) => {
    const updatedFormData = { ...formData };
    updatedFormData.listQuestion[questionIndex].typeId = value;
    if (value === "Câu hỏi chọn sao") {
      updatedFormData.listQuestion[questionIndex] = [
        {
          score: 0,
        },
      ];
    } else {
      updatedFormData.listQuestion[questionIndex].element = [
        {
          answer: "",
          score: 0,
        },
      ];
    }
    setFormData(updatedFormData);
  };

  const addAnswer = (questionIndex) => {
    const updatedFormData = { ...formData };
    updatedFormData.listQuestion[questionIndex].element.push({ answer: "", score: 0 });
    setFormData(updatedFormData);
  };

  const handleQuestionChange = (questionIndex, value) => {
    const updatedFormData = { ...formData };
    updatedFormData.listQuestion[questionIndex].content = value;
    setFormData(updatedFormData);
  };

  const handleAnswerChange = (questionIndex, answerIndex, value) => {
    const updatedFormData = { ...formData };
    updatedFormData.listQuestion[questionIndex].element[answerIndex].answer = value;
    setFormData(updatedFormData);
  };

  const handleScoreChange = (questionIndex, answerIndex, value) => {
    const updatedFormData = { ...formData };
    updatedFormData.listQuestion[questionIndex].element[answerIndex].score = value;
    setFormData(updatedFormData);
  };
  const handleScoreChange1 = (questionIndex, value) => {
    const updatedFormData = { ...formData };
    updatedFormData.listQuestion[questionIndex].score = value;
    setFormData(updatedFormData);
  };

  const handleSubmit = async () => {
    try {
      const res = await API("POST", URL_API + `/api/v1/questions/elements`, formData, token);
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
  };

  return (
    <div>
      {formData.listQuestion.map((question, questionIndex) => (
        <div key={questionIndex} style={{ marginBottom: "10px", marginTop: "1rem" }}>
          {/* <Select
            sx={{ marginBottom: "1rem", marginTop: "2rem" }}
            label="Loại câu hỏi"
            defaultValue=""
            value={question.typeId}
            onChange={(e) => handleQuestionTypeChange(questionIndex, e.target.value)}
          >
            {questionTypes.map((type, index) => (
              <MenuItem key={index} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select> */}

          <Select
            sx={{ marginBottom: "10px", width: "15rem" }}
            name="categoryId"
            required
            label="Loại câu hỏi"
            onChange={(e) => handleQuestionTypeChange(questionIndex, e.target.value)}
            options={getTypeQuestion()}
          />
          <br></br>
          <TextField
            sx={{ marginBottom: "10px", marginTop: "0px", width: "20rem" }}
            label="Câu hỏi"
            value={question.content}
            onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
          />
          {question.element.map((answer, answerIndex) => (
            <div key={answerIndex} style={{ marginBottom: "10px", gap: "2rem" }}>
              {question.typeId === "284a18e0-6d3b-4f71-83de-aa79513a3cd7" ? (
                <div>
                  <Rating
                    name="rating"
                    readOnly
                    value={5}
                    style={{ width: "10rem", fontSize: "3rem" }}
                  />
                  <TextField
                    style={{ width: "5rem", marginLeft: "5rem" }}
                    label="Điểm"
                    type="number"
                    onChange={(e) => handleScoreChange1(questionIndex, e.target.value)}
                  />
                </div>
              ) : (
                <>
                  <TextField
                    style={{ width: "20rem" }}
                    label="Câu trả lời"
                    value={answer.answer}
                    onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e.target.value)}
                  />
                  <TextField
                    style={{ width: "5rem", marginLeft: "5rem" }}
                    label="Điểm"
                    type="number"
                    value={answer.score}
                    onChange={(e) => handleScoreChange(questionIndex, answerIndex, e.target.value)}
                  />
                </>
              )}
            </div>
          ))}
          <Box>
            <ButtonCustomize
              width="10rem"
              variant="contained"
              onClick={() => addAnswer(questionIndex)}
              nameButton="Thêm câu trả lời"
            />
          </Box>
        </div>
      ))}
      <Box width={1}>
        <ButtonCustomize
          width="10rem"
          variant="contained"
          onClick={addQuestion}
          nameButton=" Thêm câu hỏi"
        />
      </Box>
      <Box mt={2}>
        <ButtonCustomize
          width="10rem"
          variant="contained"
          bgColor="#FFA500"
          hovercolor="#F7941D"
          nameButton="Lưu câu hỏi"
          onClick={handleSubmit}
        />
      </Box>
      {/* <Typography variant="body1">Dữ liệu câu hỏi và câu trả lời:</Typography> */}
      {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
    </div>
  );
};

export default QuestionForm;
