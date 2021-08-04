import React, { useEffect, useRef, useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Button, CssBaseline, TextField, Grid, Typography, Container, Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import UserUtils from "../service/user/UserUtils";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '130vh',

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
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError,setPasswordError] = useState(false);
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");


  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [checkMessageId, setCheckMessageId] = useState("");

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
  const onChangePasswordChk = (e) => {
    setPasswordError(e.target.value !== password);
    setPasswordCheck(e.target.value);
  };
  const onChangeNickname = (e) => {
    const nickname = e.target.value;
    setNickname(nickname);
  };
  const onChangeGender = (e) => {
    const gender = e.target.value;
    setGender(gender);
  };
  const onChangeBirthday = (e) => {
    const birthday = e.target.value;
    setBirthday(birthday);
  };

  const usernameCheck = () => {
      
    UserUtils.checkUsername(username)
    .then((res) => {
      console.log("check res: ",res)
      if(res.data === true){
        // alert("이미 사용중인 아이디 입니다.")   
        setCheckMessageId("이미 사용중인 아이디 입니다.");                  
      }else if(res.data === false){
        // alert("사용 가능한 아이디 입니다.");  
        setCheckMessageId("사용 가능한 아이디 입니다."); 
      }
    });     
  }



  const handleRegister = (e) => {
     e.preventDefault();

     setMessage('');
     setSuccessful(false);

     if(password !== passwordCheck){
        return setPasswordError(true);
    }
     if(checkBtn.current.context._errors.length === 0) {
      UserUtils.join(username,email,password,nickname,birthday,gender)
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

  useEffect(() => {
    usernameCheck();
  })

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
                  helperText={idvalidation() ? "특수문자, 한글은 사용할 수 없습니다." : checkMessageId}
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
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="passwordCheck"
                  label="비밀번호확인"
                  type="password"
                  id="passwordCheck"
                  autoComplete="current-password"
                  value={passwordCheck}
                  onChange={onChangePasswordChk}
                />
                {passwordError && <div style={{color : 'red'}}>비밀번호가 일치하지 않습니다.</div>}
              </Grid>
              <strong> &emsp; --- 추가 사항 ---</strong>
              
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="nickname"
                  label="닉네임"
                  name="email"
                  autoComplete="nickname"
                  value={nickname}
                  onChange={onChangeNickname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="birthday"
                  label="생년월일"
                  name="birthday"
                  placeholder='생년월일 (yy.mm.dd)'
                  required pattern="\d{2}\d{2}\d{2}"
                  autoComplete="birthday"
                  value={birthday}
                  onChange={onChangeBirthday}
                />
              </Grid>

              <RadioGroup aria-label="gender" name="gender1" value={gender} onChange={onChangeGender}>
              <FormControlLabel value="MALE" control={<Radio />} label="남자" />
              <FormControlLabel value="FEMALE" control={<Radio />} label="여자" />             
              </RadioGroup>

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
            {/* 필수! 프로젝트 완성 전에 오류 메세지 삭제!! */}
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
            {/* 프로젝트 완성 전에 오류 메세지 삭제!! */}

            <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </Container>
  );
}