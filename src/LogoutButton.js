import {useAuth0} from '@auth0/auth0-react';
import { useContext } from 'react';
import { AccountContext } from './AccountContext';


const LogoutButton = () => {
const {logout, isAuthenticated } = useAuth0();
const { setAccount } = useContext(AccountContext)


    return(
        isAuthenticated && (
                
            
        <button onClick={()=> {setAccount(null); logout()}}>
           Sign Out
        </button>
        )
    )
}

export default LogoutButton;