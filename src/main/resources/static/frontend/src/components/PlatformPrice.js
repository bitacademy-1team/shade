import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Hd from "../icons/hd.png";
import Kkkk from "../icons/kkkk.png";
import Sd from "../icons/sd.png";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  quality: {
    maxWidth: 75
  }
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Grid>
        <Card className={classes.quality}>
        <CardActionArea>
            <Link to="/">
            <CardMedia image={Hd} title="quality" />
            <CardContent>
            <Typography gutterBottom variant="caption">
                1,500원
            </Typography>
            </CardContent>
            </Link>
        </CardActionArea>
        </Card>
        <Card className={classes.quality}>
        <CardActionArea>
            <CardMedia image={Kkkk} title="quality" />
            <CardContent>
            <Typography gutterBottom variant="caption">
                1,500원
            </Typography>
            </CardContent>
        </CardActionArea>
        </Card>
        <Card className={classes.quality}>
        <CardActionArea>
            <CardMedia image={Sd} title="quality" />
            <CardContent>
            <Typography gutterBottom variant="caption">
                1,500원
            </Typography>
            </CardContent>
        </CardActionArea>
        </Card>
    </Grid>
  );
}
