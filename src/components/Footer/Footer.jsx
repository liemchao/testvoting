import { BottomNavigation, BottomNavigationAction, Box, Grid, Typography } from "@mui/material";
import { Instagram, Facebook, Twitter } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.gray,
    width: "100%",
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    fontWeight: 500,
    color: theme.palette.grey[500],
  },
  address: {
    marginTop: theme.spacing(1),
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body1" className={classes.info}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, erat quis
            lacinia bibendum, quam tortor iaculis nunc, vitae tincidunt est ante nec est.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Address
          </Typography>
          <Typography variant="body1" className={classes.info}>
            1234 Main St.
          </Typography>
          <Typography variant="body1" className={classes.info}>
            Suite 567
          </Typography>
          <Typography variant="body1" className={classes.info}>
            New York, NY 10001
          </Typography>
          <Typography variant="body1" className={classes.info}>
            United States
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" className={classes.info}>
            Phone: +1 555-555-5555
          </Typography>
          <Typography variant="body1" className={classes.info}>
            Email: info@example.com
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
}

export default Footer;
