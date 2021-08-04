import { Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: grey[900],
    padding: theme.spacing(6),
    position: "static",
    marginTop: "-50px",
  },
  typographycolor: {
    color: grey[100],
  },
}));

function Copyright() {
  const classes = useStyles();

  return (
    <Typography
      className={classes.typographycolor}
      variant="body2"
      align="center"
    >
      {"Copyright © "}
      <Link color="inherit" href="/list">
        Bit Academy Team Project 1조 2021
      </Link>{" "}
    </Typography>
  );
}

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography
        className={classes.typographycolor}
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        아무말이나 작성해도 상관없습니다!
      </Typography>
      <Copyright />
    </footer>
  );
}
