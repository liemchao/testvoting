import { CardActions, Dialog, DialogContent, DialogTitle, Paper } from "@mui/material";
import Iconify from "assets/theme/components/icon/Iconify";
import PageHeader from "components/Layout/PageHeader";
import { Authen } from "context/authenToken/AuthenToken";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Checkbox from "@mui/joy/Checkbox";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "components/Control/Select";
import { URL_API } from "config/axios/Url/URL";
import API from "config/axios/API/API";
import { CustomizedToast } from "components/toast/ToastCustom";
import { getCandidateID } from "context/redux/action/action";
import jwt_decode from "jwt-decode";
import { getActivity } from "context/redux/action/action";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
export default function NewActive(props) {
  const { open, setOpen } = props;
  const dispath = useDispatch();
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const [activityId, setActivityId] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    const callAPI = async () => {
      await dispath(getCandidateID(decoded.Username, token));
    };
    callAPI();
  }, [dispath, token]);

  const candidateId = useSelector((state) => {
    return state.candidateId;
  });

  const getTypeActivy = () => [
    {
      id: "09f3d562-b33d-48df-b094-859060fb27a6",
      title: "Phong cách",
      nametitle: "Phong cách",
    },
    {
      id: "62737f1d-b959-4c57-ae8a-cb208ee98681",
      title: "Sở thích",
      nametitle: "Sở thích",
    },
    {
      id: "1accf43f-a46f-45ae-8f06-f647bc2ef77b",
      title: "Kinh nghiệm làm việc",
      nametitle: "Kinh nghiệm làm việc",
    },
  ];

  const createActivity = async () => {
    const activityData = {
      activityId: activityId,
      content: content,
      candidateId: candidateId,
    };

    try {
      const res = await API("POST", URL_API + `/api/v1/activitys`, activityData, token);
      if (res) {
        CustomizedToast({
          message: "Thêm thông tin thành công",
          type: "SUCCESS",
        });
      }
      await dispath(getActivity(decoded.Username, token));
    } catch (error) {
      CustomizedToast({
        message: "Thêm thông tin thất bại",
        type: "ERROR",
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Paper>
      <Dialog maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle></DialogTitle>
        <DialogContent>
          <Card
            variant="outlined"
            sx={{
              maxHeight: "max-content",
              maxWidth: "100%",
              mx: "auto",
              // to make the demo resizable
              overflow: "auto",
              resize: "horizontal",
            }}
          >
            <Typography level="h2" fontSize="xl" startDecorator={<InfoOutlined />}>
              Chỉnh sửa hồ sơ cá nhân
            </Typography>
            <Divider inset="none" />
            <CardContent
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
                gap: 1.5,
              }}
            >
              <FormControl sx={{ gridColumn: "1/-1" }}>
                <Select
                  sx={{ marginBottom: "10px", width: "15rem" }}
                  name="categoryId"
                  required
                  label="Trường thông tin"
                  onChange={(e) => setActivityId(e.target.value)}
                  options={getTypeActivy()}
                />
                <Input
                  sx={{ marginBottom: "10px", width: "15rem" }}
                  required
                  variant="outlined"
                  name="content"
                  label="Nội dung"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </FormControl>
              <CardActions>
                <ButtonLangding
                  nameButton="Thêm"
                  variant="solid"
                  color="primary"
                  sx={{ justifySelf: "center" }}
                  onClick={createActivity}
                ></ButtonLangding>
              </CardActions>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
