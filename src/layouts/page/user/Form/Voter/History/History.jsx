import { filter } from "lodash";
import { useState } from "react";
import * as React from "react";
import { CSVDownload, CSVLink } from "react-csv";
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
import Box from "@mui/material/Box";
import jwt_decode from "jwt-decode";

// components

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";
import UserListHead from "layouts/sections/UserListHead";
import Campaignlistoolbar from "layouts/sections/Campaignlistoolbar";
import Page from "components/Layout/Page";
import Label from "components/label/Label";
import SearchNotFound from "components/Layout/SearchNotFound";
import { callAPIgetListHistory } from "context/redux/action/action";
import { useContext } from "react";
import { Authen } from "context/authenToken/AuthenToken";
import Iconify from "assets/theme/components/icon/Iconify";
import moment from "moment/moment";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";
import { useTheme, useMediaQuery } from "@mui/material";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "no", name: "Stt", label: "STT.", alignRight: false },
  { id: "Ngày", label: "Ngày", alignRight: false },
  { id: "Mô tả", label: "Loại hành động", alignRight: false },
  { id: "Loại hành động", label: "Mô tả", alignRight: false },
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

export default function HistoryUser() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(7);
  const { token } = useContext(Authen);
  const decode = jwt_decode(token);
  // const [open, setOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch();

  React.useEffect(() => {
    const callAPI = async () => {
      await dispatch(callAPIgetListHistory(decode.Username || decode.userId, token));
    };
    callAPI();
  }, [dispatch, token]);

  const history = useSelector((state) => {
    return state.history;
  });

  const getOptions = () => [
    { id: "active", title: "Đang bán" },
    { id: "inActive", title: "Ngưng bán" },
    { id: "All", title: "Tất cả" },
  ];

  //========================================================
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = history.map((n) => n.name);
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

  const filterhistory = applySortFilter(history, getComparator(order, orderBy), filterName);

  const isUserNotFound = filterhistory?.length === 0;
  return (
    <Page title="User-site">
      <Container maxWidth={false}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {/* <Icon icon="emojione-monotone:pot-of-history" fontSize={100} /> */}
          </Typography>
          <CSVLink style={{ textDecoration: "none" }} data={history} filename="History">
            {" "}
            <ButtonLangding nameButton="Xuất tập tin" bgColor="#FFA500" hovercolor="#F7941D" />
          </CSVLink>
          {/* <ButtonCustomize
            nameButton="Xuất tập tin"
            bgColor="#FFA500"
            hovercolor="#F7941D"
            onClick={() => {
              handleFile();
            }}
          /> */}
        </Stack>

        <Card>
          {/* <Scrollbar> */}
          <TableContainer>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={history?.length}
                numSelected={selected?.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {/* nhớ khởi tạo đúng tên file trong database */}
                {filterhistory
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const { count, historyId, description, actionTypeName, time } = row;

                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={historyId}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell>
                          <Typography width="2%" variant="subtitle2">
                            {index + 1}
                          </Typography>
                        </TableCell>
                        <TableCell
                          style={{ whiteSpace: "pre-line", width: isMobile ? "40%" : "10%" }}
                        >
                          <Typography variant="subtitle2">
                            {moment(time).format("DD-MM-YYYY HH:mm:ss")}:00
                          </Typography>
                        </TableCell>

                        <TableCell noWrap>
                          {actionTypeName === "edit vote" && (
                            <Label color="warning">Thay đổi bình chọn</Label>
                          )}
                          {actionTypeName === "voted" && (
                            <Label color="success">Đã bình chọn</Label>
                          )}
                        </TableCell>
                        <TableCell noWrap>{description}</TableCell>

                        {/* <TableCell width="2%">
                          {<IconButton>{getIcon("carbon:view-filled")}</IconButton>}
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
            rowsPerPageOptions={[7, 14, 21]}
            component="div"
            count={history?.length}
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
