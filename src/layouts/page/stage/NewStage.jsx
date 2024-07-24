import React, { useState } from "react";
import { Box, Button, styled, Typography, IconButton, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { CustomizedToast } from "components/toast/ToastCustom";
import { callAPIgetListForm } from "context/redux/action/action";
import API from "config/axios/API/API";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { URL_API } from "config/axios/Url/URL";
import StepButton from "@mui/material/StepButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CreateState from "./CreateState";
import AddForm from "./AddForm";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";
import moment from "moment/moment";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";

export default function NewStage() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [content, setContent] = useState();
  const [limitVoter, setlimitVoter] = useState();

  const Navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  if (token === null) {
    Navigate("/");
  }

  const [endTime, setEndTime] = useState(new Date());

  const [startTime, setStartTime] = useState(new Date());

  const [activeStep, setActiveStep] = React.useState(0);

  const [completed, setCompleted] = React.useState({});

  const steps = getSteps();

  const totalSteps = () => {
    return steps.length;
  };

  function getSteps() {
    return ["Thông tin cơ bản", "Chọn biểu mẫu", "Xác nhận thông tin"];
  }

  const handleSubmitForm = async () => {
    const data = {
      title: title,
      description: description,
      content: content,
      startTime: moment(startTime, "YYYY-MM-DD HH:mm:ss").subtract(-7, "hours"),
      endTime: moment(endTime, "YYYY-MM-DD HH:mm:ss").subtract(-7, "hours"),
      campaignId: id,
      limitVote: limitVoter,
      formId: localStorage.getItem("formID"),
    };

    try {
      const res = await API("POST", URL_API + "/api/v1/stages", data, token);
      CustomizedToast({
        message: `Đã tạo thành công ${title}`,
        type: "SUCCESS",
      });
      localStorage.removeItem("formID");
      localStorage.removeItem("name");
      setTitle("");
      setContent("");
      setlimitVoter("");
      setDescription("");
      setEndTime();
      setStartTime();
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
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <CreateState
            title={title}
            description={description}
            setDescription={setDescription}
            content={content}
            limitVoter={limitVoter}
            setTitle={setTitle}
            setEndTime={setEndTime}
            endTime={endTime}
            startTime={startTime}
            setStartTime={setStartTime}
            setlimitVoter={setlimitVoter}
            setContent={setContent}
          />
        );
      case 1:
        return <AddForm />;
      case 2:
        return (
          <>
            <Paper sx={{ mt: 4 }}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="h5" gutterBottom mt={2}>
                  Vui lòng xác nhận lại thông tin
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Tiêu đề : {title}
                </Typography>

                <Typography variant="body1" gutterBottom>
                  Nội dung: {content}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Giới hạn phiếu: {limitVoter}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Mô tả: {description}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Biễu mẫu: {localStorage.getItem("name")}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Thời gian bắt đầu: {startTime?.toLocaleDateString()}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Thời gian kết thúc: {endTime?.toLocaleDateString()}
                </Typography>
                <Box sx={{ marginTop: 2, m: 2 }}>
                  <ButtonLangding
                    width="10rem"
                    nameButton="Xác nhận"
                    bgColor="#FFA500"
                    hovercolor="#F7941D"
                    onClick={() => {
                      handleSubmitForm();
                    }}
                  />
                </Box>
              </Box>
            </Paper>
          </>
        );
        break;
      default:
        return "Unknown step";
    }
  }

  const useStyles = styled((theme) => ({
    root: {
      width: "100%",
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  React.useEffect(() => {
    const getlistForm = async () => {
      await dispatch(callAPIgetListForm(token));
    };
    getlistForm();
  }, [dispatch, token]);

  const form = useSelector((state) => {
    return state.form;
  });

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          getSteps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (steps) => () => {
    setActiveStep(steps);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const formik = useFormik({
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      title: "",
      description: "",
      content: "",
      campaignId: "",
      formId: "",
    },

    onSubmit: async (values) => {
      const data = {
        title: formik.values.title,
        description: formik.values.description,
        content: formik.values.content,
        startTime: startTime,
        endTime: endTime,
        campaignId: id,
        formId: formik.values.formId,
      };

      try {
        const res = await API("POST", URL_API + "/api/v1/stages", data, token);
        CustomizedToast({
          message: `Đã tạo thành công ${formik.values.title}`,
          type: "SUCCESS",
        });
      } catch (error) {
        if (error.response.data.statusCode === 400) {
          CustomizedToast({
            message: `${error.response.data.message}`,
            type: "ERROR",
          });
        } else {
          CustomizedToast({
            message: `Tạo không thành công`,
            type: "ERROR",
          });
        }
        // CustomizedToast({
        //   message: `Tạo không thành công`,
        //   type: "ERROR",
        // });
      }
    },
  });

  return (
    <div className={classes.root}>
      <Box sx={{ width: "100%" }}>
        <Stepper
          center
          nonLinear
          activeStep={activeStep}
          sx={{
            width: "100%",
            ".MuiStepConnector-root": {
              top: 2,
            },
            ".MuiStepConnector-root span": {
              borderColor: "transparent",
            },
            ".MuiStepConnector-root span::before": {
              display: "flex",
              justifyContent: "center",
              content: '"❯"',
            },
            ".MuiSvgIcon-root": {
              borderRadius: "50%",
              border: "1px solid #1976d2",
            },
            ".MuiSvgIcon-root:not(.Mui-completed)": {
              color: "#fff",
            },
            ".MuiStepIcon-text": {
              fill: "#1976d2",
              fontWeight: "90%",
            },
            ".MuiSvgIcon-root.Mui-active": {
              color: "#FFCC32",
              padding: "3px",
              borderRadius: "50%",
              border: "1px solid #ffee32",
              marginY: "-3px",
            },
            ".Mui-active .MuiStepIcon-text": {
              fill: "white",
            },
            ".MuiStepIcon-root.Mui-completed": {
              color: "#FFCC32",
              border: "1px solid #ffee32",
            },
          }}
        >
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="red" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div style={{ width: "10%" }}>
                  {activeStep > 0 && (
                    <IconButton onClick={handleBack} sx={{ width: 80, height: 80 }}>
                      <ArrowBackIosNewIcon sx={{ fontSize: 80 }} />
                    </IconButton>
                  )}
                </div>
                <div style={{ width: "80%" }}>
                  <Typography className={classes.instructions} style={{ textAlign: "center" }}>
                    {getStepContent(activeStep)}
                  </Typography>
                </div>
                <div style={{ width: "10%", marginLeft: "4rem" }}>
                  {activeStep < 2 && (
                    <IconButton onClick={handleNext} sx={{ width: 80, height: 80 }}>
                      <ArrowForwardIosIcon sx={{ fontSize: 80 }} color="red" />
                    </IconButton>
                  )}
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </Box>
    </div>
  );
}
