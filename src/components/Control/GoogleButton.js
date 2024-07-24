import { Button, Icon } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import logogoole from "assets/images/logos/7611770.png";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#4082ED",
    height: "2.3rem",

    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: "#4082ED",
    },
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const GoogleButton = ({ onClick }) => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      fullWidth
      className={classes.root}
      onClick={onClick}
      startIcon={
        <img
          style={{ color: "#FFA500", backgroundColor: "white" }}
          height={30}
          width={30}
          src={logogoole}
        ></img>
      }
      sx={{}}
    >
      Đăng nhập với tài khoản google
    </Button>
  );
};

export default GoogleButton;
