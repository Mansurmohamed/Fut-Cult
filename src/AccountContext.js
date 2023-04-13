import { createContext, useState} from "react";
// import { useAuth0 } from '@auth0/auth0-react';
export const AccountContext = createContext();


export const AccountProvider = ({ children }) => {

    const [account, setAccount] = useState(null);
    // const { user, isAuthenticated } = useAuth0();
    console.log(account)


    return (
        <AccountContext.Provider value={{account, setAccount}}>
            {children}
        </AccountContext.Provider>
    )
}


