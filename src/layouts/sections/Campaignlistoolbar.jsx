import PropTypes from "prop-types";
import * as React from "react";
// material
import { styled } from "@mui/material/styles";
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";

import { useDispatch } from "react-redux";
import { useState } from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Iconify from "assets/theme/components/icon/Iconify";

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": { width: 320, boxShadow: "0.78 rem" },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

Foodlistoolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function Foodlistoolbar({ numSelected, filterName, onFilterName, options }) {
  const [id, setID] = useState("");
  const dispatch = useDispatch();
  const [status, setStatus] = useState("All");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token === null) {
    navigate("/");
  }

  const handleChange = async (event) => {
    setStatus(event.target.value === "All" ? "" : event.target.value);

    await dispatch(
      callAPIgetListFoodfilterCate(
        token,
        id,
        event.target.value === "All" ? "" : event.target.value
      )
    );
  };

  const category = useSelector((state) => {
    return state.listCategory;
  });

  const OptionCate = () => {
    const item = [];
    for (var i = 0; i < category.length; i++) {
      item.push({ id: category[i].id, title: category[i].name });
    }
    return item;
  };

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} Đã chọn
        </Typography>
      ) : (
        <>
          <SearchStyle
            value={filterName}
            onChange={onFilterName}
            placeholder="Tìm kiếm theo tên"
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: "text.disabled", width: 20, height: 20 }}
                />
              </InputAdornment>
            }
          />
        </>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <></>
      )}
    </RootStyle>
  );
}
