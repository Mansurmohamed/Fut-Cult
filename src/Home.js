import { useState, useEffect } from "react";
import styled from "styled-components";
import {MdOutlineStadium} from "react-icons/md";


const leagues = [  { name: "Premier League", id: "4328" },  { name: "La Liga", id: "4335" },  { name: "Serie A", id: "4332" },  { name: "Bundesliga", id: "4331" },  { name: "Ligue 1", id: "4334" }, 
{ name: "Eredevisie", id: "4337" }, { name: "Belgian Pro League", id: "4338" },];

const Home = () => {
  const [activeLeagueId, setActiveLeagueId] = useState(leagues[0].id);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`https://www.thesportsdb.com/api/v1/json/60130162/eventsnextleague.php?id=${activeLeagueId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEvents(data.events);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [activeLeagueId]);

  const handleLeagueClick = (leagueId) => {
    setActiveLeagueId(leagueId);
  };

  return (
    <Container>
      <Header>Latest Soccer Events</Header>
      <TabsContainer>
        {leagues.map((league) => (
          <Tab key={league.id} active={league.id === activeLeagueId} onClick={() => handleLeagueClick(league.id)}>
            {league.name}
          </Tab>
        ))}
      </TabsContainer>
      <EventList>
        {events.map((event) => (
          <EventItem key={event.idEvent}>
            <EventTitle>{event.strEvent}</EventTitle>
         
            <VenueContainer>
            <VenueIcon />
            <VenueName>{event.strVenue}</VenueName>
            </VenueContainer>
            <EventDate>{event.dateEvent}</EventDate>
          </EventItem>
        ))}
      </EventList>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const Header = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Tab = styled.div`
  padding: 10px 20px;
  border: 1px solid ${({ active }) => (active ? "#000" : "#ccc")};
  border-bottom: none;
  cursor: pointer;
  background-color: ${({ active }) => (active ? "#fff" : "#eee")};
  color: ${({ active }) => (active ? "#000" : "#666")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  &:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  &:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-right: none;
  }
  margin-right: 10px;
`;




const EventItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #e0e0e0;
  &:last-child {
     border-bottom: none;
  }
 `;

const TabsContainer = styled.div`
display: flex;
justify-content: center;
margin-top: 20px;
`;


const EventList = styled.ul`
list-style: none;
padding: 0;
`;

const EventTitle = styled.span`
font-size: 16px;
font-weight: bold;
`;

const EventDate = styled.span`
font-size: 14px;
color: white;
`;

const VenueName = styled.p`
font-size: 16px;
  margin-left: 5px;
`;

const VenueContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const VenueIcon = styled(MdOutlineStadium)`
font-size: 30px;
`;