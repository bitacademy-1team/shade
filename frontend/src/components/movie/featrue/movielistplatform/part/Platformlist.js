import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from "@material-ui/core";

import Google from "../../../../../img/platform/on/google.jpeg";
import Naver from "../../../../../img/platform/on/naver.jpeg";
import Wavve from "../../../../../img/platform/on/wavve.jpeg";
import Netflix from "../../../../../img/platform/on/netflix.jpeg";
import Watcha from "../../../../../img/platform/on/watcha.jpeg";

import Googleoff from "../../../../../img/platform/off/googleoff.jpeg";
import Naveroff from "../../../../../img/platform/off/naveroff.jpeg";
import Wavveoff from "../../../../../img/platform/off/wavveoff.jpeg";
import Netflixoff from "../../../../../img/platform/off/netflixoff.jpeg";
import Watchaoff from "../../../../../img/platform/off/watchaoff.jpeg";

const useStyles = makeStyles((theme) => ({
    title: {
      padding: theme.spacing(1),
      boxShadow: theme.shadows[5], 
      borderRadius: "30px" 
    },
    li: {
      float: "left",
      margin: 0,
      padding: 0,
    },
    img: {
      width: 30,
      [theme.breakpoints.up('sm')]: {
          width: 40,
      },
      borderRadius: "30px" 

    },
  }));

export default function Platformlist() {
    const classes = useStyles();
    const [net, setNetflix] = useState(1);
    const [wat, setWatcha] = useState(1);
    const [goo, setGoogle] = useState(1);
    const [nav, setNaver] = useState(1);
    const [wav, setWavve] = useState(1);

    const Click1 = () => {
        if (net !== 1) {
            setNetflix(net + 1);
            console.log("on Netflix");
        } else {
            setNetflix(net - 1);
            console.log("off Netflix");
        };
    }
    
    const Click2 = () => {
        if (wat !== 1) {
            setWatcha(wat + 1);
            console.log("on Watcha");
        } else {
            setWatcha(wat - 1);
            console.log("off Netflix");
        };
    }

    const Click3 = () => {
        if (goo !== 1) {
            setGoogle(goo + 1);
            console.log("on Google");
        } else {
            setGoogle(goo - 1);
            console.log("off Google");
        };
    }

    const Click4 = () => {
        if (nav !== 1) {
            setNaver(nav + 1);
            console.log("on Naver");
        } else {
            setNaver(nav - 1);
            console.log("off Naver");
        };
    }

    const Click5 = () => {
        if (wav !== 1) {
            setWavve(wav + 1);
            console.log("on Wavve");
        } else {
            setWavve(wav - 1);
            console.log("off Wavve");
        };
    }

    useEffect(() => {
        if (net + wat + goo + nav + wav === 0) {
            console.log("초기화");
            setNetflix(net + 1);
            setWatcha(wat + 1);
            setGoogle(goo + 1);
            setNaver(nav + 1);
            setWavve(wav + 1);
        };
    }, [net, wat, goo, nav, wav]);

    return (
        <Grid className={classes.title}>
        <ul flexWrap="noWrap">
            <li className={classes.li}>
                <Button onClick={Click1} >
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