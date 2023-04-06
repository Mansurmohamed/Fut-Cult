import LoginButton from "./LoginButton";
import {useAuth0} from '@auth0/auth0-react';
import LogoutButton from "./LogoutButton";

const Profile = () => {
    const {user, isAuthenticated} = useAuth0();
    // console.log(user);

    if(!isAuthenticated){
        return(
            <div>
                <LoginButton />
            </div>
        );
    }


return (
   <>
    <div style={{color:'white'}}>
        <LogoutButton />
        <h2> User Profile</h2>
        <img src={user.picture} alt="" />
        <h3>User name: {user.name}</h3>
        <p>Email : {user.email}</p>
    </div>
    <div>
    <h1> Favorites</h1>
    </div>
    </>
);


};

export default Profile;