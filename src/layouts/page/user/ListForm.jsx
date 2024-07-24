import { filter } from "lodash";
import { useState } from "react";
import * as React from "react";
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
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
// components
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";
import UserListHead from "layouts/sections/UserListHead";
import Campaignlistoolbar from "layouts/sections/Campaignlistoolbar";
import Page from "components/Layout/Page";
import Label from "components/label/Label";
import SearchNotFound from "components/Layout/SearchNotFound";
import { useContext } from "react";
import { Authen } from "../../../context/authenToken/AuthenToken.jsx";
import Iconify from "assets/theme/components/icon/Iconify";
import FormPopup from "components/Popup/create/FormPopUp";
import jwt_decode from "jwt-decode";
import { CustomizedToast } from "components/toast/ToastCustom";
import { URL_API } from "config/axios/Url/URL";
import API from "config/axios/API/API";
import {} from "context/redux/action/action.js";
import { getformbyIdUser } from "context/redux/action/action.js";
import { callAPIgetListForm } from "context/redux/action/action.js";
import UpdateFormPopup from "components/Popup/updatePopup/UpdateForm.jsx";
import { useEffect } from "react";
import { getFormId } from "context/redux/action/action.js";
import ViewForm from "components/Popup/create/ViewForm.jsx";
import PolicyOwer from "components/Popup/add/PolicyOwer.jsx";
import { useCallback } from "react";
import AppoveForm from "components/Popup/add/AppoveForm.jsx";
import ButtonLangding from "assets/theme/components/button/ButtonLangding.jsx";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "no", label: "Stt.", alignRight: false },
  { id: "createdAt", label: "Tên biểu mẫu", alignRight: false },
  { id: "status", label: "Trạng thái", alignRight: false },
  { id: "Xem", label: "Xem", alignRight: false },
  { id: "Sửa", label: "Sửa", alignRight: false },
  { id: "Xóa", label: "Xóa", alignRight: false },
];

const TABLE_HEAD_PUBLIC = [
  { id: "no", label: "Stt.", alignRight: false },
  { id: "images", name: "Hình", label: "Hình", alignRight: false },
  { id: "name", label: "Tên người tạo", alignRight: false },
  { id: "createdAt", label: "Tên biểu mẫu", alignRight: false },
  { id: "status", label: "Số câu hỏi", alignRight: false },
  { id: "Xem", label: "Xem", alignRight: false },
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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis?.map((el) => el[0]);
}

export default function ListForm() {
  const [OpenPopUp, SetOpenPopUp] = useState(false);
  const [Open, SetOpen] = useState(false);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { token } = useContext(Authen);
  const decode = jwt_decode(token);
  const [view, setView] = useState(false);
  const [OpenArlert1, setOpenArlert1] = useState(false);

  const dispatch = useDispatch();
  const [formId, setformId] = useState();
  const [id, setId] = useState();

  // const [open, setOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);

  const handleAdd = () => {
    SetOpenPopUp(true);
  };

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    const callAPI = async () => {
      await dispatch(getformbyIdUser(decode.Username, token));
    };
    callAPI();
  }, [dispatch, token]);

  useEffect(() => {
    const callAPI = async () => {
      await dispatch(callAPIgetListForm(token));
    };
    callAPI();
  }, [dispatch, token]);

  const formUser = useSelector((state) => {
    return state.formUserByIdUser;
  });

  const form = useSelector((state) => {
    return state.form;
  });

  const getOptions = () => [
    { id: "active", title: "Đang bán" },
    { id: "inActive", title: "Ngưng bán" },
    { id: "All", title: "Tất cả" },
  ];

  const handleDelete = async (id) => {
    const data = {
      userId: decode.Username,
    };
    try {
      const res = await API("DELETE", URL_API + `/api/v1/forms/${id}`, data, token);
      CustomizedToast({
        message: "Xóa biểu mẫu thành công",
        type: "SUCCESS",
      });
      dispatch(getformbyIdUser(decode.Username, token));
    } catch (error) {
      CustomizedToast({
        message: `${error.response.data.message}`,
        type: "ERROR",
      });
    }
  };

  const handleupdate = async (idform) => {
    await dispatch(getFormId(idform, token));
    SetOpen(true);
  };
  const formdetail = useSelector((state) => {
    return state.formByid;
  });

  //========================================================
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = formUser.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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

  const filterform = applySortFilter(formUser, getComparator(order, orderBy), filterName);
  const filterformlist = applySortFilter(form, getComparator(order, orderBy), filterName);

  const handleDate = (time) => {
    const a = new Date(time).toLocaleDateString().split("/");
    if (a[0] < 10) {
      return `${a[2]}-${a[1]}-0${a[0]}`;
    } else return `${a[2]}-${a[1]}-${a[0]}`;
  };
  const getIcon = (name) => <Iconify icon={name} width={20} />;

  const handleAppove = useCallback(
    (formId) => {
      setId(formId);
      setOpenArlert1(true);
    },
    [formId]
  );

  const isUserNotFound = filterform?.length === 0;
  return (
    <Page title="User">
      <Container maxWidth={false}>
        {/* Bảng hiện lên thông tin form */}
        <Stack mt={2} direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {/* <Icon icon="emojione-monotone:pot-of-form" fontSize={100} /> */}
          </Typography>
          <ButtonLangding
            variant="contained"
            bgColor="#FFA500"
            hovercolor="#F7941D"
            onClick={() => {
              handleAdd();
            }}
            nameButton=" Tạo biểu mẫu"
          />
        </Stack>
        <Tabs aria-label="Basic tabs" defaultValue={0} sx={{ borderRadius: "lg" }}>
          <TabList
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
              maxWidth="lg"
            >
              Biểu mẫu của bản thân
            </Tab>
            <Tab
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              Biểu mẫu đang công khai
            </Tab>
          </TabList>
          <TabPanel value={0} sx={{ p: 1 }}>
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
                    rowCount={formUser?.length}
                    numSelected={selected?.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {/* nhớ khởi tạo đúng tên file trong database */}
                    {filterform
                      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const { formId, name, userId, visibility, isApprove } = row;

                        const isItemSelected = selected.indexOf(name) !== -1;

                        return (
                          <TableRow
                            hover
                            key={formId}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell align="left">{index + 1}</TableCell>

                            <TableCell align="left">{name}</TableCell>

                            <TableCell align="left">
                              {visibility === "public" ? (
                                <>
                                  <div>
                                    <Label color="success">Công khai</Label>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div>
                                    <Label color="warning">Cá nhân</Label>
                                  </div>
                                </>
                              )}
                              {isApprove ? (
                                <></>
                              ) : (
                                <div
                                  style={{
                                    display: "flex",
                                  }}
                                >
                                  <Typography
                                    variant="subtitle1"
                                    color="success"
                                    sx={{
                                      flex: 1,
                                      color: "red", // Thay đổi màu thành "red" hoặc mã màu tùy chỉnh
                                      cursor: "pointer", // Thêm hiệu ứng con trỏ khi di chuột vào
                                    }}
                                    onClick={() => {
                                      handleAppove(formId);
                                    }}
                                  >
                                    <Label color="warning">Nhấn ở đây để kích hoạt biểu mẫu</Label>
                                  </Typography>
                                </div>
                              )}
                            </TableCell>

                            <TableCell>
                              {
                                <IconButton
                                  onClick={() => {
                                    setView(true);
                                    setformId(formId);
                                  }}
                                >
                                  {getIcon("carbon:view-filled")}
                                </IconButton>
                              }
                            </TableCell>
                            <TableCell>
                              <IconButton onClick={() => handleupdate(formId)}>
                                {getIcon("tabler:edit")}
                              </IconButton>
                            </TableCell>
                            <TableCell>
                              <IconButton onClick={() => handleDelete(formId)}>
                                {getIcon("ic:baseline-delete")}
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
                count={formUser?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                // fix languge in footer tables
                labelRowsPerPage={"Số hàng trên một trang"}
                labelDisplayedRows={({ from, to, count }) => {
                  return "" + from + "-" + to + " của " + count;
                }}
              />
            </Card>
          </TabPanel>
          <TabPanel value={1} sx={{ p: 2 }}>
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
                    headLabel={TABLE_HEAD_PUBLIC}
                    rowCount={form?.length}
                    numSelected={selected?.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {/* nhớ khởi tạo đúng tên file trong database */}
                    {filterformlist
                      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const { formId, name, userId, description, visibility } = row;

                        const isItemSelected = selected.indexOf(name) !== -1;

                        return (
                          <TableRow
                            hover
                            key={formId}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell align="left">{index + 1}</TableCell>
                            <TableCell>
                              <Avatar alt={name} />
                            </TableCell>
                            <TableCell>
                              <Typography variant="subtitle2" noWrap>
                                {userId}
                              </Typography>
                            </TableCell>

                            <TableCell align="left">{name}</TableCell>

                            <TableCell align="left">
                              <div>
                                <Label color="success">1</Label>
                              </div>
                            </TableCell>
                            <TableCell width="2%">
                              {
                                <IconButton
                                  onClick={() => {
                                    setView(true);
                                    setformId(row.formId);
                                  }}
                                >
                                  {getIcon("carbon:view-filled")}
                                </IconButton>
                              }
                            </TableCell>
                            {/* <TableCell>
                              {<IconButton>{getIcon("tabler:edit")}</IconButton>}
                            </TableCell> */}
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
                count={form?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={"Số hàng trên một trang"}
                labelDisplayedRows={({ from, to, count }) => {
                  return "" + from + "-" + to + " của " + count;
                }}
              />
            </Card>
          </TabPanel>
        </Tabs>
      </Container>
      <ViewForm setView={setView} view={view} formId={formId} />
      <UpdateFormPopup Open={Open} SetOpen={SetOpen} formdetail={formdetail} />
      <FormPopup OpenPopUp={OpenPopUp} SetOpenPopUp={SetOpenPopUp} />
      <AppoveForm OpenAlret={OpenArlert1} SetOpenAlret={setOpenArlert1} id={id} />
    </Page>
  );
}
