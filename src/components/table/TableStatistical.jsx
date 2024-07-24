import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";

import { Collapse, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getListThongke } from "context/redux/action/action";
import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

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

function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Nội dung",
  },
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Giai đoạn",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, onSearch, dateAt, toDate, setDateAt, setToDate, total } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker label="Từ ngày" value={dateAt} onChange={(newValue) => setDateAt(newValue)} />
        </DemoContainer>
      </LocalizationProvider>
      {"--"}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="Đến ngày"
            value={toDate}
            onChange={(newValue) => setToDate(newValue.subtract(-12, "hours"))}
          />
        </DemoContainer>
      </LocalizationProvider>

      <Box
        sx={{
          marginLeft: 2,
          width: 150,
          background: "linear-gradient(to right, #d44fac, #890761)",
          borderRadius: 2,
          boxShadow: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 1,
          color: "white",
        }}
      >
        Tổng số phiếu | {total}
      </Box>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  numSelected: PropTypes.number.isRequired,
};

function TableStatistical({ id }) {
  const value = moment();

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dateAt, setDateAt] = useState("");
  const [toDate, setToDate] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRows, setExpandedRows] = useState([]);
  const token = localStorage.getItem("token");

  //============================================================================
  useEffect(() => {
    dispatch(getListThongke(token, id, dateAt, toDate));
  }, [dateAt, toDate, token, id]);

  const statistical = useSelector((state) => {
    return state.thongKe;
  });
  console.log(
    "🚀 ~ file: TableStatistical.jsx:183 ~ statistical ~ statistical:",
    statistical.voteOfGroupInStage
  );

  const arrStatistical = () => {
    let arr = [];

    for (let i = 0; i < statistical.length; i++) {
      arr.push(statistical[i]?.voteOfGroupInStage);
    }

    return arr;
  };
  console.log(
    "🚀 ~ file: TableStatistical.jsx:194 ~ arrStatistical ~ arrStatistical:",
    arrStatistical()
  );

  const handleRowExpand = (index) => {
    const newExpandedRows = [...expandedRows];
    const rowIndex = newExpandedRows.indexOf(index);

    if (rowIndex === -1) {
      newExpandedRows.push(index);
    } else {
      newExpandedRows.splice(rowIndex, 1);
    }

    setExpandedRows(newExpandedRows);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearch = (query) => {
    setSearchQuery(query); // Update searchQuery state
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, statistical.voteOfGroupInStage?.length - page * rowsPerPage);

  const filteredRows = statistical.voteOfGroupInStage?.filter((row) =>
    row?.stageName?.toLowerCase()?.includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={0}
          onSearch={handleSearch}
          dateAt={dateAt}
          toDate={toDate}
          setDateAt={setDateAt}
          setToDate={setToDate}
          total={statistical.totalVoteInCampaign}
        />
        <TableContainer>
          <Table sx={{ minWidth: 550 }} aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={statistical.voteOfGroupInStage?.length}
            />
            <TableBody>
              {stableSort(filteredRows, getComparator(order, orderBy))
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const isRowExpanded = expandedRows.includes(index);

                  return (
                    <React.Fragment key={index}>
                      <TableRow hover tabIndex={-1}>
                        <TableCell
                          width={240}
                          component="th"
                          id={labelId}
                          scope="row"
                          onClick={() => handleRowExpand(index)}
                        >
                          {row.stageName}
                        </TableCell>
                        <TableCell align="left">{row.stageName}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
                          <Collapse in={isRowExpanded} timeout="auto" unmountOnExit>
                            <Typography variant="h6">Phiếu trong nhóm</Typography>
                            <Table size="small" aria-label="nested table">
                              <TableHead>
                                <TableRow>
                                  <TableCell sx={{ fontWeight: "bold" }}>Chuyên ngành</TableCell>
                                  <TableCell sx={{ fontWeight: "bold" }}>Tổng số phiếu</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {/* Render the nested tables here */}
                                {row.voteOfGroup.map((vote, voteIndex) => (
                                  <TableRow key={voteIndex}>
                                    <TableCell>{vote.groupName}</TableCell>
                                    <TableCell>{vote.totalVote}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                            <Typography variant="h6">Nhóm người bình chọn</Typography>
                            <Table size="small" aria-label="nested table">
                              <TableHead>
                                <TableRow>
                                  <TableCell sx={{ fontWeight: "bold" }}>Chuyên ngành</TableCell>
                                  <TableCell sx={{ fontWeight: "bold" }}>Tổng số phiếu</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {/* Render the nested tables here */}
                                {row.voteOfGroupMajor.map((vote, voteIndex) => (
                                  <TableRow key={voteIndex}>
                                    <TableCell>{vote.groupName}</TableCell>
                                    <TableCell>{vote.totalVote}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  );
                })}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={statistical.voteOfGroupInStage?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

TableStatistical.propTypes = {
  rows: PropTypes.array.isRequired,
};

export default TableStatistical;
