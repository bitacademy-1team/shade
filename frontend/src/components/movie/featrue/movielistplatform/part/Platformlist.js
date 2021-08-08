import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from "@material-ui/core";

import Google from "../../../../../img/google.jpeg";
import Naver from "../../../../../img/naver.jpeg";
import Wavve from "../../../../../img/wavve.jpeg";
import Netflix from "../../../../../img/netflix.jpeg";
import Watcha from "../../../../../img/watcha.jpeg";
import Googleoff from "../../../../../img/googleoff.jpeg";
import Naveroff from "../../../../../img/naveroff.jpeg";
import Wavveoff from "../../../../../img/wavveoff.jpeg";
import Netflixoff from "../../../../../img/netflixoff.jpeg";
import Watchaoff from "../../../../../img/watchaoff.jpeg";
import axios from "axios";
import { ACCESS_TOKEN, API_BASE_URL } from "../../../../../service/oauth2/OAuth";

const useStyles = makeStyles((theme) => ({
    title: {
      padding: theme.spacing(1),
    },
    li: {
      float: "left",
      margin: 0,
      padding: 0,
    },
    img: {
      width: 30,
      [theme.breakpoints.up('sm')]: {
          width: 50,
      },
    },
  }));

export default function Platformlist(props) {
    const classes = useStyles();
    const [net, setNetflix] = useState(1);
    const [wat, setWatcha] = useState(1);
    const [goo, setGoogle] = useState(1);
    const [nav, setNaver] = useState(1);
    const [wav, setWavve] = useState(1);
    const [arr,setArr] = useState([3,8,96,97,356]);
    const sendList =() =>{
        
        props.getList(arr);
    }
    const Click1 = () => {
        if (net != 1) {
            setNetflix(net + 1);
            console.log("on Netflix");
            arr[1] = 8
        } else {
            setNetflix(net - 1);
            console.log("off Netflix");
            arr[1] = 0
        };
        sendList();
    }

    const Click2 = () => {
        if (wat != 1) {
            setWatcha(wat + 1);
            console.log("on Watcha");
            arr[3] = 97
        } else {
            setWatcha(wat - 1);
            console.log("off Netflix");
            arr[3] = 0
        };
        sendList();
    }

    const Click3 = () => {
        if (goo != 1) {
            setGoogle(goo + 1);
            console.log("on Google");
            arr[0] = 3
        } else {
            setGoogle(goo - 1);
            console.log("off Google");
            arr[0] = 0
        };
        sendList();
    }

    const Click4 = () => {
        if (nav != 1) {
            setNaver(nav + 1);
            console.log("on Naver");
            arr[2] = 96
        } else {
            setNaver(nav - 1);
            console.log("off Naver");
            arr[2] = 0
        };
        sendList();
    }

    const Click5 = () => {
        if (wav != 1) {
            setWavve(wav + 1);
            console.log("on Wavve");
            arr[4] = 0
        } else {
            setWavve(wav - 1);
            console.log("off Wavve");
            arr[4] = 356
        };
        sendList();
    }

    useEffect(() => {
        if (net + wat + goo + nav + wav == 0) {
            console.log("초기화");
            setNetflix(net + 1);
            setWatcha(wat + 1);
            setGoogle(goo + 1);
            setNaver(nav + 1);
            setWavve(wav + 1);
        };
    }, [net, wat, goo, nav, wav]);

    return (
        <Grid className={classes.title} >
        <ul>
            <li className={classes.li}>
                <Button onClick={Click1}>
                    {net ? (
                        <img className={classes.img} src={Netflix} alt="netflix" />
                    ) : (
                        <img className={classes.img} src={Netflixoff} alt="netflixoff" />
                    )}
                </Button>
            </li>
            <li className={classes.li}>
                <Button onClick={Click2}>
                    {wat ? (
                        <img className={classes.img} src={Watcha} alt="watcha"/>
                    ) : (
                        <img className={classes.img} src={Watchaoff} alt="watchaoff"/>
                    )}
                </Button>
            </li>
            <li className={classes.li}>
                <Button onClick={Click3}>
                    {goo ? (
                        <img className={classes.img} src={Google} alt="google"/>
                    ) : (
                        <img className={classes.img} src={Googleoff} alt="googleoff"/>
                    )}
                </Button>
            </li>
            <li className={classes.li}>
                <Button onClick={Click4}>
                    {nav ? (
                        <img className={classes.img} src={Naver} alt="naver"/>
                    ) : (
                        <img className={classes.img} src={Naveroff} alt="naveroff"/>
                    )}
                </Button>
            </li>
            <li className={classes.li}>
                <Button onClick={Click5}>
                    {wav ? (
                        <img className={classes.img} src={Wavve} alt="wavve"/>
                    ) : (
                        <img className={classes.img} src={Wavveoff} alt="wavveoff"/>
                    )}
                </Button>
            </li>
        </ul>
      </Grid>
    )
}