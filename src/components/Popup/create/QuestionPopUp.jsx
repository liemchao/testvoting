// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   Grid,
//   Paper,
//   Button,
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   FormControl,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   Checkbox,
//   Rating,
//   FormGroup,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";

// import PageHeader from "components/Layout/PageHeader";
// import Iconify from "assets/theme/components/icon/Iconify";
// import { useDispatch, useSelector } from "react-redux";
// import API from "config/axios/API/API";
// import { URL_API } from "config/axios/Url/URL";
// import { CustomizedToast } from "components/toast/ToastCustom";
// import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";

// import jwt_decode from "jwt-decode";
// import { handleGetQuestByIdCampaign } from "context/redux/action/action";
// import ButtonLangding from "assets/theme/components/button/ButtonLangding";
// import { getScorebyStage } from "context/redux/action/action";

// const schema = yup.object().shape({});

// //geticon link https://icon-sets.iconify.design/
// const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

// export default function QuestionPopUp(props) {
//   const { OpenPopUp, SetOpenPopUp, IdCanidate, IdStage, idform } = props;
//   const dispatch = useDispatch();
//   const [answer, setAnswer] = useState([]);
//   console.log("🚀 ~ file: QuestionPopUp.jsx:53 ~ QuestionPopUp ~ answer:", answer);
//   const [value, setValue] = React.useState(0);

//   const token = localStorage.getItem("token");
//   const decode = jwt_decode(token);
//   const [submitTime, setStartTime] = useState(new Date());

//   const handleClose = () => {
//     SetOpenPopUp(false);
//   };

//   useEffect(() => {
//     const callAPI = async () => {
//       await dispatch(handleGetQuestByIdCampaign(idform, token));
//     };
//     callAPI();
//   }, [dispatch, idform]);

//   const listQuestion = useSelector((state) => {
//     return state.question;
//   });

//   const hanldeCheck = (e, elementId) => {
//     const checked = e.target.checked;
//     setAnswer(elementId);
//   };

//   const [star, setStar] = useState([]);

//   const label = { inputProps: { "aria-label": "Checkbox demo" } };
//   return (
//     <Paper>
//       <Dialog maxWidth="md" open={OpenPopUp} onClose={handleClose}>
//         <DialogTitle>
//           <PageHeader
//             title="Trả lời các câu hỏi"
//             subTitle=" Chọn ra các tiêu chí cho ứng cử viên"
//             icon={getIcon("ph:question-bold")}
//           />
//         </DialogTitle>
//         <DialogContent>
//           <form onSubmit={formik.handleSubmit}>
//             {listQuestion.map((item) => {
//               return (
//                 <Card sx={{ maxHeight: 345, marginTop: "10px" }}>
//                   <CardContent>
//                     <Typography gutterBottom variant="h3" component="div">
//                       {item.content}
//                     </Typography>
//                     {item.typeName === "Bình chọn 1 câu trả lời" && (
//                       <Typography variant="body1" color="text.secondary">
//                         <FormControl>
//                           <RadioGroup
//                             aria-labelledby="demo-radio-buttons-group-label"
//                             name="radio-buttons-group"
//                           >
//                             {item.element.map((i, index) => {
//                               return (
//                                 <FormControlLabel
//                                   key={index}
//                                   value={i.elementId}
//                                   control={<Radio />}
//                                   id={item.questionId}
//                                   label={i.answer}
//                                   onChange={(e) => {
//                                     hanldeCheck(e, i.elementId);
//                                   }}
//                                 />
//                               );
//                             })}
//                           </RadioGroup>
//                         </FormControl>
//                       </Typography>
//                     )}

//                     {item.typeName === "Bình chọn sao" && (
//                       <Typography variant="body1" color="text.secondary">
//                         <Rating
//                           name="simple-controlled"
//                           value={value}
//                           onChange={(event, newValue) => {
//                             const selectedIds = [];
//                             if (item && item.element) {
//                               for (let index = 0; index < item.element.length; index++) {
//                                 if (index < newValue) {
//                                   selectedIds.push(item.element[index].elementId);
//                                 }
//                               }
//                             }
//                             setStar(selectedIds);
//                             setAnswer(star[star.length - 1]);
//                             setValue(newValue);
//                           }}
//                         />
//                       </Typography>
//                     )}
//                     {item.typeName === "Bình chọn nhiều câu trả lời" && (
//                       <Typography variant="body1" color="text.secondary">
//                         <FormControl>
//                           <FormGroup>
//                             {item.element.map((i) => {
//                               return (
//                                 <FormControlLabel
//                                   value={i.elementId}
//                                   control={<Checkbox />}
//                                   id={item.questionId}
//                                   label={i.answer}
//                                   onChange={(e) => {
//                                     hanldeCheck(e, i.elementId);
//                                   }}
//                                 />
//                               );
//                             })}
//                           </FormGroup>
//                         </FormControl>
//                       </Typography>
//                     )}
//                   </CardContent>
//                 </Card>
//               );
//             })}
//             <div style={{ marginTop: 1 }}></div>
//             <ButtonLangding nameButton="Gửi" bgColor="#FFA500" hovercolor="#F7941D" type="submit" />
//           </form>
//         </DialogContent>
//       </Dialog>
//     </Paper>
//   );
// }
