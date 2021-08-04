import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Typography, Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import main from '../img/main/main.jpg'
import { grey } from "@material-ui/core/colors"

const useStyles = makeStyles((theme) => ({
    main: {
        flexDirection: 'column',
        minHeight: '130vh',
        position: "relative",
        backgroundColor: grey[900],
    },
    img: {
        width: "100%",
        display: 'flex',
    },
    text: {
        color: grey[100],
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
    tt: {
        textAlign: "center"
    },
    user: {
        textAlign: "center"
    },
    Toolbar: {
        display: "flex",
        paddingTop: "60px",
        justifyContent: "space-around",

    },
    disUser: {
        textAlign: "center"
    }
}));

export default function StickyFooter() {
    const classes = useStyles();

    return (
        <div className={classes.main}>
            
            <CssBaseline />
            <div>
                <img className={classes.img}src={main}/>
            </div>
            <Container maxwightt="md">
            <div className={classes.text}>
                <div className={classes.tt}>
                    <Typography variant="h3">
                        저희 SHADE 사이트에 오신 것을 환영합니다
                    </Typography>
                    <br/><br/><br/>
                    <Typography variant="p">
                        SHADE사이트에서는 사용자분들께 다양한 TV, 영화를 추천해드리며<br/> 원하시는 영상의 가격을 여러 사이트와 비교하실 수 있습니다.
                    </Typography>
                    <br/><br/><br/>
                    <Typography variant="h6">
                        지금 바로 회원가입을 통해 여러플렛폼들의 가격과 영상을 추천받아보세요!!
                    </Typography>
                </div>
                <div className={classes.Toolbar}>
                    <div className={classes.user}>
                        <Typography variant="p" >
                            이미 회원이시라면
                        </Typography>
                        <br/><br/>
                        <Button href="/login" variant="contained" color="primary">
                            로그인
                        </Button>
                    </div>
                    <div className={classes.disUser}>
                        <Typography variant="p" >
                            아직 회원가입을 안하셨다면
                        </Typography>
                        <br/><br/>
                        <Button href="/join" variant="contained" color="secondary">
                            회원가입
                        </Button>
                    </div>
                </div>
            </div>

            </Container>
        </div>
    );
}