
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Parse application/json
app.use(express.json());

// Serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Handle the search request
app.post("/search", (req, res) => {
  const url = req.body.url; // retrieve the URL from the request body
  console.log(`Received URL: ${url}`);
  res.json({ message: `You searched for: ${url}` }); // respond with a JSON message
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
