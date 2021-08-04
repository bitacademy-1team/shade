import React, { useRef, useState } from 'react';
import Form from "react-validation/build/form";
import { Avatar, Button, CssBaseline, TextField, Grid, Typography, Container } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import UserUtils from '../service/user/UserUtils';
import CheckButton from "react-validation/build/button";


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

  const [email, setEmail] = useState("");
  // const [message, setMessage] = useState("");
  const [findUsername, setFindUsername] = useState("");

  const [successful, setSuccessful] = useState(false);

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    setSuccessful(false);
    
    if(checkBtn.current.context._errors.length === 0){
      
      UserUtils.findId(email)
      .then((res) => {
        setFindUsername(res.data);
        setSuccessful(true);
        // props.history.push("/login");
        // window.location.reload();
        // if(res.data === true){
        //   alert("success: ", res.data)
        //   console.log(":res: ", res)
        //   setMessage("이메일을 발송하였습니다.")
        //   setSuccessful(true);
        //   props.history.push("/login");
        //   window.location.reload();
        // }else if(res.data === false){
        //   alert("fale: ", res.data)
        //   setMessage("등록되어 있지 않은 이메일 입니다.")
        //   setSuccessful(false);
        // }    
    },(error) => {
      alert("ERROR: 이메일을 확인해 주세요")
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
          아이디 찾기
        </Typography>
        <Form className={classes.form} ref={form} onSubmit={sendEmail} noValidate>
          {!successful ? (
          <Grid container spacing={2}>
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
            아이디찾기
          </Button>
          </Grid>
          ):(
            <div>
            <h1>당신의 아이디는 {findUsername} 입니다.</h1>
            </div>
          )}        

          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </Container>
  );
}