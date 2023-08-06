import { useState, useEffect } from "react";
import styled from "styled-components";

const Highlights = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      "https://www.scorebat.com/video-api/v3/feed/?token=NzE2ODdfMTY4MDExMDE1M184MjhjMGEzMmNmMWYzNjdhYjY1Y2E2ZDZjNWNhMTM4NjBlZDMwYTdj"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    
    <HighlightWindow>
      {data.map((item) => (
        <HighlightDiv
          key={item.title}
          onClick={() => (window.location.href = item.matchviewUrl)}
        >
          <HighlightName>
            <h2>{item.title}</h2>
          </HighlightName>
          <HighlightImage>
            <Image src={item.thumbnail} alt="#" />
            <h3 style={{color:'white'}}>{item.competition}</h3>
          </HighlightImage>
        </HighlightDiv>
      ))}
    </HighlightWindow>
  );
};

export default Highlights;

const HighlightWindow = styled.div`
  width: 100%;
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  background-color: black
    `;

const HighlightDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 24px 0;
  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const HighlightName = styled.div`
color:white;
font-family: "Publico", sans-serif;
`;

const HighlightImage = styled.div``;
const Image = styled.img`
  width: 400px;
  height: 350px;
  border-radius: 7px;
  border: 1px solid white;
`;

