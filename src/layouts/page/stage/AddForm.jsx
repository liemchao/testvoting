import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TablePagination,
} from "@mui/material";
import { getformbyIdUser } from "context/redux/action/action";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ViewForm from "components/Popup/create/ViewForm";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { callAPIgetListForm } from "context/redux/action/action";
import PageHeader from "components/Layout/PageHeader";
import Iconify from "assets/theme/components/icon/Iconify";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} color={"#151719"} />;
export default function AddForm() {
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(null);
  const [view, setView] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const token = localStorage.getItem("token");

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  const [formId, setformId] = useState();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    const callAPI = async () => {
      await dispatch(getformbyIdUser("user", token));
      await dispatch(callAPIgetListForm(token));
    };
    callAPI();
  }, [dispatch, token]);

  const formUserByIdUser = useSelector((state) => {
    return state.formUserByIdUser;
  });

  const form = useSelector((state) => {
    return state.form;
  });

  const handleCheckboxChange = (event, id, name) => {
    setSelectedId(id);
    localStorage.setItem("formID", id);
    localStorage.setItem("name", name);
  };
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, formUserByIdUser.length - page * rowsPerPage);

  return (
    <>
      <Box sx={{ bgcolor: "background.paper", mt: 4 }}>
        <PageHeader
          width="60%"
          marginLeft="20%"
          title="Thêm biễu mẫu"
          subTitle="Có thể chọn biễu mẫu hoặc không"
          icon={getIcon("fluent:form-new-24-regular")}
        />
        <AppBar sx={{ bgcolor: "#B83490" }} position="static">
          <Tabs
            value={value}
            onChange={handleChangeTab}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
            sx={{
              "& .MuiTabs-indicator": {
                bgcolor: "white",
              },
            }}
          >
            <Tab color="#B83490" label="Biễu mẫu của tôi" {...a11yProps(0)} />
            <Tab color="#B83490" label="Biễu mẫu đề xuẩt" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Box sx={{ pt: 2 }}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Tên biểu mẫu</TableCell>
                      <TableCell>Người tạo</TableCell>
                      <TableCell>Trạng thái</TableCell>
                      <TableCell>Xem câu hỏi </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? formUserByIdUser.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : formUserByIdUser
                    ).map((row) => (
                      <TableRow key={row.formId}>
                        <TableCell>
                          <Checkbox
                            checked={selectedId === row.formId}
                            onChange={(event) => handleCheckboxChange(event, row.formId, row.name)}
                          />
                        </TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.userId}</TableCell>
                        <TableCell>{row.visibility}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => {
                              setView(true);
                              setformId(row.formId);
                            }}
                          >
                            <RemoveRedEyeIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={formUserByIdUser.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Box sx={{ pt: 2 }}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Tên biểu mẫu</TableCell>
                      <TableCell>Người tạo</TableCell>
                      <TableCell>Trạng thái</TableCell>
                      <TableCell>Xem chi tiết </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? form.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : form
                    ).map((row) => (
                      <TableRow key={row.formId}>
                        <TableCell>
                          <Checkbox
                            checked={selectedId === row.formId}
                            onChange={(event) => handleCheckboxChange(event, row.formId, row.name)}
                          />
                        </TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.userId}</TableCell>
                        <TableCell>{row.visibility}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => {
                              setView(true);
                              setformId(row.formId);
                            }}
                          >
                            <RemoveRedEyeIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={form.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>
            </Box>
          </TabPanel>
        </SwipeableViews>
      </Box>

      <ViewForm setView={setView} view={view} formId={formId} />
    </>
  );
}
