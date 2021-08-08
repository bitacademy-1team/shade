import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Toolbar } from "@material-ui/core";
import ArrayMenu from "./part/ArrayMenu";
import Platformlist from "./part/Platformlist";
import { grey } from "@material-ui/core/colors"

const useStyles = makeStyles((theme) => ({
  grow: {
    display: "flex",
    flexWrap: "wrap",
    paddingTop: 10,
    backgroundColor: grey[900],
  },
}));

export default function MovielistPlatform(props) {
  const [list,setList] = useState([]);
  const classes = useStyles();
  const getList = (data) => {
    props.getList(data);
  }
  return (
    <div className={classes.grow}>
      <Container>
        <Toolbar display="flex" flexWrap="wrap">
          <ArrayMenu/> 
          <Platformlist getList={getList}/>
        </Toolbar>
      </Container>
    </div>
  )
}