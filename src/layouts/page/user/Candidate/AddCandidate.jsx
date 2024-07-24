import { Avatar, Grid, Paper, IconButton } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PageHeader from "components/Layout/PageHeader";
import { Authen } from "context/authenToken/AuthenToken";
import { useDispatch, useSelector } from "react-redux";
import { CustomizedToast } from "components/toast/ToastCustom";
import API from "config/axios/API/API";
import { URL_API } from "config/axios/Url/URL";
import { useParams } from "react-router-dom";
import { handleGetCandidateByIdCampaign } from "context/redux/action/action";
import Iconify from "assets/theme/components/icon/Iconify";
import NewAccount from "components/Popup/create/NewAccount";
import jwt_decode from "jwt-decode";
import { getGroupId } from "context/redux/action/action";
import { Box } from "@mui/joy";
import Select from "components/Control/Select";
import UpdateCandidate from "components/Popup/updatePopup/UpdateCandidate";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";
import { getAccount } from "context/redux/action/action";
import Input from "components/Control/Input";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const LeftCard = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [tableData, setTableData] = useState([]);
  const dispacth = useDispatch();
  const { token } = useContext(Authen);
  const { id } = useParams();
  const [newAccountCandidate, setAccountNewCandidate] = useState(false);
  const [selectedGroupIds, setSelectedGroupIds] = useState({});

  useEffect(() => {
    const callAPI = async () => {
      await dispacth(getAccount(token));
      await dispacth(getGroupId(id, token));
    };
    callAPI();
  }, [dispacth, token]);

  const users = useSelector((state) => {
    return state.account;
  });
  const listGroup = useSelector((state) => {
    return state.listGroup;
  });

  const getGroupOption = () => {
    const GroupOption = [];
    for (var i = 0; i < listGroup.length; i++) {
      if (listGroup[i].isVoter === false) {
        GroupOption.push({
          id: listGroup[i].name,
          title: listGroup[i].name,
        });
      }
    }
    return GroupOption;
  };

  const handleSearchInputChange = (event, value) => {
    const input = event.target.value;
    setSearchInput(input);
    if (input === "") {
      setTableData([]);
      return;
    }
    if (users) {
      const filteredUsers = users.filter(
        (user) => user.fullName && user.fullName.toLowerCase().includes(input.toLowerCase())
      );
    }
    handleItemSelected(null, value);
  };
  const handleClickNewAccontCandidate = useCallback((id) => {
    setAccountNewCandidate(true);
  }, []);

  const handleItemSelected = (event, value) => {
    if (value) {
      setSelectedItems([...selectedItems, value]);
      setSearchInput("");
    } else {
      setSearchInput("");
    }
    setTableData([]);
  };

  const handleRemoveItem = (userName) => {
    const index = selectedItems.findIndex((item) => item.userName === userName);
    if (index > -1) {
      const newSelectedItems = [...selectedItems];
      newSelectedItems.splice(index, 1);
      setSelectedItems(newSelectedItems);
    }
  };

  const handleGroupChange = (accountId, groupId) => {
    setSelectedGroupIds((prevGroupIds) => ({
      ...prevGroupIds,
      [accountId]: groupId,
    }));
  };

  const handleSave = async () => {
    const listUser = selectedItems.map((item) => {
      const accountId = item.userName;
      const groupId = selectedGroupIds[accountId]; // Lấy groupid tương ứng với accountId
      return {
        groupName: groupId,
        userId: item.userName,
      };
    });

    const data = {
      campaignId: id,
      listUser: listUser,
    };

    try {
      const res = await API("POST", URL_API + "/api/v1/candidates", data, token);
      CustomizedToast({
        message: "Thêm ứng cử viên thành công",
        type: "SUCCESS",
      });
      await dispacth(handleGetCandidateByIdCampaign(token, id));
    } catch (error) {
      CustomizedToast({
        message: `${error.response.data.message}`,
        type: "ERROR",
      });
    }
  };
  return (
    <Paper maxWidth="md">
      <PageHeader
        title="Thêm những ứng cử viên"
        subTitle="Hãy chọn ứng cử viên cho chiến dịch của bạn"
        icon={getIcon("ph:question-bold")}
      />

      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Autocomplete
            options={users}
            getOptionLabel={(option) => `${option.fullName} (${option.userName})`}
            value={null}
            width="40px"
            onChange={(event, value) => handleItemSelected(event, value)}
            filterOptions={(options, state) =>
              options.filter(
                (option) =>
                  option.fullName.toLowerCase().includes(state.inputValue.toLowerCase()) ||
                  option.userName.toLowerCase().includes(state.inputValue.toLowerCase())
              )
            }
            renderInput={(params) => (
              <TextField
                sx={{ marginLeft: 2 }}
                {...params}
                label="Tìm kiếm theo tài khoản"
                variant="outlined"
                onChange={(event) => handleSearchInputChange(event, null)}
                value={searchInput}
              />
            )}
          />
        </Grid>
        <Grid item xs={5} display={"flex"}>
          <ButtonLangding
            nameButton="Tạo ứng cử viên"
            onClick={() => {
              handleClickNewAccontCandidate();
            }}
          />
        </Grid>
      </Grid>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Tên tài khoản</TableCell>
              <TableCell>Xóa</TableCell>
              <TableCell>Thêm nhóm</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Avatar alt={name} src={item.avatarUrl} />
                </TableCell>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.userName}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleRemoveItem(item.userName)}>
                    Xóa
                  </Button>
                </TableCell>
                <TableCell>
                  {listGroup.length > 0 && (
                    <Box>
                      <Select
                        name="groupId"
                        required
                        label="Nhóm"
                        onChange={(e) => {
                          handleGroupChange(item.userName, e.target.value);
                        }}
                        options={getGroupOption()}
                      />
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ padding: 2 }}>
        <ButtonLangding
          bgColor="#FFA500"
          hovercolor="#F7941D"
          nameButton="Lưu"
          onClick={() => handleSave()}
        />
      </div>
      <NewAccount OpenPopUp={newAccountCandidate} SetOpenPopUp={setAccountNewCandidate} id={id} />
    </Paper>
  );
};
const RightTable = () => {
  const dispacth = useDispatch();
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [idCanidate, setidCanidate] = useState();
  const decode = jwt_decode(token);
  const [OpenUpdate, SetOpenUpdate] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const callAPI = async () => {
      await dispacth(handleGetCandidateByIdCampaign(token, id));
    };
    callAPI();
  }, [dispacth, token]);

  const candidateList = useSelector((state) => {
    return state.candidateList;
  });
  const handleEdit = useCallback(
    (idCanidate) => {
      setidCanidate(idCanidate);
      SetOpenUpdate(true);
    },
    [idCanidate]
  );

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
      await dispacth(handleGetCandidateByIdCampaign(token, id));
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
        title="Danh sách ứng cử viên "
        subTitle="Các ứng cử viên có trong chiến dịch này"
        icon={getIcon("ph:question-bold")}
      />
      <TableContainer>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 0.5, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            inputProps={{ "aria-label": "search candidate" }}
            id="outlined-basic"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            label="Tìm kiếm theo tên"
            variant="outlined"
          />
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Tên nhóm</TableCell>
              <TableCell>Sửa</TableCell>
              <TableCell>Xóa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidateList
              .filter((item) => item.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Avatar alt={item.avatarUrl} src={item.avatarUrl} />
                  </TableCell>
                  <TableCell>{item.fullName}</TableCell>
                  <TableCell>{item.groupName}</TableCell>

                  <TableCell>
                    {
                      <IconButton onClick={() => handleEdit(item.candidateId)}>
                        {getIcon("ic:baseline-edit")}
                      </IconButton>
                    }
                  </TableCell>
                  <TableCell>
                    {
                      <IconButton onClick={() => handleRemoveItem(item.candidateId)}>
                        {getIcon("ic:baseline-delete")}
                      </IconButton>
                    }
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UpdateCandidate
        OpenEditCandidate={OpenUpdate}
        SetOpenEditCandidate={SetOpenUpdate}
        id={idCanidate}
        idCampaign={id}
      />
    </Paper>
  );
};
export default function AddNewcadidate() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <LeftCard />
      </Grid>
      <Grid item xs={12} sm={6}>
        <RightTable />
      </Grid>
    </Grid>
  );
}
