import { filter } from "lodash";
import { useState } from "react";
import * as React from "react";
import { CSVLink } from "react-csv";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  IconButton,
} from "@mui/material";
// components

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";
import UserListHead from "layouts/sections/UserListHead";
import Campaignlistoolbar from "layouts/sections/Campaignlistoolbar";
import Page from "components/Layout/Page";
import SearchNotFound from "components/Layout/SearchNotFound";
import { useContext } from "react";
import { Authen } from "context/authenToken/AuthenToken";
import Button from "components/Control/Button";
import { callAPIgetListCandidates } from "context/redux/action/action";
import Iconify from "assets/theme/components/icon/Iconify";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import API from "config/axios/API/API";
import { URL_API } from "config/axios/Url/URL";
import { getAccount } from "context/redux/action/action";
import Label from "components/label/Label";
import QRPopUp from "components/Popup/create/QRPopUp";
import { useRowState } from "react-table";
import UpdatePermission from "components/Popup/updatePopup/UpdatePermission";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";
import NewAccountAdmin from "components/Popup/create/NewAccountMana";
import { useCallback } from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ReplyIcon from "@mui/icons-material/Reply";
import { CustomizedToast } from "components/toast/ToastCustom";
import { getAccountStatic } from "context/redux/action/action";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "Stt", name: "Stt", label: "Stt", alignRight: false },
  { id: "images", name: "Hình", label: "Hình", alignRight: false },
  { id: "name", label: "Tài khoản", alignRight: false },
  { id: "email", label: "Họ và tên", alignRight: false },
  { id: "status", label: "Trạng thái", alignRight: true },
  { id: "permison", label: "Phân quyền", alignRight: true },
  { id: "delete", label: "Chặn", alignRight: true },
  { id: "permisstion", label: "Cập nhật", alignRight: true },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (account) => account.userName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis?.map((el) => el[0]);
}
//getICon

export default function ManageAccount() {
  const [OpenPopUp, SetOpenPopUp] = useState(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [Username, setUsername] = useState("");

  // const [open, setOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [newAccountCandidate, setAccountNewCandidate] = useState(false);

  // const handleClickOpen = React.useCallback((item) => {
  //   setOpen(true);
  //   setValue(item);
  // }, []);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const dispatch = useDispatch();
  const { token } = useContext(Authen);

  React.useEffect(() => {
    const callAPI = async () => {
      await dispatch(getAccount(token));
      await dispatch(getAccountStatic(token));
    };
    callAPI();
  }, [dispatch, token]);

  //useSelect lấy data từ store =>

  const account = useSelector((state) => {
    return state.account;
  });
  const voter = useSelector((state) => {
    return state.accountvoter;
  });

  const getOptions = () => [
    { id: "active", title: "Đang bán" },
    { id: "inActive", title: "Ngưng bán" },
    { id: "All", title: "Tất cả" },
  ];
  const getIcon = (name) => <Iconify icon={name} width={20} />;

  //========================================================
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = account.map((n) => n.fullName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleDelete = async (id) => {
    try {
      const req = await API("DELETE", URL_API + `/api/v1/accounts/${id}`, null, token);
      if (req) {
        CustomizedToast({
          message: "Khóa tài khoản thành công",
          type: "SUCCESS",
        });
      }
      await dispatch(getAccount(token));
    } catch (err) {
      CustomizedToast({
        message: "Khóa tài khoản không thành công",
        type: "ERROR",
      });
    }
  };

  const handleUnban = async (id) => {
    await API("PUT", URL_API + `/api/v1/accounts/${id}`, null, token)
      .then((res) => {
        CustomizedToast({
          message: "Cập nhật trạng thái thành công",
          type: "SUCCESS",
        });
        dispatch(getAccount(token));
      })
      .catch((err) => {
        CustomizedToast({
          message: "Mở khóa tài khoản không thành công",
          type: "ERROR",
        });
      });
  };
  const handleUpdatePermission = (Username) => {
    setUsername(Username);
    SetOpenPopUp(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };
  const handleClickOpenNewAccount = useCallback(() => {
    setAccountNewCandidate(true);
  }, []);

  const filterCandidate = applySortFilter(account, getComparator(order, orderBy), filterName);

  const handleDate = (time) => {
    const a = new Date(time).toLocaleDateString().split("/");
    if (a[0] < 10) {
      return `${a[2]}-${a[1]}-0${a[0]}`;
    } else return `${a[2]}-${a[1]}-${a[0]}`;
  };

  const isUserNotFound = filterCandidate?.length === 0;
  return (
    <Page title="Admin">
      <Container maxWidth={false}>
        <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={0} mt={-1}>
          <CSVLink
            style={{ textDecoration: "none", marginTop: "-0.6rem", marginRight: "1rem" }}
            data={filterCandidate}
            filename="Account"
          >
            <ButtonLangding nameButton="Tài khoản" bgColor="#FFA500" hovercolor="#F7941D" />
          </CSVLink>
          <CSVLink
            style={{ textDecoration: "none", marginTop: "-0.6rem", marginRight: "1rem" }}
            data={voter}
            filename="voter"
          >
            <ButtonLangding nameButton="Người tham gia" bgColor="#FFA500" hovercolor="#F7941D" />
          </CSVLink>
          <Typography variant="h4" gutterBottom>
            <ButtonLangding
              nameButton="Thêm tài khoản"
              bgColor="#FFA500"
              hovercolor="#F7941D"
              onClick={() => {
                handleClickOpenNewAccount();
              }}
            />
          </Typography>
        </Stack>

        <Card>
          <Campaignlistoolbar
            numSelected={selected?.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            options={getOptions()}
          />
          {/* <Scrollbar> */}
          <TableContainer>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={account?.length}
                numSelected={selected?.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {/* nhớ khởi tạo đúng tên file trong database */}
                {filterCandidate
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const {
                      candidateId,
                      userName,
                      avatarUrl,
                      fullName,
                      gender,
                      status,
                      permission,
                    } = row;

                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={candidateId}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell>
                          <Typography variant="subtitle2" noWrap>
                            {index + 1}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Avatar src={avatarUrl} />
                        </TableCell>
                        <TableCell align="left">{userName}</TableCell>
                        <TableCell align="left">{fullName}</TableCell>
                        <TableCell align="left">
                          <div>
                            {status === true && (
                              // <Alert severity="warning">inActive</Alert>
                              <Label color="success">Đang hoạt động</Label>
                            )}
                            {status === false && (
                              // <Alert severity="info">waiting</Alert>
                              <Label color="warning">Đã chặn</Label>
                            )}
                          </div>
                        </TableCell>
                        <TableCell align="left">
                          {permission.voter && (
                            <Typography variant="subtitle2" noWrap>
                              Người bình chọn
                            </Typography>
                          )}
                          {permission.candidate && (
                            <Typography variant="subtitle2" noWrap>
                              Ứng cử viên
                            </Typography>
                          )}
                          {permission.moderator && (
                            <Typography variant="subtitle2" noWrap>
                              Người quản lý
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell align="left" sx={{ width: "13%" }}>
                          {status ? (
                            <IconButton aria-label="delete" onClick={() => handleDelete(userName)}>
                              <RemoveCircleIcon />
                            </IconButton>
                          ) : (
                            <IconButton aria-label="unban" onClick={() => handleUnban(userName)}>
                              <ReplyIcon />
                            </IconButton>
                          )}
                        </TableCell>
                        <TableCell align="left" sx={{ width: "13%" }}>
                          <IconButton
                            aria-label="edit"
                            onClick={() => handleUpdatePermission(userName)}
                          >
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
              {isUserNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <SearchNotFound searchQuery={filterName} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
          {/* </Scrollbar> */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={account?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            // fix languge in footer tables
            labelRowsPerPage={"Hiển thị"}
            labelDisplayedRows={({ from, to, count }) => {
              return "" + from + "-" + to + " của " + count;
            }}
          />
        </Card>
      </Container>
      <NewAccountAdmin OpenPopUp={newAccountCandidate} SetOpenPopUp={setAccountNewCandidate} />
      <UpdatePermission
        OpenEditPermission={OpenPopUp}
        SetOpenEditPermission={SetOpenPopUp}
        Username={Username}
      />
    </Page>
  );
}
