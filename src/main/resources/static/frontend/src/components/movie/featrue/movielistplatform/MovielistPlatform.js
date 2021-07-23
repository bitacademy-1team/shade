import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Toolbar, Typography } from "@material-ui/core";
import ArrayMenu from "./part/ArrayMenu";
import Platformlist from "./part/Platformlist";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    marginTop: "2%",
  },
}));

export default function MovielistPlatform() {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <Container>
        <Toolbar>
          <ArrayMenu/>
          <Platformlist/>
        </Toolbar>
      </Container>
    </div>
  )
}