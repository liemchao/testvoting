import { Box, Grid, Paper, IconButton, colors, Stack, Typography } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PageHeader from "components/Layout/PageHeader";
import { Authen } from "context/authenToken/AuthenToken";
import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "context/redux/action/action";
import { CustomizedToast } from "components/toast/ToastCustom";
import API from "config/axios/API/API";
import { URL_API } from "config/axios/Url/URL";
import { useParams } from "react-router-dom";
import { handleGetCandidateByIdCampaign } from "context/redux/action/action";
import Iconify from "assets/theme/components/icon/Iconify";
import jwt_decode from "jwt-decode";
import { useFormik } from "formik";
import * as yup from "yup";
import Input from "components/Control/Input";
import Select from "components/Control/Select";
import { getGroupId } from "context/redux/action/action";
import { getCampaignRatio } from "context/redux/action/action";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";
import Label from "components/label/Label";
import { AddGroup } from "components/Popup/create/AddGroup";
import { UpdateRatio } from "components/Popup/updatePopup/updateRatio";
import { UpdateDescriptionGroup } from "components/Popup/updatePopup/updateDescriptGroup";

const schema = yup.object().shape({});
const getIcon = (name, color) => <Iconify icon={name} width={22} height={22} color={color} />;

const LeftCard = () => {
  const dispacth = useDispatch();
  const { token } = useContext(Authen);
  const { id } = useParams();
  const decode = jwt_decode(token);
  const [OpenPopUp, SetOpenPopUp] = useState(false);
  const [OpenUpdate, SetOpenUpdate] = useState(false);
  const [name, setName] = useState();
  const [idgroup, setidGroup] = useState();

  useEffect(() => {
    const callAPI = async () => {
      await dispacth(getGroupId(id, token));
    };
    callAPI();
  }, [dispacth, token]);

  const listRatio = useSelector((state) => {
    return state.listGroup;
  });

  const listWithCount = listRatio.map((item, index) => {
    return { ...item, count: index + 1 };
  });

  const handleClickOpen = useCallback(() => {
    SetOpenPopUp(true);
  }, []);
  const handleUpdate = useCallback((id, name) => {
    setidGroup(id);
    setName(name);
    SetOpenUpdate(true);
  }, []);

  return (
    <Paper maxWidth="md">
      <PageHeader
        title="Danh sách nhóm trong chiến dịch"
        subTitle="Các nhóm có trong chiến dịch này"
      />
      <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={1} marginRight={2}>
        <ButtonLangding
          nameButton="Thêm nhóm"
          bgColor="#FFA500"
          hovercolor="#F7941D"
          onClick={() => {
            handleClickOpen();
          }}
        />
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Stt</TableCell>
              <TableCell>Tên nhóm</TableCell>
              <TableCell>Loại nhóm</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Chỉnh sửa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listWithCount.map((item, index) => (
              <TableRow key={item.groupId}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                {/* <TableCell content="center">{item.proportion}</TableCell> */}
                <TableCell align="left">
                  <div>
                    {item.isVoter === false && (
                      // <Alert severity="warning">inActive</Alert>
                      <Label color="success">Nhóm ứng cử viên</Label>
                    )}
                    {item.isVoter === true && (
                      // <Alert severity="info">waiting</Alert>
                      <Label color="warning">Nhóm bình chọn</Label>
                    )}
                  </div>
                </TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  {
                    <IconButton
                      onClick={() => {
                        handleUpdate(item.groupId, item.name);
                      }}
                    >
                      {getIcon("ic:baseline-edit")}
                    </IconButton>
                  }
                </TableCell>

                {/* <TableCell>
                  {
                    <IconButton onClick={() => handleRemoveItem(item.candidateId)}>
                      {getIcon("ic:baseline-delete")}
                    </IconButton>
                  }
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddGroup OpenPopUp={OpenPopUp} SetOpenPopUp={SetOpenPopUp} id={id} />
      <UpdateDescriptionGroup
        OpenPopUp={OpenUpdate}
        SetOpenPopUp={SetOpenUpdate}
        id={idgroup}
        name={name}
      />
    </Paper>
  );
};
const RightTable = () => {
  const dispacth = useDispatch();
  const { token } = useContext(Authen);
  const { id } = useParams();
  const decode = jwt_decode(token);
  const [OpenUpdate, SetOpenUpdate] = useState(false);

  useEffect(() => {
    const callAPI = async () => {
      await dispacth(getCampaignRatio(id, token));
    };
    callAPI();
  }, [dispacth, token]);

  const listRatio = useSelector((state) => {
    return state.listRatio;
  });

  const listWithCount = listRatio.map((item, index) => {
    return { ...item, count: index + 1 };
  });

  const handleUpdateRatio = useCallback(() => {
    SetOpenUpdate(true);
  }, []);

  const handleRemoveItem = async (idCandiate) => {
    const data = {
      userId: decode.Username,
      campaignId: id,
    };
    try {
      const res = await API("DELETE", URL_API + `/api/v1/candidates/${idCandiate}`, data, token);
      CustomizedToast({
        message: "Xóa ứng cử viên thành công",
        type: "SUCCESS",
      });
      dispacth(handleGetCandidateByIdCampaign(id));
    } catch (error) {
      CustomizedToast({
        message: "Xóa ứng cử viên không thành công",
        type: "ERROR",
      });
    }
  };

  return (
    <Paper maxWidth="md">
      <PageHeader
        title="Danh sách trọng số trong chiến dịch"
        subTitle="Các trọng số có trong chiến dịch này"
        icon={getIcon("material-symbols:percent", "#151719")}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Stt</TableCell>
              <TableCell>Nhóm người bình chọn</TableCell>
              <TableCell>Trọng số</TableCell>
              <TableCell>Nhóm ứng cử viên</TableCell>
              <TableCell>Chỉnh sửa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listWithCount.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.count}</TableCell>
                <TableCell>{item.groupNameOfVoter}</TableCell>
                <TableCell content="center">{item.proportion}</TableCell>
                <TableCell>{item.groupNameOfCandidate}</TableCell>
                <TableCell>
                  {
                    <IconButton
                      onClick={() => {
                        handleUpdateRatio();
                      }}
                    >
                      {getIcon("ic:baseline-edit")}
                    </IconButton>
                  }
                </TableCell>

                {/* <TableCell>
                  {
                    <IconButton onClick={() => handleRemoveItem(item.candidateId)}>
                      {getIcon("ic:baseline-delete")}
                    </IconButton>
                  }
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UpdateRatio OpenPopUp={OpenUpdate} SetOpenPopUp={SetOpenUpdate} id={id} />
    </Paper>
  );
};
export default function AddNewPercent() {
  const dispacth = useDispatch();
  const { token } = useContext(Authen);
  const { id } = useParams();
  useEffect(() => {
    const callAPI = async () => {
      await dispacth(getGroupId(id, token));
      await dispacth(getCampaignRatio(id, token));
    };
    callAPI();
  }, [dispacth]);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={5}>
        <LeftCard />
      </Grid>
      <Grid item xs={12} sm={7}>
        <RightTable />
      </Grid>
    </Grid>
  );
}
