import React, { useRef, useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Button, CssBaseline, TextField, Grid, Typography, Container } from "@material-ui/core";
import AuthService from "../service/user/AuthService";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '60vh',

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Join(props) {
  const classes = useStyles();
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
      const username = e.target.value;
      setUsername(username);
  };
  const onChangeEmail = (e) => {
      const email = e.target.value;
      setEmail(email);
  };
  const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
  };
  const handleRegister = (e) => {
     e.preventDefault();

     setMessage('');
     setSuccessful(false);

    //  form.current.validateAll();

     if(checkBtn.current.context._errors.length === 0) {
         AuthService.join(username,email,password)
         .then((res)=>{
             setMessage(res.data.message);
             setSuccessful(true);
             props.history.push("/login");
             window.location.reload();
         },
         (error) => {
             const resMessage =
             (error.res && error.res.data && error.res.data.message)
              ||
             error.message
             ||
             error.toString();

             setMessage(resMessage);
             setSuccessful(false);
         }
         );
     }
  };

  const idvalidation =(value)=>{
    let check = /[~!@#$%^&*()_+|<>?:{}.,/;='"ㄱ-ㅎ | ㅏ-ㅣ |가-힣]/ ;
    return check.test(username);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <Form className={classes.form} ref={form} onSubmit={handleRegister} noValidate>
          {!successful && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="username"
                  label="아이디"
                  name="username"
                  autoComplete="lname"
                  value={username}
                  onChange={onChangeUsername}
                  error={idvalidation()}
                  helperText={idvalidation() ? "특수문자, 한글은 사용할 수 없습니다." : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="이메일"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={onChangeEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="password"
                  label="비밀번호"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={onChangePassword}
                />
              </Grid>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              회원가입
            </Button>
            </Grid>
            )}
            {message && (
              <div className="form-group">
                <div
                  className={ successful ? "alert alert-success" : "alert alert-danger" }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}

            <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </Container>
  );
}



