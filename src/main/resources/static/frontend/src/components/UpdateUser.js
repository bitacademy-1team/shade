import React, { useEffect, useState } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import UserUtils from '../../service/user/UserUtils';

const UpdateUser = (props) => {

    const [user, setUser] = useState(null);

    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");

    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");


    const onChangePassword = (e) => {
        // {e.target.value ? (
        //     password = "asdasdasd"
        // ) : (
        //     password = e.target.value
        // )}
        const password = e.target.value;
        setPassword(password);
    };
    const onChangeNickname = (e) => {
        const nickname = e.target.value;
        setNickname(nickname);
      };




    const information = () => {
        UserUtils.getCurrentUser()
        .then((res) => {
            setUser(res)
        })
    }

    const test = (e) => {
        e.preventDefault();
        let password = document.getElementById("userPW").value
        let nickname = document.getElementById("userNic").value
       UserUtils.updateUser(user.username, user.email, password, nickname)
       .then((res)=>{
            setMessage("회원정보 수정완료")
            props.history.push("/");
            })
    }

    useEffect(()=> {
        information();
    },[]);

    return (
        <div>
            <Form onSubmit={test}>
                <div>  
                    { user ? (
                        <div>

                            <Input
                                type="text"
                                placeholder={user.username}
                                name="username"
                                value={user.username}
                            />

                            <Input
                                type="text"
                                placeholder={user.email}
                                name="email"
                                value={user.email}
                            />

                            <Input
                                type="password"
                                placeholder="변경할 비밀번호를 입력해 주세요."
                                name="password"
                                id="userPW"
                                // onChange={onChangePassword}
                            />

                            <Input
                                type="text"
                                placeholder={user.nickname}
                                name="nickname"
                                value={user.nickname}
                                id="userNic"
                                // onChange={onChangeNickname}
                            />

                            <button variant="primary" type="submit">
                                Submit
                            </button>
                        </div>
                    ) : (
                        <h1>fail</h1>
                    )}
                </div>
            </Form>
        </div>
    );
};

export default UpdateUser;