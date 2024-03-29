import { useEffect, useState } from "react"; // imports useState and useEffect, two important
// hooks for this application
import styled from "styled-components";
import { Link } from "react-router-dom";
 // imports link capabilities into component


const Leagues = () => { // component with two useStates, one starting with an id of 4328 and the 
  // next one starting at an empty array
  const [leagueId, setLeagueId] = useState("4328");
  const [teams, setTeams] = useState([]);

  const LeagueOptions = [ // ID's of each league available in the drop down
    {label: "Premier League", value:"4328"},
    {label: "Bundesliga", value: "4331"},
    {label: "Serie A", value: "4332"},
    {label: "Ligue 1", value: "4334"},
    {label: "La Liga", value: "4335"},
    {label: "Eredevisie", value: "4337"},
    {label: "Belgian Pro", value: "4338"},
    // {label: 'test', value: "4553"},
    {label:"Danish Superliga", value:"4340"},
  ];

  //League IDs
  // PL = 4328
  // Bundesliga = 4331
  // Serie A = 4332
  // Ligue 1 = 4334
  // La Liga = 4335
  // Eredevisie = 4337
  // Belgian pro = 4338
  // Denmark = 4340
  // Russia = 4355
  // Scottish championship = 4395
  // English league 1 = 4396
  // 4399 = german 2 
  // 4356 = Australian A league
  // 4400 = spanish 2 
  // 4401 = french 2 
  // 4422 = Poland
  // UCL = 4480
  // UEL = 4481

  useEffect(() => { // UseEffect fetches the league table data from theSportsDB API.
    fetch(
    `https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=${leagueId}&s=2022-2023`
    )
      .then((response) => response.json())
      .then((data) => {
        // process the response data
        console.log(data); // view the data as objects on the console
        const sortedTeams = data.table.sort((a, b) => a.intRank - b.intRank);
        setTeams(sortedTeams);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [leagueId]);

  const handleLeagueChange = (event) => {
    setLeagueId(event.target.value);
  };


  return (

    <div>
      <h1 style={{color:'white', backgroundColor:'black'}}>
      {LeagueOptions.find((option) => option.value === leagueId).label} Table 
      2022/2023</h1>
      <LeagueDropdown value={leagueId} onChange={handleLeagueChange}>
      {LeagueOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </LeagueDropdown>
      <LeagueTable>
        <thead>
          <tr>
            <RankTd>Position</RankTd>
            <Th>Team</Th>
            <Th>Played</Th>
            <Th>Won</Th>
            <Th>Drawn</Th>
            <Th>Lost</Th>
            <Th>GF</Th>
            <Th>GA</Th>
            <Th>GD</Th>
            <Th>Points</Th>
          </tr>
        </thead>
        <tbody>
        {teams.map((team) => (
  <tr key={team.idTeam}>
    <RankTd>{team.intRank}</RankTd>
    <TeamTd>
      <StyledLink to={`/teams/${team.idTeam}`}>
        <TeamLogo
          src={team.strTeamBadge}
          alt={team.name}
          width="40"
          height="40"
        />
        {team.strTeam}
      </StyledLink>
    </TeamTd>
    <Td>{team.intPlayed}</Td>
    <Td>{team.intWin}</Td>
    <Td>{team.intDraw}</Td>
    <Td>{team.intLoss}</Td>
    <Td>{team.intGoalsFor}</Td>
    <Td>{team.intGoalsAgainst}</Td>
    <Td>{team.intGoalsFor - team.intGoalsAgainst}</Td>
    <Td>{team.intPoints}</Td>
  </tr>
))}
        </tbody>
      </LeagueTable>
    </div>
  );
};

export default Leagues;

// STYLES //

const StyledLink = styled(Link)`

text-decoration: none;
color: inherit;
`;

const LeagueDropdown = styled.select`
  font-size: 25px;
  padding: 8px;
  margin: 10px;
  background-color: black;
  color: white;
`;


 const LeagueTable = styled.table`
 /* background-color:black; */
 border-collapse: collapse;
 width: 100%;
 margin-top:20px;
 margin-bottom: 20px;
 `;


const Th = styled.th`
text-align: left;
  font-weight: bold;
  font-size: 24px;
  color: white; /*#3d3d3d;*/
   background-color: black; /*#f8f9fa; */
   border: 1px solid black; /*#e9ecef; */
  padding: 12px;
`;

const Td = styled.td`
font-size: 24px;
  color: white;
  border: 1px solid black; /*#e9ecef;*/
  padding: 12px;
`;

const RankTd = styled(Td)`
  color: white;
   background-color: black;/*#6c757d; */
   font-size: 24px;
`;

const TeamTd = styled(Td)`
  display: flex;
  align-items: center;
  font-size: 24px;
`;

const TeamLogo = styled.img`
margin-right:10px; 
`;