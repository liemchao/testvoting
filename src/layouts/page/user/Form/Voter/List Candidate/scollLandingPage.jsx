import React, { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { animateScroll as scroll, scroller } from "react-scroll";
import { makeStyles } from "@mui/styles";
import { backgrounds } from "polished";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: "8%",
    right: "48%",
    color: "white",
    backgroundColor: "transparent",
    "&:hover": {
      background: "linear-gradient(to right,#005F8A, #061949)",
    },
  },
}));

const ScrollToTopButton = () => {
  const classes = useStyles();
  const [sections] = useState(["section1", "section2", "section3", "section4", "section5"]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const scrollToNextSection = () => {
    const nextSectionIndex = currentSectionIndex + 1;
    if (nextSectionIndex < sections.length) {
      setCurrentSectionIndex(nextSectionIndex);
    }
  };

  useEffect(() => {
    if (currentSectionIndex < sections.length) {
      scroller.scrollTo(sections[currentSectionIndex], {
        duration: 500,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    }
  }, [currentSectionIndex, sections]);

  const scrollToTop = () => {
    scroll.scrollToTop();
    setCurrentSectionIndex(0);
  };

  return (
    <>
      <Fab aria-label="Scroll to top" className={classes.fab} onClick={scrollToTop}>
        <ExpandMoreIcon />
      </Fab>
      {currentSectionIndex < sections.length - 1 && (
        <Fab
          aria-label="Scroll to next section"
          className={classes.fab}
          onClick={scrollToNextSection}
        >
          <ExpandMoreIcon />
        </Fab>
      )}
    </>
  );
};

export default ScrollToTopButton;
