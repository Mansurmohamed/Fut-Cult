import styled from "styled-components";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";

const NavigationBar = () => {
  return (
    <NavBox>
      <NavItems>
        <Items>
          <StyledLink to="/">Home</StyledLink>
        </Items>
        <Items>
          {" "}
          <StyledLink to="/Teams">Teams</StyledLink>
        </Items>
        <Items>
          <StyledLink to="/Highlights">Highlights</StyledLink>
        </Items>
        <Items>
          <StyledLink to="/Leagues">Leagues</StyledLink>
        </Items>
        <Items>
          <StyledLink to="/Profile"><FiUser /></StyledLink>
        </Items>
      </NavItems>
    </NavBox>
  );
};
export default NavigationBar;


const NavBox = styled.nav`
background-color:black
`;

const NavItems = styled.ul`
  display: flex;
  /* background-color: darkgrey; */
  list-style-type: none;
  text-align: center;
`;

const Items = styled.li`
  margin: 10px;
  margin-left: 200px;
`;

const StyledLink = styled(Link)`
text-decoration: none;
color: white;
font-size:24px;
font-family: sans-serif ;
`;


