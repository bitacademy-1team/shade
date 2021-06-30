import React, { useEffect, useState } from 'react';
import UserService from '../../service/user/UserService';

const Home = () => {

    const [content, setContent] = useState('');

    useEffect(() => {
        UserService.getPublicContent()
        .then((res) => {
            setContent(res.data);
        },
        (error) => {
            const _content = 
            (error.res && error.res.data)
            ||
            error.message
            ||
            error.toString();

            setContent(_content);
        }
        );
    },[]);

    return (
       <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
    );
};

export default Home;