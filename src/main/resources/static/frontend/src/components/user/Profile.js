import React, { useEffect, useState } from 'react';
import UserUtils from '../../service/user/UserUtils';

const Profile = (props) => {


    const [currentUser, setCurrentUser] = useState(null);

    const updateUser = () =>{
        props.history.push('/updateUser/');
    }


    const user = () => {
        
        UserUtils.getCurrentUser()
        .then((res) => {
            console.log("res:", res);
            setCurrentUser(res)
        })  
      } 

      useEffect(() => {
        user();
      },[]);



    return (
        <div className="container">
            {currentUser ? (
                <div>
                    <header className="jumbotron">
                        <h3>
                            <strong>{currentUser.username}</strong>ProFile
                        </h3>
                    </header>
                    <p>
                        <strong>Id:</strong>    {currentUser.id}
                    </p>
                    <p>
                        <strong>Email:</strong> {currentUser.email}
                    </p>
                    <strong>Authorities:</strong> {currentUser.roles}
                </div>
            ) : (
                <div>
                    false
                </div>
            )}
             <button variant="warning" onClick={updateUser}>    수정     </button>       
        </div>
    );
};

export default Profile;