import React from "react";
import Fab from "@mui/material/Fab";
import KeyboardControlKeyIcon from "@mui/icons-material/KeyboardControlKey";
import theme from "assets/theme";
import { makeStyles } from "@mui/styles";
import { animateScroll as scroll } from "react-scroll";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    color: "white",
    background: "linear-gradient(to right,#005F8A, #061949)",
  },
}));

const ScrollToTopButton = () => {
  const classes = useStyles();

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 2000,
      smooth: "easeInOutQuart",
    });
  };

  return (
    <Fab aria-label="Scroll to top" className={classes.fab} onClick={scrollToTop}>
      <KeyboardControlKeyIcon />
    </Fab>
  );
};

export default ScrollToTopButton;
