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
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { TextField } from "@mui/material";
import Label from "components/label/Label";

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
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "",
    numeric: false,
    disablePadding: false,
    label: "Người dùng",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Nội dung",
  },
  {
    id: "Ngày tạo",
    numeric: false,
    disablePadding: false,
    label: "Ngày tạo ",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{
          marginLeft: "10%",
          color: "#B83490",
          fontFamily: "'UTM Swiss Condensed Regular'", // Đặt font chữ tùy chỉnh
        }}
      >
        Đánh giá
      </Typography>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
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
};

function EnhancedTableToolbar(props) {
  const { numSelected, onSearch } = props;
  const [searchQuery, setSearchQuery] = React.useState(""); // Define searchQuery state

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update searchQuery state
    onSearch(event.target.value);
  };

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
      {/* <TextField
        label="Search by Name"
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ ml: 2, width: "200px" }}
      /> */}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  numSelected: PropTypes.number.isRequired,
};

function TableFeedback({ feedback }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = React.useState(""); // Define searchQuery state

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

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, feedback.length - page * rowsPerPage);

  const filteredRows = feedback.filter((row) =>
    row?.content?.toLowerCase()?.includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={0} onSearch={handleSearch} />
        <TableContainer>
          <Table sx={{ minWidth: 550 }} aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={feedback.length}
            />
            <TableBody>
              {stableSort(filteredRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover tabIndex={-1} key={row.feedBackId}>
                      <TableCell align="left">{row.userId}</TableCell>
                      <TableCell width={240} component="th" id={labelId} scope="row">
                        {row.content == 1 && <Label>Không thích</Label>}
                        {row.content == 2 && <Label>Yêu thích</Label>}
                        {row.content == 3 && <Label>Rất tốt</Label>}
                        {row.content == 4 && <Label>Tuyệt vời</Label>}
                        {row.content == 5 && <Label align="left">Xuất sắc</Label>}
                      </TableCell>
                      <TableCell align="left">{row.createDate}</TableCell>
                    </TableRow>
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
          count={feedback.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

TableFeedback.propTypes = {
  rows: PropTypes.array.isRequired,
};

export default TableFeedback;
