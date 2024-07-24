import { useContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import Campaignlistoolbar from "layouts/sections/Campaignlistoolbar";
import UserListHead from "layouts/sections/UserListHead";
import SearchNotFound from "components/Layout/SearchNotFound";
import Label from "components/label/Label";
import { filter } from "lodash";

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
import { Authen } from "context/authenToken/AuthenToken";
import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";
import { getCampaignId } from "context/redux/action/action";
import { GetCampaignById } from "context/redux/action/action";
import Iconify from "assets/theme/components/icon/Iconify";
import moment from "moment";
import { handleGetStage } from "context/redux/action/action";
import dayjs from "dayjs";
import Page from "components/Layout/Page";
import { CardContent } from "@mui/joy";
import { CustomizedToast } from "components/toast/ToastCustom";
import API from "config/axios/API/API";
import { URL_API } from "config/axios/Url/URL";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";

const TABLE_HEAD = [
  { id: "Stt", label: "Stt", alignRight: false },
  { id: "name", label: "Tên giai đoạn", alignRight: false },
  { id: "createtime", label: "Thời gian bất đầu", alignRight: false },
  { id: "endTime", label: "Thời gian kết thúc", alignRight: false },
  { id: "updatedate", label: "Số phiếu", alignRight: false },
  { id: "Majo", label: "Hình thức bỏ phiếu", alignRight: false },
  { id: "status", label: "Trạng thái", alignRight: false },
  { id: "Sửa", label: "Sửa", alignRight: false },
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
    return filter(array, (_user) => _user.name?.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis?.map((el) => el[0]);
}

//----------------------------------------------------------------

const UserTable = () => {
  const [page, setPage] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  // const [open, setOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const handleClickOpen = React.useCallback((item) => {
    setOpen(true);
    setValue(item);
  }, []);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { token } = useContext(Authen);

  useEffect(() => {
    const callAPI = async () => {
      await dispatch(handleGetStage(id, token));
      await dispatch(GetCampaignById(id, token));
    };
    callAPI();
  }, [dispatch, token]);

  const stateList = useSelector((state) => {
    return state.campaignStage;
  });
  const getcampaignById = useSelector((state) => {
    return state.getcampaignById;
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
      const newSelecteds = stateList.map((n) => n.name);
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

  const filterstateList = applySortFilter(stateList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filterstateList.length === 0;

  const handleDelete = async (stageId) => {
    try {
      const res = await API("DELETE", URL_API + `/api/v1/stages/${stageId}`, token);
      CustomizedToast({
        message: "Xóa giai đoạn thành công",
        type: "SUCCESS",
      });
      dispatch(handleGetStage(id, token));
    } catch (error) {
      if (
        error.response.data.message ===
        "Bạn chỉ có thể thực hiện chức năng này khi chiến dịch chưa được duyệt"
      ) {
        CustomizedToast({
          message: "Không thể xóa chiến dịch đã xét duyệt",
          type: "ERROR",
        });
      } else if (error.response.data.message === "Không tìm thấy id") {
        CustomizedToast({
          message: "Không tìm thấy giai đoạn",
          type: "ERROR",
        });
      } else {
        CustomizedToast({
          message: "Xóa giai đoạn không thành công",
          type: "ERROR",
        });
      }
    }
  };

  const handleEdit = (idStage) => {
    navigate(`/user/campaign/updatestage/${idStage}`);
  };

  return (
    <Page title="User">
      <Container maxWidth={false}>
        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
         
          </Typography>
          <ButtonCustomize
            nameButton="Xuất tập tin"
            bgColor="#FFA500"
            hovercolor="#F7941D"
            component={RouterLink}
            to="#"
          />
        </Stack> */}

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
                rowCount={stateList?.length}
                numSelected={selected?.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {/* nhớ khởi tạo đúng tên file trong database */}
                {filterstateList
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const {
                      stageId,
                      title,
                      content,
                      startTime,
                      endTime,
                      process,
                      limitVote,
                      isUseForm,
                    } = row;

                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={stageId}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" noWrap>
                            {title}
                          </Typography>
                        </TableCell>

                        <TableCell align="left">
                          {dayjs(startTime).format("DD-MM-YYYY HH:mm:ss")}
                        </TableCell>
                        <TableCell align="left">
                          {dayjs(endTime).format("DD-MM-YYYY HH:mm:ss")}
                        </TableCell>
                        <TableCell align="left">{limitVote}</TableCell>
                        <TableCell align="left">
                          {isUseForm ? (
                            <Label color="info">Câu hỏi</Label>
                          ) : (
                            <Label color="info">Yêu thich</Label>
                          )}
                        </TableCell>
                        <TableCell align="left">
                          <div>
                            {process === "Chưa bắt đầu" && <Label color="info">Chưa bắt đầu</Label>}
                            {process === "Đang diễn ra" && (
                              <Label color="warning">Đang diễn ra</Label>
                            )}
                            {process === "Kết thúc" && <Label color="info">Kết thúc</Label>}
                          </div>
                        </TableCell>

                        <TableCell width="1%">
                          {
                            <IconButton onClick={() => handleEdit(stageId)}>
                              {getIcon("tabler:edit")}
                            </IconButton>
                          }
                        </TableCell>
                        <TableCell>
                          {" "}
                          {
                            <IconButton onClick={() => handleDelete(stageId)}>
                              {getIcon("ic:baseline-delete")}
                            </IconButton>
                          }
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
            count={stateList?.length}
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
};

export default function GetNewStage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useContext(Authen);
  const { id } = useParams();
  useEffect(() => {
    const callAPI = async () => {
      await dispatch(getCampaignId(id, token));
    };
    callAPI();
  }, [id]);

  const getcampaignById = useSelector((state) => {
    return state.getcampaignById;
  });
  // //------------

  // useEffect(() => {
  //   const callAPIgetList = async () => {
  //     dispatch(GetCampaignById(id, navigate));
  //   };
  //   callAPIgetList();
  // }, [id]);

  // const stateList = useSelector((state) => {
  //   return state.campaignStage;
  // });

  const handleNavigate = () => {
    navigate(`/user/campaign/newstage/${id}`);
  };

  return (
    <>
      <Card sx={{ maxheight: "100px", marginTop: "2%" }}>
        <Grid container>
          <Grid item xs={10.7}>
            <CardContent>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                  fontSize: "50px",
                  color: "#B83490",
                  fontFamily: "UTM Swiss Condensed Regular", // Đặt font chữ tùy chỉnh
                }}
              >
                {getcampaignById.title}
              </Typography>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                  fontSize: "20px",
                  color: "#B83490",
                  fontFamily: "UTM Swiss Condensed Regular", // Đặt font chữ tùy chỉnh
                }}
              >
                {moment(getcampaignById.startTime).format("DD-MM-YYYY HH:mm:ss")} đến{" "}
                {moment(getcampaignById.endTime).format("DD-MM-YYYY HH:mm:ss")}
              </Typography>
            </CardContent>
          </Grid>

          <Grid item xs={1} justifyContent="flex-end" mt={1} ml={-10}>
            <ButtonLangding
              width="12rem"
              nameButton=" Thêm giai đoạn"
              bgColor="#FFA500"
              hovercolor="#F7941D"
              onClick={() => {
                handleNavigate();
              }}
            />
          </Grid>
        </Grid>
      </Card>
      <Grid container mt={1}>
        <Grid item xs={12}>
          <UserTable />
        </Grid>
      </Grid>
      {/* <CommentSection /> */}
    </>
  );
}
