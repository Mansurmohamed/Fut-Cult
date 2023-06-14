import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

const SignInButton = styled.button`

font-size: 50px;
cursor: pointer;
background-color: black;
color: white;
margin: auto;
border: solid;
letter-spacing: 1px;
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

  const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();
    console.log(isAuthenticated, user)
   

    return <PageContainer>!isAuthenticated && <SignInButton onClick={loginWithRedirect}>Sign In</SignInButton>
    </PageContainer>;
  };

  export default LoginButton;