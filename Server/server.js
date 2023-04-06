// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(cors());
"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));

//Access to fetch at 'http://api.football-data.org/v4/competitions/PL/standings' from 
// origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass
//  access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. 
// If an opaque response serves your needs, 
// set the request's mode to 'no-cors'
//  to fetch the resource with CORS disabled.
