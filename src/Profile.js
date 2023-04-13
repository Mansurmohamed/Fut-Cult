import LoginButton from "./LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import { AccountContext } from "./AccountContext";
import { useContext, useEffect } from "react";
import ProfileTeam from "./ProfileTeam";
import styled from "styled-components";

const Profile = () => {
  const { account, setAccount } = useContext(AccountContext);
  const { user, isAuthenticated } = useAuth0();

  console.log(account);
  console.log(user, isAuthenticated);

  useEffect(() => {
    console.log("useEffect fired off");
    const fetchData = async () => {
      console.log("fetch data ");
      try {
        const response = await fetch("/api/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
          }),
        });
        const result = await response.json();
        setAccount(result.user);
      } catch (error) {
        console.error(error);
      }
    };

    if (isAuthenticated && user && !account) {
      fetchData();
    }
  }, [isAuthenticated, user, setAccount]);
  console.log(account);

  if (!isAuthenticated) {
    return (
      <div>
        <LoginButton />
      </div>
    );
  }

  return (
    <>
      <Col>
        <LogoutButton />
        <h2> User Profile</h2>
        <img src={user.picture} alt="" />
        <h3>User name: {user.name}</h3>
        <p>Email : {user.email}</p>
      </Col>
      <Col>
        <h1> Favorites</h1>
        <StyledTeam>
          {account &&
            account.favoriteTeams.map((teamId) => (
              <ProfileTeam key={teamId} teamId={teamId} />
            ))}
        </StyledTeam>
      </Col>
    </>
  );
};

export default Profile;

const StyledTeam = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100vw;
  margin: 20px;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;
