import {useAuth0} from '@auth0/auth0-react';
import { useContext } from 'react';
import { AccountContext } from './AccountContext';
import styled from 'styled-components';

const SignOutButton = styled.button`
font-size: 50px;
cursor: pointer;
background-color: black;
color: white;
margin: auto;
border: solid;
letter-spacing: 1px;

`;

const LogoutButton = () => {
const {logout, isAuthenticated } = useAuth0();
const { setAccount } = useContext(AccountContext)


    return(
        isAuthenticated && (
                
            
        <SignOutButton onClick={()=> {setAccount(null); logout()}}>
           Sign Out
        </SignOutButton>
        )
    )
}

export default LogoutButton;