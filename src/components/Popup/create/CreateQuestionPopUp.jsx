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
// } from "@mui/material";
// import React, { useContext, useEffect, useState } from "react";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";

// import PageHeader from "components/Layout/PageHeader";
// import Iconify from "assets/theme/components/icon/Iconify";
// import ListQuestion from "layouts/page/user/Form/Voter/List Question/ListQuetion";
// import { useDispatch, useSelector } from "react-redux";
// import { Authen } from "context/authenToken/AuthenToken";
// import API from "config/axios/API/API";
// import { URL_API } from "config/axios/Url/URL";
// import { CustomizedToast } from "components/toast/ToastCustom";

// const schema = yup.object().shape({});

// const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

// const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
// const checkedIcon = <CheckBoxIcon fontSize="small" />;
// //hih
// export default function QuestionPopUp(props) {
//   const { OpenPopUp, SetOpenPopUp } = props;
//   const [answer, setAnswer] = useState([]);
//   const { decode, token } = useContext(Authen);
//   const handleClose = () => {
//     SetOpenPopUp(false);
//   };

//   const listQuestion = useSelector((state) => {
//     return state.question;
//   });

//   const getID = () => {
//     useEffect(() => {}, []);
//   };
//   getID();

//   const formik = useFormik({
//     validationSchema: schema,
//     validateOnMount: true,
//     validateOnBlur: true,
//     //   initialValues: {
//     //     ratioGroupId: "",
//     //     userId: "",
//     //     candidateId: "",
//     //     stageId: idState,
//     //     votingDetail: [],
//     //   },
//     onSubmit: async (values) => {
//       const data = {
//         ratioGroupId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         userId: decode.Username,
//         candidateId: campaignId,
//         stageId: idState,
//         votingDetail: answer,
//       };
//       try {
//         const req = await API("POST", URL_API + `/api/v1/vote`, data, token);
//         CustomizedToast({
//           message: "Bình chọn thành công",
//           type: "SUCCESS",
//         });
//       } catch (error) {
//         if (error.response.data.statusCode === 404) {
//           CustomizedToast({
//             message: `${error.response.data.message}`,
//             type: "ERROR",
//           });
//         } else if (error.response.data.statusCode === 400) {
//           CustomizedToast({
//             message: `${error.response.data.message}`,
//             type: "ERROR",
//           });
//         } else {
//           CustomizedToast({
//             message: "Lỗi mạng",
//             type: "ERROR",
//           });
//         }
//       }
//     },
//   });

//   return (
//     <Paper>
//       <Dialog maxWidth="md" open={OpenPopUp} onClose={handleClose}>
//         <DialogTitle>
//           <PageHeader
//             title="Tạo mới các câu hỏi"
//             subTitle="Lựa chọn các câu hỏi phù hio75"
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
//                       {item.title}
//                     </Typography>

//                     <Typography variant="body1" color="text.secondary">
//                       <FormControl>
//                         <RadioGroup
//                           aria-labelledby="demo-radio-buttons-group-label"
//                           defaultValue="female"
//                           name="radio-buttons-group"
//                         >
//                           {item.element.map((i) => {
//                             return (
//                               <>
//                                 <FormControlLabel
//                                   value={i.elementId}
//                                   control={<Radio />}
//                                   id={item.questionId}
//                                   label={i.content}
//                                   onChange={(e) => {
//                                     hanldeCheck(e, i.elementId);
//                                   }}
//                                 />
//                               </>
//                             );
//                           })}
//                         </RadioGroup>
//                       </FormControl>
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               );
//             })}
//             <Button
//               variant="contained"
//               sx={{
//                 marginTop: 2,

//                 float: "right",
//               }}
//               type="submit"
//             >
//               Summbit
//             </Button>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </Paper>
//   );
// }
