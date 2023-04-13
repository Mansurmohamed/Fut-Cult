  import { useAuth0 } from '@auth0/auth0-react';

  const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();
    console.log(isAuthenticated, user)
   

    return !isAuthenticated && <button onClick={loginWithRedirect}>Sign In</button>;
  };

  export default LoginButton;