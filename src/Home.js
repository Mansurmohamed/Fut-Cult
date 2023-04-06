 import { useState, useEffect } from "react";
import styled from "styled-components";

const Home = () => {
  const [leagueId, setLeagueId] = useState("4328");
  const [events, setEvents] = useState([]);

// PL = 4328
  // Bundesliga = 4331
  // Serie A = 4332
  // Ligue 1 = 4334
  // La Liga = 4335

  useEffect(() => {
    fetch(`https://www.thesportsdb.com/api/v1/json/60130162/eventsnextleague.php?id=${leagueId}`)

      .then((response) => response.json())
      .then((data) => {
        // process the response data
        console.log(data);
        setEvents(data.events);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [leagueId]);

  const handleLeagueChange = (ev) => {
    setLeagueId(ev.target.value);
  };

  return (
    <Container>
      <Header>Latest Soccer Events</Header>
      <SelectContainer>
        <Select value={leagueId} onChange={handleLeagueChange}>
          <option value="4328">Premier League</option>
          <option value="4335">La Liga</option>
          <option value="4332">Serie A</option>
          <option value="4331">Bundesliga</option>
          <option value="4334">Ligue 1</option>
        </Select>
      </SelectContainer>
      <EventList>
        {events.map((event) => (
          <EventItem key={event.idEvent}>
            <EventTitle>{event.strEvent}</EventTitle>
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

const EventList = styled.ul`
  list-style: none;
  padding: 0;
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

const SelectContainer = styled.div`
  margin-bottom: 10px;
`;

const Select = styled.select`
  font-size: 16px;
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const EventTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const EventDate = styled.span`
  font-size: 14px;
  color: white;
  font-weight: bold;
`;