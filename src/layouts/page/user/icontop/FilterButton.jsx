import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import FilterAltSharpIcon from "@mui/icons-material/FilterAltSharp";
import { useState } from "react";
import DatePicker from "components/Control/DatePicker";
import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";
import Select from "components/Control/Select";
export default function FilterButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const getOptions = () => [
    { id: "public", title: "Chưa diễn ra", nametitle: "Trạng thái chiến dịch được công khai" },
    { id: "public", title: "Đang diễn ra", nametitle: "Trạng thái chiến dịch được công khai" },
    { id: "private", title: "Kết thúc", nametitle: "Trạng thái chiến dịch không công khai" },
  ];

  const handleFilter = () => {
    // Xử lý filter ở đây
    handleCloseMenu();
  };

  return (
    <>
      <IconButton onClick={handleOpenMenu}>
        <FilterAltSharpIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* <MenuItem>
            <Typography>Từ ngày </Typography>
            <Box sx={{ ml: "1rem" }}>
              <DatePicker label="Từ ngày" value={startDate} onChange={handleStartDateChange} />
            </Box>
          </MenuItem>
          <MenuItem>
            <Typography>Đến ngày</Typography>
            <Box sx={{ ml: "0.5rem" }}>
              <DatePicker label="Đến ngày" value={startDate} onChange={handleStartDateChange} />
            </Box>
          </MenuItem> */}
          <MenuItem>
            <Typography>Trạng thái</Typography>
            <Box sx={{ ml: "0.5rem" }}>
              <Select
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: { xs: "90%", md: "16rem" },
                }}
                name="groupid"
                required
                defaultValue="0"
                // label="Trạng thái"
                height="2rem"
                onChange={(e) => {
                  // handleChange(e);
                }}
                options={getOptions()}
              />
            </Box>
          </MenuItem>
          <MenuItem>
            <ButtonCustomize
              nameButton="Lọc"
              bgColor="#FFA500"
              hovercolor="#F7941D"
              onClick={handleFilter}
            />
          </MenuItem>
        </div>
      </Menu>
    </>
  );
}
