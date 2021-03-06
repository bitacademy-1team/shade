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
        // alert("?????? ???????????? ????????? ?????????.")   
        setCheckMessageId("?????? ???????????? ????????? ?????????.");                  
      }else if(res.data === false){
        // alert("?????? ????????? ????????? ?????????.");  
        setCheckMessageId("?????? ????????? ????????? ?????????."); 
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
    let check = /[~!@#$%^&*()_+|<>?:{}.,/;='"???-??? | ???-??? |???-???]/ ;
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
        <Typography component="h1">
          ????????????
        </Typography>
        <Form className={classes.form} ref={form} onSubmit={handleRegister} noValidate>
          {!successful && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="username"
                  label="?????????"
                  name="username"
                  autoComplete="lname"
                  value={username}
                  onChange={onChangeUsername}
                  error={idvalidation()}
                  helperText={idvalidation() ? "????????????, ????????? ????????? ??? ????????????." : checkMessageId}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="?????????"
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
                  label="????????????"
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
                  label="??????????????????"
                  type="password"
                  id="passwordCheck"
                  autoComplete="current-password"
                  value={passwordCheck}
                  onChange={onChangePasswordChk}
                />
                {passwordError && <div style={{color : 'red'}}>??????????????? ???????????? ????????????.</div>}
              </Grid>
              <strong> &emsp; --- ?????? ?????? ---</strong>
              
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="nickname"
                  label="?????????"
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
                  label="????????????"
                  name="birthday"
                  placeholder='???????????? (yy.mm.dd)'
                  required pattern="\d{2}\d{2}\d{2}"
                  autoComplete="birthday"
                  value={birthday}
                  onChange={onChangeBirthday}
                />
              </Grid>

              <RadioGroup aria-label="gender" name="gender1" value={gender} onChange={onChangeGender}>
              <FormControlLabel value="M" control={<Radio />} label="??????" />
              <FormControlLabel value="F" control={<Radio />} label="??????" />             
              </RadioGroup>

              <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              ????????????
            </Button>
            </Grid>
            )}
            {/* ??????! ???????????? ?????? ?????? ?????? ????????? ??????!! */}
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
            {/* ???????????? ?????? ?????? ?????? ????????? ??????!! */}

            <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </Container>
  );
}