import { filter } from "lodash";
import { useState } from "react";
import * as React from "react";
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
  Button,
} from "@mui/material";
// components

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";
import UserListHead from "layouts/sections/UserListHead";
import Campaignlistoolbar from "layouts/sections/Campaignlistoolbar";
import Page from "components/Layout/Page";
import Label from "components/label/Label";
import SearchNotFound from "components/Layout/SearchNotFound";
import { getFeedBackUser } from "../../../context/redux/action/action";
import { useContext } from "react";
import { Authen } from "../../../context/authenToken/AuthenToken";
import Iconify from "assets/theme/components/icon/Iconify";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "Stt", label: "Stt.", alignRight: false },
  { id: "name", label: "Tên người tạo", alignRight: false },
  { id: "createdAt", label: "Thời gian tạo", alignRight: false },
  { id: "updatedate", label: "Nội dung", alignRight: false },
  { id: "status", label: "Trạng thái", alignRight: false },
  { id: "Xóa", label: "Xóa", alignRight: false },
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
//getICon

export default function FeedBack() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  // const [open, setOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const { token } = useContext(Authen);
  const decode = jwt_decode(token);

  const handleClickOpen = React.useCallback((item) => {
    setOpen(true);
    setValue(item);
  }, []);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  React.useEffect(() => {
    const callAPI = async () => {
      await dispatch(getFeedBackUser(decode.Username, token));
    };
    callAPI();
  }, [dispatch, token]);

  const feedback = useSelector((state) => {
    return state.feebackuser;
  });

  const getOptions = () => [
    { id: "active", title: "Đang bán" },
    { id: "inActive", title: "Ngưng bán" },
    { id: "All", title: "Tất cả" },
  ];

  const handleDelete = async (id) => {};
  const getIcon = (name) => <Iconify icon={name} width={20} />;

  //========================================================
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = feedback.map((n) => n.name);
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

  const filterform = applySortFilter(feedback, getComparator(order, orderBy), filterName);

  const handleDate = (time) => {
    const a = new Date(time).toLocaleDateString().split("/");
    if (a[0] < 10) {
      return `${a[2]}-${a[1]}-0${a[0]}`;
    } else return `${a[2]}-${a[1]}-${a[0]}`;
  };

  const isUserNotFound = filterform?.length === 0;
  return (
    <Page title="User">
      <Container maxWidth={false}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {/* <Icon icon="emojione-monotone:pot-of-form" fontSize={100} /> */}
          </Typography>
          <ButtonLangding
            nameButton="Xuất tập tin"
            bgColor="#FFA500"
            hovercolor="#F7941D"
            component={RouterLink}
            to="#"
          />
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
                rowCount={feedback?.length}
                numSelected={selected?.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {/* nhớ khởi tạo đúng tên file trong database */}
                {filterform
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const { content, createDate, userId, status, feedBackId } = row;

                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={feedBackId}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" noWrap>
                            {userId}
                          </Typography>
                        </TableCell>

                        <TableCell align="left">{createDate}</TableCell>
                        <TableCell align="left">
                          {content == 1 && <Label>Không thích</Label>}
                          {content == 2 && <Label>Yêu thích</Label>}
                          {content == 3 && <Label>Rất tốt</Label>}
                          {content == 4 && <Label>Tuyệt vời</Label>}
                          {content == 5 && <Label align="left">Xuất sắc</Label>}
                        </TableCell>
                        <TableCell align="left">
                          {status ? (
                            <>
                              <div>
                                <Label color="success">Hoạt động</Label>
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                <Label color="danger">Loại bỏ</Label>
                              </div>
                            </>
                          )}
                        </TableCell>
                        <TableCell width="2%">
                          {<IconButton>{getIcon("ic:baseline-delete")}</IconButton>}
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
            count={feedback?.length}
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
      </Container>
    </Page>
  );
}
