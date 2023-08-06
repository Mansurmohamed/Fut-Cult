import { useState, useEffect } from "react"; // imports useState and useEffect, two important
// hooks for this application
import styled from "styled-components";
// allows the use of styled components to style properties
import { MdOutlineStadium } from "react-icons/md";

// Imports the stadium icon for use

// This variable consists of the leagues that are on the selector//
const leagues = [
  { name: "Premier League", id: "4328" },
  { name: "La Liga", id: "4335" },
  { name: "Serie A", id: "4332" },
  { name: "Bundesliga", id: "4331" },
  { name: "Ligue 1", id: "4334" },
  { name: "Eredevisie", id: "4337" },
  { name: "Belgian Pro League", id: "4338" },
];

const Home = () => {
  const [activeLeagueId, setActiveLeagueId] = useState(leagues[0].id);
  const [events, setEvents] = useState([]); // the states here handle the changes of the page
  //when going from league to league //
  const [error, setError] = useState(null);

  useEffect(() => {
    // This fetch retrieves the information such as the match fixtures from the API and display it on
    //the page //
    fetch(
      `https://www.thesportsdb.com/api/v1/json/60130162/eventsnextleague.php?id=${activeLeagueId}`
    )
      .then((response) => response.json())
      .then((data) => {
        if(data?.events){
          setEvents(data.events);
          setError(null);
        } else{
          setEvents([]);
          setError("There are no upcoming games");
        }
        console.log(data); // this line lets me see the data in object format in the console//
        setEvents(data.events); // this state allows the data to display on the page//
      })
      .catch((error) => {
        console.error(error);
      });
  }, [activeLeagueId]); // this dependency array runs the function runs it only when activeLeagueId is touched.//

  const handleLeagueClick = (leagueId) => {
    // this lets us view games from different leagues upon click//
    setActiveLeagueId(leagueId);
  };

  return (
    <Container>
       <Header>GAMES</Header> 
      <TabsContainer>
        {leagues.map(
          (
            league // this holds the leagues as buttons and lets you see games of each by a click//
          ) => (
            <Tab
              key={league.id}
              active={league.id === activeLeagueId}
              onClick={() => handleLeagueClick(league.id)}
            >
              {league.name}
            </Tab>
          )
        )}
      </TabsContainer>
      {error ? (
        <NoGamesTextBox><NoGamesMessage>{error}</NoGamesMessage>
        </NoGamesTextBox>
      ) : (
      <EventList>
        {events.map(
          (
            event // This displays the games name, venue name and time on the page//
          ) => (
            <EventItem key={event.idEvent}> 
              <EventTitle>{event.strEvent}</EventTitle>
            
              <VenueContainer>
                <VenueIcon />
                <VenueName>{event.strVenue}</VenueName>
              </VenueContainer>
              <EventDate>{event.dateEvent}</EventDate>
            </EventItem>
          )
        )}
      </EventList>
        )}
    </Container>
  );
};

export default Home;

const Container = styled.div` // sets a div that acts as a container with two style properties
  max-width: 1100px;
  margin: 0 auto;
`;

const Header = styled.h1` // creates a component based on a h1.
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  letter-spacing: 2px;
  // sets the styles including font size, font weight and margin 
`;

const Tab = styled.div`
  padding: 10px 20px;
  border: 1px solid ${({ active }) => (active ? "#faa165" : "#ccc")};
  cursor: pointer;
  background-color: ${({ active }) => (active ? "black" : "black")};
  // Ternary operators : if active is true or the button is clicked, the background
  // color will be
  // white, marked as #fff and if it is not active or clicked, it remains light grey #eee.

  color: ${({ active }) => (active ? "#faa165" : "#fff")};
  // Similar case here, if the button is active, text color will be gold, marked by #faa165
  // and if it is not touched, it will remain white.
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  // here, if the button is touched or is true, font weight becomes bold, otherwise
  // it remains normal.
  &:first-child {
    border-top-left-radius: 5px; 
    border-bottom-left-radius: 5px;
    // Gives the first child of the parent element two border radius properties
  }
  &:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    //Gives the last child of the parent element these properties
  }
  margin-right: 10px;
`;

const EventItem = styled.li` //creates a new styled component based on a list item element
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #e0e0e0;
  //sets the styles for the EventItem component, including display as flex, 
  //space-between alignment of items and a bottom border with a specific color.
  &:last-child { //targets the last child of the EventItem component, to remove the bottom border.
    border-bottom: none;
    //removes the bottom border of the last child EventItem
  }
`;

const TabsContainer = styled.div` //creates a new styled component based on a div element.
  display: flex;
  justify-content: center;
  margin-top: 20px;
  //sets the styles for the TabsContainer component, 
  //including display as flex, center alignment of items, and a top margin.
`;

const EventList = styled.ul` //creates a new styled component based on an unordered list element.
  list-style: none;
  padding: 0;
  //sets the styles for the EventList component, 
  //including removing the default list bullet point and setting the padding to 0.
`;

const EventTitle = styled.span` //creates a new styled component based on a span element.
  font-size: 16px;
  font-weight: bold;
  //sets the styles for the EventTitle component, including font size and weight.
`;

const EventDate = styled.span` //creates a new styled component based on a span element.
  font-size: 14px;
  color: white;
  //sets the styles for the EventDate component, including font size and text color.
`;

const VenueName = styled.p` //creates a new styled component based on a paragraph element.
  font-size: 16px;
  margin-left: 5px;
  //sets the styles for the VenueName component, including font size and a left margin.
`;

const VenueContainer = styled.div` //creates a new styled component based on a div element.
  display: flex;
  align-items: center;
  margin-left: 10px;
  //sets the styles for the VenueContainer component, 
  //including display as flex, center alignment of items and a left margin.
`;

const VenueIcon = styled(MdOutlineStadium)` //sets the stadium icon from react icons
  font-size: 30px;
  // sets the style for the VenueIcon, with a font size of 30px
`;

const NoGamesMessage = styled.p`
  /* styles for the no games message */
  font-size: 70px;
`;

const NoGamesTextBox = styled.div`
text-align: center;
justify-content: center;
margin-top: 250px; 
`;