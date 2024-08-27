const { exec } = require("child_process");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Parse application/json
app.use(express.json());

// Serve the HTML file (if you have a static frontend file)
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Handle the search request and run FFuf for fuzzing
app.post("/search", (req, res) => {
  const url = req.body.url; // Retrieve the URL from the request body

  console.log(`Received URL: ${url}`);

  // Construct the FFuf command
  const ffufCommand = `ffuf -w /path/to/wordlist.txt -u ${url}/FUZZ -t 40 -mc 200`;

  // Execute the FFuf command
  exec(ffufCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing FFuf: ${error.message}`);
      res.status(500).json({
        message: "Error executing FFuf",
        error: error.message,
      });
      return;
    }

    if (stderr) {
      console.error(`FFuf stderr: ${stderr}`);
      res.status(500).json({
        message: "FFuf command failed",
        error: stderr,
      });
      return;
    }

    // FFuf execution was successful, returning the results
    console.log(`FFuf result: ${stdout}`);
    res.json({
      message: `Scan completed successfully!`,
      result: stdout, // Send the FFuf output back to the frontend
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
