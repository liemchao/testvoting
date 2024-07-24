import React from "react";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { orange } from "@mui/material/colors";

export default function ButtonCustomize(props) {
  const {
    nameButton,
    onClick,
    component,
    to,
    type,
    width,
    marginTop,
    marginLeft,
    paddingBottom,
    endIcon,
    border,
    bgColor,
    boxShadow,
    borderRadius,
    height,
    color,
    startIcon,
    paddingLeft,
    variant,
    marginRight,
    hovercolor,
    disabled,
    size,
  } = props;
  const ColorButton = styled(Button)(({ theme }) => ({
    // color: theme.palette.getContrastText("#ffff"),
    width: width || "12px",
    "@media (min-width: 1800px)": {
      maxWidth: "480px",
    },
    backgroundColor: bgColor,
    "&:hover": {
      backgroundColor: hovercolor,
      color: "white",
    },
    display: "center",
    textTransform: "none",
    color: "white",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  }));
  return (
    <ColorButton
      type={type}
      onClick={onClick}
      component={component}
      to={to}
      variant={variant}
      endIcon={endIcon}
      startIcon={startIcon}
      size={size}
      disabled={disabled}
      sx={{
        color: color,
        // width: width,
        height: height,
        marginTop: marginTop,
        marginLeft: marginLeft,
        paddingBottom: paddingBottom,
        paddingLeft: paddingLeft,
        boxShadow: boxShadow,
        border: border,
        borderRadius: borderRadius,
        marginRight: marginRight,
      }}
    >
      {nameButton}
    </ColorButton>
  );
}
