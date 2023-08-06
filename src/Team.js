import { useEffect, useState,useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";
import { AccountContext } from "./AccountContext";


const Team = () => {
  const { account, setAccount } = useContext(AccountContext);
  const { id } = useParams();
  const [team, setTeam] = useState(null);
console.log(account)

const UnfavoriteTeam = () => {
  console.log(team.idTeam)
  fetch(`/api/user/remove/favorite-team/${team.idTeam}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email: account.email}),
  })
    // .then((response) => response.json())
    .then((data) => setAccount({...account, favoriteTeams: account.favoriteTeams.filter(favoriteTeam => favoriteTeam !== team.idTeam) }))
    .catch((error) => console.error(error));
};

  const favoriteTeam = () => {
    console.log(team.idTeam)
    fetch(`/api/user/add/favorite-team/${team.idTeam}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: account.email}),
    })
      // .then((response) => response.json())
      .then((data) => setAccount({...account, favoriteTeams: [...account.favoriteTeams, team.idTeam]}))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetch(`https://www.thesportsdb.com/api/v1/json/60130162/lookupteam.php?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTeam(data.teams[0]);
      })
      .catch((error) => {
        console.error(error); 
      });
  }, [id]);

  if (!team) {
    return <div>Loading...</div>;
  }

 const isIncluded = account && account.favoriteTeams.includes(team.idTeam)
 
  return (
    <Container>
      <TeamInfo>
        <TeamLogo src={team.strTeamBadge} alt="logo">
        </TeamLogo>
        <TeamName>{team.strTeam}</TeamName>
        {account &&<AiOutlineHeart style={{ color:isIncluded ? "red": "white",fontSize:"39px", marginTop:'10px'}} onClick={isIncluded ? UnfavoriteTeam: favoriteTeam} />}
      </TeamInfo>
      <TeamDetails>
      <LeagueInfo>
      <TeamDescription>{team.strDescriptionEN}</TeamDescription>
          <h3>Info</h3>
          <p>Competitions:</p> 
          <ul>
          <li>{team.strLeague}</li>
          <li>{team.strLeague2}</li>
          <li>{team.strLeague3}</li>  
          <li>{team.strLeague5}</li>
          </ul>
          <p>Country: {team.strCountry}</p>
          <p>Formed in: {team.intFormedYear}</p>
          <p>🏟️ : {team.strStadium}</p>
          <TeamJersey src={team.strTeamJersey} alt="shirt"></TeamJersey>
        </LeagueInfo>
      </TeamDetails>
    </Container>
  );
};

export default Team;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 20px;
`;

const TeamInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 47px;
  margin-right: 8px;
`;

const TeamLogo = styled.img`
  height: 260px;
  width: 260px;
`;

const TeamJersey = styled.img`

height: 350px;
width: 350px;
margin-left:1200px;
margin-top: -210px;
`;

const TeamName = styled.p`
  font-size: 32px;
`;

const TeamDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TeamDescription = styled.p`
  margin-top: 60px;
  font-size: 20px;
  line-height: 1.5;
`;

const LeagueInfo = styled.div`
  border: 1px solid gray;
  padding: 10px;
`;
