import { Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6)
    }
  }));

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
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