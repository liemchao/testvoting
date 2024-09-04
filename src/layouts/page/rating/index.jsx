import React, { useContext, useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Campaignlistoolbar from "layouts/sections/Campaignlistoolbar";
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
  Paper,
  Box,
  TableHead,
} from "@mui/material";
import Label from "components/label/Label";
import useMediaQuery from "@mui/material/useMediaQuery";
import Page from "components/Layout/Page";
import UserListHead from "layouts/sections/UserListHead";
import jwt_decode from "jwt-decode";
import PageHeader from "components/Layout/PageHeader";
import Iconify from "assets/theme/components/icon/Iconify";
import { getScore } from "context/redux/action/action";
import { useDispatch, useSelector } from "react-redux";
import { Authen } from "context/authenToken/AuthenToken";
import { useParams } from "react-router-dom";
import axios from "axios";
import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";
import SearchNotFound from "components/Layout/SearchNotFound";
import { filter } from "lodash";
import { CSVLink } from "react-csv";
import { CustomizedToast } from "components/toast/ToastCustom";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} color={"#090914"} />;

const TABLE_HEAD = [
  { id: "stt", name: "Stt", label: "STT.", alignRight: false },
  { id: "images", name: "Hình", alignRight: false },
  { id: "name", label: "Tên ứng cử viên", alignRight: false },
  { id: "Score", label: "Điểm", alignRight: false },
];
const TABLE_HEAD1 = [
  { id: "stt", label: "STT", name: "Stt", alignRight: false },
  { id: "name", label: "Tên ứng cử viên", alignRight: false },
  { id: "Giai đoạn", name: "Giai đoạn", label: "Giai đoạn", alignRight: false },
  { id: "Điểm", label: "Điểm", alignRight: false },
  { id: "Score", label: "Tổng Điểm", alignRight: false },
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
      (_user) => _user.fullName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis?.map((el) => el[0]);
}

const TopList = () => {
  const token = localStorage.getItem("token");
  const decode = jwt_decode(token);
  const { id } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get(
        `https://liemtroller-001-site1.jtempurl.com/api/v1/scores?CampaignId=${id}&UserId=${decode.Username}`,
        config
      )
      .then((response) => {
        const sortedCandidates = response.data?.data?.listCandidateScore.sort(
          (a, b) => b.totalScore - a.totalScore
        );
        setCandidates(sortedCandidates);
      })
      .catch((error) => {
        CustomizedToast({
          message: `Đã xảy ra lỗi ở cơ sở dữ liệu`,
          type: "ERROR",
        });
      });
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = form.map((n) => n.name);
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

  const filtercandiate = applySortFilter(candidates, getComparator(order, orderBy), filterName);
  const isUserNotFound = filtercandiate?.length === 0;
  return (
    <Page title="User">
      <Container maxWidth={false}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            {/* <Icon icon="emojione-monotone:pot-of-form" fontSize={100} /> */}
          </Typography>
          <CSVLink style={{ textDecoration: "none" }} data={filtercandiate} filename="Result">
            {" "}
            <ButtonLangding nameButton="Xuất tập tin" bgColor="#FFA500" hovercolor="#F7941D" />
          </CSVLink>
        </Stack>

        <Card>
          <Campaignlistoolbar
            numSelected={selected?.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
          {/* <Scrollbar> */}
          <TableContainer>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={candidates?.length}
                numSelected={selected?.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {/* nhớ khởi tạo đúng tên file trong database */}
                {filtercandiate
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const { candidateId, fullName, totalScore } = row;

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
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Avatar alt={fullName} />
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" noWrap>
                            {fullName}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">{totalScore}</TableCell>
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
            count={candidates?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            // fix languge in footer tables
            labelRowsPerPage={"Số giảng viên trên bảng"}
            labelDisplayedRows={({ from, to, count }) => {
              return "" + from + "-" + to + " của " + count;
            }}
          />
        </Card>
      </Container>
    </Page>
  );
};

const UserTable = () => {
  const dispacth = useDispatch();
  const { token } = useContext(Authen);
  const { id } = useParams();
  const decode = jwt_decode(token);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const callAPI = async () => {
      await dispacth(getScore(id, decode.Username, token));
    };
    callAPI();
  }, [dispacth, token]);

  const listscore = useSelector((state) => {
    return state.listscore;
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = form.map((n) => n.name);
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

  const filterScore = applySortFilter(listscore, getComparator(order, orderBy), filterName);
  const isUserNotFound = filterScore?.length === 0;

  return (
    <Page title="User">
      <Container maxWidth={false}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom></Typography>
        </Stack>

        <Card>
          <Campaignlistoolbar
            numSelected={selected?.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
          {/* <Scrollbar> */}
          <TableContainer>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD1}
                rowCount={listscore?.length}
                numSelected={selected?.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {/* nhớ khởi tạo đúng tên file trong database */}
                {filterScore
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const { candidateId, fullName, totalScore, listStageScore } = row;

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
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" noWrap>
                            {fullName}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {listStageScore.map((stageScore, i) => (
                            <div key={i}>{stageScore.stageName}</div>
                          ))}
                        </TableCell>
                        <TableCell>
                          {listStageScore.map((stageScore, i) => (
                            <div key={i}>{stageScore.stageScore}</div>
                          ))}
                        </TableCell>

                        <TableCell align="left">{totalScore}</TableCell>
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
            count={listscore?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            // fix languge in footer tables
            labelRowsPerPage={"Số giảng viên trên bảng"}
            labelDisplayedRows={({ from, to, count }) => {
              return "" + from + "-" + to + " của " + count;
            }}
          />
        </Card>
      </Container>
    </Page>
  );
};
const TopAndTable = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <div style={{ display: "flex", height: "100%", columnGap: "1px", marginTop: "-2rem" }}>
      <div style={{ flex: 1, height: "100%" }}>
        <Box
          sx={{
            height: "100%",
            border: "2px solid orange ",
            paddingBottom: "50px",
            display: "flex",
            borderRadius: 10,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              marginBottom: "16px",
              color: "white",
              fontFamily: "UTM Swiss Condensed Regular",
              fontSize: "1.7rem",
            }}
          >
            Danh sách xếp hạng
          </Typography>
          <TopList />
        </Box>
      </div>
      <div style={{ flex: 1.5, height: "100%" }}>
        <Box
          sx={{
            height: "100%",
            border: "2px solid orange",
            padding: "20px",
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              marginTop: "16px",
              marginBottom: "16px",
              color: "white",
              fontFamily: "UTM Swiss Condensed Regular",
              fontSize: "1.7rem",
            }}
          >
            Kết quả chiến dịch
          </Typography>
          <UserTable />
        </Box>
      </div>
    </div>
  );
};

export default TopAndTable;
