import React, { useEffect, useState } from 'react';
import { getPublicContent } from '../../service/user/UserUtils';

const Home = () => {

    const [content, setContent] = useState('');

    useEffect(() => {
        getPublicContent()
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