import React from "react";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

export default function ButtonLangding(props) {
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
    fullWidth,
    disabled,
  } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const design = useSelector((state) => {
    return state.design;
  });
  const ColorButton = styled(Button)(({ theme }) => ({
    // color: theme.palette.getContrastText("#ffff"),

    backgroundImage: "linear-gradient(to right,#005F8A, #061949)",
    // background: "linear-gradient(to right,#005F8A, #061949)",
    "&:hover": {
      background: "linear-gradient(to right, #000000, #0007EF)",
      color: "white",
    },
    display: "center",
    textTransform: "none",
    fontSize: isMobile ? "15px" : "23px",
    color: design.textColor,
    borderTop: "1px solid #FFFFFE",
    borderRight: "1.8px solid #FFFFFE",
    borderRadius: "60px",
    fontFamily: ["UTM Swiss Condensed Regular"].join(","),
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
      disabled={disabled}
      fullWidth={fullWidth}
      sx={{
        color: { color },
        width: { width },
        height: { height },
        marginTop: { marginTop },
        marginLeft: { marginLeft },
        paddingBottom: { paddingBottom },
        paddingLeft: { paddingLeft },
        boxShadow: { boxShadow },
        border: { border },
        borderRadius: borderRadius,
        marginRight: { marginRight },
      }}
    >
      {nameButton}
    </ColorButton>
  );
}
