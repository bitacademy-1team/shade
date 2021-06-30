import React, { useRef, useState } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../../service/user/AuthService";


const required = (value) => {
    if (!value){
        return (
            <div>
                값을 입력하세요
            </div>
        );
    }
};
const validEmail = (value) => {
    if (!isEmail(value)){
        return (
            <div>
                이메일 형식이 아닙니다.
            </div>
        );
    }
};
const vusername = (value) => {
    if (value.length < 3 || value.length > 20){
        return (
            <div>
                아이디 값은 3 ~ 20 자리 이내로 입력하세요
            </div>
        );
    }
};
const vpassword = (value) => {
    if (value.length < 4 || value.length > 20){
        return (
            <div>
                비밀번호 값은 4 ~ 20 자리 이내로 입력하세요
            </div>
        );
    }
};

const Join = (props) => {

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

       form.current.validateAll();

       if(checkBtn.current.context._errors.length === 0) {
           AuthService.join(username,email,password)
           .then((res)=>{
               setMessage(res.data.message);
               setSuccessful(true);
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


    return (
        <div className="col-md-12">
        <div className="card card-container">    
  
          <Form onSubmit={handleRegister} ref={form}>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>
  
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required, validEmail]}
                  />
                </div>
  
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>
  
                <div className="form-group">
                  <button className="btn btn-primary btn-block">회원가입</button>
                </div>
              </div>
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
      </div>
    );
};

export default Join;