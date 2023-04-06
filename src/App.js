  import React from "react";
  import NavigationBar from "./NavigationBar";
  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import "./App.css" 
  import Home from "./Home";
  import Highlights from "./Highlights";
  import Teams from "./Teams";
  import Leagues from "./Leagues";
  import Team from "./Team";
  import Profile from "./Profile";
  import { Auth0Provider } from "@auth0/auth0-react";
  // import LoginButton from "./LoginButton";
  // import LogoutButton from "./LogoutButton";



  const App = () => {
    const domain = "dev-7m5407ai3og2xwja.us.auth0.com";
    const clientId = "XckTjVP9NdZMJ2VCdYMDvm0vBBaoBQzm";

    return (
    <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    > 
    <BrowserRouter>
      <div className="tester">
      <NavigationBar />
      </div>
      <Routes>
      <Route path='/' element={<Home />}/>
      <Route path="/Teams" element={<Teams />}/>
      <Route path="/Highlights" element={<Highlights />}/>
      <Route path="/Leagues" element={<Leagues />}/>
      <Route path="/team/:id" element={<Team/>}/>
      <Route path="/teams/:id" element={<Team />} />
      <Route path="/Profile" element={<Profile />} />
      </Routes>

      
      
    
      </BrowserRouter>
      </Auth0Provider>
    );
  }


  export default App;
