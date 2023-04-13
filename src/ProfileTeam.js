import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ProfileTeam = ({ teamId }) => {
  const [team, setTeam] = useState(null);

  useEffect(() => {
    fetch(
      `https://www.thesportsdb.com/api/v1/json/60130162/lookupteam.php?id=${teamId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setTeam(data.teams[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [teamId]);

  if (!team) {
    return null;
  }
  return (
    
      <StyledLink to={`/team/${team.idTeam}`}>
        <Logo src={team.strTeamBadge} alt={team.strTeam} />
        <h2>{team.strTeam}</h2>
        <p>{team.strKeywords}</p>
      </StyledLink>
    
  );
};

export default ProfileTeam;


const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  text-align: center;
`;

const Logo = styled.img`
  height: 100px;
  margin-top: 30px;
`;
