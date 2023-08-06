import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


const Teams = () => {
  const [clubs, setClubs] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState(
    "English Premier League"
  );

  const leagues = [
    "English Premier League",
    "Spanish La Liga",
    "Italian Serie A",
    "German Bundesliga",
    "French Ligue 1",
  ];

  useEffect(() => {
    fetch(
      `https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${selectedLeague}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setClubs(data.teams);
        
      });
  }, [selectedLeague]);

  const LeagueChange = (event) => {
    setSelectedLeague(event.target.value);
  };

  return (
    <>
      <Dropdown value={selectedLeague} onChange={LeagueChange}>
        {leagues.map((league) => (
          <option key={league} value={league}>
            {league}
          </option>
        ))}
      </Dropdown>
      <ClubWindow>
        {clubs.map((club) => (
          <StyledLink key={club.idTeam} to={`/team/${club.idTeam}`}>
            <div key={club.idTeam}>
              <Logo src={club.strTeamBadge} alt={club.strTeam} />
              <h2>{club.strTeam}</h2>
              {/* <p style={{ marginBottom: "90px" }}>{club.strKeywords}</p> */}
            </div>
          </StyledLink>
        ))}
      </ClubWindow>
    </>
  );
};

export default Teams;

const Logo = styled.img`
  height: 100px;
  margin-top: 30px;
`;

const ClubWindow = styled.div`
  width: 100%;
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
`;

const Dropdown = styled.select`
 font-size: 25px;
  padding: 8px;
  margin: 10px;
  background-color: black;
  color: white;
`;

const StyledLink = styled(Link)`

text-decoration: none;
`;

