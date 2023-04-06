// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import styled from "styled-components";

// const Team = () => {
//   const { id } = useParams();
//   const [team, setTeam] = useState(null);

//   useEffect(() => {
//     fetch(`https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League`)
//       .then((response) => response.json())
//       //https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=Spanish%20La%20Liga//
//       .then((data) => {
//         const teams = data.teams;
//         const filteredTeam = teams.find(team => team.idTeam === id);
//         setTeam(filteredTeam);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, [id]);

//   if (!team) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Container>
//       <TeamInfo>
//         <TeamLogo src={team.strTeamBadge} alt="logo">
//         </TeamLogo>
//         <TeamName>{team.strTeam}</TeamName>
//       </TeamInfo>
//       <TeamDetails>
//         <TeamDescription>{team.strDescriptionEN}</TeamDescription>
//         <LeagueInfo>
//           <h3>League Info</h3>
//           <p>League: {team.strLeague}</p>
//           <p>Country: {team.strCountry}</p>
//           <p>Formed in: {team.intFormedYear}</p>
//           {/* <h2>Current season Jersey</h2>
//           <img src={team.strTeamJersey} alt="jersey"></img>  */}
//         </LeagueInfo>
//       </TeamDetails>
//     </Container>
//   );
// };

// export default Team;

// const Container = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 20px;
//   margin: 20px;
// `;

// const TeamInfo = styled.div`
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   gap: 10px;
//   margin-bottom: 47px;
//   margin-right: 8px;
// `;

// const TeamLogo = styled.img`
//   height: 260px;
//   width: 260px;
// `;

// const TeamName = styled.p`
//   font-size: 32px;
// `;

// const TeamDetails = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
// `;

// const TeamDescription = styled.p`
// margin-top: 60px;
//   font-size: 20px;
//   line-height: 1.5;
// `;

// const LeagueInfo = styled.div`
//   border: 1px solid gray;
//   padding: 10px;
// `;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Team = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);

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

  return (
    <Container>
      <TeamInfo>
        <TeamLogo src={team.strTeamBadge} alt="logo">
        </TeamLogo>
        <TeamName>{team.strTeam}</TeamName>
        <TeamJersey src={team.strTeamJersey} alt="shirt"></TeamJersey> 
      </TeamInfo>
      <TeamDetails>
        <TeamDescription>{team.strDescriptionEN}</TeamDescription>
        <LeagueInfo>
          <h3>League Info</h3>
          <p>League: {team.strLeague}</p>
          <p>Country: {team.strCountry}</p>
          <p>Formed in: {team.intFormedYear}</p>
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
