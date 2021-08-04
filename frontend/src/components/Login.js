import React, { useRef, useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Typography, Container } from "@material-ui/core";
import UserUtils from "../service/user/UserUtils";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL, KAKAO_AUTH_URL, NAVER_AUTH_URL } from "../service/oauth2/OAuth";

import naverlogo from "../img/login/naverlogo.png";
import googlelogo from "../img/login/googlelogo.png";
import facebooklogo from "../img/login/facebooklogo.png";
import kakaologo from "../img/login/kakaologo.png";
// import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '95vh',
  },
  avatar: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  login: {
    // backgroundColor: grey[100],

  },
  form: {
    width: '100%',
    paddingTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    marginBottom: theme.spacing(5),
  },
  socallogin: {
    display: "flex",
    justifyContent: "space-between",
    
  },
  google: {
    width: 50,
    
  },
  naver: {
    width: 50,
    borderRadius: "30px" 

  },
  facebook: {
    width: 50,
    borderRadius: "30px" 

  },
  kakao: {
    width: 50,
    borderRadius: "30px" 

  },

}));

const idRequired = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        아이디를 입력해주세요
      </div>
    );
  }
};
const pwRequired = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        비밀번호를 입력해주세요
      </div>
    );
  }
};



export default function SignIn(props) {
  const classes = useStyles();
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      UserUtils.login(username, password)
        .then((res) => {
          props.history.push("/recommend");
          window.location.reload();
        },
          (error) => {
            const resMessage =
              (error.res && error.res.data && error.res.data.message)
              || error.message
              || error.toString();
            setLoading(false);
            setMessage(resMessage);
          }
        );
    } else {
      setLoading(false);
    }
  };

  return (
    <div>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <Form className={classes.form} ref={form} onSubmit={handleLogin} noValidate autoComplete="off">
           <TextField
            variant="outlined"
            color="primary"
            margin="normal"
            fullWidth
            name="username"
            label="아이디"
            type="username"
            id="username"
            className={classes.login}
            value={username}
            onChange={onChangeUsername}
            validations={[idRequired]}
            >
          </TextField>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={onChangePassword}
            validations={[pwRequired]}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            ref={checkBtn}
          >
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            로그인
          </Button>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <Grid container>
            <Grid item xs>
              <Link href="/findid" variant="body2">
                아이디
              </Link>
              <Link href="/findpw" variant="body2">
                /비밀번호 찾기
              </Link>
            </Grid>
            <Grid item>
              <Link href="/join" variant="body2">
                {"회원가입"}
              </Link>
            </Grid>
          </Grid>
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
        <br/><br/>
        <Grid container>
          <Grid item xs>
            <div className={classes.socallogin}>
              <a  href={GOOGLE_AUTH_URL}>
                <img className={classes.google} src={googlelogo} alt="google"/>
              </a>
              <a  href={NAVER_AUTH_URL}>
                <img className={classes.naver} src={naverlogo} alt="naver"/>
              </a>
              <a  href={FACEBOOK_AUTH_URL}>
                <img className={classes.facebook} src={facebooklogo} alt="facebook"/>
              </a>
              <a  href={KAKAO_AUTH_URL}>
                <img className={classes.kakao} src={kakaologo} alt="kakao"/>
              </a>
            </div>
          </Grid>
        </Grid>
      </div>
    </Container>
    </div>
  );
}
