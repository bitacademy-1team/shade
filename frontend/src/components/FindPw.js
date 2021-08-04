import React, { useRef, useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Grid, Typography, Container } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import UserUtils from '../service/user/UserUtils';
// import { AddAlarm } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '90vh',

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function FindId(props) {
  const classes = useStyles();
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [successful, setSuccessful] = useState(false);

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };


  const sendEmail = (e) => {
    e.preventDefault();

    setSuccessful(false);
    
    if(checkBtn.current.context._errors.length === 0){
      UserUtils.findPwCheck(username, email)
      .then((res) => {
        if(res.data === true){
          alert("임시 비밀번호가 해당 이메일로 발송되었습니다.")
          setSuccessful(true)
          console.log("res: ", JSON.stringify(res.data))
          UserUtils.findPw(username, email)
          props.history.push("/login");
          window.location.reload();
        }else {
          alert("fail: 아이디 & 이메일을 확인해 주세요.");
          console.log("res: ", JSON.stringify(res.data))
          setSuccessful(false);
        }     

      },(error) => {
        alert("error: 아이디 & 이메일을 확인해 주세요")
        setSuccessful(false);
      })
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            비밀번호 찾기
        </Typography>
        <Form className={classes.form} ref={form} onSubmit={sendEmail} noValidate>
        {!successful && (
           <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="username"
                label="아이디"
                name="username"
                value={username}
                onChange={onChangeUsername}
                autoComplete="username"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="email"
                label="이메일"
                type="email"
                id="email"
                value={email}
                onChange={onChangeEmail}
                autoComplete="email"
              />
            </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
              비밀번호 찾기
            </Button>
          </Grid> 
          )}
           <CheckButton style={{ display: "none" }} ref={checkBtn} />
           </Form>
      </div>
    </Container>
  );
}